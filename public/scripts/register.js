console.log('Register JS...');
// const ctrl = require('../../controllers');
const form = document.getElementById('signup');


form.addEventListener('click', handleSignupSubmit);

function handleSignupSubmit(event) {
  let formIsValid = true;
  const userData = {};
  event.preventDefault();
  document.querySelectorAll('.invalid-feedback').forEach((alert) => alert.remove());
  
  const formInputs = Array.from(form.elements);
  formInputs.forEach((input) => {
    input.classList.remove('is-invalid');
    if (input.type !== 'submit' && input.value === '') {
      formIsValid = false;
      input.classList.add('is-invalid');
      input.insertAdjacentHTML('afterend', `
        <div class="invalid-feedback ${input.id}-message">
          Please enter your ${input.name}
        </div>
      `);
    } else if (input.type === 'password' && input.value.length < 4) {
        formIsValid = false;
        input.classList.add('is-invalid');
        input.insertAdjacentHTML('afterend', `
          <div class="invalid-feedback ${input.id}-message">
            Password must be at least 4 characters
          </div>
        `);
    }

    if (formIsValid) {
      console.log({[input.name]:input.value})
      userData[input.name] = input.value;
    }
  });

  if (formIsValid) {
    console.log('Submitting User Data ---->', userData)
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location = '/login';
      })
      .catch((err) => console.log(err));

    //testing
    // ctrl.auth.register();
    // window.location = '/login';
  }
}