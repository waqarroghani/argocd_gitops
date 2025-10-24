async function updateCounter() {
  try {
    const res = await fetch("http://localhost:5000/api/visit");
    const data = await res.json();
    document.getElementById("counter").textContent = `Visitors: ${data.count}`;
  } catch (err) {
    console.error("Error fetching visitor count", err);
    document.getElementById("counter").textContent = "Error loading count 😞";
  }
}

updateCounter();


