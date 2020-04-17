import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/layout/Footer"
import PageNotFound from "./components/layout/PageNotFound"

//Redux
import {Provider} from 'react-redux';
import store from './store';


const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div>
          <Navbar/>
          <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route component={PageNotFound}/>
          </Switch>
          <Footer/>
      </div>
    </Router>
    </Provider>
  );
};

export default App;
