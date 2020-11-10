var moduleSample = (function (React, reactRedux, redux, thunk, reactRouterDom, reactI18next, reactHookForm, Axios, i18next, ReactPostprocessor) {
  var React__default = "default" in React ? React["default"] : React;
  var redux__default = "default" in redux ? redux["default"] : redux;
  thunk = thunk && Object.prototype.hasOwnProperty.call(thunk, "default") ? thunk["default"] : thunk;
  Axios = Axios && Object.prototype.hasOwnProperty.call(Axios, "default") ? Axios["default"] : Axios;
  i18next = i18next && Object.prototype.hasOwnProperty.call(i18next, "default") ? i18next["default"] : i18next;
  ReactPostprocessor =
    ReactPostprocessor && Object.prototype.hasOwnProperty.call(ReactPostprocessor, "default") ? ReactPostprocessor["default"] : ReactPostprocessor;

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }

  function createCommonjsModule(fn, module) {
    return (module = { exports: {} }), fn(module, module.exports), module.exports;
  }

  var reduxDevtoolsExtension = createCommonjsModule(function (module, exports) {
    var compose = redux__default.compose;

    exports.__esModule = true;
    exports.composeWithDevTools =
      typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : function () {
            if (arguments.length === 0) return undefined;
            if (typeof arguments[0] === "object") return compose;
            return compose.apply(null, arguments);
          };

    exports.devToolsEnhancer =
      typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__
        : function () {
            return function (noop) {
              return noop;
            };
          };
  });

  unwrapExports(reduxDevtoolsExtension);
  var reduxDevtoolsExtension_1 = reduxDevtoolsExtension.composeWithDevTools;

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

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var ConfigActionTypes = Object.freeze({
    CONFIG_UPDATE: "CONFIG_UPDATE",
  });

  var FETCH_LOCALITIES = "FETCH_LOCALITIES";
  var CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

  var configReducer = function configReducer(defaultConfig) {
    return function (state, action) {
      if (state === void 0) {
        state = defaultConfig;
      }

      switch (action.type) {
        case ConfigActionTypes.CONFIG_UPDATE:
          return [].concat(state, [action.payload]);

        default:
          return state;
      }
    };
  };

  var languageReducer = function languageReducer(defaultLanguages) {
    return function (state, action) {
      if (state === void 0) {
        state = defaultLanguages;
      }

      switch (action.type) {
        case "FETCH_LANGUAGES":
          return _extends({}, state, {
            languages: [].concat(action.payload),
          });

        default:
          return state;
      }
    };
  };

  var formDataReducer = function formDataReducer(state, action) {
    var _extends2, _extends3;

    if (state === void 0) {
      state = {};
    }

    switch (action.type) {
      case "UPDATE_REPEAT":
        var stateKey = action.payload.field + "-repeats";
        var prevValue = state[stateKey] || 1;
        return _extends({}, state, ((_extends2 = {}), (_extends2[stateKey] = prevValue + 1), _extends2));

      case "UPDATE_FEILD":
        return _extends({}, state, ((_extends3 = {}), (_extends3[action.payload.field] = action.payload.value), _extends3));

      default:
        return state;
    }
  };

  var cityReducer = function cityReducer(defaultCities) {
    return function (state, action) {
      if (state === void 0) {
        state = defaultCities;
      }

      switch (action.type) {
        default:
          return state;
      }
    };
  };

  var localityReducer = function localityReducer(state, action) {
    if (state === void 0) {
      state = [];
    }

    switch (action.type) {
      case FETCH_LOCALITIES:
        return _extends({}, state, {
          localityList: action.payload.localityList,
        });

      default:
        return state;
    }
  };

  var localeReducer = function localeReducer(defaultLocales) {
    return function (state, action) {
      if (state === void 0) {
        state = defaultLocales;
      }

      switch (action.type) {
        default:
          return state;
      }
    };
  };

  var currentLanguageReducer = function currentLanguageReducer(state, action) {
    if (state === void 0) {
      state = {};
    }

    console.log("lang action", action);

    switch (action.type) {
      case CHANGE_LANGUAGE:
        return _extends({}, state, {
          language: action.payload,
        });

      default:
        return state;
    }
  };

  var cityCodeReducer = function cityCodeReducer(defaultCityCode) {
    return function (state, action) {
      if (state === void 0) {
        state = defaultCityCode;
      }

      return state;
    };
  };

  var stateInfoReducer = function stateInfoReducer(defaultStateInfo) {
    return function (state, action) {
      if (state === void 0) {
        state = defaultStateInfo;
      }

      return state;
    };
  };

  var getRootReducer = function getRootReducer(defaultStore) {
    return redux.combineReducers({
      config: configReducer(defaultStore.config),
      formData: formDataReducer,
      locales: localeReducer(defaultStore.locales),
      cities: cityReducer(defaultStore.cities),
      localities: localityReducer,
      currentLanguage: currentLanguageReducer,
      languages: languageReducer(defaultStore.languages),
      cityCode: cityCodeReducer(defaultStore.cityCode),
      stateInfo: stateInfoReducer(defaultStore.stateInfo),
    });
  };

  const middleware = [thunk];

  const getStore = (defaultStore) => {
    return redux.createStore(getRootReducer(defaultStore), reduxDevtoolsExtension_1(redux.applyMiddleware(...middleware)));
  };

  var Pages = Object.freeze({
    PGR_LIST: "pgr-list",
    PGR_NEW_COMPLAINT: "pgr-new-complaint",
    PGR_SEARCH: "pgr-search-complaint",
  });

  var data = {
    Properties: [
      {
        id: "970a5a08-b656-41d1-9a8b-dc3f51a2dea1",
        propertyId: "PB-PT-2020-08-11-006127",
        surveyId: null,
        linkedProperties: null,
        tenantId: "pb.amritsar",
        accountId: "5d586898-31a6-46d6-8409-92fc2a4e5edf",
        oldPropertyId: null,
        status: "INWORKFLOW",
        address: {
          tenantId: "pb.amritsar",
          doorNo: null,
          plotNo: null,
          id: "1c93e25a-dcdd-42ab-ac13-87222fc9e646",
          landmark: null,
          city: "Amritsar",
          district: null,
          region: null,
          state: null,
          country: null,
          pincode: null,
          buildingName: null,
          street: null,
          locality: {
            code: "SUN04",
            name: "Ajit Nagar - Area1",
            label: "Locality",
            latitude: null,
            longitude: null,
            area: "Area1",
            children: [],
            materializedPath: null,
          },
          geoLocation: {
            latitude: 0.0,
            longitude: 0.0,
          },
          additionalDetails: null,
        },
        acknowldgementNumber: "PB-AC-2020-08-11-005699",
        propertyType: "BUILTUP.SHAREDPROPERTY",
        ownershipCategory: "INDIVIDUAL.SINGLEOWNER",
        owners: [
          {
            id: null,
            uuid: "48f94b18-6578-4ad7-bdf5-d538c24b7f51",
            userName: "dab095c5-a5f6-4325-9811-ee6eb3a61cd4",
            password: null,
            salutation: null,
            name: "test",
            gender: "MALE",
            mobileNumber: "9113689766",
            emailId: null,
            altContactNumber: null,
            pan: null,
            aadhaarNumber: null,
            permanentAddress: null,
            permanentCity: null,
            permanentPinCode: null,
            correspondenceCity: null,
            correspondencePinCode: null,
            correspondenceAddress: null,
            active: true,
            dob: 541967400000,
            pwdExpiryDate: 1593013701000,
            locale: null,
            type: "CITIZEN",
            signature: null,
            accountLocked: false,
            roles: [
              {
                id: null,
                name: "Citizen",
                code: "CITIZEN",
                tenantId: "pb",
              },
            ],
            fatherOrHusbandName: "test",
            bloodGroup: null,
            identificationMark: null,
            photo: null,
            createdBy: "2676",
            createdDate: 1584703101000,
            lastModifiedBy: "1",
            lastModifiedDate: 1601559060000,
            tenantId: "pb",
            ownerInfoUuid: "e360c0e3-f15b-43fd-885f-9c27fc6e601c",
            isPrimaryOwner: null,
            ownerShipPercentage: null,
            ownerType: "NONE",
            institutionId: null,
            status: "ACTIVE",
            documents: null,
            relationship: "FATHER",
          },
        ],
        institution: null,
        creationReason: "CREATE",
        usageCategory: "NONRESIDENTIAL.COMMERCIAL",
        noOfFloors: 1,
        landArea: null,
        superBuiltUpArea: 384.0,
        source: "MUNICIPAL_RECORDS",
        channel: "CFC_COUNTER",
        documents: [
          {
            id: "b1f2532c-6f90-4392-b349-211ef7cfc231",
            documentType: "OWNER.ADDRESSPROOF.ELECTRICITYBILL",
            fileStoreId: "fcb0523e-382e-44c3-906e-ce53ec5f96a1",
            documentUid: "fcb0523e-382e-44c3-906e-ce53ec5f96a1",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "cc83a7ae-cdb5-44dc-b76c-de0a1f179479",
            documentType: "OWNER.OCCUPANCYPROOF.RENTAGREEMENT",
            fileStoreId: "6c76afa9-4e37-4d87-ae4c-c02ccf6abec0",
            documentUid: "6c76afa9-4e37-4d87-ae4c-c02ccf6abec0",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "267daa10-8926-473a-9e84-c6f3d885f6db",
            documentType: "OWNER.CONSTRUCTIONPROOF.BPACERTIFICATE",
            fileStoreId: "62f4856f-3154-425e-8fd3-7f91be02328c",
            documentUid: "62f4856f-3154-425e-8fd3-7f91be02328c",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "e361b811-24ba-495d-9185-7b8295cdbbc1",
            documentType: "OWNER.USAGEPROOF.TRADELICENCE",
            fileStoreId: "3f39824b-a935-46f0-91e0-e03cf0e41e4e",
            documentUid: "3f39824b-a935-46f0-91e0-e03cf0e41e4e",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "cc6ccf68-9220-4090-a39a-39f4122c3441",
            documentType: "OWNER.REGISTRATIONPROOF.SALEDEED",
            fileStoreId: "376e926b-2323-4a84-b70c-9ab9264e1d8b",
            documentUid: "376e926b-2323-4a84-b70c-9ab9264e1d8b",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "61f2a195-0e88-485f-80da-cd5f3e646a2f",
            documentType: "OWNER.IDENTITYPROOF.AADHAAR",
            fileStoreId: "18000e71-f279-4837-b370-68eac1cf51b3",
            documentUid: "18000e71-f279-4837-b370-68eac1cf51b3",
            auditDetails: null,
            status: "ACTIVE",
          },
        ],
        units: [
          {
            id: "57d9f8f3-47da-4b5e-9ce2-5d340a42855a",
            tenantId: null,
            floorNo: 1,
            unitType: "ACRESTAURANT",
            usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
            occupancyType: "RENTED",
            active: true,
            occupancyDate: 0,
            constructionDetail: {
              carpetArea: null,
              builtUpArea: 384.0,
              plinthArea: null,
              superBuiltUpArea: null,
              constructionType: null,
              constructionDate: 0,
              dimensions: null,
            },
            additionalDetails: null,
            auditDetails: null,
            arv: 4567,
          },
        ],
        additionalDetails: null,
        auditDetails: {
          createdBy: "5d586898-31a6-46d6-8409-92fc2a4e5edf",
          lastModifiedBy: "626667ba-673b-4ad2-8a23-8afd8e2aae5a",
          createdTime: 1601794187699,
          lastModifiedTime: 1601794187699,
        },
        workflow: null,
      },
      {
        id: "34e75962-1337-42d1-994e-f65c77f8e7a6",
        propertyId: "PB-PT-2020-07-16-005891",
        surveyId: null,
        linkedProperties: null,
        tenantId: "pb.amritsar",
        accountId: "f90534e4-e8f1-4564-8c65-f521999c0861",
        oldPropertyId: null,
        status: "INWORKFLOW",
        address: {
          tenantId: "pb.amritsar",
          doorNo: "13/3",
          plotNo: null,
          id: "09cac000-f579-444e-aa72-52dfe0646f6f",
          landmark: null,
          city: "Amritsar",
          district: null,
          region: null,
          state: null,
          country: null,
          pincode: null,
          buildingName: null,
          street: null,
          locality: {
            code: "SUN04",
            name: "Ajit Nagar - Area1",
            label: "Locality",
            latitude: null,
            longitude: null,
            area: "Area1",
            children: [],
            materializedPath: null,
          },
          geoLocation: {
            latitude: 0.0,
            longitude: 0.0,
          },
          additionalDetails: null,
        },
        acknowldgementNumber: "PB-AC-2020-07-16-005425",
        propertyType: "BUILTUP.SHAREDPROPERTY",
        ownershipCategory: "INDIVIDUAL.SINGLEOWNER",
        owners: [
          {
            id: null,
            uuid: "fb488a48-e0a9-4cf2-9296-de9c1e100ee5",
            userName: "8897542103",
            password: null,
            salutation: null,
            name: "Minu",
            gender: "FEMALE",
            mobileNumber: "8897542103",
            emailId: null,
            altContactNumber: null,
            pan: null,
            aadhaarNumber: null,
            permanentAddress: "13/3, Ajit Nagar - Area1, amritsar",
            permanentCity: null,
            permanentPinCode: null,
            correspondenceCity: null,
            correspondencePinCode: null,
            correspondenceAddress: null,
            active: true,
            dob: null,
            pwdExpiryDate: 1601959798000,
            locale: null,
            type: "CITIZEN",
            signature: null,
            accountLocked: false,
            roles: [
              {
                id: null,
                name: "Citizen",
                code: "CITIZEN",
                tenantId: "pb",
              },
            ],
            fatherOrHusbandName: "Ramesh",
            bloodGroup: null,
            identificationMark: null,
            photo: null,
            createdBy: "3434",
            createdDate: 1594183798000,
            lastModifiedBy: "1",
            lastModifiedDate: 1601289974000,
            tenantId: "pb",
            ownerInfoUuid: "a406188d-6ac0-407f-b513-9ffe54fad28d",
            isPrimaryOwner: null,
            ownerShipPercentage: null,
            ownerType: "NONE",
            institutionId: null,
            status: "ACTIVE",
            documents: null,
            relationship: "FATHER",
          },
        ],
        institution: null,
        creationReason: "CREATE",
        usageCategory: "NONRESIDENTIAL.COMMERCIAL",
        noOfFloors: 3,
        landArea: null,
        superBuiltUpArea: 133.34,
        source: "MUNICIPAL_RECORDS",
        channel: "CFC_COUNTER",
        documents: [
          {
            id: "562853a7-7bc2-4253-a2e0-7e9b926cdbbf",
            documentType: "OWNER.OCCUPANCYPROOF.RENTAGREEMENT",
            fileStoreId: "cd909ce6-cb6a-4d10-862b-a6893107a616",
            documentUid: "cd909ce6-cb6a-4d10-862b-a6893107a616",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "336fbfd9-a15b-4864-94f7-74533141b81c",
            documentType: "OWNER.ADDRESSPROOF.ELECTRICITYBILL",
            fileStoreId: "ccd3be88-86a8-47dc-a9da-301c51de1255",
            documentUid: "ccd3be88-86a8-47dc-a9da-301c51de1255",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "5f59060d-f1bd-41a8-ab68-4a83807c2aec",
            documentType: "OWNER.IDENTITYPROOF.VOTERID",
            fileStoreId: "4a8c515b-2a23-4c14-a48d-868fc051e36d",
            documentUid: "4a8c515b-2a23-4c14-a48d-868fc051e36d",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "912a39e8-57f1-4145-b7bd-5099c10b54bc",
            documentType: "OWNER.REGISTRATIONPROOF.GIFTDEED",
            fileStoreId: "9733a259-abd5-4f12-b739-20660430871d",
            documentUid: "9733a259-abd5-4f12-b739-20660430871d",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "7be34af0-5b68-40cc-b3f5-df027539df43",
            documentType: "OWNER.USAGEPROOF.TRADELICENCE",
            fileStoreId: "7c54b960-8b3c-4ae1-b5a3-c238b1f65539",
            documentUid: "7c54b960-8b3c-4ae1-b5a3-c238b1f65539",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "71b0908f-5c50-4408-974c-0a0705450cda",
            documentType: "OWNER.CONSTRUCTIONPROOF.BPACERTIFICATE",
            fileStoreId: "8a0ec22f-d38b-4058-a85b-c3f94db83509",
            documentUid: "8a0ec22f-d38b-4058-a85b-c3f94db83509",
            auditDetails: null,
            status: "ACTIVE",
          },
        ],
        units: [
          {
            id: "7b699334-a8a7-43a7-906e-d86e74fd6af5",
            tenantId: null,
            floorNo: 1,
            unitType: "ACRESTAURANT",
            usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
            occupancyType: "RENTED",
            active: true,
            occupancyDate: 0,
            constructionDetail: {
              carpetArea: null,
              builtUpArea: 66.68,
              plinthArea: null,
              superBuiltUpArea: null,
              constructionType: null,
              constructionDate: 0,
              dimensions: null,
            },
            additionalDetails: null,
            auditDetails: null,
            arv: 2e5,
          },
          {
            id: "7d3749af-fbe6-4cd4-82c5-d5b9fb961d32",
            tenantId: null,
            floorNo: 1,
            unitType: "ACRESTAURANT",
            usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
            occupancyType: "RENTED",
            active: true,
            occupancyDate: 0,
            constructionDetail: {
              carpetArea: null,
              builtUpArea: 66.67,
              plinthArea: null,
              superBuiltUpArea: null,
              constructionType: null,
              constructionDate: 0,
              dimensions: null,
            },
            additionalDetails: null,
            auditDetails: null,
            arv: 2e5,
          },
        ],
        additionalDetails: null,
        auditDetails: {
          createdBy: "f90534e4-e8f1-4564-8c65-f521999c0861",
          lastModifiedBy: "626667ba-673b-4ad2-8a23-8afd8e2aae5a",
          createdTime: 1594880573014,
          lastModifiedTime: 1594880574164,
        },
        workflow: null,
      },
      {
        id: "6a1fde65-65f1-4313-9aab-05ed5436751c",
        propertyId: "PB-PT-2020-07-16-005889",
        surveyId: null,
        linkedProperties: null,
        tenantId: "pb.amritsar",
        accountId: "f90534e4-e8f1-4564-8c65-f521999c0861",
        oldPropertyId: null,
        status: "INWORKFLOW",
        address: {
          tenantId: "pb.amritsar",
          doorNo: "13/3",
          plotNo: null,
          id: "2ecad39f-7099-4963-ae8c-cde932cf30df",
          landmark: null,
          city: "Amritsar",
          district: null,
          region: null,
          state: null,
          country: null,
          pincode: null,
          buildingName: null,
          street: null,
          locality: {
            code: "SUN04",
            name: "Ajit Nagar - Area1",
            label: "Locality",
            latitude: null,
            longitude: null,
            area: "Area1",
            children: [],
            materializedPath: null,
          },
          geoLocation: {
            latitude: 0.0,
            longitude: 0.0,
          },
          additionalDetails: null,
        },
        acknowldgementNumber: "PB-AC-2020-07-16-005423",
        propertyType: "BUILTUP.SHAREDPROPERTY",
        ownershipCategory: "INDIVIDUAL.SINGLEOWNER",
        owners: [
          {
            id: null,
            uuid: "fb488a48-e0a9-4cf2-9296-de9c1e100ee5",
            userName: "8897542103",
            password: null,
            salutation: null,
            name: "Minu",
            gender: "FEMALE",
            mobileNumber: "8897542103",
            emailId: null,
            altContactNumber: null,
            pan: null,
            aadhaarNumber: null,
            permanentAddress: "13/3, Ajit Nagar - Area1, amritsar",
            permanentCity: null,
            permanentPinCode: null,
            correspondenceCity: null,
            correspondencePinCode: null,
            correspondenceAddress: null,
            active: true,
            dob: null,
            pwdExpiryDate: 1601959798000,
            locale: null,
            type: "CITIZEN",
            signature: null,
            accountLocked: false,
            roles: [
              {
                id: null,
                name: "Citizen",
                code: "CITIZEN",
                tenantId: "pb",
              },
            ],
            fatherOrHusbandName: "Ramesh",
            bloodGroup: null,
            identificationMark: null,
            photo: null,
            createdBy: "3434",
            createdDate: 1594183798000,
            lastModifiedBy: "1",
            lastModifiedDate: 1601289974000,
            tenantId: "pb",
            ownerInfoUuid: "9beb33f2-2f00-4919-a21a-c6182aade21b",
            isPrimaryOwner: null,
            ownerShipPercentage: null,
            ownerType: "NONE",
            institutionId: null,
            status: "ACTIVE",
            documents: null,
            relationship: "FATHER",
          },
        ],
        institution: null,
        creationReason: "CREATE",
        usageCategory: "NONRESIDENTIAL.COMMERCIAL",
        noOfFloors: 2,
        landArea: null,
        superBuiltUpArea: 133.34,
        source: "MUNICIPAL_RECORDS",
        channel: "CFC_COUNTER",
        documents: [
          {
            id: "be5d5ce6-29b8-4b3a-8152-0e834147e02a",
            documentType: "OWNER.IDENTITYPROOF.VOTERID",
            fileStoreId: "4a8c515b-2a23-4c14-a48d-868fc051e36d",
            documentUid: "4a8c515b-2a23-4c14-a48d-868fc051e36d",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "8afd4a0d-81d1-4d2c-871e-94e004559ee7",
            documentType: "OWNER.REGISTRATIONPROOF.GIFTDEED",
            fileStoreId: "9733a259-abd5-4f12-b739-20660430871d",
            documentUid: "9733a259-abd5-4f12-b739-20660430871d",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "83c3f8fc-babf-42bf-9d9b-2e0bf49e237a",
            documentType: "OWNER.USAGEPROOF.TRADELICENCE",
            fileStoreId: "7c54b960-8b3c-4ae1-b5a3-c238b1f65539",
            documentUid: "7c54b960-8b3c-4ae1-b5a3-c238b1f65539",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "ff50ad21-f5bf-4e19-87ab-d4861ae4456e",
            documentType: "OWNER.CONSTRUCTIONPROOF.BPACERTIFICATE",
            fileStoreId: "8a0ec22f-d38b-4058-a85b-c3f94db83509",
            documentUid: "8a0ec22f-d38b-4058-a85b-c3f94db83509",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "d1abd434-a78c-46a0-a80a-4d284eae32fe",
            documentType: "OWNER.OCCUPANCYPROOF.RENTAGREEMENT",
            fileStoreId: "cd909ce6-cb6a-4d10-862b-a6893107a616",
            documentUid: "cd909ce6-cb6a-4d10-862b-a6893107a616",
            auditDetails: null,
            status: "ACTIVE",
          },
          {
            id: "4f92afec-69c0-46b2-8dc6-cb79563749cc",
            documentType: "OWNER.ADDRESSPROOF.ELECTRICITYBILL",
            fileStoreId: "ccd3be88-86a8-47dc-a9da-301c51de1255",
            documentUid: "ccd3be88-86a8-47dc-a9da-301c51de1255",
            auditDetails: null,
            status: "ACTIVE",
          },
        ],
        units: [
          {
            id: "6ea93ff8-cc62-47ef-b756-650169672d6a",
            tenantId: null,
            floorNo: 1,
            unitType: "ACRESTAURANT",
            usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
            occupancyType: "RENTED",
            active: true,
            occupancyDate: 0,
            constructionDetail: {
              carpetArea: null,
              builtUpArea: 66.67,
              plinthArea: null,
              superBuiltUpArea: null,
              constructionType: null,
              constructionDate: 0,
              dimensions: null,
            },
            additionalDetails: null,
            auditDetails: null,
            arv: 2e5,
          },
          {
            id: "2ae75b7c-d737-4c76-864d-9b90403dda07",
            tenantId: null,
            floorNo: 1,
            unitType: "ACRESTAURANT",
            usageCategory: "NONRESIDENTIAL.COMMERCIAL.FOODJOINTS.ACRESTAURANT",
            occupancyType: "RENTED",
            active: true,
            occupancyDate: 0,
            constructionDetail: {
              carpetArea: null,
              builtUpArea: 66.68,
              plinthArea: null,
              superBuiltUpArea: null,
              constructionType: null,
              constructionDate: 0,
              dimensions: null,
            },
            additionalDetails: null,
            auditDetails: null,
            arv: 2e5,
          },
        ],
        additionalDetails: null,
        auditDetails: {
          createdBy: "f90534e4-e8f1-4564-8c65-f521999c0861",
          lastModifiedBy: "626667ba-673b-4ad2-8a23-8afd8e2aae5a",
          createdTime: 1594880235287,
          lastModifiedTime: 1594880236416,
        },
        workflow: null,
      },
    ],
  };
  var SearchService = {
    get: function get() {
      return data;
    },
  };

  function mergeSort(unsortedArray, key) {
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }

    var middle = Math.floor(unsortedArray.length / 2);
    var left = unsortedArray.slice(0, middle);
    var right = unsortedArray.slice(middle);
    return merge(mergeSort(left, key), mergeSort(right, key), key);
  }

  function merge(left, right, key) {
    var resultArray = [],
      leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex][key] < right[rightIndex][key]) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  function reverseArray(array, last) {
    array.splice(last, 0, array[0]);
    array.shift();
    last = last - 1;

    if (last > 1) {
      return reverseArray(array, last);
    } else {
      last = array.length;
      return array;
    }
  }

  function sort(dataProp, key, sortBy) {
    switch (sortBy) {
      case "asc":
        return mergeSort(dataProp, key);

      case "desc":
        return reverseArray(dataProp, dataProp.length);

      default:
        console.warn("sortBy attribute should only have asc or desc as default values");
        return dataProp;
    }
  }

  var getValue = function getValue(object, attrArray) {
    var key = attrArray[0];

    if (key && object[key]) {
      attrArray.shift();

      if (attrArray.length > 0) {
        return getValue(object[key], attrArray);
      } else {
        return object[key];
      }
    }

    return null;
  };

  var getStyle = function getStyle(base, val) {
    if (base) {
      return base + (val >= 14 ? " green" : val >= 0 ? " orange" : " red");
    }

    return null;
  };

  var workflowStatusMap = {
    INWORKFLOW: "Waiting for Approval",
  };

  var ResultTable = function ResultTable(_ref) {
    var data = _ref.data,
      config = _ref.config,
      last = _ref.last;
    var city = reactRedux.useSelector(function (state) {
      return state.cityCode;
    });

    var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

    var _useState = React.useState({
        data: data,
        updated: Date.now(),
      }),
      resultData = _useState[0],
      setResultData = _useState[1];

    var sortBy = function sortBy(key, by) {
      setResultData({
        data: sort(resultData.data, key, by),
        updated: Date.now(),
      });
    };

    var sortHandler = function sortHandler(obj) {
      sortBy(obj.key, obj.sort.sortBy);

      switch (obj.sort.sortBy) {
        case "asc":
          obj.sort.sortBy = "desc";
          break;

        case "desc":
          obj.sort.sortBy = "asc";
          break;

        default:
          console.warn("sortBy attribute should only have asc or desc as default values");
      }
    };

    var formatVal = function formatVal(property, att) {
      var value = getValue(property, att.key.split("."));

      if (att.type && att.type === "workflow-status") {
        value = workflowStatusMap[value] || "NA";
      }

      if (att.translate) {
        var cityCode = city.replace(".", "_");
        value = t(("" + (att.i18nPrefix ? att.i18nPrefix.replace("{cityCode}", cityCode) : "") + value).toUpperCase());
      }

      return /*#__PURE__*/ React__default.createElement(
        "span",
        {
          className: getStyle(att.style, value),
        },
        value
      );
    };

    return /*#__PURE__*/ React__default.createElement(
      "div",
      null,
      /*#__PURE__*/ React__default.createElement(
        "table",
        {
          className: "result",
        },
        /*#__PURE__*/ React__default.createElement(
          "thead",
          null,
          /*#__PURE__*/ React__default.createElement(
            "tr",
            null,
            /*#__PURE__*/ React__default.createElement("th", null, "Acknowledgment Number"),
            config.map(function (column, index) {
              return /*#__PURE__*/ React__default.createElement(
                "th",
                {
                  key: column.key,
                  onClick: function onClick() {
                    sortHandler(column);
                  },
                },
                column.title,
                " ",
                column.sort && column.sort.enabled && column.sort.sortBy ? (column.sort.sortBy === "asc" ? "↓" : "↑") : ""
              );
            }),
            /*#__PURE__*/ React__default.createElement("th", null, last.title)
          )
        ),
        /*#__PURE__*/ React__default.createElement(
          "tbody",
          null,
          resultData.data.map(function (item, index) {
            return /*#__PURE__*/ React__default.createElement(
              "tr",
              {
                key: index,
              },
              /*#__PURE__*/ React__default.createElement(
                "td",
                null,
                /*#__PURE__*/ React__default.createElement(
                  reactRouterDom.Link,
                  {
                    to: "/applicationNumber=" + item.propertyId + "&tenantId=" + item.tenantId,
                  },
                  item.acknowldgementNumber
                )
              ),
              config.map(function (att, index2) {
                return /*#__PURE__*/ React__default.createElement(
                  "td",
                  {
                    key: index2,
                  },
                  formatVal(item, att)
                );
              }),
              /*#__PURE__*/ React__default.createElement(
                "td",
                {
                  onClick: function onClick() {
                    return last.onClick(item);
                  },
                },
                /*#__PURE__*/ React__default.createElement(last.element, null)
              )
            );
          })
        )
      )
    );
  };

  var ListPage = function ListPage() {
    var pageConfig = reactRedux.useSelector(function (state) {
      return state.config[Pages.PGR_LIST];
    });
    var result = SearchService.get();

    var popHandler = function popHandler(property) {
      alert("Property ID " + property.acknowldgementNumber);
    };

    var HistorySvg = function HistorySvg() {
      return /*#__PURE__*/ React__default.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "black",
          width: "24px",
          height: "24px",
        },
        /*#__PURE__*/ React__default.createElement("path", {
          d: "M0 0h24v24H0z",
          fill: "none",
        }),
        /*#__PURE__*/ React__default.createElement("path", {
          d:
            "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z",
        })
      );
    };

    return /*#__PURE__*/ React__default.createElement(
      "div",
      null,
      "Complaints List",
      /*#__PURE__*/ React__default.createElement(ResultTable, {
        data: result.Properties,
        config: pageConfig.resultTable,
        last: {
          title: "History",
          onClick: popHandler,
          element: HistorySvg,
        },
      }),
      /*#__PURE__*/ React__default.createElement("pre", null, JSON.stringify(pageConfig, null, 2))
    );
  };

  var getConfig = function getConfig(ComponentMap, GetFunction, _ref) {
    var config = _ref.config,
      state = _ref.state,
      repeatClicked = _ref.repeatClicked,
      handlesubmit = _ref.handlesubmit,
      register = _ref.register,
      onSubmit = _ref.onSubmit;
    if (!config || config.length === 0) return [];
    return config.map(function (item) {
      var component = item.component,
        name = item.name,
        fields = item.fields,
        props = _objectWithoutPropertiesLoose(item, ["component", "name", "fields", "submit"]);

      return _extends({}, props, {
        fields:
          fields && fields.length > 0
            ? getConfig(ComponentMap, GetFunction, {
                config: fields,
                state: state,
                repeatClicked: repeatClicked,
                handlesubmit: handlesubmit,
                register: register,
                onSubmit: onSubmit,
              })
            : null,
        name: name,
        value: state[name],
        handlesubmit: component === "form" ? handlesubmit : null,
        onSubmit: component === "form" ? onSubmit : null,
        repeats: component === "form-section-repeat-group" ? state[name + "-repeats"] || 1 : null,
        dorepeat: component === "form-section-repeat-group" ? repeatClicked(name) : null,
        ref: component === "input-select" || component === "input-field" || component === "city-mohalla" ? register : null,
        register: component === "input-select" || component === "input-field" || component === "city-mohalla" ? register : null,
        component: ComponentMap[component],
      });
    });
  };

  var InputField = React__default.forwardRef(function (_ref, ref) {
    var label = _ref.label,
      placeholder = _ref.placeholder,
      register = _ref.register,
      props = _objectWithoutPropertiesLoose(_ref, ["label", "placeholder", "register"]);

    var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

    return /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "egov-form-group govuk-grid-column-one-half",
      },
      label
        ? /*#__PURE__*/ React__default.createElement(
            "label",
            {
              htmlFor: props.id,
              className: "egov-label",
            },
            t(label)
          )
        : null,
      /*#__PURE__*/ React__default.createElement(
        "input",
        _extends(
          {
            className: "egov-input",
            ref: register,
            placeholder: t(placeholder),
          },
          props
        )
      )
    );
  });

  var Urls = {
    MDMS: "/egov-mdms-service/v1/_search",
    localization: "/localization/messages/v1/_search",
    location: {
      localities: "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=ADMIN&boundaryType=Locality",
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

  var Select = React__default.forwardRef(function (_ref, ref) {
    var label = _ref.label,
      options = _ref.options,
      id = _ref.id,
      _ref$mdmsdetails = _ref.mdmsdetails,
      mdmsdetails = _ref$mdmsdetails === void 0 ? null : _ref$mdmsdetails,
      onChange = _ref.onChange,
      register = _ref.register,
      props = _objectWithoutPropertiesLoose(_ref, ["label", "options", "id", "mdmsdetails", "onChange", "register"]);

    var _useState = React.useState(options),
      selectOptions = _useState[0],
      setSelectOptions = _useState[1];

    var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

    React.useEffect(
      function () {
        if (mdmsdetails) {
          MdmsService.getDataByCriteria(mdmsdetails).then(function (list) {
            var criteriaOptions = list.map(function (item) {
              return {
                value: item.name,
                text: item.i18nKey,
              };
            });
            setSelectOptions([].concat(criteriaOptions));
          });
        }
      },
      [mdmsdetails]
    );
    return /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "govuk-form-group govuk-grid-column-one-half",
      },
      /*#__PURE__*/ React__default.createElement(
        "label",
        {
          className: "govuk-label",
          htmlFor: id,
        },
        label
      ),
      /*#__PURE__*/ React__default.createElement(
        "select",
        _extends(
          {
            className: "govuk-select",
            id: id,
            ref: register,
          },
          props,
          {
            onChange: onChange,
          }
        ),
        selectOptions &&
          selectOptions.map(function (item, index) {
            return /*#__PURE__*/ React__default.createElement(
              "option",
              {
                key: id + "-option-" + index,
                value: item.value,
              },
              t(item.text)
            );
          })
      )
    );
  });

  var Button = function Button(_ref) {
    var text = _ref.text,
      props = _objectWithoutPropertiesLoose(_ref, ["text"]);

    var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

    return /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "govuk-grid-column-full",
        style: {
          float: "left",
          width: "auto",
        },
      },
      /*#__PURE__*/ React__default.createElement(
        "button",
        {
          className: "egov-btn",
          "data-module": "govuk-button",
        },
        t(text)
      )
    );
  };

  var Form = function Form(_ref) {
    var onSubmit = _ref.onSubmit,
      handlesubmit = _ref.handlesubmit,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["onSubmit", "handlesubmit", "children"]);

    var submitForm = function submitForm(data) {
      try {
        var _temp3 = function _temp3() {
          console.log("form submit", data, newData);
          onSubmit(newData);
        };

        var beforeSubmit = props["before-submit"];
        var newData = data;

        var _temp4 = (function () {
          if (beforeSubmit && window[beforeSubmit]) {
            return Promise.resolve(window[beforeSubmit](JSON.parse(JSON.stringify(data)))).then(function (_window$beforeSubmit) {
              newData = _window$beforeSubmit;
            });
          }
        })();

        return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
      } catch (e) {
        return Promise.reject(e);
      }
    };

    return /*#__PURE__*/ React__default.createElement(
      "form",
      _extends(
        {
          onSubmit: handlesubmit(submitForm),
        },
        props
      ),
      children
    );
  };

  var FormSection = function FormSection(_ref) {
    var children = _ref.children,
      title = _ref.title,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "title", "className"]);

    return /*#__PURE__*/ React__default.createElement(
      "div",
      _extends(
        {
          className: "govuk-fieldset govuk-grid-column-full " + className,
        },
        props
      ),
      title &&
        /*#__PURE__*/ React__default.createElement(
          "legend",
          {
            className: "govuk-fieldset__legend govuk-fieldset__legend--l",
          },
          /*#__PURE__*/ React__default.createElement(
            "h1",
            {
              className: "govuk-fieldset__heading",
            },
            title
          )
        ),
      children
    );
  };

  var FormSectionRepeatGroup = function FormSectionRepeatGroup(_ref) {
    var children = _ref.children,
      dorepeat = _ref.dorepeat,
      repeats = _ref.repeats,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "dorepeat", "repeats"]);

    var formSections = [];

    for (var index = 0; index < repeats; index++) {
      formSections.push(
        /*#__PURE__*/ React__default.createElement(
          FormSection,
          _extends(
            {
              key: Math.random(),
              className: "repeat-group",
            },
            props
          ),
          children
        )
      );
    }

    return /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "govuk-grid-column-full",
      },
      formSections,
      /*#__PURE__*/ React__default.createElement(
        "button",
        {
          className: "egov-btn",
          onClick: dorepeat,
        },
        "Add more"
      )
    );
  };

  var Header = function Header(_ref) {
    var text = _ref.text,
      props = _objectWithoutPropertiesLoose(_ref, ["text"]);

    var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

    return /*#__PURE__*/ React__default.createElement(
      "h2",
      _extends(
        {
          className: "egov-heading",
        },
        props
      ),
      t(text)
    );
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

  var LocationService = {
    getLocalities: function getLocalities(_ref) {
      var tenantId = _ref.tenantId;
      return Request({
        url: Urls.location.localities,
        params: {
          tenantId: tenantId.toLowerCase(),
        },
        useCache: true,
      });
    },
  };

  var ADMIN_CODE = function ADMIN_CODE(_ref) {
    var tenantId = _ref.tenantId,
      hierarchyType = _ref.hierarchyType;
    return tenantId.replace(".", "_").toUpperCase() + "_" + hierarchyType.code;
  };

  var getLocalities = function getLocalities(tenantBoundry) {
    var adminCode = ADMIN_CODE(tenantBoundry);
    return tenantBoundry.boundary.map(function (boundaryObj) {
      return _extends({}, boundaryObj, {
        i18nkey: adminCode + "_" + boundaryObj.code,
      });
    });
  };

  var LocalityService = {
    get: function get(tenantBoundry) {
      return getLocalities(tenantBoundry);
    },
  };

  var fetchLocalities = function fetchLocalities(city) {
    return function (dispatch, getState) {
      try {
        city = city.toLowerCase();

        var _getState = getState(),
          stateInfo = _getState.stateInfo;

        return Promise.resolve(
          LocationService.getLocalities({
            tenantId: stateInfo.code + "." + city,
          })
        ).then(function (response) {
          var localityList = LocalityService.get(response.TenantBoundary[0]);
          dispatch({
            type: FETCH_LOCALITIES,
            payload: {
              localityList: localityList,
            },
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
  };
  var updateLocalizationResources = function updateLocalizationResources() {
    return function (dispatch, getState) {
      try {
        var city = "amritsar";
        var lng = getState().currentLanguage.language || "en";
        return Promise.resolve(
          LocalizationService.getLocale({
            modules: ["rainmaker-pb." + city],
            locale: lng,
            tenantId: "pb." + city,
          })
        ).then(function () {
          return Promise.resolve(
            LocalizationService.getLocale({
              modules: ["rainmaker-common", "rainmaker-pgr"],
              locale: lng,
              tenantId: "pb",
            })
          ).then(function () {});
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
  };

  var CityMohalla = React__default.forwardRef(function (_ref, ref) {
    var register = _ref.register,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "register"]);

    var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

    var dispatch = reactRedux.useDispatch();
    var state = reactRedux.useSelector(function (state) {
      return state;
    });
    var localities = reactRedux.useSelector(function (state) {
      return state.localities;
    });
    var getLocalities = React.useCallback(
      function (city) {
        return dispatch(fetchLocalities(city));
      },
      [dispatch]
    );

    var handleCityChange = function handleCityChange(e) {
      getLocalities(e.target.value);
    };

    return /*#__PURE__*/ React__default.createElement(
      React.Fragment,
      null,
      state.cities &&
        /*#__PURE__*/ React__default.createElement(
          React.Fragment,
          null,
          /*#__PURE__*/ React__default.createElement(Select, {
            label: "City",
            id: "inputGroupSelect01",
            ref: register,
            name: "city-select",
            onChange: handleCityChange,
            options: state.cities.map(function (city) {
              return {
                value: city.name,
                text: t(city.i18nKey),
              };
            }),
          }),
          localities &&
            localities.localityList &&
            /*#__PURE__*/ React__default.createElement(Select, {
              label: "Mohalla",
              id: "inputGroupSelect02",
              ref: register,
              name: "locality-select",
              options: localities.localityList.map(function (locality) {
                return {
                  value: locality.name,
                  text: t(locality.i18nkey),
                };
              }),
            })
        )
    );
  });

  var ComponentMap = {
    "input-field": InputField,
    "input-select": Select,
    header: Header,
    form: Form,
    "form-section": FormSection,
    "form-section-repeat-group": FormSectionRepeatGroup,
    button: Button,
    "city-mohalla": CityMohalla,
  };

  var Registry = {};
  var GetFunction = function GetFunction(name) {
    return Registry[name];
  };

  var mapPropsToConfig = function mapPropsToConfig(config) {
    var configWithProps = [];
    config.forEach(function (item) {
      if (item.component) {
        var component = item.component,
          props = _objectWithoutPropertiesLoose(item, ["component"]);

        configWithProps.push(
          _extends({}, props, {
            Component: component,
          })
        );
      }
    });
    return configWithProps;
  };

  var Renderer = React__default.forwardRef(function (_ref, ref) {
    var config = _ref.config;

    if (!config) {
      throw new Error("You are calling Renderer with no config.");
    }

    var configWithProps = mapPropsToConfig(config);

    var renderComponents = function renderComponents(items) {
      return items.map(function (item) {
        var Component = item.Component,
          fields = item.fields,
          props = _objectWithoutPropertiesLoose(item, ["Component", "fields"]);

        if (fields && fields.length > 1) {
          return /*#__PURE__*/ React__default.createElement(
            React.Fragment,
            {
              key: props.name || props.id,
            },
            /*#__PURE__*/ React__default.createElement(
              Component,
              _extends({}, props, {
                ref: ref,
              }),
              /*#__PURE__*/ React__default.createElement(Renderer, {
                config: fields,
                ref: ref,
              })
            )
          );
        }

        return /*#__PURE__*/ React__default.createElement(
          React.Fragment,
          {
            key: props.name || props.id,
          },
          /*#__PURE__*/ React__default.createElement(
            Component,
            _extends({}, props, {
              ref: ref,
            })
          )
        );
      });
    };

    return renderComponents(configWithProps);
  });

  var NewComplaintPage = function NewComplaintPage() {
    var state = reactRedux.useSelector(function (state) {
      return state.formData;
    });
    var pageConfig = reactRedux.useSelector(function (state) {
      return state.config[Pages.PGR_NEW_COMPLAINT];
    });

    var _useForm = reactHookForm.useForm({
        defaultValues: {},
      }),
      handleSubmit = _useForm.handleSubmit,
      register = _useForm.register;

    var dispatch = reactRedux.useDispatch();

    var handleRepeatClick = function handleRepeatClick(field) {
      return function (event) {
        event.preventDefault();
        dispatch({
          type: "UPDATE_REPEAT",
          payload: {
            field: field,
          },
        });
      };
    };

    var onSubmit = function onSubmit(data) {
      try {
        console.log("onSubmit", data);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };

    var configParams = {
      config: pageConfig,
      state: state,
      repeatClicked: handleRepeatClick,
      handlesubmit: handleSubmit,
      register: register,
      onSubmit: onSubmit,
    };
    var config = React.useMemo(
      function () {
        return getConfig(ComponentMap, GetFunction, configParams);
      },
      [configParams]
    );
    return /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "govuk-width-container",
      },
      /*#__PURE__*/ React__default.createElement(
        "h1",
        {
          className: "egov-heading",
        },
        "eGov PGR"
      ),
      /*#__PURE__*/ React__default.createElement(
        "div",
        {
          className: "govuk-grid-row",
        },
        /*#__PURE__*/ React__default.createElement(Renderer, {
          config: config,
        })
      )
    );
  };

  var SearchComplaint = function SearchComplaint() {
    var state = reactRedux.useSelector(function (state) {
      return state.formData;
    });
    var pageConfig = reactRedux.useSelector(function (state) {
      return state.config[Pages.PGR_SEARCH];
    });
    var result = SearchService.get();

    var _useForm = reactHookForm.useForm({
        defaultValues: {},
      }),
      handleSubmit = _useForm.handleSubmit,
      register = _useForm.register;

    var _useState = React.useState(false),
      show = _useState[0],
      setshow = _useState[1];

    var onSubmit = function onSubmit(data) {
      console.log("search", data);
      setshow(!show);
    };

    var popHandler = function popHandler(prop) {
      alert("property id: " + prop.id);
    };

    var configParams = {
      config: pageConfig,
      state: state,
      handlesubmit: handleSubmit,
      register: register,
      onSubmit: handleSubmit(onSubmit),
    };

    var HistorySvg = function HistorySvg() {
      return /*#__PURE__*/ React__default.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "black",
          width: "24px",
          height: "24px",
        },
        /*#__PURE__*/ React__default.createElement("path", {
          d: "M0 0h24v24H0z",
          fill: "none",
        }),
        /*#__PURE__*/ React__default.createElement("path", {
          d:
            "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z",
        })
      );
    };

    var config = React.useMemo(
      function () {
        return getConfig(ComponentMap, GetFunction, configParams);
      },
      [configParams]
    );
    return /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "govuk-width-container",
      },
      /*#__PURE__*/ React__default.createElement(
        "h1",
        {
          className: "egov-heading",
        },
        "eGov PGR"
      ),
      /*#__PURE__*/ React__default.createElement(
        "div",
        {
          className: "govuk-grid-row",
        },
        /*#__PURE__*/ React__default.createElement(Renderer, {
          config: config,
        })
      ),
      show &&
        /*#__PURE__*/ React__default.createElement(ResultTable, {
          data: result.Properties,
          config: pageConfig[1].resultTable,
          last: {
            title: "History",
            onClick: popHandler,
            element: HistorySvg,
          },
        })
    );
  };

  var LanguageSelect = function LanguageSelect() {
    var _useTranslation = reactI18next.useTranslation(),
      i18n = _useTranslation.i18n;

    var dispatch = reactRedux.useDispatch();
    var localizationResources = React.useCallback(
      function () {
        return dispatch(updateLocalizationResources());
      },
      [dispatch]
    );
    var languages = reactRedux.useSelector(function (state) {
      return state.languages;
    });

    var handleLangChange = function handleLangChange(e) {
      var lng = e.target.value;
      i18n.changeLanguage(lng.split("_")[0]);
      dispatch({
        type: "CHANGE_LANGUAGE",
        payload: lng,
      });
      localizationResources();
    };

    return /*#__PURE__*/ React__default.createElement(
      Fragment,
      null,
      languages &&
        /*#__PURE__*/ React__default.createElement(Select, {
          id: "lang",
          onChange: handleLangChange,
          options: languages.map(function (lng) {
            return {
              value: lng.value,
              text: lng.label,
            };
          }),
        })
    );
  };

  const Header$1 = () =>
    /*#__PURE__*/ React__default.createElement(
      React.Fragment,
      null,
      /*#__PURE__*/ React__default.createElement(
        "div",
        {
          className: "column",
        },
        /*#__PURE__*/ React__default.createElement(
          reactRouterDom.Link,
          {
            to: "/",
          },
          "Home"
        ),
        " -\xA0",
        /*#__PURE__*/ React__default.createElement(
          reactRouterDom.Link,
          {
            to: "/new",
          },
          "New"
        ),
        " -\xA0",
        /*#__PURE__*/ React__default.createElement(
          reactRouterDom.Link,
          {
            to: "/search",
          },
          "Search"
        ),
        " \xA0",
        /*#__PURE__*/ React__default.createElement(LanguageSelect, null)
      )
    );

  const App = () => {
    return /*#__PURE__*/ React__default.createElement(
      reactRouterDom.BrowserRouter,
      null,
      /*#__PURE__*/ React__default.createElement(Header$1, null),
      /*#__PURE__*/ React__default.createElement(reactRouterDom.Route, {
        exact: true,
        path: "/",
        component: ListPage,
      }),
      /*#__PURE__*/ React__default.createElement(reactRouterDom.Route, {
        path: "/new",
        component: NewComplaintPage,
      }),
      /*#__PURE__*/ React__default.createElement(reactRouterDom.Route, {
        path: "/search",
        component: SearchComplaint,
      })
    );
  };

  var newComplaintConfig = [
    {
      id: "header",
      component: "header",
      text: "form example",
    },
    {
      id: "form",
      component: "form",
      submit: "form-submit",
      "before-submit": "newApplicationSubmitInterceptor",
      fields: [
        {
          id: "form-section-1",
          component: "form-section",
          title: "Section 1",
          fields: [
            {
              name: "fullName",
              id: "fullName",
              type: "text",
              component: "input-field",
              placeholder: "John Doe",
              label: "Full Name",
            },
            {
              name: "email",
              id: "email",
              type: "email",
              component: "input-field",
              placeholder: "john.doe@egovernments.com",
              label: "Email Address",
            },
            {
              name: "phoneNumber",
              id: "phoneNumber",
              type: "tel",
              component: "input-field",
              placeholder: "12345678",
              label: "Phone Number",
            },
            {
              name: "title",
              id: "title",
              type: "text",
              component: "input-field",
              placeholder: "",
              label: "Title",
            },
            {
              name: "description",
              id: "description",
              type: "text",
              component: "input-field",
              placeholder: "",
              label: "Description",
            },
            {
              id: "repeat-group-1",
              name: "ulb-section",
              component: "form-section-repeat-group",
              min: 1,
              max: 5,
              fields: [
                {
                  name: "ulb",
                  id: "ulb",
                  component: "input-select",
                  placeholder: "",
                  label: "City",
                  options: [
                    {
                      id: "amritsar",
                      text: "Amritsar",
                      value: "amritsar",
                    },
                    {
                      id: "ludhiana",
                      text: "Ludhiana",
                      value: "ludhiana",
                    },
                  ],
                },
                {
                  name: "description-ulb",
                  id: "description-ulb",
                  type: "text",
                  component: "input-field",
                  placeholder: "",
                  label: "Description",
                },
              ],
            },
          ],
        },
        {
          id: "repeat-group-2",
          name: "ulb-section-2",
          component: "form-section-repeat-group",
          min: 1,
          max: 5,
          fields: [
            {
              name: "description-ulb2",
              id: "description-ulb2",
              type: "text",
              component: "input-field",
              placeholder: "",
              label: "Description",
            },
            {
              id: "city-mohalla",
              name: "city-mohalla",
              component: "city-mohalla",
            },
          ],
        },
        {
          name: "submit",
          id: "submit",
          type: "submit",
          component: "button",
          placeholder: "",
          text: "Save and continue",
        },
      ],
    },
  ];

  var searchComplaint = [
    {
      id: "form",
      component: "form",
      submit: "form-submit",
      fields: [
        {
          id: "form-section-1",
          component: "form-section",
          title: "Section 1",
          fields: [
            {
              name: "complaint-mobile-no",
              id: "complaint-mobile-no",
              type: "text",
              component: "input-field",
              label: "ES_CREATECOMPLAINT_MOBILE_NUMBER",
              placeholder: "CORE_COMMON_MOBILE_NUMBER_PLACEHOLDER",
            },
            {
              name: "complaint-no",
              id: "complaint-no",
              type: "text",
              component: "input-field",
              label: "CS_COMPLAINT_SUBMITTED_COMPLAINT_NO",
              placeholder: "ES_MYCOMPLAINTS_COMPLAINT_NO",
            },
            {
              name: "ulb",
              id: "ulb",
              component: "input-select",
              placeholder: "",
              label: "City",
              mdmsdetails: {
                type: "citymodule",
                details: {
                  tenantId: "pb",
                  moduleDetails: [
                    {
                      moduleName: "tenant",
                      masterDetails: [
                        {
                          name: "citymodule",
                        },
                        {
                          name: "tenants",
                        },
                      ],
                    },
                  ],
                },
              },
              options: [
                {
                  id: "amritsar",
                  text: "Amritsar",
                  value: "amritsar",
                },
                {
                  id: "ludhiana",
                  text: "Ludhiana",
                  value: "ludhiana",
                },
              ],
            },
          ],
        },
        {
          name: "submit",
          id: "submit",
          type: "submit",
          component: "button",
          placeholder: "",
          text: "ES_MYCOMPLAINTS_SEARCH_BUTTON",
        },
      ],
    },
    {
      resultTable: [
        {
          key: "propertyId",
          title: "PropertyId id",
          style: "link",
          link: true,
        },
        {
          key: "address.city",
          title: "City",
          translate: true,
          i18nPrefix: "tenant_tenants_pb_",
        },
        {
          key: "address.locality.code",
          title: "Locality",
          translate: true,
          i18nPrefix: "{cityCode}_revenue_",
        },
      ],
    },
  ];

  var _defaultConfig;
  var defaultConfig =
    ((_defaultConfig = {}),
    (_defaultConfig[Pages.PGR_LIST] = {
      resultTable: [
        {
          key: "address.locality.code",
          title: "Address",
          translate: true,
          i18nPrefix: "{cityCode}_revenue_",
        },
        {
          key: "status",
          title: "Status",
          type: "workflow-status",
        },
        {
          key: "auditDetails.createdTime",
          modify: "Math.round((value + 25 * 24 * 60 * 60 * 1000 - Date.now())/ (24 * 60 * 60 * 1000))",
          title: "SLA (days)",
          style: "badge",
          sort: {
            enabled: true,
            default: true,
            sortBy: "desc",
          },
        },
      ],
    }),
    (_defaultConfig[Pages.PGR_NEW_COMPLAINT] = newComplaintConfig),
    (_defaultConfig[Pages.PGR_SEARCH] = searchComplaint),
    _defaultConfig);

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

    var _useState = React.useState({}),
      defaultStore = _useState[0],
      setDefaultStore = _useState[1];

    React.useEffect(
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

  var ModuleApp = function ModuleApp(_ref) {
    var deltaConfig = _ref.deltaConfig,
      stateCode = _ref.stateCode,
      cityCode = _ref.cityCode,
      moduleCode = _ref.moduleCode;
    var store = useStore(defaultConfig, {
      deltaConfig: deltaConfig,
      stateCode: stateCode,
      cityCode: cityCode,
      moduleCode: moduleCode,
    });
    initI18n();

    if (Object.keys(store).length === 0) {
      return /*#__PURE__*/ React__default.createElement("div", null, "Loading");
    }

    return /*#__PURE__*/ React__default.createElement(
      reactRedux.Provider,
      {
        store: getStore(store),
      },
      /*#__PURE__*/ React__default.createElement(App, null)
    );
  };

  window.eGov = window.eGov || {};
  window.eGov.PGRApp = ModuleApp;

  return ModuleApp;
})(React, reactRedux, Redux, thunk, reactRouterDom, reactI18next, reactHookForm, axios, i18next, ReactPostprocessor);
//# sourceMappingURL=module.js.map
