# Chore Calendar

[![Greenkeeper badge](https://badges.greenkeeper.io/mnkhouri/chore-calendar.svg)](https://greenkeeper.io/)

Generate a weekly chore calendar.

## To use

1. Define chores in `chores.json`. Each chore must have:
    - name: The name of the chore
    - period: How many weeks are between each occurence of the chore
    - offset: Adjustment to offset the chore's starting week
    - doer: The person who does the chore
2. (optional) Modify settings in config.json
3. Run the program: `node ./index.js`

## Sample output

```
Sun Jan 01 2017 (week 1):
    Mary: Wipe kitchen counters and handles; Vacuum kitchen; Dust bookshelves, desk; Vacuum living rm, bedroom, bathroom; Clean toilet
    Edward: Laundry; Wipe living room table; Wipe down bathroom; Clean shower
Sun Jan 08 2017 (week 2):
    Mary: Wipe kitchen counters and handles; Vacuum kitchen
    Edward: Laundry
```
