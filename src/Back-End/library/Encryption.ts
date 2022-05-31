import CryptoJS from "crypto-js";

export default class Encryption {
  static encode(data) {
    return CryptoJS.AES.encrypt(data, "secret key 123").toString();
  }

  static decode(hashCode) {
    var bytes = CryptoJS.AES.decrypt(hashCode, "secret key 123");
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
