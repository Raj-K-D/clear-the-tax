function calculateTotal() {
    // Get values
    let salary1 = parseFloat(document.getElementById("salary1").value) || 0;
    let salary2 = parseFloat(document.getElementById("salary2").value) || 0;
    let standardDeduction = parseFloat(document.getElementById("standardDeduction").value) || 0;
    let medInsurance = parseFloat(document.getElementById("medInsurance").value) || 0;
    let investment = parseFloat(document.getElementById("investment").value) || 0;

    // Calculate total salary and total income
    let totalSalary = salary1 + salary2 - standardDeduction;
    let totalIncome = totalSalary - medInsurance - investment;

    // Update values in the form
    document.getElementById("totalSalary").value = totalSalary.toFixed(2);
    document.getElementById("totalIncome").value = totalIncome.toFixed(2);
}

function downloadJSON() {
    // Gather form data
    let formData = {
        employer1: document.getElementById("employer1").value,
        salary1: document.getElementById("salary1").value,
        employer2: document.getElementById("employer2").value,
        salary2: document.getElementById("salary2").value,
        totalSalary: document.getElementById("totalSalary").value,
        standardDeduction: document.getElementById("standardDeduction").value,
        medInsurance: document.getElementById("medInsurance").value,
        investment: document.getElementById("investment").value,
        totalIncome: document.getElementById("totalIncome").value,
        name: document.getElementById("name").value,
        pan: document.getElementById("pan").value,
        returnType: document.getElementById("returnType").value,
        section139: document.getElementById("section139").value
    };

    // Convert form data to JSON
    let jsonStr = JSON.stringify(formData, null, 2);

    // Create a Blob and download the file
    let blob = new Blob([jsonStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "itr_form_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
