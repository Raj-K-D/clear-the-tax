function calculateReturns() {
  const investment =
    parseFloat(document.getElementById("investment").value) || 0;
  const returnRate =
    parseFloat(document.getElementById("returnRate").value) || 0;
  const timePeriod =
    parseFloat(document.getElementById("timePeriod").value) || 0;

  const totalValue = investment * Math.pow(1 + returnRate / 100, timePeriod);
  const estimatedReturns = totalValue - investment;

  document.getElementById("investedAmount").innerText = `₹${investment.toFixed(
    2
  )}`;
  document.getElementById(
    "estimatedReturns"
  ).innerText = `₹${estimatedReturns.toFixed(2)}`;
  document.getElementById("totalValue").innerText = `₹${totalValue.toFixed(2)}`;

  showChart(investment, estimatedReturns);
}

function showChart(investedAmount, estimatedReturns) {
  const ctx = document.getElementById("returnsChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Invested Amount", "Estimated Returns"],
      datasets: [
        {
          label: "Returns Breakdown",
          data: [investedAmount, estimatedReturns],
          backgroundColor: ["#007bff", "#28a745"],
        },
      ],
    },
  });
}
