# Rwanda Disaster Pre-readiness and Management (RDPM)

RDPM is a web-based disaster management solution designed to improve disaster preparedness in Rwanda. This MVP provides essential functionalities such as user registration, static disaster alerts, emergency contact information, and safety guidelines—all accessible through a clear, multilingual interface. Additionally, our Disaster Alerts module includes a weather section that allows users to:
- **Enter a City:** Retrieve current weather data and a five-day forecast for the specified city.
- **Use My Location:** Allow the system to track the user's location (with permission) and display the current weather along with the exact location.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

The RDPM web app is an MVP aimed at enhancing disaster preparedness in Rwanda. It offers:
- User registration and login
- Static displays for disaster alerts and emergency contacts
- Safety guidelines and educational materials
- A weather module that provides current conditions, a five-day forecast for a searched city, and location-based weather updates

This application serves as the foundation for a more dynamic system that will incorporate real-time updates and advanced features.

## Features

### Current Features
- **User Registration & Authentication:**  
  Users can register using their first name, last name, email, city, address, phone number, and password.
- **Disaster Alerts & Weather Module:**  
  - **Disaster Alerts:** Displays alerts (ubutumwa bwi’integuza) as static content.
  - **Weather Data:**  
    - **City Search:** Users can enter a city to view its current weather and a five-day forecast.
    - **My Location:** Upon granting permission, the app tracks the user’s location and shows the current weather and the precise location.
- **Emergency Contacts:**  
  The section "nimero z'ubutabazi" provides local emergency contact numbers.
And upon clicking it, you will be able to call directly from the app.
- **Safety Information:**  
  The "ubwirinzi/amakuru" section contains safety guidelines and preventive measures.

### Planned (Future) Enhancements
- Real-time, dynamic disaster alerts with push notifications.
- A live data dashboard for continuous updates.
- Direct emergency calling and call classification features.
- Enhanced community engagement through comments and feedback.
- Transition to a Python Flask backend for better performance.
- A dedicated mobile app for improved accessibility and native push notifications.

## Installation & Setup

### Prerequisites
- A modern web browser (e.g., Google Chrome, Firefox)
- Basic knowledge of HTML, CSS, and JavaScript for further development

### Running the App Locally
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/rdpm-app.git
   cd rdpm-app

Install Dependencies:


If using a package manager:

 npm install


Start a Local Server:

 npx http-server .
 Then, open your browser and navigate to http://localhost:8080.


Note: The current version is deployed on Netlify at https://cosmic-pudding-83148d.netlify.app/.
Usage
Registration & Login:


Register by entering your personal details.


Log in using your credentials.


Disaster Alerts & Weather Data:


View static disaster alerts in the "ubutumwa bwi’integuza" section.


City Search: Enter a city name to get the current weather and a five-day forecast.


My Location: Click the 'My Location' button, allow tracking, and view your local weather and precise location.


Emergency Contacts:
Microsoft.QuickAction.Bluetooth
Find local emergency numbers in the "nimero z'ubutabazi" section.

click on call to ask for emergency response

Safety Information:


Access safety guidelines in the "ubwirinzi/amakuru" section.


Future Enhancements
Dynamic real-time alerts and a live dashboard.


Enhanced weather module with updated data.


Direct emergency call features and interactive feedback.


Migration to a Python Flask backend.


Development of a dedicated mobile app.


# Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
   - Click the "Fork" button at the top right of this repository's GitHub page(RDPM-js) to create a copy under your account.

2. **Clone Your Fork Locally**
   ```bash
   git clone https://github.com/Carine-69/RDPM.js.git
   cd repository-RDPM.js




Acknowledgements
Thanks to the Rwanda Disaster Management Authority and local emergency services.


Appreciation to all contributors and user feedback that help improve this system.
kicukiro distict disasters management department(source of the idea).


Acknowledgement of third-party resources used in this project.
MINEMA,Opencage api, shecodes
