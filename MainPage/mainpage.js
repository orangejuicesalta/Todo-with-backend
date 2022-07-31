document.addEventListener("DOMContentLoaded", getTasksFromServer);

function signOut() {
  document.querySelector(".modal-exit").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
  document.getElementById("logout").addEventListener("click", function () {
    localStorage.clear();
    sessionStorage.clear();
    location.replace(`${mainUrl}/Authorization/index.html`);
    return;
  });

  document
    .getElementById("cancel-logout")
    .addEventListener("click", function () {
      document.querySelector(".modal-exit").classList.add("hidden");
      document.querySelector(".overlay").classList.add("hidden");
      return "Canceled logout";
    });
}
