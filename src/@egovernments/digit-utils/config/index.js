export const getConfig = (
  ComponentMap,
  GetFunction,
  { config, state, repeatClicked, handlesubmit, register, onSubmit }
) => {
  if (!config || config.length === 0) return [];
  console.log("config---->", config);
  return config.map((item) => {
    console.log("items------------------>", item);
    const { component, name, fields, submit, ...props } = item;
    return {
      ...props,
      // submit: submit ? GetFunction(submit) : undefined,
      fields:
        fields && fields.length > 0
          ? getConfig(ComponentMap, GetFunction, {
              config: fields,
              state,
              repeatClicked,
              handlesubmit,
              register,
              onSubmit,
            })
          : null,
      name,
      value: state[name],
      handlesubmit: component === "form" ? handlesubmit : null,
      onSubmit: component === "form" ? onSubmit : null,
      repeats:
        component === "form-section-repeat-group"
          ? state[name + "-repeats"] || 1
          : null,
      dorepeat:
        component === "form-section-repeat-group" ? repeatClicked(name) : null,
      ref:
        component === "input-select" || component === "input-field"
          ? register
          : null,
      // onChange: component === 'input-field' ? onChange(name) : null,
      component: ComponentMap[component],
    };
  });
};
