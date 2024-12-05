// app.js

// Define your weather API key and endpoint
const weatherApiKey = 'YOUR_WEATHER_API_KEY'; // Replace with your actual API key
const weatherApiUrl = 'https://api.yourweatherapi.com/data'; // Replace with your actual API endpoint
const plantApiUrl = 'https://api.example.com/plants'; // Hypothetical plant API

// Function to fetch weather data
async function fetchWeather(location) {
    const response = await fetch(`${weatherApiUrl}?q=${location}&appid=${weatherApiKey}&units=metric`);
    if (!response.ok) {
        throw new Error('Weather data not found');
    }
    return await response.json();
}

// Function to fetch plant details based on weather conditions
async function fetchPlantDetails(weather) {
    const soilCondition = weather.main.humidity; // Example: using humidity as a soil condition
    const response = await fetch(`${plantApiUrl}?humidity=${soilCondition}`);
    if (!response.ok) {
        throw new Error('Plant data not found');
    }
    return await response.json();
}

// Function to display results
function displayResults(weather, plants) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Weather in ${weather.name}</h2>
        <p>Temperature: ${weather.main.temp} °C</p>
        <p>Humidity: ${weather.main.humidity}%</p>
        <h3>Recommended Plants:</h3>
        <ul>
            ${plants.map(plant => `<li>${plant.name} - Ideal for humidity: ${plant.humidity}</li>`).join('')}
        </ul>
    `;
}

// Event listener for the search button
document.getElementById('searchBtn').addEventListener('click', async () => {
    const location = document.getElementById('location').value;
    try {
        const weather = await fetchWeather(location);
        const plants = await fetchPlantDetails(weather);
        displayResults(weather, plants);
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});