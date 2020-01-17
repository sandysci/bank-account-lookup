tm-utils
===========
tm-utils - This is a utility package for reused component

## Installation
```json
"dependencies": {
  "tm-utils": "~0.1.2" // see the "releases" section
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
phoneNumber = utils.formatPhoneNumber(phoneNumber);
console.log(phoneNumber); //2348012345678
```

### Phone Number Formatter (Multiple)
- To format am array of phone numbers
```javascript
let phoneNumbers = ["08012345678", "08012345679"];
phoneNumbers = utils.formatPhoneNumber(phoneNumbers);
console.log(phoneNumbers); //['2348012345678','2348012345679']
```


### Tests
#### Cli
```bash
npm install
npm test
```

#### Contributors

- [Micheal Akinwonmi](https://github.com/blackhades)
