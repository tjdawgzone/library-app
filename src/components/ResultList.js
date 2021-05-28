import {Grid, Card, Button,Link} from '@material-ui/core'
import React, {useState,useContext, useEffect} from 'react'
import {ResultsContext} from '../contexts/resultsContext'

function ResultList(){
  const {results,setResults} = useContext(ResultsContext);
  const [remove, setRemove] = useState(null)

    useEffect(()=>{
      if(remove!==null){
        if(remove[1]==true){
          let arr = results;
          arr.splice(remove[0],1);
          setResults(arr);
          setRemove([-1,false])
        }
      }
    })

  // Adds to Firestore database
    const add = (async (index)=>{
      const book = results[index]
      fetch("http://localhost:8000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      })
      setRemove([index,true])
    })

    const ratingDisplay = ((input)=>{
        if(input!=null){
        const roundedInput=Math.round(input);
        let x = "Rating: ";
        let i = 0;
        for(i=0;i<roundedInput;i++){
            x=x+"⭐️";
        }
        x=x+" ("+input+")";
        return x;
    }
    else{
        return "No rating available.";
    }
    })

    const formatAuthor = ((author)=>{
      if(author){
        let result = "";
        let x = 0;
        for(x=0;x<author.length;x++){
          if(x===0){
            result=author[x];
          }
          else if(x===author.length-1){
            result=result+" and "+author[x]
          }
          else{
            result = result+", "+author[x]+" ";
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
        <Card elevation={5} style={{width: '30vw',height: '25vw'}}>
        <h2 style={{paddingTop:"10%"}}>{result.volumeInfo.title}</h2>
        <h3 >{formatAuthor(result.volumeInfo.authors)}</h3>
        <p>{ratingDisplay(result.volumeInfo.averageRating)}</p>
        <Button color="primary"size="small" variant="contained" style={{ backgroundColor: '#2E3B55',textColor:"white"}} onClick={()=>{ add(index);}}>Add Book</Button>
        </Card>
        </div>
        );
    });

    return(
        <div class="centered"style={{justifyContent:"center"}}>
            <Grid container spacing={1} style={{justifyContent:"center"}}>
            {results.map((result,index)=>{return(displayResult(result,index))})}
            </Grid>
        </div>
    )

}
export default ResultList;