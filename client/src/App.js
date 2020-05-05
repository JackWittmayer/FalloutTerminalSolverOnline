import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";

const App = () => {
  return (
        <Route exact path="/Home" component={Home} />
  );
};

export default App;
