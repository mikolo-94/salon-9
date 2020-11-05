import React from "react";
import SalonList from "./containers/SalonList";
import SalonView from "./containers/SalonView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ maxWidth: "375px", margin: "0px auto", marginTop: "150px" }}>
      <Router>
        <Switch>
          <Route path={"/salon/:salonId"}>
            <SalonView />
          </Route>
          <Route path={"/"}>
            <SalonList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
