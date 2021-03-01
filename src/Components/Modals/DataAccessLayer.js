import axios from "axios";
import {
  UserAccount,
  CallerData,
  Encrypt,
  RequestTime,
} from "../Helper/Helper";

export const KFSearch = async (
  kfServerUrl,
  searchtext,
  startIndex,
  mapExtent,
  pageSize,
  language
) => {
  let query =
    "searchtext=" +
    encodeURIComponent(searchtext) +
    "&startindex=" +
    startIndex +
    "&pagesize=" +
    pageSize +
    "&xmin=" +
    mapExtent.xmin +
    "&ymin=" +
    mapExtent.ymin +
    "&xmax=" +
    mapExtent.xmax +
    "&ymax=" +
    mapExtent.ymax +
    "&nearby=false&language=" +
    language +
    "&currentlocationx=&currentlocationy=" +
    "&" +
    UserAccount() +
    "&" +
    CallerData() +
    "&requesttime=" +
    RequestTime();

  const url =
    kfServerUrl + "search/search?params=" + encodeURIComponent(Encrypt(query));

  const response = await axios.get(url);
  return response.data;
};

export const KFFetchNeighborhoods = async (
  kfServerUrl,
  mapExtent,
  language
) => {
  let query =
    "governorate=" +
    encodeURIComponent("") +
    "&neighborhood=" +
    encodeURIComponent("") +
    "&block=" +
    encodeURIComponent("") +
    "&street=" +
    encodeURIComponent("") +
    "&featuretype=" +
    encodeURIComponent("Neighborhood") +
    "&xmin=" +
    mapExtent.xmin +
    "&ymin=" +
    mapExtent.ymin +
    "&xmax=" +
    mapExtent.xmax +
    "&ymax=" +
    mapExtent.ymax +
    "&language=" +
    language +
    "&currentlocationx=&currentlocationy=" +
    "&" +
    UserAccount() +
    "&" +
    CallerData() +
    "&requesttime=" +
    RequestTime();

  const url =
    kfServerUrl +
    "search/searchadvance?params=" +
    encodeURIComponent(Encrypt(query));
  const response = await axios.get(url);
  return response.data;
};

export const KFFetchGeomerty = async (id, kfServerUrl) => {
  let query =
    "id=" +
    id +
    "&language=ar&currentlocationx=&currentlocationy=" +
    "&" +
    UserAccount() +
    "&" +
    CallerData() +
    "&requesttime=" +
    RequestTime();
  const url =
    kfServerUrl +
    "search/searchgeometry?params=" +
    encodeURIComponent(Encrypt(query));
  const response = await axios.get(url);
  return response.data;
};

export const KFSearchAutocomplete = async (
  kfServerUrl,
  searchtext,
  mapExtent,
  language
) => {
  let query =
    "searchtext=" +
    encodeURIComponent(searchtext) +
    "&xmin=" +
    mapExtent.xmin +
    "&ymin=" +
    mapExtent.ymin +
    "&xmax=" +
    mapExtent.xmax +
    "&ymax=" +
    mapExtent.ymax +
    "&language=" +
    language +
    "&currentlocationx=&currentlocationy=" +
    "&" +
    UserAccount() +
    "&" +
    CallerData() +
    "&requesttime=" +
    RequestTime();
  const url =
    kfServerUrl +
    "search/searchautocomplete?params=" +
    encodeURIComponent(Encrypt(query));
  const response = await axios.get(url);
  return response.data;
};

export const KFIdentify = async (
  kfServerUrl,
  x,
  y,
  mapScale,
  mapExtent,
  language
) => {
  let query =
    "x=" +
    x +
    "&y=" +
    y +
    "&maplevel=" +
    "&mapscale=" +
    mapScale +
    "&xmin=" +
    mapExtent.xmin +
    "&ymin=" +
    mapExtent.ymin +
    "&xmax=" +
    mapExtent.xmax +
    "&ymax=" +
    mapExtent.ymax +
    "&language=" +
    language +
    "&currentlocationx=&currentlocationy=" +
    "&" +
    UserAccount() +
    "&" +
    CallerData() +
    "&requesttime=" +
    RequestTime();

  const url =
    kfServerUrl +
    "search/identify?params=" +
    encodeURIComponent(Encrypt(query));
  const response = await axios.get(url);
  return response.data;
};

export const KFSearchWhatIshere = async (
  kfServerUrl,
  civilid,
  mapExtent,
  language
) => {
  let query =
    "civilid=" +
    civilid +
    "&startindex=0" +
    "&pagesize=50" +
    "&xmin=" +
    mapExtent.xmin +
    "&ymin=" +
    mapExtent.ymin +
    "&xmax=" +
    mapExtent.xmax +
    "&ymax=" +
    mapExtent.ymax +
    "&language=" +
    language +
    "&currentlocationx=&currentlocationy=" +
    "&" +
    UserAccount() +
    "&" +
    CallerData(3) +
    "&requesttime=" +
    RequestTime();

  const url =
    kfServerUrl +
    "search/searchwhatishere?params=" +
    encodeURIComponent(Encrypt(query));

  const response = await axios.get(url);
  return response.data;
};

export const saveMOIJob = async (serverUrl, bodyFormData) => {
  const url = serverUrl + "/moi/server/SaveJob";
  const response = await axios.post(url, bodyFormData, {
    headers: {
      headers: { "Content-Type": "multipart/form-data" },
    },
  });
  return response.data;
};
