import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import FamilyListing from "../src/Pages/FamilyListing/index";
import FamilyTree from "../src/Pages/FamilyTree/index";

let Routes = [
  {
    path: "/",
    component: FamilyListing,
    exact: true,
  },
  {
    path: "/familyListing",
    component: FamilyListing,
  },
  {
    path: '/familytree',
    exact:true,
    component: FamilyTree
  }
]

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            {Routes.map((route, index) => {
              return <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                /> 
            })}
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
