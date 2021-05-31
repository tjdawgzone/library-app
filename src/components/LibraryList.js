import {Grid, Card, Button,TextField, Fab} from '@material-ui/core'
import React, {useState,useContext} from 'react'
import {LibraryContext} from '../contexts/libraryContext'
import EditIcon from '@material-ui/icons/Edit';

function LibraryList(){
  const {myBooks,setMyBooks} = useContext(LibraryContext);
  const [newAuthor, setNewAuthor] = useState(null);
  const [newTitle, setNewTitle] = useState(null);
  const [edit,setEdit] = useState(false)

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
    
  const editTitle = ((index)=>{
    const title = myBooks[index]._fieldsProto.volumeInfo.mapValue.fields.title.stringValue
    const selectedBook = myBooks[index]
    fetch("http://localhost:8000/edit/title", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({title,newTitle})
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

  const editAuthor = ((index)=>{
    const title = myBooks[index]._fieldsProto.volumeInfo.mapValue.fields.title.stringValue
    fetch("http://localhost:8000/edit/author", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({title,newAuthor})
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

    function DisplayResult(result,index){
      console.log(JSON.stringify(result))
        return(
        <div style={{padding:12,justifyContent:"center"}}>
        <Card elevation={5} style={edit?{width: '30vw',height: '25vw'}:{width: '30vw',height: '17vw'}}>
        <h2 style={{paddingTop:"5%"}}>{result.volumeInfo.mapValue.fields.title.stringValue}</h2>
        <h3>{result.volumeInfo.mapValue.fields.authors.arrayValue.values!==null ? formatAuthor(result.volumeInfo.mapValue.fields.authors.arrayValue.values):"No author information."}</h3>
        {!edit&&<Button onClick={()=>{
          alert(result.volumeInfo.mapValue.fields.description.stringValue)
        }}>Description</Button>}
        {edit&&<Button size="small" variant="contained"color="secondary" onClick={()=>{
            deleteBook(index)
        }}>Remove Book</Button>}
        {edit&&
        <div>
        <br/>
        <TextField size="small"
        onChange={(evt)=>{
        setNewTitle(evt.target.value)
        }} label="Edit Title" onKeyPress={(evt)=>{
        if(evt.key==="Enter"){
          editTitle(index);
        }
        }}></TextField>
        <br/>
        <TextField size="small"
        onChange={(evt)=>{
        setNewAuthor(evt.target.value)
        }} label="Edit Author" onKeyPress={(evt)=>{
        if(evt.key==="Enter"){
          editAuthor(index);
        }
        }}></TextField>
        </div>}
        </Card>
        </div>
        );
    };

    return(
        <div class="centered"style={{justifyContent:"center"}}>
            <Grid container spacing={1} style={{justifyContent:"center"}}>
            {myBooks.map((result,index)=>{
                return(DisplayResult(result._fieldsProto,index))})}
            </Grid>
        <Fab style={{position:"fixed",right:10,bottom:10}}color="secondary" aria-label="edit" onClick={()=>{
           setEdit(!edit);
        }}>
        <EditIcon />
        </Fab>
        </div>
    )

}
export default LibraryList;