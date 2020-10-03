import React from "react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

import "./index.scss";
import ListPage from "./pages/List";
import NewComplaintPage from "./pages/NewComplaint";
import SearchComplaintPage from "./pages/SearchComplaint";

import "./i18n";
import LanguageSelect from "./components/LanguageSelect";

const Header = () => (
  <>
    <div className="column">
      <Link to="/">Home</Link> -&nbsp;
      <Link to="/new">New</Link> -&nbsp;
      <Link to="/search">Search</Link> &nbsp;
      <LanguageSelect />
    </div>
  </>
);

const App = () => {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={ListPage} />
      <Route path="/new" component={NewComplaintPage} />
      <Route path="/search" component={SearchComplaintPage} />
    </Router>
  );
};

export default App;
