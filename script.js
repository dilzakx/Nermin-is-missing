/* ===================== script 1 ===================== */
/* ============================================================
   COMPATIBILITY POLYFILLS
   Added so the script cannot fail to parse or throw early in
   Safari / Internet Explorer 11 / restricted local file viewers.
   These only fill in behavior for browsers that lack it; modern
   browsers (Chrome, Firefox, Edge) already have native versions
   and these will simply not be used there.
============================================================ */
if (!Array.from) {
  Array.from = function(arrayLike, mapFn) {
    var arr = [];
    var len = arrayLike && typeof arrayLike.length === 'number' ? arrayLike.length : (arrayLike ? arrayLike : 0).length;
    if (arrayLike && typeof arrayLike.length === 'number') {
      len = arrayLike.length;
      for (var i = 0; i < len; i++) {
        arr.push(mapFn ? mapFn(arrayLike[i], i) : arrayLike[i]);
      }
    } else if (arrayLike && typeof arrayLike.length === 'number') {
      len = arrayLike.length;
      for (var j = 0; j < len; j++) {
        arr.push(mapFn ? mapFn(undefined, j) : undefined);
      }
    }
    return arr;
  };
}
if (!String.prototype.padStart) {
  String.prototype.padStart = function(targetLength, padString) {
    var str = String(this);
    padString = String(padString || ' ');
    if (str.length >= targetLength) return str;
    var pad = '';
    while (pad.length < targetLength - str.length) { pad += padString; }
    return pad.slice(0, targetLength - str.length) + str;
  };
}
if (!Element.prototype.closest) {
  Element.prototype.closest = function(selector) {
    var el = this;
    var matches = Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
    if (!matches) return null;
    while (el) {
      if (matches.call(el, selector)) return el;
      el = el.parentElement || el.parentNode;
      if (!el || el.nodeType !== 1) return null;
    }
    return null;
  };
}
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
/* classList.toggle(cls, force) two-argument form — IE11 supports this natively
   on modern IE11 updates, but some very old builds/webviews do not, so we
   normalize it defensively. */
(function(){
  if (!window.DOMTokenList) return;
  var origToggle = DOMTokenList.prototype.toggle;
  try {
    // Feature-detect two-arg support; if it already works, leave native alone.
    var test = document.createElement('div');
    test.classList.toggle('t', false);
    if (!test.classList.contains('t')) return; // works correctly already
  } catch (e) { /* fall through to patch below */ }
  DOMTokenList.prototype.toggle = function(token, force) {
    if (arguments.length > 1) {
      if (force) { this.add(token); return true; }
      this.remove(token); return false;
    }
    return origToggle.call(this, token);
  };
})();

/* ============================================================
   DATA — replace with your real case content.
============================================================ */
var DATA = {
  brand: "CASE FILES",
  caseNo: "CASE #00-000",
  title: "Nermin is missing",
  sub: "is an interactive detective mystery where you investigate a disappearance by exploring chats, examining evidence, questioning suspects, and solving puzzles to uncover the truth behind Nermin’s mysterious case.",


  database: [
    { file:"FILE #001", label:"Chest", evidence:"Chest",
      hint:"Read the aunt's statement carefully",
      answer:"Password: cinderella" },
    { file:"FILE #002", label:"Evidence Board", evidence:"Cork Board",
      hint:"Did you read the newspaper article carefully? It seems a bit different from the original...",
      answer:"Keyword: cesme" },
    { file:"FILE #003", label:"Phone: Nermin", evidence:"Phone",
      hint:"Were you able to open Nermin's chest?",
      answer:"Passcode: 1397" },
    { file:"FILE #004", label:"Phone: Murat", evidence:"Phone",
      hint:"Murat seems to be a passionate Fenerbahçe fan.",
      answer:"Passcode: 1907" },
    { file:"FILE #005", label:"Phone: Ahmet", evidence:"Phone",
      hint:"What year did Ahmet and Nermin meet?",
      answer:"Passcode: 2001" },
    { file:"FILE #006", label:"Phone: Emine", evidence:"Phone",
      hint:"Have you looked at the books Emine reads? She seems to enjoy reading George Orwell",
      answer:"Passcode: 1984" },
    { file:"FILE #007", label:"Phone: Ali", evidence:"Phone",
      hint:"The phone background looks like a movie poster.",
      answer:"Passcode: 1970" },
  ],

  chest: {
    filename: "NERMIN'S_CHEST.exe",
    intro: [
      "Our experts think the password is something the subject loved.",
      "$ field agent waiting with chest access",
      "$ chest has a lock, need the chest password",
      "$ send the chest password:",
    ],
    password: "cinderella",
    image: "images/chest.png"
  },

  /* Lock-screen wallpaper: set wallpaper:"path/to/image.jpg" on any phone below.
     It will always fill the lock screen automatically (cropped to fit, centered) —
     you never need to resize the image yourself before swapping it in. */
     phones: [
    { name:"Nermin's Phone", pin:"1397", wallpaper:"images/nerminphone.jpg", contacts:[
      { name:"Aunt", preview:"Nermin girl, look at your phone", messages: null },
      { name:"+90 591 458 9045", preview:"Give me a chance for old times' sake...", messages: null },
      { name:"Fatma", preview:"I'm on my way, I'm coming now, I'm...", messages: null },
      { name:"Neighbor Zehra", preview:"Hmm, yes woody perfumes could w...", messages: null },
      { name:"Health Insurance", preview:"Details of your hospital visit are as...", messages: null },
    ]},
    { name:"Murat's Phone", pin:"1907", wallpaper:"images/muratphone.png", contacts:[
      { name:"Mehmet", preview:"Take care of it on Monday.", messages: null },
      { name:"Repairman Gazanfer", preview:"Alright then, it's a deal. Just don't...", messages: null },
      { name:"Hepsiburada", preview:"Your order has been shipped.", messages: null },
      { name:"+90 555 093 5904", preview:"Sorry boss, the rain delayed our wo...", messages: null },
    ]},
    { name:"Emine's Phone", pin:"1984", wallpaper:"images/eminephone.png", contacts:[
      { name:"Janet (Gallery)", preview:"No, darling, no! Unfortunately we are...", messages: null },
      { name:"My Darling", preview:"At your service sir o7 o7", messages: null },
    ]},
    { name:"Ahmet's Phone", pin:"2001", wallpaper:"images/ahmetphone.png", contacts:[
      { name:"Mr.Baran", preview:"No no, no need thank you, I'm out o...", messages: null },
      { name:"KEMALKOYUN TOURISM", preview:"Your ticket for the Ankara - Bursa 20...", messages: null },
      { name:"Hikmet", preview:"Thanks so much Hikmet. When I co...", messages: null },
      { name:"Fatma", preview:"Sit where you are, what will we say if...", messages: null },
      { name:"Nermin", preview:"Give me a chance for old times' sake...", messages: null },
    ]},
    { name:"Ali's Phone", pin:"1970", wallpaper:"images/aliphone.jpg", contacts:[
      { name:"Mrs. Zehra", preview:"Hurry up, I'm waiting for you ;).", messages: null },
      { name:"Hayri", preview:"Ok", messages: null },
      { name:"Skull Crusher42", preview:"Don't blame me,if you get kick o...", messages: null },
      { name:"Posiedonus90", preview:"At the next moon cycle, LUNA, the s...", messages: null },
    ]},
  ],

  evidence: {
    filename: "EVIDENCE_BOARD.exe",
    paragraph: "Our agent forgot to give his password when he went on sick leave.  He's very good at hiding his passwords, maybe his board can help you.",
    image: "images/evidence.png",
    footerLines: [
      "Analyzing evidence board...",
      "Pattern recognition activated.",
      "Enter the keyword:"
    ],
    password: "cesme",
    mail: [
    {
    from:"Detective Mehmet Arslan <m.arslan@emniyet.gov.tr>",
    body:"<div style='font-size:18px;color:#003b73;margin-bottom:22px;'>Hit-and-Run Incident Report – June 17, 2023</div><div style='display:flex;justify-content:space-between;font-size:11px;margin-bottom:18px;'><div><b>Detective Mehmet Arslan</b> &lt;m.arslan@emniyet.gov.tr&gt;<br><span style='color:#111;'>to Investigation Team</span></div><div>Jun 18, 2023</div></div><hr><br>Sir,<br><br>It was reported that there was a hit-and-run incident at around 18:50 on June 17, 2023, when Nermin was presumed missing, with a parked car on Zafer Boulevard. The hit-and-run car:<br><br><ul><li>It may have license plate 06 NFT 777 or 06 MET 777</li><li>It is dark grey in color and has four-leaf clover stickers on the front left window</li></ul>We are still investigating whether this hit-and-run incident is related to the case.<br><br><span style='color:#a00000;'>Kind regards,</span>"
},
{
    from:"Agent R. Demir <r.demir@anon.net>",
    body:"<div style='font-size:18px;color:#003b73;margin-bottom:22px;'>Security Camera Footage –Murat Arslan's Shop</div><div style='display:flex;justify-content:space-between;font-size:11px;margin-bottom:18px;'><div><b>Agent R. Demir</b> &lt;r.demir@anon.net&gt;<br><span style='color:#111;'>to Investigation Team</span></div><div>Jun 18, 2023</div></div><hr><br>Sir,<br><br>I captured security camera footage from Murat Arslan's shop while the hit-and-run incident was taking place, you can find it attached.<br><br><span style='color:#a00000;'>Kind regards,</span><br><br><span style='color:#111;'>RD</span>"
},
      { from:"Det. Cole", body:"Message goes here — this one includes an attached image.--- Click on image.", image:"images/evidenceemail.webp" },
    ]
  },

  accusationContacts: Array.from({length:15}, function(_, i){ return { name: "Contact " + String(i+1).padStart(2,'0') }; }),

  footer: {
    copyright: "© 2026 Case Files. All rights reserved.",
    social: [
      { label:"Instagram", url:"#" },
      { label:"TikTok", url:"#" },
      { label:"Website", url:"#" },
    ]
  }
};

/* ---------- custom chat data ----------
   EDIT ONLY THE DATA BELOW: every message has its own text, date and time.
   Nothing is shared between contacts. Accusation replies are also independent.
---------- */
function makeMessage(from, text, date, time){ return {from:from, text:text, date:date, time:time}; }

DATA.phones[0].contacts[0].messages = [
  makeMessage("them", "Hello girl.", "13/06/2023", "10:00"),
  makeMessage("you", "Aunt, I’m tired of arguing with him. We argued again.", "13/06/2023", "10:56"),
  makeMessage("them", "My girl, your late father was like that too. Your mother had a hard time with his anger.", "13/06/2023", "10:57"),
  makeMessage("you", "I know… I’m just very tired of all this.", "13/06/2023", "11:02"),
  makeMessage("them", "Dear Nermin, your sister is coming to the city, which bus arrives in the city?", "17/06/2023", "14:40"),
  makeMessage("them", "Nermin girl, look at your phone.", "17/06/2023", "17:03"),
];

DATA.phones[0].contacts[1].messages = [
  makeMessage("them", "Hello, how are you Nermin? It's Ahmet, it's been a long time..", "11/06/2023", "15:05"),
  makeMessage("you", "Ahmet? How did you find my number, did Fatma give it to you?", "11/06/2023", "15:07"),
  makeMessage("them", "Yes, I got it from her. I was waiting for the day I could face your father and say 'look at the unemployed boy you called useless now', but he passed away before I could. I became a teacher Nermin, I have a job and power now.", "11/06/2023", "15:08"),
  makeMessage("you", "I'm very happy for you Ahmet, I wish the conditions were different but I'm married now.", "11/06/2023", "15:09"),
  makeMessage("them", "Yes, I know. I also know you didn't marry for love, are you really happy with him? I have a job now Nermin, you're still on my mind, I couldn't forget you.", "11/06/2023", "15:10"),
  makeMessage("you", "Those were years ago, that young girl doesn't exist anymore. Don't write to me again.", "11/06/2023", "15:11"),
  makeMessage("them", "Give me a chance for old times' sake, I just want to meet, nothing more.", "11/06/2023", "15:11"),
];

DATA.phones[0].contacts[2].messages = [
  makeMessage("them", "How is your eye dear, is it better?", "14/06/2023", "16:30"),
  makeMessage("you", "It's fine, don't worry, there are bigger problems.", "14/06/2023", "16:32"),
  makeMessage("them", "WHAT PROBLEM, are you okay should I come?", "14/06/2023", "16:33"),
  makeMessage("you", "Thank God, the people across took me to the hospital, I'm fine but...", "14/06/2023", "16:35"),
  makeMessage("you", "I feel terrible, my body hurts but not as much as my heart.", "14/06/2023", "16:40"),
  makeMessage("them", "What are you saying, wait I'm calling you, my dear..", "14/06/2023", "16:40"),
  makeMessage("them", "Girl, send me that grape cake recipe of yours", "16/06/2023", "13:46"),
  makeMessage("them", "Shhh where are you, answer urgently I need to bake the cake tonight, guests are coming.", "16/06/2023", "14:51"),
  makeMessage("them", "I have called you many times Nermin and you're not answering your phones, contact me urgently I'm starting to worry", "16/06/2023", "18:43"),
  makeMessage("them", "Dear, will you please answer your phone, are you mad at me? I don't understand.", "17/06/2023", "13:12"),
  makeMessage("them", "Are you not answering because of what we last talked about? I understand you want to be alone but please just tell me you're okay", "17/06/2023", "14:58"),
  makeMessage("them", "I'm on my way, I'm coming now, I'm standing at your door and we're going to sit and talk properly.", "18/06/2023", "08:24"),
];

DATA.phones[0].contacts[3].messages = [
  makeMessage("them", "Neighbor, do you have extra onions, I ran out", "01/06/2023", "18:00"),
  makeMessage("you", "Yes yes, how many do you need?", "01/06/2023", "18:09"),
  makeMessage("them", "Two is enough, I'm coming now", "01/06/2023", "18:10"),
  makeMessage("them", "Can you bring pomegranate molasses when you come neighbor, we ran out.", "03/06/2023", "14:10"),
  makeMessage("you", "I'll come when the laundry is done.", "03/06/2023", "14:17"),
  makeMessage("them", "Dear, I'm buying perfume for someone, do you know about men's perfumes?", "12/06/2023", "11:20"),
  makeMessage("you", "I don't know at all honestly, mine uses woody tree scents, the whole house turns into a forest, that's all I know", "12/06/2023", "11:39"),
  makeMessage("them", "Hmm, yes woody perfumes could work, these men don't like very flowery things anyway", "12/06/2023", "12:45"),
];

DATA.phones[0].contacts[4].messages = [
  makeMessage("them", "You can find the details of your examination, diagnosis and prescription at ANKARA CITY HOSPITAL in the health information system.", "14/06/2023", "19:20"),
  makeMessage("them", "Details of your hospital visit are as follows. Name: Nermin Arslan, Gender: Female, Examination Date: 13.06.2023 18:35, Diagnosis: Abortus (Cause unknown) Medication given: Birsoklen (50mg), Parlo (500mg)", "14/06/2023", "19:22"),
  ];

DATA.phones[1].contacts[0].messages = [
  makeMessage("you", "Did the last delivery arrive Mehmet.", "10/06/2023", "15:30"),
  makeMessage("them", "No boss, it hasn't arrived ye.", "10/06/2023", "15:34"),
  makeMessage("you", "Damn it! I'm calling now, don't leave the shop until they come.", "10/06/2023", "15:40"),
  makeMessage("them", "Okay boss.", "10/06/2023", "15:40"),
  makeMessage("you", "I'm not here this weekend, and not on Friday either. The shop is in your hands.", "14/06/2023", "16:30"),
  makeMessage("them", "Boss, I had something to do on Friday but I told you I was going to the bank.", "14/06/2023", "16:36"),
  makeMessage("you", "Take care of it on Monday.", "14/06/2023", "18:34")
];


DATA.phones[1].contacts[1].messages = [
  makeMessage("you", "Are you free tonight? I need somewhere quiet to talk.", "02/06/2023", "09:31"),
  makeMessage("them", "Oh, again? You never give yourself a break. I'm busy today...", "02/06/2023", "09:36"),
  makeMessage("you", "Don't say no before you see what I have planned.", "02/06/2023", "09:40"),
  makeMessage("them", "Ohhhh! You should have said so my dear :) I'll come of course..", "02/06/2023", "09:40"),
  makeMessage("them", "Murat, how long are we going to keep hiding this? It's been months, and I've been patient. When are you going to keep your promise?", "06/06/2023", "16:30"),
  makeMessage("you", "I know, but these things aren't that simple. How can I just divorce her? What will people say? You be patient, I'll find a way.", "06/06/2023", "18:32"),
  makeMessage("them", "You keep saying you'll divorce, you'll divorce, but enough! I want us to have a proper life together, and I know you care about me too. She deserves the truth. Let her go.", "06/06/2023", "18:33"),
  makeMessage("you", "I know, my dear. I've missed you since I left. A weekend getaway would be good for us. We can talk about everything and decide what to do next.", "06/06/2023", "18:38"),
  makeMessage("them", "Alright then, it's a deal. Just don't change your mind again.", "06/06/2023", "18:39"),

];

DATA.phones[1].contacts[2].messages = [
  makeMessage("them", "Your order has been shipped..", "10/06/2023", "16:00"),
];

DATA.phones[1].contacts[3].messages = [
  makeMessage("you", "Brother, where's the delivery? We've been waiting for two days.", "10/06/2023", "15:50"),
  makeMessage("you", "Bring it by tomorrow at the latest, or we'll make a deal with someone else.", "10/06/2023", "15:51"),
  makeMessage("them", "Sorry boss, the rain delayed our work a lot. I'm telling the guys to come to you first thing tomorrow morning.", "10/06/2023", "16:27"),
 ];

DATA.phones[2].contacts[0].messages = [
  makeMessage("you", "Please, this exhibition is very important to me, can't you find even a two-day time slot?", "04/06/2023", "09:46"),
  makeMessage("them", "No, darling, no! Unfortunately we are very busy this season. Impossible!", "04/06/2023", "09:59"),
];

DATA.phones[2].contacts[1].messages = [
  makeMessage("you", "I hope one of your ideas finally works out, I'm getting very tired.", "04/06/2023", "14:38"),
  makeMessage("you", "Dear, I might be late tonight, can you take care of Nermin?", "06/06/2023", "09:09"),
  makeMessage("them", "Of course! I'll tell her about my latest discovery, I haven't told anyone yet.", "06/06/2023", "10:12"),
  makeMessage("them", "She's the one who listens to me best anyway, we'll exchange ideas until you come.", "06/06/2023", "10:13"),
  makeMessage("you", "Did you notice too?.", "14/06/2023", "22:09"),
  makeMessage("them", "Yes, I noticed... I wish I could do something.", "14/06/2023", "22:20"),
  makeMessage("you", "I can't take it anymore, I'm going to speak up!!!", "14/06/2023", "22:22"),
  makeMessage("you", "FINALLY! Janet finally agreed.", "15/06/2023", "20:40"),
  makeMessage("you", "The gallery is ours next week. Are you ready to do the legwork?", "15/06/2023", "22:40"),
  makeMessage("them", "If I get to choose the cocktails, absolutely", "15/06/2023", "22:50"),
  makeMessage("them", "For the exhibition, wear the rabbit's foot necklace I got you.", "15/06/2023", "22:50"),
  makeMessage("you", "Oh you and your lucky superstitions... <_<, you can only choose the cocktails.", "15/06/2023", "20:52"),
  makeMessage("you", "Start emptying your car trunk, we'll have a lot of work this week.", "15/06/2023", "20:53"),
  makeMessage("them", "At your service sir o7 o7.", "15/06/2023", "12:49"),
];

DATA.phones[3].contacts[0].messages = [
  makeMessage("them", "Mr. Ahmet, one week of leave wasn't enough, you took another week. Classes continue, other teachers are struggling.", "16/06/2023", "15:30"),
  makeMessage("you", "Principal, I'm sorry, I'm very sick, extremely contagious, if I come to school I'll start an epidemic.", "16/06/2023", "15:40"),
  makeMessage("them", "Oh my, get well soon, let one of the teachers come bring medicine, food or something, you'll recover quickly.", "16/06/2023", "15:41"),
  makeMessage("you", "No no, no need thank you, I'm out of town anyway with my family. They're taking care of me, don't worry. I'll be at school next week hopefully.", "16/06/2023", "15:42"),
];

DATA.phones[3].contacts[1].messages = [
  makeMessage("them", "You can visit our website to view your Ankara - Bursa 20.06.2023 23:00 bus ticket. Ticket No: XTNY5.", "14/06/2023", "17:30"),
  makeMessage("them", "Your ticket for the Ankara - Bursa 20.06.2023 23:00 bus has been cancelled. Your refund will be made to your bank account within 5-7 business days.", "18/06/2023", "11:30"),
];

DATA.phones[3].contacts[2].messages = [
  makeMessage("you", "Hikmet, could you write me another week's report? It's very urgent, we'll settle up later.", "15/06/2023", "14:33"),
  makeMessage("them", "I'll write it brother, I'll write it but you'll attract too much attention, no one takes this much leave for flu, be careful.", "15/06/2023", "14:41"),
  makeMessage("you", "Thanks so much Hikmet. When I come back I'll pay my debt to you. 1.5 iskender plus kunefe...", "15/06/2023", "14:41"),
];

DATA.phones[3].contacts[3].messages = [
  makeMessage("you", "Do I have no chance? I don't want to upset her but conditions aren't like years ago, her father is gone too, can't you convince her at all?", "10/06/2023", "22:34"),
  makeMessage("them", "Years have passed Ahmet, for God's sake! Can a person stay the same? You've changed, she's changed, and I'm not even counting that she's married", "10/06/2023", "22:36"),
  makeMessage("you", "If I could still be this much in love with her, maybe she stayed too. If you can't convince her, give me her number and I'll talk. All I want is to see her once, talk once..", "10/06/2023", "22:36"),
  makeMessage("you", "Please, I beg you. You know me, no harm will come from me, if I can't see her I can't forget either, let her tell me to my face that she forgot me and I'll leave her life.", "10/06/2023", "22:36"),
  makeMessage("them", "Oof, I'll give you her number, you talk yourself, I don't want to get involved in this..", "10/06/2023", "22:38"),
  makeMessage("them", "Ahmet, did you meet with Nermin? Is she with you?", "17/06/2023", "22:23"),
  makeMessage("you", "No, of course not. Where did that come from? What happened, did something happen?", "17/06/2023", "22:25"),
  makeMessage("them", "I called her so much yesterday and she didn't answer, today she's not answering either. She would never do this, if you don't know either I'm going to her house.", "17/06/2023", "22:25"),
  makeMessage("you", "I hope nothing happened to her, should I come too?", "17/06/2023", "22:26"),
  makeMessage("them", "Sit where you are, what will we say if her husband sees.", "17/06/2023", "22:27"),
];

DATA.phones[3].contacts[4].messages = [
  makeMessage("you", "Hello, how are you Nermin? It's Ahmet, it's been a long time..", "11/06/2023", "15:00"),
  makeMessage("them", "Ahmet? How did you find my number, did Fatma give it to you?", "11/06/2023", "15:05"),
  makeMessage("you", "Yes, I got it from her. I was waiting for the day I could face your father and say 'look at the unemployed boy you called useless now', but he passed away before I could. I became a teacher Nermin, I have a job and power now.", "11/06/2023", "15:08"),
  makeMessage("them", "I'm very happy for you Ahmet, I wish the conditions were different but I'm married now.", "11/06/2023", "15:09"),
  makeMessage("you", "Yes, I know. I also know you didn't marry for love, are you really happy with him? I have a job now Nermin, you're still on my mind, I couldn't forget you.", "11/06/2023", "15:10"),
  makeMessage("them", "Those were years ago, that young girl doesn't exist anymore. Don't write to me again.", "11/06/2023", "15:12"),
  makeMessage("you", "Give me a chance for old times' sake, I just want to meet, nothing more", "11/06/2023", "15:12"),
];

DATA.phones[4].contacts[0].messages = [
  makeMessage("them", "Dear Ali, could you sweep the building entrance? I passed by and something was spilled.", "23/05/2023", "10:36"),
  makeMessage("you", "I just swept it Mrs. Zehra.", "23/05/2023", "11:06"),
  makeMessage("them", "Dear Ali, we need milk at home, bring some if you have any.", "01/06/2023", "01:05"),
  makeMessage("you", "Mrs. Zehra, what milk at this hour, I hope it won't be like last time.", "01/06/2023", "01:06"),
  makeMessage("them", "Oh dear Ali please, you're a young man, bring some milk now.", "01/06/2023", "01:06"),
  makeMessage("you", "Can I come in 20 minutes?.", "01/06/2023", "01:06"),
  makeMessage("them", "Hurry up, I'm waiting for you ;)", "01/06/2023", "01:08")
];

DATA.phones[4].contacts[1].messages = [
  makeMessage("them", "Need a man for football tonight.", "07/06/2023", "10:54"),
  makeMessage("you", "Count me in.", "07/06/2023", "10:59"),
  makeMessage("them", "Football tonight?.", "12/06/2023", "13:54"),
  makeMessage("you", "I'm coming.", "12/06/2023", "14:00"),
  makeMessage("them", "football?.", "14/06/2023", "16:54"),
  makeMessage("you", "What the time?.", "14/06/2023", "16:58"),
  makeMessage("them", "In one hour.", "14/06/2023", "16:58"),
  makeMessage("you", "OK.", "14/06/2023", "14:58"),
 ];

 DATA.phones[4].contacts[2].messages = [
  makeMessage("you", "Dude, are you at the shop?", "01/06/2023", "01:07"),
  makeMessage("them", "Yeah but I'm about to close, what's up?", "01/06/2023", "01:08"),
  makeMessage("you", "Don't close, I'm coming to buy some stuff.", "01/06/2023", "01:08"),
  makeMessage("them", "What are you buying at this hour :)) You never rest, did you find another job for yourself.", "01/06/2023", "01:09"),
  makeMessage("you", "Hehe, well buddy we don't stay idle, I'll explain when I come.", "01/06/2023", "01:09"),
  makeMessage("them", "Are you ready for the ritual? It starts next week.", "10/06/2023", "15:47"),
  makeMessage("you", "I'm ready of course, hopefully we'll find someone suitable this time.", "10/06/2023", "15:50"),
  makeMessage("them", "Poseidonus90 says it'll be a big ritual, both virgin and widow. Summer solstice celebrations will be wild this time. Did you get your ticket?", "10/06/2023", "15:50"),
  makeMessage("you", "No I haven't bought it yet, I need to reach our contact guy, but I haven't seen him for days.", "10/06/2023", "15:51"),
  makeMessage("you", "Do you have an extra? I'll come get it, we'll settle up later.", "10/06/2023", "15:51"),
  makeMessage("them", "I have one but I need to receive a delivery, come in half an hour.", "10/06/2023", "15:52"),
  makeMessage("you", "How are we going to stay awake so late? It was never this late before.", "10/06/2023", "15:54"),
  makeMessage("them", "It's more comfortable when no one's around, plus there's the time difference.", "10/06/2023", "15:55"),
  makeMessage("them", "It happened because of you, why did you let her slip away? You could be kicked out of the clan for this.", "17/06/2023", "03:47"),
  makeMessage("you", "I didn't do it on purpose, she slipped away, I didn't think she'd be that fast. If you had backed me up I could have caught her.", "17/06/2023", "03:48"),
  makeMessage("them", "Don't blame me, if you get kicked out of the clan don't blame me.", "17/06/2023", "03:48"),
  ];

DATA.phones[4].contacts[3].messages = [
  makeMessage("them", "The widow was your responsibility... Sineapoz and Diadem56 already handled the virgin and the snake. You failed our trust.", "17/06/2023", "04:04"),
  makeMessage("you", "I'm sorry boss, it wasn't intentional, I couldn't keep up with the speed, couldn't catch her.", "17/06/2023", "04:05"),
  makeMessage("them", "At the next moon cycle, LUNA, the supreme guide, will determine your fate.", "17/06/2023", "04:05"),
  ];
DATA.accusationContacts = [
  {
    name: "Nermin",
    options: [
      {text: "Maybe you'll never read these lines, but I know you escaped, Nermin", date: "15/06/2026", time: "20:00"},
      {text: "Writing this is so meaningless... I know you committed suicide.", date: "15/06/2026", time: "21:00"}
    ],
    replies: [
      [
        makeMessage("them", "Hello detective...", "16/06/2026", "22:00"),
        makeMessage("them", "You didn't think you were the only one trying to solve this case, did you?", "16/06/2026", "22:02"),
        makeMessage("them", "Secret Agent detectives are everywhere, either individually or in teams, examining every detail that security forces miss, fighting to bring justice.", "16/06/2026", "22:04"),
        makeMessage("them", "I can tell you that whatever Nermin did, she didn't do it alone...", "16/06/2026", "22:06")
       ],
      [
        makeMessage("them", "Helo detective...", "16/06/2026", "23:01"),
        makeMessage("them", "You didn't think you were the only one trying to solve this case, did you?", "16/06/2026", "23:03"),
        makeMessage("them", "Secret Agent detectives are everywhere, either individually or in teams, examining every detail that security forces miss, fighting to bring justice.", "16/06/2026", "23:05"),
        makeMessage("them", "I can tell you that Nermin didn't act alone, and she didn't commit suicide either.", "16/06/2026", "23:07"),
      ]
    ]
  },
  {
    name: "Murat",
    options: [
      {text: "I know you killed Nermin.", date: "15/06/2026", time: "20:02"},
      {text: "I know you're involved in Nermin's disappearance. You kidnapped her.", date: "15/06/2026", time: "21:02"}
    ],
    replies: [
      [
        makeMessage("them", "Me? What could I have done to my wife??", "16/06/2026", "22:07"),
        makeMessage("them", "Okay, yes, I had a relationship with my downstairs neighbor, but I was never serious. Nermin wasn't very flirtatious, so I was just meeting my needs.", "16/06/2026", "22:09"),
        makeMessage("them", "Other than that, I love my wife, detective. She's a proper, honorable woman. She'll be the mother of my children too.", "16/06/2026", "22:11"),
        makeMessage("them", "Whatever happened to her, please find her and bring her home safely. Let her return to her nest safe and sound.", "16/06/2026", "22:13")
       ],
       [
        makeMessage("them", "Me? What could I have done to my wife??", "16/06/2026", "22:07"),
        makeMessage("them", "Okay, yes, I had a relationship with my downstairs neighbor, but I was never serious. Nermin wasn't very flirtatious, so I was just meeting my needs.", "16/06/2026", "22:09"),
        makeMessage("them", "Other than that, I love my wife, detective. She's a proper, honorable woman. She'll be the mother of my children too.", "16/06/2026", "22:11"),
        makeMessage("them", "Whatever happened to her, please find her and bring her home safely. Let her return to her nest safe and sound.", "16/06/2026", "22:13")
       ]
    ]
  },
  {
    name: "Ahmet",
    options: [
      {text: "I know you killed Nermin.", date: "15/06/2026", time: "20:02"},
      {text: "I know you're involved in Nermin's disappearance. You kidnapped her.", date: "15/06/2026", time: "21:02"}
    ],
    replies: [
      [
        makeMessage("them", "What?! How can you think I did it? I have nothing to do with this.", "16/06/2026", "22:14"),
        makeMessage("them", "You caught the wrong person, detective. Don't waste time with me, go over the details again.", "16/06/2026", "22:16")
        
      ],
      [
        makeMessage("them", "Hello detective...", "16/06/2026", "23:15"),
        makeMessage("them", "Being in Ankara, trying to meet with Nermin, wandering around her house might look suspicious on top of what happened, I'm aware.", "16/06/2026", "23:17"),
        makeMessage("them", "But I'm telling you the truth, Nermin never wanted to meet with me. Years had passed, she had forgotten me. For her, I was no different from an acquaintance from the past.", "16/06/2026", "23:19"),
        makeMessage("them", "I just wanted to see how she was doing. I wanted to hang around in cafes, on the street, and see her from afar, even if just for a second. She wouldn't even notice me, I wouldn't harm anyone.", "16/06/2026", "23:21"),
        makeMessage("them", "I have no idea what happened to her, I hope she's safe. I will never feel at ease until I learn that nothing happened to her.", "16/06/2026", "23:23")
        
      ]
    ]
  },
  {
    name: "Ayse",
    options: [
      {text: "I know you killed Nermin.", date: "15/06/2026", time: "20:02"},
      {text: "I know you're involved in Nermin's disappearance. You kidnapped her.", date: "15/06/2026", time: "21:02"}
    ],
    replies: [
      [
        makeMessage("them", "What?! How can you think I did it? I have nothing to do with this.", "16/06/2026", "22:14"),
        makeMessage("them", "You caught the wrong person, detective. Don't waste time with me, go over the details again.", "16/06/2026", "22:16")
        
      ],
      [
        makeMessage("them", "What?! How can you think I did it? I have nothing to do with this.", "16/06/2026", "22:14"),
        makeMessage("them", "You caught the wrong person, detective. Don't waste time with me, go over the details again.", "16/06/2026", "22:16")
        
      ]
    ]
  },
  {
    name: "Fatma",
    options: [
      {text: "I know you killed Nermin.", date: "15/06/2026", time: "20:02"},
      {text: "I know you're involved in Nermin's disappearance. You kidnapped her.", date: "15/06/2026", time: "21:02"}
    ],
    replies: [
      [
        makeMessage("them", "What?! How can you think I did it? I have nothing to do with this.", "16/06/2026", "22:14"),
        makeMessage("them", "You caught the wrong person, detective. Don't waste time with me, go over the details again.", "16/06/2026", "22:16")
        
      ],
      [
      makeMessage("them", "What?! How can you think I did it? I have nothing to do with this.", "16/06/2026", "22:14"),
        makeMessage("them", "You caught the wrong person, detective. Don't waste time with me, go over the details again.", "16/06/2026", "22:16")
        
      ]
    ]
  },
  {
    name: "Zehra",
    options: [
      {text: "I know you killed Nermin.", date: "15/06/2026", time: "20:02"},
      {text: "I know you're involved in Nermin's disappearance. You kidnapped her.", date: "15/06/2026", time: "21:02"}
    ],
    replies: [
      [
        makeMessage("them", "Oh, what am I gonna do with that woman, detective...", "16/06/2026", "22:35"),
        makeMessage("them", "Was I madly jealous of Murat and desperately wanted Murat to be only mine? Yes... But that doesn't mean I did something bad to that woman.", "16/06/2026", "22:37"),
        makeMessage("them", "Murat was going to divorce her anyway, then marry me. I have no reason to do anything bad to Nermin..", "16/06/2026", "22:39"),
        makeMessage("them", "If you don't have any other questions, let me make a cake. My dear Murat must be very upset now... He needs someone to support him during these bad times.", "16/06/2026", "22:41")
        
      ],
      [
        makeMessage("them", "Oh, what am I gonna do with that woman, detective...", "16/06/2026", "22:35"),
        makeMessage("them", "Was I madly jealous of Murat and desperately wanted Murat to be only mine? Yes... But that doesn't mean I did something bad to that woman.", "16/06/2026", "22:37"),
        makeMessage("them", "Murat was going to divorce her anyway, then marry me. I have no reason to do anything bad to Nermin..", "16/06/2026", "22:39"),
        makeMessage("them", "If you don't have any other questions, let me make a cake. My dear Murat must be very upset now... He needs someone to support him during these bad times.", "16/06/2026", "22:41")
        
      ]
    ]
  },
  {
    name: "Mehmet",
    options: [
      {text: "I know you killed Nermin.", date: "15/06/2026", time: "20:02"},
      {text: "I know you're involved in Nermin's disappearance. You kidnapped her.", date: "15/06/2026", time: "21:02"}
    ],
    replies: [
      [
        makeMessage("them", "I have nothing to do with this incident. Where did you get the idea that I'm guilty?", "16/06/2026", "22:42"),
        makeMessage("them", "I hope you didn't take the ritual sacrifice messages seriously. Those were just part of the computer game we were playing.", "16/06/2026", "22:44"),
        makeMessage("them", "I have no idea what happened to sister Nermin.", "16/06/2026", "22:46")
      
      ],
      [
        makeMessage("them", "I have nothing to do with this incident. Where did you get the idea that I'm guilty?", "16/06/2026", "22:42"),
        makeMessage("them", "I hope you didn't take the ritual sacrifice messages seriously. Those were just part of the computer game we were playing.", "16/06/2026", "22:44"),
        makeMessage("them", "I have no idea what happened to sister Nermin.", "16/06/2026", "22:46")
      
      ]
    ]
  },
  {
    name: "Ali",
    options: [
      {text: "I know you killed Nermin.", date: "15/06/2026", time: "20:02"},
      {text: "I know you're involved in Nermin's disappearance. You kidnapped her.", date: "15/06/2026", time: "21:02"}
    ],
    replies: [
      [
        makeMessage("them", "I have nothing to do with this incident. Where did you get the idea that I'm guilty?", "16/06/2026", "22:42"),
        makeMessage("them", "I hope you didn't take the ritual sacrifice messages seriously. Those were just part of the computer game we were playing.", "16/06/2026", "22:44"),
        makeMessage("them", "I have no idea what happened to sister Nermin.", "16/06/2026", "22:46")
      
      ],
      [
        makeMessage("them", "I have nothing to do with this incident. Where did you get the idea that I'm guilty?", "16/06/2026", "22:42"),
        makeMessage("them", "I hope you didn't take the ritual sacrifice messages seriously. Those were just part of the computer game we were playing.", "16/06/2026", "22:44"),
        makeMessage("them", "I have no idea what happened to sister Nermin.", "16/06/2026", "22:46")
      
      ]
    ]
  },
  {
    name: "Emine",
    options: [
      {text: "I know you killed Nermin.", date: "15/06/2026", time: "20:02"},
      {text: "I know you're involved in Nermin's disappearance. You kidnapped her.", date: "15/06/2026", time: "21:02"}
    ],
    replies: [
      [
        makeMessage("them", "Kill? KILL?!", "16/06/2026", "22:56"),
        makeMessage("them", "How could you think that, detective? Are we the kind of people who would do such a thing?", "16/06/2026", "22:58"),
        makeMessage("them", "We would never hurt a hair on Nermin's head! She's been through so much, so many hardships. We listened to her every week and stood by her.", "16/06/2026", "22:00"),
        makeMessage("them", "You got close but didn't find the truth.", "16/06/2026", "22:02")
       
      ],
      [
        makeMessage("them", "Ahhh, so that's it?", "16/06/2026", "23:57"),
        makeMessage("them", "We knew the truth would come out eventually. Please listen to us before going to the police, then you can decide what to do.", "16/06/2026", "23:59"),
        makeMessage("them", "We've known Nermin for weeks, we see her. She became much more than just someone who comes and goes from home. She became like family to us. I don't know how she looks from the outside, but there's a lively, energetic and loving woman inside.", "16/06/2026", "23:01"),
        makeMessage("them", "She told us how her father treated her back then, and now her husband. We were so sad just listening. Despite them, she still had a smile on her face and enjoyed spending time with us.", "16/06/2026", "23:03"),
        makeMessage("them", "When she told us she was pregnant last month, we were so happy. She was getting ready to turn a new page in her life.", "16/06/2026", "23:05"),
        makeMessage("them", "But things changed before she could tell her husband. The man was going through Nermin's phone and found someone who had texted her. That's when hell broke loose.", "16/06/2026", "23:07"),
        makeMessage("them", "Nermin had an old love, they couldn't marry because her family didn't allow it. Her husband saw the messages this man sent to Nermin. The man's blood rushed to his brain, he lost himself in anger. Even though Nermin never responded to this man or met him, her husband beat the woman until she was black and blue all over.", "16/06/2026", "23:09"),
        makeMessage("them", "No matter how much she tried to hide those wounds and bruises, we saw them of course. We forced her to talk, she told us everything. She cried so much, you should have seen it, that smiling woman suddenly disappeared. Then she suddenly felt sick at our house.", "16/06/2026", "23:09"),
        makeMessage("them", "We immediately took her to the emergency room, waited for hours. Then we learned she had a miscarriage. That day was very bad for us, but it was like hell for Nermin. She was making statements that she no longer wanted to live. The sparkle in her eyes was gone.", "16/06/2026", "23:09"),
        makeMessage("them", "This couldn't end like this, we had to do our best for Nermin. She had tried to go to the police before, but her husband's connections reached the police. That's why these attempts never ended well.", "16/06/2026", "23:09"),
        makeMessage("them", "We decided to kidnap Nermin. We decided to do our best so that she could start a new life away from her husband, away from everything, and live a peaceful life. We arranged everything using our family cottage and some money.", "16/06/2026", "23:09"),
        makeMessage("them", "Nermin was safe, but how safe could she remain while that man was out there looking for her? We couldn't stand what he put the poor woman through going unpunished.", "16/06/2026", "23:09"),
        makeMessage("them", "To pin the blame on her husband, we caused a commotion on the street and made the apprentice come out of the shop. Then we hid the bag with Nermin's bloody clothes behind a cabinet in the shop. Since everyone was focused on the car accident outside, no one even noticed us going in and out of the shop.", "16/06/2026", "23:09"),
        makeMessage("them", "Later we pinned the blame on Murat with an anonymous tip.", "16/06/2026", "23:09"),
        makeMessage("them", "Detective, please. If you tell the police about this, Murat will be released and will harm Nermin.", "16/06/2026", "23:09"),
        makeMessage("them", "If you don't tell anyone, Nermin can live in peace. The decision is yours, Nermin's fate is in your hands.", "16/06/2026", "23:09"),
        makeMessage("them", 'Good job detective. You managed to solve the case. Now the final decision is in your hands. Click the link below and make your choice. Then learn what other detectives decided<a href="https://dilzakx.github.io/Nermin-is-missing/survey/survey.html". style="color: #bd3939;" >"Click to make your final decision"</a>.', "16/06/2026", "23:09")
      ]
    ]
  },
  {
    name: "Hassan",
    options: [
      {text: "I know you killed Nermin.", date: "15/06/2026", time: "20:02"},
      {text: "I know you're involved in Nermin's disappearance. You kidnapped her.", date: "15/06/2026", time: "21:02"}
    ],
    replies: [
      [
        makeMessage("them", "Kill? KILL?!", "16/06/2026", "22:56"),
        makeMessage("them", "How could you think that, detective? Are we the kind of people who would do such a thing?", "16/06/2026", "22:58"),
        makeMessage("them", "We would never hurt a hair on Nermin's head! She's been through so much, so many hardships. We listened to her every week and stood by her.", "16/06/2026", "22:00"),
        makeMessage("them", "You got close but didn't find the truth.", "16/06/2026", "22:02")
       
      ],
      [
        makeMessage("them", "Ahhh, so that's it?", "16/06/2026", "23:57"),
        makeMessage("them", "We knew the truth would come out eventually. Please listen to us before going to the police, then you can decide what to do.", "16/06/2026", "23:59"),
        makeMessage("them", "We've known Nermin for weeks, we see her. She became much more than just someone who comes and goes from home. She became like family to us. I don't know how she looks from the outside, but there's a lively, energetic and loving woman inside.", "16/06/2026", "23:01"),
        makeMessage("them", "She told us how her father treated her back then, and now her husband. We were so sad just listening. Despite them, she still had a smile on her face and enjoyed spending time with us.", "16/06/2026", "23:03"),
        makeMessage("them", "When she told us she was pregnant last month, we were so happy. She was getting ready to turn a new page in her life.", "16/06/2026", "23:05"),
        makeMessage("them", "But things changed before she could tell her husband. The man was going through Nermin's phone and found someone who had texted her. That's when hell broke loose.", "16/06/2026", "23:07"),
        makeMessage("them", "Nermin had an old love, they couldn't marry because her family didn't allow it. Her husband saw the messages this man sent to Nermin. The man's blood rushed to his brain, he lost himself in anger. Even though Nermin never responded to this man or met him, her husband beat the woman until she was black and blue all over.", "16/06/2026", "23:09"),
        makeMessage("them", "No matter how much she tried to hide those wounds and bruises, we saw them of course. We forced her to talk, she told us everything. She cried so much, you should have seen it, that smiling woman suddenly disappeared. Then she suddenly felt sick at our house.", "16/06/2026", "23:09"),
        makeMessage("them", "We immediately took her to the emergency room, waited for hours. Then we learned she had a miscarriage. That day was very bad for us, but it was like hell for Nermin. She was making statements that she no longer wanted to live. The sparkle in her eyes was gone.", "16/06/2026", "23:09"),
        makeMessage("them", "This couldn't end like this, we had to do our best for Nermin. She had tried to go to the police before, but her husband's connections reached the police. That's why these attempts never ended well.", "16/06/2026", "23:09"),
        makeMessage("them", "We decided to kidnap Nermin. We decided to do our best so that she could start a new life away from her husband, away from everything, and live a peaceful life. We arranged everything using our family cottage and some money.", "16/06/2026", "23:09"),
        makeMessage("them", "Nermin was safe, but how safe could she remain while that man was out there looking for her? We couldn't stand what he put the poor woman through going unpunished.", "16/06/2026", "23:09"),
        makeMessage("them", "To pin the blame on her husband, we caused a commotion on the street and made the apprentice come out of the shop. Then we hid the bag with Nermin's bloody clothes behind a cabinet in the shop. Since everyone was focused on the car accident outside, no one even noticed us going in and out of the shop.", "16/06/2026", "23:09"),
        makeMessage("them", "Later we pinned the blame on Murat with an anonymous tip.", "16/06/2026", "23:09"),
        makeMessage("them", "Detective, please. If you tell the police about this, Murat will be released and will harm Nermin.", "16/06/2026", "23:09"),
        makeMessage("them", "If you don't tell anyone, Nermin can live in peace. The decision is yours, Nermin's fate is in your hands.", "16/06/2026", "23:09"),
        makeMessage("them", 'Good job detective. You managed to solve the case. Now the final decision is in your hands. Click the link below and make your choice. Then learn what other detectives decided<a href="https://dilzakx.github.io/Nermin-is-missing/survey/survey.html". style="color: #bd3939;" >"Click to make your final decision"</a>.', "16/06/2026", "23:09")
      ]
    ]
  }

];


/* ---------- mobile status bar ---------- */
function statusBarHTML(time){
  return '<span>' + time + '</span>' +
    '<span class="micons">' +
      '<svg width="15" height="11" viewBox="0 0 15 11" fill="#efece4"><rect x="0" y="6" width="2.5" height="5"/><rect x="4" y="4" width="2.5" height="7"/><rect x="8" y="2" width="2.5" height="9"/><rect x="12" y="0" width="2.5" height="11" opacity=".4"/></svg>' +
      '<svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="#efece4" stroke-width="1.3" stroke-linecap="round"><path d="M1 4a8 8 0 0 1 12 0"/><path d="M3.3 6.5a4.8 4.8 0 0 1 7.4 0"/><path d="M5.6 9a1.8 1.8 0 0 1 2.8 0"/></svg>' +
      '<span class="batt"><span class="body"><i style="width:78%"></i></span><span class="nub"></span></span>' +
    '</span>';
}
function liveClock(){
  var now = new Date();
  return String(now.getHours()).padStart(2,'0')+":"+String(now.getMinutes()).padStart(2,'0');
}
function paintStatusBars(){
  var t = liveClock();
  ['lockStatus','contactsStatus','chatStatus','accListStatus','accChatStatus'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.innerHTML = statusBarHTML(t);
  });
  var lockClockEl = document.getElementById('lockClock');
  if (lockClockEl) lockClockEl.textContent = t;
}
paintStatusBars(); setInterval(paintStatusBars, 15000);

/* ---------- live REC strip ---------- */
var tickerText = DATA.caseNo + " · " + DATA.title.replace(/<[^>]*>/g,'').toUpperCase() + " · STATUS: ACTIVE · " + DATA.phones.length + " PERSONS OF INTEREST · INVESTIGATION ONGOING · ";
document.getElementById('tickerTrack').textContent = tickerText + tickerText;
function paintLiveClock(){ document.getElementById('liveStripClock').textContent = liveClock(); }
paintLiveClock(); setInterval(paintLiveClock, 15000);

/* ---------- header / hero / footer ---------- */
var hdrBrandEl = document.getElementById('hdrBrand');
if (hdrBrandEl) hdrBrandEl.textContent = DATA.brand;
document.getElementById('caseNo').textContent = DATA.caseNo;
document.getElementById('caseTitle').textContent = DATA.title;
document.getElementById('caseSub').textContent = DATA.sub;
document.getElementById('footCopy').textContent = DATA.footer.copyright;
DATA.footer.social.forEach(function(s){
  var a = document.createElement('a');
  a.href = s.url; a.textContent = s.label; a.target="_blank"; a.rel="noopener";
  document.getElementById('footSocial').appendChild(a);
});

/* ---------- database (hint + answer, inline) ---------- */
var dbWrap = document.getElementById('dbRows');
DATA.database.forEach(function(d,i){
  var row = document.createElement('div');
  row.className = 'db-row';
  row.innerHTML =
    '<div class="db-top">' +
      '<div>' +
        '<div class="db-file">' + d.file + ' &nbsp;<b>' + d.label + '</b></div>' +
        '<div class="db-meta">$ Evidence: ' + d.evidence + ' &nbsp; $ Status: Classified</div>' +
      '</div>' +
      '<div class="db-actions">' +
        '<button class="btn" onclick="toggleDb(' + i + ',\'hint\')">&gt;&gt; HINT</button>' +
        '<button class="btn" onclick="toggleDb(' + i + ',\'answer\')">&gt;&gt; ANSWER</button>' +
      '</div>' +
    '</div>' +
    '<div class="db-reveal" id="dbHint' + i + '"><span class="lbl">Hint</span>' + d.hint + '</div>' +
    '<div class="db-reveal" id="dbAns' + i + '"><span class="lbl">Answer</span>' + d.answer + '</div>';
  dbWrap.appendChild(row);
});
function toggleDb(i, kind){
  var id = kind === 'hint' ? 'dbHint'+i : 'dbAns'+i;
  document.getElementById(id).classList.toggle('show');
}
var dbOpen = false;
function toggleDbFolder(){
  if(dbOpen){
    dbOpen = false;
    document.getElementById('dbRowsWrap').classList.remove('open');
    document.getElementById('dbChev').classList.remove('open');
    document.getElementById('folderIcon').textContent = '📁';
    document.querySelectorAll('#dbRows .db-reveal.show').forEach(function(el){ el.classList.remove('show'); });
    return;
  }
  document.getElementById('dbConfirmModal').classList.add('show');
}
function confirmDbOpen(){
  closeModal('dbConfirmModal');
  dbOpen = true;
  document.getElementById('dbRowsWrap').classList.add('open');
  document.getElementById('dbChev').classList.add('open');
  document.getElementById('folderIcon').textContent = '📂';
}

/* ---------- chest ---------- */
document.getElementById('chestFile').textContent = DATA.chest.filename;
document.getElementById('chestIntro').innerHTML = DATA.chest.intro.map(function(l){ return '<p>' + l + '</p>'; }).join('');
function tryChest(){
  var val = document.getElementById('chestPass').value.trim().toLowerCase();
  var fb = document.getElementById('chestFb');
  if(val === DATA.chest.password.toLowerCase()){
    fb.textContent = 'Password correct — chest unlocked.'; fb.className='feedback ok';
    if(DATA.chest.image) document.getElementById('chestImg').src = DATA.chest.image;
    document.getElementById('chestReveal').classList.add('show');
    chestUnlocked = true;
  } else {
    fb.textContent = 'Invalid password.'; fb.className='feedback err';
  }
}

/* ---------- evidence ---------- */
document.getElementById('evFile').textContent = DATA.evidence.filename;
document.getElementById('evParagraph').textContent = DATA.evidence.paragraph;
if(DATA.evidence.image){
  var evImgEl=document.getElementById('evImg'); evImgEl.src=DATA.evidence.image; evImgEl.style.display='block';
  document.getElementById('evPlaceholder').style.display='none';
}
document.getElementById('evFooterLines').innerHTML = DATA.evidence.footerLines.map(function(l){ return '<p>' + l + '</p>'; }).join('');
function openLightbox(){
  if(!DATA.evidence.image){
    console.warn('Evidence board image is empty — set DATA.evidence.image to a real image path first.');
    return;
  }
  openLightboxSrc(DATA.evidence.image);
}
function openLightboxSrc(src){
  if(!src) return;
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('show');
}
function closeLightbox(){ document.getElementById('lightbox').classList.remove('show'); }
document.getElementById('lightbox').addEventListener('click', function(e){ if(e.target.id==='lightbox') closeLightbox(); });
document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeLightbox(); });
function tryEvidence(){
  var val = document.getElementById('evPass').value.trim().toLowerCase();
  var fb = document.getElementById('evFb');
  if(val === DATA.evidence.password.toLowerCase()){
    fb.textContent = 'Key accepted.'; fb.className='feedback ok';
    document.getElementById('evReveal').innerHTML = DATA.evidence.mail.map(function(m){
      var imgHtml = m.image ? ('<img class="mail-img" src="' + m.image + '" alt="Attached evidence image" onclick="openLightboxSrc(this.src)">') : '';
      return '<div class="mail-card"><div class="from">✉ ' + m.from + '</div><div class="body">' + m.body + '</div>' + imgHtml + '</div>';
    }).join('');
    document.getElementById('evReveal').classList.add('show');
    evidenceUnlocked = true;
  } else {
    fb.textContent = 'This key is invalid.'; fb.className='feedback err';
  }
}

/* Keyboard access: Enter submits password/keyword fields just like clicking Access. */
['chestPass','evPass'].forEach(function(id){
  var input=document.getElementById(id);
  if(input){ input.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); id==='chestPass' ? tryChest() : tryEvidence(); } }); }
});

/* ---------- phone blocks -> overlay ---------- */
var phoneBlocks = document.getElementById('phoneBlocks');
DATA.phones.forEach(function(p,i){
  var tile = document.createElement('div');
  tile.className = 'block-tile';
  tile.onclick = function(){ openPhoneOverlay(i); };
  tile.innerHTML = '<div class="icon"></div><div class="nm">' + p.name + '</div>';
  phoneBlocks.appendChild(tile);
});

var currentPhone = null;
var enteredPin = '';
var unlockedPhones = Object.create(null);
function openPhoneOverlay(i){
  currentPhone = i; enteredPin = '';
  var p = DATA.phones[i];
  document.getElementById('phoneOverlay').classList.add('show');
  ['pvLock','pvContacts','pvChat'].forEach(function(id){ document.getElementById(id).classList.remove('active'); });
  document.getElementById('pvLock').classList.add('active');
  document.getElementById('pvLock').style.backgroundImage = p.wallpaper ? ('url(' + p.wallpaper + ')') : 'none';
  document.getElementById('lockName').textContent = p.name;
  document.getElementById('lockErr').textContent = '';
  updateDots();
  paintStatusBars();

  // Once a phone is unlocked, keep it unlocked for the rest of this tab session.
  // A full refresh/reopen naturally clears this in-memory state.
  if (unlockedPhones[i]) showContacts();
}
function closePhoneOverlay(){ document.getElementById('phoneOverlay').classList.remove('show'); }
function keyPress(d){
  if(enteredPin.length >= 4) return;
  enteredPin += d;
  updateDots();
  if(enteredPin.length === 4){
    if(enteredPin === DATA.phones[currentPhone].pin){
      document.getElementById('lockErr').textContent = '';
      unlockedPhones[currentPhone] = true;
      showContacts();
    } else {
      document.getElementById('lockErr').textContent = 'Incorrect passcode';
      setTimeout(function(){ enteredPin=''; updateDots(); document.getElementById('lockErr').textContent=''; }, 700);
    }
  }
}
function keyBack(){ enteredPin = enteredPin.slice(0,-1); updateDots(); }
function updateDots(){
  var dots = document.querySelectorAll('#lockDots i');
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.toggle('filled', i < enteredPin.length);
  }
}
function showContacts(){
  ['pvLock','pvContacts','pvChat'].forEach(function(id){ document.getElementById(id).classList.remove('active'); });
  document.getElementById('pvContacts').classList.add('active');
  var wrap = document.getElementById('contactRows');
  wrap.innerHTML = '';
  DATA.phones[currentPhone].contacts.forEach(function(c,ci){
    var row = document.createElement('div');
    row.className = 'contact-row';
    row.onclick = function(){ openChat(ci); };
    row.innerHTML = '<div class="av"></div><div><div class="nm">' + c.name + '</div><div class="pv-txt">' + (c.preview||'') + '</div></div>';
    wrap.appendChild(row);
  });
  paintStatusBars();
}
function openChat(ci){
  ['pvLock','pvContacts','pvChat'].forEach(function(id){ document.getElementById(id).classList.remove('active'); });
  document.getElementById('pvChat').classList.add('active');
  var c = DATA.phones[currentPhone].contacts[ci];
  document.getElementById('chatName').textContent = c.name;
  var body = document.getElementById('chatBody');

  /* WhatsApp-style grouping: show the date once when the conversation moves
     to a new day, and show only the message time on every bubble. */
  var lastDate = null;
  var chatHtml = '';
  (c.messages || []).forEach(function(m){
    if(m.date !== lastDate){
      chatHtml += '<div class="chat-date-separator">' + m.date + '</div>';
      lastDate = m.date;
    }
    chatHtml += '<div class="msg ' + m.from + '">' + m.text + '<span class="ts">' + m.time + '</span></div>';
  });

  body.innerHTML = chatHtml + '<div class="offline-note">' + c.name + ' is offline...</div>';
  paintStatusBars();
}

/* ---------- accusation flow ---------- */
var chestUnlocked = false;
var evidenceUnlocked = false;
function accusationRequirements(){
  var phoneTotal = (typeof DATA !== 'undefined' && DATA.phones) ? DATA.phones.length : 0;
  var phoneDone = Object.keys(unlockedPhones || {}).length;
  return [
    { label: 'Chest unlocked', done: !!chestUnlocked },
    { label: 'Evidence board unlocked', done: !!evidenceUnlocked },
    { label: 'Suspect phones unlocked (' + phoneDone + '/' + phoneTotal + ')', done: phoneTotal > 0 && phoneDone >= phoneTotal }
  ];
}
function requestAccusation(){
  var reqs = accusationRequirements();
  var allDone = reqs.every(function(r){ return r.done; });
  if(allDone){ openConfirm(); return; }
  var list = document.getElementById('accuseChecklist');
  if(list){
    list.innerHTML = reqs.map(function(r){
      return '<li style="display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid ' + (r.done ? 'rgba(90,150,90,.35)' : 'rgba(181,52,47,.35)') + ';border-radius:6px;background:' + (r.done ? 'rgba(90,150,90,.08)' : 'rgba(181,52,47,.06)') + ';">' +
        '<span style="font-size:16px;">' + (r.done ? '✓' : '✕') + '</span>' +
        '<span style="flex:1;">' + r.label + '</span>' +
        '<span style="font:9px var(--mono);letter-spacing:.12em;color:' + (r.done ? '#7bc47b' : '#e07a66') + ';">' + (r.done ? 'DONE' : 'LOCKED') + '</span>' +
      '</li>';
    }).join('');
  }
  document.getElementById('accuseGateModal').classList.add('show');
}
function openConfirm(){ document.getElementById('confirmModal').classList.add('show'); }
function closeModal(id){ document.getElementById(id).classList.remove('show'); }
var accuseSent = {};
function openAccuseOverlay(){
  accuseSent = {};
  document.getElementById('accuseOverlay').classList.add('show');
  document.getElementById('accChat').classList.remove('active');
  document.getElementById('accList').classList.add('active');
  renderAccuseList();
  paintStatusBars();
}
function closeAccuseOverlay(){ document.getElementById('accuseOverlay').classList.remove('show'); }
function renderAccuseList(){
  var list = document.getElementById('accListRows');
  list.innerHTML = '';
  DATA.accusationContacts.forEach(function(c,i){
    var row = document.createElement('div');
    row.className = 'contact-row';
    row.onclick = function(){ openAccuseChat(i); };
    row.innerHTML = '<div class="av"></div><div><div class="nm">' + c.name + '</div><div class="pv-txt">' + (accuseSent[i] ? 'Message sent' : 'Tap to open') + '</div></div>';
    list.appendChild(row);
  });
}
function openAccuseChat(i){
  var c = DATA.accusationContacts[i];
  document.getElementById('accList').classList.remove('active');
  document.getElementById('accChat').classList.add('active');
  document.getElementById('accChatName').textContent = c.name;
  var body = document.getElementById('accChatBody');
  var optsWrap = document.getElementById('accSendOptions');
  body.innerHTML = '';

  if(accuseSent[i] === 'done'){
    var sentAt = accuseSent[i+'_time'] || '';
    body.innerHTML = '<div class="msg you">' + (accuseSent[i+'_text'] || '') + '<span class="ts">' + sentAt + '</span></div>'
      + (c.replies[accuseSent[i+'_option'] || 0] || []).map(function(m){ return '<div class="msg them">' + m.text + '<span class="ts">' + (m.time || '') + '</span></div>'; }).join('')
      + '<div class="offline-note">' + c.name + ' is offline...</div>';
    optsWrap.innerHTML = '<div class="sent-note">Message already sent to this contact.</div>';
  } else {
    optsWrap.innerHTML = '<div class="sent-note">Choose one message to send — the other becomes unavailable once you do.</div>' +
      c.options.map(function(opt,oi){ return '<div class="send-opt"><span>' + opt.text + '</span><button class="btn" onclick="sendAccuseMsg(' + i + ',' + oi + ')">Send</button></div>'; }).join('');
  }
  paintStatusBars();
}
function getCurrentClockTime(){
  var d = new Date();
  return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
}
function sendAccuseMsg(i, oi){
  var c = DATA.accusationContacts[i];
  var text = c.options[oi].text;
  var sentTime = getCurrentClockTime();
  accuseSent[i] = 'pending';
  accuseSent[i+'_option'] = oi;
  accuseSent[i+'_text'] = text;
  accuseSent[i+'_time'] = sentTime;

  var body = document.getElementById('accChatBody');
  var optsWrap = document.getElementById('accSendOptions');
  optsWrap.innerHTML = '<div class="sent-note">Sending...</div>';
  body.innerHTML = '<div class="msg you">' + text + '<span class="ts" id="sentTs">' + sentTime + '</span></div>';

  var typing = document.createElement('div');
  typing.className = 'typing';
  typing.innerHTML = '<i></i><i></i><i></i>';

  var idx = 0;
  function showTyping(){
    if(typing.parentNode) typing.parentNode.removeChild(typing);
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;
  }
  function nextReply(){
    var selectedReplies = c.replies[oi] || [];
    if(idx >= selectedReplies.length){
      if(typing.parentNode) typing.parentNode.removeChild(typing);
      var off = document.createElement('div');
      off.className = 'offline-note';
      off.textContent = c.name + ' is offline...';
      body.appendChild(off);
      body.scrollTop = body.scrollHeight;
      accuseSent[i] = 'done';
      optsWrap.innerHTML = '<div class="sent-note">Message already sent to this contact.</div>';
      return;
    }
    var m = selectedReplies[idx];
    var typingTime = Math.max(900, Math.min(2800, 650 + String(m.text || '').length * 32));
    showTyping();
    setTimeout(function(){
      if(typing.parentNode) typing.parentNode.removeChild(typing);
      var bub = document.createElement('div');
      bub.className = 'msg them';
      bub.innerHTML = m.text + '<span class="ts">' + getCurrentClockTime() + '</span>';
      body.appendChild(bub);
      body.scrollTop = body.scrollHeight;
      idx++;
      if(idx < selectedReplies.length){
        setTimeout(nextReply, 1000);
      } else {
        setTimeout(nextReply, 1000);
      }
    }, idx === 0 ? 2000 + typingTime : typingTime);
  }
  setTimeout(nextReply, 2000);
}

function accuseBack(){
  document.getElementById('accChat').classList.remove('active');
  document.getElementById('accList').classList.add('active');
  renderAccuseList();
}

/* ---------- scroll-reveal ----------
   Hardened: if IntersectionObserver is unavailable, or throws for
   any reason, every .reveal-on-scroll section is made visible
   immediately instead of staying hidden forever. This is the fix
   for content silently disappearing in browsers/viewers without
   IntersectionObserver support. */
(function(){
  var sections = document.querySelectorAll('.reveal-on-scroll');
  function showAllSections(){
    for (var i = 0; i < sections.length; i++){
      sections[i].classList.add('in-view');
    }
  }
  if (!('IntersectionObserver' in window)) {
    showAllSections();
    return;
  }
  try {
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    for (var i = 0; i < sections.length; i++){
      revealObserver.observe(sections[i]);
    }
    /* Safety net: if for any reason a section never gets marked
       in-view (e.g. it is already fully in the viewport on load
       and the browser's observer implementation is inconsistent
       about firing immediately, or local file:// restrictions
       affect observer timing), reveal everything after a short
       delay regardless. This never removes functionality — it
       only guarantees content cannot stay invisible. */
    setTimeout(showAllSections, 2000);
  } catch (e) {
    showAllSections();
  }
})();


/* ============================================================
   VISUAL ENHANCEMENTS — Added purely for aesthetics.
   No functionality is changed.
============================================================ */

/* ---- Custom cursor (lightweight version — glow removed for performance,
   click-scale pulse on the dot kept exactly as before) ---- */
(function(){
  var dot = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  var mx=0, my=0, rx=0, ry=0;
  var dotScale = 1, ringScale = 1;

  document.addEventListener('mousemove', function(e){
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%) scale(' + dotScale + ')';
  }, {passive:true});

  function animCursor(){
    var dx = mx - rx, dy = my - ry;
    if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
      rx += dx * 0.18;
      ry += dy * 0.18;
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%) scale(' + ringScale + ')';
    }
    requestAnimationFrame(animCursor);
  }
  animCursor();

  // Scale on interactive elements
  var interactors = 'a,button,.btn,.block-tile,.contact-row,.db-row,.folder-toggle,.expand-btn';
  document.addEventListener('mouseover', function(e){
    if(e.target.closest(interactors)){
      ring.style.width = '46px';
      ring.style.height = '46px';
      ring.style.borderColor = 'rgba(181,52,47,0.8)';
      dot.style.opacity = '0.5';
    }
  });
  document.addEventListener('mouseout', function(e){
    if(e.target.closest(interactors)){
      ring.style.width = '28px';
      ring.style.height = '28px';
      ring.style.borderColor = 'rgba(181,52,47,0.5)';
      dot.style.opacity = '1';
    }
  });
  document.addEventListener('mousedown', function(){
    dotScale = 1.5; ringScale = 0.8;
    dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%) scale(' + dotScale + ')';
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%) scale(' + ringScale + ')';
  });
  document.addEventListener('mouseup', function(){
    dotScale = 1; ringScale = 1;
    dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%) scale(' + dotScale + ')';
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%) scale(' + ringScale + ')';
  });
  // Hide on leave
  document.addEventListener('mouseleave', function(){ dot.style.opacity='0'; ring.style.opacity='0'; });
  document.addEventListener('mouseenter', function(){ dot.style.opacity='1'; ring.style.opacity='1'; });
})();

/* ---- Button ripple effect ---- */
document.addEventListener('click', function(e){
  var btn = e.target.closest('.btn');
  if(!btn) return;
  var r = btn.getBoundingClientRect();
  var size = Math.max(r.width, r.height) * 1.2;
  var x = e.clientX - r.left - size/2;
  var y = e.clientY - r.top  - size/2;
  var ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;';
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', function(){ ripple.parentNode && ripple.parentNode.removeChild(ripple); });
}, false);

/* ---- Device-aware performance tuning ---- */
(function(){
  var cores = navigator.hardwareConcurrency || 8;
  var memory = navigator.deviceMemory || 8;
  var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  if (cores <= 4 || memory <= 4 || (coarse && cores <= 6)) {
    document.body.classList.add('performance-lite');
  }
})();

/* ---- Ambient canvas: particles + fog ---- */
(function(){
  var canvas = document.getElementById('ambient-canvas');
  var ctx    = canvas.getContext('2d');
  var W, H;

  function resize(){
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Dust particles
  var PARTICLE_COUNT = document.body.classList.contains('performance-lite') ? 36 : 60;
  var particles = Array.from({length: PARTICLE_COUNT}, function(){
    return {
      x: Math.random() * (typeof W !== 'undefined' ? W : window.innerWidth),
      y: Math.random() * (typeof H !== 'undefined' ? H : window.innerHeight),
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(Math.random() * 0.12 + 0.04),
      alpha: Math.random() * 0.35 + 0.05,
      hue: Math.random() < 0.3 ? 'rgba(181,52,47,' : Math.random() < 0.5 ? 'rgba(156,124,58,' : 'rgba(180,170,155,'
    };
  });

  // Fog blobs
  var FOG_COUNT = document.body.classList.contains('performance-lite') ? 3 : 5;
  var fogs = Array.from({length: FOG_COUNT}, function(_, i){
    return {
      x: Math.random() * (typeof W !== 'undefined' ? W : window.innerWidth),
      y: Math.random() * (typeof H !== 'undefined' ? H : window.innerHeight),
      r: 200 + Math.random() * 300,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.04,
      alpha: 0.01 + Math.random() * 0.025,
      phase: i * Math.PI * 2 / FOG_COUNT
    };
  });

  var tick = 0;
  var lastDrawTime = 0;
  var DRAW_INTERVAL = document.body.classList.contains('performance-lite') ? (1000 / 24) : (1000 / 30); // ambient scene only needs ~30fps to look smooth;
                                  // this frees up frame budget so the cursor (which
                                  // tracks the mouse every frame) stays perfectly smooth

  function draw(now){
    requestAnimationFrame(draw);
    if (document.hidden || document.body.classList.contains('perf-low') || document.documentElement.classList.contains('theme-switching')) return;
    if (now - lastDrawTime < DRAW_INTERVAL) return;
    lastDrawTime = now;

    ctx.clearRect(0, 0, W, H);

    // Draw fog
    for(var fi=0; fi<fogs.length; fi++){
      var fog = fogs[fi];
      fog.x += fog.vx;
      fog.y += fog.vy;
      if(fog.x < -fog.r) fog.x = W + fog.r;
      if(fog.x > W + fog.r) fog.x = -fog.r;
      if(fog.y < -fog.r) fog.y = H + fog.r;
      if(fog.y > H + fog.r) fog.y = -fog.r;

      var breathe = fog.alpha * (0.6 + 0.4 * Math.sin(tick * 0.005 + fog.phase));
      var g = ctx.createRadialGradient(fog.x, fog.y, 0, fog.x, fog.y, fog.r);
      if(document.body.classList.contains('light-theme')){
        g.addColorStop(0, 'rgba(167,46,42,' + (breathe * 0.9) + ')');
        g.addColorStop(0.4, 'rgba(120,80,70,' + (breathe * 0.28) + ')');
      } else {
        g.addColorStop(0, 'rgba(181,52,47,' + breathe + ')');
        g.addColorStop(0.4, 'rgba(60,20,20,' + (breathe * 0.4) + ')');
      }
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(fog.x, fog.y, fog.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    // Draw particles
    for(var pi=0; pi<particles.length; pi++){
      var p = particles[pi];
      p.x += p.vx + Math.sin(tick * 0.008 + p.y * 0.01) * 0.06;
      p.y += p.vy;
      if(p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      if(p.x < 0) p.x = W;
      if(p.x > W) p.x = 0;

      var breathe2 = p.alpha * (0.5 + 0.5 * Math.sin(tick * 0.02 + p.x * 0.01));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      if(document.body.classList.contains('light-theme')){
        var lightHue = p.hue.indexOf('181,52,47') !== -1
          ? 'rgba(167,46,42,'
          : p.hue.indexOf('156,124,58') !== -1
            ? 'rgba(139,107,45,'
            : 'rgba(92,86,78,';
        ctx.fillStyle = lightHue + Math.max(breathe2, 0.10) + ')';
      } else {
        ctx.fillStyle = p.hue + breathe2 + ')';
      }
      ctx.fill();
    }

    tick++;
  }
  requestAnimationFrame(draw);
})();

/* ---- Header shadow on scroll ---- */
(function(){
  var hdr = document.querySelector('header');
  window.addEventListener('scroll', function(){
    var lightMode = document.body.classList.contains('light-theme');
    if(lightMode){
      hdr.style.boxShadow = window.scrollY > 10
        ? '0 1px 0 rgba(181,52,47,0.30), 0 8px 30px rgba(181,52,47,0.34), 0 0 14px rgba(181,52,47,0.16)'
        : '0 1px 0 rgba(181,52,47,0.24), 0 4px 20px rgba(181,52,47,0.28), 0 0 12px rgba(181,52,47,0.14)';
    } else {
      hdr.style.boxShadow = window.scrollY > 10
        ? '0 1px 0 rgba(181,52,47,0.15), 0 8px 30px rgba(0,0,0,0.8)'
        : '0 1px 0 rgba(181,52,47,0.1), 0 4px 20px rgba(0,0,0,0.6)';
    }
  }, {passive:true});
})();

/* ---- Stagger reveal for db rows ---- */
(function(){
  if (!('MutationObserver' in window)) return;
  var dbObserver = new MutationObserver(function(){
    var rows = document.querySelectorAll('.db-row');
    for (var i = 0; i < rows.length; i++){
      var row = rows[i];
      row.style.animationDelay = (i * 0.05) + 's';
      row.style.animation = 'fadeInDbRow 0.4s ease both';
      row.style.animationDelay = (i * 0.04) + 's';
    }
  });
  var dbWrap2 = document.getElementById('dbRowsWrap');
  if(dbWrap2) dbObserver.observe(dbWrap2, {attributes:true});
})();

// Inject db row animation
var dbStyle = document.createElement('style');
dbStyle.textContent = '@keyframes fadeInDbRow { from{opacity:0;transform:translateX(-8px);} to{opacity:1;transform:translateX(0);} }';
document.head.appendChild(dbStyle);
;

/* ===================== script 2 ===================== */
/* ============================================================
   ROOM INITIALIZATION + PHYSICAL LIGHTING
   These controls are additive visual interactions. They do not
   touch investigation data or existing application state.
============================================================ */
(function(){
  var boot = document.getElementById('bootScreen');
  if(!boot) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var duration = reduced ? 420 : 3650;
  window.setTimeout(function(){
    boot.classList.add('is-complete');
    window.setTimeout(function(){
      if(boot && boot.parentNode) boot.parentNode.removeChild(boot);
    }, reduced ? 280 : 1100);
  }, duration);
})();

(function(){
  /* DESK LAMP and HANGING BULB are completely independent state machines. */
  var lamp=document.getElementById('deskLamp');
  if(lamp){
    function setDeskLampState(on){
      var enabled=!!on;
      document.body.classList.toggle('desk-lamp-on',enabled);
      lamp.setAttribute('aria-pressed',enabled?'true':'false');
      var railLamp=document.querySelector('.rail-lamp');
      if(railLamp) railLamp.setAttribute('aria-pressed',enabled?'true':'false');
    }
    window.setDeskLampState=setDeskLampState;
    window.setRoomLamp=setDeskLampState;
    lamp.addEventListener('click',function(){
      setDeskLampState(!document.body.classList.contains('desk-lamp-on'));
    });
  }

  var bulb=document.getElementById('hangingBulb');
  if(!bulb) return;

  var wire=bulb.querySelector('.wire');
  var glass=bulb.querySelector('.bulb-glass');
  if(!wire || !glass) return;

  /*
    PHYSICAL PULL-BULB MODEL
    ------------------------
    - The hanging-bulb element is the FIXED ceiling anchor.
    - The glass is the actual MOVING BULB.
    - The wire is always drawn from that fixed anchor to the bulb.
    - Therefore the wire can never detach from the bulb or move independently.
    - The farther the bulb is pulled, the longer the wire becomes.
    - Horizontal movement changes the wire angle while the bulb follows the
      pointer exactly.
    - On release both visually recoil to the original position.
    - Each new completed downward pull toggles the bulb ON/OFF once.
  */

  var dragging=false;
  var pointerId=null;
  var grabX=0, grabY=0;
  var dx=0, dy=0;
  var pullTriggered=false;
  var springToken=0;

  var REST_WIRE=166;
  var MAX_X=175;
  var MAX_DOWN=190;
  var MAX_UP=105;
  var DOWN_TRIGGER=34;

  function clamp(v,min,max){
    return Math.max(min,Math.min(max,v));
  }

  function toggleHangingBulb(){
    var on=!document.body.classList.contains('hanging-bulb-on');
    document.body.classList.toggle('hanging-bulb-on',on);
    bulb.setAttribute('aria-pressed',on?'true':'false');
    try{ if(window.caseFilesSound) window.caseFilesSound.bulb(on); }catch(e){}   /* pull-switch click + spark (see lens sound block) */
  }

  /*
    px/py are the bulb's displacement from its original hanging point.
    The wire starts at (0,0), stretches to the bulb's top attachment point,
    and rotates toward that exact endpoint.
  */
  var velX=0, velY=0;

  /* Compositor-only update: the cord is rotated + stretched, the bulb is
     translated + rotated about its top (the cord attachment point). */
  function render(px,py){
    px=clamp(px,-MAX_X,MAX_X);
    py=clamp(py,-MAX_UP,MAX_DOWN);

    var endY=REST_WIRE+py;
    var length=Math.hypot(px,endY);
    var angle=(-Math.atan2(px,endY)*180/Math.PI).toFixed(2);

    wire.style.setProperty('transform','rotate('+angle+'deg) scaleY('+(length/REST_WIRE).toFixed(4)+')','important');
    glass.style.setProperty('transform','translate3d('+px.toFixed(2)+'px,'+py.toFixed(2)+'px,0) translate(-50%,-2px) rotate('+angle+'deg)','important');

    dx=px;
    dy=py;
  }

  /* Damped spring (underdamped, like a real pendulum on a rubber cord).
     Carries the release velocity so a quick flick keeps swinging. */
  function springBack(){
    var token=++springToken;
    var x=dx, y=dy;
    var vx=clamp(velX,-1400,1400), vy=clamp(velY,-1400,1400);
    var last=performance.now();
    var K=190, C=10.5;

    function frame(now){
      if(token!==springToken) return;
      var dt=Math.min(0.032,Math.max(0,(now-last)/1000));
      last=now;
      var steps=Math.max(1,Math.ceil(dt/0.008));
      var h=dt/steps;
      for(var i=0;i<steps;i++){
        vx+=(-K*x-C*vx)*h;
        vy+=(-K*y-C*vy)*h;
        x+=vx*h;
        y+=vy*h;
      }
      render(x,y);
      if(Math.abs(x)<0.06 && Math.abs(y)<0.06 && Math.abs(vx)<0.5 && Math.abs(vy)<0.5){
        render(0,0);
        return;
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function getBulbCenter(){
    var r=glass.getBoundingClientRect();
    return {
      x:r.left+r.width/2,
      y:r.top+r.height/2
    };
  }

  function beginDrag(e){
    if(dragging) return;
    if(document.body.classList.contains('diary-is-open')) return;
    if(e.pointerType==='mouse' && e.button!==0) return;

    springToken++;

    var c=getBulbCenter();
    var hitRadius=Math.max(34,glass.offsetHeight*0.6);

    if(Math.hypot(e.clientX-c.x,e.clientY-c.y)>hitRadius) return;

    dragging=true;
    try{ if(window.caseFilesSound) window.caseFilesSound.unlock(); }catch(e){}   /* user gesture: allow audio */
    try{ if(window.cfBusy) window.cfBusy(1e9); }catch(e){}                       /* held: not counted by the frame-rate governor */
    pointerId=e.pointerId;
    pullTriggered=false;
    velX=0; velY=0;
    lastCX=e.clientX; lastCY=e.clientY;
    prevPX=dx; prevPY=dy; prevT=performance.now();
    /* Pause the page's heavy cursor-following lighting while the bulb is held. */
    document.body.classList.add('bulb-dragging');

    /* Preserve the exact point where the bulb was grabbed. */
    /* Measure the grab point from the cord attachment (the bulb's pivot), so
       grabbing never makes the bulb jump or accidentally toggle it. */
    var ar=bulb.getBoundingClientRect();
    grabX=e.clientX-(ar.left+dx);
    grabY=e.clientY-(ar.top+REST_WIRE+dy);

    glass.style.cursor='grabbing';

    e.preventDefault();
    e.stopPropagation();
  }

  var lastCX=0,lastCY=0,dragRaf=0,prevPX=0,prevPY=0,prevT=0;

  /* One update per animation frame (not per raw pointer event). */
  function dragTick(now){
    dragRaf=0;
    if(!dragging) return;

    var a=bulb.getBoundingClientRect();
    var px=clamp(lastCX-grabX-a.left,-MAX_X,MAX_X);
    var py=clamp(lastCY-grabY-a.top-REST_WIRE,-MAX_UP,MAX_DOWN);

    render(px,py);

    var dt=(now-prevT)/1000;
    if(dt>0.001){
      velX=velX*0.6+((px-prevPX)/dt)*0.4;
      velY=velY*0.6+((py-prevPY)/dt)*0.4;
    }
    prevPX=px; prevPY=py; prevT=now;

    /* Every separate downward pull toggles exactly once. */
    if(py>=DOWN_TRIGGER && !pullTriggered){
      toggleHangingBulb();
      pullTriggered=true;
    }
  }

  function moveDrag(e){
    if(!dragging || e.pointerId!==pointerId) return;
    lastCX=e.clientX;
    lastCY=e.clientY;
    if(!dragRaf) dragRaf=requestAnimationFrame(dragTick);
    e.preventDefault();
  }

  function releaseDrag(e){
    if(!dragging) return;
    if(e && e.pointerId!==undefined && e.pointerId!==pointerId) return;

    dragging=false;
    try{ if(window.caseFilesSound) window.caseFilesSound.unlock(); }catch(e){}   /* iOS: also resume on release */
    try{ if(window.cfBusy) window.cfBusy(3500); }catch(e){}                      /* spring-back + glow fade: still ignored for a moment */
    pointerId=null;
    if(dragRaf){cancelAnimationFrame(dragRaf);dragRaf=0;}
    document.body.classList.remove('bulb-dragging');
    glass.style.cursor='grab';

    springBack();
  }

  /*
    Capture-phase listeners make the physical bulb draggable even when the
    cinematic scene has another visual layer nearby.
  */
  document.addEventListener('pointerdown',beginDrag,true);
  document.addEventListener('pointermove',moveDrag,true);
  document.addEventListener('pointerup',releaseDrag,true);
  document.addEventListener('pointercancel',releaseDrag,true);

  /*
    A normal click is intentionally NOT a bulb toggle.
    The bulb is operated by pulling it downward, like a real pull switch.
  */
  glass.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();
  });

  render(0,0);
})();


/* Diary uses the existing first two entries and additional physical blank pages. */
var DIARY_PAGES=[
  {kicker:function(){return 'FIELD NOTE / '+((typeof DATA!=='undefined'&&DATA.caseNo)?DATA.caseNo:'CASE #00-000');},title:'The room remembers',body:function(){var d=(typeof DATA!=='undefined'&&DATA.sub)?DATA.sub:'Every object in this room was left in a particular order. The order is the first clue.';return '<p>'+d+'</p><p>The file is active. The archive is incomplete. What looks like a loose detail keeps appearing in more than one place.</p><p class="hand-note">Do not trust the obvious answer. Read the phones twice.</p>'; }},
  {kicker:function(){return 'WORKING NOTES / 23:17';},title:'Threads to follow',body:function(){return '<ul><li>Open the archive before touching the chest.</li><li>Compare the conversations, not just the names.</li><li>Photograph the evidence board in your memory.</li><li>Make the accusation only when the pattern holds.</li></ul><p class="hand-note">The answer is hidden in repetition.</p>'; }},
  {kicker:function(){return 'FIELD NOTE / 03';},title:'',body:function(){return '<p class="hand-note"> </p>'; }},
  {kicker:function(){return 'FIELD NOTE / 04';},title:'',body:function(){return '<p class="hand-note"> </p>'; }},
  {kicker:function(){return 'FIELD NOTE / 05';},title:'',body:function(){return '<p class="hand-note"> </p>'; }},
  {kicker:function(){return 'FIELD NOTE / 06';},title:'',body:function(){return '<p class="hand-note"> </p>'; }}
];
var diaryPageIndex=0,diaryTurning=false;
function diaryPageMarkup(i){var p=DIARY_PAGES[i];return '<div class="sheet-content"><span class="page-kicker">'+p.kicker()+'</span>'+(p.title?'<h3>'+p.title+'</h3>':'')+p.body()+'</div><span class="page-number">'+String(i+1).padStart(2,'0')+'</span>';}
function renderDiaryPages(){
  var l=document.getElementById('diaryLeftPage'),r=document.getElementById('diaryRightPage'),c=document.getElementById('diaryPageCounter'),pr=document.getElementById('diaryPrev'),nx=document.getElementById('diaryNext');
  if(!l||!r)return;l.innerHTML=diaryPageMarkup(diaryPageIndex);r.innerHTML=diaryPageMarkup(Math.min(diaryPageIndex+1,DIARY_PAGES.length-1));
  if(c)c.textContent=String(diaryPageIndex+1).padStart(2,'0')+' / '+String(DIARY_PAGES.length).padStart(2,'0');
  if(pr)pr.disabled=diaryPageIndex<=0;if(nx)nx.disabled=diaryPageIndex>=DIARY_PAGES.length-1;
}
function diaryNext(){
  if(diaryTurning||diaryPageIndex>=DIARY_PAGES.length-1)return;
  var layer=document.getElementById('diaryTurnLayer'),front=document.getElementById('diaryTurnFront'),back=document.getElementById('diaryTurnBack');if(!layer)return;
  front.innerHTML=diaryPageMarkup(diaryPageIndex+1);back.innerHTML=diaryPageMarkup(Math.min(diaryPageIndex+2,DIARY_PAGES.length-1));
  layer.classList.remove('is-turning','is-turning-back');void layer.offsetWidth;layer.classList.add('is-turning');diaryTurning=true;
  setTimeout(function(){diaryPageIndex++;renderDiaryPages();layer.classList.remove('is-turning');diaryTurning=false;},790);
}
function diaryPrevious(){
  if(diaryTurning||diaryPageIndex<=0)return;
  var layer=document.getElementById('diaryTurnLayer'),front=document.getElementById('diaryTurnFront'),back=document.getElementById('diaryTurnBack');if(!layer)return;
  /* Reverse is a true right-to-left turn, not the forward animation played backwards. */
  front.innerHTML=diaryPageMarkup(diaryPageIndex);back.innerHTML=diaryPageMarkup(diaryPageIndex-1);
  layer.classList.remove('is-turning','is-turning-back');void layer.offsetWidth;layer.classList.add('is-turning-back');diaryTurning=true;
  setTimeout(function(){diaryPageIndex--;renderDiaryPages();layer.classList.remove('is-turning-back');diaryTurning=false;},790);
}
function openDiary(){var o=document.getElementById('diaryOverlay');if(!o)return;diaryPageIndex=0;diaryTurning=false;renderDiaryPages();o.classList.add('is-open');o.setAttribute('aria-hidden','false');document.body.classList.add('diary-is-open');var c=o.querySelector('.diary-close');if(c)c.focus();}
function closeDiary(){var o=document.getElementById('diaryOverlay');if(!o)return;o.classList.remove('is-open');o.setAttribute('aria-hidden','true');document.body.classList.remove('diary-is-open');var c=document.getElementById('diaryCover');if(c)c.focus();}
(function(){var cover=document.getElementById('diaryCover'),overlay=document.getElementById('diaryOverlay');if(cover)cover.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openDiary();}});if(overlay)overlay.addEventListener('click',function(e){if(e.target===overlay)closeDiary();});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&overlay&&overlay.classList.contains('is-open'))closeDiary();if(overlay&&overlay.classList.contains('is-open')){if(e.key==='ArrowRight')diaryNext();if(e.key==='ArrowLeft')diaryPrevious();}});})();

(function(){
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if(!fine) return;
  var root = document.documentElement, raf = 0, px = 50, py = 50;
  document.addEventListener('pointermove',function(e){
    if(document.body.classList.contains('bulb-dragging')) return;
    px = (e.clientX / Math.max(window.innerWidth,1)) * 100;
    py = (e.clientY / Math.max(window.innerHeight,1)) * 100;
    if(raf) return;
    raf = window.requestAnimationFrame(function(){
      raf = 0;
      if(window.__sceneFollow) window.__sceneFollow(px,py);   /* compositor-only: moves one layer by transform */
    });
  },{passive:true});
})();
;

/* ===================== diary-content-and-mobile-fix ===================== */
/* Diary content + responsive page-turn controller. */
DIARY_PAGES = [
  {
    kicker:function(){return 'FIELD NOTE / '+((typeof DATA!=='undefined'&&DATA.caseNo)?DATA.caseNo:'CASE #00-000');},
    title:'Nermin is missing',
    body:function(){
      var d=(typeof DATA!=='undefined'&&DATA.sub)?DATA.sub:'Every object in this room was left in a particular order. The order is the first clue.';
      return '<p>'+d+'</p><p>The file is active. The archive is incomplete. What looks like a loose detail keeps appearing in more than one place.</p><p class="hand-note">Do not trust the obvious answer. Read the phones twice.</p>';
    }
  },
  {
    kicker:function(){return 'WORKING NOTES / 23:17';},
    title:'Threads to follow',
    body:function(){return '<ul><li>Open the archive before touching the chest.</li><li>Compare the conversations, not just the names.</li><li>Photograph the evidence board in your memory.</li><li>Make the accusation only when the pattern holds.</li></ul><p class="hand-note">The answer is hidden in repetition.</p>';}
  },
  {
    kicker:function(){return 'FIELD NOTE / 03 / RAIN ON THE WINDOW';},
    title:'Night inventory',
    body:function(){return '<p>The lamp was left on, although nobody remembers turning it on. Rain has softened the footprints near the sill, but the dust on the desk is undisturbed.</p><p>One cup. Two chairs. Three keys that do not open the same door.</p><p class="hand-note">Someone was waiting here longer than they admitted.</p>';}
  },
  {
    kicker:function(){return 'WITNESS FRAGMENT / 04:06';},
    title:'A voice in the hall',
    body:function(){return '<p>“I heard the lock turn,” the neighbour said. “Then I heard someone laugh.” She paused before adding that the laugh sounded practiced, as if it belonged to a person trying to sound calm.</p><p>The corridor camera loses six minutes at midnight. The clock above it loses seven.</p><p class="hand-note">Small errors are still evidence.</p>';}
  },
  {
    kicker:function(){return 'CROSS-REFERENCE / 05';},
    title:'The repeated mark',
    body:function(){return '<p>The same four-point mark appears on the envelope, the phone case, and the corner of the photograph. It is too deliberate to be decoration and too ordinary to be a signature.</p><ul><li>Look for what is missing.</li><li>Count the pauses.</li><li>Do not confuse silence with innocence.</li></ul>';}
  },
  {
    kicker:function(){return 'UNSENT / 06';},
    title:'Letter never delivered',
    body:function(){return '<p>I kept the light on for you. I kept the door unlatched. By morning, the room had changed, but the chair was still facing the window.</p><p>If you return, do not knock. The house has learned the sound of your footsteps.</p><p class="hand-note">Folded twice. Never posted.</p>';}
  },
  {
    kicker:function(){return 'CASE MARGIN / 07';},
    title:'Contradictions',
    body:function(){return '<p>Everyone remembers the weather differently. One witness says the street was empty; another remembers a blue coat crossing it. Both are certain. Neither is useful alone.</p><p>Build the timeline from objects, not confidence. Objects cannot rehearse a story.</p><p class="hand-note">Certainty is not the same as truth.</p>';}
  },
  {
    kicker:function(){return 'LAST ENTRY / 08 / 02:11';},
    title:'Keep the page open',
    body:function(){return '<p>The final page is not an answer. It is a place to leave the question while the evidence is still warm.</p><p>Close the book when you are ready. The room will still be here, and the next clue will be waiting where you left it.</p><p class="hand-note">End of current notes. Continue the investigation.</p>';}
  }
];

diaryPageIndex = 0;
diaryTurning = false;
function diaryIsMobile(){
  return !!(window.matchMedia && window.matchMedia('(max-width: 760px)').matches);
}
function diaryPageMarkup(i){
  var p=DIARY_PAGES[Math.max(0,Math.min(i,DIARY_PAGES.length-1))];
  return '<div class="sheet-content"><span class="page-kicker">'+p.kicker()+'</span>'+(p.title?'<h3>'+p.title+'</h3>':'')+p.body()+'</div><span class="page-number">'+String(i+1).padStart(2,'0')+'</span>';
}
function renderDiaryPages(){
  var l=document.getElementById('diaryLeftPage'),r=document.getElementById('diaryRightPage'),c=document.getElementById('diaryPageCounter'),pr=document.getElementById('diaryPrev'),nx=document.getElementById('diaryNext');
  if(!l||!r)return;
  if(diaryIsMobile()){
    l.innerHTML=diaryPageMarkup(diaryPageIndex);
    r.innerHTML='';
  }else{
    l.innerHTML=diaryPageMarkup(diaryPageIndex);
    r.innerHTML=diaryPageMarkup(Math.min(diaryPageIndex+1,DIARY_PAGES.length-1));
  }
  if(c)c.textContent=String(diaryPageIndex+1).padStart(2,'0')+' / '+String(DIARY_PAGES.length).padStart(2,'0');
  if(pr)pr.disabled=diaryPageIndex<=0;
  if(nx)nx.disabled=diaryPageIndex>=DIARY_PAGES.length-1;
}
function diaryFinishTurn(layer,backwards){
  window.setTimeout(function(){
    diaryPageIndex += backwards ? -1 : 1;
    renderDiaryPages();
    layer.classList.remove('is-turning','is-turning-back');
    diaryTurning=false;
  },diaryIsMobile()?330:380);
}
function diaryNext(){
  if(diaryTurning||diaryPageIndex>=DIARY_PAGES.length-1)return;
  var layer=document.getElementById('diaryTurnLayer'),front=document.getElementById('diaryTurnFront'),back=document.getElementById('diaryTurnBack');
  if(!layer)return;
  if(diaryIsMobile()){
    front.innerHTML=diaryPageMarkup(diaryPageIndex);
    back.innerHTML=diaryPageMarkup(diaryPageIndex+1);
    layer.classList.remove('is-turning','is-turning-back');
    void layer.offsetWidth;
    layer.classList.add('is-turning');
    diaryTurning=true;
    diaryFinishTurn(layer,false);
    return;
  }
  front.innerHTML=diaryPageMarkup(diaryPageIndex+1);
  back.innerHTML=diaryPageMarkup(Math.min(diaryPageIndex+2,DIARY_PAGES.length-1));
  layer.classList.remove('is-turning','is-turning-back');
  void layer.offsetWidth;
  layer.classList.add('is-turning');
  diaryTurning=true;
  diaryFinishTurn(layer,false);
}
function diaryPrevious(){
  if(diaryTurning||diaryPageIndex<=0)return;
  var layer=document.getElementById('diaryTurnLayer'),front=document.getElementById('diaryTurnFront'),back=document.getElementById('diaryTurnBack');
  if(!layer)return;
  if(diaryIsMobile()){
    front.innerHTML=diaryPageMarkup(diaryPageIndex);
    back.innerHTML=diaryPageMarkup(diaryPageIndex-1);
    layer.classList.remove('is-turning','is-turning-back');
    void layer.offsetWidth;
    layer.classList.add('is-turning-back');
    diaryTurning=true;
    diaryFinishTurn(layer,true);
    return;
  }
  front.innerHTML=diaryPageMarkup(diaryPageIndex);
  back.innerHTML=diaryPageMarkup(diaryPageIndex-1);
  layer.classList.remove('is-turning','is-turning-back');
  void layer.offsetWidth;
  layer.classList.add('is-turning-back');
  diaryTurning=true;
  diaryFinishTurn(layer,true);
}
function openDiary(){
  var o=document.getElementById('diaryOverlay');
  if(!o)return;
  diaryPageIndex=0;
  diaryTurning=false;
  renderDiaryPages();
  o.classList.add('is-open');
  o.setAttribute('aria-hidden','false');
  document.body.classList.add('diary-is-open');
  var c=o.querySelector('.diary-close');
  if(c)c.focus();
}
function closeDiary(){
  var o=document.getElementById('diaryOverlay');
  if(!o)return;
  o.classList.remove('is-open');
  o.setAttribute('aria-hidden','true');
  document.body.classList.remove('diary-is-open');
  var c=document.getElementById('diaryCover');
  if(c)c.focus();
}
/* Keep the already-installed keyboard listener, but make the current page
   count dynamic after viewport changes. */
window.addEventListener('resize',function(){
  if(document.getElementById('diaryOverlay') && document.getElementById('diaryOverlay').classList.contains('is-open') && !diaryTurning){
    renderDiaryPages();
  }
});
;

/* ===================== diary-mobile-spread-controller ===================== */
/* Mobile keeps a full open spread: page 1 + 2, then 3 + 4, etc. */
function diaryMobileSpreadMarkup(i){
  var html='<div class="mobile-turn-spread">';
  html+='<article class="mobile-turn-page">'+diaryPageMarkup(i)+'</article>';
  if(i+1<DIARY_PAGES.length){
    html+='<article class="mobile-turn-page">'+diaryPageMarkup(i+1)+'</article>';
  }
  return html+'</div>';
}
function diarySpreadCounter(){
  var start=diaryPageIndex+1;
  var end=Math.min(diaryPageIndex+2,DIARY_PAGES.length);
  return String(start).padStart(2,'0')+'–'+String(end).padStart(2,'0')+' / '+String(DIARY_PAGES.length).padStart(2,'0');
}
function renderDiaryPages(){
  var l=document.getElementById('diaryLeftPage'),r=document.getElementById('diaryRightPage'),c=document.getElementById('diaryPageCounter'),pr=document.getElementById('diaryPrev'),nx=document.getElementById('diaryNext');
  if(!l||!r)return;
  if(diaryIsMobile()){
    l.innerHTML=diaryPageMarkup(diaryPageIndex);
    r.innerHTML=diaryPageMarkup(Math.min(diaryPageIndex+1,DIARY_PAGES.length-1));
    if(c)c.textContent=diarySpreadCounter();
    if(pr)pr.disabled=diaryPageIndex<=0;
    if(nx)nx.disabled=diaryPageIndex+2>=DIARY_PAGES.length;
  }else{
    l.innerHTML=diaryPageMarkup(diaryPageIndex);
    r.innerHTML=diaryPageMarkup(Math.min(diaryPageIndex+1,DIARY_PAGES.length-1));
    if(c)c.textContent=String(diaryPageIndex+1).padStart(2,'0')+' / '+String(DIARY_PAGES.length).padStart(2,'0');
    if(pr)pr.disabled=diaryPageIndex<=0;
    if(nx)nx.disabled=diaryPageIndex+1>=DIARY_PAGES.length-1;
  }
}
function diaryFinishTurn(layer,backwards){
  window.setTimeout(function(){
    var step=diaryIsMobile()?2:1;
    diaryPageIndex += backwards ? -step : step;
    if(diaryPageIndex<0)diaryPageIndex=0;
    if(diaryIsMobile() && diaryPageIndex>DIARY_PAGES.length-2)diaryPageIndex=Math.max(0,DIARY_PAGES.length-2);
    renderDiaryPages();
    layer.classList.remove('is-turning','is-turning-back');
    diaryTurning=false;
  },diaryIsMobile()?360:400);
}
function diaryNext(){
  var last=Math.max(0,DIARY_PAGES.length-2);
  if(diaryTurning||diaryPageIndex>=last)return;
  var layer=document.getElementById('diaryTurnLayer'),front=document.getElementById('diaryTurnFront'),back=document.getElementById('diaryTurnBack');
  if(!layer)return;
  if(diaryIsMobile()){
    front.innerHTML=diaryMobileSpreadMarkup(diaryPageIndex);
    back.innerHTML=diaryMobileSpreadMarkup(diaryPageIndex+2);
  }else{
    front.innerHTML=diaryPageMarkup(diaryPageIndex+1);
    back.innerHTML=diaryPageMarkup(Math.min(diaryPageIndex+2,DIARY_PAGES.length-1));
  }
  layer.classList.remove('is-turning','is-turning-back');
  void layer.offsetWidth;
  layer.classList.add('is-turning');
  diaryTurning=true;
  diaryFinishTurn(layer,false);
}
function diaryPrevious(){
  if(diaryTurning||diaryPageIndex<=0)return;
  var layer=document.getElementById('diaryTurnLayer'),front=document.getElementById('diaryTurnFront'),back=document.getElementById('diaryTurnBack');
  if(!layer)return;
  if(diaryIsMobile()){
    front.innerHTML=diaryMobileSpreadMarkup(diaryPageIndex);
    back.innerHTML=diaryMobileSpreadMarkup(Math.max(0,diaryPageIndex-2));
  }else{
    front.innerHTML=diaryPageMarkup(diaryPageIndex);
    back.innerHTML=diaryPageMarkup(diaryPageIndex-1);
  }
  layer.classList.remove('is-turning','is-turning-back');
  void layer.offsetWidth;
  layer.classList.add('is-turning-back');
  diaryTurning=true;
  diaryFinishTurn(layer,true);
}
window.renderDiaryPages=renderDiaryPages;
window.diaryNext=diaryNext;
window.diaryPrevious=diaryPrevious;
;

/* ===================== script 5 ===================== */
(function(){
  var stage=document.getElementById('stageLight');
  var beam=stage?stage.querySelector('.stage-beam'):null;
  if(stage&&beam){
    var raf=0, mx=window.innerWidth*0.5, my=window.innerHeight*0.5;
    function update(){
      var thickness=Math.max(90, Math.min(260, 110 + (my*0.18)));
      beam.style.transform='translate3d('+mx.toFixed(0)+'px,0,0) scaleX('+(thickness/130).toFixed(3)+')';
      beam.style.opacity=(0.2 + (my/window.innerHeight)*0.15).toFixed(2);
      raf=0;
    }
    window.addEventListener('pointermove',function(e){
      if(document.body.classList.contains('bulb-dragging')) return;
      mx=e.clientX; my=e.clientY;
      if(raf) return;
      raf=requestAnimationFrame(update);
    },{passive:true});
    window.addEventListener('resize',function(){ update(); });
    update();
  }
  // Dust particles
  var canvas=document.getElementById('dustCanvas');
  if(!canvas) return;
  var ctx=canvas.getContext('2d');
  var particles=[];
  function resize(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
  resize();
  window.addEventListener('resize',resize);
  for(var i=0;i<70;i++){
    particles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*1.4+0.3,
      vx:(Math.random()-0.5)*0.15,
      vy:(Math.random()-0.5)*0.12,
      a:Math.random()*0.5+0.2
    });
  }
  var lastDust=0;
  function tick(now){
    requestAnimationFrame(tick);
    if(document.hidden||document.body.classList.contains('perf-low')||document.documentElement.classList.contains('theme-switching')) return;
    if(now-lastDust<33) return;
    lastDust=now;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0) p.x=canvas.width; if(p.x>canvas.width) p.x=0;
      if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(255,235,190,'+p.a+')';
      ctx.fill();
    }
  }
  requestAnimationFrame(tick);
})();
;

/* ===================== mobile-diary-final-js ===================== */
(function(){
  function $(id){return document.getElementById(id);}
  function mob(){return !!(window.matchMedia&&window.matchMedia('(max-width: 760px)').matches);}
  function pad(n){return String(n).padStart(2,'0');}
  var _next=window.diaryNext,_prev=window.diaryPrevious,_render=window.renderDiaryPages;

  /* Phone: exactly one page at a time. */
  function mRender(){
    var l=$('diaryLeftPage'),r=$('diaryRightPage'),c=$('diaryPageCounter'),pr=$('diaryPrev'),nx=$('diaryNext');
    if(!l)return;
    var N=DIARY_PAGES.length;
    l.innerHTML=diaryPageMarkup(diaryPageIndex);
    l.scrollTop=0;
    if(r)r.innerHTML='';
    if(c)c.textContent=pad(diaryPageIndex+1)+' / '+pad(N);
    if(pr)pr.disabled=diaryPageIndex<=0;
    if(nx)nx.disabled=diaryPageIndex>=N-1;
  }
  function turn(dir){
    if(diaryTurning)return;
    var N=DIARY_PAGES.length,i=diaryPageIndex,j=i+dir;
    if(j<0||j>=N)return;
    var layer=$('diaryTurnLayer'),front=$('diaryTurnFront'),sheet=$('diaryLeftPage'),book=$('diaryBook');
    if(!layer||!front||!sheet||!book)return;
    var W=book.clientWidth,H=book.clientHeight,D=W*0.28;
    layer.style.setProperty('--W',W+'px');
    layer.style.setProperty('--D',D+'px');
    layer.style.setProperty('--sk',(-Math.atan(D/H)*180/Math.PI).toFixed(2)+'deg');
    layer.classList.remove('is-turning','is-turning-back');
    void layer.offsetWidth;
    if(dir>0){
      var st=sheet.scrollTop;
      front.innerHTML=diaryPageMarkup(i);      /* old page peels away… */
      front.scrollTop=st;
      diaryPageIndex=j;
      mRender();                               /* …revealing the next page underneath */
      layer.classList.add('is-turning');
    }else{
      front.innerHTML=diaryPageMarkup(j);      /* previous page peels back over this one */
      front.scrollTop=0;
      layer.classList.add('is-turning-back');
    }
    diaryTurning=true;
    setTimeout(function(){
      if(dir<0){diaryPageIndex=j;mRender();}
      layer.classList.remove('is-turning','is-turning-back');
      diaryTurning=false;
    },660);
  }
  window.renderDiaryPages=function(){return mob()?mRender():_render.apply(this,arguments);};
  window.diaryNext=function(){return mob()?turn(1):_next.apply(this,arguments);};
  window.diaryPrevious=function(){return mob()?turn(-1):_prev.apply(this,arguments);};

  /* Swipe left / right to turn the page. */
  var book=$('diaryBook'),sx=0,sy=0,st=0;
  if(book){
    book.addEventListener('touchstart',function(e){var t=e.touches[0];sx=t.clientX;sy=t.clientY;st=Date.now();},{passive:true});
    book.addEventListener('touchend',function(e){
      if(!mob())return;
      var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
      if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.6&&Date.now()-st<800){dx<0?window.diaryNext():window.diaryPrevious();}
    },{passive:true});
  }
})();
;

/* ===================== perf-and-lantern-final-js ===================== */
(function(){
  var body=document.body;

  /* ---- A. Cursor-following light (replaces the per-move CSS-variable writes) ---- */
  var pool=document.querySelector('.sf-pool'),lastPX=50,lastPY=50,lampOn=false;
  function apply(){
    if(!pool)return;
    var x,y;
    if(lampOn){x=76;y=45;}else{x=48+lastPX*.24;y=18+lastPY*.16;}
    pool.style.transform='translate3d('+(x/100*window.innerWidth).toFixed(1)+'px,'+(y/100*window.innerHeight).toFixed(1)+'px,0)';
  }
  var glint=document.querySelector('.wl-glint i');
  window.__sceneFollow=function(px,py){
    lastPX=px;lastPY=py;apply();
    if(glint)glint.style.transform='translate3d('+(-30+px*3.0).toFixed(0)+'%,0,0) skewX(-18deg)';   /* cheap: transform only */
  };
  function syncLamp(){var on=body.classList.contains('desk-lamp-on');if(on!==lampOn){lampOn=on;apply();}}
  new MutationObserver(syncLamp).observe(body,{attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',apply,{passive:true});
  lampOn=body.classList.contains('desk-lamp-on');apply();

  /* ---- B. Wall lantern: placement + on/off switch ---- */
  var lan=document.getElementById('wallLantern'),glow=document.getElementById('wlGlow'),RATIO=386/600;
  var wlRaf=0;
  function placeLanternNow(){
    wlRaf=0;
    if(!lan||window.innerWidth<=760)return;
    var hero=lan.parentNode,copy=hero.querySelector('.hero-copy');
    if(!copy)return;
    /* layout position (offsetTop) instead of getBoundingClientRect(): not affected by scroll offset, transforms or in-flight animations */
    var space=copy.offsetTop;                      /* free height above the label */
    if(!(space>0))return;                          /* layout not ready: keep the current size */
    var h=Math.max(108,Math.min(200,space-14-8));
    var top=Math.max(8,Math.min(space-14-h,70));
    var left=Math.max(14,Math.min(30,copy.offsetLeft*.2));
    [lan,glow].forEach(function(el){
      if(!el)return;
      el.style.height=h.toFixed(0)+'px';
      el.style.width=(h*RATIO).toFixed(0)+'px';
      el.style.top=top.toFixed(0)+'px';
      el.style.left=left.toFixed(0)+'px';
    });
  }
  function placeLantern(){ if(!wlRaf)wlRaf=requestAnimationFrame(placeLanternNow); }   /* batch bursts of resize / observer events */
  placeLanternNow();
  /* Only re-place the lantern when the WIDTH really changes. Height-only resizes (mobile/tablet toolbar
     hiding while you scroll, 100vh changing) used to re-run the sizing with a different height and
     leave the lantern smaller after scrolling down and back up. */
  var wlLastW=window.innerWidth;
  window.addEventListener('resize',function(){
    if(window.innerWidth===wlLastW)return;
    wlLastW=window.innerWidth;
    placeLantern();
  },{passive:true});
  window.addEventListener('load',placeLantern);
  if(window.ResizeObserver){
    var c=document.querySelector('.hero-copy'),wlCW=c?c.offsetWidth:0;
    var ro=new ResizeObserver(function(){
      if(!c||c.offsetWidth===wlCW)return;
      wlCW=c.offsetWidth;placeLantern();
    });
    if(c)ro.observe(c);
  }

  var WL_KEY='caseFilesWallLantern';
  function setLantern(on,save){
    body.classList.toggle('wl-off',!on);
    ['wallLanternHit','wallLanternSwitch'].forEach(function(id){var e=document.getElementById(id);if(e)e.setAttribute('aria-checked',on?'true':'false');});
    if(save){try{localStorage.setItem(WL_KEY,on?'1':'0');}catch(e){}}
  }
  window.setWallLantern=function(on){setLantern(!!on,true);};
  var savedWL=null;try{savedWL=localStorage.getItem(WL_KEY);}catch(e){}
  setLantern(savedWL!=='0',false);                 /* on by default, remembers your choice */
  function toggleLantern(ev){if(ev)ev.preventDefault();try{if(window.cfBusy)window.cfBusy(2500);}catch(e){}setLantern(body.classList.contains('wl-off'),true);}
  ['wallLanternHit','wallLanternSwitch'].forEach(function(id){var e=document.getElementById(id);if(e)e.addEventListener('click',toggleLantern);});

  /* ---- C. Frame-rate governor: if the device really is struggling, drop to low-power ----
     FIX: low-power mode used to switch itself on after one or two theme / bulb clicks, then stay on
     (it was saved in sessionStorage), which killed the loader + the circular theme reveal until the file was reopened.
       1) deliberate heavy moments (theme reveal, bulb pull, lantern switch) call cfBusy() and are NOT counted;
       2) it needs sustained low fps (GOV below), not a short dip;
       3) it is no longer remembered across refreshes (and any old sticky flag is cleared on load). */
  var GOV={ START_AFTER_MS:4500,   /* start measuring after the intro */
            BAD_MS:40,             /* average frame time of a 1.5 s block counted as "bad" (40 ms = 25 fps) */
            BLOCKS_NEEDED:3 };     /* consecutive bad blocks (~4.5 s) before low-power turns on */
  window.cfBusy=function(ms){ window.__cfBusyUntil=performance.now()+ms; };   /* "ignore frame rate for the next ms" */
  try{sessionStorage.removeItem('cfLite');}catch(e){}
  var q=location.search;
  if(/[?&]lite=0/.test(q))return;
  function low(){body.classList.add('performance-lite','perf-low');}
  if(/[?&]lite=1/.test(q)){low();return;}
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){low();return;}
  var last=performance.now(),t0=last+GOV.START_AFTER_MS,sum=0,n=0,badBlocks=0;
  function frame(now){
    var d=now-last;last=now;
    if(now<(window.__cfBusyUntil||0)){sum=0;n=0;badBlocks=0;}        /* deliberate heavy moment: ignore */
    else if(document.hidden||d>250){sum=0;n=0;}
    else if(now>t0){
      sum+=d;n++;
      if(n===90){                       /* ~1.5 s block */
        badBlocks=(sum/n>GOV.BAD_MS)?badBlocks+1:0;
        sum=0;n=0;
        if(badBlocks>=GOV.BLOCKS_NEEDED){low();return;}
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
;

/* ===================== wall-lantern-light-js ===================== */
(function(){
  var lan=document.getElementById('wallLantern'),glow=document.getElementById('wlGlow');
  if(!lan||lan.querySelector('.wl-fire'))return;
  var body=document.body;
  var img=lan.querySelector('img.wl-off')||lan.querySelector('img.wl-img');
  var src=img&&img.getAttribute('src');
  function mk(tag,cls){var d=document.createElement(tag);d.className=cls;d.setAttribute('aria-hidden','true');return d;}
  var rim=mk('div','wl-rim'),chim=mk('div','wl-chimney'),bloom=mk('div','wl-bloom'),cv=mk('canvas','wl-fire');
  if(src){var u='url("'+src+'")';rim.style.webkitMaskImage=u;rim.style.maskImage=u;}   /* light only lands on the lantern's own pixels */
  var ref=lan.querySelector('.wl-glint')||lan.querySelector('.wl-hit');
  [rim,chim,bloom,cv].forEach(function(el){lan.insertBefore(el,ref);});
  var ctx=cv.getContext('2d');if(!ctx)return;

  var W=0,H=0,N=140,P=[],T=0,last=0,raf=0,visible=true,lastLevel=-1,skip=0,acc=0;
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fit(){
    var w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return false;
    var sc=Math.min(window.devicePixelRatio||1,2)*1.5,bw=Math.round(w*sc),bh=Math.round(h*sc);
    if(cv.width!==bw||cv.height!==bh){cv.width=bw;cv.height=bh;}
    W=bw;H=bh;return true;
  }
  function fresh(p,a){p.a=a;p.m=.8+Math.random()*.6;p.ox=Math.random()*2-1;p.sz=.75+Math.random()*.6;p.ph=Math.random()*6.283;p.wb=.5+Math.random();return p;}
  for(var i=0;i<N;i++)P.push(fresh({},Math.random()));

  function lerp(a,b,t){return a+(b-a)*t;}
  function col(t){                                    /* pale-yellow base → amber → orange → ember red */
    var r,g,b;
    if(t<.2){var k=t/.2;r=255;g=lerp(236,196,k);b=lerp(168,84,k);}
    else if(t<.55){var k2=(t-.2)/.35;r=255;g=lerp(196,122,k2);b=lerp(84,30,k2);}
    else{var k3=(t-.55)/.45;r=lerp(255,176,k3);g=lerp(122,40,k3);b=lerp(30,8,k3);}
    return [r|0,g|0,b|0];
  }
  function level(t){                                   /* organic flicker 0.75–1, with occasional gutters */
    var v=.5+.22*Math.sin(t*7.3)+.16*Math.sin(t*12.1+1.7)+.12*Math.sin(t*19.7+4.1);
    var g=Math.max(0,Math.sin(t*1.13+.6)*Math.sin(t*2.71));   /* slow irregular gutter */
    v-=g*g*.35;
    return .75+.25*Math.max(0,Math.min(1,v+.18));
  }

  function draw(dt){
    T+=dt;
    var I=level(T);
    ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    var cx=W*.5,by=H*.857,fh=H*.5*(.93+.12*I),bw=W*.135;
    var lean=(Math.sin(T*1.7)+.6*Math.sin(T*2.9+1.3)+.3*Math.sin(T*5.3+.4))*W*.028;
    var g,i,p;
    /* blue-ish zone right at the wick */
    g=ctx.createRadialGradient(cx,by-fh*.015,0,cx,by-fh*.015,W*.085);
    g.addColorStop(0,'rgba(110,150,255,'+(.34*I)+')');g.addColorStop(1,'rgba(110,150,255,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    for(i=0;i<N;i++){
      p=P[i];p.a+=dt/p.m;
      if(p.a>=1)fresh(p,p.a-1);
      var t=p.a;
      var y=by-fh*Math.pow(t,.82);
      var hw=bw*Math.pow(Math.sin(Math.PI*Math.pow(t,.55)),.9);
      var wob=Math.sin(T*(5.5+p.wb*3)+p.ph+t*6)*W*.024*t;
      var x=cx+p.ox*hw+lean*t*t+wob;
      var rad=W*.07*(1-.5*t)*p.sz;
      var al=.34*(t<.08?t/.08:1)*Math.pow(1-t,.7)*I;
      var c=col(t);
      g=ctx.createRadialGradient(x,y,0,x,y,rad);
      g.addColorStop(0,'rgba('+c[0]+','+c[1]+','+c[2]+','+al+')');
      g.addColorStop(1,'rgba('+c[0]+','+c[1]+','+c[2]+',0)');
      ctx.fillStyle=g;ctx.fillRect(x-rad,y-rad,rad*2,rad*2);
    }
    /* steady hot core */
    var cy=by-fh*.14,cr=W*.105*(1+.07*Math.sin(T*9.1)+.04*Math.sin(T*15.3));
    g=ctx.createRadialGradient(cx+lean*.1,cy,0,cx+lean*.1,cy,cr);
    g.addColorStop(0,'rgba(255,226,150,'+(.62*I)+')');g.addColorStop(.5,'rgba(255,184,80,'+(.28*I)+')');g.addColorStop(1,'rgba(255,150,50,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='source-over';
    /* dark wick */
    ctx.fillStyle='rgba(28,18,10,.9)';ctx.fillRect(cx-W*.008,by-H*.012,W*.016,H*.05);
    /* tell the lights how bright the flame is right now (only the lantern + its glow, not the whole page) */
    if(Math.abs(I-lastLevel)>.004){lastLevel=I;var v=I.toFixed(3);lan.style.setProperty('--wlf',v);if(glow)glow.style.setProperty('--wlf',v);}
  }

  function shouldRun(){return visible&&!document.hidden&&!body.classList.contains('wl-off');}
  function loop(now){
    raf=0;
    if(!shouldRun())return;
    if(document.documentElement.classList.contains('theme-switching')){last=now;raf=requestAnimationFrame(loop);return;}
    var dt=Math.min(.05,(now-last)/1000);last=now;acc+=dt;
    if(fit()){
      if(body.classList.contains('perf-low')&&(skip^=1)){/* weak device: draw every other frame */}
      else{draw(acc);acc=0;}
    }
    raf=requestAnimationFrame(loop);
  }
  function start(){
    if(reduced){fit();draw(0.016);return;}                 /* reduced motion: one static frame, no loop */
    if(raf||!shouldRun())return;
    last=performance.now();raf=requestAnimationFrame(loop);
  }
  document.addEventListener('visibilitychange',start);
  if(window.IntersectionObserver){new IntersectionObserver(function(e){visible=e[0].isIntersecting;start();},{threshold:0}).observe(lan);}
  new MutationObserver(function(){
    if(body.classList.contains('wl-off')){setTimeout(function(){if(body.classList.contains('wl-off')&&W)ctx.clearRect(0,0,W,H);},600);}
    else start();
  }).observe(body,{attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',function(){fit();},{passive:true});
  window.addEventListener('load',start);
  /* glass reflection: a slow highlight sweeps across the glass every few seconds (Web Animations API:
     not affected by the page's "animation:none" low-power rule), on top of the cursor-follow glint */
  var gi=lan.querySelector('.wl-glint i');
  if(gi&&gi.animate&&!reduced){
    var sweep=function(){
      if(!body.classList.contains('wl-off')&&visible&&!document.hidden){
        gi.animate([
          {transform:'translate3d(-40%,0,0) skewX(-18deg)',opacity:0},
          {opacity:1,offset:.25},{opacity:1,offset:.7},
          {transform:'translate3d(260%,0,0) skewX(-18deg)',opacity:0}
        ],{duration:2400,easing:'cubic-bezier(.45,.05,.3,1)'});
      }
      setTimeout(sweep,5500+Math.random()*5000);
    };
    setTimeout(sweep,1500);
  }
  start();
})();
;

/* ===================== theme-lens-js ===================== */
/* Appearance switch. Dark ("night watch") is the original/default theme. */
(function(){
  var KEY='caseFilesTheme';
  var body=document.body, btn=document.getElementById('themeLens');
  if(!btn) return;
  var busy=false;

  /* =====================================================================
     LENS SOUND — synthesized with the Web Audio API (no files, no requests)
     Tweak the numbers in SOUND below. Frequencies are in Hz, times in seconds,
     levels are 0..1 (they are multiplied by SOUND.master).
     Every voice ends with a short linear fade to 0, so nothing clicks or pops.
     ===================================================================== */
  var SOUND={
    master:0.20,                 /* overall volume (0.15 – 0.25 sounds subtle) */
    /* 1) click: two tiny dry noise ticks (shutter open / close) + a faint brass ring, ~40 ms */
    tick:{ level:0.55, hits:[{at:0.000,gain:1.00,hz:2600},{at:0.022,gain:0.55,hz:1900}],
           q:1.6, hitDur:0.018, ringHz:2200, ringGain:0.10, ringDur:0.040 },
    /* 2) glass chime: 3 sine partials at slightly inharmonic ratios, ~600 ms */
    chime:{ delay:0.035,         /* starts just after the tick */
      ratios:[1,2.32,4.25],      /* partial frequencies = f0 x ratio */
      day:  { f0:1318.5, amps:[1,0.42,0.16], decays:[0.60,0.38,0.22], level:0.50, lowpassHz:7000 },  /* bright, warm */
      night:{ f0: 587.3, amps:[1,0.26,0.07], decays:[0.60,0.36,0.20], level:0.40, lowpassHz:3200 } },/* deeper, softer */
    /* 3) sweep: quiet filtered noise whoosh, matches the 1150 ms reveal. Filter goes from -> to (Hz) */
    sweep:{ dur:1.15, level:0.32, q:0.8, highpassHz:140,
            day:  { from:350,  to:4200, peakAt:0.60 },   /* filter rises = brighter */
            night:{ from:3600, to:280,  peakAt:0.35 } }, /* filter falls = darker  */
    /* 4) hanging bulb (pull cord). ON = click + electric spark + filament tink + warm hum swell.  OFF = click + power-down + cooling ticks */
    bulb:{ level:1.0,            /* scales every bulb sound */
      click:{ level:0.75, clackHz:1100, clackQ:1.0, thumpFrom:170, thumpTo:70, beadHz:3300 },   /* pull-switch clack + 2 chain-bead ticks */
      spark:{ delay:0.045, crackles:6, window:0.14, hzMin:4500, hzMax:8000, level:1.00,         /* crackle bursts spread over `window` s */
              zapFrom:4800, zapTo:900, zapLevel:0.30 },                                          /* quick falling "pzzt" zip */
      hum:  { hz:100, attack:0.10, dur:0.75, level:0.17, lowpassHz:700 },                        /* warms up while the glow fades in (~350 ms) */
      tink: { at:0.20, f0:2870, ratios:[1,2.76], amps:[0.5,0.18], decays:[0.16,0.09], level:0.18 },
      off:  { clickScale:0.80, tickLevel:0.25, tickAt:[0.11,0.20], dropLevel:0.09, dropHz:[100,55] } },
    fade:0.025                   /* final fade-out on every voice */
  };
  var SOUND_KEY='caseFilesSound';   /* 'off' = muted, anything else (or missing) = on */

  var Sound=(function(){
    var ctx=null, master=null, noise=null, muted=false;
    try{ muted=localStorage.getItem(SOUND_KEY)==='off'; }catch(e){}

    function ensure(){                      /* AudioContext is created on the first user click only */
      if(!ctx){
        var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return null;
        ctx=new AC(); master=ctx.createGain(); master.gain.value=SOUND.master; master.connect(ctx.destination);
        noise=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);
        var d=noise.getChannelData(0); for(var i=0;i<d.length;i++) d[i]=Math.random()*2-1;
      }
      return ctx;
    }
    /* envelope: quick attack, exponential decay, then a linear fade to exactly 0 */
    function env(g,t,peak,attack,dur,fade){
      var p=g.gain; p.setValueAtTime(0.0001,t);
      p.exponentialRampToValueAtTime(Math.max(peak,0.0002),t+attack);
      p.exponentialRampToValueAtTime(0.0001,t+dur-fade);
      p.linearRampToValueAtTime(0,t+dur);
    }
    function noiseSrc(t,dur,off){ var s=ctx.createBufferSource(); s.buffer=noise; s.start(t,off||0); s.stop(t+dur+0.02); return s; }

    function tick(t){
      var T=SOUND.tick;
      T.hits.forEach(function(h){
        var s=noiseSrc(t+h.at,T.hitDur), f=ctx.createBiquadFilter(), g=ctx.createGain();
        f.type='bandpass'; f.frequency.value=h.hz; f.Q.value=T.q;
        s.connect(f); f.connect(g); g.connect(master);
        env(g,t+h.at,T.level*h.gain,0.001,T.hitDur,0.006);
      });
      var o=ctx.createOscillator(), g2=ctx.createGain();            /* faint brass ring under the ticks */
      o.type='sine'; o.frequency.value=T.ringHz; o.connect(g2); g2.connect(master);
      env(g2,t,T.level*T.ringGain,0.002,T.ringDur,0.012); o.start(t); o.stop(t+T.ringDur+0.02);
    }
    function chime(t,light){
      var C=SOUND.chime, V=light?C.day:C.night;
      var out=ctx.createGain(), lp=ctx.createBiquadFilter();
      out.gain.value=V.level; lp.type='lowpass'; lp.frequency.value=V.lowpassHz;
      out.connect(lp); lp.connect(master);
      C.ratios.forEach(function(r,i){
        var o=ctx.createOscillator(), g=ctx.createGain();
        o.type='sine'; o.frequency.value=V.f0*r; o.connect(g); g.connect(out);
        env(g,t,V.amps[i],0.004,V.decays[i],SOUND.fade+0.005); o.start(t); o.stop(t+V.decays[i]+0.02);
      });
    }
    function sweep(t,light){
      var S=SOUND.sweep, V=light?S.day:S.night, d=S.dur;
      var s=noiseSrc(t,d), hp=ctx.createBiquadFilter(), lp=ctx.createBiquadFilter(), g=ctx.createGain();
      hp.type='highpass'; hp.frequency.value=S.highpassHz;
      lp.type='lowpass';  lp.Q.value=S.q;
      lp.frequency.setValueAtTime(V.from,t); lp.frequency.exponentialRampToValueAtTime(V.to,t+d);
      s.connect(hp); hp.connect(lp); lp.connect(g); g.connect(master);
      g.gain.setValueAtTime(0.0001,t);                                   /* swell up, then fade out */
      g.gain.exponentialRampToValueAtTime(S.level,t+d*V.peakAt);
      g.gain.exponentialRampToValueAtTime(0.0001,t+d-SOUND.fade);
      g.gain.linearRampToValueAtTime(0,t+d);
    }
    /* ---- hanging bulb voices ---- */
    function pullClick(t,k){                /* mechanical pull-switch: low clack + thump + two tiny chain-bead ticks */
      var C=SOUND.bulb.click, L=SOUND.bulb.level*C.level*k;
      var s=noiseSrc(t,0.03), f=ctx.createBiquadFilter(), g=ctx.createGain();
      f.type='bandpass'; f.frequency.value=C.clackHz; f.Q.value=C.clackQ; s.connect(f); f.connect(g); g.connect(master);
      env(g,t,L,0.001,0.028,0.008);
      var o=ctx.createOscillator(), g2=ctx.createGain();
      o.type='sine'; o.frequency.setValueAtTime(C.thumpFrom,t); o.frequency.exponentialRampToValueAtTime(C.thumpTo,t+0.04);
      o.connect(g2); g2.connect(master); env(g2,t,L*0.7,0.002,0.045,0.012); o.start(t); o.stop(t+0.07);
      [0.032,0.054].forEach(function(d,i){
        var b=noiseSrc(t+d,0.012,Math.random()*0.5), bf=ctx.createBiquadFilter(), bg=ctx.createGain();
        bf.type='bandpass'; bf.frequency.value=C.beadHz*(i?1.18:1); bf.Q.value=2; b.connect(bf); bf.connect(bg); bg.connect(master);
        env(bg,t+d,L*0.35,0.0008,0.010,0.004);
      });
    }
    function spark(t){                      /* random crackle bursts + a fast falling zip */
      var P=SOUND.bulb.spark, L=SOUND.bulb.level*P.level, t0=t+P.delay, i;
      for(i=0;i<P.crackles;i++){
        var at=t0+Math.random()*P.window, dur=0.004+Math.random()*0.006, amp=(1-i/(P.crackles+1))*(0.5+Math.random()*0.5);
        var s=noiseSrc(at,dur,Math.random()*0.5), f=ctx.createBiquadFilter(), g=ctx.createGain();
        f.type='bandpass'; f.frequency.value=P.hzMin+Math.random()*(P.hzMax-P.hzMin); f.Q.value=1.5;
        s.connect(f); f.connect(g); g.connect(master); env(g,at,L*amp,0.0005,dur,0.002);
      }
      var o=ctx.createOscillator(), lp=ctx.createBiquadFilter(), z=ctx.createGain();
      o.type='sawtooth'; o.frequency.setValueAtTime(P.zapFrom,t0); o.frequency.exponentialRampToValueAtTime(P.zapTo,t0+0.06);
      lp.type='lowpass'; lp.frequency.value=6000; o.connect(lp); lp.connect(z); z.connect(master);
      env(z,t0,SOUND.bulb.level*P.zapLevel,0.002,0.075,0.012); o.start(t0); o.stop(t0+0.1);
    }
    function hum(t,hz0,hz1,peak,attack,dur,lpHz){   /* mains-style hum (saw through a low-pass) */
      var o=ctx.createOscillator(), lp=ctx.createBiquadFilter(), g=ctx.createGain();
      o.type='sawtooth'; o.frequency.setValueAtTime(hz0,t); if(hz1!==hz0) o.frequency.exponentialRampToValueAtTime(hz1,t+dur);
      lp.type='lowpass'; lp.frequency.value=lpHz; lp.Q.value=0.7; o.connect(lp); lp.connect(g); g.connect(master);
      env(g,t,peak,attack,dur,SOUND.fade+0.025); o.start(t); o.stop(t+dur+0.02);
    }
    function tink(t){                       /* tiny glass/filament ping as it heats up */
      var K=SOUND.bulb.tink, out=ctx.createGain(); out.gain.value=SOUND.bulb.level*K.level; out.connect(master);
      K.ratios.forEach(function(r,i){
        var o=ctx.createOscillator(), g=ctx.createGain(); o.type='sine'; o.frequency.value=K.f0*r; o.connect(g); g.connect(out);
        env(g,t,K.amps[i],0.002,K.decays[i],SOUND.fade); o.start(t); o.stop(t+K.decays[i]+0.02);
      });
    }
    function coolTick(t,level){             /* faint thermal tick of the cooling filament */
      var s=noiseSrc(t,0.012,Math.random()*0.5), f=ctx.createBiquadFilter(), g=ctx.createGain();
      f.type='bandpass'; f.frequency.value=4200; f.Q.value=3.5; s.connect(f); f.connect(g); g.connect(master);
      env(g,t,level,0.0008,0.012,0.005);
    }
    function bulbOn(t){
      var B=SOUND.bulb;
      pullClick(t,1); spark(t);
      hum(t+B.spark.delay,B.hum.hz,B.hum.hz,B.hum.level*B.level,B.hum.attack,B.hum.dur,B.hum.lowpassHz);
      tink(t+B.tink.at);
    }
    function bulbOff(t){
      var B=SOUND.bulb, O=B.off;
      pullClick(t,O.clickScale);
      hum(t+0.01,O.dropHz[0],O.dropHz[1],O.dropLevel*B.level,0.005,0.2,500);
      O.tickAt.forEach(function(d){ coolTick(t+d,O.tickLevel*B.level); });
    }
    function run(fn){                       /* create/resume the context, then schedule; never throws */
      try{
        var c=ensure(); if(!c) return;
        var go=function(){ try{ fn(c.currentTime+0.01); }catch(e){} };
        if(c.state==='suspended'&&c.resume){ var p=c.resume(); if(p&&p.then) p.then(go,function(){}); else go(); }
        else go();
      }catch(e){}
    }
    return {
      isMuted:function(){ return muted; },
      setMuted:function(m){ muted=!!m; try{ localStorage.setItem(SOUND_KEY,muted?'off':'on'); }catch(e){} },
      syncMuted:function(m){ muted=!!m; },                              /* from another tab: no storage write, no sound */
      /* theme switch: tick + chime (+ sweep when there is a reveal to match) */
      play:function(light,withSweep){
        if(muted) return;
        run(function(t){ tick(t); chime(t+SOUND.chime.delay,light); if(withSweep) sweep(t,light); });
      },
      blip:function(){ if(!muted) run(tick); },                         /* tiny confirmation when sound is switched back on */
      bulb:function(on){ if(!muted) run(on?bulbOn:bulbOff); },           /* hanging bulb switched on / off */
      unlock:function(){                                                /* call from a user gesture (pointerdown / pointerup) */
        try{ if(muted) return; var c=ensure(); if(c&&c.state==='suspended'&&c.resume){ var p=c.resume(); if(p&&p.catch) p.catch(function(){}); } }catch(e){}
      }
    };
  })();

  window.caseFilesSound={ bulb:Sound.bulb, unlock:Sound.unlock, isMuted:Sound.isMuted };   /* used by the hanging-bulb script; honours the same mute setting */

  /* mute badge + tooltip hint (the lens is the only touch target) */
  function titleFor(light){
    return (light?'Switch to night watch':'Switch to day shift')+' \u00b7 Shift-click or hold to '+(Sound.isMuted()?'unmute':'mute')+' sound';
  }
  function showMuted(){ btn.classList.toggle('is-muted',Sound.isMuted()); btn.title=titleFor(isLight()); try{ window.dispatchEvent(new Event('cf-mute-change')); }catch(e){} }
  showMuted();

  /* Shift-click or long-press (600 ms) toggles sound only; it never switches the theme */
  var LONG_PRESS_MS=600, lpTimer=0, lpFired=false, lpX=0, lpY=0;
  function lpClear(){ clearTimeout(lpTimer); lpTimer=0; }
  function toggleMute(){
    Sound.setMuted(!Sound.isMuted()); showMuted();
    try{ if(navigator.vibrate) navigator.vibrate(18); }catch(e){}
  }
  btn.addEventListener('pointerdown',function(e){
    if(e.button>0) return;
    lpFired=false; lpX=e.clientX; lpY=e.clientY; lpClear();
    lpTimer=setTimeout(function(){ lpFired=true; toggleMute(); },LONG_PRESS_MS);
  });
  btn.addEventListener('pointermove',function(e){ if(lpTimer&&Math.hypot(e.clientX-lpX,e.clientY-lpY)>10) lpClear(); });
  ['pointerup','pointercancel','pointerleave'].forEach(function(ev){
    btn.addEventListener(ev,function(){ lpClear(); if(lpFired) setTimeout(function(){ lpFired=false; },400); });
  });
  btn.addEventListener('contextmenu',function(e){ e.preventDefault(); });   /* no long-press menu on the lens */
  function muteGesture(e){                  /* true = this click was a mute gesture, so skip the theme switch */
    try{
      if(lpFired){ lpFired=false; if(!Sound.isMuted()) Sound.blip(); return true; }
      if(e.shiftKey){ toggleMute(); if(!Sound.isMuted()) Sound.blip(); return true; }
    }catch(err){}
    return false;
  }
  /* ===================== end of lens sound ===================== */


  function isLight(){ return body.classList.contains('light-theme'); }
  function paint(light){
    body.classList.toggle('light-theme',light);
    btn.setAttribute('aria-checked',light?'true':'false');
    btn.title=titleFor(light);
  }
  function save(light){ try{localStorage.setItem(KEY,light?'light':'dark');}catch(e){} }

  var saved='dark';
  try{saved=localStorage.getItem(KEY)||'dark';}catch(e){}
  paint(saved==='light');

  /* How the theme change is revealed:
       'smooth'    - a soft-edged circle of the new theme's colour grows from the lens, the page swaps underneath while it is
                     fully covered, then the circle fades away. Only transform/opacity are animated, so it runs on the GPU and
                     stays silky even on a heavy page or a slow phone.
       'cinematic' - the browser's page-reveal (View Transition): the new page itself is revealed inside the circle.
                     Prettier, but it has to photograph the whole busy page twice, which can stutter on slower devices. */
  var REVEAL='cinematic';
  var WIPE_MS=820, FADE_MS=560;

  /* Lighter page while the reveal grows. The reveal is a live copy of the whole page re-drawn on every frame, so the
     busiest layers are switched off in that copy only (the "old" picture keeps them) and fade back in when it ends.
       'off'     - nothing changes (best looking, slowest)
       'ambient' - dust, film grain, scan-lines, fog and the ambient canvas are hidden for ~1 s   (default: barely noticeable)
       'max'     - also hides the lantern glow, blind shadows, and blur/glass effects for ~1 s    (fastest; try this if it still stutters) */
  var REVEAL_LITE='ambient';
  var LITE_AMBIENT='#ambient-canvas,#dustCanvas,.grain,.scanline-bg,.cinema-fog';
  var LITE_MAX_EXTRA='.wl-rim,.wl-chimney,.wl-bloom,.wl-fire,.blind-shadows';
  function liteOn(){
    if(REVEAL_LITE!=='ambient'&&REVEAL_LITE!=='max') return;
    var r=document.documentElement; r.classList.add('cf-lite'); if(REVEAL_LITE==='max') r.classList.add('cf-lite-max');
  }
  function liteOff(){
    var r=document.documentElement; if(!r.classList.contains('cf-lite')) return;
    var sel=LITE_AMBIENT+(r.classList.contains('cf-lite-max')?','+LITE_MAX_EXTRA:'');
    r.classList.remove('cf-lite','cf-lite-max');
    try{ [].forEach.call(document.querySelectorAll(sel),function(el){          /* fade them back in instead of popping */
      var o=getComputedStyle(el).opacity;
      if(el.animate) el.animate([{opacity:0},{opacity:o}],{duration:480,easing:'ease-out'});
    }); }catch(e){}
  }
  var WIPE_EASE='cubic-bezier(.5,.06,.25,1)', FADE_EASE='cubic-bezier(.4,0,.3,1)';

  function switchTo(light){
    try{ if(window.cfBusy) window.cfBusy(3500); }catch(e){}     /* reveal is a deliberate heavy moment: don't let it trip low-power mode */
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lowPower=body.classList.contains('perf-low')||body.classList.contains('performance-lite');
    var animated=!!document.startViewTransition&&!reduce&&!lowPower;
    /* sound + lens flourish. With the circular reveal they start only once the browser has captured both pages and the
       circle is really about to grow (t.ready), so the sound sweep and the picture start together instead of the sound
       racing ahead while the page is still being captured. */
    function flourish(){
      Sound.play(light,animated);                 /* tick + chime always; the sweep only when the reveal runs */
      if(!animated){ btn.classList.remove('is-inspecting'); void btn.offsetWidth; }
      btn.classList.add('is-inspecting');
      setTimeout(function(){ btn.classList.remove('is-inspecting'); },850);
    }

    save(light);
    if(!animated){ flourish(); paint(light); return; }
    btn.classList.remove('is-inspecting');         /* removed now, re-added in a later frame: restarts without a forced layout */

    var r=btn.getBoundingClientRect(),
        x=r.left+r.width/2, y=r.top+r.height/2,
        end=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
    busy=true;
    var root=document.documentElement;
    function done(){                                   /* always restore, whatever happens to the transition */
      busy=false; root.classList.remove('theme-switching'); liteOff();
      root.style.removeProperty('--cf-vx'); root.style.removeProperty('--cf-vy'); root.style.removeProperty('--cf-vr');
    }
    if(REVEAL==='smooth'&&document.body.animate){
      flourish();
      var el=document.getElementById('themeWipe');
      if(!el){ el=document.createElement('div'); el.id='themeWipe'; el.setAttribute('aria-hidden','true'); document.body.appendChild(el); }
      var rgb=light?'243,241,236':'6,7,8';                 /* the new theme's base colour (--bg) */
      var SOLID=0.8, HALF=128, S=end/(SOLID*HALF)*1.03;     /* 256px disc, solid to 80%, feathered edge; scaled until the solid part covers the far corner */
      var at=function(sc){ return 'translate('+(x-HALF)+'px,'+(y-HALF)+'px) scale('+sc+')'; };
      el.style.cssText='position:fixed;left:0;top:0;width:256px;height:256px;pointer-events:none;z-index:149;opacity:1;'+
        'will-change:transform,opacity;transform:'+at(0.04)+';'+
        'background:radial-gradient(circle closest-side,rgba('+rgb+',1) 0,rgba('+rgb+',1) '+(SOLID*100)+'%,rgba('+rgb+',0) 100%);';
      root.classList.add('theme-switching');             /* page's own colour transitions off while it swaps */
      var finished=false;
      function finish(){ if(finished) return; finished=true; try{ el.style.cssText='display:none'; }catch(e){} done(); }
      try{
        var grow=el.animate([{transform:at(0.04)},{transform:at(S)}],{duration:WIPE_MS,easing:WIPE_EASE,fill:'forwards'});
        grow.onfinish=function(){
          paint(light);                                  /* swap while the screen is fully covered: any hitch is invisible */
          requestAnimationFrame(function(){ requestAnimationFrame(function(){
            setTimeout(function(){
              var fade=el.animate([{opacity:1},{opacity:0}],{duration:FADE_MS,easing:FADE_EASE,fill:'forwards'});
              fade.onfinish=finish; fade.oncancel=finish;
            },40);
          }); });
        };
        grow.oncancel=function(){ paint(light); finish(); };
      }catch(e){ paint(light); finish(); }
      return;
    }
    try{
      root.style.setProperty('--cf-vx',x+'px'); root.style.setProperty('--cf-vy',y+'px'); root.style.setProperty('--cf-vr',end+'px');
      root.classList.add('theme-switching');           /* pause CSS transitions while the reveal runs */
      var t=document.startViewTransition(function(){ paint(light); liteOn(); });
      var started=false; function start(){ if(!started){ started=true; flourish(); } }
      t.ready.then(start,start);
      t.finished.then(function(){ start(); done(); },function(){ start(); done(); });
    }catch(e){ paint(light); done(); flourish(); }
  }

  btn.addEventListener('click',function(e){ if(muteGesture(e)) return; if(!busy) switchTo(!isLight()); });

  /* keep other open tabs/pages (e.g. the survey page) in sync */
  window.addEventListener('storage',function(e){
    if(e.key===KEY) paint(e.newValue==='light');                          /* theme sync: silent */
    if(e.key===SOUND_KEY){ Sound.syncMuted(e.newValue==='off'); showMuted(); }   /* mute sync: silent */
  });
})();
;

/* ===================== script 10 ===================== */
(function(){
  'use strict';
  var KEY='caseFilesAmbient';
  var LEVEL={rain:0.8, clock:0.5, siren:0.16};          /* relative loudness of each layer */
  var st={vol:0.7, rain:false, clock:false, siren:false};
  try{ var sv=JSON.parse(localStorage.getItem(KEY)||'null'); if(sv){ ['rain','clock','siren'].forEach(function(k){ st[k]=!!sv[k]; }); if(typeof sv.vol==='number') st.vol=Math.min(1,Math.max(0,sv.vol)); } }catch(e){}
  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(st)); }catch(e){} }

  var root=document.getElementById('ambient'), btn=document.getElementById('ambBtn'), panel=document.getElementById('ambPanel'),
      vol=document.getElementById('ambVol'), rows=[].slice.call(root.querySelectorAll('.amb-row'));
  if(!root||!btn) return;

  var AC=window.AudioContext||window.webkitAudioContext, ctx=null, out=null, noise=null, layers={}, timers=[];

  function isMuted(){
    try{ if(window.caseFilesSound&&window.caseFilesSound.isMuted) return !!window.caseFilesSound.isMuted(); }catch(e){}
    try{ return localStorage.getItem('caseFilesSound')==='off'; }catch(e){ return false; }
  }
  function anyOn(){ return st.rain||st.clock||st.siren; }

  function ensure(){
    if(ctx) return ctx; if(!AC) return null;
    ctx=new AC(); out=ctx.createGain(); out.gain.value=0; out.connect(ctx.destination);
    var n=ctx.sampleRate*4; noise=ctx.createBuffer(1,n,ctx.sampleRate); var d=noise.getChannelData(0); for(var i=0;i<n;i++) d[i]=Math.random()*2-1;
    return ctx;
  }
  function volGain(){ return isMuted()?0:Math.pow(st.vol,2)*0.9; }     /* squared = feels linear to the ear */
  function applyVolume(){ if(ctx) out.gain.setTargetAtTime(volGain(),ctx.currentTime,0.08); }
  function noiseSrc(){ var s=ctx.createBufferSource(); s.buffer=noise; s.loop=true; s.loopStart=0; s.loopEnd=noise.duration; s.start(0,Math.random()*3); return s; }
  function pan(p){ if(!ctx.createStereoPanner) return null; var n=ctx.createStereoPanner(); n.pan.value=p; return n; }

  /* ---------- soft rain: filtered noise bed + low rumble + sparse droplets ---------- */
  function startRainSynth(g){
    var nodes=[], s1=noiseSrc(), hp=ctx.createBiquadFilter(), lp=ctx.createBiquadFilter();
    hp.type='highpass'; hp.frequency.value=600; lp.type='lowpass'; lp.frequency.value=7000; lp.Q.value=0.3;
    s1.connect(hp); hp.connect(lp); lp.connect(g);
    var s2=noiseSrc(), lp2=ctx.createBiquadFilter(), g2=ctx.createGain(); lp2.type='lowpass'; lp2.frequency.value=380; g2.gain.value=0.55;
    s2.connect(lp2); lp2.connect(g2); g2.connect(g);
    var lfo=ctx.createOscillator(), lg=ctx.createGain(); lfo.frequency.value=0.09; lg.gain.value=900; lfo.connect(lg); lg.connect(lp.frequency); lfo.start();   /* slow breathing of the shower */
    nodes.push(s1,s2,lfo);
    var iv=setInterval(function(){
      if(!ctx||ctx.state!=='running'||Math.random()>0.55) return;
      var t=ctx.currentTime+0.02, s=ctx.createBufferSource(); s.buffer=noise;
      var bp=ctx.createBiquadFilter(), eg=ctx.createGain(), pn=pan(Math.random()*1.6-0.8);
      bp.type='bandpass'; bp.frequency.value=1800+Math.random()*3200; bp.Q.value=2+Math.random()*3;
      eg.gain.setValueAtTime(0.0001,t); eg.gain.exponentialRampToValueAtTime(0.10+Math.random()*0.12,t+0.003); eg.gain.exponentialRampToValueAtTime(0.0001,t+0.03+Math.random()*0.03);
      s.connect(bp); bp.connect(eg); if(pn){ eg.connect(pn); pn.connect(g); } else eg.connect(g);
      s.start(t,Math.random()*3); s.stop(t+0.09);
    },90);
    return function(){ clearInterval(iv); nodes.forEach(function(n){ try{ n.stop(); }catch(e){} }); };
  }

  /* ---------- rain: your own looping sound file (falls back to the built-in synthesised rain if it can't load) ---------- */
  var RAIN_FILE='sounds/rain.mp3';      /* your looping rain file. Set to '' to always use the synthesised rain */
  var rainBuf=null, rainLoad=null;
  function loadRain(){
    if(rainBuf) return Promise.resolve(rainBuf);
    if(rainLoad) return rainLoad;
    rainLoad=fetch(RAIN_FILE).then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.arrayBuffer(); })
      .then(function(ab){ return new Promise(function(ok,no){ var p=ctx.decodeAudioData(ab,ok,no); if(p&&p.then) p.then(ok,no); }); })
      .then(function(b){ rainBuf=b; return b; })
      .catch(function(err){ rainLoad=null; try{ console.warn('Rain sound not loaded ('+RAIN_FILE+'), using synthesised rain:',err); }catch(e){} return null; });
    return rainLoad;
  }
  function startRain(g){
    var stopped=false, stopFn=null;
    function synth(){ if(!stopped&&!stopFn) stopFn=startRainSynth(g); }
    if(!RAIN_FILE) synth();
    else loadRain().then(function(buf){
      if(stopped||!ctx) return;
      if(!buf){ synth(); return; }
      var s=ctx.createBufferSource(); s.buffer=buf; s.loop=true; s.connect(g); s.start(0);   /* seamless loop */
      stopFn=function(){ try{ s.stop(); }catch(e){} };
    });
    return function(){ stopped=true; if(stopFn) stopFn(); };
  }

  /* ---------- ticking clock: tick / tock once a second ---------- */
  function startClock(g){
    var next=ctx.currentTime+0.15, flip=false;
    function tick(t,lo){
      var s=ctx.createBufferSource(); s.buffer=noise; var bp=ctx.createBiquadFilter(), eg=ctx.createGain();
      bp.type='bandpass'; bp.frequency.value=lo?2300:3100; bp.Q.value=3.5;
      eg.gain.setValueAtTime(0.0001,t); eg.gain.exponentialRampToValueAtTime(0.9,t+0.001); eg.gain.exponentialRampToValueAtTime(0.0001,t+0.035);
      s.connect(bp); bp.connect(eg); eg.connect(g); s.start(t,Math.random()*3); s.stop(t+0.06);
      var o=ctx.createOscillator(), og=ctx.createGain(); o.type='sine'; o.frequency.value=lo?900:1250;
      og.gain.setValueAtTime(0.0001,t); og.gain.exponentialRampToValueAtTime(0.35,t+0.001); og.gain.exponentialRampToValueAtTime(0.0001,t+0.05);
      o.connect(og); og.connect(g); o.start(t); o.stop(t+0.07);
    }
    var iv=setInterval(function(){
      if(!ctx||ctx.state!=='running'){ next=Math.max(next,(ctx?ctx.currentTime:0)+0.1); return; }
      while(next<ctx.currentTime+0.6){ tick(next,flip); flip=!flip; next+=1.0; }
    },200);
    return function(){ clearInterval(iv); };
  }

  /* ---------- distant siren: now and then a faint wail drifts past ---------- */
  function startSiren(g){
    var live=[], alive=true, tid=0;
    function wail(){
      if(!alive||!ctx) return;
      if(ctx.state==='running'){
        var t=ctx.currentTime+0.05, dur=12, o=ctx.createOscillator(), o2=ctx.createOscillator(), lfo=ctx.createOscillator(), lg=ctx.createGain(),
            lp=ctx.createBiquadFilter(), eg=ctx.createGain(), pn=pan(-0.7);
        o.type='sawtooth'; o2.type='triangle'; o.frequency.value=800; o2.frequency.value=800; o2.detune.value=7;
        lfo.frequency.value=0.26; lg.gain.value=190; lfo.connect(lg); lg.connect(o.frequency); lg.connect(o2.frequency);   /* rising / falling wail */
        lp.type='lowpass'; lp.Q.value=0.4; lp.frequency.setValueAtTime(420,t); lp.frequency.linearRampToValueAtTime(950,t+dur*0.45); lp.frequency.linearRampToValueAtTime(380,t+dur);   /* closer, then away */
        eg.gain.setValueAtTime(0.0001,t); eg.gain.exponentialRampToValueAtTime(1,t+dur*0.4); eg.gain.exponentialRampToValueAtTime(0.0001,t+dur);
        o.connect(lp); o2.connect(lp); lp.connect(eg);
        if(pn){ pn.pan.setValueAtTime(-0.7,t); pn.pan.linearRampToValueAtTime(0.7,t+dur); eg.connect(pn); pn.connect(g); } else eg.connect(g);
        [o,o2,lfo].forEach(function(n){ n.start(t); n.stop(t+dur+0.1); live.push(n); });
      }
      tid=setTimeout(wail,(22+Math.random()*28)*1000);
    }
    tid=setTimeout(wail,(3+Math.random()*4)*1000);
    return function(){ alive=false; clearTimeout(tid); live.forEach(function(n){ try{ n.stop(); }catch(e){} }); };
  }

  var STARTERS={rain:startRain, clock:startClock, siren:startSiren};

  function setLayer(name,on){
    if(!ensure()) return;
    var L=layers[name];
    if(on){
      if(L&&L.kill){ clearTimeout(L.kill); L.kill=0; }
      if(!L){ var g=ctx.createGain(); g.gain.value=0; g.connect(out); L=layers[name]={g:g,stop:STARTERS[name](g),kill:0}; }
      L.g.gain.setTargetAtTime(LEVEL[name],ctx.currentTime,0.7);                  /* gentle fade in */
    }else if(L&&!L.kill){
      L.g.gain.setTargetAtTime(0,ctx.currentTime,0.35);                             /* gentle fade out, then tear the nodes down */
      L.kill=setTimeout(function(){ try{ L.stop(); L.g.disconnect(); }catch(e){} delete layers[name]; },2200);
    }
  }
  function resumeCtx(){
    if(!ctx||isMuted()||document.hidden) return;
    if(ctx.state==='suspended'&&ctx.resume){ var p=ctx.resume(); if(p&&p.catch) p.catch(function(){}); }
  }
  function syncAudio(){
    if(!anyOn()&&!ctx) return;
    ['rain','clock','siren'].forEach(function(k){ setLayer(k,st[k]); });
    applyVolume(); resumeCtx();
  }

  function paint(){
    rows.forEach(function(r){ r.setAttribute('aria-checked',st[r.getAttribute('data-layer')]?'true':'false'); });
    vol.value=Math.round(st.vol*100);
    var muted=isMuted();
    root.classList.toggle('is-muted',muted);
    root.classList.toggle('is-live',anyOn()&&!muted);
    btn.title=muted?'Ambient sound (muted)':'Ambient sound';
  }

  /* ---------- UI ---------- */
  function setOpen(o){ root.classList.toggle('open',o); btn.setAttribute('aria-expanded',o?'true':'false'); panel.setAttribute('aria-hidden',o?'false':'true'); }
  btn.addEventListener('click',function(){ setOpen(!root.classList.contains('open')); });
  document.addEventListener('pointerdown',function(e){ if(root.classList.contains('open')&&!root.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&root.classList.contains('open')){ setOpen(false); btn.focus(); } });

  rows.forEach(function(r){
    r.addEventListener('click',function(){
      var k=r.getAttribute('data-layer'); st[k]=!st[k]; save(); paint();
      if(st[k]&&!ensure()) return;
      if(ctx&&!isMuted()){ ctx.resume&&ctx.resume(); }                       /* this click is the user gesture the browser needs */
      syncAudio();
    });
  });
  vol.addEventListener('input',function(){ st.vol=vol.value/100; save(); applyVolume(); });

  /* lens mute (shift-click / long-press) → silence or restore everything */
  window.addEventListener('cf-mute-change',function(){ paint(); applyVolume(); if(isMuted()){ if(ctx&&ctx.suspend) setTimeout(function(){ if(isMuted()&&ctx.suspend) ctx.suspend(); },300); } else { resumeCtx(); } });
  /* save battery in background tabs */
  document.addEventListener('visibilitychange',function(){ if(!ctx) return; if(document.hidden){ if(ctx.suspend) ctx.suspend(); } else resumeCtx(); });

  /* saved layers can only start after the first user gesture (browser autoplay rules) */
  paint();
  if(anyOn()){
    var wake=function(){ document.removeEventListener('pointerdown',wake,true); document.removeEventListener('keydown',wake,true); if(ensure()){ resumeCtx(); syncAudio(); } };
    document.addEventListener('pointerdown',wake,true); document.addEventListener('keydown',wake,true);
  }
})();
;
