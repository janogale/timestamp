const express = require('express');

const app = express();

app.get('/api/timestamp', (req, res) => {
  const date = {};

     let d = new Date();
    date.unix = d.getTime();
    date.utc = d.toUTCString();

    res.json(date);
});

app.get('/api/timestamp/:time', (req, res) => {
  const date = {};

  //check if par time is passed and have valid date
  if (req.params.time) {
    let time = req.params.time;
    
    // check if time paramer contains only numbers (timestamp)

    if(/^\d+$/.test(time)){
      time =  parseInt(time);
    }

    let d = new Date(time);

    // check if date is valid.

    if(!d.getDate()){
      res.json({"error": "Invalid Date", "tips": "Please time valid date in the URL"});
      return;
    }

    date.unix = d.getTime();
    date.utc = d.toUTCString();

    res.json(date);
  } else {
    let d = new Date();
    date.unix = d.getTime();
    date.utc = d.toUTCString();

    res.json(date);
  }
});


app.get('*', (req, res) => {
  res.redirect('/api/timestamp/');
});


//setting Server port

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
})