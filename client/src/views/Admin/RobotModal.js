import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { Modal } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

function RobotModal({show,handleClose, robotName}) {
    // const { robotName } = useParams();
    const [robotDetails, setRobotDetails] = useState();

    const getRobotDetails = ()=>{
        axios.post(`http://18.206.173.78:4000/robotDetails/`,{robotName: robotName})
      .then(response => {
        console.log(response.data)
        setRobotDetails({ robots: response.data[0] })
      })
      .catch((error) => {
        console.log("API not found");
        console.log(error);
      })
    }
    useEffect(()=>{
        getRobotDetails()
    },[])
  return (
    <Modal show={show} onHide={handleClose}>
        <div style={{fontSize:'1.5rem'}}>Robot Details</div>
        <br/>
       <div>Robot Name: {robotDetails?.robots?.robotname}</div> 
        <div>Robot Type: {robotDetails?.robots?.robottype}</div>
        <div>Manufacturer: {robotDetails?.robots?.manufacturer}</div>
        <div>CreatedAt: {robotDetails?.robots?.createdAt}</div>
        <div>IsAvailable: {robotDetails?.robots?.isAvailable ? "true": "false"}</div>
    </Modal>
  )
}

export default RobotModal