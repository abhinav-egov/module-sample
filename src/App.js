import React from "react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import "./index.scss";

import { useTranslation } from "react-i18next";

import ListPage from "./pages/List";
import NewComplaintPage from "./pages/NewComplaint";
import "./i18n";

const Header = () => (
  <div>
    <Link to="/">Home</Link> -&nbsp;
    <Link to="/new">New</Link>
  </div>
);

const App = () => {
  const { t } = useTranslation();
  return (
    <Router>
      <Header />
      <Route exact path="/" component={ListPage} />
      <Route path="/new" render={() => <NewComplaintPage t={t} />} />
    </Router>
  );
};

export default App;
