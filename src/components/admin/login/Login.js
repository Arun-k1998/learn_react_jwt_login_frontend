import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { Button, Form } from "react-bootstrap";

import './Login.css'
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await axios.post('/admin/login',{email,password})
        if(response.data.status){
            navigate('/admin/home') 
        } else{
            alert(response.data.message)  
        }

    }
  return (
    <div className="form" >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
         
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)} />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          
          <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
