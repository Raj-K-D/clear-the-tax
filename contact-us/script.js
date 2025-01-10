// Close button functionality
const closeBtn = document.getElementById('closeBtn');
const contactForm = document.getElementById('contactForm');

closeBtn.addEventListener('click', () => {
  contactForm.style.display = 'none';
});

// Form submission functionality
const form = document.getElementById('contactFormElement');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent page reload

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (name && email && phone) {
    alert(`Thank you, ${name}! Your details have been submitted.`);
    form.reset(); // Clear the form fields
  } else {
    alert('Please fill out all the fields.');
  }
});
