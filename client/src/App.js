import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import Demo from "./views/demo"

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/demo" component ={Demo}/>
          <Route exact path="/">
              <Redirect to="/Home" />
          </Route>
        <Route component={Home}/>
      </Switch>
    </div>
  );
};

export default App;
