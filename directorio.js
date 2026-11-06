
/* DIRECTORIO DE ASESORES - GESTIÓN 2026 */

/*
  Datos transcritos de la nómina de asesores.
  Las comisiones con diferencias de nombres
  se identifican como pendientes de verificar.
*/

const asesores = [
  {
    curso: "1ro A",
    docentes: [
      ["Nila Choquemisa Pomacahua", "Técnico Pedagógica"],
      ["Jhaneth Espejo Choque", "Técnico Pedagógica"]
    ]
  },
  {
    curso: "1ro B",
    docentes: [
      ["William Mamani Quispe", "Técnico Pedagógica (verificar nombre)"]
    ]
  },
  {
    curso: "1ro C",
    docentes: [
      ["Pablo Miguel Limachi Killa", "Convivencia - Sociocultural"]
    ]
  },
  {
    curso: "2do A",
    docentes: [
      ["Sofia Quispe Suxo", "Infraestructura"]
    ]
  },
  {
    curso: "2do B",
    docentes: [
      ["Raquel I Quispe Murga", "Disciplinaria (verificar nombre)"]
    ]
  },
  {
    curso: "2do C",
    docentes: [
      ["Olga Coaquira Rodriguez", "Disciplinaria"],
      ["Kevin Marquez Monasterio", "Sin comisión identificada"]
    ]
  },
  {
    curso: "2do D",
    docentes: [
      ["Juana Ventura Caceres", "Salud y Deportes"]
    ]
  },
  {
    curso: "3ro A",
    docentes: [
      ["Beatriz Caparicona Calsina", "Convivencia (verificar nombre)"]
    ]
  },
  {
    curso: "3ro B",
    docentes: [
      ["Kevin Marquez Monasterio (apoyo)", "Sin comisión identificada"],
      ["Mariana Medrano Atarde", "Salud y Deportes (verificar nombre)"]
    ]
  },
  {
    curso: "3ro C",
    docentes: [
      ["Ruddy Arteaga Ajnota", "Técnico Pedagógica"]
    ]
  },
  {
    curso: "4to A",
    docentes: [
      ["Ruben Chavez Tarqui", "Salud y Deportes"],
      ["Ronny Atahuachi Antonio", "Infraestructura"]
    ]
  },
  {
    curso: "4to B",
    docentes: [
      ["Elena Plata Plata", "Disciplinaria"],
      ["Miguel Espejo Aliaga", "Técnico Pedagógica"]
    ]
  },
  {
    curso: "4to C",
    docentes: [
      ["Erika Catacora Cerdano", "Técnico Pedagógica"],
      ["Bridy Kuno Quispe", "Salud y Deportes"]
    ]
  },
  {
    curso: "5to A",
    docentes: [
      ["Lola Duran Peñaloza", "Convivencia - Sociocultural"]
    ]
  },
  {
    curso: "5to B",
    docentes: [
      ["Isaias Mamani Quispe", "Salud y Deportes"],
      ["Marco Antonio Villca Chura", "Disciplinaria"]
    ]
  },
  {
    curso: "5to C",
    docentes: [
      ["Abigail Vargas Perez", "Disciplinaria"],
      ["Danae Huanca Calle", "Técnico Pedagógica"]
    ]
  },
  {
    curso: "6to A",
    docentes: [
      ["Josue Callejas Mullisaca", "Convivencia - Sociocultural"],
      ["Max Pastran Jamachi", "Infraestructura"]
    ]
  },
  {
    curso: "6to B",
    docentes: [
      ["Juan Carlos Flores Chipana", "Disciplinaria"]
    ]
  },
  {
    curso: "6to C",
    docentes: [
      ["Boris Mamani Callisaya", "Salud y Deportes"]
    ]
  }
];

/* NORMALIZAR TEXTO PARA BÚSQUEDAS */

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

/* GENERAR TABLA */


/* DIRECTORIO CON BUSCADOR Y PAGINACIÓN */

document.addEventListener("DOMContentLoaded", function () {

    const tabla = document.getElementById("tablaDocentes");
    const buscador = document.getElementById("buscarDocente");
    const aviso = document.getElementById("sinDocentes");

    const anterior = document.getElementById("paginaAnterior");
    const siguiente = document.getElementById("paginaSiguiente");
    const info = document.getElementById("infoPagina");

    if (!tabla || !buscador || !aviso ||
        !anterior || !siguiente || !info) {
        return;
    }

    // Cantidad de cursos visibles
    const registrosPorPagina = 5;

    // Página actual
    let paginaActual = 1;

    function mostrarDocentes() {

        const busqueda = normalizarTexto(buscador.value);

        // Filtrar los registros
        const resultados = asesores.filter(function (registro) {

            const texto = normalizarTexto(
                registro.curso + " " +
                registro.docentes.flat().join(" ")
            );

            return texto.includes(busqueda);
        });

        // Calcular páginas
        const totalPaginas = Math.max(
            1,
            Math.ceil(resultados.length / registrosPorPagina)
        );

        if (paginaActual > totalPaginas) {
            paginaActual = totalPaginas;
        }

        // Obtener los registros de esta página
        const inicio = (paginaActual - 1) * registrosPorPagina;
        const fin = inicio + registrosPorPagina;

        const registrosVisibles = resultados.slice(inicio, fin);

        tabla.replaceChildren();

        registrosVisibles.forEach(function (registro) {

            const fila = document.createElement("tr");

            const curso = document.createElement("td");
            curso.textContent = registro.curso;

            const nombres = document.createElement("td");
            const comisiones = document.createElement("td");

            registro.docentes.forEach(function (docente) {

                const nombre = document.createElement("span");
                nombre.textContent = docente[0];
                nombres.appendChild(nombre);

                const comision = document.createElement("span");
                comision.textContent = docente[1];
                comisiones.appendChild(comision);

            });

            fila.append(curso, nombres, comisiones);
            tabla.appendChild(fila);

        });

        // Información de página
        info.textContent =
            "Página " + paginaActual + " de " + totalPaginas;

        // Activar o desactivar las flechas
        anterior.disabled = paginaActual === 1;

        siguiente.disabled = paginaActual === totalPaginas;

        // Aviso cuando no hay resultados
        aviso.hidden = resultados.length > 0;
    }

    // Buscar
    buscador.addEventListener("input", function () {
        paginaActual = 1;
        mostrarDocentes();
    });

    // Página anterior
    anterior.addEventListener("click", function () {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarDocentes();
        }
    });

    // Página siguiente
    siguiente.addEventListener("click", function () {
        paginaActual++;
        mostrarDocentes();
    });

    // Carga inicial
    mostrarDocentes();

});


/* MENÚ RESPONSIVE */

document.addEventListener("DOMContentLoaded", function () {

    const boton = document.getElementById("botonMenu");
    const enlaces = document.getElementById("enlacesMenu");

    if (!boton || !enlaces) return;

    function cerrarMenu() {
        enlaces.classList.remove("abierto");

        boton.setAttribute("aria-expanded", "false");
        boton.setAttribute(
            "aria-label",
            "Abrir menú de navegación"
        );

        boton.innerHTML = "&#9776;";
    }

    boton.addEventListener("click", function () {

        const abierto = enlaces.classList.toggle("abierto");

        boton.setAttribute("aria-expanded", String(abierto));

        boton.setAttribute(
            "aria-label",
            abierto
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
        );

        boton.innerHTML = abierto ? "&times;" : "&#9776;";

    });

    // Cerrar al seleccionar una sección
    enlaces.querySelectorAll("a").forEach(function (enlace) {

        enlace.addEventListener("click", cerrarMenu);

    });

    // Cerrar con Escape
    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {
            cerrarMenu();
        }

    });

    // Cerrar cuando la pantalla vuelve al tamaño de PC
    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {
            cerrarMenu();
        }

    });

});
