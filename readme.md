tm-utils
===========
tm-utils - This is a utility package for reused component

## Installation
```json
"dependencies": {
  "tm-utils": "~0.1.17" // see the "releases" section
}
```
```npm install tm-utils```
## Requirements
```javascript
const utils = require('tm-utils');
```

### Phone Number Formatter (Single)
- To format a single phone number
```javascript
let phoneNumber = "08012345678";
phoneNumber = utils.formatPhoneNumber(phoneNumber, "NG");
console.log(phoneNumber); //2348012345678
```

### Phone Number Formatter (Multiple)
- To format an array of phone numbers
```javascript
let phoneNumbers = ["08012345678", "08012345679"];
phoneNumbers = utils.formatPhoneNumber(phoneNumbers, "NG");
console.log(phoneNumbers); //['2348012345678','2348012345679']
```

### Bank Account LookUp 
- To get Bank List Suggestion for an account number
```javascript
let accountnumber = "0005516510";
let banklist = utils.accountNumberLookup(accountnumber);
console.log(banklist); // [{ bankName: 'DIAMOND BANK',code: '063', bankCode: '000005', bankId: 4 }, { bankName: 'PARALLEX', code: '502', bankCode: '090004', bankId: 21 ] 
```

### Tests
#### Cli
```bash
npm install
npm test
```

#### Contributors

- [Micheal Akinwonmi](https://github.com/blackhades)
- [Ezeibe Sandra](https://github.com/sandysci)
