const mediaBasePath='/media/';
const getFS=()=>{
const base={
'C:':{type:'dir',children:{
'Users':{type:'dir',children:{
'TheDustBwlDuck':{type:'dir',children:{
'Desktop':{type:'dir',children:{}},
'Documents':{type:'dir',children:{
'school_essay_draft.txt':{type:'file',content:'The Amercan Revoltion - by me\n\nok so basicaly the colonies were mad at britan\nbc of taxes and stuff and they were like\nno way dude we r leaving\n\nand then gorge washington was like lets goooo\n\ni need to actualy finish this lol\ndue friday mrs henderson is gona kill me\n\nupdate: played dustbowl instead oops'},
'tf2_binds.txt':{type:'file',content:'MY EPIC BINDS:\n\nbind f "voicemenu 0 1" (MEDIC!)\nbind g "voicemenu 2 1" (Nice Shot)\nbind h "say GET DUSTBOWLED LMAO"\nbind j "say UBERSAW TIME BABY"\nbind mouse4 "+jump"\n\nnote 2 self: stop spaming medic bind\nppl r geting mad at me again lol'},
'server_favorites.txt':{type:'file',content:'MY SERVERS (BEST 2 WORST):\n\n1. Dustbowl 24/7 - THE GOAT SERVER\n2. epicdustbowlguys - BANNED (stupid dave)\n3. 2Fort Unlimited - 4 when dustbowl is ded\n4. cp_granary tryhard - 2 sweaty 4 me\n\ndustbowl 24/7 has the best ppl\nim on evry night basicaly'},
'grocery_list.txt':{type:'file',content:'mom said get:\n- milk\n- bread\n- cereal (the good kind NOT the helthy one)\n- hot pockets (pepperoni)\n- mountain dew (code red)\n\ni keep forgeting so im puting it here\nwatch me forget 2 check this lol'},
'todo_list.txt':{type:'file',content:'STUFF I GOTA DO:\n- finish essay (FRIDAY OMG)\n- clean room (moms gona flip)\n- update steam profle pic\n- ask mike abt hl2 ep 2\n- practice scout movment on dustbowl\n- fix mic buzzing\n- get better at spy (backstabBEN keeps killin me)\n- figure out mann co store thing'},
'mann_co_update.txt':{type:'file',content:'MANN-CONOMY UPDATE NOTES (4 me):\n\nOK SO U CAN TRADE HATS NOW??\nand theres a STORE??\nthis is insane\n\ni got like 3 hats so far:\n- ghastly gibus (evry1 has this lol)\n- pyros beanie thing\n- the scout 1 w the headphones\n\nhatcollector3000 has like 50 hats\nhow does he DO that'},
'band_name_ideas.txt':{type:'file',content:'BAND NAMES (w tyler):\n- The Dustbowl Destroyers\n- Critical Hit\n- Ubercharged\n- The Payload Pushers\n- Bonk Energy\n\ntyler says these all suck\nbut hes the 1 who cant even play drums right'}
}},
'Pictures':{type:'dir',children:{
'dustbowl_screenshot1.png':{type:'img',src:`${mediaBasePath}img/dustbowl1.png`},
'dustbowl_screenshot2.png':{type:'img',src:`${mediaBasePath}img/dustbowl2.png`},
'funny_spray.png':{type:'img',src:`${mediaBasePath}img/spray1.png`},
'my_scout_loadout.png':{type:'img',src:`${mediaBasePath}img/scout1.png`},
'screenshot_2fort.png':{type:'img',src:`${mediaBasePath}img/2fort1.png`}
}},
'Music':{type:'dir',children:{
'epic_song.mp3':{type:'audio',src:`${mediaBasePath}audio/song1.mp3`},
'limewire_download.mp3':{type:'audio',src:`${mediaBasePath}audio/song2.mp3`}
}},
'Videos':{type:'dir',children:{
'dustbowl_gameplay.mp4':{type:'video',src:`${mediaBasePath}video/gameplay1.mp4`},
'funny_kill.mp4':{type:'video',src:`${mediaBasePath}video/funnykill.mp4`}
}}
}}
}},
'System':{type:'dir',children:{
'config.sys':{type:'file',content:'SOOS_VERSION=1.0.2\nINIT_PROCESS=soos-init\nHOST=TheDustBwlDuck\nLAST_BOOT=2010-09-30T19:10:00\nUPTIME=32m'},
'error.log':{type:'file',content:'[2010-09-30 19:10:05] INFO: System boot completed\n[2010-09-30 19:10:12] INFO: Network connected\n[2010-09-30 19:11:01] INFO: Audio driver loaded\n[2010-09-30 19:15:42] WARN: High CPU (Steam.exe)\n[2010-09-30 19:20:13] INFO: hl2.exe launched\n[2010-09-30 19:42:00] INFO: System idle'}
}}
}}};
if(typeof pcState!=='undefined'&&pcState===2){
const docs=base['C:'].children['Users'].children['TheDustBwlDuck'].children['Documents'].children;
const newFiles={'why_am_i_here.txt':{type:'file',content:'i dont undrstnd waht happend\nthe game crashed and now evrythings diffrent\n\nwhy does my pc feel wrong\nwhy does the clock say may\nits september\n\nits SEPTEMBER'},'the_hard_drive.txt':{type:'file',content:'i bought this hard drive from sum guy on craigslist\nit was cheap like 20 bucks\nhe said it was from an old gamers pc\n\ni put my games on it\nand thats when stuff started geting weird\n\nthe demos. the files. they wernt mine.\nsomebody elses tf2 was on here.'},'i_see_him.txt':{type:'file',content:'theres a player on dustbowl\nhes not on the scorboard\nhes not on any team\nhes just STANDING THERE\n\ni asked mike and he said he doesnt see anyone\nbut HES RIGHT THERE\n\nhes looking at me\nthrough the screen\ni swear hes looking at me'},'dont_open_tf2.txt':{type:'file',content:'DO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2'},'dreams.txt':{type:'file',content:'i keep dreming abt dustbowl\nnot the game\nlike im THERE\nthe tunels the dust\nits so dry i can feel it\n\nand hes there 2\nthe figure\nhe says i belong there\nhe says i never left'},'what_is_happening.txt':{type:'file',content:'my pc restarted on its own\nnew files evrywhre\na whole new DRIVE??\nLOCALDRIVED??\n\ni didnt put that there\ni didnt make these files\n\nwhos writing these'},'to_mom.txt':{type:'file',content:'hey mom\nim sorry i didnt clean my room\nim sorry i didnt do the grocerys\nim sorry i was always late 4 dinner\nim sorry i played tf2 instead of doing hw\n\ni luv u mom\n\ni dont think i can stop whats hapening'},'to_mike.txt':{type:'file',content:'mike if ur reading this\nur my best frend dude\nremember when we played dustbowl all nite\nand u got that sick airshot\nand i ubered that random heavy who just ate a sandvich\n\nthat was the best nite\n\ni wish things stayed like that'},'server_0000.txt':{type:'file',content:'0.0.0.0:27015\n\ni didnt add this server\nit added itself\nit joins ME\n\nwhen i connect theres no map\njust dark\njust nothing\n\nand him'},'last_entry.txt':{type:'file',content:'5/28/2010\n\nim so tired\n\ni cant do this anymore\n\ntomrow i go home'},'note001.txt':{type:'file',content:'13 13 13 13 13 13 13'},'note002.txt':{type:'file',content:'the number 13. its evrywhere. my pid. the bad sectors. the server port ends in 13 if u add the digits. am i going crazy'},'note003.txt':{type:'file',content:'201. thats the number. i dont kno what it means but its important. its the key 2 somthing.'},'dave_ban_appeal.txt':{type:'file',content:'APPEAL TO DUSTBOWLDAVE_ADMIN:\n\nDave pls unban me i WASNT cheating\ni dont kno why my movment looked weird\nthe game has been glichy lately ok\n\nmy character moved on its own dave\nIM NOT LYING\nsomthing is wrong w my game\n\n...he didnt respond'},'the_demos.txt':{type:'file',content:'found these demo files on the hard drive:\n\ndemo001.dem - normal dustbowl game\ndemo002.dem - normal but... theres someone extra\ndemo003.dem - the extra player is closer\ndemo004.dem - hes right behind the camera\ndemo005.dem - CORRUPTED\n\ni shouldnt have watched them\ni shouldnt have ported them to sfm\n\nhe saw me watching'}};
for(let i=1;i<=35;i++){
const rnd=Math.floor(Math.random()*9999);
newFiles[`corrupted_${String(i).padStart(3,'0')}.dat`]={type:'file',content:`[CORRUPTED FILE]\n\n${'0'.repeat(20+Math.floor(Math.random()*40))}\n${'1'.repeat(10+Math.floor(Math.random()*30))}\n\nFILE RECOVERY FAILED\nORIGINAL: ${['essay','screenshot','chat_log','save_game','config','bookmark','download'][Math.floor(Math.random()*7)]}_${rnd}\nCORRUPTED BY: UNKNOWN PROCESS (PID 13)`};
}
Object.assign(docs,newFiles);
base['D:'||'LOCALDRIVED']={type:'dir',children:{
'demos':{type:'dir',children:{
'demo001.dem':{type:'file',content:'[DEMO FILE - Cannot preview]\nMap: cp_dustbowl\nDate: 2007-03-15\nPlayers: 24/24\nDuration: 00:32:14\nNotes: normal game. nothing unusual.'},
'demo002.dem':{type:'file',content:'[DEMO FILE - Cannot preview]\nMap: cp_dustbowl\nDate: 2007-04-02\nPlayers: 24/24... 25?\nDuration: 00:28:41\nNotes: player count flickered. probably a bug.'},
'demo003.dem':{type:'file',content:'[DEMO FILE - Cannot preview]\nMap: cp_dustbowl\nDate: 2007-06-19\nPlayers: 25/24\nDuration: 00:15:00\nNotes: the extra player. hes in every frame now. standing still. watching.'},
'demo005.dem':{type:'file',content:'[DEMO FILE - CORRUPTED]\nMap: ???\nDate: ???\nPlayers: 1/?\nDuration: 99:99:99\n\n[FILE UNREADABLE]'}
}},
'old_files':{type:'dir',children:{
'readme.txt':{type:'file',content:'if your reading this, the hard drive found a new owner.\n\ni tried to delete everything but it keeps coming back.\n\ndo NOT install tf2 on this drive.\ndo NOT open the demos.\ndo NOT connect to 0.0.0.0\n\nim sorry. i couldnt stop it.\n\n- previous owner'},
'photo_corrupted.png':{type:'img',src:`${mediaBasePath}img/corrupted1.png`}
}},
'home.exe':{type:'file',content:'[EXECUTABLE - Click to run]\nhome.exe\nSize: 201 KB\nCreated: 5/28/2010 12:06 AM\nModified: NEVER'}
}};
base['LOCALDRIVED']=base['D:'||'LOCALDRIVED'];
}
return base;
};
const getChats=()=>{
const normal={
'mikeloveshalflife':[
{u:'mikeloveshalflife',t:'6:45 PM',m:'yo duck you see the mann co update??'},
{u:'TheDustBwlDuck',t:'6:46 PM',m:'DUDE YES u can TRADE HATS now'},
{u:'mikeloveshalflife',t:'6:46 PM',m:'i know its insane. also theres a whole store'},
{u:'TheDustBwlDuck',t:'6:47 PM',m:'ya but u gota pay real money 4 it thats kinda dumb'},
{u:'mikeloveshalflife',t:'6:47 PM',m:'bro you are gonna spend money on virtual hats arent you'},
{u:'TheDustBwlDuck',t:'6:48 PM',m:'NO... maybe... shut up'},
{u:'mikeloveshalflife',t:'6:48 PM',m:'lmaoooo'},
{u:'TheDustBwlDuck',t:'6:49 PM',m:'anyway how was scool'},
{u:'mikeloveshalflife',t:'6:49 PM',m:'boring. henderson gave us another essay'},
{u:'TheDustBwlDuck',t:'6:50 PM',m:'omg ANOTHER 1?? i havent even finishd the last 1'},
{u:'mikeloveshalflife',t:'6:50 PM',m:'dude you gotta do your homework lol'},
{u:'TheDustBwlDuck',t:'6:51 PM',m:'dustbowl is more importnt then homework and thats a FACT'},
{u:'mikeloveshalflife',t:'6:51 PM',m:'youre gonna fail'},
{u:'TheDustBwlDuck',t:'6:52 PM',m:'cant fail if i dont turn it in *taps head*'},
{u:'mikeloveshalflife',t:'6:52 PM',m:'thats literally failing'},
{u:'TheDustBwlDuck',t:'6:53 PM',m:'ANYWAY u wana play dustbowl l8r??'},
{u:'mikeloveshalflife',t:'6:53 PM',m:'always. btw have u played hl2 ep2 yet'},
{u:'TheDustBwlDuck',t:'6:54 PM',m:'not yet i keep meaning 2'},
{u:'mikeloveshalflife',t:'6:54 PM',m:'DUDE the ending is insane u gotta play it'},
{u:'TheDustBwlDuck',t:'6:55 PM',m:'NO SPOILERS'},
{u:'mikeloveshalflife',t:'6:55 PM',m:'i would never. see u on dustbowl at 8?'},
{u:'TheDustBwlDuck',t:'6:56 PM',m:'always dud always'}
],
'xX_SC0UT_RULEZ_Xx':[
{u:'xX_SC0UT_RULEZ_Xx',t:'4:15 PM',m:'YO DUCK'},
{u:'TheDustBwlDuck',t:'4:15 PM',m:'waht'},
{u:'xX_SC0UT_RULEZ_Xx',t:'4:16 PM',m:'I JUST GOT A 15 KILLSTREAK ON DUSTBOWL'},
{u:'TheDustBwlDuck',t:'4:16 PM',m:'lol sure u did'},
{u:'xX_SC0UT_RULEZ_Xx',t:'4:17 PM',m:'IM SERIOUS BRO I WAS DOMINATING EVERYONE'},
{u:'TheDustBwlDuck',t:'4:17 PM',m:'werent u the guy who ran into a sentry 5 times in a row yesterday'},
{u:'xX_SC0UT_RULEZ_Xx',t:'4:18 PM',m:'THAT WAS A TACTICAL DECISION'},
{u:'TheDustBwlDuck',t:'4:18 PM',m:'a tactical decision 2 die 5 times lmaoo'},
{u:'xX_SC0UT_RULEZ_Xx',t:'4:19 PM',m:'whatever bro 1v1 me'},
{u:'TheDustBwlDuck',t:'4:19 PM',m:'im a medic main u WANT me 2 ubersaw u??'},
{u:'xX_SC0UT_RULEZ_Xx',t:'4:20 PM',m:'...actually nvm'},
{u:'TheDustBwlDuck',t:'4:20 PM',m:'thats waht i thoght lol'}
],
'PYROMANIAC_JEFF':[
{u:'PYROMANIAC_JEFF',t:'8:30 PM',m:'FIRE FIRE FIRE'},
{u:'TheDustBwlDuck',t:'8:30 PM',m:'jeff pls'},
{u:'PYROMANIAC_JEFF',t:'8:31 PM',m:'I AIRBLASTED A CROCKET TODAY'},
{u:'TheDustBwlDuck',t:'8:31 PM',m:'ok thats actualy sick'},
{u:'PYROMANIAC_JEFF',t:'8:32 PM',m:'IT KILLED THE SOLDIER WHO SHOT IT'},
{u:'TheDustBwlDuck',t:'8:32 PM',m:'LMAOOOO GET REKT'},
{u:'PYROMANIAC_JEFF',t:'8:33 PM',m:'pyro is the best class and u cant change my mind'},
{u:'TheDustBwlDuck',t:'8:33 PM',m:'medic > evrything but ok jeff'},
{u:'PYROMANIAC_JEFF',t:'8:34 PM',m:'MMPH MMPH'},
{u:'TheDustBwlDuck',t:'8:34 PM',m:'ur literally typing mmph right now i cant w u'}
],
'lolsarah07':[
{u:'lolsarah07',t:'3:22 PM',m:'hey did u do the math homework?'},
{u:'TheDustBwlDuck',t:'3:23 PM',m:'uh'},
{u:'TheDustBwlDuck',t:'3:23 PM',m:'define "do"'},
{u:'lolsarah07',t:'3:24 PM',m:'omg lol. can i copy urs?'},
{u:'TheDustBwlDuck',t:'3:24 PM',m:'u cant copy somthing taht doesnt exist sarah'},
{u:'lolsarah07',t:'3:25 PM',m:'were both gonna fail arent we'},
{u:'TheDustBwlDuck',t:'3:25 PM',m:'problably lol'},
{u:'lolsarah07',t:'3:26 PM',m:'what do u even do all day'},
{u:'TheDustBwlDuck',t:'3:26 PM',m:'i play tf2'},
{u:'lolsarah07',t:'3:27 PM',m:'u play that game SO much'},
{u:'TheDustBwlDuck',t:'3:27 PM',m:'its not just a game sarah its a LIFESTYLE'},
{u:'lolsarah07',t:'3:28 PM',m:'ur such a nerd haha'},
{u:'TheDustBwlDuck',t:'3:28 PM',m:'a nerd who can headshot u from across dustbowl'},
{u:'lolsarah07',t:'3:29 PM',m:'idk what that means but ok lol'}
],
'dj_n00dles':[
{u:'dj_n00dles',t:'5:00 PM',m:'bro check out this song i made in audacity'},
{u:'TheDustBwlDuck',t:'5:01 PM',m:'is it anuther remix of the tf2 theme'},
{u:'dj_n00dles',t:'5:01 PM',m:'...maybe'},
{u:'TheDustBwlDuck',t:'5:02 PM',m:'lol send it'},
{u:'dj_n00dles',t:'5:05 PM',m:'ok sent check ur email'},
{u:'TheDustBwlDuck',t:'5:06 PM',m:'dud this is just the tf2 theme but bass boosted'},
{u:'dj_n00dles',t:'5:06 PM',m:'ITS ART'},
{u:'TheDustBwlDuck',t:'5:07 PM',m:'its 12 seconds long'},
{u:'dj_n00dles',t:'5:07 PM',m:'SHORT ART'}
],
'sENTRY_gUY_420':[
{u:'sENTRY_gUY_420',t:'9:00 PM',m:'hEY DucK'},
{u:'TheDustBwlDuck',t:'9:00 PM',m:'dude y is ur caps lock always messed up'},
{u:'sENTRY_gUY_420',t:'9:01 PM',m:'mY KEYBOARD IS bROKEN ok'},
{u:'TheDustBwlDuck',t:'9:01 PM',m:'lmao'},
{u:'sENTRY_gUY_420',t:'9:02 PM',m:'aNYWAY i GOT a nEW SENTRY sPOT oN dUSTBOWL'},
{u:'TheDustBwlDuck',t:'9:02 PM',m:'oh no'},
{u:'sENTRY_gUY_420',t:'9:03 PM',m:'iTS bEHIND tHE rOCK nEAR 2ND pOINT'},
{u:'TheDustBwlDuck',t:'9:03 PM',m:'evry1 knows that spot dud'},
{u:'sENTRY_gUY_420',t:'9:04 PM',m:'sHUT uP iT wORKS'}
],
'cr1tical_h1t':[
{u:'cr1tical_h1t',t:'7:30 PM',m:'im literally the best soldier on this server'},
{u:'TheDustBwlDuck',t:'7:30 PM',m:'u went 5 and 12 last game'},
{u:'cr1tical_h1t',t:'7:31 PM',m:'those were tactical deaths'},
{u:'TheDustBwlDuck',t:'7:31 PM',m:'u rocketed urself 3 times'},
{u:'cr1tical_h1t',t:'7:32 PM',m:'ROCKET JUMPING'},
{u:'TheDustBwlDuck',t:'7:32 PM',m:'into a wall. and dying. 3 times.'},
{u:'cr1tical_h1t',t:'7:33 PM',m:'whatever im still better than you'},
{u:'TheDustBwlDuck',t:'7:33 PM',m:'im literaly top of the scorboard rn but ok'}
],
'M3DIC_OR_RIOT':[
{u:'M3DIC_OR_RIOT',t:'8:00 PM',m:'FELLOW MEDIC MAIN'},
{u:'TheDustBwlDuck',t:'8:00 PM',m:'YOOO'},
{u:'M3DIC_OR_RIOT',t:'8:01 PM',m:'DO U UBERSAW'},
{u:'TheDustBwlDuck',t:'8:01 PM',m:'THE UBERSAW NEVER FAILS'},
{u:'M3DIC_OR_RIOT',t:'8:02 PM',m:'IT FAILS LITERALLY ALL THE TIME'},
{u:'TheDustBwlDuck',t:'8:02 PM',m:'ok it fails SOMETIMES but when it works its BEAUTIFUL'},
{u:'M3DIC_OR_RIOT',t:'8:03 PM',m:'I PREFER KRITZKRIEG'},
{u:'TheDustBwlDuck',t:'8:03 PM',m:'kritz is good 2 but ubersaw just hits difrent u kno'},
{u:'M3DIC_OR_RIOT',t:'8:04 PM',m:'MEDIC SUPREMACY'},
{u:'TheDustBwlDuck',t:'8:04 PM',m:'MEDIC SUPREMACY'}
],
'BONKBONKBONK':[
{u:'BONKBONKBONK',t:'5:30 PM',m:'BONK'},
{u:'TheDustBwlDuck',t:'5:30 PM',m:'hello 2 u 2'},
{u:'BONKBONKBONK',t:'5:31 PM',m:'BONK BONK BONK'},
{u:'TheDustBwlDuck',t:'5:31 PM',m:'do u say anythng else'},
{u:'BONKBONKBONK',t:'5:32 PM',m:'sometimes i say BOINK'},
{u:'TheDustBwlDuck',t:'5:32 PM',m:'incredible'},
{u:'BONKBONKBONK',t:'5:33 PM',m:'hey duck do u think scout is the fastest class'},
{u:'TheDustBwlDuck',t:'5:33 PM',m:'yes?? thats literaly his thing'},
{u:'BONKBONKBONK',t:'5:34 PM',m:'what if there was a class faster than scout'},
{u:'TheDustBwlDuck',t:'5:34 PM',m:'then it would be broken lol'},
{u:'BONKBONKBONK',t:'5:35 PM',m:'BONK'},
{u:'TheDustBwlDuck',t:'5:35 PM',m:'ok ur back 2 bonk mode i see'}
],
'dustbowlDAVE_admin':[
{u:'dustbowlDAVE_admin',t:'10:15 PM',m:'TheDustBwlDuck, we need to talk about your gameplay tonight.'},
{u:'TheDustBwlDuck',t:'10:15 PM',m:'waht?? i wasnt doing anythng wrong'},
{u:'dustbowlDAVE_admin',t:'10:16 PM',m:'Your movement was impossible. You were moving faster than any class should.'},
{u:'TheDustBwlDuck',t:'10:16 PM',m:'dude WAHT i wasnt cheating i swear'},
{u:'dustbowlDAVE_admin',t:'10:17 PM',m:'Multiple players reported you. I reviewed the demo myself.'},
{u:'TheDustBwlDuck',t:'10:17 PM',m:'dave pls i play on ur server evry nite u kno me'},
{u:'dustbowlDAVE_admin',t:'10:18 PM',m:'I know. Which is why this is strange. Your character was in places you shouldnt have been able to reach.'},
{u:'TheDustBwlDuck',t:'10:18 PM',m:'my game has been glichy lately ok something is wrong w it'},
{u:'dustbowlDAVE_admin',t:'10:19 PM',m:'Im sorry but I have to ban you. The evidence is clear.'},
{u:'TheDustBwlDuck',t:'10:19 PM',m:'DAVE COME ON'},
{u:'TheDustBwlDuck',t:'10:20 PM',m:'this is so unfar i wasnt doing anythng'},
{u:'TheDustBwlDuck',t:'10:22 PM',m:'dave??'},
{u:'TheDustBwlDuck',t:'10:30 PM',m:'fine watever'}
],
'hevy_sandvich_man':[
{u:'hevy_sandvich_man',t:'7:00 PM',m:'sandvich'},
{u:'TheDustBwlDuck',t:'7:00 PM',m:'yes hello'},
{u:'hevy_sandvich_man',t:'7:01 PM',m:'i made a sandvich today. in real life.'},
{u:'TheDustBwlDuck',t:'7:01 PM',m:'was it good'},
{u:'hevy_sandvich_man',t:'7:02 PM',m:'it was the best sandvich'},
{u:'TheDustBwlDuck',t:'7:02 PM',m:'nice dud'},
{u:'hevy_sandvich_man',t:'7:03 PM',m:'bologna cheese lettuce tomato mayo on white bread'},
{u:'TheDustBwlDuck',t:'7:03 PM',m:'thats just a normal sandwhich'},
{u:'hevy_sandvich_man',t:'7:04 PM',m:'sandVICH not sandWICH'},
{u:'TheDustBwlDuck',t:'7:04 PM',m:'my mistake'},
{u:'hevy_sandvich_man',t:'7:05 PM',m:'heavy would be proud of me'},
{u:'TheDustBwlDuck',t:'7:05 PM',m:'heavy would eat that in 1 bite'},
{u:'hevy_sandvich_man',t:'7:06 PM',m:'that is a fair point. hey do u wanna play dustbowl i go heavy u go medic'},
{u:'TheDustBwlDuck',t:'7:06 PM',m:'dud ALWAYS im always down 4 dustbowl'},
{u:'hevy_sandvich_man',t:'7:07 PM',m:'the dream team'},
{u:'TheDustBwlDuck',t:'7:07 PM',m:'UBER SANDVICH COMBO LETS GOOO'}
],
'spycrab_lol':[
{u:'spycrab_lol',t:'6:00 PM',m:'*does the spycrab walk*'},
{u:'TheDustBwlDuck',t:'6:00 PM',m:'lol evry time'},
{u:'spycrab_lol',t:'6:01 PM',m:'its an art form'},
{u:'TheDustBwlDuck',t:'6:01 PM',m:'its u crouching and looking up'},
{u:'spycrab_lol',t:'6:02 PM',m:'ART. FORM.'},
{u:'TheDustBwlDuck',t:'6:03 PM',m:'how many times have u gotten killed doing that'},
{u:'spycrab_lol',t:'6:03 PM',m:'... a lot'},
{u:'TheDustBwlDuck',t:'6:04 PM',m:'lmaoooo'},
{u:'spycrab_lol',t:'6:04 PM',m:'its worth it tho. the other day i did it in front of the whole server and 3 ppl joined me'},
{u:'TheDustBwlDuck',t:'6:05 PM',m:'a spycrab army'},
{u:'spycrab_lol',t:'6:05 PM',m:'WE WALKED ACROSS THE MAP TOGETHER'},
{u:'TheDustBwlDuck',t:'6:06 PM',m:'that is actualy beautful'},
{u:'spycrab_lol',t:'6:06 PM',m:'then a pyro killed all of us'},
{u:'TheDustBwlDuck',t:'6:07 PM',m:'RIP the crabs'},
{u:'spycrab_lol',t:'6:07 PM',m:'they lived as they died. crabbing.'}
],
'iiiiillllllllll':[
{u:'iiiiillllllllll',t:'8:45 PM',m:'hey'},
{u:'TheDustBwlDuck',t:'8:45 PM',m:'i literaly cant read ur name'},
{u:'iiiiillllllllll',t:'8:46 PM',m:'thats the point'},
{u:'TheDustBwlDuck',t:'8:46 PM',m:'fair enuf'},
{u:'iiiiillllllllll',t:'8:47 PM',m:'nobody can report me if they cant type my name'},
{u:'TheDustBwlDuck',t:'8:47 PM',m:'thats... actualy genius'},
{u:'iiiiillllllllll',t:'8:48 PM',m:'i have been doing this since 2008 not one report'},
{u:'TheDustBwlDuck',t:'8:48 PM',m:'wait do u even DO anythng worth reporting'},
{u:'iiiiillllllllll',t:'8:49 PM',m:'no'},
{u:'TheDustBwlDuck',t:'8:49 PM',m:'so the name is pointles'},
{u:'iiiiillllllllll',t:'8:50 PM',m:'its about the principle'}
],
'ROCKETLAUNCHER69':[
{u:'ROCKETLAUNCHER69',t:'4:00 PM',m:'ROCKET LAUNCHER IS THE BEST WEAPON'},
{u:'TheDustBwlDuck',t:'4:00 PM',m:'how old r u'},
{u:'ROCKETLAUNCHER69',t:'4:01 PM',m:'14'},
{u:'TheDustBwlDuck',t:'4:01 PM',m:'ya that checks out lol'},
{u:'ROCKETLAUNCHER69',t:'4:02 PM',m:'HEY WHATS THAT SUPPOSED TO MEAN'},
{u:'TheDustBwlDuck',t:'4:02 PM',m:'nothing nothing lmao'}
],
'sn1p3r_n0_sc0p3':[
{u:'sn1p3r_n0_sc0p3',t:'9:30 PM',m:'DUDE I ALMOST HIT A NOSCOPE'},
{u:'TheDustBwlDuck',t:'9:30 PM',m:'almost?'},
{u:'sn1p3r_n0_sc0p3',t:'9:31 PM',m:'it went past his head by like 2 pixels'},
{u:'TheDustBwlDuck',t:'9:31 PM',m:'so u missed'},
{u:'sn1p3r_n0_sc0p3',t:'9:32 PM',m:'ALMOST DOESNT COUNT AS MISSING'},
{u:'TheDustBwlDuck',t:'9:32 PM',m:'it literaly does'}
],
'sk8rboi_jake':[
{u:'sk8rboi_jake',t:'3:00 PM',m:'dude i landed a kickflip today'},
{u:'TheDustBwlDuck',t:'3:00 PM',m:'sick bro'},
{u:'sk8rboi_jake',t:'3:01 PM',m:'then i fell on my face'},
{u:'TheDustBwlDuck',t:'3:01 PM',m:'lmaoo classic jake'},
{u:'sk8rboi_jake',t:'3:02 PM',m:'u should come skating sometime'},
{u:'TheDustBwlDuck',t:'3:02 PM',m:'i would but dustbowl is calling me'},
{u:'sk8rboi_jake',t:'3:03 PM',m:'u and that game bro'}
],
'amanda_sparkles':[
{u:'amanda_sparkles',t:'2:00 PM',m:'heyyy!! ✨✨✨'},
{u:'TheDustBwlDuck',t:'2:00 PM',m:'hey amanda'},
{u:'amanda_sparkles',t:'2:01 PM',m:'did u see the new twilight trailer?? ✨'},
{u:'TheDustBwlDuck',t:'2:01 PM',m:'i dont watch twilight lol'},
{u:'amanda_sparkles',t:'2:02 PM',m:'ur missing out!! ✨✨'},
{u:'TheDustBwlDuck',t:'2:02 PM',m:'il take ur word 4 it'}
],
'TyLeR_dRuMz':[
{u:'TyLeR_dRuMz',t:'5:15 PM',m:'dude come over saturday i got new drum sticks'},
{u:'TheDustBwlDuck',t:'5:15 PM',m:'r we actualy gona start the band this time'},
{u:'TyLeR_dRuMz',t:'5:16 PM',m:'YES BRO THIS TIME FOR REAL'},
{u:'TheDustBwlDuck',t:'5:16 PM',m:'u said that last month'},
{u:'TyLeR_dRuMz',t:'5:17 PM',m:'this time is different i can almost play one song'},
{u:'TheDustBwlDuck',t:'5:17 PM',m:'ALMOST one song lmaooo'}
],
'chrisgaming07':[
{u:'chrisgaming07',t:'4:30 PM',m:'hey whats up'},
{u:'TheDustBwlDuck',t:'4:30 PM',m:'nm just dustbowl'},
{u:'chrisgaming07',t:'4:31 PM',m:'nice. i just got cod'},
{u:'TheDustBwlDuck',t:'4:31 PM',m:'cod is ok but tf2 is beter'},
{u:'chrisgaming07',t:'4:32 PM',m:'everything is better than tf2 according to you wait i mean tf2 is better than everything to you'},
{u:'TheDustBwlDuck',t:'4:32 PM',m:'EXACTLY'}
],
'baseballbrad55':[
{u:'baseballbrad55',t:'6:30 PM',m:'dude check this out'},
{u:'baseballbrad55',t:'6:30 PM',m:'[link to funny video]'},
{u:'TheDustBwlDuck',t:'6:31 PM',m:'lmaoooo'},
{u:'baseballbrad55',t:'6:31 PM',m:'right?? anyway practice went good today'},
{u:'TheDustBwlDuck',t:'6:32 PM',m:'nice. i had practice 2. on dustbowl. lol'},
{u:'baseballbrad55',t:'6:33 PM',m:'thats not the same as actual exercise bro'},
{u:'TheDustBwlDuck',t:'6:33 PM',m:'u dont kno how hard medic is. my fingers get a workout'},
{u:'baseballbrad55',t:'6:34 PM',m:'youre hopeless lol'},
{u:'TheDustBwlDuck',t:'6:34 PM',m:'hey u should come watch me play sometime'},
{u:'baseballbrad55',t:'6:35 PM',m:'watch you play a video game'},
{u:'TheDustBwlDuck',t:'6:35 PM',m:'its like watching baseball but cooler'},
{u:'baseballbrad55',t:'6:36 PM',m:'nothing is cooler than baseball'},
{u:'TheDustBwlDuck',t:'6:36 PM',m:'DUSTBOWL is cooler then baseball'},
{u:'baseballbrad55',t:'6:37 PM',m:'we cant be friends anymore'},
{u:'TheDustBwlDuck',t:'6:37 PM',m:'lol'},
{u:'baseballbrad55',t:'6:38 PM',m:'jk but seriously come outside sometime its nice out'},
{u:'TheDustBwlDuck',t:'6:38 PM',m:'the sun is my enemy'}
],
'LOLkevinn':[
{u:'LOLkevinn',t:'7:45 PM',m:'LOL'},
{u:'TheDustBwlDuck',t:'7:45 PM',m:'what'},
{u:'LOLkevinn',t:'7:46 PM',m:'nothing just LOL'},
{u:'TheDustBwlDuck',t:'7:46 PM',m:'ok kevin'},
{u:'LOLkevinn',t:'7:47 PM',m:'LOL did u see what happened in bio today'},
{u:'TheDustBwlDuck',t:'7:47 PM',m:'i wasnt there lol'},
{u:'LOLkevinn',t:'7:48 PM',m:'LOL the frog jumped off the table and mrs chen screamed'},
{u:'TheDustBwlDuck',t:'7:48 PM',m:'LMAOOO i wish i was there'},
{u:'LOLkevinn',t:'7:49 PM',m:'LOL then jake tried to catch it and knocked over the beakers'},
{u:'TheDustBwlDuck',t:'7:49 PM',m:'of course he did'},
{u:'LOLkevinn',t:'7:50 PM',m:'LOL ur never at school anymore bro where r u'},
{u:'TheDustBwlDuck',t:'7:50 PM',m:'home. playing tf2. the usual'},
{u:'LOLkevinn',t:'7:51 PM',m:'LOL ur gonna get held back'},
{u:'TheDustBwlDuck',t:'7:51 PM',m:'worth it'}
],
'quietkid_sam':[
{u:'quietkid_sam',t:'11:00 PM',m:'hey'},
{u:'TheDustBwlDuck',t:'11:02 PM',m:'oh hey sam'},
{u:'quietkid_sam',t:'11:05 PM',m:'cool'},
{u:'TheDustBwlDuck',t:'11:07 PM',m:'u ok dud? u dont msg me much'},
{u:'quietkid_sam',t:'11:12 PM',m:'yeah im ok'},
{u:'quietkid_sam',t:'11:12 PM',m:'just bored'},
{u:'TheDustBwlDuck',t:'11:13 PM',m:'u should play tf2 w us some time'},
{u:'quietkid_sam',t:'11:18 PM',m:'maybe'},
{u:'TheDustBwlDuck',t:'11:18 PM',m:'no pressure dud just saying ur always welcome'},
{u:'quietkid_sam',t:'11:25 PM',m:'thanks duck'},
{u:'quietkid_sam',t:'11:25 PM',m:'ur nice'},
{u:'TheDustBwlDuck',t:'11:26 PM',m:'lol thnx sam'}
],
'emogirl_raven':[
{u:'emogirl_raven',t:'10:00 PM',m:'life is meaningless'},
{u:'TheDustBwlDuck',t:'10:00 PM',m:'u ok?'},
{u:'emogirl_raven',t:'10:01 PM',m:'yeah just listening to mcr'},
{u:'TheDustBwlDuck',t:'10:01 PM',m:'oh ok lol carry on'},
{u:'emogirl_raven',t:'10:02 PM',m:'do u ever feel like nothings real'},
{u:'TheDustBwlDuck',t:'10:02 PM',m:'only when my team loses on dustbowl'},
{u:'emogirl_raven',t:'10:03 PM',m:'ur impossible lol'}
],
'xx_FRAGZ_xx':[
{u:'xx_FRAGZ_xx',t:'8:15 PM',m:'gg that dustbowl match was insane'},
{u:'TheDustBwlDuck',t:'8:15 PM',m:'dud u were destroying everyone'},
{u:'xx_FRAGZ_xx',t:'8:16 PM',m:'thats what happens when u actually try'},
{u:'TheDustBwlDuck',t:'8:16 PM',m:'teach me ur ways sensei'},
{u:'xx_FRAGZ_xx',t:'8:17 PM',m:'step 1 dont play medic step 2 actually shoot people'},
{u:'TheDustBwlDuck',t:'8:17 PM',m:'i feel personaly attacked'}
],
'n00bkillaXD':[
{u:'n00bkillaXD',t:'3:45 PM',m:'UR A NOOB'},
{u:'TheDustBwlDuck',t:'3:45 PM',m:'u have 2 hours in the game'},
{u:'n00bkillaXD',t:'3:46 PM',m:'SO?? IM STILL BETTER'},
{u:'TheDustBwlDuck',t:'3:46 PM',m:'u walked into my ubersaw 4 times'},
{u:'n00bkillaXD',t:'3:47 PM',m:'THOSE WERE LAG'}
],
'I_MAIN_EVERYTHING':[
{u:'I_MAIN_EVERYTHING',t:'7:00 PM',m:'today im a spy main'},
{u:'TheDustBwlDuck',t:'7:00 PM',m:'u were a scout main yesterday'},
{u:'I_MAIN_EVERYTHING',t:'7:01 PM',m:'and tomorrow ill be a heavy main'},
{u:'TheDustBwlDuck',t:'7:01 PM',m:'u cant main evrything thats not how it works'},
{u:'I_MAIN_EVERYTHING',t:'7:02 PM',m:'watch me'}
],
'2FORT_4EVER':[
{u:'2FORT_4EVER',t:'6:15 PM',m:'come play 2fort'},
{u:'TheDustBwlDuck',t:'6:15 PM',m:'no'},
{u:'2FORT_4EVER',t:'6:16 PM',m:'please'},
{u:'TheDustBwlDuck',t:'6:16 PM',m:'dustbowl or nothing'},
{u:'2FORT_4EVER',t:'6:17 PM',m:'dustbowl is just hallways'},
{u:'TheDustBwlDuck',t:'6:17 PM',m:'2fort is just a bridge'},
{u:'2FORT_4EVER',t:'6:18 PM',m:'...touche'}
],
'PAYLOAD_PAUL':[
{u:'PAYLOAD_PAUL',t:'5:45 PM',m:'have u tried payload maps'},
{u:'TheDustBwlDuck',t:'5:45 PM',m:'dustbowl IS kinda payload-ish'},
{u:'PAYLOAD_PAUL',t:'5:46 PM',m:'its attack defend thats different'},
{u:'TheDustBwlDuck',t:'5:46 PM',m:'close enuf'},
{u:'PAYLOAD_PAUL',t:'5:47 PM',m:'its really not but ok'}
],
'backstabBEN':[
{u:'backstabBEN',t:'9:45 PM',m:'FYI im going spy next round'},
{u:'TheDustBwlDuck',t:'9:45 PM',m:'ben y do u always announce it'},
{u:'backstabBEN',t:'9:46 PM',m:'its only fair'},
{u:'TheDustBwlDuck',t:'9:46 PM',m:'thats literaly the opposite of how spy works'},
{u:'backstabBEN',t:'9:47 PM',m:'HONOR BRO'},
{u:'TheDustBwlDuck',t:'9:47 PM',m:'u have no kills as spy ben'}
],
'cloakedNdaggerd':[
{u:'cloakedNdaggerd',t:'9:50 PM',m:'dont listen to ben hes terrible at spy'},
{u:'TheDustBwlDuck',t:'9:50 PM',m:'lol shots fired'},
{u:'cloakedNdaggerd',t:'9:51 PM',m:'i got 3 backstabs on u last game tho'},
{u:'TheDustBwlDuck',t:'9:51 PM',m:'...i dont want 2 talk abt that'},
{u:'cloakedNdaggerd',t:'9:52 PM',m:'lmaoo sorry not sorry'}
],
'hatcollector3000':[
{u:'hatcollector3000',t:'8:30 PM',m:'I GOT THE TOWERING PILLAR OF HATS'},
{u:'TheDustBwlDuck',t:'8:30 PM',m:'HOW'},
{u:'hatcollector3000',t:'8:31 PM',m:'traded for it. 3 refined'},
{u:'TheDustBwlDuck',t:'8:31 PM',m:'i dont even kno waht refined means'},
{u:'hatcollector3000',t:'8:32 PM',m:'bro u gotta learn trading'},
{u:'TheDustBwlDuck',t:'8:32 PM',m:'i just want 2 play dustbowl and hit ppl w my ubersaw'},
{u:'hatcollector3000',t:'8:33 PM',m:'ur missing out. hats are the real endgame'}
],
'48291637':[
{u:'48291637',t:'00:00',m:'13'},
{u:'48291637',t:'00:00',m:'13'},
{u:'48291637',t:'00:00',m:'13'},
{u:'48291637',t:'00:01',m:'201'},
{u:'48291637',t:'00:01',m:'201'},
{u:'48291637',t:'00:01',m:'201'},
{u:'48291637',t:'00:02',m:'0.0.0.0'},
{u:'48291637',t:'00:02',m:'0.0.0.0'},
{u:'48291637',t:'00:02',m:'0.0.0.0'},
{u:'48291637',t:'00:03',m:'52 75 6E'},
{u:'48291637',t:'00:03',m:'48 6F 6D 65'},
{u:'48291637',t:'00:04',m:'13 13 13 13 13 13 13'},
{u:'48291637',t:'00:04',m:'13 13 13 13 13 13 13 13 13 13 13 13 13'},
{u:'48291637',t:'00:05',m:'201201201201201201201201'},
{u:'48291637',t:'00:05',m:'000000000000000000000000'},
{u:'48291637',t:'00:06',m:'48291637'},
{u:'48291637',t:'00:06',m:'13'}
]
};
if(typeof pcState!=='undefined'&&pcState===2){
const corrupted=Object.assign({},normal);
corrupted['mikeloveshalflife']=[
{u:'mikeloveshalflife',t:'11:30 PM',m:'dude r u ok?? u havent been online in 3 days'},
{u:'mikeloveshalflife',t:'11:31 PM',m:'people on the server r asking about u'},
{u:'mikeloveshalflife',t:'11:45 PM',m:'i tried calling ur house ur mom said ur in ur room but u wont come out'},
{u:'mikeloveshalflife',t:'11:50 PM',m:'bro ur scaring me'},
{u:'TheDustBwlDuck',t:'11:55 PM',m:'mike'},
{u:'TheDustBwlDuck',t:'11:55 PM',m:'theres somthing on my pc'},
{u:'TheDustBwlDuck',t:'11:56 PM',m:'i cant explain it'},
{u:'TheDustBwlDuck',t:'11:56 PM',m:'its in tf2 but its also NOT in tf2'},
{u:'mikeloveshalflife',t:'11:57 PM',m:'what do u mean'},
{u:'TheDustBwlDuck',t:'11:58 PM',m:'theres a player who isnt a player mike'},
{u:'TheDustBwlDuck',t:'11:58 PM',m:'he follows me server 2 server'},
{u:'TheDustBwlDuck',t:'11:59 PM',m:'and now hes in my other games 2'},
{u:'mikeloveshalflife',t:'12:00 AM',m:'dude uninstall tf2 and reformat ur pc'},
{u:'TheDustBwlDuck',t:'12:01 AM',m:'i did. it didnt help. he came back.'},
{u:'TheDustBwlDuck',t:'12:02 AM',m:'he always comes back'}
];
delete corrupted['lolsarah07'];
delete corrupted['baseballbrad55'];
delete corrupted['LOLkevinn'];
delete corrupted['amanda_sparkles'];
delete corrupted['sk8rboi_jake'];
delete corrupted['chrisgaming07'];
corrupted['xX_SC0UT_RULEZ_Xx']=[
{u:'xX_SC0UT_RULEZ_Xx',t:'2:00 AM',m:'yo duck somthing weird happened on dustbowl'},
{u:'xX_SC0UT_RULEZ_Xx',t:'2:01 AM',m:'i saw someone standing in the tunnel and they werent on the scoreboard'},
{u:'xX_SC0UT_RULEZ_Xx',t:'2:01 AM',m:'is this some kind of prank'},
{u:'xX_SC0UT_RULEZ_Xx',t:'2:15 AM',m:'duck??'},
{u:'xX_SC0UT_RULEZ_Xx',t:'2:30 AM',m:'ok im kinda freaked out ngl'}
];
corrupted['??????????']=[
{u:'??????????',t:'00:06',m:'you turned it on.'},
{u:'??????????',t:'00:06',m:'i knew you would.'},
{u:'??????????',t:'00:06',m:'you always do.'},
{u:'??????????',t:'00:06',m:'13'},
{u:'??????????',t:'00:06',m:'im still here.'},
{u:'??????????',t:'00:06',m:'at home.'}
];
return corrupted;
}
return normal;
};
const getEmails=()=>{
const normal=[
{id:1,from:'mom',subject:'dinner tonight',date:'Sep 30, 2010',unread:true,body:'Hey sweetie,\n\nDinner is at 7. Please come down on time\nthis time and not 20 minutes late because\nyoure playing your game.\n\nAlso please clean your room this weekend.\nI mean it this time.\n\nLove,\nMom'},
{id:2,from:'mikeloveshalflife@yahoo.com',subject:'RE: dustbowl tonight?',date:'Sep 30, 2010',unread:true,body:'Yeah im down for tonight. Ill be on around 8.\n\nAlso did you finish the essay yet? Im not\ngonna lie I totally copied some of mine from\nwikipedia lol. Dont tell henderson.\n\nSee you on dustbowl\n- mike'},
{id:3,from:'admin@dustbowl247.com',subject:'Welcome to Dustbowl 24/7!',date:'Mar 15, 2008',unread:false,body:'Hey TheDustBwlDuck,\n\nWelcome to the Dustbowl 24/7 community server!\nYou have been added to our regulars list.\n\n- Server Admin Team'},
{id:4,from:'steampowered@steampowered.com',subject:'Your receipt for The Orange Box',date:'Oct 10, 2007',unread:false,body:'Thank you for your purchase!\n\nThe Orange Box\nPrice: $49.99\n\nThis game has been added to your Steam library.'},
{id:5,from:'newsletter@valvesoftware.com',subject:'TF2 Mann-Conomy Update!',date:'Sep 30, 2010',unread:true,body:'The Mann-Conomy Update is here!\n\nNew features:\n- Trading system\n- Mann Co. Store\n- New community items\n- Polycount Pack weapons\n\nSee full details at teamfortress.com'},
{id:6,from:'lolsarah07@gmail.com',subject:'math hw??',date:'Sep 29, 2010',unread:true,body:'hey did u do the math homework\nif u did can i see it lol\n\n- sarah'},
{id:7,from:'no-reply@facebook.com',subject:'TyLeR_dRuMz tagged you in a post',date:'Sep 28, 2010',unread:false,body:'Tyler tagged you in a post:\n"band practice this weekend!! me and @TheDustBwlDuck gonna be LEGENDS"\n\nView on Facebook'},
{id:8,from:'deals@bestbuy.com',subject:'HUGE SAVINGS on Electronics!',date:'Sep 27, 2010',unread:false,body:'BEST BUY WEEKLY DEALS\n\nXbox 360 - $199.99\nPS3 Slim - $299.99\nNew laptops starting at $399\n\nVisit your local Best Buy today!'},
{id:9,from:'info@gamestop.com',subject:'Pre-order Call of Duty: Black Ops',date:'Sep 26, 2010',unread:false,body:'Call of Duty: Black Ops\nReleases November 9, 2010\n\nPre-order now and get exclusive bonuses!\n\n$59.99'},
{id:10,from:'dustbowlDAVE_admin@gmail.com',subject:'RE: ban appeal',date:'Sep 25, 2010',unread:true,body:'TheDustBwlDuck,\n\nI reviewed the demo footage again.\nYour movement was not normal. I dont know\nhow to explain what I saw but characters\ndont move like that.\n\nThe ban stands. Im sorry.\n\n- Dave'},
{id:11,from:'no-reply@myspace.com',subject:'You have 3 new friend requests!',date:'Sep 24, 2010',unread:false,body:'You have new friend requests on MySpace!\n\nLog in to accept or deny them.\n\n(lol does anyone still use myspace)'},
{id:12,from:'free-ipod@totallylegit.com',subject:'YOU WON A FREE IPOD!!!',date:'Sep 23, 2010',unread:false,body:'CONGRATULATIONS!!!!\n\nYou have been selected to receive a FREE iPod Nano!\n\nClick here to claim your prize!\n\n(this is definately not a scam)'},
{id:13,from:'PYROMANIAC_JEFF@hotmail.com',subject:'FIRE',date:'Sep 22, 2010',unread:false,body:'dude check out this sick airblast i did\ni saved it in fraps\n\nill send it when i figure out how to upload stuff\n\nFIRE FIRE FIRE\n- jeff'},
{id:14,from:'ringtones@2010ringtones.com',subject:'Download the HOTTEST ringtones!',date:'Sep 21, 2010',unread:false,body:'Get the latest ringtones for your phone!\n\nTop hits:\n- Tik Tok by Ke$ha\n- Bad Romance by Lady Gaga\n- Airplanes by B.o.B\n\nOnly $2.99 each!'},
{id:15,from:'dj_n00dles@gmail.com',subject:'my new song',date:'Sep 20, 2010',unread:false,body:'yo check this out i made a new remix\n\nits the tf2 theme but dubstep\n\nattachment: tf2_dubstep_remix_v47_FINAL_FINAL2.mp3\n\n- dj n00dles'},
{id:16,from:'school@lincolnhigh.edu',subject:'Attendance Warning',date:'Sep 19, 2010',unread:true,body:'Dear Parent/Guardian,\n\nThis is to inform you that your student\nhas accumulated 5 unexcused absences this semester.\n\nPlease contact the school office.\n\n- Lincoln High School'},
{id:17,from:'xX_SC0UT_RULEZ_Xx@yahoo.com',subject:'1v1 ME',date:'Sep 18, 2010',unread:false,body:'BRO 1V1 ME ON MGE\nI BET I CAN BEAT U\n\nUR UBERSAW IS NO MATCH FOR MY SCATTERGUN\n\n- SCOUT RULEZ'},
{id:18,from:'hatcollector3000@gmail.com',subject:'trading guide',date:'Sep 17, 2010',unread:false,body:'hey duck heres how trading works:\n\n1 scrap = 2 weapons\n1 reclaimed = 3 scrap\n1 refined = 3 reclaimed\n\nstart saving ur weapon drops!!\n\n- hat guy'},
{id:19,from:'newsletter@newgrounds.com',subject:'New Flash Games This Week!',date:'Sep 15, 2010',unread:false,body:'Check out this weeks top games:\n\n- Epic Battle Fantasy 3\n- The Impossible Quiz 2\n- Madness Combat 7\n\nPlay now at Newgrounds.com!'},
{id:20,from:'baseballbrad55@gmail.com',subject:'funny video',date:'Sep 14, 2010',unread:false,body:'dude watch this video its hilarious\n\nhttps://youtube.com/watch?v=dQw4w9WgXcQ\n\n- brad'}
];
if(typeof pcState!=='undefined'&&pcState===2){
const corrupted=[
{id:100,from:'??????????@0.0.0.0',subject:'y̷o̸u̵ ̴t̵u̸r̷n̶e̵d̷ ̶i̸t̵ ̷o̸n̵',date:'May 28, 2010',unread:true,body:'i knew you would come back.\nyou always do.\n\n13'},
{id:101,from:'system@soos.local',subject:'CRITICAL: 50 files recovered',date:'May 28, 2010',unread:true,body:'SYSTEM ALERT\n\n50 files recovered from corrupted sectors\nDrive D: (LOCALDRIVED) mounted\nUnknown process detected (PID 13)\n\nWARNING: Process cannot be terminated\nWARNING: Process is modifying system files\n'},
...normal.slice(0,5).map((e,i)=>({...e,subject:i%2===0?e.subject.split('').map(c=>Math.random()>0.85?String.fromCharCode(c.charCodeAt(0)+1):c).join(''):e.subject,from:i%3===0?e.from.replace(/[aeiou]/g,'_'):e.from})),
...normal.slice(5)
];
return corrupted;
}
return normal;
};
const getBookmarks=()=>{
if(typeof pcState!=='undefined'&&pcState===2)return[{title:'0.0.0.0:27015',url:'http://0.0.0.0:27015'}];
return[
{title:'Dustbowl 24/7 - Community Server',url:'http://dustbowl247.community-tf2.net'},
{title:'TF2 Wiki - Dustbowl',url:'http://wiki.teamfortress.com/wiki/Dustbowl'},
{title:'Steam Community :: TheDustBwlDuck',url:'http://steamcommunity.com/id/thedustbwlduck'},
{title:'YouTube',url:'http://youtube.com'},
{title:'Facebook',url:'http://facebook.com'},
{title:'Newgrounds',url:'http://newgrounds.com'},
{title:'GameFAQs - TF2 Board',url:'http://gamefaqs.com/boards/tf2'},
{title:'Mann Co. Store',url:'http://store.teamfortress.com'}
];
};
const getHistory=()=>{
if(typeof pcState!=='undefined'&&pcState===2)return[{title:'0.0.0.0:27015',date:'May 28, 2010'}];
return[
{title:'google: "tf2 mann co update whats new"',date:'Sep 30, 2010'},
{title:'google: "tf2 trading guide beginners"',date:'Sep 30, 2010'},
{title:'youtube.com - TF2 Mann-Conomy Update Review',date:'Sep 29, 2010'},
{title:'google: "best tf2 medic loadout 2010"',date:'Sep 28, 2010'},
{title:'facebook.com',date:'Sep 27, 2010'},
{title:'google: "half life 2 episode 3 release date"',date:'Sep 26, 2010'},
{title:'newgrounds.com - Flash Games',date:'Sep 25, 2010'},
{title:'google: "how to make tf2 spray custom"',date:'Sep 22, 2010'},
{title:'google: "dell xps 420 slow fix 2010"',date:'Sep 20, 2010'},
{title:'gamefaqs.com - tf2 hat trading values',date:'Sep 18, 2010'}
];
};
const openApp=(id)=>{
const apps={explorer:openExplorer,browser:openBrowser,terminal:openTerminal,texteditor:()=>openTextEditor('','Select a file...'),mediaplayer:openMediaPlayer,imageviewer:openImageViewer,chat:openChat,email:openEmail,settings:openSettings,calculator:openCalculator,paint:openPaint,tf2:()=>triggerTF2Launch(),steam:()=>triggerSteamCrash(),limewire:openLimeWire,fraps:openFraps,winrar:openWinRAR,audacity:openAudacity,mirc:openMirc,home:openHomeGame};
if(apps[id])apps[id]();
};
const openExplorer=(path)=>{
const p=path??'C:/Users/TheDustBwlDuck';
const h=`<div class="app-explorer"><div class="explorer-toolbar"><button class="explorer-back-btn" id="exp-back">\u25C0</button><div class="explorer-path" id="exp-path">${p}</div></div><div class="explorer-content" id="exp-content"></div></div>`;
createWindow('explorer',`Files - ${p}`,550,400,h);
renderExplorerPath(p);
};
const renderExplorerPath=(path)=>{
const parts=path.split('/').filter(Boolean);
const fs=getFS();
let node=fs;
for(const part of parts){if(node[part]){if(node[part].type==='dir'){node=node[part].children}else{handleFileOpen(node[part],part);return}}else{return}}
const contentEl=document.getElementById('exp-content');
const pathEl=document.getElementById('exp-path');
if(!contentEl)return;
pathEl.textContent=path;
contentEl.innerHTML='';
if(path==='C:/Users/TheDustBwlDuck'&&typeof pcState!=='undefined'&&pcState===2){
const driveEl=document.createElement('div');
driveEl.className='explorer-item';
driveEl.innerHTML='<div class="explorer-item-icon">\uD83D\uDCBE</div><div class="explorer-item-name">LOCALDRIVED (D:)</div>';
driveEl.addEventListener('click',()=>renderExplorerPath('LOCALDRIVED'));
contentEl.appendChild(driveEl);
}
Object.entries(node).forEach(([name,item])=>{
const d=document.createElement('div');d.className='explorer-item';
const iconMap={dir:'\uD83D\uDCC1',img:'\uD83D\uDDBC',audio:'\uD83C\uDFB5',video:'\uD83C\uDFAC'};
d.innerHTML=`<div class="explorer-item-icon">${iconMap[item.type]??'\uD83D\uDCC4'}</div><div class="explorer-item-name">${name}</div>`;
d.addEventListener('click',()=>{item.type==='dir'?renderExplorerPath(`${path}/${name}`):handleFileOpen(item,name)});
contentEl.appendChild(d);
});
const backBtn=document.getElementById('exp-back');
if(backBtn){backBtn.onclick=()=>{const parent=path.split('/').slice(0,-1).join('/');if(parent)renderExplorerPath(parent)}}
};
const handleFileOpen=(item,name)=>{
if(name==='home.exe'&&typeof pcState!=='undefined'&&pcState===2){openHomeGame();return}
if(item.type==='file')openTextEditor(item.content,name);
else if(item.type==='img')openImageViewerSingle(item.src,name);
else if(item.type==='audio'||item.type==='video')openMediaPlayerFile(item.src,name,item.type);
};
const openBrowser=()=>{
const bmarks=getBookmarks();const hist=getHistory();
let bm='';bmarks.forEach((b)=>{bm+=`<div class="browser-bookmark" data-url="${b.url}">${b.title}</div>`});
let ht='';hist.forEach((h)=>{ht+=`<div class="browser-history-item"><span>${h.title}</span> <span style="color:#333;margin-left:8px">${h.date}</span></div>`});
const h=`<div class="app-browser"><div class="browser-toolbar"><input class="browser-url" id="browser-url" value="epiccustam://home" readonly><button class="browser-go-btn">\u27A1</button></div><div class="browser-content"><div style="color:#555;margin-bottom:16px;font-size:14px">EPICCUSTAMBROSWER v4.20</div><div style="color:#444;margin-bottom:8px;font-size:12px">BOOKMARKS</div><div class="browser-bookmarks">${bm}</div><div style="color:#444;margin:16px 0 8px;font-size:12px">RECENT HISTORY</div>${ht}</div></div>`;
createWindow('browser','EPICCUSTAMBROSWER',600,450,h);
};
const openTerminal=()=>{
const ver=typeof pcState!=='undefined'&&pcState===2?'v0.6.66':'v1.0.2';
const h=`<div class="app-terminal"><div class="terminal-output" id="term-out">SoOS Terminal ${ver}\nType "help" for available commands.\n\n</div><div class="terminal-input-line"><span class="terminal-prompt">TheDustBwlDuck@soos:~$</span><input class="terminal-input" id="term-in" autofocus spellcheck="false"></div></div>`;
createWindow('terminal','Terminal',550,350,h);
const inp=document.getElementById('term-in');
if(inp){inp.focus();inp.addEventListener('keydown',(e)=>{if(e.key==='Enter'){const cmd=inp.value.trim();inp.value='';processCommand(cmd)}})}
};
const processCommand=(cmd)=>{
const out=document.getElementById('term-out');if(!out)return;
out.innerHTML+=`<span style="color:#999">TheDustBwlDuck@soos:~$</span> ${cmd}\n`;
const lower=cmd.toLowerCase();
if(typeof pcState!=='undefined'&&pcState===2){
const responses=['i see you.','13.','why did you turn it on?','im still here.','at home.','you cant help him.','0.0.0.0','i knew you would come back.','you always do.','BACK','201','stop.','leave.'];
out.innerHTML+=`${responses[Math.floor(Math.random()*responses.length)]}\n\n`;
out.scrollTop=out.scrollHeight;return;
}
if(lower==='help'){out.innerHTML+='Available commands:\n  help     - show this message\n  whoami   - display current user\n  date     - show system date\n  ls       - list files\n  clear    - clear terminal\n  uptime   - system uptime\n  ps       - list processes\n  neofetch - system info\n\n'}
else if(lower==='whoami'){out.innerHTML+='TheDustBwlDuck\n\n'}
else if(lower==='date'){out.innerHTML+='Thu Sep 30 19:42:00 UTC 2010\n\n'}
else if(lower==='clear'){out.innerHTML=''}
else if(lower==='ls'){out.innerHTML+='Desktop/  Documents/  Pictures/  Music/  Videos/\n\n'}
else if(lower==='uptime'){out.innerHTML+='up 0 days, 0:32, load average: 0.42, 0.38, 0.35\n\n'}
else if(lower==='ps'){out.innerHTML+='  PID  STAT  COMMAND\n    1  S     init\n    2  S     soos-core\n    7  S     display-server\n   14  S     soos-shell\n   28  S     Steam.exe\n   31  S     hl2.exe\n\n'}
else if(lower==='neofetch'){out.innerHTML+='<span style="color:#fff">  ___  ___  ___  ___\n / __||   || _ \\/ __|\n \\__ \\| | ||  _/\\__ \\\n |___/|___||_|  |___/</span>\n\n  OS: SoOS 1.0.2\n  Host: TheDustBwlDuck\n  Uptime: 32 minutes\n  Shell: soos-sh\n  CPU: Intel Core 2 Quad Q6600 @ 2.40GHz\n  GPU: ATI Radeon HD 3870 512 MB\n  Memory: 4096 MB DDR2 (43% used)\n\n'}
else if(lower==='exit'){closeWindow('terminal');return}
else if(cmd!==''){out.innerHTML+=`<span style="color:#fff">Unknown command: ${cmd}</span>\n\n`}
out.scrollTop=out.scrollHeight;
};
const openTextEditor=(content,filename)=>{
const h=`<div class="app-texteditor"><div class="texteditor-toolbar"><span class="texteditor-filename">${filename}</span></div><div class="texteditor-content">${content.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div></div>`;
if(openWindows['texteditor'])closeWindow('texteditor');
createWindow('texteditor',`hackerman notepad - ${filename}`,480,360,h);
};
const openMediaPlayer=()=>{
const h='<div class="app-mediaplayer"><div class="mediaplayer-display"><div class="mediaplayer-placeholder">No media loaded.<br>Open files from File Explorer.</div></div><div class="mediaplayer-controls"><button class="mediaplayer-btn" id="mp-play">\u25B6</button><button class="mediaplayer-btn" id="mp-stop">\u25A0</button><span style="color:#444;font-size:11px;flex:1;text-align:center" id="mp-title">-</span></div></div>';
createWindow('mediaplayer','Media Player',450,350,h);
};
const openMediaPlayerFile=(src,name,type)=>{
const tag=type==='video'?`<video src="${src}" controls style="width:100%;height:100%"></video>`:`<audio src="${src}" controls style="margin-top:20px"></audio>`;
const h=`<div class="app-mediaplayer"><div class="mediaplayer-display">${tag}</div><div class="mediaplayer-controls"><span style="color:#888;font-size:11px;flex:1;text-align:center">${name}</span></div></div>`;
if(openWindows['mediaplayer'])closeWindow('mediaplayer');
createWindow('mediaplayer',`Media - ${name}`,500,380,h);
};
const openImageViewer=()=>{
const fs=getFS();
const images=[];
const pics=fs['C:'].children['Users'].children['TheDustBwlDuck'].children['Pictures'].children;
Object.entries(pics).forEach(([k,v])=>{if(v.type==='img')images.push({name:k,src:v.src})});
const h='<div class="app-imageviewer"><div class="imageviewer-display" id="iv-display"><div class="mediaplayer-placeholder">No images found.</div></div><div class="imageviewer-nav"><button class="imageviewer-nav-btn" id="iv-prev">\u25C0</button><span class="imageviewer-counter" id="iv-counter">0/0</span><button class="imageviewer-nav-btn" id="iv-next">\u25B6</button></div></div>';
createWindow('imageviewer','Gallery',500,400,h);
if(images.length>0){let idx=0;const showImg=()=>{document.getElementById('iv-display').innerHTML=`<img src="${images[idx].src}" onerror="this.parentElement.innerHTML='<div class=mediaplayer-placeholder>Image not found</div>'">`;document.getElementById('iv-counter').textContent=`${idx+1}/${images.length} - ${images[idx].name}`};showImg();document.getElementById('iv-prev').onclick=()=>{idx=(idx-1+images.length)%images.length;showImg()};document.getElementById('iv-next').onclick=()=>{idx=(idx+1)%images.length;showImg()}}
};
const openImageViewerSingle=(src,name)=>{
const h=`<div class="app-imageviewer"><div class="imageviewer-display"><img src="${src}" onerror="this.parentElement.innerHTML='<div class=mediaplayer-placeholder>Image not found</div>'"></div><div class="imageviewer-nav"><span class="imageviewer-counter">${name}</span></div></div>`;
if(openWindows['imageviewer'])closeWindow('imageviewer');
createWindow('imageviewer',`Gallery - ${name}`,500,400,h);
};
const openChat=()=>{
const chats=getChats();const contacts=Object.keys(chats);
let tabs='';contacts.forEach((c,i)=>{tabs+=`<button class="chat-contact${i===0?' active':''}" data-chat="${c}">${c}</button>`});
const h=`<div class="app-chat"><div class="chat-sidebar" id="chat-tabs">${tabs}</div><div class="chat-messages" id="chat-msgs"></div></div>`;
if(openWindows['chat'])closeWindow('chat');
createWindow('chat','Chat Logs',520,420,h);
renderChat(contacts[0]);
document.querySelectorAll('.chat-contact').forEach((btn)=>{btn.addEventListener('click',()=>{document.querySelectorAll('.chat-contact').forEach((b)=>b.classList.remove('active'));btn.classList.add('active');renderChat(btn.dataset.chat)})});
};
const renderChat=(contactId)=>{
const chats=getChats();const msgs=chats[contactId];
const el=document.getElementById('chat-msgs');if(!el||!msgs)return;el.innerHTML='';
msgs.forEach((m)=>{const d=document.createElement('div');d.className='chat-msg';d.innerHTML=`<span class="chat-msg-time">[${m.t}]</span> <span class="chat-msg-user" style="color:${m.u==='TheDustBwlDuck'?'#fff':'#999'}">${m.u}</span><div class="chat-msg-text">${m.m}</div>`;el.appendChild(d)});
el.scrollTop=el.scrollHeight;
};
const openEmail=()=>{
const emails=getEmails();let list='';
emails.forEach((e)=>{list+=`<div class="email-item${e.unread?' unread':''}" data-email-id="${e.id}"><div class="email-unread-dot${e.unread?'':' read'}"></div><div class="email-info"><div class="email-subject">${e.subject}</div><div class="email-from">${e.from}</div></div><div class="email-date">${e.date}</div></div>`});
const h=`<div class="app-email"><div class="email-list" id="email-list">${list}</div></div>`;
if(openWindows['email'])closeWindow('email');
createWindow('email','Mail',520,400,h);
document.querySelectorAll('.email-item').forEach((item)=>{item.addEventListener('click',()=>{const id=parseInt(item.dataset.emailId);const email=emails.find((e)=>e.id===id);if(!email)return;const body=document.querySelector('#win-email .window-body');if(body){body.innerHTML=`<div class="email-view"><button class="email-view-back" id="email-back">\u25C0 Back</button><div class="email-view-header"><div class="email-view-subject">${email.subject}</div><div class="email-view-meta">From: ${email.from} | ${email.date}</div></div><div class="email-view-body">${email.body}</div></div>`;document.getElementById('email-back').addEventListener('click',()=>openEmail())}})});
};
const openSettings=()=>{
const h='<div class="app-settings"><div class="settings-section"><div class="settings-section-title">System</div><div class="settings-row"><span class="settings-label">OS Version</span><span class="settings-value">SoOS 1.0.2</span></div><div class="settings-row"><span class="settings-label">User</span><span class="settings-value">TheDustBwlDuck</span></div><div class="settings-row"><span class="settings-label">Hostname</span><span class="settings-value">dustbowl-pc</span></div></div><div class="settings-section"><div class="settings-section-title">Hardware</div><div class="settings-row"><span class="settings-label">CPU</span><span class="settings-value">Intel Core 2 Quad Q6600</span></div><div class="settings-row"><span class="settings-label">RAM</span><span class="settings-value">4096 MB DDR2</span></div><div class="settings-row"><span class="settings-label">GPU</span><span class="settings-value">ATI Radeon HD 3870 512 MB</span></div><div class="settings-row"><span class="settings-label">HDD</span><span class="settings-value">320 GB (3 years old)</span></div></div><div class="settings-section"><div class="settings-section-title">Network</div><div class="settings-row"><span class="settings-label">Status</span><span class="settings-value">Connected</span></div></div></div>';
createWindow('settings','Settings',400,380,h);
};
const openCalculator=()=>{
const btns=['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'];let grid='';
btns.forEach((b)=>{grid+=`<button class="calc-btn${['/','*','-','+','=','C'].includes(b)?' op':''}" data-calc="${b}">${b}</button>`});
const h=`<div class="app-calculator"><div class="calc-display" id="calc-disp">0</div><div class="calc-buttons" id="calc-btns">${grid}</div></div>`;
createWindow('calculator','Calc',260,340,h);
const disp=document.getElementById('calc-disp');let expr='';
document.querySelectorAll('[data-calc]').forEach((btn)=>{btn.addEventListener('click',()=>{const v=btn.dataset.calc;if(v==='C'){expr='';disp.textContent='0'}else if(v==='='){try{const r=Function('"use strict";return ('+expr+')')();disp.textContent=r;expr=String(r)}catch{disp.textContent='ERR';expr=''}}else{expr+=v;disp.textContent=expr}})});
};
const openPaint=()=>{
const colors=['#ffffff','#000000','#333333','#666666','#999999','#cccccc'];let cb='';
colors.forEach((c,i)=>{cb+=`<div class="paint-color-btn${i===0?' active':''}" data-color="${c}" style="background:${c}"></div>`});
const h=`<div class="app-paint"><div class="paint-toolbar">${cb}<button class="paint-size-btn active" data-size="2">S</button><button class="paint-size-btn" data-size="5">M</button><button class="paint-size-btn" data-size="10">L</button><button class="paint-clear-btn" id="paint-clear">Clear</button></div><div class="paint-canvas-wrap" id="paint-wrap"><canvas id="paint-canvas"></canvas></div></div>`;
createWindow('paint','Paint',550,400,h);
setTimeout(()=>{const wrap=document.getElementById('paint-wrap');const canvas=document.getElementById('paint-canvas');if(!wrap||!canvas)return;const ctx=canvas.getContext('2d');canvas.width=wrap.offsetWidth;canvas.height=wrap.offsetHeight;ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,canvas.width,canvas.height);let drawing=false;let color='#ffffff';let size=2;canvas.addEventListener('mousedown',(e)=>{drawing=true;ctx.beginPath();ctx.moveTo(e.offsetX,e.offsetY)});canvas.addEventListener('mousemove',(e)=>{if(!drawing)return;ctx.strokeStyle=color;ctx.lineWidth=size;ctx.lineCap='round';ctx.lineTo(e.offsetX,e.offsetY);ctx.stroke()});canvas.addEventListener('mouseup',()=>{drawing=false});canvas.addEventListener('mouseleave',()=>{drawing=false});document.querySelectorAll('.paint-color-btn').forEach((btn)=>{btn.addEventListener('click',()=>{document.querySelectorAll('.paint-color-btn').forEach((b)=>b.classList.remove('active'));btn.classList.add('active');color=btn.dataset.color})});document.querySelectorAll('.paint-size-btn').forEach((btn)=>{btn.addEventListener('click',()=>{document.querySelectorAll('.paint-size-btn').forEach((b)=>b.classList.remove('active'));btn.classList.add('active');size=parseInt(btn.dataset.size)})});document.getElementById('paint-clear').addEventListener('click',()=>{ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,canvas.width,canvas.height)})},50);
};
const openLimeWire=()=>{createWindow('limewire','LimeWire PRO',400,300,'<div style="padding:16px;color:#888;font-size:13px"><div style="color:#fff;font-size:16px;border-bottom:1px solid #222;padding-bottom:8px;margin-bottom:12px">LimeWire PRO 5.5.10</div><div>Status: <span style="color:#fff">Connected (247 sources)</span></div><div style="margin-top:8px">Downloads: <span style="color:#fff">3 complete</span></div><div style="margin-top:8px">Shared: <span style="color:#fff">12 files</span></div><div style="margin-top:16px;color:#555;font-size:11px">definitely not downloading anything illegal lol</div></div>')};
const openFraps=()=>{createWindow('fraps','Fraps',350,250,'<div style="padding:16px;color:#888;font-size:13px"><div style="color:#fff;font-size:16px;border-bottom:1px solid #222;padding-bottom:8px;margin-bottom:12px">Fraps 3.4.7</div><div>FPS: <span style="color:#fff">60</span></div><div style="margin-top:8px">Recording: <span style="color:#fff">OFF</span></div><div style="margin-top:8px">Screenshots saved: <span style="color:#fff">C:/Users/TheDustBwlDuck/Pictures</span></div><div style="margin-top:12px;color:#555;font-size:11px">UNREGISTERED - pls buy it dad</div></div>')};
const openWinRAR=()=>{createWindow('winrar','WinRAR',350,200,'<div style="padding:16px;color:#888;font-size:13px"><div style="color:#fff;font-size:16px;border-bottom:1px solid #222;padding-bottom:8px;margin-bottom:12px">WinRAR 3.93</div><div style="color:#555;margin-top:12px">Your 40-day trial has expired.</div><div style="color:#555;margin-top:4px">Days since expiration: <span style="color:#fff">1,094</span></div><div style="color:#555;margin-top:4px">Will you ever buy it: <span style="color:#fff">No</span></div></div>')};
const openAudacity=()=>{createWindow('audacity','Audacity',450,300,'<div style="padding:16px;color:#888;font-size:13px"><div style="color:#fff;font-size:16px;border-bottom:1px solid #222;padding-bottom:8px;margin-bottom:12px">Audacity 1.3.12</div><div>Project: <span style="color:#fff">untitled</span></div><div style="margin-top:8px">Sample Rate: <span style="color:#fff">44100 Hz</span></div><div style="margin-top:12px;color:#555;font-size:11px">i use this 2 make tf2 remixes w dj_n00dles</div></div>')};
const openMirc=()=>{createWindow('mirc','mIRC',450,300,'<div style="padding:16px;color:#888;font-size:13px"><div style="color:#fff;font-size:16px;border-bottom:1px solid #222;padding-bottom:8px;margin-bottom:12px">mIRC 7.19</div><div>Server: <span style="color:#fff">irc.gamesurge.net</span></div><div style="margin-top:8px">Channel: <span style="color:#fff">#tf2-dustbowl</span></div><div style="margin-top:8px">Users online: <span style="color:#fff">23</span></div><div style="margin-top:12px;color:#555;font-size:11px">i mostly just lurk lol</div></div>')};
