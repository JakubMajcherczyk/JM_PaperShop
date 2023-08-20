const form = document.querySelector("#form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const main = document.querySelector("main");
const popup = document.querySelector("#popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateRecovery()) {
    loader(() => {
      createNotification("success", "Wysłano nowe hasło na podany adres e-mail.");
    });
  } else {
    createNotification("error", "Nie udało się przywrócić hasła - spróbuj ponownie.");
  }
});

function validateRecovery() {
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

  if (isValid) {
    // Submit form
    console.log("E-mail poprawny!");
    return true;
  }
}

function loader(callback) {
  main.classList.add("blur");
  popup.classList.add("showPopup");
  setTimeout(() => {
    main.classList.remove("blur");
    popup.classList.remove("showPopup");
    callback();
  }, 1500);
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
  }, 3000);
}
