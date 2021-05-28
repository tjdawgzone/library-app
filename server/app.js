
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
    db.collection("books").add(req.body);
  res.send("Success!");
});

app.delete('/delete',async (req,res)=>{
  const booksRef = db.collection('books');
  const snapshot = await booksRef.get();
  snapshot.forEach(async doc => {
    if(doc.data().volumeInfo.title===req.body._fieldsProto.volumeInfo.mapValue.fields.title.stringValue){
      const res = await db.collection('books').doc(doc.id).delete();
    };
  });
  res.send("Success!");
})

app.get('/library', async (req, res) => {
  const bookList = [];
  const booksRef = db.collection('books');
  const snapshot = await booksRef.get();
  snapshot.forEach(async doc => {
    bookList.push(doc)
  });
  res.send(bookList);

})

//This is for using the Google Books API

app.get('/book', (req, res) => {
  let url = 'https://www.googleapis.com/books/v1/volumes?q='+req.query.search+'&maxResults=40'
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