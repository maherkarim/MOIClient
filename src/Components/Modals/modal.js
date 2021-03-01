import { action, thunk } from "easy-peasy";
import axios from "axios";
import {
  UserAccount,
  CallerData,
  Encrypt,
  RequestTime,
} from "../Helper/Helper";
import strings from "../Localizations/Localizations";
import moment from "moment";
import GenerateToken from "./GenerateToken";
import {
  KFSearch,
  KFSearchAutocomplete,
  KFIdentify,
  KFSearchWhatIshere,
} from "./DataAccessLayer";

const model = {
  mainStore: {
    auth: null,
    loginMessage: null,
    Login: thunk(async (actions, payload, helpers) => {
      const state = helpers.getState();
      const body =
        "username=" + payload.username + "&password=" + payload.password;
      const response = await axios.post(
        state.config.appServerUrl + "login",
        body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const data = await response.data;
      if (data.IsLoginSuccessfully) {
        actions.setAuth(data);
        localStorage.setItem("moi-auth", JSON.stringify(data));
      } else {
        state.loginMessage = "اسم المستخدم او كلمة المرور غير صحيحة";
      }
    }),
    setAuth: action((state, payload) => {
      // console.log(payload);
      state.auth = payload;
    }),

    saveJob: thunk(
      async (actions, { fileObjects, fields, isEdit }, helpers) => {
        const state = helpers.getState();

        // console.log(state.auth);

        let body = {
          ...fields,
          Updatedate: moment().locale("en").format("YYYY-MM-DD HH:mm:ss"),
          Updatedby: state.auth.Username,
          EntityName: state.auth.Entity,
        };
        // console.log(body);
        // console.log(fileObjects);
        if (!isEdit) {
          body.Createdate = moment().locale("en").format("YYYY-MM-DD HH:mm:ss");
          body.Createdby = state.auth.Username;
          body.EntityName = state.auth.Entity;
        }

        var formData = new FormData();
        formData.append("fields", JSON.stringify(body));
        formData.append("files", JSON.stringify(fileObjects));

        axios({
          method: "post",
          url: state.config.appServerUrl + "SaveJob",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            console.log(response);
            actions.setSnackbarOption({
              message: "تم حفظ الإجراء",
              open: true,
            });
            actions.fetchJobs();
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    ),

    jobs: null,
    fetchJobs: thunk(async (actions, payload, helpers) => {
      const state = helpers.getState();

      let url = "";
      if (payload) url = state.config.appServerUrl + "SearchJobs/" + payload;
      else url = state.config.appServerUrl + "SearchJobs";

      const response = await axios.get(url);
      const data = await response.data;

      actions.setJobs(data);
    }),
    setJobs: action((state, payload) => {
      state.jobs = payload;
    }),

    jobLogs: null,
    fetchJobLogs: thunk(async (actions, payload, helpers) => {
      const state = helpers.getState();

      const url = state.config.appServerUrl + "GetjobLogs/" + payload;
      const response = await axios.get(url);
      const data = await response.data;
      actions.setJobLogs(data);
    }),
    setJobLogs: action((state, payload) => {
      state.jobLogs = payload;
    }),

    myLocation: null,
    setMyLocation: action((state, payload) => {
      state.myLocation = payload;
    }),

    config: null,
    fetchConfig: thunk(async (actions, payload) => {
      const response = await axios.get("/config.json");
      const data = await response.data;
      actions.setConfig(data);
    }),
    setConfig: action((state, payload) => {
      state.config = payload;
    }),

    loading: false,
    setLoading: action((state, payload) => {
      state.loading = payload;
    }),

    appLoaded: false,
    setAppLoaded: action((state, payload) => {
      state.appLoaded = payload;
    }),

    mapScale: null,
    setMapScale: action((state, payload) => {
      state.mapScale = payload;
    }),

    mapExtent: null,
    setMapExtent: action((state, payload) => {
      state.mapExtent = payload;
    }),

    highLightPoint: null,
    setHighLightPoint: action((state, payload) => {
      state.highLightPoint = payload;
    }),
    //End Of Map

    language: "ar",
    //Search
    suggestions: [],
    fetchSuggestions: thunk(async (actions, payload, helpers) => {
      const state = helpers.getState();
      const data = await KFSearchAutocomplete(
        state.config.kfServerUrl,
        payload,
        state.mapExtent,
        state.language
      );
      if (data.IsSuccessful) {
        if (data.Result.length > 0) {
          actions.setSuggestions(data.Result);
        }
      }
    }),
    setSuggestions: action((state, payload) => {
      state.suggestions = payload;
    }),

    searchText: "",
    setSearchText: action((state, payload) => {
      state.searchText = payload;
    }),

    showClearIcon: false,
    setShowClearIcon: action((state, payload) => {
      state.showClearIcon = payload;
    }),

    searchResult: null,
    fetchSearchResult: thunk(async (actions, payload, helpers) => {
      actions.setLoading(true);

      const state = helpers.getState();

      let mapExtent = state.neighborhoodExtent
        ? state.neighborhoodExtent
        : state.mapExtent;

      const data = await KFSearch(
        state.config.kfServerUrl,
        state.searchText,
        state.startIndex,
        mapExtent,
        state.pageSize,
        state.language
      );
      if (data.IsSuccessful) {
        if (
          state.startIndex > 0 &&
          state.searchResult &&
          state.searchResult.length > 0
        ) {
          let merged = [...state.searchResult, ...data.Result];
          actions.setSearchResult(merged);
        } else actions.setSearchResult(data.Result);
        if (data.Result.length === 0) {
          actions.setSnackbarOption({ message: strings.noresult, open: true });
        }
        actions.setLoading(false);
      } else {
        actions.setLoading(false);
      }
    }),
    setSearchResult: action((state, payload) => {
      state.searchResult = payload;
    }),

    startIndex: 0,
    setStartIndex: action((state, payload) => {
      state.startIndex = payload;
    }),

    mapPoint: null,
    setMapPoint: action((state, payload) => {
      state.mapPoint = payload;
    }),

    pageSize: 20,
    setPageSize: action((state, payload) => {
      state.pageSize = payload;
    }),

    document: null,
    fetchDocument: thunk(async (actions, payload, helpers) => {
      actions.setLoading(true);

      const state = helpers.getState();
      let query =
        "id=" +
        payload +
        "&language=" +
        state.language +
        "&currentlocationx=&currentlocationy=" +
        "&" +
        UserAccount() +
        "&" +
        CallerData() +
        "&requesttime=" +
        RequestTime();
      const url =
        state.config.kfServerUrl +
        "search/searchdocument?params=" +
        encodeURIComponent(Encrypt(query));
      const response = await axios.get(url);
      const data = await response.data;
      if (data.IsSuccessful) {
        actions.setLoading(false);
        if (data.Result.length === 0) {
          actions.setSnackbarOption({
            message: strings.noresult,
            open: true,
          });
          return;
        }
        actions.setDocument(data.Result[0]);
        actions.fetchShapeJSON(data.Result[0].ID);
      } else {
        actions.setSnackbarOption({
          message: data.Error.ErrorMessage,
          open: true,
        });
        actions.setLoading(false);
      }
      // }, 5000);
    }),
    setDocument: action((state, payload) => {
      state.document = payload;
    }),

    units: null,
    fetchUnits: thunk(async (actions, payload, helpers) => {
      actions.setLoading(true);
      const state = helpers.getState();
      const data = await KFSearchWhatIshere(
        state.config.kfServerUrl,
        payload,
        state.mapExtent,
        state.language
      );
      if (data.IsSuccessful) {
        actions.setLoading(false);
        actions.setUnits(data.Result);
      } else {
        actions.setLoading(false);
        actions.setSnackbarOption({
          message: data.Error.ErrorMessage,
          open: true,
        });
      }
    }),
    setUnits: action((state, payload) => {
      state.units = payload;
    }),

    shapeJSON: null,
    fetchShapeJSON: thunk(async (actions, payload, helpers) => {
      const state = helpers.getState();

      let query =
        "id=" +
        payload +
        "&language=ar&currentlocationx=&currentlocationy=" +
        "&" +
        UserAccount() +
        "&" +
        CallerData() +
        "&requesttime=" +
        RequestTime();
      const url =
        state.config.kfServerUrl +
        "search/searchgeometry?params=" +
        encodeURIComponent(Encrypt(query));
      const response = await axios.get(url);
      const data = await response.data;
      if (data.IsSuccessful) actions.setShapeJSON(data.Result);
      else {
        actions.setSnackbarOption({
          message: data.Error.ErrorMessage,
          open: true,
        });
      }
    }),
    setShapeJSON: action((state, payload) => {
      state.shapeJSON = payload;
    }),

    identify: null,
    fetchIdentify: thunk(async (actions, payload, helpers) => {
      const state = helpers.getState();
      const data = await KFIdentify(
        state.config.kfServerUrl,
        payload.x,
        payload.y,
        state.mapScale,
        state.mapExtent,
        state.language
      );

      if (data.IsSuccessful) {
        if (data.Result.length > 0) {
          actions.fetchShapeJSON(data.Result[0].ID);
        } else {
          actions.setSnackbarOption({ message: strings.noresult, open: true });
        }
      } else {
        actions.setSnackbarOption({
          message: data.Error.ErrorMessage,
          open: true,
        });
      }

      return data;
    }),
    setIdentify: action((state, payload) => {
      state.identify = payload;
    }),

    snackbarOption: { message: "", open: false },
    setSnackbarOption: action((state, payload) => {
      state.snackbarOption = payload;
    }),

    isMobile: false,
    setIsMobile: action((state, payload) => {
      state.isMobile = payload;
    }),

    tabValue: 0,
    setTabValue: action((state, payload) => {
      state.tabValue = payload;
    }),

    mainFrameEstablishments: null,
    setMainFrameEstablishments: action((state, payload) => {
      state.mainFrameEstablishments = payload;
    }),
    fetchMainFrameEstablishments: thunk(async (actions, payload, helpers) => {
      actions.setLoading(true);
      actions.setMainFrameEstablishments(null);
      const state = helpers.getState();
      const url =
        state.config.PACIApplicationServer + "JGetMainFrameEstablishment";
      const body = {
        aUserAccount: null,
        aEstablishmentCivilID: payload,
        aReturnUnitsFlag: false,
      };

      const response = await axios.post(url, body, {
        headers: {
          AuthToken:
            "Basic " +
            (await GenerateToken(
              state.config.PACIApplicationServer,
              state.config.PACIApplicationServercredentials
            )),
        },
      });

      if (response.status === 204) {
        actions.setSnackbarOption({ message: "Invalid Token", open: true });
        return;
      }

      const data = response.data;
      if (data.IsSuccessful) {
        actions.setMainFrameEstablishments(data.Result);
        if (data.Result && data.Result.CurrentAddress)
          actions.fetchEstablishmentsAddress(
            data.Result.CurrentAddress.UnitCivilID
          );
      } else
        actions.setSnackbarOption({ message: data.ErrorMessage, open: true });

      actions.setLoading(false);
    }),

    establishmentsAddress: null,
    fetchEstablishmentsAddress: thunk(async (actions, payload, helpers) => {
      actions.setLoading(true);
      const state = helpers.getState();

      const data = await KFSearch(
        state.config.kfServerUrl,
        payload,
        state.startIndex,
        state.mapExtent,
        state.pageSize,
        state.language
      );

      if (data.IsSuccessful) {
        actions.setLoading(false);
        if (data.Result.length === 0) {
          actions.setSnackbarOption({ message: strings.noresult, open: true });
          return;
        }
        actions.setEstablishmentsAddress(data.Result);
        actions.fetchShapeJSON(data.Result[0].ID);
      } else {
        actions.setLoading(false);
      }
    }),
    setEstablishmentsAddress: action((state, payload) => {
      state.establishmentsAddress = payload;
    }),

    openEstablishmentInfo: false,
    setOpenEstablishmentInfo: action((state, payload) => {
      state.openEstablishmentInfo = payload;
    }),

    mainFrameEstablishmentSearch: null,
    setMainFrameEstablishmentSearch: action((state, payload) => {
      state.mainFrameEstablishmentSearch = payload;
    }),
    fetchMainFrameEstablishmentSearch: thunk(
      async (actions, payload, helpers) => {
        actions.setLoading(true);
        actions.setMainFrameEstablishmentSearch(null);
        const state = helpers.getState();
        const url = state.config.PACIApplicationServer + "JEstablishmentSearch";
        const body = {
          aUserAccount: null,
          aAddressCivilID: payload,
        };

        const response = await axios.post(url, body, {
          headers: {
            AuthToken:
              "Basic " +
              (await GenerateToken(
                state.config.PACIApplicationServer,
                state.config.PACIApplicationServercredentials
              )),
          },
        });
        const data = response.data;
        if (data) {
          actions.setMainFrameEstablishmentSearch(data[0]);
          actions.setOpenEstablishmentInfo(true);
        } else
          actions.setSnackbarOption({ message: data.ErrorMessage, open: true });

        actions.setLoading(false);
      }
    ),
  },
};

export default model;
