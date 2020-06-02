import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import "./App.css";

import Kendra from "./components/Kendra/Kendra";

function App() {
  return (
    <BrowserRouter>
      <NavWrapper>
        <NavLink to="/">MoDA Home</NavLink>
        <NavLink to="/kendra">Kendra</NavLink>
      </NavWrapper>
      <Switch>
        <Route exact path="/">
          <div>MoDA</div>
        </Route>
        <Route exact path="/kendra">
          <Kendra />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

const NavWrapper = styled.nav`
  background: pink;
  color: white;
  position: relative;
  font-size: 20px;
  margin: 0;
  padding: 10px 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default App;
