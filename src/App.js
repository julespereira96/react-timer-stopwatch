import React from "react";
import "./App.css";
import Button from "./components/button/button";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stopwatch from "./screen/stopwatch/stopwatch";
import Timer from "./screen/timer/timer";
import Home from "./screen/homepage";

function App() {
  return (
    <Router>
      <a className="Home" href="/">Home</a>
      <div>
        <Switch>
          <Route path="/" component={Home} exact strict />
          <Route path="/stopwatch" component={Stopwatch} exact strict />
          <Route path="/timer" component={Timer} exact strict />
        </Switch>
      </div>
    </Router>
  );
}

export default App;