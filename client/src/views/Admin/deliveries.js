import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar';

const Delivery = props => (
  <tr>
    <td>{props.delivery.robotname}</td>
    <td>{props.delivery.duration}</td>
    <td>{props.delivery.date}</td>
    {/* <td></td> */}
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
    axios.get('http://107.21.135.25:4000/deliveries/')
      .then(response => {
        this.setState({ deliveries: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteDelivery(id) {
    axios.delete('http://107.21.135.25:4000/deliveries/'+id)
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
        <>
        <AdminNavbar/>
         <div style={{ height:'100vh', backgroundColor: 'black'}}>
        <h3 style={{color: 'coral', marginLeft:'auto', width: '50%', fontSize: '2rem', marginRight:'2rem'}}>Logged Deliveries</h3>
        <table className="table" style={{backgroundColor: 'black',color:'white', border: '2px solid #8739fa'}}>
          <thead className="thead-light">
            <tr style={{fontSize:'1.5rem', color:'burlywood'}}>
              <th>Robotname</th>
              {/* <th>Description</th> */}
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
        </>
     
    )
  }
}