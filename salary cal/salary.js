document.getElementById("bonusType").addEventListener("change", function () {
    const bonusType = this.value;
    const bonusInCTCInput = document.getElementById("bonusInCTC");
  
    if (bonusType === "percentage") {
      bonusInCTCInput.placeholder = "Enter bonus percentage";
    } else {
      bonusInCTCInput.placeholder = "Enter fixed bonus amount";
    }
  });
  
  document.getElementById("calculateButton").addEventListener("click", function () {
    const ctc = parseFloat(document.getElementById("ctc").value);
    const bonusType = document.getElementById("bonusType").value;
    const bonusInCTC = parseFloat(document.getElementById("bonusInCTC").value);
    const monthlyPT = parseFloat(document.getElementById("monthlyPT").value);
    const employerPF = parseFloat(document.getElementById("employerPF").value);
    const employeePF = parseFloat(document.getElementById("employeePF").value);
    const additionalDeduction = parseFloat(document.getElementById("additionalDeduction").value) || 0;
  
    // Calculate bonus
    let annualBonus = 0;
  
    if (bonusType === "percentage") {
      annualBonus = (bonusInCTC / 100) * ctc; // Percentage of CTC
    } else if (bonusType === "fixed") {
      annualBonus = bonusInCTC; // Fixed bonus amount
    }
  
    // Calculate deductions
    const annualPT = monthlyPT * 12;
    const annualEmployerPF = employerPF * 12;
    const annualEmployeePF = employeePF * 12;
    const annualAdditionalDeduction = additionalDeduction * 12;
    const totalAnnualDeduction = annualPT + annualEmployeePF + annualAdditionalDeduction;
    const monthlyDeduction = totalAnnualDeduction / 12;
  
    // Calculate take-home salary
    const takeHomeAnnual = ctc + annualBonus - totalAnnualDeduction;
    const takeHomeMonthly = takeHomeAnnual / 12;
  
    // Update results on the page
    document.getElementById("monthlyDeduction").textContent = monthlyDeduction.toFixed(2);
    document.getElementById("annualDeduction").textContent = totalAnnualDeduction.toFixed(2);
    document.getElementById("monthlyTakeHome").textContent = takeHomeMonthly.toFixed(2);
    document.getElementById("annualTakeHome").textContent = takeHomeAnnual.toFixed(2);
  
    // Chart Data
    const ctx = document.getElementById("salaryChart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["CTC (Excluding Bonus)", "Bonus", "Annual Deductions", "Take Home Salary"],
        datasets: [
          {
            data: [ctc - annualBonus, annualBonus, totalAnnualDeduction, takeHomeAnnual],
            backgroundColor: ["#0077b6", "#00b4d8", "#ff6f61", "#28a745"],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  });
  