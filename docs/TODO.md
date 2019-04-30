TODO
====

TECH
----
- JS a játék legelején csak az animáció látszódjon! [DONE]
- HTML, JS áltnevezni a cookie-kat resource-ra [DONE]
- JS CSS olvasható számformátum
- JS int overflow?
- JS span-okba tenni a létrehozott DOM-ot, hogy lehessen egyben kezelni [DONE]
- JS fix: hide [DONE]
- JS időgyorsítást megoldani [DONE]
- JS új canvas: progressbar, függőleges, custom [DONE]
- HMTL, JS elemek elnevezése (tier1-tier3) [DONE]
- JS revew_resources átnevezése main_loop-ra [DONE]
- HMTL képernyőkép kialakítása, oszlopok, elrendezés
- CSS stilizálás: 
    - egységesítés
    - imp, gen elkülönítése [DONE]
    - resource-ok kiemelése
- JS új resource-ok:
    - soul
    - pain
    - follower
    - human / imp population
- JS event handling
    - resource check event condition [DONE]
    - imp / gen check event [DONE]
    - event check [DONE]
- JS jobb klikk custom command [DONE]
- JS main.js szétbontása [DONE]
    - clickers
    - improvements
    - generators
    - events
    - main
- JS utils.js szétbontása
    - dom utils 
    - event handlers (clickers-be rakni?)
    - egyéb, mittudomén
- HMTL, JS game over implementálása
    - popup [DONE]
    - reset game
    - achievements
- JS több clicker [DONE]
- JS fix condition checking in utils.check_preqs and utils.check_event_triggered ?

 

STORY
-----
- 1M sikolynál progress bár, ha megtelik, jön a kérdés [DONE]
- imaginary friend-ből misterious friend lesz, halvány szempár, egy-egy kósza felirat (halvány az is) [DONE]
- az időgyorsításra gyorsuljon az anim is, és egy idő után már pörögjön a fal nagyon gyorsan [DONE]
- választási lehetőség: vagy segítesz és a barátja leszel, vagy a szolgája, vagy jobb-klikk event (csak ilyenkor van bekapcsolva) [DONE]


ÖRDÖG STORYLINE
- ha barátja leszel, szárnyakat növesztesz, és kattintásra embereket dobálsz a lyukba (célzás célkereszttel), új resource: soul [DONE]
- ha elég sok soult gyűjtesz, egyre több szolgát tudsz venni (új currency: follower)
- soul ha eléri az 1milliárdot, új csökkenő progressbar 7milliárdról indul.
    - ha elfogy: kihal a föld: GAME OVER
    - ha közben elég sok followert gyűjtesz: respawn, ami embert termel?
    - keltetőgép, ami embert termel
    - ha sikerül középen egy sávra beállítani: GAME OVER (mittudomén 10 percre)
    

RESISTANCE STORYLINE
- első körben: GAME OVER
- második kör:
    - tűzbe esel, új currency: pain?
    - fájdalmat átveheted másoktól, így új currency: follower
    - ha thresholdnál több follower: - lázadás a pokolban
        - van egy teli bar, ami lassan termelődik, followerekért cserébe csökkented (update lehetőség: follower áldozás, amivel tápolod a többieket)
        - ha sikerül elfogyasztani: 
            - az ördög visszaküld a földre: GAME OVER
            - ha kifogysz a followerekből: GAME OVER


WAKE UP STORYLINE [DONE]
- event: jobb klikk -> valami custom menü (wake up: GAME OVER) [DONE]


ART
---
- szárnyas imp
- kis ember, minimális animmal
- tüzes gödör
- ember az üstben
- halvány szempár [DONE]
- élénk szempár

opcionális:
- improvementeknek, generátoroknak ikon?
- SND saját shout hangok?

