et sipChart;

function calculateSIP() {
    // Get input values
    let sipAmount = parseFloat(document.getElementById('sipAmount').value);
    let sipPeriod = parseFloat(document.getElementById('sipPeriod').value);
    let returnRate = parseFloat(document.getElementById('returnRate').value) / 100;

    // Check if all fields are filled
    if (isNaN(sipAmount) || isNaN(sipPeriod) || isNaN(returnRate)) {
        alert("Please fill in all the fields.");
        return;
    }

    // SIP Calculation Logic
    let months = sipPeriod * 12;
    let monthlyRate = returnRate / 12;
    let futureValue = sipAmount * (((Math.pow(1 + monthlyRate, months)) - 1) / monthlyRate) * (1 + monthlyRate);

    let investedAmount = sipAmount * months;
    let wealthGained = futureValue - investedAmount;

    // Display Results
    document.getElementById('wealthGained').innerText = wealthGained.toFixed(2);
    document.getElementById('investedAmount').innerText = investedAmount.toFixed(2);
    document.getElementById('totalWealth').innerText = futureValue.toFixed(2);

    // Create or Update Chart
    if (sipChart) {
        sipChart.data.datasets[0].data = [investedAmount, wealthGained, futureValue];
        sipChart.update();
    } else {
        const ctx = document.getElementById('sipChart').getContext('2d');
        sipChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Invested Amount', 'Wealth Gained', 'Total Wealth'],
                datasets: [{
                    label: '₹ Amount',
                    data: [investedAmount, wealthGained, futureValue],
                    backgroundColor: ['#4CAF50', '#2196F3', '#FF9800'],
                    borderColor: ['#388E3C', '#1976D2', '#F57C00'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}