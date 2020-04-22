import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/layout/Footer";
import Alert from "./components/layout/Alert";
import Settings from "./components/settings/Settings";
import CreateProfile from "./components/profile-forms/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import PageNotFound from "./components/layout/PageNotFound";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { setAuthToken } from "./utilities/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/settings" component={Settings} />
            <PrivateRoute exact path="/createProfile" component={CreateProfile} />
          </Switch>
          </Router>
        <Footer />
    </Provider>
  );
};

export default App;
