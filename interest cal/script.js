function calculateInterest() {
    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const timeUnit = document.getElementById("timeUnit").value;
    const timeValue = parseFloat(document.getElementById("timeValue").value);
    const interestType = document.querySelector('input[name="interestType"]:checked').value;

    let timeInYears = timeValue;
    if (timeUnit === "Months") {
        timeInYears = timeValue / 12;  // Convert months to years
    }

    let interestAmount = 0;
    if (interestType === "Simple") {
        interestAmount = (principal * rate * timeInYears) / 100;
    } else {
        interestAmount = principal * (Math.pow(1 + rate / 100, timeInYears) - 1);
    }

    const totalAmount = principal + interestAmount;

    document.getElementById("interestAmount").textContent = interestAmount.toFixed(2);
    document.getElementById("principalAmount").textContent = principal.toFixed(2);
    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);

    updateChart(principal, interestAmount, totalAmount);
}

function updateChart(principal, interest, total) {
    const interestPercent = (interest / total) * 100;
    const chartFill = document.getElementById("chartFill");
    const chartText = document.getElementById("chartText");

    // Adjust chart fill height based on interest
    chartFill.style.transform = scaleY(${interestPercent / 100});
    chartText.textContent = ${interestPercent.toFixed(1)}% Interest;
}