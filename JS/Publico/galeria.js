let cropper;
const imagenPrincipal = document.getElementById("imagenPrincipal");
const botonConfirmar = document.getElementById("confirmarRecorte");
const contenedorMiniaturas = document.getElementById("miniaturas");
const botonCancelar = document.getElementById("cancelarRecorte");

imagenPrincipal.addEventListener("click", () => {
    if (!cropper) {
        // Activar la herramienta de recorte
        cropper = new Cropper(imagenPrincipal, {
            aspectRatio: 16 / 9,
            viewMode: 2,
            autoCropArea: 1,
            ready() {
                // Mostrar los botones de Confirmar y Cancelar al iniciar el recorte
                botonConfirmar.style.display = "inline-block";
                botonCancelar.style.display = "inline-block";
            }
        });
    }
});

botonConfirmar.addEventListener("click", () => {
    if (cropper) {
        const canvas = cropper.getCroppedCanvas();
        const nuevaImagenSrc = canvas.toDataURL("image/jpeg");

        // Crear una nueva miniatura
        const nuevaMiniatura = document.createElement("div");
        nuevaMiniatura.className = "col-4 col-md-2";
        nuevaMiniatura.innerHTML = `
            <img src="${nuevaImagenSrc}" alt="Nuevo Trabajo"
                class="img-thumbnail shadow-sm w-100" onclick="cambiarImagen(this.src)">
        `;
        contenedorMiniaturas.appendChild(nuevaMiniatura);

        cropper.destroy(); // Finalizar el recorte
        cropper = null;

        // Ocultar los botones
        botonConfirmar.style.display = "none";
        botonCancelar.style.display = "none";
    }
});

botonCancelar.addEventListener("click", () => {
    if (cropper) {
        cropper.destroy(); // Destruir la herramienta de recorte
        cropper = null;

        // Ocultar los botones
        botonConfirmar.style.display = "none";
        botonCancelar.style.display = "none";
    }
});

