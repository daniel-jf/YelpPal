console.log('Login JS...');
console.log('Login JS...');
const form = document.getElementById('signInTemp');

// Submit Event Listener
form.addEventListener('submit', handleLoginSubmit);

// Handle Submit
function handleLoginSubmit(event) {
  let formIsValid = true;
  const userData = {};
  event.preventDefault();

  // Clear Alert Messages
  document.querySelectorAll('.invalid-feedback').forEach((alert) => alert.remove());

  // const formInputs = Array.from(form.elements);
  const formInputs = [...form.elements];
  formInputs.forEach((input) => {
    input.classList.remove('is-invalid');
    if (input.type !== 'submit' && input.value === '') {
      formIsValid = false;
      // Add Red Border to Input
      input.classList.add('is-invalid');
      // Add Error Message Below Input
      input.insertAdjacentHTML('afterend', `
        <div class="invalid-feedback ${input.id}-message">
          Please enter your ${input.email}
        </div>
      `);
    } else if (input.type === 'password' && input.value.length < 4) {
        formIsValid = false;
        // Add Red Border to Input
        input.classList.add('is-invalid');
        // Add Error Message Below Input
        input.insertAdjacentHTML('afterend', `
          <div class="invalid-feedback ${input.id}-message">
            Password must be at least 4 characters
          </div>
        `);
    }

    if (formIsValid) {
      userData[input.email] = input.value;
    }
  });

  if (formIsValid) {
    // SUBMIT DATA TO SERVER
    console.log('Submitting User Data ---->', userData)
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'credentials': 'include',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.location = '/';
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
}