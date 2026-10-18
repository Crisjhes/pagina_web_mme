
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
