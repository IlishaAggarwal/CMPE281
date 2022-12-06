import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar';
import { useEffect } from 'react';
import RobotModal from './RobotModal';
import backendServer from '../../Config'
import { Button } from 'react-bootstrap';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Receipt from '../Dashboards/Receipt';
// const Delivery = props => (
//   <tr>
//     <td onClick={()=>setcurrentRobot(props.delivery.robotname)}>{props.delivery.robotname}</td>
//     <td>{props.delivery.robottype}</td>
//     <td>{props.delivery.duration}</td>
//     <td>{props.delivery.date}</td>
//     {/* <td></td> */}
//     {/* <td>{props.delivery.date.substring(0,10)}</td> */}
//     <td>{props.delivery.address}</td>
//     <td>{props.delivery.deliveryStatus}</td>
//   </tr>
// )

export default function DeliveriesList(props) {
  
  const [currentRobot, setcurrentRobot] = useState("")
  const [deliveries, setDeliveries] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [OrderResponse, setOrderResponse] = useState([]);
  const [currentCard, setCurrentCard] = useState([]);
  const [openOrder, setOpenOrder] = useState(false);
  const [value, setValue] = useState([])

  useEffect(()=>{
     axios.get('http://18.206.173.78:4000/deliveries/')
    .then(response => {
      setDeliveries(response.data)
      // this.setState({ deliveries: response.data })
    })
    .catch((error) => {
      console.log(error);
    })

    // const CustomerId = localStorage.getItem("CustomerID")

   

    // console.log("orders", response.data)
    // setOrderResponse(response.data)
    // setValue(response.data)

  },[]) 
  

  
  const deleteDelivery = (id) =>{
    axios.delete('http://18.206.173.78:4000/deliveries/'+id)
      .then(response => { console.log(response.data)});

      setDeliveries(deliveries.filter(el => el._id !== id))
  }

  const deliveryList = ()=> {
    return deliveries.map(currentdelivery => {
      return <tr>
        <td><Button onClick={()=>{setShow(true);setcurrentRobot(currentdelivery.robotname)}}>{currentdelivery.robotname}</Button></td>
        <td>{currentdelivery.robottype}</td>
        <td>{currentdelivery.date}</td>
        {/* <td></td> */}
        {/* <td>{props.delivery.date.substring(0,10)}</td> */}
        <td>{currentdelivery.address}</td>
        <td>{currentdelivery.deliveryStatus}</td>
      </tr>;
    })
  }

    return (
        <>
        <AdminNavbar/>
         <div style={{ height:'100vh'}}>
        <h3 style={{color: 'black', marginLeft:'auto', width: '50%', fontSize: '2rem', marginRight:'2rem'}}>Logged Deliveries</h3>
        <table className="table" style={{color:'black', border: '2px solid #8739fa'}}>
          <thead className="thead-light">
            <tr style={{fontSize:'1.5rem', color:'coral'}}>
              <th>Robotname</th>
              <th>Robot Type</th>
              {/* <th>Description</th> */}
              <th>Date</th>
              <th>Delivery Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { deliveryList() }
          </tbody>
        </table>
      </div>
      {show && <RobotModal show ={show} handleClose={handleClose} robotName={currentRobot}/>}
      
        </>
     
    )
  }