import {AppBar, Button, IconButton} from '@material-ui/core';
import '../App.css';
import React,{useContext} from "react";
import {Link} from "react-router-dom"

function Navbar(){
return (
    <div>
    <AppBar position="static" color="primary" style={{ background: '#2E3B55' }}>
    <div style={{display:"flex",paddingLeft:"7%"}}>
    <h1>BookNook 📚</h1>
    <div style={{padding:15,textAlign:"center"}}>
    <Button>
    <Link to="/" color="inherit" style={{padding:5, color:"white", textDecoration:"none"}}>Home</Link>
    </Button>
    <Button>
    <Link to="/explore" color="inherit" style={{padding:5, color:"white", textDecoration:"none"}}>Explore</Link>
    </Button>
    <Button>
    <Link to="/library" color="inherit" style={{padding:5, color:"white", textDecoration:"none"}}>My Library</Link>
    </Button>
    </div>
    </div>
    </AppBar>
    </div>
)
}
export default Navbar;