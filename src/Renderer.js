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

export const Renderer = React.forwardRef(({ config }, ref) => {
  if (!config) {
    throw new Error("You are calling Renderer with no config.");
  }

  const configWithProps = mapPropsToConfig(config);
  const renderComponents = (items) => {
    return items.map((item) => {
      const { Component, fields, ...props } = item;

      if (fields && fields.length > 1) {
        return (
          <Fragment key={props.name || props.id}>
            <Component {...props} ref={ref}>
              <Renderer config={fields} ref={ref} />
            </Component>
          </Fragment>
        );
      }
      return (
        <Fragment key={props.name || props.id}>
          <Component {...props} ref={ref} />
        </Fragment>
      );
    });
  };

  return renderComponents(configWithProps);
});
