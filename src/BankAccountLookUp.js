
const banks = [
    { bankName: "ACCESS BANK", code: "044" ,bankCode:"000014"},
    { bankName: "CITIBANK", code: "023" ,bankCode:"000009"},
    { bankName: "CORONATION MERCHANT BANK", code: "559",bankCode:"060001" },
    { bankName: "COVENANT MICROFINANCE BANK", code: "551",bankCode:"070006" },
    { bankName: "DIAMOND BANK", code: "063",bankCode:"000005" },
    { bankName: "ECOBANK NIGERIA", code: "050",bankCode:"000010" },
    { bankName: "ENTERPRISE BANK", code: "084",bankCode:"000019" },
    { bankName: "E-TRANZACT", code: "306" ,bankCode:"100006"},
    { bankName: "FBN M-MONEY", code: "309",bankCode:"060002" },
    { bankName: "FIDELITY BANK", code: "070",bankCode:"000007" },
    { bankName: "FIDELITY MOBILE", code: "318" ,bankCode:"100019"},
    { bankName: "FINATRUST MICROFINANCE BANK", code: "608" ,bankCode:"090111"},
    { bankName: "FIRST BANK OF NIGERIA", code: "011" ,bankCode:"000016"},
    { bankName: "FIRST CITY MONUMENT BANK", code: "214" ,bankCode:"000003"},
    { bankName: "FORTIS MICROFINANCE BANK", code: "501" ,bankCode:"070002"},
    { bankName: "GUARANTY TRUST BANK", code: "058",bankCode:"000013" },
    { bankName: "HERITAGE BANK", code: "030",bankCode:"000020"  },
    { bankName: "JAIZ BANK", code: "301",bankCode:"000006"  },
    { bankName: "KEYSTONE BANK", code: "082",bankCode:"000002"  },
    { bankName: "PROVIDUS BANK", code: "101",bankCode:"000023"  },
    { bankName: "PAGA", code: "327",bankCode:"100002"  },
    { bankName: "PARALLEX", code: "502",bankCode:"090004"  },
    { bankName: "POLARIS BANK", code: "076" ,bankCode:"000008" },
    { bankName: "STANBIC IBTC BANK", code: "221" ,bankCode:"000012" },
    { bankName: "STANDARD CHARTERED BANK", code: "068",bankCode:"000021"  },
    { bankName: "STERLING BANK", code: "232",bankCode:"000001"  },
    { bankName: "SUNTRUST", code: "100",bankCode:"000022"  },
    { bankName: "UNION BANK OF NIGERIA", code: "032",bankCode:"000018"  },
    { bankName: "UNITED BANK FOR AFRICA", code: "033" ,bankCode:"000004" },
    { bankName: "UNITY BANK", code: "215" ,bankCode:"000011" },
    { bankName: "WEMA BANK", code: "035" ,bankCode:"000017" },
    { bankName: "ZENITH BANK", code: "057" ,bankCode:"000015" }


];

const SEED = "373373373373";
const NUNBANLENGTH = 10;
const SERIALNUMLENGTH = 9;
let error;

module.exports = {
    getAccountBanks: ( accountNumber) => {

        let accountBanks = [];

        banks.forEach((item, index) => {
            if (isBankAccountValid(accountNumber, item.code)) {
                item.bankId = index;
                accountBanks.push(item);
            }
        });
        return accountBanks ;

    },
    createAccountWithSerial: (bankCode) => {
        let bank = banks.find(bank => bank.code == bankCode);

        if (!bank) {

            return   { error:   "We do not recognize this code as a Nigerian commercial bank code"}

        }

        try {
            let serialNumber = req.body.serialNumber.padStart(SERIALNUMLENGTH, "0");
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
            return  account;

        } catch (err) {
            return err;
        }
    }
};

const generateCheckDigit = (serialNumber, bankCode) => {
    if (serialNumber.length > SERIALNUMLENGTH) {

        return { error:  `Serial number should be at most ${SERIALNUMLENGTH}-digits long.`}

    }
    serialNumber = serialNumber.padStart(SERIALNUMLENGTH, "0");
    let cipher = bankCode + serialNumber;

    let sum = 0;

    // Step 1. Calculate A*3+B*7+C*3+D*3+E*7+F*3+G*3+H*7+I*3+J*3+K*7+L*3
    cipher.split("").forEach((item, index) => {
        sum += item * SEED[index];
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
    if (!accountNumber || accountNumber.length != NUNBANLENGTH) {
        error = "NUBAN must be %s digits long" % NUNBANLENGTH;
        return false;
    }

    let serialNumber = accountNumber.substring(0, 9);
    let checkDigit = generateCheckDigit(serialNumber, bankCode);

    return checkDigit == accountNumber[9];
};