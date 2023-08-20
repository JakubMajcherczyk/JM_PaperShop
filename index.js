const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const form = document.querySelector("#form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const terms = document.querySelector("#terms");

const firstNameError = document.querySelector("#firstNameError");
const lastNameError = document.querySelector("#lastNameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const termsError = document.querySelector("#termsError");

const firstNameRegex = /^[A-Z][a-z]{1,19}$/;
const lastNameRegex = /^[A-Z][a-z]{1,29}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

const main = document.querySelector("main");
const popup = document.querySelector("#popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateRegister()) {
    const data = {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
    };
    register(data);
    localStorage.setItem("registered_email", email.value);
  } else {
    console.log("Rejestracja błędna - błąd walidacji");
  }
});

function validateRegister() {
  let isValid = true;
  // Validate first name
  if (!firstNameRegex.test(firstName.value)) {
    firstName.classList.add("error");
    firstNameError.classList.add("visible");
    isValid = false;
  } else {
    firstName.classList.remove("error");
    firstNameError.classList.remove("visible");
  }
  // Validate last name
  if (!lastNameRegex.test(lastName.value)) {
    lastName.classList.add("error");
    lastNameError.classList.add("visible");
    isValid = false;
  } else {
    lastName.classList.remove("error");
    lastNameError.classList.remove("visible");
  }
  // Validate email
  if (!emailRegex.test(email.value)) {
    email.classList.add("error");
    emailError.classList.add("visible");
    isValid = false;
  } else {
    email.classList.remove("error");
    emailError.classList.remove("visible");
  }
  // Validate password
  if (!passwordRegex.test(password.value)) {
    password.classList.add("error");
    passwordError.classList.add("visible");
    isValid = false;
  } else {
    password.classList.remove("error");
    passwordError.classList.remove("visible");
  }
  // Validate terms
  if (!terms.checked) {
    terms.classList.add("error");
    termsError.classList.add("visible");
    isValid = false;
  } else {
    terms.classList.remove("error");
    termsError.classList.remove("visible");
  }

  if (isValid) {
    // Submit form
    console.log("Formularz wypełniony poprawnie!");
    return true;
  }
}

async function register(data) {
  try {
    const response = await fetch(`${BASE_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      //response.ok też ale mamy wskazane dokładnie odpowiedzi 200
      // Registration successful
      console.log("Registration successful!");
      const result = await response.json();
      console.log(result);
      createNotification("success", "Rejestracja udana!");
      // window.location.href = "confirm.html";
    } else if (response.status === 403) {
      console.log("Podany adres e-mail już istnieje w naszej bazie, podaj inny.");
      createNotification("error", "Podany adres e-mail już istnieje w naszej bazie, podaj inny.");
    }
  } catch (error) {
    console.log("Coś poszło nie tak!");
    console.error("error", error);
  }
}

// Funkcja dla notyfikacji
function createNotification(type, message) {
  // Utwórz element powiadomienia
  const notification = document.createElement("div");
  notification.classList.add("notification", type);

  // Utwórz element ikony
  const icon = document.createElement("span");
  icon.classList.add("notification-icon");
  icon.textContent = type === "success" ? "✔️" : "❌";
  notification.appendChild(icon);

  // Utwórz element wiadomości
  const text = document.createTextNode(message);
  notification.appendChild(text);

  // Dołącz powiadomienie do kontenera
  const container = document.getElementById("notification-container");
  container.appendChild(notification);

  //Usuń powiadomienie po jakimś czasie
  setTimeout(() => {
    container.removeChild(notification);
    if (type === "success") {
      main.classList.add("blur");
      popup.classList.add("showPopup");
      setTimeout(() => {
        main.classList.remove("blur");
        popup.classList.remove("showPopup");
        window.location.href = "confirm.html";
      }, 1500);
    }
  }, 1500);
}
