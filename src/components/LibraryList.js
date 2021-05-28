import {Grid, Card, Button} from '@material-ui/core'
import React, {useState,useContext} from 'react'
import {LibraryContext} from '../contexts/libraryContext'

function LibraryList(){
    const {myBooks,setMyBooks} = useContext(LibraryContext);
    const deleteBook = ((index)=>{
        const selectedBook = myBooks[index]
        fetch("http://localhost:8000/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedBook),
        })
        setTimeout(function(){
            fetch("http://localhost:8000/library")
            .then((resp) => {
              return resp.json();
              })
              .then((obj) => {
                  setMyBooks(obj);
              })
        }, 250);
        
        })

    const formatAuthor = ((author)=>{
      if(author){
        let result = "";
        let x = 0;
        for(x=0;x<author.length;x++){
          if(x===0){
            result=author[x].stringValue;
          }
          else if(x===author.length-1){
            result=result+" and "+author[x].stringValue
          }
          else{
            result = result+", "+author[x].stringValue+" ";
          }
        }
        return result;
      }
      else{
        return "*Author Unavailable*"

      }
      })

    const displayResult = ((result,index) => {
        return(
        <div style={{padding:12,justifyContent:"center"}}>
        <Card elevation={5} style={{width: '30vw',height: '18vw'}}>
        <h2 style={{paddingTop:"5%"}}>{result.volumeInfo.mapValue.fields.title.stringValue}</h2>
        <h3>{result.volumeInfo.mapValue.fields.authors.arrayValue.values!==null ? formatAuthor(result.volumeInfo.mapValue.fields.authors.arrayValue.values):"No author information."}</h3>
        <Button size="small" variant="contained"color="secondary" onClick={()=>{
            deleteBook(index);
        }}>Remove Book</Button>
        </Card>
        </div>
        );
    });

    return(
        <div class="centered"style={{justifyContent:"center",paddingTop:0}}>
            <Grid container spacing={1} style={{justifyContent:"center"}}>
            {myBooks.map((result,index)=>{
                return(displayResult(result._fieldsProto,index))})}
            </Grid>
        </div>
    )

}
export default LibraryList;