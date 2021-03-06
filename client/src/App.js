import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import ContactState from "./context/contact/ContactState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alert";
import setAuthToken from "./utils/setTokenAuth";
import PrivateRoute from "./components/routing/PrivateRoute";
setAuthToken(localStorage.token);
const App = () => {
  return (
    <AlertState>
      <AuthState>
        <ContactState>
          <Fragment>
            <Router>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Router>
          </Fragment>
        </ContactState>
      </AuthState>
    </AlertState>
  );
};

export default App;
