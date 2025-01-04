let chartInstance; // To store the current chart instance

document.getElementById('tax-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const taxRegime = document.getElementById('tax-regime').value;
    const ageGroup = document.getElementById('age').value;
    const income = parseFloat(document.getElementById('income').value);
    const deductions = parseFloat(document.getElementById('deductions').value);
    let tax = 0;
    let taxableIncome = income - deductions;

    // Adjust income slabs based on age group
    let slabLimit = 250000; // Default for below 60
    if (ageGroup === '60-79') slabLimit = 300000;
    else if (ageGroup === '80above') slabLimit = 500000;

    // Tax calculation logic based on the regime
    if (taxRegime === 'new') {
        // New Tax Regime Rates (simplified, no deductions)
        if (taxableIncome <= slabLimit) tax = 0;
        else if (taxableIncome <= 500000) tax = (taxableIncome - slabLimit) * 0.05;
        else if (taxableIncome <= 750000) tax = 12500 + (taxableIncome - 500000) * 0.1;
        else if (taxableIncome <= 1000000) tax = 37500 + (taxableIncome - 750000) * 0.15;
        else tax = 75000 + (taxableIncome - 1000000) * 0.2;
    } else {
        // Old Tax Regime Rates (deductions included)
        if (taxableIncome <= slabLimit) tax = 0;
        else if (taxableIncome <= 500000) tax = (taxableIncome - slabLimit) * 0.1;
        else if (taxableIncome <= 1000000) tax = 25000 + (taxableIncome - 500000) * 0.2;
        else tax = 125000 + (taxableIncome - 1000000) * 0.3;
    }

    // Display the result
    document.getElementById('result').innerText = `Calculated Tax: ₹${tax.toFixed(2)}`;

    // Generate the data for chart: Total Income, Deductions, Taxable Income, and Tax Payable
    updateChart(income, deductions, taxableIncome, tax, taxRegime);
});

// Function to update the chart
function updateChart(income, deductions, taxableIncome, tax, taxRegime) {
    const ctx = document.getElementById('taxChart').getContext('2d');

    // Destroy previous chart if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Create a new chart instance
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Income', 'Deductions', 'Taxable Income', 'Tax Payable'],
            datasets: [{
                label: `${taxRegime === 'old' ? 'Old' : 'New'} Tax Regime`,
                data: [income, deductions, taxableIncome, tax],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Total Income color
                    'rgba(255, 159, 64, 0.2)', // Deductions color
                    'rgba(153, 102, 255, 0.2)', // Taxable Income color
                    'rgba(255, 99, 132, 0.2)'   // Tax Payable color
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
