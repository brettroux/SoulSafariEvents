if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

const interestForm = document.getElementById("interestForm");
const formMessage = document.getElementById("formMessage");

if (interestForm && formMessage) {
  interestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Connect this form in Wix Forms before publishing.";
  });
}
