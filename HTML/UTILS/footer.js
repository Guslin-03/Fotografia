document.addEventListener("DOMContentLoaded", function () {
  // Cargar el footer
  fetch("../UTILS/footer.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
      initializeAuthButton(); // Inicializar botón de autenticación tras cargar el footer
    })
    .catch((error) => console.error("Error al cargar el footer:", error));

  const loginForm = document.getElementById("loginForm");
  const passwordInput = document.getElementById("password");

  // Función para verificar si el usuario está autenticado
  function isAuthenticated() {
    return localStorage.getItem("accesoAutorizado") === "true";
  }

  // Función para manejar el botón de autenticación
  function initializeAuthButton() {
    const authButton = document.getElementById("authButton");

    if (isAuthenticated()) {
      authButton.textContent = "Logout";
      authButton.removeAttribute("data-bs-toggle");
      authButton.removeAttribute("data-bs-target");
      authButton.addEventListener("click", logout); // Asignar función de logout
    } else {
      authButton.textContent = "Login";
      authButton.setAttribute("data-bs-toggle", "modal");
      authButton.setAttribute("data-bs-target", "#loginModal");
      authButton.removeEventListener("click", logout); // Eliminar función de logout
    }
  }

  // Función para cerrar sesión
  function logout() {
    localStorage.removeItem("accesoAutorizado"); // Eliminar la autenticación
    alert("Has cerrado sesión.");
    initializeAuthButton(); // Actualizar el botón
    window.location.href = "../Publico/index.html"; // Redirigir al inicio
  }

  // Manejar el evento de login
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const password = passwordInput.value;

    if (password === "enEsteRetoYoLoPeto") {
      alert("Login exitoso.");
      localStorage.setItem("accesoAutorizado", "true"); // Guardar estado autenticado

      const modal = new bootstrap.Modal(document.getElementById("loginModal"));
      modal.hide(); // Cerrar el modal de login
      window.location.href = "../Privado/dashboard.html"; // Redirigir al área privada
    } else {
      alert("Contraseña incorrecta");
    }
  });
});
