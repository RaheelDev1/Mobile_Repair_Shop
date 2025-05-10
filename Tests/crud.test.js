// crud.test.js

const assert = require('assert');

let jobs = [];

function addJob(job) {
  job.id = Date.now();
  jobs.push(job);
  return job;
}

function deleteJob(id) {
  jobs = jobs.filter(job => job.id !== id);
  return jobs;
}

// Test: Add Job
const newJob = addJob({ customerName: "Ali", phoneModel: "iPhone X" });
assert.strictEqual(jobs.length, 1, "Job should be added");

// Test: Delete Job
deleteJob(newJob.id);
assert.strictEqual(jobs.length, 0, "Job should be deleted");

console.log("All unit tests passed.");
