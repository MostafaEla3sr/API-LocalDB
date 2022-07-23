const express = require('express')
const bodyparser = require('body-parser')
const app = express();
const mid = require('./mid')
app.use(bodyparser.json())

app.use(mid)
app.use('/coach' , require('./routes/coach'))
app.use('/learner' , require('./routes/learner'))
app.use('/session' , require('./routes/session'))
app.use('/experince' , require('./routes/experince'))

 app.listen(4554 , ()=>
 {
     console.log("Server Running.............")
 })