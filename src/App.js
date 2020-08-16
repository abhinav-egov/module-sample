import React, { useState, useMemo } from 'react';
import ComponentMap from "./ComponentMap";
import { Renderer } from "./Renderer";
import pageConfig from "./config.json";
import './App.css';

const getConfig = ({ state, onChange }) => {
  return pageConfig.map((item) => {
    const { component, name, ...props } = item;
    return {
      ...props,
      name,
      value: state[name],
      onChange: component === 'input-field' ? onChange(name) : null,
      component: ComponentMap[component]
    }
  })
}

function App() {
  const [state, setState] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    console.log("state", state);
  }

  const handleOnChange = field => event => {
    const { value } = event.target;
    setState(prevState => ({ ...prevState, [field]: value }));
  }

  const config = useMemo(() => {
    const config = getConfig({ state, onChange: handleOnChange });
    console.log(config);
    return config;
  }, [state]);

  return (
    <div className="App">
      <header className="App-header">
        eGov PGR
      </header>

      <form onSubmit={handleSubmit}>
        <Renderer config={config} />
        <button className="govuk-button" data-module="govuk-button">
          Save and continue
        </button>
      </form>
    </div>
  );
}

export default App;
