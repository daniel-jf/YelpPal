console.log('Register JS...');
const form = document.getElementById('signup');

/*
1 - Select the Form
2 - Listen for submit & prevent default
3 - Get form values
4 - Validate values
5 - Submit request if valid
6 - Redirect to Login on success
*/

// Submit Event Listener
form.addEventListener('click', handleSignupSubmit);

// Handle Submit
function handleSignupSubmit(event) {
  console.log('brrp')
  let formIsValid = true;
  const userData = {};
  event.preventDefault();
console.log("check");
  // Clear Alert Messages
  document.querySelectorAll('.invalid-feedback').forEach((alert) => alert.remove());
  
  const formInputs = Array.from(form.elements);
  console.log({formInputs})
  formInputs.forEach((input) => {
    input.classList.remove('is-invalid');
    if (input.type !== 'submit' && input.value === '') {
      formIsValid = false;
      // Add Red Border to Input
      input.classList.add('is-invalid');
      // Add Error Message Below Input
      input.insertAdjacentHTML('afterend', `
        <div class="invalid-feedback ${input.id}-message">
          Please enter your ${input.name}
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
      console.log({[input.name]:input.value})
      userData[input.name] = input.value;
    }
  });

  if (formIsValid) {
    // SUBMIT DATA TO SERVER
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
  }
}