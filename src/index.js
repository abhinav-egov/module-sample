import React, { Suspense } from "react";
import ReactDOM from "react-dom";
// import './index.scss';
import PGRApp from "./ModuleApp";
const deltaConfig = {
  "pgr-new-complaint": [
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
              id: "plot_type",
              name: "plot type",
              type: "text",
              component: "input-field",
              placeholder: "Plot type",
              label: "Plot Type",
              __action__: "INSERT_AFTER",
              __property__: "fullName",
            },
          ],
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
                  id: "chandigarh",
                  text: "Chandigarh",
                  value: "chandigarh",
                  __action__: "INSERT_AFTER",
                  __property__: "amritsar",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  "pgr-search-complaint": [
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
              name: "clear",
              id: "clear",
              type: "submit",
              component: "button",
              placeholder: "",
              text: "ES_MYCOMPLAINTS_CLEAR_SEARCH_BUTTON",
              __action__: "INSERT_AFTER",
              __property__: "submit",
            },
            {
              name: "location",
              id: "localtion",
              component: "input-select",
              placeholder: "",
              label: "location",
              mdmsdetails: {
                type: "egovLocation",
                details: { tenantId: "default", moduleDetails: [{ moduleName: "egov-location", masterDetails: [{ name: "TenantBoundary" }] }] },
              },
              __action__: "INSERT_AFTER",
              __property__: "ulb",
            },
          ],
        },
      ],
    },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <PGRApp deltaConfig={deltaConfig} stateCode="pb" moduleCode="PGR" />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
