-- Run this once in the Supabase SQL Editor.
-- Creates the table that stores every anonymous submission,
-- plus security rules so visitors can insert their own row and
-- read data for aggregation, but never edit or delete anyone's row.

create table if not exists survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_id text not null,           -- lets one table hold many different surveys
  anon_id text not null,             -- random per-browser id (not a personal identifier)
  answers jsonb not null,            -- { "q1": "Zehra was kidnapped", "q2": ["Mahmut","Kerim"], ... }
  review_text text,                  -- optional free-text review
  review_public boolean default false,
  source text,                       -- "where did you hear about it"
  created_at timestamptz not null default now()
);

create index if not exists idx_survey_responses_survey_id
  on survey_responses (survey_id);

-- Enable Row Level Security
alter table survey_responses enable row level security;

-- Anyone can insert a new response (this is how anonymous submission works)
create policy "Anyone can submit a response"
  on survey_responses
  for insert
  to anon
  with check (true);

-- Anyone can read rows (needed so the browser can compute percentages client-side).
-- If you'd rather not expose raw rows at all, see the note at the bottom of this
-- file for a Postgres function that returns only aggregated counts instead.
create policy "Anyone can read responses for aggregation"
  on survey_responses
  for select
  to anon
  using (true);

-- No update/delete policies are created, so nobody (not even the submitter)
-- can modify or remove a row through the API. Only you can, from the
-- Supabase dashboard.

-- ---------------------------------------------------------------------
-- OPTIONAL (recommended once you have real traffic): instead of letting
-- the client read every raw row, create a function that returns only
-- pre-aggregated counts. This avoids ever exposing individual free-text
-- reviews or raw answer rows to the browser. survey.js already tries this
-- function first and automatically falls back to client-side aggregation
-- if the function doesn't exist yet, so adding this later is a drop-in
-- upgrade, not a breaking change.
-- ---------------------------------------------------------------------
-- Note: jsonb_array_elements_text() is a set-returning function, and Postgres
-- does not allow those inside a CASE expression (you'll get error 0A000 if you
-- try). The fix is a LATERAL join instead: for array-type answers, unnest via
-- a LATERAL subquery; for scalar answers, wrap the single value as a one-row
-- set with the same LATERAL shape. UNION ALL combines both branches.
create or replace function get_survey_results(p_survey_id text)
returns table(question_key text, answer_value text, response_count bigint, total_respondents bigint)
language sql
stable
as $$
  with total as (
    select count(*)::bigint as n
    from survey_responses
    where survey_id = p_survey_id
  ),
  expanded as (
    -- multi-answer (checkbox) questions: answers.q = ["Mahmut","Kerim"]
    select kv.key as question_key, elem as answer_value
    from survey_responses r,
      jsonb_each(r.answers) as kv,
      lateral jsonb_array_elements_text(kv.value) as elem
    where r.survey_id = p_survey_id
      and jsonb_typeof(kv.value) = 'array'

    union all

    -- single-answer (radio) questions: answers.q = "Semra"
    select kv.key as question_key, (kv.value #>> '{}') as answer_value
    from survey_responses r,
      jsonb_each(r.answers) as kv
    where r.survey_id = p_survey_id
      and jsonb_typeof(kv.value) <> 'array'
  )
  select
    e.question_key,
    e.answer_value,
    count(*)::bigint as response_count,
    (select n from total) as total_respondents
  from expanded e
  where e.answer_value is not null and e.answer_value <> ''
  group by e.question_key, e.answer_value, (select n from total)
  order by e.question_key, response_count desc;
$$;

grant execute on function get_survey_results(text) to anon;
