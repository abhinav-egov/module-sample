import React from "react";
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
};

ReactDOM.render(
  <React.StrictMode>
    <PGRApp deltaConfig={deltaConfig} />
  </React.StrictMode>,
  document.getElementById("root")
);
