import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/layout/Footer"
const App = () => {
  return (
    <Router>
      <div>
          <Navbar/>
          <Route exact path="/" component={Landing} />
          <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          </Switch>
          <Footer/>
      </div>
    </Router>
  );
};

export default App;
