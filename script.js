function updateTemperature() {
    const tempElement = document.getElementById("temperature");
    const warningElement = document.getElementById("warning");
    const tempSlider = document.getElementById("tempSlider");

    let temperature = parseFloat(tempSlider.value);
    tempElement.textContent = temperature;

    // Set temperature warnings
    if (temperature < 0) {
        warningElement.textContent = "Warning: Extreme cold temperature!";
        warningElement.style.color = "#FF4500"; // Red color for warning
    } else if (temperature > 80) {
        warningElement.textContent = "Warning: High temperature!";
        warningElement.style.color = "#FF4500"; // Red color for warning
    } else if (temperature > 50) {
        warningElement.textContent = "Caution: Temperature is getting high.";
        warningElement.style.color = "#FFA500"; // Orange color for caution
    } else {
        warningElement.textContent = "";
    }

    updateTemperatureImpact(temperature);
    updateBatteryCondition(temperature);
}

function updateBatteryCondition(temperature) {
    const conditionElement = document.getElementById("batteryCondition");
    let condition;

    // Determine battery condition based on temperature impact
    if (temperature < 0) {
        condition = "Battery condition: Poor (Extreme cold)";
    } else if (temperature > 80) {
        condition = "Battery condition: Poor (High temperature)";
    } else if (temperature > 50) {
        condition = "Battery condition: Moderate (High temperature)";
    } else {
        condition = "Battery condition: Good";
    }

    conditionElement.textContent = condition; // Update the battery condition display
    updateBatteryHealth();
}

function updateCharge() {
    const chargeElement = document.getElementById("charge");
    const chargeWarningElement = document.getElementById("chargeWarning");
    const chargeSlider = document.getElementById("chargeSlider");

    let charge = parseInt(chargeSlider.value, 10);
    chargeElement.textContent = charge;

    // Set warning for low charge level
    if (charge < 20) {
        chargeWarningElement.textContent = "Warning: Low Charge Level!";
        chargeWarningElement.style.color = "#FF4500"; // Red color for warning
    } else if (charge >= 20 && charge < 40) {
        chargeWarningElement.textContent = "Caution: Charge Level is getting low.";
        chargeWarningElement.style.color = "#FFA500"; // Orange color for caution
    } else {
        chargeWarningElement.textContent = "";
    }

    updateBatteryHealth();
}

function updateEfficiency() {
    const efficiencyElement = document.getElementById("efficiency");
    const efficiencyStatusElement = document.getElementById("efficiencyStatus");
    const efficiencySlider = document.getElementById("efficiencySlider");

    let efficiency = parseInt(efficiencySlider.value, 10);
    efficiencyElement.textContent = efficiency;

    // Set warning for low efficiency
    if (efficiency < 70) {
        efficiencyStatusElement.textContent = "Warning: Low Efficiency!";
        efficiencyStatusElement.style.color = "#FF4500"; // Red color for warning
    } else if (efficiency >= 70 && efficiency < 85) {
        efficiencyStatusElement.textContent = "Caution: Efficiency is moderate.";
        efficiencyStatusElement.style.color = "#FFA500"; // Orange color for caution
    } else {
        efficiencyStatusElement.textContent = "";
    }

    updateBatteryHealth();
}

function updateBatteryHealth() {
    const healthElement = document.getElementById("batteryHealth");
    const temperature = parseFloat(document.getElementById("tempSlider").value);
    const charge = parseInt(document.getElementById("chargeSlider").value, 10);
    const efficiency = parseInt(document.getElementById("efficiencySlider").value, 10);

    let health = 100; // Default health percentage

    // Reduce health based on temperature
    if (temperature < 0 || temperature > 80) {
        health -= 30; // Significant drop in health
    } else if (temperature > 50) {
        health -= 10; // Moderate drop in health
    }

    // Reduce health based on charge
    if (charge < 20) {
        health -= 20; // Significant drop in health
    } else if (charge < 40) {
        health -= 10; // Moderate drop in health
    }

    // Reduce health based on efficiency
    if (efficiency < 70) {
        health -= 20; // Significant drop in health
    } else if (efficiency < 85) {
        health -= 10; // Moderate drop in health
    }

    // Set the battery health message
    healthElement.textContent = `Battery Health: ${health}%`;
    healthElement.style.color = health < 50 ? "#FF4500" : (health < 75 ? "#FFA500" : "#5cb85c"); // Color coding
}

function updateTemperatureImpact(temperature) {
    const tempImpactElement = document.getElementById("tempImpact");

    if (temperature > 80) {
        setImpact(tempImpactElement, "High", "#FF4500"); // Warning color
    } else if (temperature > 50) {
        setImpact(tempImpactElement, "Moderate", "#f0ad4e"); // Moderate warning color
    } else {
        setImpact(tempImpactElement, "Low", "#5cb85c"); // Safe color
    }
}

function setImpact(element, status, color) {
    element.textContent = status;
    element.style.color = color;
    // Sample data for charge history
const chargeHistory = [100, 80, 60, 50, 70, 90, 100];
const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

const ctx = document.getElementById('chargeChart').getContext('2d');
const chargeChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Battery Charge Level (%)',
            data: chargeHistory,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Charge Level (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Days'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            }
        }
    }
});
function showNotification(message) {
    const notificationArea = document.getElementById('notificationArea');

    // Create a new notification div
    const notification = document.createElement('div');
    notification.className = 'notification show';
    notification.textContent = message;

    // Append the notification to the notification area
    notificationArea.appendChild(notification);

    // Remove the notification after a few seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notificationArea.removeChild(notification);
        }, 500); // Delay to allow fade out before removal
    }, 3000); // Show for 3 seconds
}

// Example: Trigger a notification when temperature exceeds a threshold
function checkBatteryConditions(temperature, charge, efficiency) {
    if (temperature > 80) {
        showNotification('Warning: High battery temperature!');
    }
    if (charge < 20) {
        showNotification('Warning: Low battery charge!');
    }
    if (efficiency < 70) {
        showNotification('Warning: Low battery efficiency!');
    }
}

// Call this function whenever battery conditions are analyzed
// Example:
checkBatteryConditions(85, 15, 65); // This will trigger notifications


}
