const API_URL = "https://script.google.com/macros/s/AKfycbzigT6EJmu6TeRfHe2Djm2wRgVu7GlLo36vLupeObVMHc6JF2wfzjEE5OhfKcMqg_NfbA/exec";

document.getElementById("apptForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const row = [
    Date.now(),
    data.name,
    data.phone,
    data.vehicle,
    data.date,
    data.time,
    "Pending",
    new Date().toISOString()
  ];

  const res = await fetch(API_URL,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({action:"create", sheet:"appointments", data:row})
  });

  const out = await res.json();
  alert("Saved: "+JSON.stringify(out));
});
