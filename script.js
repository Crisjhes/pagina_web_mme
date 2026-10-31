
document.addEventListener("DOMContentLoaded", function () {

    const buscador = document.getElementById("buscarNoticia");
    const categoria = document.getElementById("categoriaNoticia");
    const noticias = document.querySelectorAll(".noticia");
    const sinResultados = document.getElementById("sinResultados");

    function filtrarNoticias() {
        const texto = buscador.value.toLowerCase().trim();
        const filtro = categoria.value;
        let encontrados = 0;

        noticias.forEach(function (noticia) {
            const contenido = noticia.textContent.toLowerCase();
            const tipo = noticia.dataset.categoria;

            const coincideTexto = contenido.includes(texto);
            const coincideCategoria =
                filtro === "todas" || tipo === filtro;

            if (coincideTexto && coincideCategoria) {
                noticia.style.display = "";
                encontrados++;
            } else {
                noticia.style.display = "none";
            }
        });

        sinResultados.hidden = encontrados !== 0;
    }

    buscador.addEventListener("input", filtrarNoticias);
    categoria.addEventListener("change", filtrarNoticias);

});

/* CONTROL DE HORARIOS */

document.addEventListener("DOMContentLoaded", function () {

    const botones = document.querySelectorAll(".boton-turno");
    const tablas = document.querySelectorAll(".tabla-horarios");

    botones.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const turnoSeleccionado = boton.dataset.turno;

            // Ocultar todas las tablas
            tablas.forEach(function (tabla) {
                tabla.hidden = true;
            });

            // Quitar selección anterior
            botones.forEach(function (elemento) {
                elemento.classList.remove("activo");
            });

            // Mostrar la tabla seleccionada
            const tablaSeleccionada =
                document.getElementById("turno-" + turnoSeleccionado);

            if (tablaSeleccionada) {
                tablaSeleccionada.hidden = false;
            }

            // Activar el botón seleccionado
            boton.classList.add("activo");

        });

    });

});

/* GALERÍA FOTOGRÁFICA */

document.addEventListener("DOMContentLoaded", function () {

    const filtros = document.querySelectorAll(".filtro-galeria");
    const fotos = document.querySelectorAll(".galeria-item");
    const aviso = document.getElementById("galeriaSinResultados");

    const visor = document.getElementById("visorGaleria");
    const imagenAmpliada = document.getElementById("imagenAmpliada");
    const descripcion = document.getElementById("descripcionImagen");
    const cerrar = document.getElementById("cerrarVisor");

    let botonAnterior = null;

    // FILTRAR FOTOGRAFÍAS
    filtros.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const categoria = boton.dataset.filtro;
            let cantidad = 0;

            fotos.forEach(function (foto) {

                const mostrar =
                    categoria === "todas" ||
                    foto.dataset.categoria === categoria;

                foto.hidden = !mostrar;

                if (mostrar) {
                    cantidad++;
                }

            });

            filtros.forEach(function (filtro) {
                filtro.classList.remove("activo");
            });

            boton.classList.add("activo");
            aviso.hidden = cantidad > 0;

        });

    });

    // ABRIR FOTOGRAFÍA
    fotos.forEach(function (foto) {

        const boton = foto.querySelector(".galeria-abrir");
        const imagen = foto.querySelector("img");
        const titulo = foto.querySelector("h3");

        boton.addEventListener("click", function () {

            botonAnterior = boton;

            imagenAmpliada.src = imagen.src;
            imagenAmpliada.alt = imagen.alt;
            descripcion.textContent = titulo.textContent;

            visor.hidden = false;
            document.body.classList.add("visor-abierto");
            cerrar.focus();

        });

    });

    // CERRAR FOTOGRAFÍA
    function cerrarGaleria() {
        visor.hidden = true;
        imagenAmpliada.removeAttribute("src");
        document.body.classList.remove("visor-abierto");

        if (botonAnterior) {
            botonAnterior.focus();
        }
    }

    cerrar.addEventListener("click", cerrarGaleria);

    visor.addEventListener("click", function (evento) {
        if (evento.target === visor) {
            cerrarGaleria();
        }
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && !visor.hidden) {
            cerrarGaleria();
        }
    });

});

/* NOTICIAS DESTACADAS */

document.addEventListener("DOMContentLoaded", function () {

    const contenedor = document.getElementById("listaDestacadas");

    const noticias = document.querySelectorAll(
        "#noticias .noticia[data-destacada='true']"
    );

    const mensaje = document.getElementById("mensajeDestacadas");

    if (!contenedor || !mensaje) {
        return;
    }

    noticias.forEach(function (noticia) {

        // Crear una copia de la tarjeta
        const copia = noticia.cloneNode(true);

        // Evitar repetir identificadores HTML
        copia.removeAttribute("id");

        // Agregar la tarjeta a noticias destacadas
        contenedor.appendChild(copia);

    });

    // Mostrar aviso si no hay noticias destacadas
    mensaje.hidden = noticias.length > 0;

});
