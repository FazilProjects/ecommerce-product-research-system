function analyzeProduct() {
  const productName = document.getElementById("productName").value.trim();
  const supplierName = document.getElementById("supplierName").value.trim();
  const costPrice = Number(document.getElementById("costPrice").value);
  const sellingPrice = Number(document.getElementById("sellingPrice").value);
  const shippingCost = Number(document.getElementById("shippingCost").value);
  const demandLevel = document.getElementById("demandLevel").value;
  const competitionLevel = document.getElementById("competitionLevel").value;
  const riskNotes = document.getElementById("riskNotes").value.trim();

  if (
    !productName ||
    !supplierName ||
    !costPrice ||
    !sellingPrice ||
    shippingCost < 0 ||
    !demandLevel ||
    !competitionLevel ||
    !riskNotes
  ) {
    alert("Please fill in all fields before analyzing the product.");
    return;
  }

  const totalCost = costPrice + shippingCost;
  const estimatedProfit = sellingPrice - totalCost;
  const profitMargin = (estimatedProfit / sellingPrice) * 100;

  let score = 50;

  if (profitMargin >= 40) {
    score += 25;
  } else if (profitMargin >= 25) {
    score += 15;
  } else if (profitMargin >= 15) {
    score += 5;
  } else {
    score -= 15;
  }

  if (demandLevel === "High") {
    score += 20;
  } else if (demandLevel === "Medium") {
    score += 10;
  } else {
    score -= 10;
  }

  if (competitionLevel === "Low") {
    score += 15;
  } else if (competitionLevel === "Medium") {
    score += 5;
  } else {
    score -= 15;
  }

  if (riskNotes.length > 80) {
    score -= 10;
  } else {
    score += 5;
  }

  score = Math.max(0, Math.min(100, score));

  let riskLevel = "Medium";
  if (score >= 75 && profitMargin >= 25) {
    riskLevel = "Low";
  } else if (score < 50 || profitMargin < 15) {
    riskLevel = "High";
  }

  let finalDecision = "";
  if (score >= 75) {
    finalDecision = "Good product opportunity. This product has strong potential, but supplier reliability and marketplace policy checks are still required.";
  } else if (score >= 50) {
    finalDecision = "Average product opportunity. This product may work, but it needs deeper research before listing.";
  } else {
    finalDecision = "Avoid or research more. The product has weak profit, high competition, low demand, or risk concerns.";
  }

  const listingTitle = `${productName} | Reliable ${productName} for Online Shoppers`;

  const summary = `
    ${productName} from ${supplierName} has an estimated profit of $${estimatedProfit.toFixed(2)} 
    with a profit margin of ${profitMargin.toFixed(1)}%. Demand level is ${demandLevel}, 
    competition level is ${competitionLevel}, and the main risk notes are: ${riskNotes}.
  `;

  document.getElementById("profitOutput").textContent = `$${estimatedProfit.toFixed(2)}`;
  document.getElementById("marginOutput").textContent = `${profitMargin.toFixed(1)}%`;
  document.getElementById("scoreOutput").textContent = `${score}/100`;
  document.getElementById("riskOutput").textContent = riskLevel;

  document.getElementById("summaryOutput").textContent = summary;
  document.getElementById("titleOutput").textContent = listingTitle;
  document.getElementById("decisionOutput").textContent = finalDecision;
}
