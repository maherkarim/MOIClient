import axios from "axios";
import moment from "moment";

export default async (url, credentials) => {
  const tokenOptions = JSON.parse(localStorage.getItem("paci-token"));
  if (tokenOptions)
    if (moment(moment().format()).isSameOrBefore(tokenOptions.expireDate))
      return tokenOptions.token;

  const response = await axios.post(url + "jgettoken", credentials);
  const data = response.data;
  if (data.IsSuccessful) {
    localStorage.setItem(
      "paci-token",
      JSON.stringify({
        token: data.Result,
        expireDate: moment().add(14, "minutes").locale("en").format(),
      })
    );
    return data.Result;
  } else {
    return null;
  }
};
