
import express from 'express'

let app = express()

app.get('/', function(req, res) {
  res.send("Hello World");
})

app.listen(3000, function() {
  console.log("listening at port 3000")
})
