import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Icon, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Login, SignUp } from "../redux/userReducer/action";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((store) => store.userReducer.message);
  const toast = useToast();
  const { isLoggedIn } = useSelector((store) => store.userReducer);

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [password, setpass] = useState("");
  const [email, setemail] = useState("");
  const [userName, setname] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const toggleForm = (formType) => {
    if (formType === "login") {
      setShowLoginForm(true);
      setShowSignUpForm(false);
    } else {
      setShowLoginForm(false);
      setShowSignUpForm(true);
    }
  };

  const handlelogin = (e) => {
    e.preventDefault();
    let payload = {
      email,
      password,
    };
    if (email === "" || password === "") {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      dispatch(Login(payload, toast, navigate));
      setemail("");

      setpass("");
    }
  };
  const handle = (e) => {
    e.preventDefault();

    let obj = {
      email,
      password,
      confirmPassword,
      userName,
    };
    //  obj.userName= name;

    //  console.log(obj)

    if (
      email === "" ||
      password === "" ||
      userName === "" ||
      confirmPassword === ""
    ) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      dispatch(SignUp(obj, toast));
      setemail("");
      setname("");
      setpass("");
      setconfirmPassword("");
    }
  };

  useEffect(() => {
    if (message === "User created") {
      toggleForm("login");
    }
    if (message === "Login Successful") {
      navigate("/");
    }
  }, [message]);
  useEffect(() => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const endpoint = url.pathname;

    if (endpoint === "/login") {
      setShowLoginForm(true);
      setShowSignUpForm(false);
    } else {
      setShowLoginForm(false);
      setShowSignUpForm(true);
    }
  }, []);

  return (
    <Body>
      <LoginBox>
        <LoginSnip>
          <TabInput id="tab-1" name="tab" className="sign-in" defaultChecked />
          <TabLabel
            htmlFor="tab-1"
            onClick={() => toggleForm("login")}
            active={showLoginForm}
          >
            Login
          </TabLabel>

          <TabInput id="tab-2" name="tab" className="sign-up" />
          <TabLabel
            htmlFor="tab-2"
            onClick={() => toggleForm("signup")}
            active={showSignUpForm}
          >
            Sign Up
          </TabLabel>

          {showLoginForm ? (
            <LoginForm showForm={showLoginForm}>
              <div>
                <p>Email</p>
                <Input
                  placeholder="Enter your Email"
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                ></Input>
              </div>
              <br />
              <br />
              <div>
                <p>password</p>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setpass(e.target.value)}
                ></Input>
              </div>
              <br />
              <br />

              <Button onClick={handlelogin}>Login</Button>
            </LoginForm>
          ) : (
            ""
          )}
          {showSignUpForm ? (
            <LoginForm showForm={showSignUpForm}>
              <div>
                <p>Name</p>
                <Input
                  placeholder="Enter your name"
                  type="text"
                  value={userName}
                  onChange={(e) => setname(e.target.value)}
                ></Input>
              </div>
              <br></br>
              <div>
                <p>Email</p>

                <Input
                  placeholder="Enter your Email"
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                ></Input>
              </div>
              <br></br>
              <div>
                <p>password</p>
                <Input
                  placeholder="Create password"
                  type="password"
                  value={password}
                  onChange={(e) => setpass(e.target.value)}
                ></Input>
              </div>
              <br></br>
              <div>
                <p> confirm password</p>
                <Input
                  placeholder="Enter same password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                ></Input>
              </div>
              <br />
              <br />
              <Button onClick={handle}>Sign Up</Button>
            </LoginForm>
          ) : (
            ""
          )}
        </LoginSnip>
      </LoginBox>
    </Body>
  );
};

const Body = styled.div`
  margin: 10px;
  color: #1d1d20;
  font: 300 12px/14px "Open Sans", sans-serif;
`;

const LoginBox = styled.div`
  width: 100%;
  margin: auto;
  max-width: 525px;
  min-height: 670px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }

  /* Media query for screens with a maximum width of 576px */
  @media (max-width: 576px) {
    width: 100%;
    max-width: 400px;
    min-height: 670px;
  }
  @media (max-width: 300px) {
    width: 100%;
    max-width: 100%;
    max-width: 400px;
    min-height: 670px;
  }
`;

const LoginSnip = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 10%;
  position: absolute;
  padding: 90px 70px 50px 70px;

  @media (max-width: 576px) {
    width: 100%;
    padding: 20px;
    margin-left: 1%;
  }
  @media (max-width: 300px) {
    width: 100%;
    padding: 0px;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: rotateY(90deg);
    opacity: 0;
  }
  to {
    transform: rotateY(0deg);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: rotateY(0deg);
    opacity: 1;
  }
  to {
    transform: rotateY(90deg);
    opacity: 0;
  }
`;

const LoginForm = styled.div`
  margin-top: 30px;
  margin-left: 10px;
  animation: ${fadeIn} 0.5s ease-in-out,
    ${(props) => (props.showForm ? slideIn : slideOut)} 0.8s ease-in-out;
`;

const TabInput = styled.input.attrs({ type: "radio" })`
  display: none;
`;

const TabLabel = styled.label`
  font-size: 15px;
  margin-right: 15px;
  padding-bottom: 5px;
  margin: 0 15px 10px 0;
  display: inline-block;
  border-bottom: 2px solid transparent;
  text-transform: uppercase;

  /* color: #6a6f8c; */
  color: ${(props) => (props.active ? "red" : "black")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  &:hover {
    color: #c21d1d;
    border-color: #1161ee;
    font-style: "bold";
  }
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin: auto;
  border: none;
  margin-bottom: 20px;
  border-bottom: 2px solid black;

  &:focus {
    outline: none;
    border-bottom: 3px solid;
    border-bottom-color: #0f2dda; /* Color on hover and focus */
  }

  @media (max-width: 576px) {
    width: 100%;
  }

  @media (min-width: 577px) and (max-width: 992px) {
    width: 80%;
  }
`;

const Button = styled.button`
  width: 20%;
  padding: 10px;
  margin-left: 30%;
  background-color: blue;
  border: none;
  border-radius: 20px;
  color: white;

  &:hover {
    background-color: white;
    border: 1px solid black; /* Adding a border on hover */
    color: black;
  }

  @media (max-width: 576px) {
    width: 100%;
    margin-left: 0;
  }

  @media (min-width: 577px) and (max-width: 992px) {
    margin-left: 20%;
  }
`;
