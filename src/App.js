import React from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import './index.scss';

import ListPage from "./pages/List";
import NewComplaintPage from "./pages/NewComplaint"

const Header = () => (
  <div>
    <Link to="/">Home</Link> -&nbsp;
    <Link to="/new">New</Link>
  </div>
)

const App = () => {

  return (
    <Router>
      <Header />
      <Route exact path="/" component={ListPage} />
      <Route path="/new" component={NewComplaintPage} />
    </Router>
  )
}

export default App;
