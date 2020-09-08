import React from "react";
import ReactDOM from "react-dom";
// import './index.scss';
import PGRApp from "./ModuleApp";

const deltaConfig = [
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
            placeholder: "ploy type",
            label: "Plot Type",
            __action__: "INSERT_AFTER",
            __property__: "fullName",
          },
        ],
      },
    ],
  },
];
ReactDOM.render(
  <React.StrictMode>
    <PGRApp deltaConfig={deltaConfig} />
  </React.StrictMode>,
  document.getElementById("root")
);
