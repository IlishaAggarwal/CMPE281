import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import backendServer from '../../Config';
import AdminNavbar from '../AdminNavbar';

function RobotDetails() {
    const { robotName } = useParams();
    const [robotDetails, setRobotDetails] = useState();

    const getRobotDetsils = ()=>{
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

    

  const robotList= ()=> {
    
      return (<tr >
        <td>{robotDetails?.robots?.robotname}</td>
        <td>{robotDetails?.robots?.robottype}</td>
        <td>{robotDetails?.robots?.createdAt}</td>
        
      </tr>);
   
   
  }


    useEffect(()=>{
        getRobotDetsils()
    },[])
  return (
   
    <>
    <AdminNavbar/>
    {/* <div>{robotDetails?.robots?.robotname}</div> */}
    <div style={{ height:'100vh'}}>
 
<div className='form-group'>
    <table className="table">
      <thead className="thead-light">
        <tr style={{color:'black', fontSize:'2rem'}}>
          <th>Robotname</th>
          <th>Robot Type</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody style={{color:'black', fontSize:'1rem', border: '2px solid #8739fa'}}>
        { robotList() }
      </tbody>
    </table>
</div>
</div>
    </>
  )
}

export default RobotDetails