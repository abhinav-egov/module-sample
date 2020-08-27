import React, { useState, useMemo } from 'react';
// import { Route, BrowserRouter as Router } from 'react-router-dom';
import ComponentMap from "./ComponentMap";
import { Renderer } from "./Renderer";
import pageConfig from "./config.json";
import './index.scss';

import { RegisterFunction, GetFunction } from "./FunctionRegistry";

const getConfig = ({ config, state, repeatClicked, onChange }) => {
  if (!config || config.length === 0) return [];
  return config.map((item) => {
    const { component, name, fields, submit, ...props } = item;
    return {
      ...props,
      submit: submit ? GetFunction(submit) : undefined,
      fields: fields && fields.length > 0 ? getConfig({ config: fields, state, onChange, repeatClicked }) : null,
      name,
      value: state[name],
      repeats: component === 'form-section-repeat-group' ? state[name + '-repeats'] || 1 : null,
      dorepeat: component === 'form-section-repeat-group' ? repeatClicked(name) : null,
      onChange: component === 'input-field' ? onChange(name) : null,
      component: ComponentMap[component]
    }
  })
}

function App() {
  const [state, setState] = useState({});

  const handleSubmit = e => {
    e && e.preventDefault();
    console.log("state", state);
  }

  const handleOnChange = field => event => {
    const { value } = event.target;
    setState(prevState => ({ ...prevState, [field]: value }));
  }

  const handleRepeatClick = field => event => {
    event.preventDefault();
    // console.log(state);
    setState(prevState => {
      console.log(prevState);
      const stateKey = `${field}-repeats`;
      const prevValue = prevState[stateKey] || 1;
      return { ...prevState, [stateKey]: prevValue + 1 }
    })
  }

  const fullNameKeyup = (event) => {
    console.log(event.target.value);
  }

  const config = useMemo(() => {
    return getConfig({ config: pageConfig, state, onChange: handleOnChange, repeatClicked: handleRepeatClick });
  }, [state]);

  // const config = getConfig({ config: pageConfig, state, onChange: handleOnChange, repeatClicked: handleRepeatClick });

  RegisterFunction('form-submit', handleSubmit);
  RegisterFunction('fullNameKeyup', fullNameKeyup)

  return (
    <div className="govuk-width-container">
      <h1 className="egov-heading">eGov PGR</h1>
      {/* <TextInput></TextInput> */}
      <div className="govuk-grid-row">
        <Renderer config={config} />
      </div>
    </div>

  );
}

export default App;
