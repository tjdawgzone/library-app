
// Firebase stuff
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Initializing required things
require('dotenv').config();
var cors = require('cors')
const express = require('express')
const app = express()
const port = 8000
app.use(cors())
const fetch = require('node-fetch');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/add', function(req, res){
  console.log(req.body.titleAdd,req.body.authorAdd)
    db.collection("books").add({
      title: req.body.titleAdd,
      author: req.body.authorAdd
    });
  res.send("Success!");
});

app.delete('/delete',async (req,res)=>{
  const booksRef = db.collection('books');
  const snapshot = await booksRef.get();
  snapshot.forEach(async doc => {
    if(doc.data().title===req.body.book){
      const res = await db.collection('books').doc(doc.id).delete();
    };
  });
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    });
})

//This is for using the Google Books API

app.get('/book', (req, res) => {
  let url = 'https://www.googleapis.com/books/v1/volumes?q='+req.query.search;+'&key='+process.env.API_KEY
  fetch(url)
  .then((resp)=>{
    return resp.json();
  })
  .then((obj)=>{
    res.json(obj.items)
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})