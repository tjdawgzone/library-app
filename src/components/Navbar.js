import {AppBar, Button, IconButton} from '@material-ui/core';
import '../App.css';
import React,{useContext} from "react";
import {Link} from "react-router-dom"

function Navbar(){
return (
    <div style={{textAlign:"center"}}>
    <AppBar position="static" color="primary">
    <div style={{padding:15}}>
    <Link to="/" color="inherit" style={{padding:10, color:"white", textDecoration:"none"}}>Explore</Link>
    <Link to="/library" color="inherit" style={{padding:10, color:"white", textDecoration:"none"}}>My Library</Link>
    </div>
    </AppBar>
    </div>
)
}
export default Navbar;