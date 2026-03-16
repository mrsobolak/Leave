const mediaBasePath='/media/';
const getFS=()=>{
const base={
'C:':{type:'dir',children:{
'Users':{type:'dir',children:{
'TheDustBwlDuck':{type:'dir',children:{
'Desktop':{type:'dir',children:{}},
'Documents':{type:'dir',children:{
'school_essay_draft.txt':{type:'file',content:'The Amercan Revoltion - by me\n\nok so basicly the colonees were mad at britan\nbc of taxes and stuf and they were like\nno way dude we r leving\n\nand then gorge washington was like lets goooo\n\ni need to actualy finish this lol\ndue friday mrs henderson is gona kill me\n\nupdate: playd dustbowl insted oops'},
'tf2_binds.txt':{type:'file',content:'MY EPIC BINDS:\n\nbind f "voicemenu 0 1" (MEDIC!)\nbind g "voicemenu 2 1" (Nice Shot)\nbind h "say GET DUSTBOWLED LMAO"\nbind j "say UBERSAW TIME BABY"\nbind mouse4 "+jump"\n\nnote 2 self: stop spamming medic bind\nppl r geting mad at me again lol'},
'server_favs.txt':{type:'file',content:'MY SERVERS (BEST 2 WORST):\n\n1. Dustbowl 24/7 - THE GOAT SERVER\n2. epicdustbowlguys - BANNED (stupid admin)\n3. 2Fort Unlimited - 4 when dustbowl is ded\n4. cp_granary tryhard - 2 sweaty 4 me\n\ndustbowl 24/7 has the best ppl\nim on evry night basicly'},
'grocery_list.txt':{type:'file',content:'mom said get:\n- milk\n- bread\n- cereal (the good kind NOT the helthy one)\n- hot pockets (pepperoni)\n- mountain dew (code red)\n\ni keep forgeting so im puting it here\nwatch me forget 2 check this lol'},
'todo_list.txt':{type:'file',content:'STUFF I GOTA DO:\n- finish essay (FRIDAY OMG)\n- clean room (moms gona flip)\n- upd8 steam profle pic\n- ask mike abt hl2 ep 2\n- practise scout movment on dustbowl\n- fix mic buzzing\n- get better at spy (backstabMASTA keeps killin me)\n- figur out mann co store thing'},
'mann_co_update.txt':{type:'file',content:'MANN-CONOMY UPDATE NOTES (4 me):\n\nOK SO U CAN TRADE HATS NOW??\nand theres a STORE??\nthis is insane\n\ni got like 3 hats so far:\n- ghastly gibus (evry1 has this lol)\n- pyros beanie thing\n- the scout 1 w the headphones\n\nhatcollector3000 has like 50 hats\nhow does he DO that'},
'band_name_ideas.txt':{type:'file',content:'BAND NAMES (w drumz guy):\n- The Dustbowl Destroyers\n- Critical Hit\n- Ubercharged\n- The Payload Pushers\n- Bonk Energy\n\ndrumz guy says these all suck\nbut hes the 1 who cant even play drums right'},
'my_websight.html':{type:'file',content:'<html>\n<body bgcolor="black" text="green">\n<h1>WELCOME 2 MY WEBSITE</h1>\n<marquee>TheDustBwlDuck\'s EPIC SITE</marquee>\n<p>this site is under construcsion</p>\n<p>come back l8r 4 cool stuff</p>\n<br>\n<p>LINKS:</p>\n<p>- my steam profle (comming soon)</p>\n<p>- dustbowl tips (comming soon)</p>\n<p>- my fav songs (comming soon)</p>\n<br>\n<p>vistor countr: 3 (its just me lol)</p>\n<br>\n<p>made by me in notepad im basicly a hacker now</p>\n</body>\n</html>'},
'autoexec.cfg':{type:'file',content:'// MY TF2 CONFIG - DO NOT TOUCH\n// copyed from some guy on gamefaqs\n\ncl_interp 0.033\ncl_interp_ratio 1\ncl_cmdrate 66\ncl_updaterate 66\nrate 60000\nfps_max 120\n\n// my custom stuff\nhud_combattext 1\nhud_combattext_healing 1\ntf_dingaling_volume 0.75\n\n// spray stuff\ncl_spraydisable 0\n\n// idk what this does but ppl said its good\nmat_phong 0'},
'cool_ascii_art.txt':{type:'file',content:'check out this sick ascii art i found:\n\n    __  __          _ _      \n   |  \\/  | ___  __| (_) ___ \n   | |\\/| |/ _ \\/ _` | |/ __|\n   | |  | |  __/ (_| | | (__ \n   |_|  |_|\\___|\\__,_|_|\\___|\n\nim a medic main and proud of it\n\nalso heres a sentry:\n   ___\n  |   |\n  |   |---pew pew\n  |___|\n   /|\\\n\nok that doesnt realy look like a sentry\nbut u get the idea'},
'SUPER_SECRET_DO_NOT_READ.txt':{type:'file',content:'ok so i kinda have a crush on sparkles\nbut she likes twilight and i like tf2\nso idk how thats gona work\n\nIF ANYONE IS READING THIS I WILL END U\n\nespecialy u mike\ni kno ur on my pc sometimes'},
'class_skedule.txt':{type:'file',content:'MY SCHEDULE (fall 2010):\n\n1st peroid - English (mrs henderson) UGH\n2nd peroid - Math (mr kowalski) DOUBLE UGH\n3rd peroid - History (mrs chen) ok i guess\n4th peroid - LUNCH (best peroid)\n5th peroid - Bio (mr peterson) boring\n6th peroid - Gym (coach davis) ugh running\n\ni skip 6th peroid a lot lol\ncoach davis hasnt noticsd yet\n...or has he (the attendence email)'},
'jokes.txt':{type:'file',content:'JOKES 2 USE IN GAME CHAT:\n\n"why did the scout cross the road? 2 get BONKED"\n"knock knock" "whos there" "UBER" "uber who" "UBERCHARGE ACTIVATED"\n"what does a spy eat 4 breakfast? BACKSTAB-con" \n\nok these r terrible but ppl laughed at the spy 1\n\nactualey they were laughing AT me not WITH me'},
'pc_specs.txt':{type:'file',content:'MY PC SPECS (bragging rights):\n\nDell XPS 420 (birthday present 2007 BEST DAY EVER)\n\nCPU: Intel Core 2 Quad Q6600 @ 2.40GHz\nRAM: 4GB DDR2 800MHz\nGPU: ATI Radeon HD 3870 512MB\nHDD: 320GB Western Digital\nDVD: TSSTcorp DVD+-RW\nMonitor: Dell 19" LCD\nMouse: some logitech thing\nKeyboard: dell keyboard (its ok)\n\nthis thing CRUSHES tf2 at max settings\nwell mostly max\nok medium-high\nit runs tf2 thats whats importnt'},
'dream_loadouts.txt':{type:'file',content:'LOADOUTS I WANT:\n\nMedic (my main):\n- Kritzkrieg (need 2 find some1 2 trade)\n- Ubersaw (ALREADY HAVE IT LETS GO)\n- Blutsauger (need this 2)\n\nScout (my backup):\n- Force-A-Nature (looks SO fun)\n- Sandman (BONK)\n- Flying Guillotine (wait is that out yet)\n\nSpy (im terrible but its fun):\n- Ambassador (cant aim but i pretend i can)\n- Dead Ringer (4 trolling)'},

'math_homework_3.txt':{type:'file',content:'MATH HW - Chapter 7\n\n1) 3x + 5 = 20\nx = 5\n\n2) 7y - 3 = 18\ny = 3\n\n3) 2(x+4) = ???\ni gave up here lol'},
'english_vocab.txt':{type:'file',content:'VOCAB WORDS (test thursday):\n\nebullient - happy (i think?)\nepitome - like the best version of somthing\nubiquitous - evrywhere\nbenevolent - nice\nmundane - boring (like this class)\n\ni gotta study these but dustbowl is calling me'},
'research_paper_outline.txt':{type:'file',content:'RESEARCH PAPER - WW2\n\nIntro: ww2 was a big war\n\nBody paragraph 1: it started in like 1939\n\nBody paragraph 2: amercia joined in 1941\n\nBody paragraph 3: idk ill figur this out l8r\n\nConclusion:\n\nDUE IN 3 DAYS AND I HAVENT STARTD'},
'lab_report.txt':{type:'file',content:'BIO LAB REPORT\n\nHypothisis: the plant will grow more w sunlite\n\nMaterals: plant, water, sun, the other plant\n\nProcedure: put 1 plant in sun and 1 in closet\n\nResults: the sun plant grew more (duh)\n\nConclusion: plants need sun wow who knew\n\nmr peterson gave me a C+ on this'},
'book_report_notes.txt':{type:'file',content:'TO KILL A MOCKINGBIRD - notes\n\nok so theres this guy atticus\nand hes a lawyer\nand scout is his daughter (not the tf2 kind)\nand theres this bird metaphore or somthing\n\nhonestly i just read the sparknotes\n\nthe movie was ok tho'},
'spanish_homework.txt':{type:'file',content:'SPANISH 2 HW:\n\nhola = hello\nadios = goodbye\nme llamo = my name is\nno entiendo = i dont understand (me every class)\ndonde esta el bano = where is the bathroom\n\nthats all i kno after 2 years of spanish lol'},
'poem_for_english.txt':{type:'file',content:'POEM (mrs henderson said we gotta write one)\n\nroses are red\nviolets are blue\ni play tf2\nand so shud u\n\nshe gave me a D\nworth it'},
'tf2_stats.txt':{type:'file',content:'MY TF2 STATS (as of sept 2010):\n\nHours played: 2,847\nFav class: Medic (duh)\nFav map: cp_dustbowl (DOUBLE duh)\nKills: 14,203\nDeaths: 18,442 (dont judge me)\nUbers deployed: 3,891\nUbersaw kills: 247 (my proudest stat)\nMost played server: Dustbowl 24/7\n\nim prety sure i have more hours then any1 on the server\nexcept maybe admin'},
'tf2_tips_for_noobs.txt':{type:'file',content:'TF2 TIPS (by me, a pro):\n\n1. dont play spy ur not good at it (talking 2 myself here)\n2. MEDIC IS THE BEST CLASS and if u disagre ur wrong\n3. dont stand still or ull get headshotted\n4. learn 2 rocket jump (even as medic lol jk)\n5. dustbowl is the best map dont @ me\n6. if u see a spycrab let him live. its the law.\n7. never chase a scout into a hallway\n8. check behind u every 5 seconds\n9. ubersaw > every other melee weapon\n10. have fun (most importnt rule)'},
'tf2_rant.txt':{type:'file',content:'OK IM SO MAD RIGHT NOW\n\nsome kid on the server today said dustbowl is a bad map\nA BAD MAP\nDUSTBOWL\n\nlike ok name ONE map thats beter\n2fort? BORING\ngravelpit? CONFUSING\nbadlands? 2 OPEN\ngoldrush? ok goldrush is prety good BUT STILL\n\ndustbowl has EVRYTHNG\nchokepoints tunnels sentries CHAOS\n\nsome ppl just dont undrstnd greatnes'},
'tf2_funny_moments.txt':{type:'file',content:'FUNNIEST THINGS THAT HAPPEND ON DUSTBOWL:\n\n1. spy tried 2 backstab me but i turned around and ubersawed him (GET REKT)\n2. heavy ate sandvich while entire team died behind him\n3. 6 snipers on 1 team. SIX. we lost obvsly\n4. some1 built a sentry in the weirdest spot and it got a 15 killstreak\n5. i uberd a guy and he just stood there. AFK. wasted my uber. i was SO mad\n6. scout ran off a cliff trying 2 double jump\n7. pyro airblasted a crocket back at the soldier and it got a triple kill LMAOOO\n8. spy disguised as OUR medic and every1 fell 4 it\n9. 2 heavies both eating sandviches staring at each other. neither attacked. it was beutiful.\n10. admin banned a guy for "being 2 good" lol'},
'tf2_trade_log.txt':{type:'file',content:'TRADES IVE DONE:\n\n- gave 2 scrap for a sandvich (bad trade)\n- traded my duplicate gibus for... another gibus (???)\n- gave 1 rec for a strange medigun (STEAL)\n- hatcollector3000 offered me a towering pillar for 3 ref (i dont have 3 ref)\n- some random offered "free unusuals" (definatly a scam)\n\ni suck at trading but at least i have my ubersaw'},
'computer_problems.txt':{type:'file',content:'THINGS WRONG W MY PC:\n\n- fan is loud when i play tf2\n- sometimes screen goes black 4 like 1 second then comes back\n- takes forever 2 boot up\n- internet disconnects when mom uses microwave (NOT A JOKE)\n- steam takes 10 min 2 update every time\n- hard drive makes a weird clicking noise sometimes\n\nmike says the clicking is bad but its been doing it for months and its fine\n\n...prolly fine'},
'movies_to_watch.txt':{type:'file',content:'MOVIES I WANNA WATCH:\n\n- Iron Man 2 (just came out)\n- Inception (every1 says its confusing)\n- Toy Story 3 (dont judge me)\n- Scott Pilgrim (looks so cool)\n- The Social Network (facebook movie??)\n- Kick-Ass (herd its good)\n\nmike says we shud have a movie nite\nbut we always end up playing dustbowl insted lol'},
'songs_i_like.txt':{type:'file',content:'SONGS (sept 2010):\n\n- Paramore - Decode\n- Green Day - 21 Guns\n- Linkin Park - New Divide\n- System of a Down - Chop Suey\n- Dragonforce - Thru the Fire and Flames\n- Fall Out Boy - Sugar Were Going Down\n- My Chemical Romance - Welcome 2 the Black Parade\n- Blink 182 - All the Small Things\n- Disturbed - Down With the Sickness\n- Weezer - Buddy Holly\n\nall of these r on my limewire lol'},
'things_i_want.txt':{type:'file',content:'STUFF I WANT 4 CHRISTMAS:\n\n1. new headset (mine buzzes)\n2. Xbox 360 (4 halo reach)\n3. more RAM for my pc\n4. a second monitor (4 multitasking aka watching youtube while playing tf2)\n5. cod black ops\n6. itunes gift card\n7. new skateboard (jk ill never actualy skate)\n8. UNUSUAL HAT IN TF2 (a boy can dream)'},
'nicknames.txt':{type:'file',content:'NICKNAMES PPL CALL ME:\n\n- duck (every1)\n- dusty (mike)\n- medic boy (server ppl)\n- ubersaw kid (also server ppl)\n- hey u (coach davis when i skip gym)\n- sweetie (mom)\n- TheDust (admin when hes lazy)\n- THAT MEDIC (when i ubersaw ppl)'},
'secret_base.txt':{type:'file',content:'ok so theres this spot on dustbowl\nnear the tunnel on stage 2\nif u crouch behind the rock on the left\nu can see the entire chokepoint\nbut nobody can see u\n\ni call it the MEDIC CAVE\n\nadmin knows abt it and said its not an exploit\nso its LEGAL\n\ndont tell any1 (especialy scout rulez he will camp there 4ever)'},
'diary_aug15.txt':{type:'file',content:'august 15 2010\n\nschool starts in 2 weeks UGH\n\nspent all day on dustbowl. hit 2800 hours.\nthats like... a lot of hours\nlike more hours then ive spent sleeping this year prolly\n\nmike says i need a hobby besides tf2\nBUT TF2 IS MY HOBBY MIKE'},
'diary_sept1.txt':{type:'file',content:'september 1 2010\n\nfirst day of school was awful\nnew math teacher is super strict\nhendersons class again (kill me)\nat least i have lunch w mike\n\ncant wait 2 get home and play dustbowl'},
'diary_sept15.txt':{type:'file',content:'september 15 2010\n\nmann conomy update is coming evry1 is hyped\nhatcollector3000 wont shut up abt trading\ni just want 2 play the game not manage an economy lol\n\nalso got a B on my bio test!! mom was happy\nplayd dustbowl 2 celebrate'},
'diary_sept28.txt':{type:'file',content:'september 28 2010\n\nthe mann co update is HERE\ntheres a STORE now u can BUY HATS\n\nmy wallet is in danger\n\nalso drumz guy and i mite actualy start the band\nwe have a name: The Payload Pushers\n(he still says it sucks)'},
'how_2_make_spray.txt':{type:'file',content:'HOW TO MAKE A CUSTOM TF2 SPRAY:\n\n1. find a funny pic (i used trollface)\n2. make it 128x128 in paint\n3. save as .tga file (NOT .png it wont work)\n4. put it in tf/materials/vgui/logos\n5. open tf2 and go 2 multiplayer options\n6. select ur spray\n7. spray it on walls and laugh\n\nit took me 3 hours 2 figur this out\nbut now i have the best spray on the server'},
'friendship_list.txt':{type:'file',content:'BEST FRENDS RANKED:\n\n1. mike (obviously)\n2. sc0ut rulez (dustbowl partner)\n3. pyro99 (hes crazy but in a good way)\n4. drumz guy (even tho he cant play drums)\n5. n00dles (his remixes r actualy geting better)\n6. hevy sandvich man (he makes me laugh)\n7. sparkles (shes cool but she likes twilight so -1 point)\n\nnote: admin is NOT on this list becuz he BANNED ME'},
'School':{type:'dir',children:{
'history_essay_final.txt':{type:'file',content:'THE CIVIL WAR - FINAL DRAFT\nby TheDustBwlDuck\n\nThe Civil War was fought from 1861 to 1865.\nIt was between the North and the South.\nThe North won. Slavery ended.\n\nThere were many battles like Gettysburg\nand some other ones I forgot.\n\nAbraham Lincoln was the president during this time.\nHe was tall.\n\nThe end.\n\n(mrs chen gave me a C- and said "i kno u can do beter")'},
'math_test_corrections.txt':{type:'file',content:'MATH TEST CORRECTIONS (mr kowalski):\n\nQ3: i put 42 but the answer was 38\nQ7: forgot 2 carry the 1\nQ12: i literaly just guessd lol\nQ15: who even uses the quadratic formula in real life\nQ18: i wrote "idk" and he took off 5 points thats unfar\n\noriginal grade: 54\ncorrected grade: 67\n\nstill bad but at least its passing'},
'gym_excuse_note.txt':{type:'file',content:'Dear Coach Davis,\n\nPls excuse my son from gym class today.\nHe has a stomachache.\n\nSincerely,\nMom\n\n(i wrote this myself lol coach didnt notice)\n(UPDATE: he noticsd. im in trouble.)'}
}},
'TF2_Stuff':{type:'dir',children:{
'crosshair_settings.txt':{type:'file',content:'MY CROSSHAIR SETTINGS:\n\ncl_crosshair_file ""\ncl_crosshair_scale 32\ncl_crosshairalpha 200\ncl_crosshair_red 0\ncl_crosshair_green 255\ncl_crosshair_blue 0\n\ngreen crosshair = best crosshair\nfight me'},
'medic_guide.txt':{type:'file',content:'HOW 2 BE A GOOD MEDIC (by me):\n\n1. ALWAYS be healing some1\n2. dont pocket 1 person (unless theyre REALY good)\n3. build uber FAST - ubersaw helps\n4. pop uber b4 u die ALWAYS\n5. dont chase kills (unless its an ubersaw kill then go 4 it)\n6. call out spies behind u\n7. surf damage 2 escape (jump when u get hit)\n8. uber heavys on defense, demos on offense\n9. kritz is underated fight me\n10. HAVE FUN (medic is the most fun class and ull never convince me otherwise)'},
'server_rules_copy.txt':{type:'file',content:'DUSTBOWL 24/7 SERVER RULES (copied from motd):\n\n1. No cheating/hacking\n2. No mic spam\n3. No racism/hate speech\n4. No spawn camping for more than 30 seconds\n5. No intentional team stacking\n6. Respect admins\n7. Have fun!\n\n- dustbowlBOSS_admin\n\n(rule 4 is dumb tho. the spawn has a sentry right there)'},
'spy_practice_notes.txt':{type:'file',content:'SPY NOTES (im trying 2 get beter):\n\nsession 1: 0 backstabs, 7 deaths. terrible.\nsession 2: 2 backstabs, 12 deaths. worse.\nsession 3: 1 backstab (accidnetal), 5 deaths.\nsession 4: gave up went back 2 medic\n\nconclusion: im not a spy main and thats OK'},
'demoman_drunk_bet.txt':{type:'file',content:'DEMOMAN_DRUNK_247 bet me 2 reclaimed\nthat i cudnt get 10 ubersaw kills in 1 game\n\nround 1: 3 kills\nround 2: 4 kills\nround 3: 5 kills!!!\n\nTOTAL: 12 UBERSAW KILLS I WON THE BET\n\nhe still hasnt paid me. its been 2 weeks.'}
}},
'Random_Stuff':{type:'dir',children:{
'would_u_rather.txt':{type:'file',content:'WOULD U RATHER (me and mike):\n\n- fly or be invisible? FLY (mike said invisible hes wrong)\n- live in tf2 or minecraft? TF2 OBVSLY\n- eat pizza 4ever or tacos 4ever? pizza\n- be the best player or have the most hats? ...hats\n- fight 100 scout-sized heavys or 1 heavy-sized scout? the scout. ez.'},
'websites_i_made.txt':{type:'file',content:'WEBSITES I TRIED 2 MAKE:\n\n1. thedustbwlduck.freewebs.com - my first site (terrible)\n2. epic-dustbowl-tips.blogspot.com - 1 post then i forgot abt it\n3. my_website.html on my desktop - still "under construcsion"\n\ni am not a web developer and thats ok'},
'things_adults_say.txt':{type:'file',content:'THINGS ADULTS SAY THAT MAKE NO SENSE:\n\n"youll understand when ur older" - no i wont\n"money doesnt grow on trees" - i kno that\n"r u winning son" - DAD IM A MEDIC I DONT "WIN" I SUPPORT\n"turn that game off" - no\n"when i was your age" - u didnt have tf2 so ur argument is invalid'},
'top10_games.txt':{type:'file',content:'MY TOP 10 GAMES (sept 2010):\n\n1. Team Fortress 2 (duh)\n2. Half Life 2\n3. Portal\n4. Left 4 Dead 2\n5. Halo 3\n6. Super Mario Galaxy\n7. Guitar Hero 3\n8. Call of Duty 4\n9. Minecraft (its new but realy cool)\n10. Fancy Pants Adventure (newgrounds classic)\n\nhonerable mention: N Game'},
'conspiracy_theories.txt':{type:'file',content:'THINGS I THINK R TRUE:\n\n- valve cant count 2 3 (hl3 will NEVER come out)\n- the tf2 devs play favorites (soldier gets all the good wepons)\n- dustbowl was the first map they made and its still the best\n- pyro is a girl (i have no evidence but i beleve it)\n- gabe newell plays tf2 secretly on a alt account\n- the ghastly gibus is actualy the best hat they just made it common so evry1 can enjoy it'}
}}
},
'NEW_FOLDER':{type:'dir',children:{
'New Text Document.txt':{type:'file',content:''},
'New Text Document (2).txt':{type:'file',content:''},
'New Text Document (3).txt':{type:'file',content:'test'}
}}}},
'Downloads':{type:'dir',children:{
'linkin_park_numb.mp3.exe':{type:'file',content:'[SUSPICIOUS FILE]\nThis is definatly not a virus.\nSize: 847 KB\n\n(it was a virus)'},
'FREE_MINECRAFT.exe':{type:'file',content:'[SUSPICIOUS FILE]\nMinecraft_FREE_2010_no_virus_trust_me.exe\nSize: 2.1 MB\n\n(mike told me not 2 open this)'},
'tf2_wallpaper_pack.zip':{type:'file',content:'[ARCHIVE]\ntf2_wallpaper_pack.zip\n47 files, 23.4 MB\n\ndownladed from deviantart'},
'Dragonforce_Through_The_Fire.mp3':{type:'file',content:'[AUDIO FILE]\nDragonforce - Through the Fire and Flames\nBitrate: 128kbps (limewire quality lol)\nDuration: 7:21'},
'naruto_amv_hd.avi':{type:'file',content:'[VIDEO FILE]\nNaruto AMV - Bring Me To Life\nResolution: 480p\nSize: 84 MB\nDuration: 4:12\n\nthis took 6 hours 2 download'},
'coolest_spray_ever.vtf':{type:'file',content:'[TF2 SPRAY FILE]\ncoolest_spray_ever.vtf\nits the trollface\n128x128'},

'System_Of_A_Down_Toxicity.mp3':{type:'file',content:'[AUDIO FILE]\nSystem of a Down - Toxicity\nBitrate: 128kbps\nDuration: 3:38\nSource: LimeWire'},
'paramore_decode.mp3':{type:'file',content:'[AUDIO FILE]\nParamore - Decode\nBitrate: 192kbps\nDuration: 4:17\nSource: LimeWire'},
'fall_out_boy_sugar.mp3':{type:'file',content:'[AUDIO FILE]\nFall Out Boy - Sugar Were Going Down\nBitrate: 128kbps\nDuration: 3:49\nSource: LimeWire'},
'MCR_welcome_black_parade.mp3':{type:'file',content:'[AUDIO FILE]\nMy Chemical Romance - Welcome to the Black Parade\nBitrate: 128kbps\nDuration: 5:11\nSource: LimeWire'},
'blink182_all_small_things.mp3':{type:'file',content:'[AUDIO FILE]\nBlink 182 - All The Small Things\nBitrate: 128kbps\nDuration: 2:51\nSource: LimeWire'},
'tf2_meet_the_spy.avi':{type:'file',content:'[VIDEO FILE]\nTF2 - Meet The Spy\nResolution: 360p\nSize: 42 MB\nDuration: 3:30\n\ni have watched this 100 times'},
'minecraft_tutorial.avi':{type:'file',content:'[VIDEO FILE]\nMinecraft Tutorial - How to Build a House\nResolution: 480p\nSize: 67 MB\nDuration: 8:14'},
'halo_3_montage.wmv':{type:'file',content:'[VIDEO FILE]\nHalo 3 MLG Montage - Let the Bodies Hit the Floor\nResolution: 360p\nSize: 38 MB\nDuration: 4:45'},
'FREE_VBUCKS_GENERATOR.exe':{type:'file',content:'[SUSPICIOUS FILE]\nlol fortnite doesnt even exist yet\nhow did this get here'},
'totally_legal_photoshop.zip':{type:'file',content:'[ARCHIVE]\nAdobe_Photoshop_CS3_FREE.zip\nSize: 234 MB\nStatus: CORRUPTED (shocker)\n\ni just wanted 2 edit my spray'},
'toolbar_installer.exe':{type:'file',content:'[MALWARE]\nAsk Toolbar + Bonzi Buddy Bundle\nSize: 1.2 MB\n\nthis came with limewire and i cant get rid of it\nmy browser has 4 toolbars now'},
'Flash_Game_Collection':{type:'dir',children:{
'N_game.swf':{type:'file',content:'[FLASH FILE] N Game - from newgrounds'},
'fancy_pants.swf':{type:'file',content:'[FLASH FILE] Fancy Pants Adventure'},
'stick_arena.swf':{type:'file',content:'[FLASH FILE] Stick Arena Ballistick'}
}}}},
'Pictures':{type:'dir',children:{
'dustbowl_screenshot1.png':{type:'img',src:`${mediaBasePath}img/dustbowl1.png`},
'dustbowl_screenshot2.png':{type:'img',src:`${mediaBasePath}img/dustbowl2.png`},
'dustbowl_screenshot3.png':{type:'img',src:`${mediaBasePath}img/dustbowl3.png`},
'funny_spray.png':{type:'img',src:`${mediaBasePath}img/spray1.png`},
'my_scout_loadout.png':{type:'img',src:`${mediaBasePath}img/scout1.png`},
'screenshot_2fort.png':{type:'img',src:`${mediaBasePath}img/2fort1.png`},
'epic_kill_cam.png':{type:'img',src:`${mediaBasePath}img/killcam1.png`},
'my_pc_setup.png':{type:'img',src:`${mediaBasePath}img/setup1.png`},
'me_and_mike_lan.png':{type:'img',src:`${mediaBasePath}img/lan1.png`},
'trollface.png':{type:'img',src:`${mediaBasePath}img/trollface.png`}
}},
'Music':{type:'dir',children:{
'epic_song.mp3':{type:'audio',src:`${mediaBasePath}audio/song1.mp3`},
'limewire_download.mp3':{type:'audio',src:`${mediaBasePath}audio/song2.mp3`},
'tf2_remix_by_n00dles.mp3':{type:'audio',src:`${mediaBasePath}audio/song3.mp3`},
'rick_astley_lol.mp3':{type:'audio',src:`${mediaBasePath}audio/song4.mp3`}
}},
'Videos':{type:'dir',children:{
'dustbowl_gameplay.mp4':{type:'video',src:`${mediaBasePath}video/gameplay1.mp4`},
'funny_kill.mp4':{type:'video',src:`${mediaBasePath}video/funnykill.mp4`},
'my_first_airshot.mp4':{type:'video',src:`${mediaBasePath}video/airshot.mp4`}
}}
}}
}},
'System':{type:'dir',children:{
'config.sys':{type:'file',content:'SOOS_VERSION=1.0.2\nINIT_PROCESS=soos-init\nHOST=TheDustBwlDuck\nLAST_BOOT=2010-09-30T19:10:00\nUPTIME=32m'},
'error.log':{type:'file',content:'[2010-09-30 19:10:05] INFO: System boot completed\n[2010-09-30 19:10:12] INFO: Network connected\n[2010-09-30 19:11:01] INFO: Audio driver loaded\n[2010-09-30 19:15:42] WARN: High CPU (Steam.exe)\n[2010-09-30 19:20:13] INFO: hl2.exe launched\n[2010-09-30 19:42:00] INFO: System idle'}
}}
}};
if(typeof pcState!=='undefined'&&pcState===2){
const docs=base['C:'].children['Users'].children['TheDustBwlDuck'].children['Documents'].children;
const newFiles={'why_am_i_here.txt':{type:'file',content:'i dont undrstnd waht happend\nthe game crashed and now evrythings diffrent\n\nwhy does my pc feel wrong\nwhy does the clock say may\nits september\n\nits SEPTEMBER'},'the_hard_drive.txt':{type:'file',content:'i bought this hard drive from sum guy on craigslist\nit was cheap like 20 bucks\nhe said it was from an old gamers pc\n\ni put my games on it\nand thats when stuff started geting weird\n\nthe demos. the files. they wernt mine.\nsomebody elses tf2 was on here.'},'i_see_him.txt':{type:'file',content:'theres a player on dustbowl\nhes not on the scorboard\nhes not on any team\nhes just STANDING THERE\n\ni asked mike and he said he doesnt see any1\nbut HES RIGHT THERE\n\nhes looking at me\nthru the screen\ni swear hes looking at me'},'dont_open_tf2.txt':{type:'file',content:'DO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2\nDO NOT OPEN TF2'},'dreams.txt':{type:'file',content:'i keep dreming abt dustbowl\nnot the game\nlike im THERE\nthe tunels the dust\nits so dry i can feel it\n\nand hes there 2\nthe figure\nhe says i belong there\nhe says i never left'},'what_is_happening.txt':{type:'file',content:'my pc restarted on its own\nnew files evrywhre\na whole new DRIVE??\nLOCALDRIVED??\n\ni didnt put that there\ni didnt make these files\n\nwhos writing these'},'to_mom.txt':{type:'file',content:'hey mom\nim sorry i didnt clean my room\nim sorry i didnt do the grocerys\nim sorry i was always late 4 dinner\nim sorry i played tf2 insted of doing hw\n\ni luv u mom\n\ni dont think i can stop whats hapening'},'to_mike.txt':{type:'file',content:'mike if ur reading this\nur my best frend dude\nrember when we playd dustbowl all nite\nand u got that sick airshot\nand i ubered that random heavy who just ate a sandvich\n\nthat was the best nite\n\ni wish things stayed like that'},'server_0000.txt':{type:'file',content:'0.0.0.0:27015\n\ni didnt add this server\nit added itself\nit joins ME\n\nwhen i connect theres no map\njust dark\njust nothng\n\nand him'},'last_entry.txt':{type:'file',content:'5/28/2010\n\nim so tired\n\ni cant do this anymore\n\ntomrow i go home'},'note001.txt':{type:'file',content:'201 201 201 201 201 201 201'},'note002.txt':{type:'file',content:'the number 201. its evrywhere. the files. the server. the password. am i going crazy'},'note003.txt':{type:'file',content:'201. thats the number. i dont kno what it means but its importnt. its the key 2 somthing.'},
'march_2009.txt':{type:'file',content:'march 2009\n\nbought the hard drive today\ncraigslist guy was weird abt it\nkept saying "dont play the demos"\nlike ok dude its just a hard drive\n\ninstalled tf2 on it. works fine.\nfound some old files but whatevr'},
'april_2009.txt':{type:'file',content:'april 2009\n\nok so i found these .dem files on the drive\ni opened 1 in tf2 and its just a normal dustbowl game\nbut theres an extra player\nhes not on either team\njust standing there\n\nprolly just a spectator bug or somthing'},
'may_2009.txt':{type:'file',content:'may 2009\n\nthe extra player is in more demos now\neach demo hes closer 2 the camera\nlike hes walking toward whoever was recording\n\ni dont like this'},
'june_2009.txt':{type:'file',content:'june 2009\n\nsaw him in MY game today\nnot a demo. MY game. LIVE.\nstanding in the tunnel on dustbowl stage 2\ni ran toward him and he vanishd\n\nmike was in the game and said he didnt see any1\n\nam i going crazy'},
'july_2009.txt':{type:'file',content:'july 2009\n\nhes on every server i join now\nnot just dustbowl. 2fort. goldrush. gravel pit.\nalways standing still\nalways watching\n\ni press tab and hes not there\nbut i can SEE him'},
'august_2009.txt':{type:'file',content:'august 2009\n\nhes in counter strike source now\nHOW IS HE IN A DIFFERENT GAME\n\nsame model. same position. just standing there.\nin cs maps. in tf2 maps. evrywhere.\n\ni tried reinstalling steam. he came back.'},
'september_2009.txt':{type:'file',content:'september 2009\n\nmy steam profile pic changed\ni didnt change it\nits just black now\n\nmy frends list says im playing "Team Fortress 2"\nbut im not. my pc is OFF and it says im playing.\n\nmike confirmed it. he sees me online when im not.'},
'october_2009.txt':{type:'file',content:'october 2009\n\n3 ppl on my frends list got a .dem file\nfrom MY account\ni didnt send it\n\nthey opened it and now THEY see him 2\n\nwhat have i done'},
'november_2009.txt':{type:'file',content:'november 2009\n\nmike sees him now\non his own pc\nin his own games\n\nit spread from me 2 him\nthru steam\nthru the game\nthru the demos\n\nthe craigslist guy deletd his account'},
'december_2009.txt':{type:'file',content:'december 2009\n\ntried to format the drive over winter break\ndeleted evrythng\nreinstalled windows\nreinstalled steam\nreinstalled tf2\n\nhe was there. first game. standing in the tunnel.\nlike he was waiting 4 me.'},
'january_2010.txt':{type:'file',content:'january 2010\n\nthe files came back\nthe demos r back on the drive\ni FORMATTED it\nthey shudnt be there\n\nand theres new files now\nfiles i didnt make\nfiles HE made'},
'february_2010.txt':{type:'file',content:'february 2010\n\nim hearing things when i play\nthru my headphones\nnot game sounds\nsomthing else\nlike breathing\nbut not mine'},
'march_2010.txt':{type:'file',content:'march 2010\n\ngot VAC banned today\nfor "unauthorized memory access"\non a server i never connected 2\n0.0.0.0:27015\n\ni never went there\nHE went there\nusing MY account'},
'april_2010.txt':{type:'file',content:'april 2010\n\nhavent been 2 school in 2 weeks\nmom is worried\nschool called\ni dont care\n\ni cant leave the pc\nif i leave he does things\nhe talks 2 ppl using my account\nhe sends files\nhe spreads'},
'may_1_2010.txt':{type:'file',content:'may 1 2010\n\nevery1 is leaving\nsparkles blocked me\nbrad stoped talking 2 me\nkevin wont respond\n\nthey think im the weird 1\nthey dont understand\n\nonly mike stays'},
'may_15_2010.txt':{type:'file',content:'may 15 2010\n\nadmin shut down the server\nthe dustbowl 24/7 server\nmy server\nour server\n\nbecuz of him\nbecuz of me\nbecuz i bought that stupid hard drive'},
'may_20_2010.txt':{type:'file',content:'may 20 2010\n\ni tried smashing the hard drive\nmom stopped me\nshe thinks im having a breakdown\nmaybe i am\n\nbut the files arnt on the drive\ntheyr somwhere else\ntheyr in the network\ntheyr in steam\ntheyr in me'},
'may_25_2010.txt':{type:'file',content:'may 25 2010\n\nmike came over today\nhe sat w me\nhe said we dont have 2 play tf2 ever again if i dont want 2\nhe said we can just hang out like b4\n\ni almost cryed\n\nhes the best frend any1 cud ask 4'},
'may_27_2010.txt':{type:'file',content:'may 27 2010\n\nmom left a plate outside my door again\ni ate some of it\n\ni kno what i need 2 do\n\nim sorry evry1'},
'goodbye.txt':{type:'file',content:'if ur reading this then u found my pc\n\npls dont open tf2\npls dont connect 2 0.0.0.0\npls dont play the demos\n\njust turn it off and destroy the hard drive\n\nif u dont he will find u 2\n\nim sorry i cudnt stop him\nbut maybe u can\n\nread the timeline (timeline.txt)\nread the server logs (server_log_may15.txt)\nread what 201 means (what_201_means.txt)\nmaybe u can figur out what i cudnt\n\n- TheDustBwlDuck'},
'for_mike.txt':{type:'file',content:'mike\n\nur the only 1 who stayed\nur the only 1 who beleved me\nur my best frend in the whole world\n\nrember the time we playd dustbowl til 4am\nand ur mom called my mom\nand they were both so mad\nbut we just kept laughing\n\nthats my fav memory\n\ntake care of urself dude\n\n- duck'},
'for_mom.txt':{type:'file',content:'mom\n\nim sorry abt evrythng\nim sorry i was always late 4 dinner\nim sorry i never cleand my room\nim sorry i skipd school\nim sorry i wasted all my time on a computer game\nim sorry u had 2 worry abt me\n\nu were the best mom\nthe hot pockets were always perfect\n\ni love u\n\n- ur son'},
'what_he_is.txt':{type:'file',content:'i think i figurd it out\n\nthe previous owner of the hard drive\nhe playd tf2 2\nhe saw the same thing i saw\nthe player who isnt a player\n\nand he cudnt stop it either\nso he sold the drive\nhopng itd go away\n\nbut it didnt go away\nit just found a new host\n\nme\n\nand now it wants 2 find more'},

'server_log_may15.txt':{type:'file',content:'DUSTBOWL 24/7 - SERVER LOG - MAY 15 2010\n(admin sent me this b4 he shut down the server)\n\n[22:41:03] Player connected: 0.0.0.0:27015 (NO STEAMID)\n[22:41:03] WARNING: Invalid source address\n[22:41:05] Player count mismatch: 25/24\n[22:41:10] PYROMANIAC_99: wtf is that\n[22:41:12] xX_SC0UT_RULEZ_Xx: theres some1 in the tunnel\n[22:41:15] hevy_sandvich_man: i see duck in killfeed but hes not here\n[22:41:18] BONKBONKBONK: bonk?\n[22:41:20] dustbowlBOSS_admin: everyone stay calm\n[22:42:01] CONNECTION FLOOD: 0.0.0.0 x47 connections\n[22:42:03] SERVER CRASH - MEMORY OVERFLOW\n[22:42:03] RESTART FAILED\n[22:42:03] RESTART FAILED\n[22:42:03] MANUAL SHUTDOWN REQUIRED\n\nthis is the log admin mentioned in his email (RE: RE: RE: server issue)\nthis is the nite pyro saw it at spawn (check his chat)\nthis is the nite sc0ut saw it in the tunnel (check his chat)\nthis is the nite bonk stoped bonking'},
'audio_analysis_201.txt':{type:'file',content:'dj_n00dles sent me this b4 he deleted the file\nhe opend the .dem in audacity (see his chat log)\n\nAUDIO ANALYSIS:\nFile: unknown_demo.dem (received from my account - I DIDNT SEND IT)\nDuration: 3:14\nMostly static/white noise\n\nBUT at exactly 2:01 theres a voice\nn00dles cudnt make it out but i amplified it\n\nit says:\n"im still here"\n"at home"\n"201"\n\nthe number again. 201. two oh one.\nits the timestamp (2:01) AND the message\nits evrywhere\nthe hex dump decodes 2 it (check hex_dump.txt)\nits the process ID (check system email)\nits in the server address if u add the port digits (2+7+0+1+5 = 15... no thats not right)\n\nwait\nthe craigslist drive was $20\nand there was 1 of him\n20. 1.\n201.'},
'hatcollector_incident.txt':{type:'file',content:'hatcollector3000 told me about this in chat AND emailed me\n(check his chat log AND the trade notification email)\n\nsomebody traded him a ghastly gibus from MY account\nbut i was offline. i didnt trade anything.\nthe hat texture was corrupted - wrong colors, flickering\nhe put it on and his game crashed\nhad to verify game cache 3 times\n\nthe entity is spreading thru TRADES now\nnot just demos\nnot just servers\nits using the mann co trading system\n\nif u get a trade from TheDustBwlDuck\nDO NOT ACCEPT IT'},
'mike_may25.txt':{type:'file',content:'may 25 2010\n\nmike came over today. in person. not online.\n(this is the same day sc0ut emailed me saying he saw me on dustbowl - check sc0uts email "dude WTF")\n(but i wasnt playing. i was in my room. the entity was pretending 2 be me.)\n\nmike sat on my bed and said\n"we dont have 2 play tf2 ever again if u dont want 2"\n"we can just hang out like b4"\n\ni almost cryed\n\nthat nite he messaged me "dont do anything stupid"\n(check mikes chat log - its the last thing he said 2 me)\n\nhes the best frend any1 cud ask 4\nhe was the only 1 who stayed (see missing_ppl.txt)\nthe only 1 who didnt leave'},
'what_201_means.txt':{type:'file',content:'ive been trying 2 figur out what 201 means\n\n- the hex dump decodes 2 "He is still here / At home / 201" (see hex_dump.txt)\n- the .dem file has a voice at the 2:01 mark (see audio_analysis_201.txt)\n- the process that wont die is PID 201 (see system email "CRITICAL: 50 files recovered")\n- home.exe is exactly 201 KB (check LOCALDRIVED)\n- the craigslist guy sold the drive for $20 to 1 person\n\nits not a number\nits a message\n\n2-0-1\nto no one\ntwo zero one\n\nor maybe\nits the address. apartment 201. where the craigslist guy lived.\nor the time. 2:01 AM. something happend at 2:01 AM.\n\ni dont kno. but its importnt. if ur reading this and u figur it out\npls help me'},
'previous_owner_note.txt':{type:'file',content:'i found this on LOCALDRIVED (the extra drive that mounted itself)\nthe previous owner of the hard drive left more then just a readme\n\ncheck D:/old_files/ - theres a readme AND more files\nwhoever had this drive b4 me went thru the SAME THING\nsame demos. same figure. same tunnel.\n\nthe craigslist listing said "DO NOT PLAY THE DEMOS" (see craigslist_screenshot.txt)\nthe readme says "do NOT connect to 0.0.0.0" (check it)\n\nhow many ppl had this drive b4 me??\nhow many times has this happend??'},
'nite_of_may24.txt':{type:'file',content:'may 24 2010 - the nite evrythng fell apart\n\nthis is the nite when:\n- pyro emailed me saying he uninstalled tf2, css, AND gmod (check pyros email "im done")\n- pyro also told me in chat that his fire particles were broken and he saw it at spawn\n- sc0ut saw me on dustbowl but i was offline (he emailed me abt it next day - "dude WTF")\n- admin was dealing with the server crashing (see server_log_may15.txt - it was getting worse)\n- hatcollector got the corrupted trade (see his chat + hatcollector_incident.txt)\n\nevrythng happend at once\nlike the entity was making a final push\nspreading 2 as many ppl as possible b4 i cud stop it\n\ni cudnt stop it'},
'all_the_servers.txt':{type:'file',content:'SERVERS HES BEEN SEEN ON:\n\n- dustbowl 24/7 (my home server - SHUT DOWN)\n- epicdustbowlguys (i was banned b4 this)\n- 2fort unlimited\n- random trade server #3\n- some guys private server (he told me on steam)\n- css dust2 server\n- gmod sandbox (pyro99 saw him)\n\nhes not staying in 1 place anymore\nhes spreading thru community servers\nany1 who connects might see him\nand any1 who sees him is next'},
'admin_ban_appeal.txt':{type:'file',content:'APPEAL TO DUSTBOWLBOSS_ADMIN:\n\nDUDE pls unban me i WASNT cheating\ni dont kno why my movment looked weird\nthe game has been glichy lately ok\n\nmy character moved on its own dude\nIM NOT LYING\nsomthing is wrong w my game\n\n...he didnt respond'},'the_demos.txt':{type:'file',content:'found these demo files on the hard drive:\n\ndemo001.dem - normal dustbowl game\ndemo002.dem - normal but... theres some1 extra\ndemo003.dem - the extra player is closer\ndemo004.dem - hes right behind the camera\ndemo005.dem - CORRUPTED\n\ni shudnt have watched them\ni shudnt have ported them to sfm\n\nhe saw me watching'},
'timeline.txt':{type:'file',content:'TIMELNE OF EVRYTHNG (so i dont forget)\n\nmarch 2009 - bought hard drive from craigslist guy ($20) (see craigslist_screenshot.txt)\napril 2009 - instaled tf2 on new drive. found old demo files.\nmay 2009 - first time i see the extra player on dustbowl (wrote about it in i_see_him.txt)\njune 2009 - admin bans me becuz my character "moved weird"\njuly 2009 - i see him on 2fort. and goldrush. and gravel pit.\naugust 2009 - hes in css now. HOW IS HE IN CSS\nseptember 2009 - my steam frends say my profle pic changed. i didnt change it.\noctober 2009 - 3 ppl on my frends list got the same weird .dem file (n00dles analyzed it - see audio_analysis_201.txt) from "me". i didnt send it.\nnovember 2009 - mike sees the player 2 now. on HIS pc. (check mikes chat log)\ndecember 2009 - the craigslist guy deleted his account\njanuary 2010 - tried to format the drive. files came back.\nfebruary 2010 - im hearing things when i play now. thru my headphones.\nmarch 2010 - VAC banned. for somthng i didnt do. (see VAC email from valve)\napril 2010 - havent been to school in 2 weeks\nmay 2010 -'},
'craigslist_screenshot.txt':{type:'file',content:'CRAIGSLIST LISTING (i copyed the text b4 it was deleted)\n\n---\nFOR SALE: 320GB SATA Hard Drive - $20\n\nUsed. Works fine. Has some old game files on it\nthat i couldnt delete but u can just format it.\n\nPICKUP ONLY - west side\n\nDO NOT EMAIL ME ABOUT THE FILES.\nDO NOT PLAY THE DEMOS.\n---\n\ni shud have listend'},
'its_spreading.txt':{type:'file',content:'ppl who have seen him:\n\n- me (dustbowl)\n- mike (dustbowl)\n- sc0ut rulez (dustbowl)\n- pyro99 (dustbowl, css, gmod - see his chat + email "im done")\n- hevy (dustbowl)\n- admin (server logs - see server_log_may15.txt + his email)\n- 3 random ppl on 2fort\n- some1 on a trade server??\n\nits spreading\nfrom server to server\nfrom game to game\nfrom pc to pc\n\nand it started w me\nit started w that hard drive'},
'im_sorry.txt':{type:'file',content:'im sorry to evry1\n\nim sorry i brought this thing into the comunity\nim sorry it spread to ur games\nim sorry pyro had to uninstall\nim sorry admin had to shut down the server\nim sorry mike has 2 deal w this\nim sorry mom\n\ni just wanted to play dustbowl\nthats all i ever wanted\njust me and my frends on dustbowl\n\nand now its ruind'},
'DO_NOT_DELETE.txt':{type:'file',content:'i tried deleting these files 14 times\nthey always come back\n\ni tried formatting the drive\nthey come back\n\ni tried smashing the drive w a hammer\nmom stopped me\n\nthe files r not on the drive\ntheyre somwhere else\ntheyre in the game\ntheyre in the network\ntheyre in me'},
'hex_dump.txt':{type:'file',content:'48 65 20 69 73 20 73 74 69 6C 6C 20 68 65 72 65\n41 74 20 68 6F 6D 65\n32 30 31\n\ni found this in the memory dump\nit decodes to: He is still here / At home / 201\n(see what_201_means.txt for more about the number)\nthe same words from the voice at 2:01 in the .dem file (see audio_analysis_201.txt)'},
'missing_ppl.txt':{type:'file',content:'frends who stoped talking 2 me:\n\nlolwut07 - last msg: "ur acting weird duck"\nBATSWINGIN55 - last msg: "dude chill"\nLOLxDDDD - just vanished\nxX_sparkles_Xx - blocked me??\nsk8rboi_2003 - "i dont wanna be involvd"\ng4m3rDUD3_07 - nvr respondid\n\nall of them in the last 2 months\n1 by 1 they left\n\nonly mike stayed'}};

for(let i=1;i<=35;i++){
const rnd=Math.floor(Math.random()*9999);
newFiles[`corrupted_${String(i).padStart(3,'0')}.dat`]={type:'file',content:`[CORRUPTED FILE]\n\n${'0'.repeat(20+Math.floor(Math.random()*40))}\n${'1'.repeat(10+Math.floor(Math.random()*30))}\n\nFILE RECOVERY FAILED\nORIGINAL: ${['essay','screenshot','chat_log','save_game','config','bookmark','download'][Math.floor(Math.random()*7)]}_${rnd}\nCORRUPTED BY: UNKNOWN PROCESS (PID 201)`};
}
Object.assign(docs,newFiles);
base['D:'||'LOCALDRIVED']={type:'dir',children:{
'demos':{type:'dir',children:{
'demo001.dem':{type:'file',content:'[DEMO FILE - Cannot preview]\nMap: cp_dustbowl\nDate: 2007-03-15\nPlayers: 24/24\nDuration: 00:32:14\nNotes: normal game. nothng unusual.'},
'demo002.dem':{type:'file',content:'[DEMO FILE - Cannot preview]\nMap: cp_dustbowl\nDate: 2007-04-02\nPlayers: 24/24... 25?\nDuration: 00:28:41\nNotes: player count flickered. prolly a bug.'},
'demo003.dem':{type:'file',content:'[DEMO FILE - Cannot preview]\nMap: cp_dustbowl\nDate: 2007-06-19\nPlayers: 25/24\nDuration: 00:15:00\nNotes: the extra player. hes in every frame now. standing still. watching.'},
'demo005.dem':{type:'file',content:'[DEMO FILE - CORRUPTED]\nMap: ???\nDate: ???\nPlayers: 1/?\nDuration: 99:99:99\n\n[FILE UNREADABLE]'}
}},
'old_files':{type:'dir',children:{
'readme.txt':{type:'file',content:'if your reading this, the hard drive found a new owner.\n\ni tried to delete evrythng but it keeps coming back.\n\ndo NOT install tf2 on this drive.\ndo NOT open the demos.\ndo NOT connect to 0.0.0.0\n\nim sorry. i cudnt stop it.\n\n- previous owner\n\nPS: if u already played the demos its 2 late. read my other files. maybe they help.'},
'my_experience.txt':{type:'file',content:'i bought this pc in 2005. played tf2 since the orange box came out.\neverything was fine til mid 2007.\n\ni joined a community dustbowl server.\nsomething was on that server.\na player with no name. no team. just standing in the tunnel.\nstage 2. always stage 2. always the tunnel.\n\nafter i saw it on that server it followed me everywhere.\ntf2. css. hl2dm. every source game.\n\ni tried everything. format. reinstall. new steam account.\nnothing worked. the files always came back.\n\nso i pulled the drive and sold it. i thought if the drive was gone it would stop.\ni was wrong. it just found someone new.\n\nim sorry.'},
'log_2007.txt':{type:'file',content:'[2007-06-14] first sighting. dustbowl tunnel. no name on scoreboard.\n[2007-06-20] saw it again. closer this time.\n[2007-07-01] its on 2fort now. how.\n[2007-07-15] css. its in css. different game same figure.\n[2007-08-03] files appearing on drive i didnt make. demo recordings.\n[2007-08-10] formatted drive. files came back in 24 hours.\n[2007-09-01] steam profile pic changed to black. wasnt me.\n[2007-09-15] friends getting .dem files from my account. i didnt send them.\n[2007-10-01] giving up. pulling the drive.\n[2007-10-03] listed on craigslist. $20. just want it gone.\n[2007-10-05] sold. good luck to whoever buys it.\n\nthe dates match up with the demo files in the demos folder.\ndemo001 is from 2007-03-15. thats BEFORE i had the drive.\nsomeone else recorded those. someone before me.\nhow many owners has this drive had?'},
'last_warning.txt':{type:'file',content:'whoever finds this:\n\nthe figure in the tunnel is not a glitch.\nit is not a hacker.\nit is not a mod.\n\nit is something that lives in source engine servers.\nit attaches to players.\nit spreads through demos, through steam, through trades.\nit connects from 0.0.0.0:27015.\n\nthe number 201 means something to it.\ni never figured out what.\n\ndestroy this drive. physically. hammer. fire. anything.\nor it will find the next person.\nand the next.\nand the next.\n\nit always finds someone.\nit always comes back.\nit always does.'},
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
{u:'mikeloveshalflife',t:'6:52 PM',m:'thats literaly failing'},
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
{u:'xX_SC0UT_RULEZ_Xx',t:'4:20 PM',m:'...actualy nvm'},
{u:'TheDustBwlDuck',t:'4:20 PM',m:'thats waht i thoght lol'}
],
'PYROMANIAC_99':[
{u:'PYROMANIAC_99',t:'8:30 PM',m:'FIRE FIRE FIRE'},
{u:'TheDustBwlDuck',t:'8:30 PM',m:'dud pls'},
{u:'PYROMANIAC_99',t:'8:31 PM',m:'I AIRBLASTED A CROCKET TODAY'},
{u:'TheDustBwlDuck',t:'8:31 PM',m:'ok thats actualy sick'},
{u:'PYROMANIAC_99',t:'8:32 PM',m:'IT KILLED THE SOLDIER WHO SHOT IT'},
{u:'TheDustBwlDuck',t:'8:32 PM',m:'LMAOOOO GET REKT'},
{u:'PYROMANIAC_99',t:'8:33 PM',m:'pyro is the best class and u cant change my mind'},
{u:'TheDustBwlDuck',t:'8:33 PM',m:'medic > evrything but ok bro'},
{u:'PYROMANIAC_99',t:'8:34 PM',m:'MMPH MMPH'},
{u:'TheDustBwlDuck',t:'8:34 PM',m:'ur literaly typing mmph right now i cant w u'}
],
'lolwut07':[
{u:'lolwut07',t:'3:22 PM',m:'hey did u do the math homework?'},
{u:'TheDustBwlDuck',t:'3:23 PM',m:'uh'},
{u:'TheDustBwlDuck',t:'3:23 PM',m:'define "do"'},
{u:'lolwut07',t:'3:24 PM',m:'omg lol. can i copy urs?'},
{u:'TheDustBwlDuck',t:'3:24 PM',m:'u cant copy somthing taht doesnt exist dud'},
{u:'lolwut07',t:'3:25 PM',m:'were both gonna fail arent we'},
{u:'TheDustBwlDuck',t:'3:25 PM',m:'problably lol'},
{u:'lolwut07',t:'3:26 PM',m:'what do u even do all day'},
{u:'TheDustBwlDuck',t:'3:26 PM',m:'i play tf2'},
{u:'lolwut07',t:'3:27 PM',m:'u play that game SO much'},
{u:'TheDustBwlDuck',t:'3:27 PM',m:'its not just a game dud its a LIFESTYLE'},
{u:'lolwut07',t:'3:28 PM',m:'ur such a nerd haha'},
{u:'TheDustBwlDuck',t:'3:28 PM',m:'a nerd who can headshot u from across dustbowl'},
{u:'lolwut07',t:'3:29 PM',m:'idk what that means but ok lol'}
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
{u:'cr1tical_h1t',t:'7:30 PM',m:'im literaly the best soldier on this server'},
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
{u:'TheDustBwlDuck',t:'5:34 PM',m:'then it wud be broken lol'},
{u:'BONKBONKBONK',t:'5:35 PM',m:'BONK'},
{u:'TheDustBwlDuck',t:'5:35 PM',m:'ok ur back 2 bonk mode i see'}
],
'dustbowlBOSS_admin':[
{u:'dustbowlBOSS_admin',t:'10:15 PM',m:'TheDustBwlDuck, we need to talk about your gameplay tonight.'},
{u:'TheDustBwlDuck',t:'10:15 PM',m:'waht?? i wasnt doing anythng wrong'},
{u:'dustbowlBOSS_admin',t:'10:16 PM',m:'Your movement was impossible. You were moving faster than any class should.'},
{u:'TheDustBwlDuck',t:'10:16 PM',m:'dude WAHT i wasnt cheating i swear'},
{u:'dustbowlBOSS_admin',t:'10:17 PM',m:'Multiple players reported you. I reviewed the demo myself.'},
{u:'TheDustBwlDuck',t:'10:17 PM',m:'dude pls i play on ur server evry nite u kno me'},
{u:'dustbowlBOSS_admin',t:'10:18 PM',m:'I know. Which is why this is strange. Your character was in places you shouldnt have been able to reach.'},
{u:'TheDustBwlDuck',t:'10:18 PM',m:'my game has been glichy lately ok somthng is wrong w it'},
{u:'dustbowlBOSS_admin',t:'10:19 PM',m:'Im sorry but I have to ban you. The evidence is clear.'},
{u:'TheDustBwlDuck',t:'10:19 PM',m:'DUDE COME ON'},
{u:'TheDustBwlDuck',t:'10:20 PM',m:'this is so unfar i wasnt doing anythng'},
{u:'TheDustBwlDuck',t:'10:22 PM',m:'dude??'},
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
{u:'TheDustBwlDuck',t:'7:05 PM',m:'heavy wud eat that in 1 bite'},
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
{u:'iiiiillllllllll',t:'8:50 PM',m:'its abt the principle'}
],
'ROCKETLAUNCHER69':[
{u:'ROCKETLAUNCHER69',t:'4:00 PM',m:'ROCKET LAUNCHER IS THE BEST WEAPON'},
{u:'TheDustBwlDuck',t:'4:00 PM',m:'how old r u'},
{u:'ROCKETLAUNCHER69',t:'4:01 PM',m:'14'},
{u:'TheDustBwlDuck',t:'4:01 PM',m:'ya that checks out lol'},
{u:'ROCKETLAUNCHER69',t:'4:02 PM',m:'HEY WHATS THAT SUPPOSED TO MEAN'},
{u:'TheDustBwlDuck',t:'4:02 PM',m:'nothng nothng lmao'}
],
'sn1p3r_n0_sc0p3':[
{u:'sn1p3r_n0_sc0p3',t:'9:30 PM',m:'DUDE I ALMOST HIT A NOSCOPE'},
{u:'TheDustBwlDuck',t:'9:30 PM',m:'almost?'},
{u:'sn1p3r_n0_sc0p3',t:'9:31 PM',m:'it went past his head by like 2 pixels'},
{u:'TheDustBwlDuck',t:'9:31 PM',m:'so u missed'},
{u:'sn1p3r_n0_sc0p3',t:'9:32 PM',m:'ALMOST DOESNT COUNT AS MISSING'},
{u:'TheDustBwlDuck',t:'9:32 PM',m:'it literaly does'}
],
'sk8rboi_2003':[
{u:'sk8rboi_2003',t:'3:00 PM',m:'dude i landed a kickflip today'},
{u:'TheDustBwlDuck',t:'3:00 PM',m:'sick bro'},
{u:'sk8rboi_2003',t:'3:01 PM',m:'then i fell on my face'},
{u:'TheDustBwlDuck',t:'3:01 PM',m:'lmaoo classic dud'},
{u:'sk8rboi_2003',t:'3:02 PM',m:'u should come skating sometime'},
{u:'TheDustBwlDuck',t:'3:02 PM',m:'i wud but dustbowl is calling me'},
{u:'sk8rboi_2003',t:'3:03 PM',m:'u and that game bro'}
],
'xX_sparkles_Xx':[
{u:'xX_sparkles_Xx',t:'2:00 PM',m:'heyyy!! ✨✨✨'},
{u:'TheDustBwlDuck',t:'2:00 PM',m:'hey sparkles'},
{u:'xX_sparkles_Xx',t:'2:01 PM',m:'did u see the new twilight trailer?? ✨'},
{u:'TheDustBwlDuck',t:'2:01 PM',m:'i dont watch twilight lol'},
{u:'xX_sparkles_Xx',t:'2:02 PM',m:'ur missing out!! ✨✨'},
{u:'TheDustBwlDuck',t:'2:02 PM',m:'il take ur word 4 it'}
],
'xXdRuMzXx':[
{u:'xXdRuMzXx',t:'5:15 PM',m:'dude come over saturday i got new drum sticks'},
{u:'TheDustBwlDuck',t:'5:15 PM',m:'r we actualy gona start the band this time'},
{u:'xXdRuMzXx',t:'5:16 PM',m:'YES BRO THIS TIME FOR REAL'},
{u:'TheDustBwlDuck',t:'5:16 PM',m:'u said that last month'},
{u:'xXdRuMzXx',t:'5:17 PM',m:'this time is diffrent i can almost play one song'},
{u:'TheDustBwlDuck',t:'5:17 PM',m:'ALMOST one song lmaooo'}
],
'g4m3rDUD3_07':[
{u:'g4m3rDUD3_07',t:'4:30 PM',m:'hey whats up'},
{u:'TheDustBwlDuck',t:'4:30 PM',m:'nm just dustbowl'},
{u:'g4m3rDUD3_07',t:'4:31 PM',m:'nice. i just got cod'},
{u:'TheDustBwlDuck',t:'4:31 PM',m:'cod is ok but tf2 is beter'},
{u:'g4m3rDUD3_07',t:'4:32 PM',m:'evrythng is better than tf2 according to you wait i mean tf2 is better than evrythng to you'},
{u:'TheDustBwlDuck',t:'4:32 PM',m:'EXACTLY'}
],
'BATSWINGIN55':[
{u:'BATSWINGIN55',t:'6:30 PM',m:'dude check this out'},
{u:'BATSWINGIN55',t:'6:30 PM',m:'[link to funny video]'},
{u:'TheDustBwlDuck',t:'6:31 PM',m:'lmaoooo'},
{u:'BATSWINGIN55',t:'6:31 PM',m:'right?? anyway practise went good today'},
{u:'TheDustBwlDuck',t:'6:32 PM',m:'nice. i had practise 2. on dustbowl. lol'},
{u:'BATSWINGIN55',t:'6:33 PM',m:'thats not the same as actual exercise bro'},
{u:'TheDustBwlDuck',t:'6:33 PM',m:'u dont kno how hard medic is. my fingers get a workout'},
{u:'BATSWINGIN55',t:'6:34 PM',m:'youre hopeless lol'},
{u:'TheDustBwlDuck',t:'6:34 PM',m:'hey u shud come watch me play sometime'},
{u:'BATSWINGIN55',t:'6:35 PM',m:'watch you play a video game'},
{u:'TheDustBwlDuck',t:'6:35 PM',m:'its like watching baseball but cooler'},
{u:'BATSWINGIN55',t:'6:36 PM',m:'nothng is cooler than baseball'},
{u:'TheDustBwlDuck',t:'6:36 PM',m:'DUSTBOWL is cooler then baseball'},
{u:'BATSWINGIN55',t:'6:37 PM',m:'we cant be friends anymore'},
{u:'TheDustBwlDuck',t:'6:37 PM',m:'lol'},
{u:'BATSWINGIN55',t:'6:38 PM',m:'jk but srsly come outside sometime its nice out'},
{u:'TheDustBwlDuck',t:'6:38 PM',m:'the sun is my enemy'}
],
'LOLxDDDD':[
{u:'LOLxDDDD',t:'7:45 PM',m:'LOL'},
{u:'TheDustBwlDuck',t:'7:45 PM',m:'what'},
{u:'LOLxDDDD',t:'7:46 PM',m:'nothng just LOL'},
{u:'TheDustBwlDuck',t:'7:46 PM',m:'ok dud'},
{u:'LOLxDDDD',t:'7:47 PM',m:'LOL did u see what happened in bio today'},
{u:'TheDustBwlDuck',t:'7:47 PM',m:'i wasnt there lol'},
{u:'LOLxDDDD',t:'7:48 PM',m:'LOL the frog jumped off the table and mrs chen screamed'},
{u:'TheDustBwlDuck',t:'7:48 PM',m:'LMAOOO i wish i was there'},
{u:'LOLxDDDD',t:'7:49 PM',m:'LOL then some kid tried to catch it and knocked over the beakers'},
{u:'TheDustBwlDuck',t:'7:49 PM',m:'of course he did'},
{u:'LOLxDDDD',t:'7:50 PM',m:'LOL ur never at school anymore bro where r u'},
{u:'TheDustBwlDuck',t:'7:50 PM',m:'home. playing tf2. the usual'},
{u:'LOLxDDDD',t:'7:51 PM',m:'LOL ur gonna get held back'},
{u:'TheDustBwlDuck',t:'7:51 PM',m:'worth it'}
],
'_______':[
{u:'_______',t:'11:00 PM',m:'hey'},
{u:'TheDustBwlDuck',t:'11:02 PM',m:'oh hey'},
{u:'_______',t:'11:05 PM',m:'cool'},
{u:'TheDustBwlDuck',t:'11:07 PM',m:'u ok dud? u dont msg me much'},
{u:'_______',t:'11:12 PM',m:'yeah im ok'},
{u:'_______',t:'11:12 PM',m:'just bored'},
{u:'TheDustBwlDuck',t:'11:13 PM',m:'u shud play tf2 w us some time'},
{u:'_______',t:'11:18 PM',m:'maybe'},
{u:'TheDustBwlDuck',t:'11:18 PM',m:'no pressure dud just saying ur always welcome'},
{u:'_______',t:'11:25 PM',m:'thnx duck'},
{u:'_______',t:'11:25 PM',m:'ur nice'},
{u:'TheDustBwlDuck',t:'11:26 PM',m:'lol thnx dud'}
],
'xX_d4rkn3ss_Xx':[
{u:'xX_d4rkn3ss_Xx',t:'10:00 PM',m:'life is meaningless'},
{u:'TheDustBwlDuck',t:'10:00 PM',m:'u ok?'},
{u:'xX_d4rkn3ss_Xx',t:'10:01 PM',m:'yeah just listening to mcr'},
{u:'TheDustBwlDuck',t:'10:01 PM',m:'oh ok lol carry on'},
{u:'xX_d4rkn3ss_Xx',t:'10:02 PM',m:'do u ever feel like nothngs real'},
{u:'TheDustBwlDuck',t:'10:02 PM',m:'only when my team loses on dustbowl'},
{u:'xX_d4rkn3ss_Xx',t:'10:03 PM',m:'ur imposible lol'}
],
'xx_FRAGZ_xx':[
{u:'xx_FRAGZ_xx',t:'8:15 PM',m:'gg that dustbowl match was insane'},
{u:'TheDustBwlDuck',t:'8:15 PM',m:'dud u were destroying evry1'},
{u:'xx_FRAGZ_xx',t:'8:16 PM',m:'thats what happens when u actualy try'},
{u:'TheDustBwlDuck',t:'8:16 PM',m:'teach me ur ways sensei'},
{u:'xx_FRAGZ_xx',t:'8:17 PM',m:'step 1 dont play medic step 2 actualy shoot peeple'},
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
{u:'I_MAIN_EVERYTHING',t:'7:01 PM',m:'and tomrow ill be a heavy main'},
{u:'TheDustBwlDuck',t:'7:01 PM',m:'u cant main evrything thats not how it works'},
{u:'I_MAIN_EVERYTHING',t:'7:02 PM',m:'watch me'}
],
'2FORT_4EVER':[
{u:'2FORT_4EVER',t:'6:15 PM',m:'come play 2fort'},
{u:'TheDustBwlDuck',t:'6:15 PM',m:'no'},
{u:'2FORT_4EVER',t:'6:16 PM',m:'pls'},
{u:'TheDustBwlDuck',t:'6:16 PM',m:'dustbowl or nothng'},
{u:'2FORT_4EVER',t:'6:17 PM',m:'dustbowl is just hallways'},
{u:'TheDustBwlDuck',t:'6:17 PM',m:'2fort is just a bridge'},
{u:'2FORT_4EVER',t:'6:18 PM',m:'...touche'}
],
'PAYLOAD_PUSHR':[
{u:'PAYLOAD_PUSHR',t:'5:45 PM',m:'have u tried payload maps'},
{u:'TheDustBwlDuck',t:'5:45 PM',m:'dustbowl IS kinda payload-ish'},
{u:'PAYLOAD_PUSHR',t:'5:46 PM',m:'its attack defend thats diffrent'},
{u:'TheDustBwlDuck',t:'5:46 PM',m:'close enuf'},
{u:'PAYLOAD_PUSHR',t:'5:47 PM',m:'its realy not but ok'}
],
'backstabMASTA':[
{u:'backstabMASTA',t:'9:45 PM',m:'FYI im going spy next round'},
{u:'TheDustBwlDuck',t:'9:45 PM',m:'dud y do u always announce it'},
{u:'backstabMASTA',t:'9:46 PM',m:'its only fair'},
{u:'TheDustBwlDuck',t:'9:46 PM',m:'thats literaly the opposite of how spy works'},
{u:'backstabMASTA',t:'9:47 PM',m:'HONOR BRO'},
{u:'TheDustBwlDuck',t:'9:47 PM',m:'u have no kills as spy dud'}
],
'cloakedNdaggerd':[
{u:'cloakedNdaggerd',t:'9:50 PM',m:'dont listen 2 backstab guy hes terrible at spy'},
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
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:01',m:'201'},
{u:'48291637',t:'00:01',m:'201'},
{u:'48291637',t:'00:01',m:'201'},
{u:'48291637',t:'00:02',m:'0.0.0.0'},
{u:'48291637',t:'00:02',m:'0.0.0.0'},
{u:'48291637',t:'00:02',m:'0.0.0.0'},
{u:'48291637',t:'00:03',m:'52 75 6E'},
{u:'48291637',t:'00:03',m:'48 6F 6D 65'},
{u:'48291637',t:'00:04',m:'48291637 48291637 48291637'},
{u:'48291637',t:'00:04',m:'48291637 48291637 48291637 48291637 48291637'},
{u:'48291637',t:'00:05',m:'201201201201201201201201'},
{u:'48291637',t:'00:05',m:'000000000000000000000000'},
{u:'48291637',t:'00:06',m:'48291637'},
{u:'48291637',t:'00:06',m:'48291637'}
]
,
'xXx_DARK_ANGEL_xXx':[
{u:'xXx_DARK_ANGEL_xXx',t:'11:30 PM',m:'the darkness within me grows'},
{u:'TheDustBwlDuck',t:'11:30 PM',m:'dud its 11 pm on a tuesday'},
{u:'xXx_DARK_ANGEL_xXx',t:'11:31 PM',m:'you wouldnt understand my pain'},
{u:'TheDustBwlDuck',t:'11:31 PM',m:'is this abt that sniper that killed u 6 times'},
{u:'xXx_DARK_ANGEL_xXx',t:'11:32 PM',m:'...maybe'}
],
'DEMOMAN_DRUNK_247':[
{u:'DEMOMAN_DRUNK_247',t:'9:00 PM',m:'KABOOOOOM'},
{u:'TheDustBwlDuck',t:'9:00 PM',m:'hello 2 u 2'},
{u:'DEMOMAN_DRUNK_247',t:'9:01 PM',m:'i just got a 4 man sticky trap on dustbowl tunnel'},
{u:'TheDustBwlDuck',t:'9:01 PM',m:'ok thats actualy sick'},
{u:'DEMOMAN_DRUNK_247',t:'9:02 PM',m:'they were all bunched up like christmas'},
{u:'TheDustBwlDuck',t:'9:02 PM',m:'demo mains r scary ngl'}
],
'pwnag3_king':[
{u:'pwnag3_king',t:'4:45 PM',m:'yo duck i just pwned the entire server'},
{u:'TheDustBwlDuck',t:'4:45 PM',m:'nobody says pwned anymore'},
{u:'pwnag3_king',t:'4:46 PM',m:'I DO'},
{u:'TheDustBwlDuck',t:'4:46 PM',m:'ok boomer'},
{u:'pwnag3_king',t:'4:47 PM',m:'IM 15'},
{u:'TheDustBwlDuck',t:'4:47 PM',m:'ok boomer'}
],
'iLiKeTuRtLeS':[
{u:'iLiKeTuRtLeS',t:'3:30 PM',m:'i like turtles'},
{u:'TheDustBwlDuck',t:'3:30 PM',m:'cool?'},
{u:'iLiKeTuRtLeS',t:'3:31 PM',m:'do u like turtles'},
{u:'TheDustBwlDuck',t:'3:31 PM',m:'i like dustbowl'},
{u:'iLiKeTuRtLeS',t:'3:32 PM',m:'turtles r better'},
{u:'TheDustBwlDuck',t:'3:32 PM',m:'agree 2 disagree'}
],
'xX_N0SC0PE_360_Xx':[
{u:'xX_N0SC0PE_360_Xx',t:'10:15 PM',m:'360 NOSCOPE BABYYY'},
{u:'TheDustBwlDuck',t:'10:15 PM',m:'this isnt cod'},
{u:'xX_N0SC0PE_360_Xx',t:'10:16 PM',m:'DOESNT MATTER I STILL HIT IT'},
{u:'TheDustBwlDuck',t:'10:16 PM',m:'u play sniper on dustbowl and u have 2 kills'},
{u:'xX_N0SC0PE_360_Xx',t:'10:17 PM',m:'QUALITY OVER QUANTITY'}
],
'TURRET_TOWN':[
{u:'TURRET_TOWN',t:'7:15 PM',m:'i have 4 sentries up right now'},
{u:'TheDustBwlDuck',t:'7:15 PM',m:'thats not possible u can only have 1'},
{u:'TURRET_TOWN',t:'7:16 PM',m:'i convinced 3 other engies to build next to me'},
{u:'TheDustBwlDuck',t:'7:16 PM',m:'thats the most evil thing ive ever heard'},
{u:'TURRET_TOWN',t:'7:17 PM',m:'the tunnel is MINE'},
{u:'TheDustBwlDuck',t:'7:17 PM',m:'ur the reason ppl quit this game'}
],
'mario64fan':[
{u:'mario64fan',t:'5:30 PM',m:'have u played mario 64'},
{u:'TheDustBwlDuck',t:'5:30 PM',m:'ya when i was like 8 y'},
{u:'mario64fan',t:'5:31 PM',m:'its better than tf2'},
{u:'TheDustBwlDuck',t:'5:31 PM',m:'get out'},
{u:'mario64fan',t:'5:32 PM',m:'lol jk but u should play it again its a classic'},
{u:'TheDustBwlDuck',t:'5:32 PM',m:'maybe when im not busy being a dustbowl legend'}
],
'shadow_the_hedgehog_fan':[
{u:'shadow_the_hedgehog_fan',t:'8:00 PM',m:'shadow the hedgehog is the coolest character ever made'},
{u:'TheDustBwlDuck',t:'8:00 PM',m:'thats a weird way 2 spell scout'},
{u:'shadow_the_hedgehog_fan',t:'8:01 PM',m:'scout wishes he was as cool as shadow'},
{u:'TheDustBwlDuck',t:'8:01 PM',m:'scout has a bat. shadow has... angst'},
{u:'shadow_the_hedgehog_fan',t:'8:02 PM',m:'AND A GUN'},
{u:'TheDustBwlDuck',t:'8:02 PM',m:'ok fair point'}
],
'headshot_harry':[
{u:'headshot_harry',t:'6:45 PM',m:'just headshot u from across the map lol'},
{u:'TheDustBwlDuck',t:'6:45 PM',m:'I SAW THAT i was in the MIDDLE of an uber'},
{u:'headshot_harry',t:'6:46 PM',m:'shouldnt have peeked'},
{u:'TheDustBwlDuck',t:'6:46 PM',m:'i was HEALING some1'},
{u:'headshot_harry',t:'6:47 PM',m:'heal better lol'},
{u:'TheDustBwlDuck',t:'6:47 PM',m:'i hate snipers so much'}
],
'L33T_H4X0R':[
{u:'L33T_H4X0R',t:'10:30 PM',m:'d00d 1 c4n h4ck ur pc'},
{u:'TheDustBwlDuck',t:'10:30 PM',m:'no u cant'},
{u:'L33T_H4X0R',t:'10:31 PM',m:'y35 1 c4n 1m 4 h4ck3r'},
{u:'TheDustBwlDuck',t:'10:31 PM',m:'ur name is in leet speak and u use yahoo mail'},
{u:'L33T_H4X0R',t:'10:32 PM',m:'wh4ts wr0ng w1th y4h00'},
{u:'TheDustBwlDuck',t:'10:32 PM',m:'evrything'}
],
'gg_no_re':[
{u:'gg_no_re',t:'9:15 PM',m:'gg'},
{u:'TheDustBwlDuck',t:'9:15 PM',m:'the game just started'},
{u:'gg_no_re',t:'9:16 PM',m:'gg no re'},
{u:'TheDustBwlDuck',t:'9:16 PM',m:'WE HAVENT EVEN CAPTURED FIRST POINT YET'},
{u:'gg_no_re',t:'9:17 PM',m:'doesnt matter gg'},
{u:'TheDustBwlDuck',t:'9:17 PM',m:'i cant w u'}
],
'SniperWolf420':[
{u:'SniperWolf420',t:'8:20 PM',m:'dude i just got backstabbed 4 times in a row'},
{u:'TheDustBwlDuck',t:'8:20 PM',m:'turn around sometimes maybe'},
{u:'SniperWolf420',t:'8:21 PM',m:'IM SCOPED IN I CANT SEE BEHIND ME'},
{u:'TheDustBwlDuck',t:'8:21 PM',m:'thats... thats the problem'},
{u:'SniperWolf420',t:'8:22 PM',m:'spy is such a broken class'},
{u:'TheDustBwlDuck',t:'8:22 PM',m:'spy is fine ur just not checking ur back'}
],
'randomcrits_are_fair':[
{u:'randomcrits_are_fair',t:'7:30 PM',m:'RANDOM CRITS ARE A FAIR AND BALANCED GAME MECHANIC'},
{u:'TheDustBwlDuck',t:'7:30 PM',m:'u just killed me w a random crit didnt u'},
{u:'randomcrits_are_fair',t:'7:31 PM',m:'...yes'},
{u:'TheDustBwlDuck',t:'7:31 PM',m:'thoght so'}
],
'teh_pwnerer':[
{u:'teh_pwnerer',t:'5:50 PM',m:'BOOM HEADSHOT'},
{u:'TheDustBwlDuck',t:'5:50 PM',m:'did u just quote pure pwnage'},
{u:'teh_pwnerer',t:'5:51 PM',m:'maybe'},
{u:'TheDustBwlDuck',t:'5:51 PM',m:'respect honestly'}
],
'LagSwitch9000':[
{u:'LagSwitch9000',t:'9:45 PM',m:'sorry for the lag guys'},
{u:'TheDustBwlDuck',t:'9:45 PM',m:'dud u teleported across the map and killed 3 ppl'},
{u:'LagSwitch9000',t:'9:46 PM',m:'bad internet'},
{u:'TheDustBwlDuck',t:'9:46 PM',m:'ur ping went from 20 to 999 and back in 2 seconds'},
{u:'LagSwitch9000',t:'9:47 PM',m:'comcast am i right haha'},
{u:'TheDustBwlDuck',t:'9:47 PM',m:'dud.'}
],
'killstreak_katie':[
{u:'killstreak_katie',t:'6:30 PM',m:'im on a 20 killstreak rn'},
{u:'TheDustBwlDuck',t:'6:30 PM',m:'what class'},
{u:'killstreak_katie',t:'6:31 PM',m:'pyro'},
{u:'TheDustBwlDuck',t:'6:31 PM',m:'of course its pyro'},
{u:'killstreak_katie',t:'6:32 PM',m:'W+M1 BABY'},
{u:'TheDustBwlDuck',t:'6:32 PM',m:'u scare me honestly'}
],
'NotABot_TrustMe':[
{u:'NotABot_TrustMe',t:'4:00 PM',m:'hello fellow human player'},
{u:'TheDustBwlDuck',t:'4:00 PM',m:'ur name is literaly notabot'},
{u:'NotABot_TrustMe',t:'4:01 PM',m:'i am a regular human who enjoys team fortress 2'},
{u:'TheDustBwlDuck',t:'4:01 PM',m:'do u blink'},
{u:'NotABot_TrustMe',t:'4:02 PM',m:'of course i blink i blink exactly 15 times per minute'},
{u:'TheDustBwlDuck',t:'4:02 PM',m:'yeah thats not suspicious at all'}
],
'mySp4ceTom':[
{u:'mySp4ceTom',t:'3:00 PM',m:'dude add me on myspace'},
{u:'TheDustBwlDuck',t:'3:00 PM',m:'nobody uses myspace anymore'},
{u:'mySp4ceTom',t:'3:01 PM',m:'I DO'},
{u:'TheDustBwlDuck',t:'3:01 PM',m:'tom is that u'},
{u:'mySp4ceTom',t:'3:02 PM',m:'no comment'}
],
'trollface_inc':[
{u:'trollface_inc',t:'7:00 PM',m:'problem?'},
{u:'TheDustBwlDuck',t:'7:00 PM',m:'oh no'},
{u:'trollface_inc',t:'7:01 PM',m:'u mad bro?'},
{u:'TheDustBwlDuck',t:'7:01 PM',m:'did u srsly just umad me in 2010'},
{u:'trollface_inc',t:'7:02 PM',m:'TROLOLOLOLOL'},
{u:'TheDustBwlDuck',t:'7:02 PM',m:'im blocking u'},
{u:'trollface_inc',t:'7:03 PM',m:'u cant block the troll'},
{u:'TheDustBwlDuck',t:'7:03 PM',m:'watch me'}
],
'iCanHazCheeseburger':[
{u:'iCanHazCheeseburger',t:'2:30 PM',m:'i can haz dustbowl?'},
{u:'TheDustBwlDuck',t:'2:30 PM',m:'u can haz dustbowl'},
{u:'iCanHazCheeseburger',t:'2:31 PM',m:'invisible sandwich'},
{u:'TheDustBwlDuck',t:'2:31 PM',m:'lolcats r still funny in 2010 right'},
{u:'iCanHazCheeseburger',t:'2:32 PM',m:'ALWAYS'}
],
'CPT_CAPSLOCK':[
{u:'CPT_CAPSLOCK',t:'8:00 PM',m:'WHY IS EVERYONE SO QUIET'},
{u:'TheDustBwlDuck',t:'8:00 PM',m:'bc ur yelling'},
{u:'CPT_CAPSLOCK',t:'8:01 PM',m:'IM NOT YELLING THIS IS MY NORMAL VOICE'},
{u:'TheDustBwlDuck',t:'8:01 PM',m:'turn off caps lock'},
{u:'CPT_CAPSLOCK',t:'8:02 PM',m:'NO'},
{u:'TheDustBwlDuck',t:'8:02 PM',m:'ok then'}
],
'freerunner_mike2':[
{u:'freerunner_mike2',t:'5:00 PM',m:'yo duck u ever play mirrors edge'},
{u:'TheDustBwlDuck',t:'5:00 PM',m:'nah is it good'},
{u:'freerunner_mike2',t:'5:01 PM',m:'its like scout but in real life'},
{u:'TheDustBwlDuck',t:'5:01 PM',m:'ok now im intrested'},
{u:'freerunner_mike2',t:'5:02 PM',m:'ill lend u the disc'},
{u:'TheDustBwlDuck',t:'5:02 PM',m:'bet'}
],
'AOL_D1ALUP':[
{u:'AOL_D1ALUP',t:'4:30 PM',m:'you got mail'},
{u:'TheDustBwlDuck',t:'4:30 PM',m:'bro its 2010'},
{u:'AOL_D1ALUP',t:'4:31 PM',m:'aol is still good'},
{u:'TheDustBwlDuck',t:'4:31 PM',m:'no it isnt'},
{u:'AOL_D1ALUP',t:'4:32 PM',m:'the chatrooms are still active'},
{u:'TheDustBwlDuck',t:'4:32 PM',m:'thats not the flex u think it is bro'}
],
'UBERNERD_9000':[
{u:'UBERNERD_9000',t:'6:00 PM',m:'hey duck did u know the ubercharge takes exactly 40 seconds to build'},
{u:'TheDustBwlDuck',t:'6:00 PM',m:'yes i kno im a medic main'},
{u:'UBERNERD_9000',t:'6:01 PM',m:'and the ubersaw gives 25% charge per hit'},
{u:'TheDustBwlDuck',t:'6:01 PM',m:'I KNO'},
{u:'UBERNERD_9000',t:'6:02 PM',m:'so technically 4 hits = full uber'},
{u:'TheDustBwlDuck',t:'6:02 PM',m:'I AM AWARE THANK U'},
{u:'UBERNERD_9000',t:'6:03 PM',m:'just making sure :)'},
{u:'TheDustBwlDuck',t:'6:03 PM',m:'i luv u but pls stop'}
],
'YOUR_MOM_420':[
{u:'YOUR_MOM_420',t:'10:00 PM',m:'ur mom'},
{u:'TheDustBwlDuck',t:'10:00 PM',m:'good one'},
{u:'YOUR_MOM_420',t:'10:01 PM',m:'ur mom plays tf2'},
{u:'TheDustBwlDuck',t:'10:01 PM',m:'she actualy doesnt she plays solitare'},
{u:'YOUR_MOM_420',t:'10:02 PM',m:'ur mom plays solitaire lol'},
{u:'TheDustBwlDuck',t:'10:02 PM',m:'ya she does whats ur point'}
],
'dustbowl_newbie':[
{u:'dustbowl_newbie',t:'3:45 PM',m:'hey how do i play this map'},
{u:'TheDustBwlDuck',t:'3:45 PM',m:'omg ur first time on dustbowl??'},
{u:'dustbowl_newbie',t:'3:46 PM',m:'yeah i usually play 2fort'},
{u:'TheDustBwlDuck',t:'3:46 PM',m:'ok so dustbowl is WAY beter. theres 3 stages and u gota capture points'},
{u:'dustbowl_newbie',t:'3:47 PM',m:'which class should i play'},
{u:'TheDustBwlDuck',t:'3:47 PM',m:'MEDIC. always medic. pocket me and we win'},
{u:'dustbowl_newbie',t:'3:48 PM',m:'ok ill try'},
{u:'TheDustBwlDuck',t:'3:48 PM',m:'welcom 2 the best map in tf2 my frend'}
],
'AFK_247':[
{u:'AFK_247',t:'7:30 PM',m:'hey'},
{u:'TheDustBwlDuck',t:'7:35 PM',m:'hey dud'},
{u:'TheDustBwlDuck',t:'7:45 PM',m:'dud?'},
{u:'TheDustBwlDuck',t:'8:00 PM',m:'hes afk again isnt he'},
{u:'AFK_247',t:'8:30 PM',m:'sorry was afk'},
{u:'TheDustBwlDuck',t:'8:30 PM',m:'ya i noticsd'},
{u:'AFK_247',t:'8:31 PM',m:'brb'},
{u:'TheDustBwlDuck',t:'8:31 PM',m:'HELLO??'}
],
'leeroy_jenkins_IRL':[
{u:'leeroy_jenkins_IRL',t:'9:00 PM',m:'LEEEEEROYYY'},
{u:'TheDustBwlDuck',t:'9:00 PM',m:'oh no'},
{u:'leeroy_jenkins_IRL',t:'9:01 PM',m:'JENKINNNSSS'},
{u:'TheDustBwlDuck',t:'9:01 PM',m:'he just ran into 4 sentries'},
{u:'leeroy_jenkins_IRL',t:'9:02 PM',m:'at least i got chicken'},
{u:'TheDustBwlDuck',t:'9:02 PM',m:'u got 0 kills and died 8 times'},
{u:'leeroy_jenkins_IRL',t:'9:03 PM',m:'LEEROYYYY'},
{u:'TheDustBwlDuck',t:'9:03 PM',m:'hes doing it again'}
],
'mp3_pirate_2010':[
{u:'mp3_pirate_2010',t:'4:15 PM',m:'dude i just downladed like 200 songs on limewire'},
{u:'TheDustBwlDuck',t:'4:15 PM',m:'nice which ones'},
{u:'mp3_pirate_2010',t:'4:16 PM',m:'all of linkin park and green day'},
{u:'TheDustBwlDuck',t:'4:16 PM',m:'solid choices'},
{u:'mp3_pirate_2010',t:'4:17 PM',m:'half of them are actualy bill clinton speeches'},
{u:'TheDustBwlDuck',t:'4:17 PM',m:'lmaooo classic limewire'},
{u:'mp3_pirate_2010',t:'4:18 PM',m:'one of them was a virus'},
{u:'TheDustBwlDuck',t:'4:18 PM',m:'also classic limewire'}
],
'respawn_pls':[
{u:'respawn_pls',t:'5:15 PM',m:'ugh i just died again'},
{u:'TheDustBwlDuck',t:'5:15 PM',m:'what class'},
{u:'respawn_pls',t:'5:16 PM',m:'spy. i keep getting set on fire'},
{u:'TheDustBwlDuck',t:'5:16 PM',m:'ya pyros will do that'},
{u:'respawn_pls',t:'5:17 PM',m:'HOW DO I AVOID THEM'},
{u:'TheDustBwlDuck',t:'5:17 PM',m:'u dont. u just die and respawn. its in ur name'}
],
'epicfailguy2010':[
{u:'epicfailguy2010',t:'8:45 PM',m:'EPIC FAIL'},
{u:'TheDustBwlDuck',t:'8:45 PM',m:'what now'},
{u:'epicfailguy2010',t:'8:46 PM',m:'i rocket jumped into the ceiling and died'},
{u:'TheDustBwlDuck',t:'8:46 PM',m:'thats not epic thats just fail'},
{u:'epicfailguy2010',t:'8:47 PM',m:'EPIC. FAIL.'},
{u:'TheDustBwlDuck',t:'8:47 PM',m:'ok watever'}
],
'craftking2000':[
{u:'craftking2000',t:'3:15 PM',m:'yo duck u got any spare weapons'},
{u:'TheDustBwlDuck',t:'3:15 PM',m:'ya i got like 20 weapon drops'},
{u:'craftking2000',t:'3:16 PM',m:'can i have them'},
{u:'TheDustBwlDuck',t:'3:16 PM',m:'watcha gona give me'},
{u:'craftking2000',t:'3:17 PM',m:'friendship'},
{u:'TheDustBwlDuck',t:'3:17 PM',m:'deal'}
],
'NOOB_TUBE_lol':[
{u:'NOOB_TUBE_lol',t:'7:45 PM',m:'i think i installed tf2 wrong'},
{u:'TheDustBwlDuck',t:'7:45 PM',m:'waht happened'},
{u:'NOOB_TUBE_lol',t:'7:46 PM',m:'where is the noob tube'},
{u:'TheDustBwlDuck',t:'7:46 PM',m:'this isnt call of duty lol'},
{u:'NOOB_TUBE_lol',t:'7:47 PM',m:'then what do i shoot peeple with'},
{u:'TheDustBwlDuck',t:'7:47 PM',m:'pick a class. any class. they all shoot things'},
{u:'NOOB_TUBE_lol',t:'7:48 PM',m:'which one has the noob tube'},
{u:'TheDustBwlDuck',t:'7:48 PM',m:'i give up'}
],
'xFaZe_QuIcKsC0pEx':[
{u:'xFaZe_QuIcKsC0pEx',t:'10:45 PM',m:'IM GONNA JOIN FAZE CLAN'},
{u:'TheDustBwlDuck',t:'10:45 PM',m:'this is tf2 not cod'},
{u:'xFaZe_QuIcKsC0pEx',t:'10:46 PM',m:'DOESNT MATTER IM FAZE MATERIAL'},
{u:'TheDustBwlDuck',t:'10:46 PM',m:'u play pyro and u w+m1'},
{u:'xFaZe_QuIcKsC0pEx',t:'10:47 PM',m:'FAZE PYRO'},
{u:'TheDustBwlDuck',t:'10:47 PM',m:'thats not a thing'}
],
'WEEDM4STER':[
{u:'WEEDM4STER',t:'11:00 PM',m:'420 blaze it'},
{u:'TheDustBwlDuck',t:'11:00 PM',m:'its 11 pm go 2 sleep'},
{u:'WEEDM4STER',t:'11:01 PM',m:'sleep is for the weak'},
{u:'TheDustBwlDuck',t:'11:01 PM',m:'how old r u'},
{u:'WEEDM4STER',t:'11:02 PM',m:'old enuf'},
{u:'TheDustBwlDuck',t:'11:02 PM',m:'so weird'},
{u:'WEEDM4STER',t:'11:03 PM',m:'...shut up'}
],
'im_12_and_what_is_this':[
{u:'im_12_and_what_is_this',t:'4:00 PM',m:'how do i build stuff'},
{u:'TheDustBwlDuck',t:'4:00 PM',m:'pick engineer and press 4'},
{u:'im_12_and_what_is_this',t:'4:01 PM',m:'whats an engineer'},
{u:'TheDustBwlDuck',t:'4:01 PM',m:'the guy w the hard hat'},
{u:'im_12_and_what_is_this',t:'4:02 PM',m:'i dont see him'},
{u:'TheDustBwlDuck',t:'4:02 PM',m:'press comma to open class select'},
{u:'im_12_and_what_is_this',t:'4:03 PM',m:'whats a comma'},
{u:'TheDustBwlDuck',t:'4:03 PM',m:'how r u alive'}
],
'MUDKIPZ_4EVER':[
{u:'MUDKIPZ_4EVER',t:'6:15 PM',m:'so i herd u liek mudkipz'},
{u:'TheDustBwlDuck',t:'6:15 PM',m:'that meme is like 3 years old'},
{u:'MUDKIPZ_4EVER',t:'6:16 PM',m:'MEMES DONT DIE'},
{u:'TheDustBwlDuck',t:'6:16 PM',m:'they definately do'},
{u:'MUDKIPZ_4EVER',t:'6:17 PM',m:'do u like mudkips tho'},
{u:'TheDustBwlDuck',t:'6:17 PM',m:'i like dustbowl'}
],
'thelegend27':[
{u:'thelegend27',t:'9:30 PM',m:'they call me thelegend27'},
{u:'TheDustBwlDuck',t:'9:30 PM',m:'nobody calls u that'},
{u:'thelegend27',t:'9:31 PM',m:'i call me that'},
{u:'TheDustBwlDuck',t:'9:31 PM',m:'thats just u naming urself'},
{u:'thelegend27',t:'9:32 PM',m:'legends name themselves'},
{u:'TheDustBwlDuck',t:'9:32 PM',m:'u went 3 and 15 last game'},
{u:'thelegend27',t:'9:33 PM',m:'legendary 3 kills'}
],
'NUKE_EM_ALL':[
{u:'NUKE_EM_ALL',t:'8:30 PM',m:'CRITICAL HIT CRITICAL HIT CRITICAL HIT'},
{u:'TheDustBwlDuck',t:'8:30 PM',m:'stop yelling'},
{u:'NUKE_EM_ALL',t:'8:31 PM',m:'I GOT 3 CROCKETS IN A ROW'},
{u:'TheDustBwlDuck',t:'8:31 PM',m:'thats actualy insane luck'},
{u:'NUKE_EM_ALL',t:'8:32 PM',m:'ITS NOT LUCK ITS SKILL'},
{u:'TheDustBwlDuck',t:'8:32 PM',m:'crits r literaly random'}
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
{u:'TheDustBwlDuck',t:'12:02 AM',m:'he always comes back'},
{u:'mikeloveshalflife',t:'12:03 AM',m:'i sent u an email too. pls read it.'},
{u:'mikeloveshalflife',t:'12:04 AM',m:'ur mom called my mom. she says u wont come out of ur room'},
{u:'mikeloveshalflife',t:'12:05 AM',m:'ok im coming over tomorrow'},
{u:'mikeloveshalflife',t:'12:05 AM',m:'dont do anything stupid'},
{u:'TheDustBwlDuck',t:'12:06 AM',m:'its 2 late mike'},
{u:'TheDustBwlDuck',t:'12:06 AM',m:'im going home'}
];
delete corrupted['lolwut07'];
delete corrupted['BATSWINGIN55'];
delete corrupted['LOLxDDDD'];
delete corrupted['xX_sparkles_Xx'];
delete corrupted['sk8rboi_2003'];
delete corrupted['g4m3rDUD3_07'];
corrupted['xX_SC0UT_RULEZ_Xx']=[
{u:'xX_SC0UT_RULEZ_Xx',t:'2:00 AM',m:'yo duck somthing weird happened on dustbowl'},
{u:'xX_SC0UT_RULEZ_Xx',t:'2:01 AM',m:'i saw some1 standing in the tunnel and they werent on the scoreboard'},
{u:'xX_SC0UT_RULEZ_Xx',t:'2:01 AM',m:'is this some kind of prank'},
{u:'xX_SC0UT_RULEZ_Xx',t:'2:15 AM',m:'duck??'},
{u:'xX_SC0UT_RULEZ_Xx',t:'2:30 AM',m:'ok im kinda freaked out ngl'},
{u:'xX_SC0UT_RULEZ_Xx',t:'3:10 AM',m:'dude i just checked ur steam profile'},
{u:'xX_SC0UT_RULEZ_Xx',t:'3:10 AM',m:'it says ur playing tf2 right now'},
{u:'xX_SC0UT_RULEZ_Xx',t:'3:11 AM',m:'but ur not on any server i can find'},
{u:'xX_SC0UT_RULEZ_Xx',t:'3:30 AM',m:'im logging off. this is too weird.'}
];
corrupted['PYROMANIAC_99']=[
{u:'PYROMANIAC_99',t:'1:00 AM',m:'duck something is wrong with the server'},
{u:'PYROMANIAC_99',t:'1:01 AM',m:'the fire isnt working right'},
{u:'PYROMANIAC_99',t:'1:01 AM',m:'like literally the particles are wrong'},
{u:'PYROMANIAC_99',t:'1:02 AM',m:'and theres this guy just standing at spawn'},
{u:'PYROMANIAC_99',t:'1:03 AM',m:'i pressed tab and hes not on the scoreboard at all'},
{u:'PYROMANIAC_99',t:'1:03 AM',m:'i tried to airblast him and my game froze for 10 seconds'},
{u:'PYROMANIAC_99',t:'1:15 AM',m:'duck r u there'},
{u:'PYROMANIAC_99',t:'1:20 AM',m:'im emailing u about this too incase u dont see chat'},
{u:'PYROMANIAC_99',t:'1:25 AM',m:'the thing followed me from tf2 to css to gmod. 3 different games.'},
{u:'PYROMANIAC_99',t:'1:30 AM',m:'ok im uninstalling everything. check ur email.'}
];
corrupted['dustbowlBOSS_admin']=[
{u:'dustbowlBOSS_admin',t:'3:00 AM',m:'TheDustBwlDuck I need to talk to you.'},
{u:'dustbowlBOSS_admin',t:'3:01 AM',m:'Something happened to the server after I banned you.'},
{u:'dustbowlBOSS_admin',t:'3:01 AM',m:'Players are reporting a 25th player that isnt on the scoreboard.'},
{u:'dustbowlBOSS_admin',t:'3:02 AM',m:'The server logs show connections from 0.0.0.0.'},
{u:'dustbowlBOSS_admin',t:'3:02 AM',m:'That shouldnt be possible.'},
{u:'dustbowlBOSS_admin',t:'3:05 AM',m:'I had to shut the server down.'},
{u:'dustbowlBOSS_admin',t:'3:06 AM',m:'What did you do?'},
{u:'dustbowlBOSS_admin',t:'3:30 AM',m:'Duck answer me.'},
{u:'dustbowlBOSS_admin',t:'4:00 AM',m:'Im wiping the server. Starting fresh.'},
{u:'dustbowlBOSS_admin',t:'4:01 AM',m:'Whatever this is, its spreading to other servers too.'},
{u:'dustbowlBOSS_admin',t:'4:05 AM',m:'Im attaching the server log from may 15. Look at the connection flood.'},
{u:'dustbowlBOSS_admin',t:'4:06 AM',m:'47 simultaneous connections from 0.0.0.0. All in 2 seconds.'},
{u:'dustbowlBOSS_admin',t:'4:10 AM',m:'Check ur email. I wrote everything down.'}
];
corrupted['M3DIC_OR_RIOT']=[
{u:'M3DIC_OR_RIOT',t:'11:00 PM',m:'DUCK'},
{u:'M3DIC_OR_RIOT',t:'11:00 PM',m:'WHY IS UR STEAM STATUS "IN GAME" BUT UR NOT IN ANY SERVER'},
{u:'M3DIC_OR_RIOT',t:'11:01 PM',m:'IVE BEEN TRYING TO JOIN U FOR 20 MINUTES'},
{u:'M3DIC_OR_RIOT',t:'11:05 PM',m:'it says ur playing on 0.0.0.0:27015'},
{u:'M3DIC_OR_RIOT',t:'11:05 PM',m:'THATS NOT A REAL SERVER'},
{u:'M3DIC_OR_RIOT',t:'11:06 PM',m:'what is going on with u lately'}
];
corrupted['hevy_sandvich_man']=[
{u:'hevy_sandvich_man',t:'9:00 PM',m:'duck'},
{u:'hevy_sandvich_man',t:'9:00 PM',m:'i dont want to alarm you'},
{u:'hevy_sandvich_man',t:'9:01 PM',m:'but when i was playing dustbowl just now'},
{u:'hevy_sandvich_man',t:'9:01 PM',m:'i saw your name in the killfeed'},
{u:'hevy_sandvich_man',t:'9:02 PM',m:'but you werent on the server'},
{u:'hevy_sandvich_man',t:'9:02 PM',m:'and the kill was... wrong. the weapon said "world"'},
{u:'hevy_sandvich_man',t:'9:05 PM',m:'duck?'}
];
corrupted['BONKBONKBONK']=[
{u:'BONKBONKBONK',t:'10:00 PM',m:'bonk?'},
{u:'BONKBONKBONK',t:'10:15 PM',m:'...'},
{u:'BONKBONKBONK',t:'10:30 PM',m:'something is wrong'},
{u:'BONKBONKBONK',t:'10:30 PM',m:'the server feels different'},
{u:'BONKBONKBONK',t:'10:31 PM',m:'im not bonking anymore. im scared.'}
];
corrupted['dj_n00dles']=[
{u:'dj_n00dles',t:'1:45 AM',m:'yo duck did u send me a file??'},
{u:'dj_n00dles',t:'1:45 AM',m:'i got a .dem file from ur steam account'},
{u:'dj_n00dles',t:'1:46 AM',m:'i opened it in audacity and its just static'},
{u:'dj_n00dles',t:'1:46 AM',m:'except at 2:01 theres a voice'},
{u:'dj_n00dles',t:'1:47 AM',m:'it says something but i cant make it out'},
{u:'dj_n00dles',t:'1:50 AM',m:'duck im deleting it. this is creepy.'},
{u:'dj_n00dles',t:'1:51 AM',m:'wait'},
{u:'dj_n00dles',t:'1:51 AM',m:'how did u send it if ur steam says offline since may'},
{u:'dj_n00dles',t:'1:55 AM',m:'i wrote down what i found. the voice at 2:01. check ur files if u get this.'},
{u:'dj_n00dles',t:'1:56 AM',m:'it said something about home. and 201. the number is evrywhere duck.'}
];
corrupted['hatcollector3000']=[
{u:'hatcollector3000',t:'5:00 PM',m:'duck someone traded me a hat from your account'},
{u:'hatcollector3000',t:'5:00 PM',m:'but you havent been online'},
{u:'hatcollector3000',t:'5:01 PM',m:'it was a ghastly gibus but the icon looked... wrong'},
{u:'hatcollector3000',t:'5:01 PM',m:'like the texture was corrupted or something'},
{u:'hatcollector3000',t:'5:02 PM',m:'i put it on and my game crashed'},
{u:'hatcollector3000',t:'5:02 PM',m:'had to verify game cache 3 times to fix it'},
{u:'hatcollector3000',t:'5:03 PM',m:'im not accepting trades anymore.'},
{u:'hatcollector3000',t:'5:10 PM',m:'im reporting this to steam support. emailing u too just in case.'}
];
corrupted['48291637']=[
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'},
{u:'48291637',t:'00:00',m:'48291637'}
];
corrupted['??????????']=[
{u:'??????????',t:'00:06',m:'you turned it on.'},
{u:'??????????',t:'00:06',m:'i knew you would.'},
{u:'??????????',t:'00:06',m:'you always do.'},

{u:'??????????',t:'00:06',m:'im still here.'},
{u:'??????????',t:'00:06',m:'at home.'},
{u:'??????????',t:'00:06',m:''},
{u:'??????????',t:'00:06',m:''},
{u:'??????????',t:'00:06',m:''},
{u:'??????????',t:'00:06',m:'are you?'}
];
return corrupted;
}
return normal;
};
const getEmails=()=>{
const normal=[
{id:1,from:'mom',subject:'dinner 2nite',date:'Sep 30, 2010',unread:true,body:'Hey sweetie,\n\nDinner is at 7. Please come down on time\nthis time and not 20 minutes late becuz\nyoure playing your game.\n\nAlso pls clean your room this weekend.\nI mean it this time.\n\nLove,\nMom'},
{id:2,from:'mikeloveshalflife@yahoo.com',subject:'RE: dustbowl 2nite?',date:'Sep 30, 2010',unread:true,body:'Yeah im down for 2nite. Ill be on around 8.\n\nAlso did you finish the essay yet? Im not\ngonna lie I totally copied some of mine from\nwikipedia lol. Dont tell henderson.\n\nSee you on dustbowl\n- mike'},
{id:3,from:'admin@dustbowl247.com',subject:'Welcome to Dustbowl 24/7!',date:'Mar 15, 2008',unread:false,body:'Hey TheDustBwlDuck,\n\nWelcome to the Dustbowl 24/7 community server!\nYou have been added to our regulars list.\n\n- Server Admin Team'},
{id:4,from:'steampowered@steampowered.com',subject:'Your receipt for The Orange Box',date:'Oct 10, 2007',unread:false,body:'Thank you for your purchase!\n\nThe Orange Box\nPrice: $49.99\n\nThis game has been added to your Steam library.'},
{id:5,from:'newsletter@valvesoftware.com',subject:'TF2 Mann-Conomy Update!',date:'Sep 30, 2010',unread:true,body:'The Mann-Conomy Update is here!\n\nNew features:\n- Trading system\n- Mann Co. Store\n- New community items\n- Polycount Pack weapons\n\nSee full details at teamfortress.com'},
{id:6,from:'lolwut07@gmail.com',subject:'math hw??',date:'Sep 29, 2010',unread:true,body:'hey did u do the math homework\nif u did can i see it lol\n\n- dud'},
{id:7,from:'no-reply@facebook.com',subject:'xXdRuMzXx tagged you in a post',date:'Sep 28, 2010',unread:false,body:'Drumz guy tagged you in a post:\n"band practise this weekend!! me and @TheDustBwlDuck gonna be LEGENDS"\n\nView on Facebook'},
{id:8,from:'deals@bestbuy.com',subject:'HUGE SAVINGS on Electronics!',date:'Sep 27, 2010',unread:false,body:'BEST BUY WEEKLY DEALS\n\nXbox 360 - $199.99\nPS3 Slim - $299.99\nNew laptops starting at $399\n\nVisit your local Best Buy today!'},
{id:9,from:'info@gamestop.com',subject:'Pre-order Call of Duty: Black Ops',date:'Sep 26, 2010',unread:false,body:'Call of Duty: Black Ops\nReleases November 9, 2010\n\nPre-order now and get exclusive bonuses!\n\n$59.99'},
{id:10,from:'dustbowlBOSS_admin@gmail.com',subject:'RE: ban appeal',date:'Sep 25, 2010',unread:true,body:'TheDustBwlDuck,\n\nI reviewed the demo footage again.\nYour movement was not normal. I dont know\nhow to explain what I saw but characters\ndont move like that.\n\nThe ban stands. Im sorry.\n\n- Admin'},
{id:11,from:'no-reply@myspace.com',subject:'You have 3 new friend requests!',date:'Sep 24, 2010',unread:false,body:'You have new friend requests on MySpace!\n\nLog in to accept or deny them.\n\n(lol does any1 still use myspace)'},
{id:12,from:'free-ipod@totallylegit.com',subject:'YOU WON A FREE IPOD!!!',date:'Sep 23, 2010',unread:false,body:'CONGRATULATIONS!!!!\n\nYou have been selected to receive a FREE iPod Nano!\n\nClick here to claim your prize!\n\n(this is definately not a scam)'},
{id:13,from:'PYROMANIAC_99@hotmail.com',subject:'FIRE',date:'Sep 22, 2010',unread:false,body:'dude check out this sick airblast i did\ni saved it in fraps\n\nill send it when i figur out how to upload stuff\n\nFIRE FIRE FIRE\n- pyro99'},
{id:14,from:'ringtones@2010ringtones.com',subject:'Download the HOTTEST ringtones!',date:'Sep 21, 2010',unread:false,body:'Get the latest ringtones for your phone!\n\nTop hits:\n- Tik Tok by Ke$ha\n- Bad Romance by Lady Gaga\n- Airplanes by B.o.B\n\nOnly $2.99 each!'},
{id:15,from:'dj_n00dles@gmail.com',subject:'my new song',date:'Sep 20, 2010',unread:false,body:'yo check this out i made a new remix\n\nits the tf2 theme but dubstep\n\nattachment: tf2_dubstep_remix_v47_FINAL_FINAL2.mp3\n\n- dj n00dles'},
{id:16,from:'school@lincolnhigh.edu',subject:'Attendance Warning',date:'Sep 19, 2010',unread:true,body:'Dear Parent/Guardian,\n\nThis is to inform you that your student\nhas accumulated 5 unexcused absences this semester.\n\nPlease contact the school office.\n\n- Lincoln High School'},
{id:17,from:'xX_SC0UT_RULEZ_Xx@yahoo.com',subject:'1v1 ME',date:'Sep 18, 2010',unread:false,body:'BRO 1V1 ME ON MGE\nI BET I CAN BEAT U\n\nUR UBERSAW IS NO MATCH FOR MY SCATTERGUN\n\n- SCOUT RULEZ'},
{id:18,from:'hatcollector3000@gmail.com',subject:'trading guide',date:'Sep 17, 2010',unread:false,body:'hey duck heres how trading works:\n\n1 scrap = 2 weapons\n1 reclaimed = 3 scrap\n1 refined = 3 reclaimed\n\nstart saving ur weapon drops!!\n\n- hat guy'},
{id:19,from:'newsletter@newgrounds.com',subject:'New Flash Games This Week!',date:'Sep 15, 2010',unread:false,body:'Check out this weeks top games:\n\n- Epic Battle Fantasy 3\n- The Impossible Quiz 2\n- Madness Combat 7\n\nPlay now at Newgrounds.com!'},
{id:20,from:'BATSWINGIN55@gmail.com',subject:'funny video',date:'Sep 14, 2010',unread:false,body:'dude watch this video its hilarious\n\nhttps://youtube.com/watch?v=dQw4w9WgXcQ\n\n- batswingin'},
{id:21,from:'win@free-laptop-2010.com',subject:'CONGRATULATIONS YOU WON A FREE LAPTOP',date:'Sep 13, 2010',unread:false,body:'Dear Lucky Winner,\n\nYou have been randomly selected to receive a FREE Dell Laptop!\n\nSimply click the link below and enter your social security number to claim.\n\n(seems legit)'},
{id:22,from:'PYROMANIAC_99@hotmail.com',subject:'RE: RE: RE: FIRE',date:'Sep 13, 2010',unread:false,body:'FIRE FIRE FIRE FIRE\n\nalso my mom says hi\n\nFIRE\n\n- pyro99'},
{id:23,from:'no-reply@ebay.com',subject:'Your bid on "TF2 Strategy Guide" has been outbid',date:'Sep 12, 2010',unread:false,body:'Another buyer has outbid you on:\n\nTeam Fortress 2 Official Strategy Guide\nCurrent bid: $12.50\nYour max bid: $8.00\n\nBid again before time runs out!'},
{id:24,from:'printer-deals@inkexpress.com',subject:'PRINTER INK 50% OFF!!!',date:'Sep 11, 2010',unread:false,body:'AMAZING PRINTER INK DEALS!!!\n\nBlack ink cartridge - ONLY $29.99 (was $59.99)\nColor ink cartridge - ONLY $39.99 (was $79.99)\n\nFREE SHIPPING on orders over $50!'},
{id:25,from:'enlarge@totallylegitpills.com',subject:'Make your COMPUTER faster with this ONE trick',date:'Sep 10, 2010',unread:false,body:'Is your PC running slow?\n\nDownload our FREE tool to make your computer 500% faster!\n\n(this is 100% not a virus we promise)'},
{id:26,from:'dustbowl_newbie@yahoo.com',subject:'thnx for the help!',date:'Sep 10, 2010',unread:false,body:'hey duck thnx for teaching me how to play dustbowl today. i actualy had fun! i might stick with medic like u said.\n\n- the newbie'},
{id:27,from:'no-reply@pizza-hut.com',subject:'$5.99 Large Pizza Deal!',date:'Sep 9, 2010',unread:false,body:'HUNGRY? Get a large 1-topping pizza for only $5.99!\n\nOrder online at pizzahut.com\n\nOffer expires September 30, 2010'},
{id:28,from:'nigerian.prince@email.ng',subject:'URGENT: I need your help (CONFIDENTIAL)',date:'Sep 8, 2010',unread:false,body:'Dear Friend,\n\nI am Prince Emeka of Nigeria and I need your help transferring $15,000,000 USD.\n\nYou will receive 30% of the total.\n\nPlease send your bank details.\n\nYours truly,\nPrince Emeka'},
{id:29,from:'trollface_inc@gmail.com',subject:'importnt message',date:'Sep 7, 2010',unread:false,body:'hey duck open this link\n\nhttps://youtube.com/watch?v=dQw4w9WgXcQ\n\ntrust me its not a rickroll\n\n(it was a rickroll)'},
{id:30,from:'BONKBONKBONK@hotmail.com',subject:'BONK',date:'Sep 6, 2010',unread:false,body:'BONK\n\n- BONK'},
{id:31,from:'weekly-deals@walmart.com',subject:'Back to School SAVINGS!',date:'Sep 5, 2010',unread:false,body:'BACK TO SCHOOL DEALS!\n\nBackpacks starting at $14.99\nNotebooks 5 for $3.00\nCalculators from $9.99\n\nVisit your local Walmart!'},
{id:32,from:'leeroy_jenkins_IRL@yahoo.com',subject:'LEEROY',date:'Sep 4, 2010',unread:false,body:'LEEEEEEEEEEEEROY\n\nJENKINNNNNNNNNNNNS\n\n\n\n\n\nat least i got chicken'},
{id:33,from:'no-reply@miniclip.com',subject:'New Games on Miniclip!',date:'Sep 3, 2010',unread:false,body:'Check out the latest games on Miniclip.com!\n\n- 8 Ball Pool\n- Agar.io\n- Commando 2\n\nPlay for FREE!'},
{id:34,from:'xX_SC0UT_RULEZ_Xx@yahoo.com',subject:'CHECK THIS FRAG VIDEO',date:'Sep 2, 2010',unread:false,body:'BRO I MADE A FRAG VIDEO\n\nits me getting kills on dustbowl\n\nonly 2 of them are mine the rest i stole from youtube\n\nBUT STILL\n\n- SCOUT RULEZ'},
{id:35,from:'your-horoscope@dailystars.com',subject:'Your daily horoscope - Libra',date:'Sep 1, 2010',unread:false,body:'Libra (Sep 23 - Oct 22)\n\nToday the stars suggest you should go outside and touch grass.\n\nJust kidding play more TF2.\n\nLucky numbers: 7, 201'}
];
if(typeof pcState!=='undefined'&&pcState===2){
const corrupted=[
{id:100,from:'??????????@0.0.0.0',subject:'y̷o̸u̵ ̴t̵u̸r̷n̶e̵d̷ ̶i̸t̵ ̷o̸n̵',date:'May 28, 2010',unread:true,body:'i knew you would come back.\nyou always do.'},
{id:101,from:'system@soos.local',subject:'CRITICAL: 50 files recovered',date:'May 28, 2010',unread:true,body:'SYSTEM ALERT\n\n50 files recovered from corrupted sectors\nDrive D: (LOCALDRIVED) mounted\nUnknown process detected (PID 201)\n\nWARNING: Process cannot be terminated\nWARNING: Process is modifying system files\n'},
{id:102,from:'mikeloveshalflife@yahoo.com',subject:'pls answer ur phone',date:'May 27, 2010',unread:true,body:'duck im seriously worried about you\nyour mom called my mom\nshe says you havent left your room in 2 days\n\npls just call me back\nor get on steam\nor something\n\n- mike'},
{id:103,from:'dustbowlBOSS_admin@gmail.com',subject:'RE: RE: RE: server issue',date:'May 26, 2010',unread:true,body:'TheDustBwlDuck,\n\nI shut the server down.\n\nWhatever was on there followed to 3 other\nservers on the same box. Players are reporting\nthe same thing - unscored player, no name,\njust standing there.\n\nI traced the connections. They all come from\n0.0.0.0. That is not a valid source address.\n\nI dont know what you did but something came\noff that hard drive of yours.\n\n- Admin'},
{id:104,from:'xX_SC0UT_RULEZ_Xx@yahoo.com',subject:'dude WTF',date:'May 25, 2010',unread:true,body:'duck i saw u in game today\n\nbut u werent in game\n\nur steam said offline since may 20\nbut there u were on dustbowl\nstanding in the tunnel\nnot moving\n\ni tried to talk to u and my game crashed\n\nwhat is happening'},
{id:105,from:'??????????@0.0.0.0',subject:'',date:'May 28, 2010',unread:true,body:'201\n201\n201\n201\n201\n201\n201\n201\n201\n201\n201\n201\n201'},
{id:106,from:'noreply@steampowered.com',subject:'VAC Ban Notification',date:'May 22, 2010',unread:true,body:'Dear TheDustBwlDuck,\n\nYour account has been flagged by our\nanti-cheat system for abnormal behavior.\n\nReason: Unauthorized memory access\nGame: Team Fortress 2\nServer: 0.0.0.0:27015\n\nNote: Our team has flagged this ban as\nunusual. The behavior detected does not\nmatch any known cheat software.\n\n- Valve Anti-Cheat Team'},
{id:107,from:'PYROMANIAC_99@hotmail.com',subject:'im done',date:'May 24, 2010',unread:false,body:'duck i uninstalled tf2\n\nthe thing on the server followed me to\ncss and then to gmod\n\ni dont know how thats possible\nthey are different games\n\nim done with source games\nmaybe forever\n\nstay safe\n- pyro99'},
{id:110,from:'hatcollector3000@gmail.com',subject:'RE: weird trade',date:'May 24, 2010',unread:true,body:'Duck,\n\nI reported the corrupted hat to steam support.\nThey said the trade came from your account at 3:47 AM on may 22.\nBut your account was VAC banned on may 22 (check your VAC email).\nHow can a banned account send trades??\n\nThe item ID on the gibus was 00000201.\nThat number again.\n\nIm done trading. Im done with tf2.\nWhatever is on your pc is spreading through the economy now.\n\n- hatcollector3000'},
{id:108,from:'??????????@0.0.0.0',subject:'0.0.0.0:27015',date:'May 28, 2010',unread:true,body:'connect.\n\nyou know the address.'},
{id:109,from:'mom',subject:'please come downstairs',date:'May 27, 2010',unread:true,body:'Sweetie please come eat something.\nYou havent eaten since yesterday.\n\nIm leaving a plate outside your door.\n\nI love you.\n\nMom'},
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
const apps={explorer:openExplorer,browser:openBrowser,terminal:openTerminal,texteditor:()=>openTextEditor('','Select a file...'),mediaplayer:openMediaPlayer,imageviewer:openImageViewer,chat:openChat,email:openEmail,settings:openSettings,calculator:openCalculator,paint:openPaint,tf2:()=>{if(typeof window._cubeyTF2Warn==='function'){window._cubeyTF2Warn().then(ok=>{if(ok)triggerTF2Launch()})}else{triggerTF2Launch()}},steam:()=>triggerSteamCrash(),recyclebin:openRecycleBin,limewire:openLimeWire,fraps:openFraps,winrar:openWinRAR,audacity:openAudacity,mirc:openMirc,home:openHomeGame,platformer:openPlatformer,snake:openSnake,chatroom:openChatroom};
if(apps[id])apps[id]();
if(typeof window._cubeyReactToApp==='function')window._cubeyReactToApp(id);
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
if(typeof window._cubeyReactToFile==='function')window._cubeyReactToFile(name);
};
const openBrowser=()=>{
const bmarks=getBookmarks();const hist=getHistory();
let bm='';bmarks.forEach((b)=>{bm+=`<div class="browser-bookmark" data-url="${b.url}">${b.title}</div>`});
let ht='';hist.forEach((h)=>{ht+=`<div class="browser-history-item"><span>${h.title}</span> <span style="color:#808080;margin-left:8px">${h.date}</span></div>`});
const homeHtml=`<div style="color:#808080;margin-bottom:16px;font-size:14px;font-family:Tahoma,sans-serif">EPICCUSTAMBROSWER v4.20</div><div style="color:#000;margin-bottom:8px;font-size:12px;font-family:Tahoma,sans-serif;font-weight:bold">Bookmarks</div><div class="browser-bookmarks">${bm}</div><div style="color:#000;margin:16px 0 8px;font-size:12px;font-family:Tahoma,sans-serif;font-weight:bold">Recent History</div>${ht}`;
const h=`<div class="app-browser"><div class="browser-toolbar"><input class="browser-url" id="browser-url" value="epiccustam://home"><button class="browser-go-btn" id="browser-home">\u2302</button></div><div class="browser-content" id="browser-body">${homeHtml}</div></div>`;
if(openWindows['browser'])closeWindow('browser');
createWindow('browser','EPICCUSTAMBROSWER',600,450,h);
setTimeout(()=>{
document.querySelectorAll('.browser-bookmark').forEach(el=>{
el.addEventListener('click',()=>{
const url=el.dataset.url;
navigateBrowser(url);
});
});
const homeBtn=document.getElementById('browser-home');
if(homeBtn)homeBtn.addEventListener('click',()=>{
document.getElementById('browser-url').value='epiccustam://home';
document.getElementById('browser-body').innerHTML=homeHtml;
setTimeout(()=>{document.querySelectorAll('.browser-bookmark').forEach(el=>{el.addEventListener('click',()=>navigateBrowser(el.dataset.url))})},10);
});
},50);
};
const navigateBrowser=(url)=>{
const urlBar=document.getElementById('browser-url');
const body=document.getElementById('browser-body');
if(!urlBar||!body)return;
urlBar.value=url;
const host=url.replace(/^https?:\/\//,'').replace(/\/$/,'');
const matchKey=Object.keys(browserPages).find(k=>host.includes(k));
if(matchKey){
const page=browserPages[matchKey];
body.innerHTML=page.body;
}else{
body.innerHTML=`<div style="padding:20px;text-align:center;font-family:Tahoma,sans-serif"><div style="font-size:14px;color:#000;margin-bottom:8px">EPICCUSTAMBROSWER</div><div style="font-size:12px;color:#808080">Cannot connect to ${host}</div><div style="font-size:11px;color:#808080;margin-top:8px">The page you requested could not be loaded.</div><div style="margin-top:16px;font-size:48px;color:#d4d0c8">:(</div></div>`;
}
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
const responses=['i see you.','why did you turn it on?','im still here.','at home.','you cant help him.','0.0.0.0','i knew you would come back.','you always do.','BACK','201','stop.','leave.'];
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

else if(lower==='201'){out.innerHTML+='you know the password.\n\n'}
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
document.querySelectorAll('.chat-contact').forEach((btn)=>{btn.addEventListener('click',()=>{document.querySelectorAll('.chat-contact').forEach((b)=>b.classList.remove('active'));btn.classList.add('active');renderChat(btn.dataset.chat);if(typeof window._cubeyReactToChat==='function')window._cubeyReactToChat(btn.dataset.chat)})});
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
document.querySelectorAll('.email-item').forEach((item)=>{item.addEventListener('click',()=>{const id=parseInt(item.dataset.emailId);const email=emails.find((e)=>e.id===id);if(!email)return;if(typeof window._cubeyReactToEmail==='function')window._cubeyReactToEmail(email.subject,email.from);const body=document.querySelector('#win-email .window-body');if(body){body.innerHTML=`<div class="email-view"><button class="email-view-back" id="email-back">\u25C0 Back</button><div class="email-view-header"><div class="email-view-subject">${email.subject}</div><div class="email-view-meta">From: ${email.from} | ${email.date}</div></div><div class="email-view-body">${email.body}</div></div>`;document.getElementById('email-back').addEventListener('click',()=>openEmail())}})});
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
const openLimeWire=()=>{
const files=[
{name:'linkin_park_numb.mp3',size:'4.2 MB',status:'Complete',sources:247},
{name:'System_Of_A_Down_-_Chop_Suey.mp3',size:'3.8 MB',status:'Complete',sources:189},
{name:'Dragonforce_-_Through_Fire.mp3',size:'7.1 MB',status:'Complete',sources:312},
{name:'Green_Day_-_Holiday.mp3',size:'3.5 MB',status:'Downloading... 78%',sources:94},
{name:'Blink_182_-_All_The_Small_Things.mp3',size:'3.1 MB',status:'Queued',sources:156},
{name:'DEFINITELY_NOT_A_VIRUS.exe',size:'847 KB',status:'Complete',sources:2},
{name:'naruto_opening_4.mp3',size:'4.0 MB',status:'Complete',sources:88}
];
let rows='';files.forEach(f=>{
const color=f.status==='Complete'?'#0a0':'#888';
rows+=`<div style="display:flex;gap:8px;padding:3px 6px;border-bottom:1px solid #d4d0c8;font-size:11px"><div style="flex:2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f.name}</div><div style="width:60px;text-align:right">${f.size}</div><div style="width:110px;color:${color}">${f.status}</div><div style="width:50px;text-align:right">${f.sources}</div></div>`;
});
const h=`<div style="display:flex;flex-direction:column;height:100%;background:#fff;font-family:Tahoma,sans-serif;font-size:12px;color:#000">
<div style="background:#e8f5e8;padding:4px 8px;border-bottom:1px solid #808080;display:flex;align-items:center;gap:8px">
<span style="font-weight:bold;color:#2d7a2d">LimeWire PRO</span>
<span style="color:#808080;font-size:10px">5.5.10</span>
<span style="margin-left:auto;color:#2d7a2d;font-size:10px">● Connected (247 sources)</span>
</div>
<div style="padding:4px 8px;background:#ece9d8;border-bottom:1px solid #808080;display:flex;gap:4px">
<input style="flex:1;padding:2px 4px;border:2px inset #808080;font-size:11px;font-family:Tahoma" value="tf2 soundtrack" readonly>
<button style="padding:2px 12px;background:#2d7a2d;color:#fff;border:2px outset #5cb85c;font-size:11px;font-family:Tahoma">Search</button>
</div>
<div style="display:flex;gap:8px;padding:3px 6px;border-bottom:2px solid #808080;font-size:10px;font-weight:bold;background:#d4d0c8">
<div style="flex:2">Filename</div><div style="width:60px;text-align:right">Size</div><div style="width:110px">Status</div><div style="width:50px;text-align:right">Sources</div>
</div>
<div style="flex:1;overflow-y:auto">${rows}</div>
<div style="padding:4px 8px;background:#ece9d8;border-top:1px solid #808080;font-size:10px;color:#808080;display:flex;justify-content:space-between">
<span>Downloads: 7 files</span><span>Upload Speed: 12 KB/s</span><span>Shared: 12 files</span>
</div></div>`;
createWindow('limewire','LimeWire PRO 5.5.10',520,340,h);
};

const openFraps=()=>{
const h=`<div style="display:flex;flex-direction:column;height:100%;background:#2b2b2b;font-family:Tahoma,sans-serif;color:#fff">
<div style="display:flex;border-bottom:1px solid #444">
<div style="padding:6px 14px;background:#3a3a3a;font-size:11px;border-bottom:2px solid #f0ad4e;color:#f0ad4e;font-weight:bold">FPS</div>
<div style="padding:6px 14px;font-size:11px;color:#888">Movies</div>
<div style="padding:6px 14px;font-size:11px;color:#888">Screenshots</div>
</div>
<div style="padding:16px;flex:1">
<div style="display:flex;align-items:baseline;gap:12px;margin-bottom:16px">
<span style="font-size:48px;color:#f0ad4e;font-weight:bold">60</span>
<span style="font-size:14px;color:#888">FPS</span>
</div>
<div style="margin-bottom:12px;font-size:12px">
<div style="color:#888;margin-bottom:4px">Overlay Corner</div>
<div style="display:flex;gap:4px">
<button style="padding:3px 10px;background:#444;border:1px solid #555;color:#f0ad4e;font-size:11px;font-family:Tahoma">Top Left</button>
<button style="padding:3px 10px;background:#333;border:1px solid #555;color:#888;font-size:11px;font-family:Tahoma">Top Right</button>
<button style="padding:3px 10px;background:#333;border:1px solid #555;color:#888;font-size:11px;font-family:Tahoma">Bottom</button>
</div></div>
<div style="font-size:12px">
<div style="color:#888;margin-bottom:4px">Overlay Hotkey</div>
<div style="padding:4px 8px;background:#333;border:1px solid #555;display:inline-block;font-size:11px">F11</div>
</div>
</div>
<div style="padding:8px 16px;background:#222;border-top:1px solid #444;font-size:10px;color:#f00">UNREGISTERED VERSION - www.fraps.com</div>
</div>`;
createWindow('fraps','Fraps 3.4.7 (unregistered)',380,300,h);
};

const openWinRAR=()=>{
const h=`<div style="display:flex;flex-direction:column;height:100%;background:#ece9d8;font-family:Tahoma,sans-serif;font-size:12px">
<div style="padding:20px;text-align:center;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">
<div style="font-size:14px;font-weight:bold;margin-bottom:12px">WinRAR</div>
<div style="font-size:12px;color:#000;margin-bottom:4px">Your evaluation copy of WinRAR has expired.</div>
<div style="font-size:11px;color:#808080;margin-bottom:16px">Days since expiration: <b style="color:#cc0000">1,094</b></div>
<div style="border:1px solid #808080;padding:12px;background:#fff;margin-bottom:16px;font-size:11px;text-align:left;width:280px">
<div style="margin-bottom:4px">WinRAR 3.93 - Evaluation Copy</div>
<div style="color:#808080">Please purchase a license at www.rarlab.com</div>
<div style="color:#808080;margin-top:8px">This is not free software. After a 40 day trial peroid you must either buy a license or remove it from your computer.</div>
</div>
<div style="display:flex;gap:6px">
<button onclick="closeWindow('winrar')" style="padding:4px 20px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer">Close</button>
<button style="padding:4px 20px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer;color:#808080">Buy Now</button>
</div>
</div></div>`;
createWindow('winrar','WinRAR - Evaluation Copy',340,280,h);
};

const openAudacity=()=>{
const h=`<div style="display:flex;flex-direction:column;height:100%;background:#c0c0c0;font-family:Tahoma,sans-serif;font-size:11px;color:#000">
<div style="display:flex;gap:2px;padding:2px 4px;background:#ece9d8;border-bottom:1px solid #808080;font-size:11px">
<span style="padding:1px 6px">File</span><span style="padding:1px 6px">Edit</span><span style="padding:1px 6px">View</span><span style="padding:1px 6px">Transport</span><span style="padding:1px 6px">Tracks</span><span style="padding:1px 6px">Generate</span><span style="padding:1px 6px">Effect</span><span style="padding:1px 6px">Help</span>
</div>
<div style="display:flex;gap:4px;padding:4px 8px;background:#ece9d8;border-bottom:1px solid #808080;align-items:center">
<button style="padding:2px 6px;background:#ece9d8;border:2px outset #fff;font-size:14px;cursor:pointer">⏮</button>
<button style="padding:2px 8px;background:#ece9d8;border:2px outset #fff;font-size:14px;cursor:pointer;color:#0a0">▶</button>
<button style="padding:2px 8px;background:#ece9d8;border:2px outset #fff;font-size:14px;cursor:pointer;color:#c00">●</button>
<button style="padding:2px 6px;background:#ece9d8;border:2px outset #fff;font-size:14px;cursor:pointer">⏹</button>
<button style="padding:2px 6px;background:#ece9d8;border:2px outset #fff;font-size:14px;cursor:pointer">⏭</button>
<span style="margin-left:12px;color:#808080">Volume:</span>
<div style="width:60px;height:8px;background:#fff;border:1px inset #808080"><div style="width:75%;height:100%;background:#316ac5"></div></div>
</div>
<div style="flex:1;background:#333;position:relative;overflow:hidden;margin:4px">
<div style="position:absolute;top:0;left:0;width:100%;height:16px;background:#444;font-size:9px;color:#aaa;display:flex;align-items:center;padding:0 4px">0.0 &nbsp;&nbsp; 1.0 &nbsp;&nbsp; 2.0 &nbsp;&nbsp; 3.0 &nbsp;&nbsp; 4.0 &nbsp;&nbsp; 5.0 &nbsp;&nbsp; 6.0 &nbsp;&nbsp; 7.0</div>
<div style="position:absolute;top:20px;left:4px;right:4px;height:35%;background:#1a1a2a;border:1px solid #555">
<div style="color:#88f;font-size:9px;padding:2px 4px">1 Audio Track (Stereo, 44100Hz, 32-bit)</div>
<canvas id="aud-wave" width="400" height="40" style="width:100%;height:30px"></canvas>
</div>
<div style="position:absolute;top:52%;left:4px;right:4px;height:35%;background:#1a2a1a;border:1px solid #555">
<div style="color:#8f8;font-size:9px;padding:2px 4px">2 Audio Track (Stereo, 44100Hz, 32-bit)</div>
<canvas id="aud-wave2" width="400" height="40" style="width:100%;height:30px"></canvas>
</div>
</div>
<div style="padding:2px 8px;background:#ece9d8;border-top:1px solid #808080;font-size:10px;color:#808080;display:flex;justify-content:space-between">
<span>Project Rate: 44100 Hz</span><span>Selection: 0.000 - 7.234</span><span>Audacity 1.3.12-beta</span>
</div></div>`;
createWindow('audacity','Audacity - tf2_remix_v47_FINAL_FINAL2',550,350,h);
setTimeout(()=>{
['aud-wave','aud-wave2'].forEach(id=>{
const c=document.getElementById(id);if(!c)return;const ctx=c.getContext('2d');
ctx.fillStyle=id==='aud-wave'?'#1a1a2a':'#1a2a1a';ctx.fillRect(0,0,400,40);
const col=id==='aud-wave'?'#4444cc':'#44cc44';
ctx.strokeStyle=col;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,20);
for(let x=0;x<400;x++){const a=Math.sin(x*0.05)*Math.sin(x*0.02)*(8+Math.random()*8);ctx.lineTo(x,20+a)}
ctx.stroke();
});
},100);
};

const openMirc=()=>{
const msgs=[
{t:'19:30',u:'dustbowlBOSS_admin',m:'welcome evry1 to dustbowl 24/7'},
{t:'19:31',u:'xX_SC0UT_RULEZ_Xx',m:'BONK'},
{t:'19:31',u:'hevy_sandvich_man',m:'sandvich time'},
{t:'19:32',u:'PYROMANIAC_99',m:'FIRE FIRE FIRE'},
{t:'19:32',u:'cr1tical_h1t',m:'any1 wanna do mge after this?'},
{t:'19:33',u:'spycrab_lol',m:'*does spycrab*'},
{t:'19:33',u:'M3DIC_OR_RIOT',m:'MEDIC MEDIC MEDIC'},
{t:'19:34',u:'TheDustBwlDuck',m:'hey guys'},
{t:'19:34',u:'sENTRY_gUY_420',m:'hEY dUCK'},
{t:'19:35',u:'hatcollector3000',m:'any1 have a vintage merryweather for trade?'},
{t:'19:35',u:'BONKBONKBONK',m:'BONK'},
{t:'19:36',u:'TheDustBwlDuck',m:'whos on red team rn'},
{t:'19:36',u:'xX_SC0UT_RULEZ_Xx',m:'ME IM DOMINATING EVERYONE'},
{t:'19:37',u:'cr1tical_h1t',m:'you went 2 and 9 last round'},
{t:'19:37',u:'xX_SC0UT_RULEZ_Xx',m:'THOSE WERE TACTICAL'},
{t:'19:38',u:'dustbowlBOSS_admin',m:'play nice evry1'},
{t:'19:38',u:'PYROMANIAC_99',m:'no'},
{t:'19:39',u:'TheDustBwlDuck',m:'lmaooo'},
{t:'19:39',u:'n00bkillaXD',m:'IM THE BEST PLAYER HERE'},
{t:'19:40',u:'TheDustBwlDuck',m:'u literaly just joined'},
{t:'19:40',u:'spycrab_lol',m:'gentlemen'},
{t:'19:41',u:'backstabMASTA',m:'FYI going spy next round'},
{t:'19:41',u:'cloakedNdaggerd',m:'oh no not again'}
];
let log='';msgs.forEach(m=>{log+=`<div style="font-size:11px;line-height:1.4;padding:1px 0"><span style="color:#808080">[${m.t}]</span> <span style="color:${m.u==='TheDustBwlDuck'?'#00c':'#c00'};font-weight:bold">&lt;${m.u}&gt;</span> ${m.m}</div>`});
const users=['@dustbowlBOSS_admin','+TheDustBwlDuck','xX_SC0UT_RULEZ_Xx','PYROMANIAC_99','cr1tical_h1t','M3DIC_OR_RIOT','BONKBONKBONK','hevy_sandvich_man','spycrab_lol','sENTRY_gUY_420','hatcollector3000','n00bkillaXD','backstabMASTA','cloakedNdaggerd','2FORT_4EVER','xx_FRAGZ_xx','sn1p3r_n0_sc0p3','ROCKETLAUNCHER69','PAYLOAD_PUSHR','I_MAIN_EVERYTHING','iiiiillllllllll','dj_n00dles','_______'];
let userList='';users.forEach(u=>{const col=u.startsWith('@')?'#c00':u.startsWith('+')?'#00c':'#000';userList+=`<div style="font-size:10px;color:${col};padding:1px 4px">${u}</div>`});
const h=`<div style="display:flex;flex-direction:column;height:100%;background:#fff;font-family:Tahoma,sans-serif;font-size:12px;color:#000">
<div style="padding:2px 6px;background:#ece9d8;border-bottom:1px solid #808080;font-size:10px;color:#808080">#tf2-dustbowl on irc.gamesurge.net</div>
<div style="flex:1;display:flex;overflow:hidden">
<div style="flex:1;overflow-y:auto;padding:4px 8px;border-right:1px solid #808080;background:#fff">${log}</div>
<div style="width:140px;overflow-y:auto;padding:4px 0;background:#f8f8f8">
<div style="font-size:10px;font-weight:bold;padding:2px 4px;border-bottom:1px solid #d4d0c8;color:#808080">${users.length} users</div>
${userList}
</div>
</div>
<div style="display:flex;padding:2px 4px;background:#ece9d8;border-top:1px solid #808080;gap:4px">
<input style="flex:1;padding:2px 4px;border:2px inset #808080;font-size:11px;font-family:Tahoma" value="" placeholder="Type a message...">
<button style="padding:2px 10px;background:#ece9d8;border:2px outset #fff;font-size:11px;font-family:Tahoma">Send</button>
</div></div>`;
createWindow('mirc','mIRC - #tf2-dustbowl',520,380,h);
};

// Recycle Bin
const openRecycleBin=()=>{
const items=typeof pcState!=='undefined'&&pcState===2?[
{name:'its_not_real.txt',content:'i keep telling myself its not real\nits just a game\nits just pixels\n\nbut then y does he kno my name'},
{name:'DELETED_photo_001.png',content:'[IMAGE FILE - CORRUPTED]\n[Cannot display]'},
{name:'uninstall_tf2.bat',content:'@echo off\necho Uninstalling Team Fortress 2...\necho ERROR: Access denied\necho ERROR: File in use by process (PID 201)\necho Uninstall failed.'},
{name:'help_me.txt',content:'somebody pls help me\ni dont kno who 2 ask\nmy friends think im crazy\nmaybe i am crazy\n\nbut hes real\nhes real hes real hes real'}
]:[
{name:'essay_draft_OLD.txt',content:'ok so the american revoltion\n\nu kno what forget it im starting over'},
{name:'screenshot_003.png',content:'[IMAGE FILE]\n[dustbowl screenshot - bad quality]'},
{name:'untitled.txt',content:''},
{name:'New Folder',content:'[EMPTY FOLDER]'}
];
let list='';items.forEach((item,i)=>{
list+=`<div class="explorer-item" data-bin-idx="${i}"><div class="explorer-item-icon">\uD83D\uDCC4</div><div class="explorer-item-name">${item.name}</div></div>`;
});
const h=`<div class="app-explorer"><div class="explorer-toolbar"><span style="font-family:Tahoma,sans-serif;font-size:11px;color:#000;padding:2px 4px">Recycle Bin - ${items.length} item(s)</span></div><div class="explorer-content" style="background:#fff">${list}</div></div>`;
createWindow('recyclebin','Recycle Bin',400,300,h);
document.querySelectorAll('[data-bin-idx]').forEach(el=>{
el.addEventListener('click',()=>{const idx=parseInt(el.dataset.binIdx);openTextEditor(items[idx].content,items[idx].name)});
});
};

// Browser with fake pages
const browserPages={
'dustbowl247.community-tf2.net':{title:'Dustbowl 24/7 - Community Server',body:`<div style="background:#2b2b2b;padding:16px;min-height:100%">
<div style="color:#f0ad4e;font-size:18px;font-weight:bold;font-family:Tahoma,sans-serif">DUSTBOWL 24/7</div>
<div style="color:#808080;font-size:11px;margin-top:4px;font-family:Tahoma,sans-serif">Community TF2 Server | cp_dustbowl</div>
<div style="border:1px solid #444;margin:12px 0;padding:8px;background:#1a1a1a;font-family:Tahoma,sans-serif;font-size:12px">
<div style="color:#fff;margin-bottom:8px">Server Status: <span style="color:#5cb85c">ONLINE</span></div>
<div style="color:#aaa">Players: 22/24</div>
<div style="color:#aaa">Map: cp_dustbowl</div>
<div style="color:#aaa">IP: 68.142.15.201:27015</div>
</div>
<div style="color:#888;font-size:11px;font-family:Tahoma,sans-serif">Top Players This Week:</div>
<div style="color:#aaa;font-size:11px;font-family:Tahoma,sans-serif;padding:4px 0">1. xx_FRAGZ_xx - 2,847 pts</div>
<div style="color:#aaa;font-size:11px;font-family:Tahoma,sans-serif;padding:4px 0">2. TheDustBwlDuck - 2,415 pts</div>
<div style="color:#aaa;font-size:11px;font-family:Tahoma,sans-serif;padding:4px 0">3. cr1tical_h1t - 1,923 pts</div>
<div style="color:#aaa;font-size:11px;font-family:Tahoma,sans-serif;padding:4px 0">4. PYROMANIAC_99 - 1,876 pts</div>
<div style="color:#aaa;font-size:11px;font-family:Tahoma,sans-serif;padding:4px 0">5. sENTRY_gUY_420 - 1,654 pts</div>
<div style="color:#555;font-size:10px;margin-top:16px;font-family:Tahoma,sans-serif">Admin: dustbowlDAVE | Est. 2008 | Rules: No cheating, no sprays with nsfw</div>
</div>`},
'steamcommunity.com/id/thedustbwlduck':{title:'Steam Community :: TheDustBwlDuck',body:`<div style="background:#1b2838;padding:16px;min-height:100%;font-family:Tahoma,sans-serif">
<div style="display:flex;gap:12px;align-items:center;margin-bottom:16px">
<div style="width:64px;height:64px;background:#2a475e;border:1px solid #4a6b8a;display:flex;align-items:center;justify-content:center;color:#66c0f4;font-size:10px">IMAGE<br>MISSING</div>
<div>
<div style="color:#fff;font-size:16px">TheDustBwlDuck</div>
<div style="color:#57cbde;font-size:11px">Currently Online</div>
<div style="color:#8f98a0;font-size:10px;margin-top:4px">Member since October 10, 2007</div>
</div>
</div>
<div style="background:#2a475e;padding:8px;margin-bottom:8px;border:1px solid #4a6b8a">
<div style="color:#fff;font-size:12px;margin-bottom:4px">Currently In-Game</div>
<div style="color:#90ba3c;font-size:11px">Team Fortress 2</div>
</div>
<div style="color:#8f98a0;font-size:11px;border-top:1px solid #2a475e;padding-top:8px">
<div style="margin-bottom:4px"><span style="color:#fff">2,847</span> hrs on record</div>
<div style="margin-bottom:4px">Most played: Team Fortress 2 (2,847 hrs)</div>
<div>Games owned: 3 (The Orange Box)</div>
</div>
<div style="color:#8f98a0;font-size:10px;margin-top:12px;border-top:1px solid #2a475e;padding-top:8px">
<div style="color:#fff;font-size:11px;margin-bottom:4px">About me:</div>
<div>dustbowl is the best map ever made and u cant change my mind. medic main btw. dont add me if ur gona be weird.</div>
<div style="margin-top:8px">i play on dustbowl 24/7 server evry nite. come say hi.</div>
</div>
</div>`}
};

const openPlatformer=()=>{
const h=`<div style="width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column"><canvas id="plat-canvas" width="480" height="320" style="border:1px solid #333;image-rendering:pixelated;background:#1a0a2e"></canvas><div id="plat-hud" style="font-family:'Press Start 2P',monospace;font-size:9px;color:#ff0;margin-top:4px;text-align:center">Arrow Keys to move. Space to jump.</div></div>`;
createWindow('platformer','SUPER DUST MAN v2.1 (FREE)',520,400,h);
setTimeout(()=>initPlatformer(),100);
};
const initPlatformer=()=>{
const canvas=document.getElementById('plat-canvas');
if(!canvas)return;
const ctx=canvas.getContext('2d');
const W=480,H=320;
let px=40,py=200,pvx=0,pvy=0,onGround=false,score=0,dead=false,frame=0;
const gravity=0.5,jumpForce=-8,speed=3;
const keys={};
document.addEventListener('keydown',(e)=>{keys[e.key]=true;if(e.key===' ')e.preventDefault()});
document.addEventListener('keyup',(e)=>{keys[e.key]=false});
const platforms=[
{x:0,y:280,w:480,h:40},
{x:80,y:230,w:80,h:10},
{x:200,y:190,w:100,h:10},
{x:340,y:220,w:80,h:10},
{x:50,y:150,w:70,h:10},
{x:180,y:120,w:90,h:10},
{x:320,y:100,w:80,h:10},
{x:420,y:150,w:60,h:10},
{x:100,y:80,w:80,h:10},
{x:250,y:50,w:100,h:10}
];
const coins=[
{x:110,y:210,w:10,h:10,got:false},
{x:240,y:170,w:10,h:10,got:false},
{x:370,y:200,w:10,h:10,got:false},
{x:80,y:130,w:10,h:10,got:false},
{x:210,y:100,w:10,h:10,got:false},
{x:350,y:80,w:10,h:10,got:false},
{x:440,y:130,w:10,h:10,got:false},
{x:130,y:60,w:10,h:10,got:false},
{x:290,y:30,w:10,h:10,got:false}
];
const enemies=[
{x:150,y:268,w:14,h:12,sx:150,ex:260,dir:1,spd:1},
{x:200,y:178,w:14,h:12,sx:200,ex:290,dir:1,spd:0.8},
{x:100,y:68,w:14,h:12,sx:100,ex:170,dir:1,spd:1.2}
];
const collide=(ax,ay,aw,ah,bx,by,bw,bh)=>ax<bx+bw&&ax+aw>bx&&ay<by+bh&&ay+ah>by;
const restart=()=>{px=40;py=200;pvx=0;pvy=0;dead=false;score=0;coins.forEach(c=>c.got=false);enemies.forEach(e=>{e.x=e.sx;e.dir=1})};
const loop=()=>{
if(!document.getElementById('plat-canvas'))return;
frame++;
if(!dead){
if(keys['ArrowLeft']||keys['a'])pvx=-speed;
else if(keys['ArrowRight']||keys['d'])pvx=speed;
else pvx*=0.7;
if((keys[' ']||keys['ArrowUp']||keys['w'])&&onGround){pvy=jumpForce;onGround=false}
pvy+=gravity;
px+=pvx;py+=pvy;
onGround=false;
platforms.forEach(p=>{
if(pvy>=0&&py+14<=p.y+pvy+1&&py+14+pvy>=p.y&&px+12>p.x&&px<p.x+p.w){
py=p.y-14;pvy=0;onGround=true;
}
});
if(px<0)px=0;if(px>W-12)px=W-12;
if(py>H+20)restart();
coins.forEach(c=>{if(!c.got&&collide(px,py,12,14,c.x,c.y,c.w,c.h)){c.got=true;score++}});
enemies.forEach(e=>{
e.x+=e.spd*e.dir;
if(e.x<=e.sx||e.x>=e.ex)e.dir*=-1;
if(collide(px,py,12,14,e.x,e.y,e.w,e.h)){
if(pvy>0&&py+14<e.y+6){e.y=-100;score+=3;pvy=-5}
else{dead=true}
}
});
}else{
if(keys[' '])restart();
}
// draw
ctx.fillStyle='#1a0a2e';ctx.fillRect(0,0,W,H);
// stars
if(frame%2===0){for(let i=0;i<3;i++){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.fillRect(Math.random()*W,Math.random()*H,1,1)}}
// platforms
platforms.forEach((p,i)=>{ctx.fillStyle=i===0?'#2d5a1e':'#4a2a6e';ctx.fillRect(p.x,p.y,p.w,p.h);if(i>0){ctx.fillStyle='#5a3a8e';ctx.fillRect(p.x,p.y,p.w,2)}});
// coins
coins.forEach(c=>{if(!c.got){ctx.fillStyle=frame%20<10?'#ffcc00':'#ff9900';ctx.fillRect(c.x+1,c.y+1,8,8);ctx.fillStyle='#ffee88';ctx.fillRect(c.x+3,c.y+2,3,4)}});
// enemies
enemies.forEach(e=>{if(e.y>-50){ctx.fillStyle='#cc2222';ctx.fillRect(e.x,e.y,e.w,e.h);ctx.fillStyle='#fff';ctx.fillRect(e.x+2,e.y+2,3,3);ctx.fillRect(e.x+8,e.y+2,3,3)}});
// player
ctx.fillStyle=dead?'#666':'#44aaff';ctx.fillRect(px,py,12,14);
ctx.fillStyle='#fff';ctx.fillRect(px+2,py+2,3,3);ctx.fillRect(px+7,py+2,3,3);
ctx.fillStyle='#ffcc00';ctx.fillRect(px+1,py-3,10,3);
// hud
ctx.fillStyle='#ff0';ctx.font='10px Press Start 2P';ctx.textAlign='left';
ctx.fillText('COINS: '+score+'/'+coins.length,8,16);
ctx.textAlign='right';ctx.fillText('SUPER DUST MAN',W-8,16);
if(dead){ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#f00';ctx.font='16px Press Start 2P';ctx.textAlign='center';ctx.fillText('GAME OVER',W/2,H/2-10);ctx.fillStyle='#fff';ctx.font='9px Press Start 2P';ctx.fillText('Press SPACE to retry',W/2,H/2+15)}
if(score>=coins.length&&!dead){ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#0f0';ctx.font='14px Press Start 2P';ctx.textAlign='center';ctx.fillText('YOU WIN!!',W/2,H/2-10);ctx.fillStyle='#fff';ctx.font='9px Press Start 2P';ctx.fillText('Press SPACE to play again',W/2,H/2+15);if(keys[' '])restart()}
requestAnimationFrame(loop);
};
loop();
};

const openSnake=()=>{
const h=`<div style="width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column"><canvas id="snake-canvas" width="300" height="300" style="border:2px solid #333;image-rendering:pixelated;background:#0a0a0a"></canvas><div id="snake-hud" style="font-family:'Press Start 2P',monospace;font-size:9px;color:#0f0;margin-top:6px">Arrow Keys to move</div></div>`;
createWindow('snake','Snake',340,380,h);
setTimeout(()=>initSnake(),100);
};
const initSnake=()=>{
const canvas=document.getElementById('snake-canvas');
if(!canvas)return;
const ctx=canvas.getContext('2d');
const G=15,C=300/G;
let snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];
let dir={x:1,y:0};
let nextDir={x:1,y:0};
let food=spawnFood();
let score=0;
let dead=false;
let speed=120;
let lastTime=0;
function spawnFood(){
let f;
do{f={x:Math.floor(Math.random()*C),y:Math.floor(Math.random()*C)}}
while(snake.some(s=>s.x===f.x&&s.y===f.y));
return f;
}
document.addEventListener('keydown',(e)=>{
if(e.key==='ArrowUp'&&dir.y===0){nextDir={x:0,y:-1};e.preventDefault()}
else if(e.key==='ArrowDown'&&dir.y===0){nextDir={x:0,y:1};e.preventDefault()}
else if(e.key==='ArrowLeft'&&dir.x===0){nextDir={x:-1,y:0};e.preventDefault()}
else if(e.key==='ArrowRight'&&dir.x===0){nextDir={x:1,y:0};e.preventDefault()}
else if(e.key===' '&&dead){snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];dir={x:1,y:0};nextDir={x:1,y:0};food=spawnFood();score=0;dead=false;speed=120}
});
const loop=(t)=>{
if(!document.getElementById('snake-canvas'))return;
if(t-lastTime>speed&&!dead){
lastTime=t;
dir=nextDir;
const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
if(head.x<0||head.x>=C||head.y<0||head.y>=C||snake.some(s=>s.x===head.x&&s.y===head.y)){
dead=true;
}else{
snake.unshift(head);
if(head.x===food.x&&head.y===food.y){
score++;
food=spawnFood();
if(speed>60)speed-=3;
}else{
snake.pop();
}
}
}
ctx.fillStyle='#0a0a0a';
ctx.fillRect(0,0,300,300);
// grid
ctx.strokeStyle='#111';
ctx.lineWidth=0.5;
for(let i=0;i<=C;i++){
ctx.beginPath();ctx.moveTo(i*G,0);ctx.lineTo(i*G,300);ctx.stroke();
ctx.beginPath();ctx.moveTo(0,i*G);ctx.lineTo(300,i*G);ctx.stroke();
}
// food
ctx.fillStyle='#ff0000';
ctx.fillRect(food.x*G+1,food.y*G+1,G-2,G-2);
ctx.fillStyle='#ff4444';
ctx.fillRect(food.x*G+3,food.y*G+2,G-6,G-5);
// snake
snake.forEach((s,i)=>{
ctx.fillStyle=i===0?'#00ff00':'#00cc00';
ctx.fillRect(s.x*G+1,s.y*G+1,G-2,G-2);
if(i===0){
ctx.fillStyle='#000';
const ex=dir.x===1?9:dir.x===-1?2:3;
const ey=dir.y===1?9:dir.y===-1?2:3;
ctx.fillRect(s.x*G+ex,s.y*G+ey,3,3);
ctx.fillRect(s.x*G+ex+(dir.y!==0?6:0),s.y*G+ey+(dir.x!==0?6:0),3,3);
}
});
// score
ctx.fillStyle='#0f0';
ctx.font='10px Press Start 2P';
ctx.textAlign='left';
ctx.fillText('SCORE: '+score,6,14);
// dead
if(dead){
ctx.fillStyle='rgba(0,0,0,0.7)';
ctx.fillRect(0,0,300,300);
ctx.fillStyle='#f00';
ctx.font='14px Press Start 2P';
ctx.textAlign='center';
ctx.fillText('GAME OVER',150,140);
ctx.fillStyle='#0f0';
ctx.font='9px Press Start 2P';
ctx.fillText('Score: '+score,150,165);
ctx.fillStyle='#888';
ctx.fillText('SPACE to retry',150,190);
}
requestAnimationFrame(loop);
};
requestAnimationFrame(loop);
};
