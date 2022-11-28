import React, { Component } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar';



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

    return axios.post('http://localhost:4000/robots/add', robot)
      .then(res => window.location.reload(true));

    
  }
  deleteRobot(id){
    axios.delete('http://localhost:4000/robots/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      robots: this.state.robots.filter(el => el._id !== id)
    })
  }

  robotList() {
    if (this.state.robots && this.state.robots.length){


    return this.state.robots.map((robot,index) => {
      return (<tr key={index}>
        <td>{robot.robotname}</td>
        <td>{robot.robottype}</td>
        <td>{robot.createdAt}</td>
        <td>
           <a href="#" onClick={() => { this.deleteRobot(robot._id) }}>delete</a>
        </td>
      </tr>);
    })
    }else{
      return (<tr><td>Loading</td></tr>)
    }
  }
  
  render() {
    
    return (
        <>
        <AdminNavbar/>
        <div style={{ height:'100vh', backgroundColor: 'black'}}>
      <div>
        <h3 style={{color:'coral', fontSize:'2.5rem'}}>Create New robot</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label style={{color:'blanchedalmond', fontSize:'2.5rem'}}>Robotname: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.robotname}
                onChange={this.onChangeRobotname}
                />
          </div>
          <br/>
    <div className='form-group'>
      <label style={{color:'blanchedalmond', fontSize:'2.5rem'}}>
        Type of Robot
      </label>
<br/>
      <select value={this.state.robottype} onChange={this.onChangeRobotType}>
        <option value="Model A">Model A</option>
        <option value="Model B">Model B</option>
        <option value="Model C">Model C</option>
      </select>
      
      <br/>
    </div>
    <br/>
          <div className="form-group">
            <input type="submit" value="Create robot" className="btn btn-primary" />
          </div>
        </form>
        
    </div>
    <br/>
    <div className='form-group'>
    <h3 style={{color:'blanchedalmond', fontSize:'2.5rem'}}>Robots Available:</h3>
        <table className="table">
          <thead className="thead-light">
            <tr style={{color:'coral', fontSize:'2rem'}}>
              <th>Robotname</th>
              <th>Robot Type</th>
              <th>Date Created</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody style={{color:'white', fontSize:'1rem', border: '2px solid #8739fa'}}>
            { this.robotList() }
          </tbody>
        </table>
    </div>
    </div>
        </>
    

    )
  }
}