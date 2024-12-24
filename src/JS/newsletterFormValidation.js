const newsletterForm = document.querySelector('#newsletter-form');
const emailInput = document.querySelector('input');
const privacyBox = document.querySelector('#privacy-policy');
const submitBtn = document.querySelector('#newsletter-form .button');
const modalMsg = document.querySelector('.modal.is-newsletter');
const modalButton = document.querySelector('.modal button');
const errorMsg = document.querySelector('.newsletter-error-msg');
const body = document.body;

newsletterForm.addEventListener('submit', handleSubmit);
emailInput.addEventListener('change', handleChange);

// Clear all states
clearStates();

// Dismiss modal msg
modalButton.addEventListener('click', e => {
  modalMsg.classList.remove('is-active');
  clearStates();
});

// Get form validtion on submit
function handleSubmit(e) {
  e.preventDefault();

  const isChecked = privacyBox.checked;
  const isValid = getValidateEmail(emailInput.value);
  const isAllValid = getValidation(isValid, isChecked);

  if (isAllValid) {
    const formData = {
      email: emailInput.value,
      privacyPolicy: isChecked,
    };

    sendDataToServer(formData);
  }
}
function handleChange(e) {
  const isValid = getValidateEmail(e.target.value);
  if (isValid) {
    clearStates();
  } else {
    errorMsg.classList.add('is-error');
    emailInput.classList.add('is-invalid');
  }
}
function getValidateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}
function getValidation(email, checkbox) {
  if (email) {
    emailInput.classList.add('is-valid');
    submitBtn.classList.add('is-green');
    if (checkbox) {
      modalMsg.classList.add('is-active');
      body.classList.add('is-locked');
    } else {
      errorMsg.textContent = 'Будь-ласка підвердіть політику приватності';
      errorMsg.classList.add('is-error');
      privacyBox.classList.add('is-invalid');
    }
  } else {
    errorMsg.textContent = 'Перевірте Ваш email';
    errorMsg.classList.add('is-error');
    emailInput.classList.add('is-invalid');
  }

  if (email && checkbox) {
    return true;
  }

  return false;
}
function clearStates() {
  // Clear previous states
  errorMsg.classList.remove('is-error');
  emailInput.classList.remove('is-invalid');
  emailInput.classList.remove('is-valid');
  modalMsg.classList.remove('is-active');
  submitBtn.classList.remove('is-green');
  body.classList.remove('is-locked');
}
function formReset() {
  newsletterForm.reset();
  privacyBox.classList.remove('is-invalid');
}
function sendDataToServer(data) {
  const somePromise = fetch(
    'https://676a8efa863eaa5ac0ded677.mockapi.io/signup/newsletter',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  somePromise
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      formReset();
    })
    .catch(error => {
      console.log(error);
    });
}
