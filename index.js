const express = require('express');
const app = express();

app.use(express.json());

const tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: tasks.length + 1, name: req.body.name };
  tasks.push(task);
  res.status(201).json(task);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    res.status(404).json({ error: 'Could not find task' });
    return;
  }
  res.json(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    res.status(404).json({ error: 'Could not find task' });
    return;
  }
  task.name = req.body.name;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    res.status(404).json({ error: 'Could not find task' });
    return;
  }
  const task = tasks.splice(taskIndex, 1)[0];
  res.json(task);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});