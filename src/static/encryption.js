let CryptoJS = require("crypto-js");
let key = 'encryption';
export const desCode = {
    encrypted: (plaintText) => {
        let keyStr = CryptoJS.enc.Utf8.parse(key);

        let encryptedData = CryptoJS.TripleDES.encrypt(plaintText, keyStr, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encryptedData.toString();
    },
    // 3DES解密
    decrypted: (encryptedStr) => {
        let keyStr = CryptoJS.enc.Utf8.parse(key);

        let decryptedData = CryptoJS.TripleDES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(encryptedStr)
        }, keyStr, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        // 解密后，需要按照Utf8的方式将明文转位字符串
        return decryptedData.toString(CryptoJS.enc.Utf8);
    }
};
