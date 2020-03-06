const form = document.querySelector('.form-signin');
form.addEventListener('submit', handleLoginSubmit);

function handleLoginSubmit(event) {
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
          Please enter your ${input.email}
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
      userData[input.name] = input.value;
    }
  });

  if (formIsValid) {
    console.log('Submitting User Data ---->', userData)
    fetch('/api/login', {
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
          localStorage.setItem('currentUser', JSON.stringify(data.currentUser));
          window.location = '/';
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
}