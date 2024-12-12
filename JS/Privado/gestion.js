document.addEventListener("DOMContentLoaded", function () {
    const gestionTableBody = document.querySelector("#gestionTable tbody");
  
    // Función para cargar contrataciones desde localStorage
    function cargarContrataciones() {
      const contrataciones = JSON.parse(localStorage.getItem("contrataciones")) || [];
      gestionTableBody.innerHTML = ""; // Limpiar la tabla antes de agregar filas
  
      contrataciones.forEach((contratacion, index) => {
        const fila = document.createElement("tr");
  
        fila.innerHTML = `
          <td>${contratacion.nombre}</td>
          <td>${contratacion.apellidos}</td>
          <td>${contratacion.email}</td>
          <td>${contratacion.telefono}</td>
          <td>${contratacion.tipoEvento}${contratacion.otroEvento ? ` (${contratacion.otroEvento})` : ""}</td>
          <td>${contratacion.lugar}</td>
          <td>${contratacion.fecha}</td>
          <td>
            <button class="btn btn-success btn-sm aceptar">Aceptar</button>
            <button class="btn btn-danger btn-sm eliminar">Eliminar</button>
          </td>
        `;
  
        // Botón Aceptar
        fila.querySelector(".aceptar").addEventListener("click", () => aceptarContratacion(index));
        // Botón Eliminar
        fila.querySelector(".eliminar").addEventListener("click", () => eliminarContratacion(index));
  
        gestionTableBody.appendChild(fila);
      });
    }
  
    // Función para aceptar una contratación
    function aceptarContratacion(index) {
      const contrataciones = JSON.parse(localStorage.getItem("contrataciones")) || [];
      const trabajosAceptados = JSON.parse(localStorage.getItem("trabajosAceptados")) || [];
  
      const contratacion = contrataciones.splice(index, 1)[0]; // Eliminar del array de contrataciones
      trabajosAceptados.push(contratacion); // Agregar a trabajos aceptados
  
      // Guardar cambios en localStorage
      localStorage.setItem("contrataciones", JSON.stringify(contrataciones));
      localStorage.setItem("trabajosAceptados", JSON.stringify(trabajosAceptados));
  
      cargarContrataciones(); // Recargar tabla
      alert("Contratación aceptada.");
    }
  
    // Función para eliminar una contratación
    function eliminarContratacion(index) {
      const contrataciones = JSON.parse(localStorage.getItem("contrataciones")) || [];
      contrataciones.splice(index, 1); // Eliminar del array
  
      // Guardar cambios en localStorage
      localStorage.setItem("contrataciones", JSON.stringify(contrataciones));
  
      cargarContrataciones(); // Recargar tabla
      alert("Contratación eliminada.");
    }
  
    cargarContrataciones(); // Cargar las contrataciones al iniciar
  });
  