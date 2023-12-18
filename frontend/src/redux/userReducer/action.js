// <<<<<<< fp11_100-day_5
// import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionType"

// export const Login=(data,toast)=>(dispatch)=>{
//     dispatch({type:LOGIN_REQUEST})
//     fetch("http://localhost:7070/users/login",{
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify(data),
//     })
//     .then(res=>res.json())
//     .then(res=>{
//         let m=false
//         if(res.message==='Login successful'){
//            m=true
//         }
//         {m?toast({title:'success',description: res.message,status: 'success', duration: 2000,  isClosable: true,position:"top",}):
//                  toast({ title: "Error",description: res.message,status: 'error', duration: 2000, isClosable: true,position:"top", })}
                
//         dispatch({type:SIGNUP_SUCCESS,payload:res.message})
//          localStorage.setItem("token",res.token)
//         dispatch({type:LOGIN_SUCCESS,payload:res})
//     })
//     .catch(err=>{

//        console.log(err)
//        dispatch({type:LOGIN_FAILURE})
//     })
// }

// export const SignUp=(data,toast)=>(dispatch)=>{
//       dispatch({type:SIGNUP_REQUEST})
//     fetch("http://localhost:7070/users/registration",{
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify(data),
//     })
//     .then(res=>res.json())
//     .then(res=>{
//          console.log(res)
//          let m=false
//          if(res.message==='User created'){
//             m=true
//          }
//          {m?toast({title:'success',description: res.message,status: 'success', duration: 2000,  isClosable: true,position:"top",}):
//                   toast({ title: "Error",description: res.message,status: 'error', duration: 2000, isClosable: true,position:"top", })}
                 
//          dispatch({type:SIGNUP_SUCCESS,payload:res.message})
//     })
//     .catch(err=>{
// =======
import {
  ADMINLOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType";

export const Login = (data, toast,navigate) => (dispatch) => {
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
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }else if (res.message==="redirects to Admin") {

        dispatch({ type: ADMINLOGIN_SUCCESS,payload: res });
       
        navigate('/admin');
        
        toast({
          title: "success",
          description: res.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }else {
        toast({
          title: "Error",
          description: res.message,
          status: "error",
          duration: 2000,
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
              duration: 2000,
              isClosable: true,
              position: "top",
            })
          : toast({
              title: "Error",
              description: res.message,
              status: "error",
              duration: 2000,
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

export const userLogout = (token,toast) => (dispatch) => {
  console.log('token', token)
  dispatch({ type: LOGOUT_REQUEST });
  fetch("http://localhost:7070/users/logout", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if(res.message==="LoggedOut Successfully"){

        dispatch({ type: LOGOUT_SUCCESS });
        toast({
          title: "success",
          description: res.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOGOUT_FAILURE});
    });
};