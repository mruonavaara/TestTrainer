import React from 'react';
import './App.css';
import { Outlet, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className="App">
      <AppBar position="sticky" elevation={0} style={{ width: '100vw' }}>
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, margin: 20 }}>
            Personal Training
          </Typography>
          <nav style={{ display: 'flex' }}>
            <Link to={"/customers"} style={{ color: "white", marginRight: '2rem' }}>Customers</Link>
            <Link to={"/trainings"} style={{ color: "white", marginRight: '2rem' }}>Trainings</Link>
            <Link to={"/calendar"} style={{ color: "white", marginRight: '2rem' }}>Calendar</Link>
            <Link to={"/statistics"} style={{ color: "white", marginRight: '2rem' }}>Statistics</Link>
          </nav>
        </Toolbar>
      </AppBar>
      <div style={{ width: '100vw' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;