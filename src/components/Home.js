import '../App.css';
import'../index.css'
import {Button} from '@material-ui/core'
function Home(){
        document.body.style='background:#152238;';
return (
        <div class="center">
        <h1 style={{color:"white"}}>Welcome to BookNook.</h1>
        <h2 style={{color:"white"}}>Venture into a book-filled universe.</h2>
        <Button variant="contained" href="/explore" filled>Explore new books.</Button>
        <h2 style={{color:"white"}}>Read. Read. Read. Repeat.</h2>
        <Button variant="contained" href="/library">Check out Your Library.</Button>
        </div> 
    )
    }
    export default Home;