// Handle flight search form submission
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Gather form data
  const formData = new FormData(event.target);
  const searchParams = new URLSearchParams(formData);

  try {
    // Make API request to search for flights
    const response = await fetch('/api/flights?' + searchParams.toString());
    const flights = await response.json();

    // Display search results
    displayFlights(flights);
  } catch (error) {
    console.error('Error searching for flights:', error);
    alert('An error occurred while searching for flights. Please try again later.');
  }
});

// Display a list of flights
function displayFlights(flights) {
  const flightList = document.querySelector('#flight-list');
  flightList.innerHTML = '';

  flights.forEach((flight) => {
    const flightItem = document.createElement('div');
    flightItem.classList.add('flight-item');

    flightItem.innerHTML = `
      <h3>${flight.from} to ${flight.to}</h3>
      <p>Departure: ${flight.departureDate}</p>
      <p>Arrival: ${flight.arrivalDate}</p>
      <p>Price: $${flight.price}</p>
      <button class="btn">Book Now</button>
    `;

    flightList.appendChild(flightItem);
  });
}

// Handle login form submission
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Gather form data
  const formData = new FormData(event.target);
  const loginData = Object.fromEntries(formData.entries());

  try {
    // Make API request to authenticate user
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (response.ok) {
      // Store the JWT token and redirect to the user's bookings page
      const { token } = await response.json();
      localStorage.setItem('authToken', token);
      window.location.href = 'my-bookings.html';
    } else {
      // Display an error message
      alert('Invalid username or password. Please try again.');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('An error occurred while logging in. Please try again later.');
  }
});

// Handle registration form submission
const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Gather form data
  const formData = new FormData(event.target);
  const registerData = Object.fromEntries(formData.entries());

  try {
    // Make API request to register a new user
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    });

    if (response.ok) {
      // Redirect the user to the login page or display a success message
      window.location.href = 'login.html';
    } else {
      // Display an error message
      alert('Error registering user. Please try again.');
    }
  } catch (error) {
    console.error('Error registering user:', error);
    alert('An error occurred while registering. Please try again later.');
  }
});