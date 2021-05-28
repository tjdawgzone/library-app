import '../App.css';
import React ,{useState,useEffect,useContext} from 'react'
import {Button, TextField} from '@material-ui/core'
import LibraryList from './LibraryList.js'
import {LibraryContext} from '../contexts/libraryContext'

function Library(){
    const {myBooks,setMyBooks} = useContext(LibraryContext);

    document.body.style='background:#ededed;';

    useEffect(()=>{
      fetch("http://localhost:8000/library")
      .then((resp) => {
        return resp.json();
        })
        .then((obj) => {
            setMyBooks(obj);
        })
    },[])
    

    return (
        <div> 
          <h1 class="centered">Here are your books...</h1>
          <LibraryList/>
            <br/>
        </div>
    );

}
export default Library;