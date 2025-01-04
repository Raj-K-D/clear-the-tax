function calculateHRA() {
    const basicSalary = parseFloat(document.getElementById("basicSalary").value) || 0;
    const dearnessAllowance = parseFloat(document.getElementById("dearnessAllowance").value) || 0;
    const commission = parseFloat(document.getElementById("commission").value) || 0;
    const hraReceived = parseFloat(document.getElementById("hraReceived").value) || 0;
    const annualRent = parseFloat(document.getElementById("annualRent").value) || 0;

    // Calculate HRA exemption (minimum of the three conditions)
    const basicDA = basicSalary + dearnessAllowance;
    const rentMinus10Percent = annualRent - (0.1 * basicDA);
    const exemption = Math.min(hraReceived, 0.5 * basicDA, rentMinus10Percent);

    // Calculated values
    const exemptedHRA = Math.max(0, exemption); // Ensure it's not negative
    const taxableHRA = hraReceived - exemptedHRA;

    // Display Results
    document.getElementById("hraReceivedDisplay").textContent = hraReceived.toFixed(2);
    document.getElementById("exemptedHraDisplay").textContent = exemptedHRA.toFixed(2);
    document.getElementById("taxableHraDisplay").textContent = taxableHRA.toFixed(2);

    // Draw Chart
    drawChart(hraReceived, exemptedHRA, taxableHRA);
}

function drawChart(hraReceived, exemptedHRA, taxableHRA) {
    const ctx = document.getElementById('hraChart').getContext('2d');
    
    // Clear previous chart instance if it exists
    if (window.hraChart) {
        window.hraChart.destroy();
    }
    
    // Create new chart
    window.hraChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HRA Received', 'Exempted HRA', 'Taxable HRA'],
            datasets: [{
                label: 'HRA Amounts',
                data: [hraReceived, exemptedHRA, taxableHRA],
                backgroundColor: ['#4CAF50', '#2196F3', '#FFD700'], // Green, Blue, Yellow
                borderColor: ['#388E3C', '#1976D2', '#FFD700'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount in INR'
                    }
                }
            }
        }
    });
}