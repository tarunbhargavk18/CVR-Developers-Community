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
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddProject from "./components/profile-forms/AddProject";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
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
        <div className="main-container">
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/settings" component={Settings} />
            <PrivateRoute
              exact
              path="/createProfile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/editProfile" component={EditProfile} />
            <PrivateRoute exact path="/addProject" component={AddProject} />
            <PrivateRoute exact path="/feed" component={Posts} />
            <PrivateRoute exact path="/feed/:id" component={Post} />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
