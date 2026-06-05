
const form = document.querySelector("#EventForm");
const type = document.querySelector("#type");
const varificationContainer = document.querySelector("#varificationContainer");
const varification = document.querySelector("#varification");
const varificationLabel = document.querySelector('label[for="varification"]');
const output = document.querySelector("#output");

function updateNotesField() {
  const value = type.value;

  // Show the travel notes on the form if they are choosing many campuses and require it
  
  if (value === 'guest'){
    varificationContainer.hidden = false;
    varificationLabel.textContent = "Please enter the event access code.";
    //varification.required = true;
  } else if (value === 'student') {
    varificationContainer.hidden = false;
    varificationLabel.textContent = "Please enter your student I#.";
    //varification.required = true;
  }
  else {
    varificationContainer.hidden = true;
    //varification.required = false;
  }

}

type.addEventListener("change", updateNotesField);
updateNotesField();


// Ensure they choose a date later than the current date
function isPastDate(value) {
  const today = new Date();
  const chosen = new Date(value);
  return chosen < today;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.type.value;
  const EndDate = form.EndDate.value;
  const varification = form.varification.value.trim();

  // Validate the input
  // Let the user know to select at least one campus
  let errored = false;
  let amtErrored = 0;

  
  // Let the user know if they choose many campuses but didn't put a note that they need to add a note

  if (type ==='guest' && varification !== 'EVENT131'){
    console.log("Guest");
    errored = true;
    amtErrored++;
    output.textContent += `${amtErrored} - Please enter the event access code.\n`;
  }

  if (type ==='student' && varification === ''){
    console.log("Student");
    errored = true;
    amtErrored++;
    output.textContent += `${amtErrored} - Please enter your student I#.\n`;
  } else if (type === 'student' && varification.length !== 9){
    console.log("Student");
    errored = true;
    amtErrored++;
    output.textContent += `${amtErrored} - Please enter a valid 9 digit student I#.\n`;
  }

  if (isPastDate(EndDate)) {
    errored = true;
    amtErrored++;
    output.textContent += `${amtErrored} - Please choose a later date.\n`;
  }

  if (errored) {
    return;
  }

  output.innerHTML = `
  <h2>Ticket Created</h2>
  <p>${firstName} ${lastName}</p>
  <p>${type}</p>
  <p>${EndDate}</p>
 
  `;

  form.reset();
  updateNotesField();
});

