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
              name: "complaint-email-id",
              id: "complaint-email-id",
              type: "text",
              component: "input-field",
              i18nlabelkey: "ES_CREATECOMPLAINT_EMAIL_ID",
              label: "ES_CREATECOMPLAINT_MOBILE_EMAIL_ID",
              i18nplaceholderkey: "ES_CREATECOMPLAINT_EMAIL_ID_PLACEHOLDER",
              __action__: "INSERT_AFTER",
              __property__: "complaint-mobile-no",
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
