# Lebanon clues

Entries use the shared format (`references/clues/README.md`). Clues that tell Lebanon apart from its neighbours belong in `references/clues/global.md`.

## Text and numbers

### Registration letter on a private plate
- Look for: the single Latin letter before the number on a white private plate with a blue band reading `لبنان` and a cedar (`B 123456`, `N 45678`)
- Points to: the office where the car was registered: B Beirut, Y Aley, G Jounieh (Keserwan), N Nabatieh, O Ouzai (southern Beirut suburbs), S Sidon (South), T Tripoli (North), Z Zahlé (Beqaa), K Baalbek (listed as not in use) → `clues.py lookup plate <letter> --country lb`
- Strength: weak (single source, and the article is tagged unreferenced); medium only when most parked cars in a quiet residential street share one letter
- Counterexamples: registration is not location: people commute and move, and cars bought in Beirut are driven everywhere; A (numbers from before 1998), M (motorcycles, pickups and vans, institutions), P (public transport), J, R, MP, C and D carry no region; the source lists offices by the governorates in force before 2014–2017, so G and K now sit in Keserwan-Jbeil and Baalbek-Hermel
- Sources: en.wikipedia "Vehicle registration plates of Lebanon", section "Codes", https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Lebanon

### Plate colour → vehicle use
- Look for: the background colour of the plate: white with a blue band (private), red (public transport and institutions), yellow (driving schools), green (transit), brown (temporary), pink (tourism), orange (diplomatic), purple (consular)
- Points to: not a place; it tells which plates may carry a region letter (white private ones) and which do not
- Strength: weak (single source)
- Counterexamples: the article's introduction calls green plates rental plates while its table calls them transit plates; old 1945 and 1998 series plates are still seen
- Sources: en.wikipedia "Vehicle registration plates of Lebanon", https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Lebanon

### Landline area code on shop signs and vans
- Look for: a fixed-line number on a shop sign, banner, awning or delivery van: `01`, `04`, `05`, `06`, `07`, `08` or `09` followed by six digits
- Points to: 01 Beirut and its metropolitan area; 04 Matn; 05 Baabda, Aley and Chouf; 06 North and Akkar; 07 South and Nabatieh (plus some towns in southern Mount Lebanon); 08 Beqaa and Baalbek-Hermel; 09 Keserwan and Byblos → `clues.py lookup area-code <number> --country lb`
- Strength: medium (a shop's own landline is usually local; the codes are wide, so this settles the governorate, not the town)
- Counterexamples: `03` and `70`, `71`, `76`, `78`, `79`, `81` are mobile and say nothing about place; most small businesses advertise a mobile number only; a chain shows its head-office number; 02 is no longer used
- Sources: en.wikipedia "Telephone numbers in Lebanon", section "Area codes", https://en.wikipedia.org/wiki/Telephone_numbers_in_Lebanon (citing the TRA national numbering plan)

## Administrative names

### Governorate and district on official signs
- Look for: `محافظة` (governorate) or `قضاء` (district) followed by a name on official signs and government buildings
- Points to: the named governorate or district → `clues.py lookup admin <name> --country lb` (Arabic names are listed as aliases)
- Strength: medium (direction signs also name places elsewhere)
- Counterexamples: direction signs name the destination, not the current place; Keserwan-Jbeil was split from Mount Lebanon in 2017 and Akkar and Baalbek-Hermel in 2014, so older signs and documents still use the former governorate
- Sources: en.wikipedia "Governorates of Lebanon" (nine governorates and their creation dates), https://en.wikipedia.org/wiki/Governorates_of_Lebanon; en.wikipedia "Districts of Lebanon", https://en.wikipedia.org/wiki/Districts_of_Lebanon
