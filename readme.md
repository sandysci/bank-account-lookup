bank-account-lookup
===========
bank-account-lookup - This is a utility package to search for possible banknames for an account number

## Installation
```json
"dependencies": {
  "bank-account-lookup": "~0.1.19" // see the "releases" section
}
```
```npm install bank-account-lookup```
## Requirements
```javascript
const utils = require('bank-account-lookup');
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

- [Ezeibe Sandra](https://github.com/sandysci)
- [Ezeibe Sandra](https://queenofcodes.herokuapp.com/)
