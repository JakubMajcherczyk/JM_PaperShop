const access_token = localStorage.getItem("access_token");
const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const userContent = document.querySelector(".userContent");
const innerContent = document.querySelector("#innerContent");
const logoutButton = document.querySelector(".logout");

const loggedOut = true;

if (!access_token) {
  userContent.innerHTML = `<p style="font-weight: 700"> Coś poszło nie tak.</p> <p>Taki użytkownik nie istnieje, lub wystąpił błąd podczas logowania. Spróbuj ponownie później</p> <br/> <a style="font-weight: 500" href="login.html">Wróć do strony logowania</a>`; //prettier-ignore
} else {
  getUser();
}

async function getUser() {
  try {
    const response = await fetch(`${BASE_URL}profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`, //Tak jest w standardzie
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    result.forEach((item) => {
      innerContent.innerHTML += `<li>Cześć! ${item.firstName} ${item.lastName}</li>`;
    });
  } catch (error) {
    console.log("Coś poszło nie tak!");
    console.error("error", error);
  }
}

logoutButton.addEventListener("click", () => {
  logout();
});

function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("remember_user");
  window.location.href = "login.html"; //przenosi do logowania
}

const remember = Boolean(Number(localStorage.getItem("remember_user")));

window.addEventListener("beforeunload", function (event) {
  if (remember) {
    return;
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("remember_user");
  }
});
