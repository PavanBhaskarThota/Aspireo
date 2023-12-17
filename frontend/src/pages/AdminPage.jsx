// import React from 'react'

// export const AdminPage = () => {
//   return (
//     <div>AdminPage</div>
//   )
// }


// Import necessary React and styling libraries
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setUsers, setTasks, setProjects, setLogs } from "../redux/adminReducer/adminAction";

import { Route, Routes, Link } from 'react-router-dom';
import { MdDashboard, MdEqualizer, MdSettings } from 'react-icons/md';
import "../css/AdminPage.css"; // Import your custom CSS file



// Define the AdminPage component
export const AdminPage = () => {
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
        <button>Update Now</button>
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

// Dashboard component
const Dashboard = () => {

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* Grid layout for data cards */}
      <div className="data-grid">
        <div className="data-card">Number of Projects: 10</div>
       
        <div className="data-card">Number of Todos: 25</div>
        <div className="data-card">Total Users: 100</div>
        {/* <div className="data-card">Number of Users: {users.length}</div> */}
        <div className="data-card">Total Profit: $5000</div>
      </div>
    </div>
  );
};


const Statistics = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const tasks = useSelector((state) => state.admin.tasks);
  const projects = useSelector((state) => state.admin.projects);
  const logs = useSelector((state) => state.admin.logs);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
       
        dispatch(setUsers());
        dispatch(setTasks());
        dispatch(setProjects());
        dispatch(setLogs());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [dispatch]);


  const getCountsForUser = (userId) => {
    const userTasks = tasks.filter((task) => task.userId === userId.$oid);
    const userProjects = projects.filter((project) =>
      project.colleborators.includes(userId.$oid)
    );

    return {
      taskCount: userTasks.length,
      projectCount: userProjects.length,
    };
  };

  
  if (!users || !tasks || !projects || !logs) {
    return <div>Loading...</div>;
  }

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
          {users.map((user) => (
            <tr key={user._id.$oid}>
              <td>{user._id.$oid}</td>
              <td>{user.userName}</td>
              <td>{getCountsForUser(user._id).taskCount}</td>
              <td>{getCountsForUser(user._id).projectCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Settings component
const Logs = () => {
  const logs = useSelector((state) => state.admin.logs);

  if (!logs) {
    return <div>Loading logs...</div>;
  }

  return (
    <div className="logs">
      

      {/* Display logs in a table */}
      <h2>Logs</h2>
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
    </div>
  );
};


export default AdminPage;
export { Dashboard, Statistics, Logs };
