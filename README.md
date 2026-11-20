# padanyifilm — helyi weboldal

Az Eronnvideo bemásolt forrásából készült. Az eredeti mappa változatlan.

## Előnézet

A projekt gyökeréből: `node padanyifilm/preview.cjs`, majd http://127.0.0.1:4173 .
A magyar főoldal `index.html`, az angol `en/index.html`. A használt stíluslap `brand.css`; a `styles.css` az átvett, már nem betöltött korábbi stíluslap.

## Elkészült

- Világos, visszafogott zöld tónusú arculat, tipográfiai márkajelzés, új nyitóblokk.
- Filmek a bemutatkozás előtt; YouTube-lejátszó csak kattintáskor töltődik be.
- A felhasználó által megadott személyesebb magyar szövegek és természetes angol változatuk.
- Háromcsomagos kalkulátor: alapértelmezett Teljes csomag, dátum, helyszín, Teljesnél 8–13 órás csúszka.
- Közös csomagadatok és számítás a `pricing.js` fájlban; a nyilvános kártyák és a kalkulátor is ebből töltődik. A HTML-ben olvasható tartalék kártyák is szerepelnek.
- Az ajánlatkérő automatikusan megkapja a csomagot, dátumot, óraszámot, számított árat és helyszínt. A telefonszám opcionális.
- A lejárt júliusi akció eltávolítása, a korábbi 99 000 / 249 000 / 399 000 Ft megtartása.
- HU/EN, canonical és sitemap az új domainnel; CNAME és .nojekyll megfelelő fájlnévvel.
- Visszautasított Facebook-hozzájárulás megjegyzése és későbbi betöltési lehetőség.

## Élesítés előtt

- A kiszállási díj a meglévő oldal alapján 120 Ft/km, oda-vissza Érdről; nem számolódik automatikusan.
- Nagy felbontású saját nyitókép/showreel és közösségi megosztókép. Jelenleg a meglévő YouTube-film borítója szerepel, ennek felbontása korlátozott.
- Az új e-mail és közösségi profilok megadása; a régi működő linkek maradtak.
- Formspree végpont tulajdonosi ellenőrzése és engedélyezett tesztküldés. Az ellenőrzés során nem küldtünk levelet.
- Domain regisztrációjának visszaigazolása, választott tárhely, DNS és HTTPS összekötése.
- A meglévő naptár, Facebook-vélemények és szolgáltatási tartalom aktualitásának ellenőrzése.

Ez helyi előnézet, nincs publikálva, a DNS nem változott.

## Jóváhagyott számítás (belső dokumentáció)

Mini: 99 000 Ft, 2 óra. Prémium: 399 000 Ft, 13 óra és külön napi kreatív forgatás. Ezekre nincs szezonális vagy óraszám szerinti ármódosítás.

Teljes: április 20.–október 10. között (határnapokkal együtt) 249 000 Ft; más dátumokon 199 000 Ft, 13 órára. Minden elhagyott óra 8 000 Ft, minimum 8 óra. A szezonbesorolás és az árcsökkentés magyarázata nem jelenik meg az oldalon. Dátumellenőrzés naptári számokkal, a mai nap meghatározása Europe/Budapest időzónában.

## Ellenőrzés

`node padanyifilm/pricing.test.cjs`: 199 ellenőrzés, minden óraszám, szezonhatárok több évben, Mini/Prémium változatlan árazás, hibás és múltbeli dátumok. Budapest, Honolulu és Kiritimati időzónával is futtatva.

`node padanyifilm/form-submit.test.cjs`: 8 szimulált beküldési eset két nyelven, sikeres szerverválasz, visszautasítás, hálózati hiba és hibás JSON. Nem küld valódi levelet. Valódi kézbesítési próba élesítés előtt szükséges.


