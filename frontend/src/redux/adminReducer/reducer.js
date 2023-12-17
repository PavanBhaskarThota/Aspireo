// reducer.js



// const initialState = {
//     user: {
//       projects: 0,
//       tasks: 0,
//       deadlines: 0,
//       isLoggedIn: false,
//     },
//   };
  
//   const adminReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SET_USER':
//         return {
//           ...state,
//           user: {
//             ...state.user,
//             ...action.payload,
//           },
//         };
    
//       default:
//         return state;
//     }
//   };
  
//   export default adminReducer;
  


const initialState = {
  users: [],
  tasks: [],
  projects: [],
  logs:[]
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
      case 'SET_LOGS':
      return { ...state, projects: action.payload };
    default:
      return state;
  }
};

export default adminReducer;