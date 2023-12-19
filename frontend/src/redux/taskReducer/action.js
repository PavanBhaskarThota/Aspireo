import { ADDTASK_FAILURE, ADDTASK_REQUEST, ADDTASK_SUCCESS, DELETETASK_FAILURE, DELETETASK_REQUEST, DELETETASK_SUCCESS, GETTASKS_FAILURE, GETTASKS_REQUEST, GETTASKS_SUCCESS, UPDATETASK_FAILURE, UPDATETASK_REQUEST, UPDATETASK_SUCCESS} from "./actionTypes"



export const addTaskFun=(data,token,toast)=>(dispatch)=>{

    dispatch({ type:ADDTASK_REQUEST })

    
    fetch("https://aspireo.onrender.com/tasks/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if(res.message==="Task Added Successfully"){

          dispatch({
            type:ADDTASK_SUCCESS,
            payload:res.data
          });

          toast({
            title: "success",
            description: res.message,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }else{
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
      .catch((err) => {console.log(err)
      dispatch({type:ADDTASK_FAILURE })}
      );
}

export const getTasksFun=(token)=>(dispatch)=>{


  dispatch({ type:GETTASKS_REQUEST })

  console.log(token, "action")
  fetch("https://aspireo.onrender.com/tasks/", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "authorization": `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if(res.message==="All Tasks"){
        dispatch({
          type:GETTASKS_SUCCESS,
          payload:res.data
        })
      }
    })
    .catch((err) => {console.log(err)
    dispatch({type:GETTASKS_FAILURE })}
    );
}


export const updateTaskFun=(data,id,token,toast)=>(dispatch)=>{

  dispatch({ type:UPDATETASK_REQUEST})

  
  fetch(`https://aspireo.onrender.com/tasks/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      if(res.message==="Task Updated Successfully"){

        dispatch({
          type:UPDATETASK_SUCCESS,
        })
        toast({
          title: "success",
          description: res.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }else{
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
    .catch((err) => {console.log(err)
    dispatch({type:UPDATETASK_FAILURE })}
    );
}

export const deleteTaskFun=(id,token,toast)=>(dispatch)=>{

  dispatch({ type:DELETETASK_REQUEST})

  
  fetch(`https://aspireo.onrender.com/tasks/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "authorization": `Bearer ${token}`
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      if(res.message==="Task Deleted Successfully"){

        dispatch({
          type:DELETETASK_SUCCESS,
        })

        toast({
          title: "success",
          description: res.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }else{
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
    .catch((err) => {console.log(err)
    dispatch({type:DELETETASK_FAILURE })}
    );
}