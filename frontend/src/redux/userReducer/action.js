import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType";

export const Login = (data, toast) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  console.log("hi");
  // fetch("http://localhost:7070/users/login",{
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify(data),
  // })
  // .then(res=>
  //     {//console.log("res")
  //     res.json()})
  // .then(res=>{
  //     let m=false
  //     console.log(res, "resData")
  //     if(res.message==='Login successful'){
  //         m=true
  //     }
  //     {m?toast({title:'success',description: res.message,status: 'success', duration: 3000,  isClosable: true,position:"top",}):
  //     toast({ title: "Error",description: res.message,status: 'error', duration: 3000, isClosable: true,position:"top", })}

  //     dispatch({type:SIGNUP_SUCCESS,payload:res.message})
  //      localStorage.setItem("token",res.token);
  //      localStorage.setItem("userData",res.user);
  //     dispatch({type:LOGIN_SUCCESS,payload:res})
  // })
  // .catch(err=>{

  //    console.log(err,"err")
  //    dispatch({type:LOGIN_FAILURE})
  // })

  fetch("http://localhost:7070/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(res)
      console.log(res, "resData");

      if (res.message === "Login Successful") {
        dispatch({ type: SIGNUP_SUCCESS, payload: res.message });

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        dispatch({ type: LOGIN_SUCCESS, payload: res });

        toast({
          title: "success",
          description: res.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Error",
          description: res.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    })
    .catch((err) => {
      console.log(err, "err");
      dispatch({ type: LOGIN_FAILURE });
    });
};

export const SignUp = (data, toast) => (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  fetch("http://localhost:7070/users/registration", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let m = false;
      if (res.message === "User created") {
        m = true;
      }
      {
        m
          ? toast({
              title: "success",
              description: res.message,
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            })
          : toast({
              title: "Error",
              description: res.message,
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
      }

      dispatch({ type: SIGNUP_SUCCESS, payload: res.message });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SIGNUP_FAILURE });
    });
};
