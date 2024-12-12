document.addEventListener("DOMContentLoaded", function () {
  // Cargar trabajos desde localStorage
  const trabajosAceptados = JSON.parse(localStorage.getItem("trabajosAceptados")) || [];
  const trabajosFinalizados = JSON.parse(localStorage.getItem("trabajosFinalizados")) || [];

  // Referencias a las tablas
  const trabajosAceptadosTable = document.getElementById("trabajosAceptados");
  const trabajosFinalizadosTable = document.getElementById("trabajosFinalizados");

  // Función para actualizar la tabla de trabajos aceptados
  function actualizarTrabajosAceptados() {
    trabajosAceptadosTable.innerHTML = ""; // Limpiar tabla

    trabajosAceptados.forEach((trabajo, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${trabajo.nombre} ${trabajo.apellidos}</td>
        <td>${trabajo.lugar}</td>
        <td>${trabajo.tipoEvento}</td>
        <td>${trabajo.fecha}</td>
        <td>
          <input type="checkbox" class="terminarTrabajo" data-index="${index}">
        </td>
      `;
      trabajosAceptadosTable.appendChild(row);
    });
  }

  // Función para actualizar la tabla de trabajos finalizados
  function actualizarTrabajosFinalizados() {
    trabajosFinalizadosTable.innerHTML = ""; // Limpiar tabla

    trabajosFinalizados.forEach((trabajo) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${trabajo.nombre}</td>
        <td>${trabajo.lugar}</td>
        <td>${trabajo.fecha}</td>
        <td>${trabajo.valoracion}</td>
      `;
      trabajosFinalizadosTable.appendChild(row);
    });
  }

  // Manejar el checkbox para marcar un trabajo como terminado
  trabajosAceptadosTable.addEventListener("change", function (e) {
    if (e.target.classList.contains("terminarTrabajo")) {
      const index = e.target.dataset.index;
      const trabajo = trabajosAceptados[index];

      // Mostrar diálogo para valoración
      const valoracion = prompt(
        "¿Cómo fue el trabajo? (Estupendo, Bien, Mal, Fatal)",
        "Estupendo"
      );

      if (valoracion) {
        // Mover trabajo a finalizados
        trabajosFinalizados.push({
          nombre: trabajo.nombre,
          lugar: trabajo.lugar,
          fecha: trabajo.fecha,
          valoracion: valoracion,
        });

        // Eliminar trabajo de aceptados
        trabajosAceptados.splice(index, 1);

        // Guardar en localStorage
        localStorage.setItem("trabajosAceptados", JSON.stringify(trabajosAceptados));
        localStorage.setItem("trabajosFinalizados", JSON.stringify(trabajosFinalizados));

        // Actualizar tablas con efecto de desvanecimiento
        e.target.closest("tr").classList.add("fade-out");
        setTimeout(() => {
          actualizarTrabajosAceptados();
          actualizarTrabajosFinalizados();
        }, 500);
      } else {
        // Si se cancela, desmarcar el checkbox
        e.target.checked = false;
      }
    }
  });

  // Inicializar tablas al cargar la página
  actualizarTrabajosAceptados();
  actualizarTrabajosFinalizados();
});
