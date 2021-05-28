import '../App.css';
import React, {useState,useContext} from 'react'
import {Button, TextField, Card} from '@material-ui/core'
import ResultList from './ResultList.js'
import {ResultsContext} from '../contexts/resultsContext'

function Explore(){
    const [search,setSearch] = useState(null);
    const {results,setResults} = useContext(ResultsContext);

    document.body.style='background:#ededed;';

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
        <h1 style={{paddingRight:15}}>Explore New Books.</h1>
        <div style={{paddingTop:20}}>
        <TextField size="small" id="outlined-basic" label="Outlined" variant="outlined" 
        onChange={(evt)=>{
        setSearch(evt.target.value)
        }} label="Title/Author/Subject" onKeyPress={(evt)=>{
        if(evt.key==="Enter"){
            searchBook();
        }
        }}></TextField>
        </div>
        <Button onClick={()=>{searchBook()}}>Search</Button>
    </div>
    {results.length!==0 ?(<ResultList/>):(
    <div class="centered" style={{left:"50%",paddingTop:"15%"}}>
      <img style={{textAlign:"center"}} src="https://img.icons8.com/wired/64/000000/book-reading.png"/>
    <p>Search for books using the search bar...</p>
    </div>)}
    </div>)

}
export default Explore;