document.addEventListener("DOMContentLoaded", () => {
  const tipoEvento = document.getElementById("tipoEvento");
  const eventoOtro = document.getElementById("eventoOtro");
  const pedidoForm = document.getElementById("pedidoForm");

  // Mostrar/ocultar el campo "otro evento"
  tipoEvento.addEventListener("change", () => {
    if (tipoEvento.value === "otro") {
      eventoOtro.classList.remove("d-none");
    } else {
      eventoOtro.classList.add("d-none");
    }
  });

  pedidoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (pedidoForm.checkValidity()) {
      const nuevaContratacion = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        tipoEvento: document.getElementById("tipoEvento").value,
        otroEvento: document.getElementById("otroEvento")?.value || "",
        lugar: document.getElementById("lugar").value,
        fecha: document.getElementById("fecha").value,
      };

      const contrataciones = JSON.parse(localStorage.getItem("contrataciones")) || [];
      contrataciones.push(nuevaContratacion); // Agregar al array

      localStorage.setItem("contrataciones", JSON.stringify(contrataciones)); // Guardar en localStorage

      alert("Solicitud enviada correctamente.");
      pedidoForm.reset();
      pedidoForm.classList.remove("was-validated");
    } else {
      pedidoForm.classList.add("was-validated");
    }
  });


  // Validación personalizada
  document.getElementById("nombre").addEventListener("input", (e) => {
    if (/\d/.test(e.target.value)) {
      e.target.setCustomValidity("El nombre no puede contener números.");
    } else {
      e.target.setCustomValidity("");
    }
  });

  document.getElementById("apellidos").addEventListener("input", (e) => {
    const value = e.target.value.trim();
    const isValid = /^[a-zA-Z\s]+$/.test(value) && value.split(/\s+/).length >= 2;
    e.target.setCustomValidity(isValid ? "" : "Introduce al menos dos palabras sin números.");
  });
});
