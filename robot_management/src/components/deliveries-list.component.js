import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Delivery = props => (
  <tr>
    <td>{props.delivery.robotname}</td>
    <td>{props.delivery.description}</td>
    <td>{props.delivery.duration}</td>
    <td></td>
    {/* <td>{props.delivery.date.substring(0,10)}</td> */}
    <td>{props.delivery.deliveryStatus}</td>
  </tr>
)

export default class DeliveriesList extends Component {
  constructor(props) {
    super(props);

    this.deleteDelivery = this.deleteDelivery.bind(this)

    this.state = {deliveries: []};
  }

  componentDidMount() {
    axios.get('http://localhost:4000/deliveries/')
      .then(response => {
        this.setState({ deliveries: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteDelivery(id) {
    axios.delete('http://localhost:4000/deliveries/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      deliveries: this.state.deliveries.filter(el => el._id !== id)
    })
  }

  deliveryList() {
    return this.state.deliveries.map(currentdelivery => {
      return <Delivery delivery={currentdelivery} deleteDelivery={this.deleteDelivery} key={currentdelivery._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Deliveries</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Robotname</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { this.deliveryList() }
          </tbody>
        </table>
      </div>
    )
  }
}