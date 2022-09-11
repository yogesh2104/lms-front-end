import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import InputFields from "./components/InputFields";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [loginCred, setLoginCred] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { userName, password } = loginCred;

    if (!userName || !password) {
      toast("username and passowrd is required");
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login/`,
        {
          username: userName,
          password: password,
        }
      );
      if (response.status === 200) {
        toast.success(`${response.data.user_info.username} successfull loggedIn`);
        const { user_info:user, token } = response.data;
        const newUserObject = { ...user, token };
        localStorage.setItem("user", JSON.stringify(newUserObject));
        if (user.is_admin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data.non_field_errors[0]
      || error.message;
      toast.error(errorMessage);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginCred((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Form className="w-50 mx-auto my-4">
        <InputFields
          type="text"
          placeholder="userName"
          label="userName"
          value={loginCred.userName}
          name="userName"
          onChange={handleChange}
        />
        <InputFields
          type="password"
          label="Password"
          placeholder="password"
          name="password"
          value={loginCred.password}
          onChange={handleChange}
        />
        <Button
          variant="primary"
          type="submit"
          onClick={handleLogin}
          disabled={!loginCred.userName || !loginCred.password}
        >
          Submit
        </Button>
      </Form>
      <Link to="/register">New user? Register</Link>
    </Container>
  );
}

export default Login;
