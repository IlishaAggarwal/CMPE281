import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import DeliveriesList from "./components/deliveries-list.component";
import EditDelivery from "./components/edit-delivery.component";
import CreateDeliveryLog from "./components/create-delivery-log.component";
import CreateRobot from "./components/create-robot.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={DeliveriesList} />
      <Route path="/edit/:id" component={EditDelivery} />
      <Route path="/create" component={CreateDeliveryLog} />
      <Route path="/robot" component={CreateRobot} />
      </div>
    </Router>
  );
}

export default App;
