const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.json())
app.use(methodOverride())

let tasks = [
    "task1",
    "task2",
    "task3"
]

app.get('/tasks', (req, res) => {

    res.json({
        data: tasks
    })

})

app.post('/tasks', (req, res) => {

    let task = req.body.task

    if (task && task.length > 5) {

        tasks.push(task)

        res.status(201).json({
            status: 201,
            data: task
        })

    } else {

        res.status(400).json({
            status: 400,
            error: "La tache doit avoir au moins 5 caractères."
        })

    }

})

app.get('/tasks/:id(\\d+)', (req, res) => {

    let task = tasks[req.params.id]

    if (task != null) {

        res.status(200).json({
            status: 200,
            data: task
        })

    } else {

        res.status(404).json({
            status: 404,
            error: "Cette tache n'existe pas."
        })

    }



})

app.put('/tasks/:id', (req, res) => {
  if (tasks[req.params.id] != null) {
    tasks[req.params.id] = req.body.task;
    res.json({
      status: 200,
      data:tasks
    });
  }
else {
  res.status(404).json({
      status: 404,
      error: "Cette tache n'existe pas."
  })
}
})
app.delete('/tasks/:id', (req, res) => {
    let task = tasks[req.params.id]
    res.json(tasks.splice(task, 1));
})



server.listen(3000);
