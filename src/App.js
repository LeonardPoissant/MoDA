import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div>MoDA</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
