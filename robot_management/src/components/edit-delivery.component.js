import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditDelivery extends Component {
  constructor(props) {
    super(props);

    this.onChangeRobotname = this.onChangeRobotname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      robotname: '',
      description: '',
      duration: 0,
      date: new Date(),
      robots: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/deliveries/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          robotname: response.data.robotname,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:4000/robots/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            robots: response.data.map(robot => robot.robotname),
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

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const delivery = {
      robotname: this.state.robotname,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(delivery);

    axios.post('http://localhost:4000/deliveries/update/' + this.props.match.params.id, delivery)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Delivery Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Robotname: </label>
          <select ref="robotInput"
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
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Delivery Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}