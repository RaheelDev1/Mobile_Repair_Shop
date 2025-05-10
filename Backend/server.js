const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './backend/data.json';

function readData() {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/jobs', (req, res) => {
  const jobs = readData();
  res.json(jobs);
});

app.post('/jobs', (req, res) => {
  const jobs = readData();
  const newJob = { id: Date.now(), ...req.body };
  jobs.push(newJob);
  writeData(jobs);
  res.status(201).json(newJob);
});

app.put('/jobs/:id', (req, res) => {
  let jobs = readData();
  const id = parseInt(req.params.id);
  jobs = jobs.map(job => job.id === id ? { ...job, ...req.body } : job);
  writeData(jobs);
  res.json({ message: 'Job updated' });
});

app.delete('/jobs/:id', (req, res) => {
  let jobs = readData();
  const id = parseInt(req.params.id);
  jobs = jobs.filter(job => job.id !== id);
  writeData(jobs);
  res.json({ message: 'Job deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
