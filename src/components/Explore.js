import '../App.css';
import React, {useState} from 'react'
import {Button, TextField} from '@material-ui/core'
import ResultList from './ResultList.js'

function Explore(){
    const [search,setSearch] = useState(null);
    const [results,setResults] = useState([]);
    const [book,setBook] = useState(null);

    const add = (()=>{
        let arr = book.split(',')
        let titleAdd = arr[0];
        let authorAdd = arr[1];
        fetch("http://localhost:8000/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ titleAdd, authorAdd }),
        });
      })

    const searchBook = (()=>{
        const url = new URL("http://localhost:8000/book?");
        url.searchParams.append("search", search);
        fetch(url)
        .then((resp) => {
        return resp.json();
        })
        .then((obj) => {
            setResults(obj);
        })
      })

    return (
    <div>
    <div style={{display:"flex",justifyContent:"center"}}>
        <h1 style={{paddingRight:15}}>Explore New Books!</h1>
        <TextField style={{paddingTop:10}}onChange={(evt)=>{
        setSearch(evt.target.value)
        }} label="Title/Author/Subject" onKeyDown={(evt)=>{
        if(evt.key==="Enter"){
            searchBook();
        }
        }}></TextField>
        <Button onClick={()=>{searchBook()}}>Search</Button>
    </div>
    <ResultList results={results}/>
    </div>)

}
export default Explore;