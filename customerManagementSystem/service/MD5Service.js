/**
 * Created by czAlexzhan on 2017/7/20.
 */
var crypto = require('crypto');

module.exports = {
    aesEncrypto :function (data, key) {
        const cipher = crypto.createCipher('aes192',key);
        var crypted = cipher.update(data,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    aesDecrypt :function(encrypted, key) {
        const decipher = crypto.createDecipher('aes192', key);
        var decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
};