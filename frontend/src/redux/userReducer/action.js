import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionType"

export const Login=(data,toast)=>(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    fetch("http://localhost:9800/login",{
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
    })
    .then(res=>res.json())
    .then(res=>{
        let m=false
        if(res.message==='Login successful'){
           m=true
        }
        {m?toast({title:'success',description: res.message,status: 'success', duration: 3000,  isClosable: true,position:"top",}):
                 toast({ title: "Error",description: res.message,status: 'error', duration: 3000, isClosable: true,position:"top", })}
                
        dispatch({type:SIGNUP_SUCCESS,payload:res.message})
         localStorage.setItem("token",res.token)
        dispatch({type:LOGIN_SUCCESS,payload:res})
    })
    .catch(err=>{

       console.log(err)
       dispatch({type:LOGIN_FAILURE})
    })
}

export const SignUp=(data,toast)=>(dispatch)=>{
      dispatch({type:SIGNUP_REQUEST})
    fetch("http://localhost:9800/registration",{
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
    })
    .then(res=>res.json())
    .then(res=>{
         console.log(res)
         let m=false
         if(res.message==='User created'){
            m=true
         }
         {m?toast({title:'success',description: res.message,status: 'success', duration: 3000,  isClosable: true,position:"top",}):
                  toast({ title: "Error",description: res.message,status: 'error', duration: 3000, isClosable: true,position:"top", })}
                 
         dispatch({type:SIGNUP_SUCCESS,payload:res.message})
    })
    .catch(err=>{

       console.log(err)
       dispatch({type:SIGNUP_FAILURE})
    })

}