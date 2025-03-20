function analyzeVehicleDetails(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Get values from input fields
    const temperature = parseInt(document.getElementById("tempInput").value);
    const charge = parseInt(document.getElementById("chargeInput").value);
    const efficiency = parseInt(document.getElementById("efficiencyInput").value);

    // Validate inputs
    if (temperature < -10 || temperature > 120) {
        document.getElementById("vehicleAnalysis").textContent = "Error: Temperature must be between -10°C and 120°C.";
        return; // Exit function if input is invalid
    }
    if (charge < 0 || charge > 100) {
        document.getElementById("vehicleAnalysis").textContent = "Error: Charge level must be between 0% and 100%.";
        return; // Exit function if input is invalid
    }
    if (efficiency < 60 || efficiency > 100) {
        document.getElementById("vehicleAnalysis").textContent = "Error: Efficiency must be between 60% and 100%.";
        return; // Exit function if input is invalid
    }

    // Analyze the input and provide feedback
    let analysis = `Temperature: ${temperature}°C, Charge: ${charge}%, Efficiency: ${efficiency}%`;

    // Calculate battery health based on inputs
    let healthPercentage = 100; // Start at 100%

    // Adjust health based on temperature
    if (temperature < 0 || temperature > 80) {
        healthPercentage -= 30; // Significant drop for extreme temperatures
    } else if (temperature > 50) {
        healthPercentage -= 10; // Moderate drop for higher temperatures
    }

    // Adjust health based on charge
    if (charge < 20) {
        healthPercentage -= 20; // Significant drop for low charge
    } else if (charge < 40) {
        healthPercentage -= 10; // Moderate drop for low charge
    }

    // Adjust health based on efficiency
    if (efficiency < 70) {
        healthPercentage -= 20; // Significant drop for low efficiency
    } else if (efficiency < 85) {
        healthPercentage -= 10; // Moderate drop for efficiency
    }

    // Determine health status
    let healthStatus;
    if (healthPercentage >= 75) {
        healthStatus = "High";
    } else if (healthPercentage >= 50) {
        healthStatus = "Moderate";
    } else {
        healthStatus = "Low";
    }

    // Update the health status in the HTML
    document.getElementById("healthStatus").textContent = `${healthStatus} (${healthPercentage}%)`;

    // Display the analysis result
    document.getElementById("vehicleAnalysis").textContent = analysis;
}
