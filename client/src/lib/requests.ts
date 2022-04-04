const API_URL = 'http://localhost:8000/api/v1';

// Get tours and return as JSON
async function getAllTours() {
  const response = await fetch(`${API_URL}/tours`);

  return response.json();
}

async function getTour() {
  // Do something here
}

export { getAllTours, getTour };
