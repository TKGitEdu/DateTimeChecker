// Get references to DOM elements
const clearButton = document.getElementById('clearButton');
const checkButton = document.getElementById('checkButton'); // Added reference for checkButton
const closeFormButton = document.getElementById('closeFormButton'); // Added reference for closeFormButton
const dayInput = document.getElementById('dayInput');
const monthInput = document.getElementById('monthInput');
const yearInput = document.getElementById('yearInput');
const messageArea = document.getElementById('messageArea');

// Add event listener to the 'Clear' button
clearButton.addEventListener('click', () => {
  // Clear input fields
  dayInput.value = '';
  monthInput.value = '';
  yearInput.value = '';

  // Clear message area
  messageArea.textContent = '';
});

// Add event listener to the 'Check' button
checkButton.addEventListener('click', () => {
  const dayStr = dayInput.value;
  const monthStr = monthInput.value;
  const yearStr = yearInput.value;

  // Empty Input Check
  if (dayStr === '' || monthStr === '' || yearStr === '') {
    messageArea.textContent = "Data input is required.";
    return; // Do not proceed if any input is empty
  }

  // Call Validation
  const validationResult = validateDate(dayStr, monthStr, yearStr);
  messageArea.textContent = validationResult.message;
});

// Add event listener to the 'Close Form' button
closeFormButton.addEventListener('click', () => {
  if (confirm("Are you sure you want to clear the form?")) {
    dayInput.value = '';
    monthInput.value = '';
    yearInput.value = '';
    messageArea.textContent = '';
  }
});

// Function to validate the date
function validateDate(dayStr, monthStr, yearStr) {
  const day = parseInt(dayStr);
  const month = parseInt(monthStr);
  const year = parseInt(yearStr);

  let isValid = true;
  let message = "";

  // Year Validation
  if (isNaN(year) || year <= 0) {
    isValid = false;
    message = "Invalid year.";
    return { isValid, message };
  }

  // Month Validation
  if (isNaN(month) || month < 1 || month > 12) {
    isValid = false;
    message = "Invalid month. Please enter a value between 1 and 12.";
    return { isValid, message };
  }

  // Day Validation
  if (isNaN(day) || day < 1) {
    isValid = false;
    message = "Invalid day.";
    return { isValid, message };
  }

  let maxDays;
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    maxDays = 30;
  } else if (month === 2) {
    // Check for leap year
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    maxDays = isLeap ? 29 : 28;
  } else {
    maxDays = 31;
  }

  if (day > maxDays) {
    isValid = false;
    message = `Invalid day. Please enter a value between 1 and ${maxDays}.`;
    return { isValid, message };
  }

  if (isValid) {
    message = "Valid date.";
  }

  return { isValid, message };
}
