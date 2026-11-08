# Iran clues

Entries use the shared format (`references/clues/README.md`). Clues that tell Iran apart from its neighbours belong in `references/clues/global.md`.

## Text and numbers

### Provincial code in the box on the plate
- Look for: on an EU-size plate (`12 ب 345` then a box), the two digits in the box at the right end, under the word `ایران`; digits are Persian: ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹ = 0–9
- Points to: the province where the vehicle was registered (each province has one to five codes; Tehran city has fourteen) → `clues.py lookup plate <two digits> --country ir` (Persian or Western digits)
- Strength: weak for where the photo was taken; medium when most parked cars in a quiet residential street share one province
- Counterexamples: registration is not location; codes 21, 30, 38, 68, 78 are shared by Tehran province (outside the city) and Alborz; 32 and 42 belong to Razavi Khorasan but also to the original letter series of Bojnurd and Birjand; 64 is Yazd but also Tabas (South Khorasan, letter ق); some national plates (police, diplomatic) are issued from code 11 regardless of province; ۲/۳ and ۴/۶ are easy to confuse at a distance
- Sources: en.wikipedia "Vehicle registration plates of Iran", section "Provincial codes and letter series", https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Iran

### Letter on a private plate → county
- Look for: the Persian letter between the two number groups on a white private plate (one of ب ج د س ص ط ق ل م ن و هـ ی)
- Points to: within a province, private-plate letters are assigned per county (e.g. under code 24 Khuzestan, ب Abadan County and ج Khorramshahr County); look the code and letter up in the per-code tables of the source
- Strength: weak (single source; allocations have been split and merged over time)
- Counterexamples: some letters are split further by the first two digits of the number, and some are shared by several counties; non-private plates (taxi ت, public ع, government, police) are issued province-wide, so their letter says nothing about the county; recycled numbers have been reissued since 2021
- Sources: en.wikipedia "Vehicle registration plates of Iran", sections "Private vehicles" and "Breakdown of codes and letters", https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Iran

### Free-trade-zone plate
- Look for: a US-size plate with a five-digit number written twice (Persian on top, Western below), an Iranian flag and a zone logo with its English name, and no provincial box
- Points to: the free trade zone named on the plate: Kish, Anzali, Aras, Arvand, Maku or Chabahar
- Strength: medium for the zone or its surroundings (single source); these plates are meant for use inside the zone
- Counterexamples: zone vehicles can be seen outside the zone; the logo is small and the name may be unreadable at a distance
- Sources: en.wikipedia "Vehicle registration plates of Iran", section "Free trade zones", https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Iran

### Landline area code on shop signs
- Look for: an 11-digit landline `0XX XXXX XXXX` on a shop sign or banner (often in Persian digits)
- Points to: one province per code: 021 Tehran, 026 Alborz, 031 Isfahan, 041 East Azerbaijan, 051 Razavi Khorasan, 061 Khuzestan, 071 Fars … → `clues.py lookup area-code <number> --country ir`
- Strength: medium (one province per code; single source)
- Counterexamples: `09xx` numbers are mobile and `099xx` MVNO, nationwide; short service numbers and 9xxx business numbers have no area; a chain may show its head-office number
- Sources: en.wikipedia "Telephone numbers in Iran", section "Area code", https://en.wikipedia.org/wiki/Telephone_numbers_in_Iran

## Administrative names

### Province name on signs
- Look for: `استان` (province) or `شهرستان` (county) followed by a name on government buildings, welcome signs and road signs
- Points to: the named province → `clues.py lookup admin <name> --country ir` (Persian names are listed as aliases)
- Strength: medium (direction signs name destinations, not the current place)
- Counterexamples: Khorasan was split into three provinces in 2004 and Alborz from Tehran in 2010, so older signs and maps use the former names; Tabas moved from Yazd to South Khorasan in 2012
- Sources: en.wikipedia "Provinces of Iran", https://en.wikipedia.org/wiki/Provinces_of_Iran; en.wikipedia "Vehicle registration plates of Iran" (Khorasan, Alborz and Tabas history), https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Iran
