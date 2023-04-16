import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function Register({ setIsAuth }) {
  const navigate = useNavigate();

  function ValidateEmail(input) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
      return true;
    } else {
      alert("Invalid email address");
      return false;
    }
  }

  const tokenemail = localStorage.getItem("tokenemail");
  const tokenpassword = localStorage.getItem("tokenpassword");
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    role: null,
  });
  const [form, setForm] = useState(1);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const login = async () => {
    const emailx = jwt(tokenemail);
    const passwordx = jwt(tokenpassword);

    const response = await fetch(process.env.REACT_APP_AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailx.email,
        password: passwordx.password,
      }),
    });

    return await response.json();
  };

  useEffect(() => {
    if (tokenemail && tokenpassword) {
      const data = login();

      if (!data.message) {
        setIsAuth(true);
        navigate("/");
      } else {
        alert(data.message);
        setIsAuth(false);
      }
    }
  }, []);

  useEffect(() => {
    setuser({ name: "", email: "", password: "", role: null });
    setemail("");
    setpassword("");
  }, [form]);

  async function LoginUser(event) {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("please enter full details");
      navigate("/register");
      return;
    }
    if (ValidateEmail(email) === false) {
      navigate("/register");
      return;
    }

    const response = await fetch(process.env.REACT_APP_AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!data.message) {
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("tokenemail", data.tokenemail);
      localStorage.setItem("tokenpassword", data.tokenpassword);
      setIsAuth(true);
      navigate("/");
    } else {
      alert(data.message);
      setIsAuth(false);
      navigate("/register");
    }
  }

  async function RegisterUser(event) {
    event.preventDefault();

    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.role === null
    ) {
      alert("please enter full details");
      navigate("/register");
      return;
    }
    if (ValidateEmail(user.email) === false) {
      navigate("/register");
      return;
    }

    const res = await fetch(process.env.REACT_APP_AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      }),
    });

    const data = await res.json();

    if (!data.message) {
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("tokenemail", data.tokenemail);
      localStorage.setItem("tokenpassword", data.tokenpassword);
      setIsAuth(true);
      navigate("/");
    } else {
      alert(data.message);
      setIsAuth(false);
      navigate("/register");
    }
  }

  return (
    <div className="my-4 card w-75 mx-auto">
      <Nav variant="tabs" defaultActiveKey="link-1">
        <Nav.Item className="w-50 text-center">
          <Nav.Link
            eventKey="link-1"
            onClick={(e) => {
              e.preventDefault();
              setForm(1);
            }}
          >
            Log In
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="w-50 text-center">
          <Nav.Link
            eventKey="link-2"
            onClick={(e) => {
              e.preventDefault();
              setForm(2);
            }}
          >
            Sign UP
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {form === 2 ? (
        <Form className="my-2 mx-2">
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              value={user.name}
              onChange={(e) => setuser({ ...user, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
            />
          </Form.Group>
          <div key="inline" className="mb-3">
            <Form.Check
              inline
              type="radio"
              label="Student"
              id="Student"
              name="role"
              onChange={(e) => setuser({ ...user, role: 0 })}
            />
            <Form.Check
              inline
              type="radio"
              label="Teacher"
              id="Teacher"
              name="role"
              onChange={(e) => setuser({ ...user, role: 1 })}
            />
          </div>
          <Button
            className="w-20 mx-auto"
            variant="primary"
            type="submit"
            onClick={RegisterUser}
          >
            Sign Up
          </Button>
        </Form>
      ) : (
        <Form className="my-2 mx-2">
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          <Button
            className="w-20 mx-auto"
            variant="primary"
            type="submit"
            onClick={LoginUser}
          >
            Log In
          </Button>
        </Form>
      )}
    </div>
  );
}

export default Register;
