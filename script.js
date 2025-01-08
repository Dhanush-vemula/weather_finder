function getGeolocation(){
    const latitudeIn = document.getElementById('latitude');
    const longitudeIn = document.getElementById('longitude')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            latitudeIn.value = position.coords.latitude;
            longitudeIn.value = position.coords.longitude;
            fetchWeatherData();
        },(error)=>{
            alert("Can't able to fetch location");
        });
    }else{
        alert("Geolocation Not Available");
    }
}
async function fetchWeatherData() {
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');

    let isValid = true;

    // Clear previous messages and reset styles
    latitudeInput.style.borderColor = '#ccc';
    longitudeInput.style.borderColor = '#ccc';
    latitudeInput.placeholder = 'Enter latitude';
    longitudeInput.placeholder = 'Enter longitude';

    if (!latitudeInput.value) {
      latitudeInput.style.borderColor = '#ff0000'; // Red border for missing input
      latitudeInput.placeholder = 'Please enter your latitude'; // Update placeholder text
      isValid = false;
    }

    if (!longitudeInput.value) {
      longitudeInput.style.borderColor = '#ff0000'; // Red border for missing input
      longitudeInput.placeholder = 'Please enter your longitude'; // Update placeholder text
      isValid = false;
    }

    if (!isValid) {
      return; // Stop if there are validation errors
    }

    const apiKey = 'cac196d3498cd6fbf492ebceb17149a5'; // Replace with your OpenWeatherMap API key
    const latitude = latitudeInput.value;
    const longitude = longitudeInput.value;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      
      const output = document.getElementById('output');
      if (response.ok) { // Successful response
        output.innerHTML = `
          <h3>Weather Data</h3>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Weather: ${data.weather[0].description}</p>
          <h3>Location Data</h3>
          <p>Place: ${data.name}</p>
        `;
      } else {
        output.innerHTML = `<p>Error: ${data.message}</p>`;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('output').innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
  }