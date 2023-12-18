// import React from 'react'

// export const AdminPage = () => {
//   return (
//     <div>AdminPage</div>
//   )
// }


// Import necessary React and styling libraries
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { setUsers, setTasks, setProjects, setLogs } from "../redux/adminReducer/adminAction";

import { Route, Routes, Link } from 'react-router-dom';
import { MdDashboard, MdEqualizer, MdSettings } from 'react-icons/md';
import "../css/AdminPage.css"; // Import your custom CSS file
const token=localStorage.getItem("token")

console.log(token,"admintoken") 

// Define the AdminPage component
export const AdminPage = () => {

//   const dispatch = useDispatch();
//   // const users = useSelector((state) => state.adminReducer.users);
//   const tasks = useSelector((state) => state.adminReducer.tasks);
//   // const projects = useSelector((state) => state.adminReducer.projects);
//   // const logs = useSelector((state) => state.admin.logs);
//  console.log("abcds")
//   console.log(tasks)

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // dispatch(setUsers(token));
//         dispatch(setTasks(token));
//         // dispatch(setProjects(token));
//         // dispatch(setLogs());
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUserData();
//   }, [dispatch]);



  

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/admin/dashboard">
              <MdDashboard /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/statistics">
              <MdEqualizer /> Statistics
            </Link>
          </li>
          <li>
            <Link to="/admin/logs">
              <MdSettings /> Logs
            </Link>
          </li>
          <li className="sidebar-image">
      <div className="update-container">
        <img src="https://th.bing.com/th/id/OIP.TxrHIC8crDf2ciMGeLGgjgHaHa?rs=1&pid=ImgDetMain" alt="User Avatar" />
        <p>New Update Available</p>
        <button> Update Now</button>
      </div>
    </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
      <Dashboard/>
        <Routes>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
       
      <Route path="/statistics" element={<Statistics />} />
       <Route path="/logs" element={<Logs />} />
        </Routes>
      </div>
    </div>
  );
};


// const Dashboard = () => {

//   const numberOfProjects = useSelector((state) => state.adminReducer.projects);

//   const totalUsers = useSelector((state) => state.adminReducer.users);
  
//   const defaultData = {
//     numberOfProjects: 10,
//     numberOfTodos: 25,
//     totalUsers: 100,
//     totalProfit: 5000,
//   };

  
//   return (
//     <div className="dashboard">
//       <h2>Dashboard</h2>

//       {/* Grid layout for data cards */}
//       <div className="data-grid">
//         <div className="data-card">Number of Projects: {numberOfProjects || defaultData.numberOfProjects}</div>
//         <div className="data-card">Number of Todos: {  defaultData.numberOfTodos}</div>
//         <div className="data-card">Total Users: {totalUsers || defaultData.totalUsers}</div>
//         <div className="data-card">Total Profit: ${ defaultData.totalProfit}</div>
//       </div>
//     </div>
//   );
// };




const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="data-grid">
        <div className="data-card">Number of Projects: 10</div>
        <div className="data-card">Number of Todos: 25</div>
        <div className="data-card">Total Users: 100</div>
        <div className="data-card">Total Profit: $5000</div>
      </div>
    </div>
  );
};



// const Statistics = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.adminReducer.users);
//   const tasks = useSelector((state) => state.adminReducer.tasks);
//   const projects = useSelector((state) => state.adminReducer.projects);
//   // const logs = useSelector((state) => state.admin.logs);
//  console.log("abcds")
//   console.log(users)

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         dispatch(setUsers(token));
//         dispatch(setTasks(token));
//         dispatch(setProjects(token));
//         // dispatch(setLogs());
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUserData();
//   }, [dispatch]);

//   const getCountsForUser = (userId) => {

//     if (!tasks || !projects||!users) {
//       return {
//         taskCount: Math.floor(Math.random() * 10),
//         projectCount: Math.floor(Math.random() * 5),
//       };
//     }

//     const userTasks = tasks.filter((task) => task.userId === userId.$oid);

 
//     const userProjects = Array.isArray(projects)
//       ? projects.filter((project) =>
//           project.collaborators && project.collaborators.includes(userId.$oid)
//         )
//       : [];

//     return {
//       taskCount: userTasks.length,
//       projectCount: userProjects.length,
//     };
//   };

// //   if (!users || !tasks || !projects) {
// //     return (
// //       <div>
// //         <h2>User Table</h2>
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>User ID</th>
// //               <th>User Name</th>
// //               <th>Task Count</th>
// //               <th>Project Count</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //           {[...Array(5).keys()].map((index) => {
// //   const userId = `user_${index + 1}`;
// //   const userName = `User ${index + 1}`;
// //   const { taskCount, projectCount } = getCountsForUser({ $oid: userId });

// //   return (
// //     <tr key={userId}>
// //       <td>{userId}</td>
// //       <td>{userName}</td>
// //       <td>{taskCount}</td>
// //       <td>{projectCount}</td>
// //     </tr>
// //   );
// // })}
// //           </tbody>
// //         </table>
// //       </div>
// //     );
// //   }

//   // Render the actual user statistics table
//   return (
//     <div>
//       <h2>User Table</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>User Name</th>
//             <th>Task Count</th>
//             <th>Project Count</th>
//           </tr>
//         </thead>
//         {/* <tbody>
//           {users.map((user) => (

//             <tr key={user._id.$oid}>
//               <td>{user._id.$oid}</td>
//               <td>{user.userName}</td>
//               <td>{getCountsForUser(user._id).taskCount}</td>
//               <td>{getCountsForUser(user._id).projectCount}</td>
//             </tr>
//           ))}
//         </tbody> */}

// {/* 
// <tbody>
//   {users.map((user) => {
//     const counts = getCountsForUser(user._id);
//     return (
//       <tr key={user._id.$oid}>
//         <td>{user._id.$oid}</td>
//         <td>{user.userName}</td>
//         <td>{counts.taskCount}</td>
//         <td>{counts.projectCount}</td>
//       </tr>
//     );
//   })}
// </tbody> */}
//       </table>
//     </div>
//   );
// };






const Statistics = () => {
  // Generate random names
  const generateRandomNames = () => {
    const names = [
      'John Doe',
      'Jane Doe',
      'Bob Smith',
      'Alice Johnson',
      'Michael Brown',
      'Emily Davis',
      'David Wilson',
      'Olivia Miller',
      'Christopher Jones',
      'Sophia Martinez',
      'Matthew Taylor',
      'Emma Harris',
      'Daniel Anderson',
      'Ava Thomas',
      'William Jackson',
      'Ella White',
      'Joseph Moore',
      'Grace Thompson',
      'James Garcia',
    ];

    return names;
  };

  // Get random names
  const randomNames = generateRandomNames();

  // Generate random user data with random names
  const generateRandomUserData = () => {
    const users = [];
    for (let i = 1; i <= 15; i++) {
      const userId = `user_${i}`;
      const userName = randomNames[Math.floor(Math.random() * randomNames.length)];
      const taskCount = Math.floor(Math.random() * 10);
      const projectCount = Math.floor(Math.random() * 5);

      users.push({ userId, userName, taskCount, projectCount });
    }
    return users;
  };

  // Get random user data
  const randomUsers = generateRandomUserData();

  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Task Count</th>
            <th>Project Count</th>
          </tr>
        </thead>
        <tbody>
          {randomUsers.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.userName}</td>
              <td>{user.taskCount}</td>
              <td>{user.projectCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Logs = () => {
  const adminState = useSelector((state) => state.adminReducer.logs);

  // Check if 'logs' is undefined or null
  if (!adminState || !adminState.logs) {
    return (
      <div className="logs">
        <h2>Logs</h2>
        <div>Loading logs...</div>
        {/* Mock table with data */}
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Log Entry</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(15).keys()].map((index) => {
              const timestamp = new Date().toISOString();
              const logEntry = `Log entry ${index + 1}`;
              return (
                <tr key={index}>
                  <td>{timestamp}</td>
                  <td>{logEntry}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  const logs = adminState.logs;
    // dispatch(setLogs());

  return (
    <div className="logs">
      <h2>Logs</h2>
      {logs.length === 0 ? (
        <div>No logs available.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Log Entry</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id.$oid}>
                <td>{log.createdAt.$date}</td>
                <td>{log.logs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
export { Dashboard, Statistics, Logs };
