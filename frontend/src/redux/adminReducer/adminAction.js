import {SET_USER,SET_TASKS,SET_PROJECTS,SET_LOGS} from "./adminActionTypes"
import axios from "axios"

export const setUsers =(params) => (dispatch) => {
  // Write logic here

  axios .get("https://destination-api00.onrender.com/users",{
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



export const setTasks =(params) => (dispatch) => {
  // Write logic here
axios .get("https://destination-api00.onrender.com/tasks",{
    params : params
  })
  .then((res) => {
    console.log(res.data)
    dispatch({ type : SET_TASKS, payload : res.data })
  })
  .catch((err) => {
    console.log(err);
   
  })
};



export const setProjects =(params) => (dispatch) => {
  // Write logic here

  axios .get("https://destination-api00.onrender.com/projects",{
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

  axios .get("https://destination-api00.onrender.com/logs",{
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




