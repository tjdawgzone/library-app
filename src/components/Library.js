import '../App.css';
import React ,{useState} from 'react'
import {Button, TextField} from '@material-ui/core'

function Library(){
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
    
      const deleteBook = (()=>{
        console.log(book)
        fetch("http://localhost:8000/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({book}),
        });
      })

    return (
        <div class="center"> 
          <p>For adding books: title,author</p>
          <TextField onChange={(evt)=>{
            setBook(evt.target.value)
          }} label="Add Book" onKeyDown={(evt)=>{
            if(evt.key==="Enter"){
                add();
            }
            }}></TextField>
            <br/>
          <TextField onChange={(evt)=>{
            setBook(evt.target.value)
          }} label="Delete Book" onKeyDown={(evt)=>{
            if(evt.key==="Enter"){
                deleteBook();
            }
            }}></TextField>
            <br/>
        </div>
    );

}
export default Library;