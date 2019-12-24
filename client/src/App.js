import React  from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar"

import Home from "./components/Home"
import User from "./components/User"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Register from "./components/Register"
import PageNotFound from "./components/PageNotFound"
import Tool from "./components/Tool"



function App() {

  return (
    <div >
      <Router>
          <Navbar /> 
            <Switch>

              <Route path="/" exact component={Home} />
              <Route path="/user"  component={User} />
              <Route path="/login"  component={Login} />
              <Route path="/singup"  component={Register} />
              <Route path="/tool/:id"  component={Tool} />
              <Route path="/tool" exaxt component={Tool} />

              <Route path="/"  component={PageNotFound} />
            </Switch>

          <Footer />
      </Router>
    </div>
  );
}

export default App;
