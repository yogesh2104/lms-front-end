import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import InputFields from "./components/InputFields";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    password: "",
    email: "",
    username: "",
  });
  const [ isAdmin, setIsAdmin] = useState(false)

  const {  password, email, username } =
    registerData;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(registerData)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register/`,
        {
          ...registerData,
          is_staff:isAdmin
        }
      );
      console.log(response)
      if (response.status === 200) {
        toast.success("successfully register");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data.non_field_errors[0] || error.message;
      toast.error(errorMessage);
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(registerData);
  return (
    <Container>
      <Form className="w-50 mx-auto my-4" onSubmit={handleSubmit}>
        <InputFields
          type="text"
          placeholder="username"
          label="Username"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <InputFields
          type="email"
          placeholder="email"
          label="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <InputFields
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <Form.Switch
         onChange={()=>setIsAdmin(!isAdmin)}
         id="custom-switch"
         label="Admin"
         checked={isAdmin}
        />
        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={
            !email ||
            !username ||
            !password
          }
        >
          Submit
        </Button>
      </Form>
      <Link to="/login">Alerdy a user? Login</Link>
    </Container>
  );
};

export default Register;
