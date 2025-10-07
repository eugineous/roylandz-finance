const incomeInput = document.getElementById('income');
const needsRange = document.getElementById('needs');
const wantsRange = document.getElementById('wants');
const savingsRange = document.getElementById('savings');

const needsLabel = document.getElementById('needs-value');
const wantsLabel = document.getElementById('wants-value');
const savingsLabel = document.getElementById('savings-value');

const needsAmount = document.getElementById('needs-amount');
const wantsAmount = document.getElementById('wants-amount');
const savingsAmount = document.getElementById('savings-amount');

const yearEl = document.getElementById('year');

const clampPercentages = () => {
  let needs = Number(needsRange.value);
  let wants = Number(wantsRange.value);
  let savings = Number(savingsRange.value);

  const total = needs + wants + savings;

  if (total !== 100) {
    const scale = 100 / total;
    needs = Math.round(needs * scale);
    wants = Math.round(wants * scale);
    savings = Math.max(100 - needs - wants, 0);
  }

  needsRange.value = needs;
  wantsRange.value = wants;
  savingsRange.value = savings;

  needsLabel.textContent = needs;
  wantsLabel.textContent = wants;
  savingsLabel.textContent = savings;
};

const formatCurrency = (value) => {
  return `KES ${Number(value).toLocaleString('en-KE')}`;
};

const updateResults = () => {
  clampPercentages();

  const income = Number(incomeInput.value) || 0;
  const needs = Number(needsRange.value);
  const wants = Number(wantsRange.value);
  const savings = Number(savingsRange.value);

  const needsValue = Math.round((needs / 100) * income);
  const wantsValue = Math.round((wants / 100) * income);
  const savingsValue = income - needsValue - wantsValue;

  needsAmount.textContent = formatCurrency(needsValue);
  wantsAmount.textContent = formatCurrency(wantsValue);
  savingsAmount.textContent = formatCurrency(savingsValue);
};

[incomeInput, needsRange, wantsRange, savingsRange].forEach((input) => {
  input?.addEventListener('input', updateResults);
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

updateResults();
