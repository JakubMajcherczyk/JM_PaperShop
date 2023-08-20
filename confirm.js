const subtitle = document.querySelector(".subtitle");
const submit = document.querySelector(".submit");
//localStorage.setItem("registered_email", email.value); - pobieramy to z index.js
const email = localStorage.getItem("registered_email");

const sendEmail = () => {
  if (!email) {
    return;
  } else {
    subtitle.innerHTML = `Wysłaliśmy właśnie do Ciebie link na adres: ${email}. 
    Otwórz link, by móc dokończyć rejestrację i dokonać logowania.`;
  }
};
sendEmail();
submit.addEventListener("click", () => {
  localStorage.removeItem("registered_email");
});

//wyczyszczenie localStorage podczas wyłączenia przeglądarki
window.addEventListener("beforeunload", (e) => {
  localStorage.removeItem("registered_email");
});
