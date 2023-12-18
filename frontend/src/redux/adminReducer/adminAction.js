import {SET_USER,SET_TASKS,SET_PROJECTS,SET_LOGS} from "./adminActionTypes"

import axios from "axios"

export const setUsers =(params) => (dispatch) => {
  // Write logic here

  axios.get("http://localhost:7070/users/get",{
    params : params
  })
  .then((res) => {
    console.log(res.data)
    dispatch({ type : SET_USER, payload : res.data })
  })
  .catch((err) => {
    console.log(err);
   
  })
};



// export const setTasks =(params) => (dispatch) => {
//   // Write logic here
// axios.get("http://localhost:7070/tasks",{
//     params : params
//   })
//   .then((res) => {
//     console.log(res.data)
//     dispatch({ type : SET_TASKS, payload : res.data })
//   })
//   .catch((err) => {
//     console.log(err);
   
//   })
// };




export const setTasks=(token)=>(dispatch)=>{


  // dispatch({ type:SET_TASKS })

  console.log(token, "action")
  fetch("http://localhost:7070/tasks/admintasks", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "authorization": `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      localStorage.setItem("token" , res.token)
      if(res.message==="All Tasks"){
        dispatch({
          type:SET_TASKS,
          payload:res.data
        })
      }
    })
    .catch((err) => {console.log(err)
    // dispatch({type:GETTASKS_FAILURE })
  }
    );
}



export const setProjects =(params) => (dispatch) => {
  // Write logic here

  axios.get("http://localhost:7070/projects/get",{
    params : params
  })
  .then((res) => {
    console.log(res.data)
    dispatch({ type : SET_PROJECTS, payload : res.data })
  })
  .catch((err) => {
    console.log(err);
   
  })
};



export const setLogs =(params) => (dispatch) => {
  // Write logic here

  axios.get("http://localhost:7070/logs",{
    params : params
  })
  .then((res) => {
    console.log(res.data)
    dispatch({ type : SET_LOGS, payload : res.data })
  })
  .catch((err) => {
    console.log(err);
   
  })
};




