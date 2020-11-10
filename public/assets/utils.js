(function (react, i18next, Axios, reactI18next, ReactPostprocessor) {
  i18next = i18next && Object.prototype.hasOwnProperty.call(i18next, "default") ? i18next["default"] : i18next;
  Axios = Axios && Object.prototype.hasOwnProperty.call(Axios, "default") ? Axios["default"] : Axios;
  ReactPostprocessor =
    ReactPostprocessor && Object.prototype.hasOwnProperty.call(ReactPostprocessor, "default") ? ReactPostprocessor["default"] : ReactPostprocessor;

  function _extends() {
    _extends =
      Object.assign ||
      function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

    return _extends.apply(this, arguments);
  }

  var ifObjectContainsArray = function ifObjectContainsArray(object) {
    if (Array.isArray(object)) {
      return {
        hasArray: true,
        value: object,
      };
    }

    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        var element = object[property];

        if (Array.isArray(element)) {
          return {
            hasArray: true,
            value: element,
          };
        }
      }
    }

    return {
      hasArray: false,
      value: [],
    };
  };

  var defaultConfigCopy = {};
  var sectionToBeUpdated = {};
  var currentUpdatableSection = [];
  var selectedProperty = "";

  var MergeConfigObj = function MergeConfigObj(defaultConfig, deltaConfig) {
    defaultConfigCopy = JSON.parse(JSON.stringify(defaultConfig));
    var deltaConfigCopy = JSON.parse(JSON.stringify(deltaConfig));
    processStateConfig(deltaConfigCopy);
    return defaultConfigCopy;
  };

  var processStateConfig = function processStateConfig(deltaConfig) {
    if (Array.isArray(deltaConfig)) {
      deltaConfig.forEach(function (forms) {
        sectionToBeUpdated = {};
        InitSectionToUpdate(forms);
      });
    }
  };

  var InitSectionToUpdate = function InitSectionToUpdate(forms) {
    if (forms.id && !forms.__property__) {
      GetCurrentUpdatableSection(forms.id, defaultConfigCopy);
    }

    if (forms.__property__ && forms.__action__) {
      selectedProperty = forms.__property__;
      currentUpdatableSection = currentUpdatableSection.length === 0 ? defaultConfigCopy : currentUpdatableSection;
      findSectionById(selectedProperty, currentUpdatableSection);
      seachInDefaultConfig(forms.__property__, forms);
    } else if (Array.isArray(forms)) {
      forms.forEach(function (form) {
        InitSectionToUpdate(form);
      });
    } else if (ifObjectContainsArray(forms).hasArray) {
      var array = ifObjectContainsArray(forms).value;
      InitSectionToUpdate(array);
    } else {
      throw new Error("__property__ or  __action__ not found");
    }
  };

  var GetCurrentUpdatableSection = function GetCurrentUpdatableSection(id, defaultConfigCopy) {
    if (Array.isArray(defaultConfigCopy)) {
      for (var i = 0; i < defaultConfigCopy.length; i++) {
        if (defaultConfigCopy[i].id === id) {
          currentUpdatableSection.push(defaultConfigCopy[i]);
        } else if (ifObjectContainsArray(defaultConfigCopy[i]).hasArray) {
          var array = ifObjectContainsArray(defaultConfigCopy[i]).value;
          GetCurrentUpdatableSection(id, array);
        }
      }
    }
  };

  var findSectionById = function findSectionById(id, currentUpdatableSection) {
    if (Array.isArray(currentUpdatableSection)) {
      for (var i = 0; i < currentUpdatableSection.length; i++) {
        if (currentUpdatableSection[i].id === id) {
          sectionToBeUpdated = currentUpdatableSection;
        } else if (ifObjectContainsArray(currentUpdatableSection[i]).hasArray) {
          var arr = ifObjectContainsArray(currentUpdatableSection[i]).value;
          findSectionById(id, arr);
        }
      }
    }

    return sectionToBeUpdated;
  };

  var seachInDefaultConfig = function seachInDefaultConfig(id, action) {
    if (!Array.isArray(sectionToBeUpdated) && !sectionToBeUpdated.id) {
      throw new Error("id not found");
    }

    if (sectionToBeUpdated.id === id) {
      actionHandler(action, id, sectionToBeUpdated);
    } else if (Array.isArray(sectionToBeUpdated)) {
      sectionToBeUpdated.forEach(function (section) {
        if (section.id === id) {
          actionHandler(action, id, sectionToBeUpdated);
        }
      });
    } else if (ifObjectContainsArray(sectionToBeUpdated).hasArray) {
      sectionToBeUpdated = ifObjectContainsArray(sectionToBeUpdated).value;
      seachInDefaultConfig(id, action);
    }
  };

  var actionHandler = function actionHandler(action, id, fieldList) {
    var index = getIndex(id, fieldList);

    if (!action) {
      console.log("no action found");
      return;
    }

    if (action.__action__ === "UPDATE") {
      updateAt(index, action, fieldList);
      deleteExtraKeys(action);
    }

    if (action.__action__ === "DELETE") {
      deleteAt(index, fieldList);
      deleteExtraKeys(action);
    }

    if (["INSERT_AFTER", "INSERT_BEFORE"].includes(action.__action__)) {
      handleInsertion(index, action, fieldList);
    }
  };

  var handleInsertion = function handleInsertion(index, action, fields) {
    index = action.__action__ === "INSERT_BEFORE" ? index : index + 1;
    insertAt(index, action, fields);
    deleteExtraKeys(action);
  };

  var getIndex = function getIndex(propertyValue, fields) {
    var index = fields.findIndex(function (option) {
      return option.id === propertyValue;
    });
    return index;
  };

  var insertAt = function insertAt(index, data, fields) {
    if (!data.id) {
      throw new Error("id is required is required to insert a record");
    }

    fields.splice(index, 0, data);
  };

  var updateAt = function updateAt(index, data, fields) {
    if (fields[index].id !== data.id) {
      throw new Error("id " + data.id + " not matched");
    }

    fields[index] = _extends({}, fields[index], data);
  };

  var deleteAt = function deleteAt(index, fields) {
    fields.splice(index, 1);
  };

  var deleteExtraKeys = function deleteExtraKeys(data) {
    delete data.__action__;
    delete data.__property__;
  };

  var getMergedConfig = function getMergedConfig(defaultConfig, deltaConfig) {
    var mergedConfigObj = defaultConfig;

    for (var key in deltaConfig) {
      if (deltaConfig.hasOwnProperty(key)) {
        var mergedConfig = MergeConfigObj(defaultConfig[key], deltaConfig[key]);
        mergedConfigObj[key] = mergedConfig;
      }
    }

    return mergedConfigObj;
  };

  var Urls = {
    MDMS: "/egov-mdms-service/v1/_search",
    localization: "/localization/messages/v1/_search",
    location: {
      localities: "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=ADMIN&boundaryType=Locality",
    },
  };

  var localStoreSupport = function localStoreSupport() {
    try {
      return "sessionStorage" in window && window["sessionStorage"] !== null;
    } catch (e) {
      return false;
    }
  };

  var storageClass = window.sessionStorage;

  var k = function k(key) {
    return "eGov.Rainmaker." + key;
  };

  var Storage = {
    get: function get(key) {
      if (localStoreSupport() && key) {
        var valueInStorage = storageClass.getItem(k(key));
        return valueInStorage && valueInStorage !== "undefined" ? JSON.parse(valueInStorage) : null;
      } else if (typeof window !== "undefined") {
        return window && window.eGov && window.eGov.Storage && window.eGov.Storage[k(key)];
      } else {
        return null;
      }
    },
    set: function set(key, value) {
      if (localStoreSupport()) {
        storageClass.setItem(k(key), JSON.stringify(value));
      } else if (typeof window !== "undefined") {
        window.eGov = window.eGov || {};
        window.eGov.Storage = window.eGov.Storage || {};
        window.eGov.Storage[k(key)] = value;
      }
    },
    del: function del(key) {
      if (localStoreSupport()) {
        storageClass.removeItem(k(key));
      } else if (typeof window !== "undefined") {
        window.eGov = window.eGov || {};
        window.eGov.Storage = window.eGov.Storage || {};
        delete window.eGov.Storage[k(key)];
      }
    },
  };

  Axios.interceptors.request.use(function (req) {
    document.body.classList.add("loader");
    return req;
  });
  Axios.interceptors.response.use(function (res) {
    document.body.classList.remove("loader");
    return res;
  });
  var Request = function Request(_ref) {
    var _ref$method = _ref.method,
      method = _ref$method === void 0 ? "POST" : _ref$method,
      url = _ref.url,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      _ref$useCache = _ref.useCache,
      useCache = _ref$useCache === void 0 ? false : _ref$useCache,
      _ref$params = _ref.params,
      params = _ref$params === void 0 ? {} : _ref$params;

    try {
      var key = "";

      if (method.toUpperCase() === "POST") {
        data.RequestInfo = {
          apiId: "Rainmaker",
        };
      }

      if (useCache) {
        key = method.toUpperCase() + "." + url + "." + JSON.stringify(params, null, 0) + "." + JSON.stringify(data, null, 0);
        var value = Storage.get(key);

        if (value) {
          return Promise.resolve(value);
        }
      } else {
        params._ = Date.now();
      }

      return Promise.resolve(
        Axios({
          method: method,
          url: url,
          data: data,
          params: params,
        })
      ).then(function (res) {
        if (useCache) {
          Storage.set(key, res.data);
        }

        return res.data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var LOCALE_LIST = function LOCALE_LIST(locale) {
    return "Locale." + locale + ".List";
  };

  var LOCALE_MODULE = function LOCALE_MODULE(locale, module) {
    return "Locale." + locale + "." + module;
  };

  var TransformArrayToObj = function TransformArrayToObj(traslationList) {
    return traslationList.reduce(function (obj, item) {
      return (obj[item.code] = item.message), obj;
    }, {});
  };

  var LocalizationStore = {
    getList: function getList(locale) {
      return Storage.get(LOCALE_LIST(locale)) || [];
    },
    store: function store(locale, modules, messages) {
      modules.forEach(function (module) {
        var Locales = LocalizationStore.getList(locale);

        if (!Locales.includes(module)) {
          Locales.push(module);
          Storage.set(LOCALE_LIST(locale), Locales);
          var moduleMessages = messages.filter(function (message) {
            return message.module === module;
          });
          Storage.set(LOCALE_MODULE(locale, module), moduleMessages);
        }
      });
    },
    get: function get(locale, modules) {
      var storedModules = LocalizationStore.getList(locale);
      var newModules = modules.filter(function (module) {
        return !storedModules.includes(module);
      });
      var messages = [];
      storedModules.forEach(function (module) {
        messages.push.apply(messages, Storage.get(LOCALE_MODULE(locale, module)));
      });
      return [newModules, messages];
    },
    updateResources: function updateResources(locale, messages) {
      var locales = TransformArrayToObj(messages);
      i18next.addResources(locale.split("_")[0], "translations", locales);
    },
  };
  var LocalizationService = {
    getLocale: function (_ref) {
      var _ref$modules = _ref.modules,
        modules = _ref$modules === void 0 ? [] : _ref$modules,
        _ref$locale = _ref.locale,
        locale = _ref$locale === void 0 ? "en_IN" : _ref$locale,
        tenantId = _ref.tenantId;

      try {
        var _temp3 = function _temp3() {
          LocalizationStore.store(locale, modules, messages);
          LocalizationStore.updateResources(locale, messages);
          return messages;
        };

        if (locale.indexOf("_IN") === -1) {
          locale += "_IN";
        }

        var _LocalizationStore$ge = LocalizationStore.get(locale, modules),
          newModules = _LocalizationStore$ge[0],
          messages = _LocalizationStore$ge[1];

        var _temp4 = (function () {
          if (newModules.length > 0) {
            return Promise.resolve(
              Request({
                url: Urls.localization,
                params: {
                  module: newModules.join(","),
                  locale: locale,
                  tenantId: tenantId,
                },
                useCache: false,
              })
            ).then(function (data) {
              messages.push.apply(messages, data.messages);
            });
          }
        })();

        return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
      } catch (e) {
        return Promise.reject(e);
      }
    },
  };

  var SortByName = function SortByName(na, nb) {
    if (na < nb) {
      return -1;
    }

    if (na > nb) {
      return 1;
    }

    return 0;
  };
  var GetCitiesWithi18nKeys = function GetCitiesWithi18nKeys(MdmsRes, moduleCode) {
    var cityList =
      (MdmsRes.tenant.citymodule &&
        MdmsRes.tenant.citymodule.filter(function (module) {
          return module.code === moduleCode;
        })[0].tenants) ||
      [];
    var citiesMap = cityList.map(function (city) {
      return city.code;
    });
    var cities = MdmsRes.tenant.tenants
      .filter(function (city) {
        return citiesMap.includes(city.code);
      })
      .map(function (_ref) {
        var code = _ref.code,
          name = _ref.name,
          logoId = _ref.logoId,
          emailId = _ref.emailId,
          address = _ref.address,
          contactNumber = _ref.contactNumber;
        return {
          code: code,
          name: name,
          logoId: logoId,
          emailId: emailId,
          address: address,
          contactNumber: contactNumber,
          i18nKey: "TENANT_TENANTS_" + code.replace(".", "_").toUpperCase(),
        };
      })
      .sort(function (cityA, cityB) {
        var na = cityA.name.toLowerCase(),
          nb = cityB.name.toLowerCase();
        return SortByName(na, nb);
      });
    return cities;
  };

  var initRequestBody = function initRequestBody(tenantId) {
    return {
      MdmsCriteria: {
        tenantId: tenantId,
        moduleDetails: [
          {
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "Department",
              },
              {
                name: "Designation",
              },
              {
                name: "StateInfo",
              },
            ],
          },
          {
            moduleName: "tenant",
            masterDetails: [
              {
                name: "tenants",
              },
              {
                name: "citymodule",
              },
            ],
          },
        ],
      },
    };
  };

  var getCriteria = function getCriteria(_ref) {
    var tenantId = _ref.tenantId,
      moduleDetails = _ref.moduleDetails;
    return {
      MdmsCriteria: {
        tenantId: tenantId,
        moduleDetails: moduleDetails,
      },
    };
  };

  var GetEgovLocations = function GetEgovLocations(MdmsRes) {
    return MdmsRes["egov-location"].TenantBoundary[0].boundary.children.map(function (obj) {
      return {
        name: obj.localname,
        i18nKey: obj.localname,
      };
    });
  };

  var transformResponse = function transformResponse(type, MdmsRes, moduleCode) {
    if (moduleCode === void 0) {
      moduleCode = "PGR";
    }

    switch (type) {
      case "citymodule":
        return GetCitiesWithi18nKeys(MdmsRes, moduleCode);

      case "egovLocation":
        return GetEgovLocations(MdmsRes);

      default:
        return MdmsRes;
    }
  };

  var MdmsService = {
    init: function init(stateCode) {
      if (stateCode === void 0) {
        stateCode = "pb";
      }

      return Request({
        url: Urls.MDMS,
        data: initRequestBody(stateCode),
        useCache: true,
        method: "POST",
        params: {
          tenantId: stateCode,
        },
      });
    },
    call: function call(details, stateCode) {
      if (stateCode === void 0) {
        stateCode = "pb";
      }

      return Request({
        url: Urls.MDMS,
        data: getCriteria(details),
        useCache: true,
        method: "POST",
        params: {
          tenantId: stateCode,
        },
      });
    },
    getDataByCriteria: function (mdmsDetails) {
      try {
        var moduleCode = "PGR";
        return Promise.resolve(MdmsService.call(mdmsDetails.details)).then(function (_ref2) {
          var MdmsRes = _ref2.MdmsRes;
          return transformResponse(mdmsDetails.type, MdmsRes, moduleCode);
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
  };

  var StoreService = {
    defaultData: function (stateCode, cityCode, moduleCode) {
      try {
        return Promise.resolve(MdmsService.init(stateCode)).then(function (_ref) {
          var MdmsRes = _ref.MdmsRes;
          var stateInfo = MdmsRes["common-masters"].StateInfo[0];
          var cities = GetCitiesWithi18nKeys(MdmsRes, moduleCode);
          var defaultData = {
            languages: stateInfo.hasLocalisation
              ? stateInfo.languages
              : [
                  {
                    label: "ENGLISH",
                    value: "en_IN",
                  },
                ],
            stateInfo: {
              code: stateInfo.code,
              name: stateInfo.name,
              logoUrl: stateInfo.logoUrl,
            },
            cities: cities,
            cityCode: cityCode,
          };
          return Promise.resolve(
            LocalizationService.getLocale({
              modules: [
                "rainmaker-common",
                "rainmaker-" + moduleCode.toLowerCase(),
                "rainmaker-" + stateCode.toLowerCase(),
                "rainmaker-" + cityCode.toLowerCase(),
              ],
              locale: defaultData.languages[0].value,
              tenantId: stateCode,
            })
          ).then(function (_LocalizationService$) {
            defaultData.locales = _LocalizationService$;
            return defaultData;
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
  };

  var useStore = function useStore(defaultConfig, _ref) {
    var deltaConfig = _ref.deltaConfig,
      stateCode = _ref.stateCode,
      cityCode = _ref.cityCode,
      moduleCode = _ref.moduleCode;

    var _useState = react.useState({}),
      defaultStore = _useState[0],
      setDefaultStore = _useState[1];

    react.useEffect(
      function () {
        var config = window.eGov.Config.mergeConfig(defaultConfig, deltaConfig);
        StoreService.defaultData(stateCode, cityCode, moduleCode).then(function (defaultData) {
          var store = _extends(
            {
              config: config,
            },
            defaultData
          );

          console.log("store:", store);
          setDefaultStore(store);
        });
      },
      [defaultConfig, deltaConfig, stateCode, cityCode, moduleCode]
    );
    return defaultStore;
  };

  var i18nextConfig = {
    lng: "en",
    fallbackLng: "en",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    saveMissing: false,
    saveMissingTo: "current",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    postProcess: ["reactPostprocessor"],
    react: {
      wait: true,
      useSuspense: true,
      bindI18n: "loaded",
      bindI18nStore: "added",
    },
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
        },
      },
    },
  };
  var initI18n = function initI18n() {
    i18next.use(new ReactPostprocessor()).use(reactI18next.initReactI18next).init(i18nextConfig);
  };

  var initUtils = function initUtils(Util, props) {
    window.eGov = window.eGov || {};
    window.eGov[Util] = window.eGov[Util] || {};
    window.eGov[Util] = _extends({}, window.eGov[Util], props);
  };

  initUtils("Config", {
    mergeConfig: getMergedConfig,
  });
  initUtils("Services", {
    useStore: useStore,
  });
  initUtils("Translation", {
    initI18n: initI18n,
  });
})(React, i18next, axios, reactI18next, ReactPostprocessor);
//# sourceMappingURL=utils.js.map
