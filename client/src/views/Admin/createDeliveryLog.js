import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import AdminNavbar from '../AdminNavbar';

export default class CreateDeliveryLog extends Component {
  constructor(props) {
    super(props);

    this.onChangeRobotname = this.onChangeRobotname.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      robotname: '',
      robots:[],
      deliveries: []
    }
  }

  componentDidMount() {
    axios.get('http://107.21.135.25:4000/robots/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            robots: response.data.map(robot => robot.robotname),
            robotname: response.data[0].robotname
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeRobotname(e) {
    this.setState({
      robotname: e.target.value
    })
  }

  deliveryList() {
    if (this.state.deliveries && this.state.deliveries.length){


    return this.state.deliveries.map(delivery => {
      return (<tr>
        <td>{delivery.robotname}</td>
        <td>{delivery.date}</td>
          <td>{delivery.deliveryStatus}</td>
      
      </tr>);
    })
    }else{
      return (<tr><td>Loading</td></tr>)
    }
  }

  

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    
    e.preventDefault();

    const delivery = {
      robotname: this.state.robotname
    }

    console.log(delivery);

    axios.post('http://107.21.135.25:4000/deliveries/getLog', delivery)
      .then(res => this.setState({
        deliveries :res.data
      }));


   
  }

  // deliveryLog() {
  //   return this.state.deliveries.map(currentdelivery => {
  //     return <Delivery delivery={currentdelivery} deleteDelivery={this.deleteDelivery} key={currentdelivery._id}/>;
  //   })
  // }

  render() {
    return (
        <>
    <AdminNavbar/>
    <div style={{ height:'100vh', backgroundColor: 'black'}}>
    <div   >
      <h3 style={{color: 'coral', marginLeft:'auto', width: '50%', fontSize: '3rem', marginRight:'2rem'}}>Create New Delivery Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label style={{backgroundColor: 'black',color:'blanchedalmond', fontSize:'2.5rem'}}>Robotname: </label>
          <select  ref="robotInput"
              required
              className="form-control"
              value={this.state.robotname}
              onChange={this.onChangeRobotname}>
              {
                this.state.robots.map(function(robot) {
                  return <option 
                    key={robot}
                    value={robot}>{robot}
                    </option>;
                })
              }
              
          </select>
        </div>
        

      <br/>

        <div className="form-group">
          <input type="submit" value="Create Delivery Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    <div className='form-group'>
    <h3 style={{color:'blanchedalmond', fontSize:'2.5rem'}}>Deliveries:</h3>
        <table className="table">
          <thead className="thead-light">
            <tr style={{color:'coral', fontSize:'2rem'}}>
              <th>Robotname</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody style={{color:'white', fontSize:'1rem',  border: '2px solid #8739fa'}}>
            { this.deliveryList() }
          </tbody>
        </table>
    </div>
    </div>
        </>
   
    )
  }
}