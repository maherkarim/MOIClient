import CryptoJS from "crypto-js";
import moment from "moment";

// Callers
let CallerID = localStorage.getItem("ip"); //"1610f82d-6ec0-4b01-a468-th373816b3a8";

const CallerType = () => {
  if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
    return "Chrome";
  } else if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
    return "Internet Explorer";
  } else if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
    return "Firefox";
  } else if (navigator.userAgent.toLowerCase().indexOf("safari") > -1) {
    return "Safari";
  } else if (navigator.userAgent.toLowerCase().indexOf("presto") > -1) {
    return "Opera";
  } else return "Unknown Browser: " + navigator.userAgent;
};

export function UserAccount() {
  // User
  let UserID = "";
  let Username = "";
  let UserLoginType = "";
  let userProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (userProfile && userProfile.userId) {
    UserID = userProfile.userId;
    Username = userProfile.registrationID
      ? userProfile.registrationID
      : userProfile.displayName;
    UserLoginType = userProfile.registrationType;
    UserLoginType = UserLoginType === "SMS" ? "Phone" : UserLoginType;
    const str =
      "userid=" +
      encodeURIComponent(UserID) +
      "&username=" +
      encodeURIComponent(Username) +
      "&userlogintype=" +
      encodeURIComponent(UserLoginType);
    return str;
  } else {
    return "userid=&username=&userlogintype=";
  }
}

export function CallerData() {
  const str =
    "callerid=" +
    encodeURIComponent(CallerID) +
    "&callertype=" +
    encodeURIComponent(CallerType()) +
    "&callerversion=" +
    encodeURIComponent("3.0.0") +
    "&calleros=" +
    encodeURIComponent(navigator.userAgent);
  return str;
}

export function Encrypt(text) {
  try {
    return CryptoJS.TripleDES.encrypt(
      text,
      CryptoJS.enc.Utf8.parse(
        "\u0073\u0068\u006f\u0075\u006c\u0064 \u0062\u0065 \u0032\u0034 \u0063\u0068\u0061\u0072\u0061\u0063\u0074\u0065\u0072\u0073\u002e"
      ),
      { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
    ).toString();
  } catch (err) {
    throw new Error("Parameters Encryption Failed");
  }
}

export function RequestTime() {
  return encodeURIComponent(moment().format("YYYY-MM-DDTHH:mm:ssZ"));
}
