import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start 
// variable = an environment variable ELSE fall back to default 8080
const port = 9000 || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
// cors - a tech that allows API:s where API:s can come from - security
// bodyParser allows to read json in POST requests? 
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// MAGIC 8 BALL : Get all the answers
/* app.get('/answers', (req, res) => {
  res.json(data)
})  */

// set query to be answers/answer for example ? Todo: filter on type: affirmative
// everthing that comes in the params will come in the form of a string - so a number needs to be converted.
app.get('/answers/:id', (req, res) => {
  const { id } = req.params 
  const answer = data.find(answer => answer.id === +id)
  console.log(answer)

    if (!answer) {
      response.status(404).send(`No answer with id number ${id}`) // 404 is a not found 
    }
    res.json(answer)
})

// query for type "affirmative" answer
app.get('/answers', (req, res) => {
  const affirmative  = req.query.affirmative // - should I have something here? 
  //console.log({ showAffirmative })
    if (affirmative) { 
    // filter on an answer where the answer includes the type: affirmative from the query
    const answersList = data.filter(answer => answer.type.includes(affirmative))
    //console.log(answersList)
    res.json(answersList)
  } else {
    res.json(data)
  } 
})

// Start the server, first argument is the port it will be running on
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
