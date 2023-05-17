// Target html elements

const submitBtn = document.querySelector(".btn");
const form = document.querySelector(".form");
const mailRegex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
const firstName = document.querySelector(".first-name");
const lastName = document.querySelector(".last-name");
const emailAddress = document.querySelector(".email-address");
const password = document.querySelector(".password");
const section = document.querySelector("section");

// show error function
function showErrorMessage(input, message) {
  userInput = input.parentElement;
  userInput.className = "input-control invalid";
  const errorMessage = userInput.querySelector("p");
  errorMessage.innerText = message;
}

// show success function
function showSuccess(input) {
  input.addEventListener("input", function () {
    userInput = input.parentElement;
    userInput.className = "input-control ";
  });
}
showSuccess(firstName);
showSuccess(lastName);
showSuccess(password);
showSuccess(emailAddress);

// validating email
function validateEmail(input) {
  input = emailAddress.nextElementSibling.nextElementSibling;
  if (!emailAddress.value.match(mailRegex) & (emailAddress.value !== "")) {
    emailAddress.parentElement.classList.add("invalid");
    input.innerText = "Looks like this is not an email";
  } else {
    emailAddress.parentElement.classList.remove("invalid");
  }
}
emailAddress.addEventListener("input", validateEmail);

// event listener for submission. One way to write this code
// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   if (firstName.value === "") {
//     showErrorMessage(firstName, "First Name is cannot be empty");
//   }
//   if (lastName.value === "") {
//     showErrorMessage(lastName, "Last Name is cannot be empty");
//   }
//   if (emailAddress.value === "") {
//     showErrorMessage(emailAddress, "Email cannot be empty");
//   }
//   if (password.value === "") {
//     showErrorMessage(password, "Password cannot be empty");
//   }
// });

// A more scalable code.
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value === "") {
      showErrorMessage(input, `${input.placeholder} cannot be empty`);
    }
  });
}

// check user input length function
function checkInputLength(input, min, max) {
  if (
    (input.value.length < min) & (input.value.length >= 1) ||
    input.value.length > max
  ) {
    showErrorMessage(
      input,
      `${input.placeholder} must be between ${min} to ${max} characters`
    );
  }
}

// checking if form is valid before submiting
function isFormValid(input) {
  let result = true;
  input.forEach(function (input) {
    if (input.parentElement.classList.contains("invalid")) {
      result = false;
    }
  });
  return result;
}

// event listener for submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([firstName, lastName, emailAddress, password]);
  checkInputLength(firstName, 2, 15);
  checkInputLength(lastName, 2, 15);
  checkInputLength(password, 7, 25);

  if (isFormValid([firstName, lastName, emailAddress, password]) == true) {
    section.classList.add("hide");
  } else {
    e.preventDefault();
  }
});
