function calculatePF() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
    const interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
    const duration = parseInt(document.getElementById("duration").value) || 0;
    const frequency = document.getElementById("frequency").value;

    let periodsPerYear;
    let investmentPerPeriod;

    // Set frequency and investment per period
    switch (frequency) {
        case "Monthly":
            periodsPerYear = 12;
            investmentPerPeriod = monthlyInvestment;
            break;
        case "Quarterly":
            periodsPerYear = 4;
            investmentPerPeriod = monthlyInvestment * 3;
            break;
        case "Half-Yearly":
            periodsPerYear = 2;
            investmentPerPeriod = monthlyInvestment * 6;
            break;
        case "Yearly":
            periodsPerYear = 1;
            investmentPerPeriod = monthlyInvestment * 12;
            break;
        default:
            periodsPerYear = 12;
            investmentPerPeriod = monthlyInvestment;
    }

    const totalPeriods = periodsPerYear * duration;
    const ratePerPeriod = interestRate / periodsPerYear;

    // Calculate future value of periodic investments
    let maturityAmount = investmentPerPeriod * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod) * (1 + ratePerPeriod);

    // Display result
    document.getElementById("maturityAmount").textContent = maturityAmount.toFixed(2);
}