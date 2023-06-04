import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../adminAxios";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { userActions } from "../../../redux/userAuthentification";

function Login() {
  const disPatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("/login", { email, password });
    if (response.data.status) {
      const date = new Date()
      date.setTime(date.getTime()+(1*24*60*60*1000))
      const expires = 'expires='+ date;
      document.cookie = "admintoken=Bearer "+response.data.token+";"+expires+"; path=/admin/home"
      disPatch(userActions.userLogin({name:response.data.name,_id:response.data.id}))
      navigate("/admin/home");
    } else {
      alert(response.data.message);
    }
  };
  return (
    <div className="form ">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
