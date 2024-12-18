const newsletterForm = document.querySelector('#newsletter-form');
const input = document.querySelector('input');
const modalMsg = document.querySelector('.modal-msg');
const modalButton = document.querySelector('.modal-msg button');
const errorMsg = document.querySelector('.newsletter-error-msg');
const body = document.body;

newsletterForm.addEventListener('submit', handleSubmit);
input.addEventListener('change', handleChange);

// Clear all states
clearStates();

// Dismiss modal msg
modalButton.addEventListener('click', e => {
  modalMsg.classList.remove('isActive');
  clearStates();
});

// Get form validtion on submit
function handleSubmit(e) {
  e.preventDefault();

  const isValid = getValidateEmail(input.value);
  getValidation(isValid);
}
function handleChange(e) {
  const isValid = getValidateEmail(e.target.value);
  if (isValid) {
    clearStates();
  } else {
    errorMsg.classList.add('is-error');
    input.classList.add('is-invalid');
  }
}
function getValidateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}
function getValidation(value) {
  if (value) {
    modalMsg.classList.add('isActive');
    body.classList.add('is-locked');
    input.value = '';
  } else {
    errorMsg.classList.add('is-error');
    input.classList.add('is-invalid');
  }
}
function clearStates() {
  // Clear previous states
  errorMsg.classList.remove('is-error');
  input.classList.remove('is-invalid');
  modalMsg.classList.remove('isActive');
  body.classList.remove('is-locked');
}
