import React, { Fragment } from "react";

const mapPropsToConfig = (config) => {
  const configWithProps = [];

  config.forEach((item) => {
    if (item.component) {
      const { component, ...props } = item;
      configWithProps.push({
        ...props,
        Component: component,
      });
    }
  });

  return configWithProps;
};

export const Renderer = ({ config }) => {
  console.log("config-----------------------------------------", config);
  if (!config) {
    throw new Error("You are calling Renderer with no config.");
  }

  const configWithProps = mapPropsToConfig(config);
  //console.log("configWithProps------->", configWithProps);
  const renderComponents = (items) => {
    return items.map((item) => {
      const { Component, fields, ...props } = item;
      console.log("Component props------->", props);
      // console.log("Component------->", Component);
      if (fields && fields.length > 1) {
        return (
          <Fragment key={props.name || props.id}>
            <Component {...props}>
              <Renderer config={fields} />
            </Component>
          </Fragment>
        );
      }
      return (
        <Fragment key={props.name || props.id}>
          <Component {...props} />
        </Fragment>
      );
    });
  };

  return renderComponents(configWithProps);
};
