import express from 'express'
// const app = express()
// app.get('/users', (req, res) => {
//   res.send([{
//     id:1,name:'John Doe',age:32
//   },{
//     id:2,name:'John Doe2',age:30
//   }])
// })

// const port = process.env.PORT || 8080
// app.listen(port,()=>console.log(`listening on port ${port}`))
const express = require('express')
const app = express()

app.get('/jk', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)

