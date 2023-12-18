import { ADMINLOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionType";


const intialState={
    loading:false,
    token:"",
    message:"",
    error:false,
    user:'',
    isLoggedIn:false,
    isAdmin:false
}
 
export const reducer= (state = intialState, { type, payload }) =>{
   switch (type) {
    case LOGIN_REQUEST||SIGNUP_REQUEST || LOGIN_REQUEST:
        return {...state,loading:true}
    case LOGIN_FAILURE||SIGNUP_FAILURE || LOGOUT_FAILURE:
        return {...state,loading:false,error:true}
    case LOGIN_SUCCESS:
        return{...state,loading:false,token:payload.token,message:payload.message, user:payload.user,isLoggedIn:true}
    case SIGNUP_SUCCESS:
         return{...state,loading:false,message:payload}
    case LOGOUT_SUCCESS:
         return{...state,loading:false,isLoggedIn:false, message:"User created", isAdmin:false}

    case ADMINLOGIN_SUCCESS:
        return{...state,loading:false,token:payload.token,message:payload.message, user:payload.user,isLoggedIn:true, isAdmin:true}  
    
    default:
        return state
   }
}