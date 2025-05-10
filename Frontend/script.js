const API_URL = "http://localhost:3000/jobs";
const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

jobForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const job = {
    customerName: document.getElementById("customerName").value,
    phoneModel: document.getElementById("phoneModel").value,
    issueDescription: document.getElementById("issue").value,
    status: document.getElementById("status").value,
    dateReceived: new Date().toISOString().split("T")[0]
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job)
  });

  if (res.ok) {
    jobForm.reset();
    loadJobs();
  }
});

async function loadJobs() {
    const res = await fetch(API_URL);
    const jobs = await res.json();
  
    const statusFilter = document.getElementById("statusFilter").value;
    const filteredJobs = statusFilter === "All" ? jobs : jobs.filter(job => job.status === statusFilter);
  
    jobList.innerHTML = "";
  
    filteredJobs.forEach(job => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${job.customerName}</strong> (${job.phoneModel})<br>
        Issue: ${job.issueDescription} <br>
        Status: <em>${job.status}</em> <br>
        Received: ${job.dateReceived} <br>
        ${job.status !== "Completed" ? `<button onclick="markCompleted(${job.id})">Mark as Completed</button>` : ""}
        <button class="delete" onclick="deleteJob(${job.id})">Delete</button>
        <hr>
      `;
      jobList.appendChild(li);
    });
  }

  async function markCompleted(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Completed" })
    });
    loadJobs();
  }

async function deleteJob(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadJobs();
}

loadJobs();

// Auto-refresh every 15 seconds
setInterval(loadJobs, 15000);

