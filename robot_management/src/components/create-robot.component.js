import React, { Component } from 'react';
import axios from 'axios';



export default class CreateRobot extends Component {
  constructor(props) {
    

    super(props);

    this.onChangeRobotname = this.onChangeRobotname.bind(this);
    this.onChangeRobotType=this.onChangeRobotType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      robotname: '',
      robottype:'',
    robots:[]
  }

  }
  componentDidMount() {
    axios.get('http://localhost:4000/robots/')
      .then(response => {
        console.log(response.data)
        this.setState({ robots: response.data })
      })
      .catch((error) => {
        console.log("API not found");
        console.log(error);
      })
  }
  

  onChangeRobotname(e) {
    this.setState({
      robotname: e.target.value
    })
  }


  
  onChangeRobotType(e) {
    console.log(e.target.value)
    this.setState({
      robottype: e.target.value
    })
    console.log(this.state)
  }


  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.robottype);
    const robot = {
      robotname: this.state.robotname,
      robottype: this.state.robottype
    }

    console.log(robot);

    axios.post('http://localhost:4000/robots/add', robot)
      .then(res => console.log(res.data + 'in 4000 robots add'));

    
  }

  robotList() {
    if (this.state.robots && this.state.robots.length){


    return this.state.robots.map(robot => {
      return (<tr>
        <td>{robot.robotname}</td>
        <td>{robot.robottype}</td>
        <td>{robot.createdAt}</td>
        {/* <td>
           <a href="#" onClick={() => { props.deleteDelivery(props.delivery._id) }}>delete</a>
        </td> */}
      </tr>);
    })
    }else{
      return (<tr><td>Loading</td></tr>)
    }
  }
  render() {
    return (
      <>
      <div>
        <h3>Create New robot</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Robotname: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.robotname}
                onChange={this.onChangeRobotname}
                />
          </div>
    <div className='form-group'>
      <label>
        Type of Robot
      </label>

      <select value={this.state.robottype} onChange={this.onChangeRobotType}>
        <option value="Model A">Model A</option>
        <option value="Model B">Model B</option>
        <option value="Model C">Model C</option>
      </select>
      

    </div>
          <div className="form-group">
            <input type="submit" value="Create robot" className="btn btn-primary" />
          </div>
        </form>
        
    </div>
    <div className='form-group'>
    <h3>Robots Available:</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Robotname</th>
              <th>Robot Type</th>
              <th>Date Created</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { this.robotList() }
          </tbody>
        </table>
    </div>
    </>

    )
  }
}