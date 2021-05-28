import {Grid, Card} from '@material-ui/core'

function ResultList({results}){

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
      })

    const displayResult = ((result) => {
        console.log(result.volumeInfo.title)
        return(
        <div style={{padding:12,justifyContent:"center"}}>
        <Card elevation={5} style={{width: '30vw',height: '20vw'}}>
        <h2 style={{paddingTop:"5%"}}>{result.volumeInfo.title}</h2>
        <h3 >{formatAuthor(result.volumeInfo.authors)}</h3>
        <p>{ratingDisplay(result.volumeInfo.averageRating)}</p>
        </Card>
        </div>
        );
    });

    return(
        <div class="centered"style={{justifyContent:"center"}}>
            <Grid container spacing={1} style={{justifyContent:"center"}}>
            {results.map((result)=>{return(displayResult(result))})}
            </Grid>
        </div>
    )

}
export default ResultList;