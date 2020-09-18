import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

import "./index.scss";
import ListPage from "./pages/List";
import NewComplaintPage from "./pages/NewComplaint";
import "./i18n";
import LanguageSelect from "./components/LanguageSelect";
import { fetchLanguages } from "../src/redux/actions/index";

const Header = () => (
  <>
    <div className="column">
      <Link to="/">Home</Link> -&nbsp;
      <Link to="/new">New</Link>
      <LanguageSelect />
    </div>
  </>
);

const App = () => {
  const dispatch = useDispatch();
  const getLanguages = useCallback(() => dispatch(fetchLanguages()), [dispatch]);
  useEffect(() => {
    getLanguages();
  }, [getLanguages]);

  return (
    <Router>
      <Header />
      <Route exact path="/" component={ListPage} />
      <Route path="/new" component={NewComplaintPage} />
    </Router>
  );
};

export default App;
