import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import "./App.css";

import Kendra from "./components/Kendra/Kendra";
import IntroAnimation from "./components/IntroAnimation/IntroAnimation";
import Gallery from "./components/Eric/Gallery";
import LeonardGallery from "./components/MoDerangedArt";

function App() {
  return (
    <BrowserRouter>
      <NavWrapper>
        <NavLink to="/">MoDA Home</NavLink>
        <NavLink to="/kendra">Kendra</NavLink>
        <NavLink to="/eric">Eric</NavLink>
        <NavLink to="/MoDerangedArt">Leonard</NavLink>
      </NavWrapper>
      <Switch>
        <Route exact path="/">
          <IntroAnimation />
        </Route>
        <Route exact path="/kendra">
          <Kendra />
        </Route>
        <Route exact path="/eric">
          <Gallery />
        </Route>
        <Route path="/MoDerangedArt">
          <LeonardGallery />
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
