import Login from './Login';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import '../images/style.css';
import axios from 'axios';
//import logo from '../images/uberlogo.svg';
import wavebg from '../images/bg.jpeg';
import backendServer from '../Config'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { signed } from '../actions';
import { Row, Col, Alert } from 'react-bootstrap';



const RestaurantRegister = () => {
    const history = useHistory();
    const [RestaurantName, setRestaurantName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [alert, setAlert] = useState('');


    const Register = () => {
        axios.post(`${backendServer}/RegisterUser/Restaurant`,
            { RestaurantName: RestaurantName, useremail: email, userpassword: password }
        ).then((response) => {
            console.log(response)
            dispatch(signed(RestaurantName, email));
            localStorage.setItem("RestaurantId",  response.data.Restaurantid)
            history.push('/RestaurantDashboard')
        })
        .catch((error) => {
                console.log("catch block")
                setAlert("Email Already Exists")
            })
    }

    console.log("alerting", alert)
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

    }
    const styleimg = {
        display: 'block',
        margin: 'auto'
    }
    const stylebutton = {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${wavebg})`
    }
    const textstyle = {
        fontsize: '30px',
        lineheight: '36px',
        fontfamily: 'UberMoveText-Medium,Helvetica,sans-serif',
        marginbottom: '36px',
        textalign: 'center',
        margin: '0px auto',
        display: 'block'
    }
    return (
        <>
            <Login />
            <div className="Login" style={stylebutton}>
                <Form onSubmit={handleSubmit}>
                    {/* <img src={logo} width={'200'} height={'150'} style={styleimg} alt='' /> */}
                    <br></br>
          <h2 style={textstyle}>Welcome!</h2>
          <br></br>
          <h6 style={textstyle}>Please Sign Up here!</h6>
          <br></br>

                    <Form.Group size="lg" controlId="username">
                        <Form.Label>Restaurant Name</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={RestaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br></br>
                    <Button block size="lg" type="submit" onClick={() => Register()} style={styleimg} disabled={!validateForm()}>
                        Submit
                    </Button>
                    <br>
                    </br>
                    {alert.length > 0 && < Alert variant="danger" >{alert}</Alert>}

                </Form>
            </div>
        </>
    )
}

export default RestaurantRegister;