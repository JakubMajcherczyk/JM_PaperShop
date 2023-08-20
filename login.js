const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const remember = document.querySelector("#rememberCheckbox");

const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

const main = document.querySelector("main");
const popup = document.querySelector("#popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateLogin()) {
    const data = {
      email: email.value,
      password: password.value,
    };
    login(data);
    console.log("Zalogowano");
  } else {
    console.log("Nie udało się zalogować - podano nieprawidłowe dane");
  }
});

function validateLogin() {
  let isValid = true;

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

  if (isValid) {
    // Login form
    console.log("Successfull login!");
    return true;
  }
}

async function login(data) {
  try {
    const response = await fetch(`${BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.message == "Unauthorized") {
      createNotification("error", "Logowanie nie udane!");
    } else {
      createNotification("success", "Logowanie udane!", result);
    }
  } catch (error) {
    console.log("Coś poszło nie tak!");
    console.error("error", error);
  }
}

// Funkcja dla notyfikacji
function createNotification(type, message, result) {
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
      localStorage.setItem("access_token", result.access_token);
      setTimeout(() => {
        main.classList.remove("blur");
        popup.classList.remove("showPopup");
        if (remember.checked) {
          localStorage.setItem("remember_user", 1);
        } else {
          localStorage.setItem("remember_user", 0);
        }
        // console.log("Login success");

        window.location.href = "profile.html";
      }, 1500);
    }
  }, 1500);
}
