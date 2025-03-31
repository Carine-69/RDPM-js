 function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Display Latitude and Longitude
            document.getElementById("location").innerHTML =
                `Latitude: ${latitude}<br>Longitude: ${longitude}<br>Loading weather data...`;

            const apiKey = "167b33ad773f85cb24fc93cd87adbbd4"; // Replace with your OpenWeatherMap API key
            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;
            const alertsUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,daily&appid=${apiKey}&units=metric`;

            // Fetch Current Weather
            fetch(currentWeatherUrl)
                .then(response => response.json())
                .then(data => {
                    const currentTemp = data.main.temp;
                    const currentWeather = data.weather[0].description;
                    const humidity = data.main.humidity;
                    const windSpeed = data.wind.speed;

                    // Get Location Name (Reverse Geocoding)
                    const reverseGeocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b0dc9bf195034eb694ea703006bb1219`; // Replace with your OpenCage API Key
                    fetch(reverseGeocodeUrl)
                        .then(response => response.json())
                        .then(locationData => {
                            const location = locationData.results[0]?.formatted || "Unknown Location";
                            document.getElementById("location").innerHTML =
                                `Location: ${location}<br>Latitude: ${latitude}<br>Longitude: ${longitude}<br>Loading weather data...`;

                            // Display Current Weather
                            document.getElementById("weather-info").innerHTML = `  
                                <h3>Current Weather:</h3>
                                <p>Temperature: ${currentTemp}°C</p>
                                <p>Weather: ${currentWeather}</p>
                                <p>Humidity: ${humidity}%</p>
                                <p>Wind Speed: ${windSpeed} m/s</p>
                            `;
                        })
                        .catch(error => {
                            console.error(error);
                            document.getElementById("weather-info").innerHTML += "<p>Error fetching location.</p>";
                        });
                })
                .catch(error => {
                    console.error("Error fetching current weather:", error);
                    document.getElementById("weather-info").innerHTML += "<p>Error fetching current weather.</p>";
                });

            // Fetch 7-Day Forecast
            fetch(forecastUrl)
                .then(response => response.json())
                .then(data => {
                    console.log("Forecast Data:", data); // Add debug log to check the raw response structure
                    const dailyForecast = data.daily;
                    if (!dailyForecast || dailyForecast.length === 0) {
                        console.error("No daily forecast data available.");
                        document.getElementById("weather-info").innerHTML += "<p>Error: No 7-day forecast data available.</p>";
                        return;
                    }

                    let forecastHTML = `<h3>7-Day Forecast:</h3><ul>`;
                    dailyForecast.forEach((day, index) => {
                        const date = new Date(day.dt * 1000).toLocaleDateString();
                        const tempDay = day.temp.day;
                        const weatherDesc = day.weather[0].description;
                        forecastHTML += `
                            <li><strong>${date}:</strong> ${tempDay}°C, ${weatherDesc}</li>
                        `;
                    });
                    forecastHTML += `</ul>`;
                    document.getElementById("weather-info").innerHTML += forecastHTML;
                })
                .catch(error => {
                    console.error("Error fetching forecast:", error);
                    document.getElementById("weather-info").innerHTML += "<p>Error fetching 7-day forecast: " + error.message + "</p>";
                });

            // Fetch Weather Alerts (if any)
            fetch(alertsUrl)
                .then(response => response.json())
                .then(data => {
                    const alerts = data.alerts;
                    let alertsHTML = `<h3>Weather Alerts:</h3>`;
                    if (alerts && alerts.length > 0) {
                        alerts.forEach(alert => {
                            alertsHTML += `
                                <p><strong>${alert.event}</strong>: ${alert.description}</p>
                            `;
                        });
                    } else {
                        alertsHTML += "<p>No active alerts.</p>";
                    }
                    document.getElementById("weather-info").innerHTML += alertsHTML;
                })
                .catch(error => {
                    console.error("Error fetching weather alerts:", error);
                    document.getElementById("weather-info").innerHTML += "<br><p>Error fetching weather alerts: " + error.message + "</p>";
                });
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    document.getElementById("weather-info").innerHTML = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    document.getElementById("weather-info").innerHTML = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    document.getElementById("weather-info").innerHTML = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    document.getElementById("weather-info").innerHTML = "An unknown error occurred.";
                    break;
            }
        }