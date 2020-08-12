
const banks = [
    { name: "ACCESS BANK", code: "044" ,bankCode:"000014"},
    { name: "CITIBANK", code: "023" ,bankCode:"000009"},
    { name: "CORONATION MERCHANT BANK", code: "559",bankCode:"060001" },
    { name: "COVENANT MICROFINANCE BANK", code: "551",bankCode:"070006" },
    { name: "DIAMOND BANK", code: "063",bankCode:"000005" },
    { name: "ECOBANK NIGERIA", code: "050",bankCode:"000010" },
    { name: "ENTERPRISE BANK", code: "084",bankCode:"000019" },
    { name: "E-TRANZACT", code: "306" ,bankCode:"100006"},
    { name: "FBN M-MONEY", code: "309",bankCode:"060002" },
    { name: "FIDELITY BANK", code: "070",bankCode:"000007" },
    { name: "FIDELITY MOBILE", code: "318" ,bankCode:"100019"},
    { name: "FINATRUST MICROFINANCE BANK", code: "608" ,bankCode:"090111"},
    { name: "FIRST BANK OF NIGERIA", code: "011" ,bankCode:"000016"},
    { name: "FIRST CITY MONUMENT BANK", code: "214" ,bankCode:"000003"},
    { name: "FORTIS MICROFINANCE BANK", code: "501" ,bankCode:"070002"},
    { name: "GUARANTY TRUST BANK", code: "058",bankCode:"000013" },
    { name: "HERITAGE BANK", code: "030",bankCode:"000020"  },
    { name: "JAIZ BANK", code: "301",bankCode:"000006"  },
    { name: "KEYSTONE BANK", code: "082",bankCode:"000002"  },
    { name: "PROVIDUS BANK", code: "101",bankCode:"000023"  },
    { name: "PAGA", code: "327",bankCode:"100002"  },
    { name: "PARALLEX", code: "502",bankCode:"090004"  },
    { name: "POLARIS BANK", code: "076" ,bankCode:"000008" },
    { name: "STANBIC IBTC BANK", code: "221" ,bankCode:"000012" },
    { name: "STANDARD CHARTERED BANK", code: "068",bankCode:"000021"  },
    { name: "STERLING BANK", code: "232",bankCode:"000001"  },
    { name: "SUNTRUST", code: "100",bankCode:"000022"  },
    { name: "UNION BANK OF NIGERIA", code: "032",bankCode:"000018"  },
    { name: "UNITED BANK FOR AFRICA", code: "033" ,bankCode:"000004" },
    { name: "UNITY BANK", code: "215" ,bankCode:"000011" },
    { name: "WEMA BANK", code: "035" ,bankCode:"000017" },
    { name: "ZENITH BANK", code: "057" ,bankCode:"000015" }


];

const seed = "373373373373";
const nubanLength = 10;
const serialNumLength = 9;
let error;

module.exports = {
    getAccountBanks: ( accountNumber) => {

        let accountBanks = [];

        banks.forEach((item, index) => {
            if (isBankAccountValid(accountNumber, item.code)) {
                accountBanks.push(item);
            }
        });
        return {data:accountBanks };

    },
    createAccountWithSerial: (bankCode) => {
        let bank = banks.find(bank => bank.code == bankCode);

        if (!bank) {

            return   { error:   "We do not recognize this code as a Nigerian commercial bank code"}

        }

        try {
            let serialNumber = req.body.serialNumber.padStart(serialNumLength, "0");
            let nuban = `${serialNumber}${generateCheckDigit(
                serialNumber,
                bankCode
            )}`;

            let account = {
                serialNumber,
                nuban,
                bankCode,
                bank
            };
            return {data : account}

        } catch (err) {
            return {error : error}
        }
    }
};

const generateCheckDigit = (serialNumber, bankCode) => {
    if (serialNumber.length > serialNumLength) {

        return { error:  `Serial number should be at most ${serialNumLength}-digits long.`}

    }
    serialNumber = serialNumber.padStart(serialNumLength, "0");
    let cipher = bankCode + serialNumber;

    let sum = 0;

    // Step 1. Calculate A*3+B*7+C*3+D*3+E*7+F*3+G*3+H*7+I*3+J*3+K*7+L*3
    cipher.split("").forEach((item, index) => {
        sum += item * seed[index];
    });

    // Step 2: Calculate Modulo 10 of your result i.e. the remainder after dividing by 10
    sum %= 10;

    // Step 3. Subtract your result from 10 to get the Check Digit
    let checkDigit = 10 - sum;

    // Step 4. If your result is 10, then use 0 as your check digit
    checkDigit = checkDigit == 10 ? 0 : checkDigit;

    return checkDigit;
};

/**
 * Algorithm source: https://www.cbn.gov.ng/OUT/2011/CIRCULARS/BSPD/NUBAN%20PROPOSALS%20V%200%204-%2003%2009%202010.PDF
 * The approved NUBAN format ABC-DEFGHIJKL-M where
 * ABC is the 3-digit bank code assigned by the CBN
 * DEFGHIJKL is the NUBAN Account serial number
 * M is the NUBAN Check Digit, required for account number validation
 * @param {*} accountNumber
 * @param {*} bankCode
 */
const isBankAccountValid = (accountNumber, bankCode) => {
    if (!accountNumber || accountNumber.length != nubanLength) {
        error = "NUBAN must be %s digits long" % nubanLength;
        return false;
    }

    let serialNumber = accountNumber.substring(0, 9);
    let checkDigit = generateCheckDigit(serialNumber, bankCode);

    return checkDigit == accountNumber[9];
};