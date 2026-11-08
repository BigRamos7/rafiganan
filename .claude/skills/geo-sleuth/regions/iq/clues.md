# Iraq clues

Entries use the shared format (`references/clues/README.md`). Clues that tell Iraq apart from its neighbours belong in `references/clues/global.md`.

## Text and numbers

### Governorate code on a current plate
- Look for: on a white EU-size plate with a vertical `IRQ` band, the two digits before the letter (`11 A 12345`); Kurdistan Region plates also show a small `KR` on the band
- Points to: the governorate where the vehicle was registered (11 Baghdad … 29 Wasit; 21–24 are the Kurdistan Region: Sulaymaniyah, Erbil, Halabja, Duhok) → `clues.py lookup plate <digits> --country iq`
- Strength: weak for where the photo was taken; medium when most parked cars in a quiet residential street share one code
- Counterexamples: registration is not location; the coded format was issued from April 2022 in Kurdistan and from June 2024 elsewhere, so many cars still carry the older plate with the governorate written out; red (taxi, bus), blue (government), yellow (trucks) and green (agricultural) plates use the same code
- Sources: en.wikipedia "Vehicle registration plates of Iraq", section "Design and format", https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Iraq; NINA news "New codes for license plates in Iraq", 20 May 2022, https://ninanews.com/Website/News/Details?key=977300

### Governorate name on an older plate
- Look for: on 2008–2024 plates (335×155 mm, `IRAQ` written vertically on the left), the narrow lower section with the governorate name and the plate class in Arabic (`خصوصي` private, `اجرة` taxi, `حمل` truck); government (`حكومية`) and customs plates have no governorate
- Points to: the governorate of registration → `clues.py lookup admin <name> --country iq` (Arabic and Sorani names are listed as aliases)
- Strength: weak for where the photo was taken (registration, not location); medium as a cluster in a residential street
- Counterexamples: these plates are being replaced, so a mix of old and new is normal; before 2008 the 1988 and 2001 formats also wrote the governorate in Arabic, and Kurdistan used its own format until 2022
- Sources: en.wikipedia "Vehicle registration plates of Iraq", section "2008-2024", https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Iraq

### KR on the plate band
- Look for: a small `KR` under or beside `IRQ` on the left band of a current plate
- Points to: a vehicle registered in the Kurdistan Region: Erbil, Sulaymaniyah, Duhok or Halabja
- Strength: medium for the Kurdistan Region as a whole when most cars carry it (single source)
- Counterexamples: registration is not location, and Kurdistan-registered cars travel into neighbouring governorates; the band is small and easy to misread at a distance
- Sources: en.wikipedia "Vehicle registration plates of Iraq", https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Iraq

### Landline area code on shop signs
- Look for: a fixed-line number on a shop sign or banner: `01` (Baghdad) or `0` plus two digits, then six or seven digits
- Points to: 01 Baghdad; 021 Saladin; 023 Wasit; 024 Anbar; 025 Diyala; 030 Babil; 032 Karbala; 033 Najaf; 036 Qadisiyyah; 037 Muthanna; 040 Basra; 042 Dhi Qar; 043 Maysan; 050 Kirkuk; 053 Sulaymaniyah; 060 Nineveh; 062 Duhok; 066 Erbil → `clues.py lookup area-code <number> --country iq`
- Strength: medium (one code per governorate; single source)
- Counterexamples: most businesses advertise a mobile number (`07xx`: Korek 750/751, Alkafeel 760, Asiacell 77x, Zain 78x/790), which says nothing about place; Halabja has no code of its own in the source
- Sources: en.wikipedia "Telephone numbers in Iraq", https://en.wikipedia.org/wiki/Telephone_numbers_in_Iraq

## Administrative names

### Governorate names and the Kurdistan Region
- Look for: `محافظة` followed by a name on government buildings and signs (in Arabic or Sorani Kurdish, `پارێزگای`)
- Points to: the named governorate → `clues.py lookup admin <name> --country iq` (Arabic and Sorani names are listed as aliases); the Kurdistan Region is Erbil, Sulaymaniyah, Duhok and Halabja
- Strength: medium (direction signs also name places elsewhere)
- Counterexamples: Halabja was split from Sulaymaniyah (recognised by the Region in 2014 and by the Iraqi parliament in April 2025), so older signs and sources list it under Sulaymaniyah; proposals for new governorates (Tal Afar, Tuz Khurmatu, Nineveh Plains, Fallujah) may change the list
- Sources: en.wikipedia "Governorates of Iraq" (19 governorates, the Kurdistan Region's four, Halabja's history), https://en.wikipedia.org/wiki/Governorates_of_Iraq
