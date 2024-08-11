# holidays-brazil
Easy to use nodejs brazilian holiday validator.

## Installation

```bash
npm install holidays-brazil
```

## Usage

```javascript
const isHoliday = require('holidays-brazil')


isHoliday(new Date()) // Returns true or false
```

## Details

All fixed holidays are hard coded in the script, but the moving ones are calculated based on Meeus/Jones/Butcher easter date algorithm.

## License

[MIT](https://choosealicense.com/licenses/mit/)
