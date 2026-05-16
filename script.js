const API_KEY = "ad6e68c0";
const buscarBtn = document.getElementById("buscarBtn");
const buscarinput = document.getElementById("buscarinput");
const seccionResultados = document.getElementById("seccion-resultados");

async function cargarPeliculas(nombre, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "<p>Cargando...</p>";

    let peliculasHTML = "";
    const promesas = [];

    for (let pagina = 1; pagina <= 5; pagina++) {
        const url = `https://www.omdbapi.com/?s=${nombre}&page=${pagina}&apikey=${API_KEY}`;
        promesas.push(fetch(url).then(response => response.json()));
    }

    try {
        const resultados = await Promise.all(promesas);

        resultados.forEach(data => {
            if (data.Search) {
                data.Search.forEach(movie => {
                    const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/220x320?text=No+Image";
                    
                    const tituloEscapado = encodeURIComponent(movie.Title);

                    peliculasHTML += `
                        <div class="movie-card">
                            <img src="${poster}" alt="${movie.Title}">
                            <h3>${movie.Title}</h3>
                            <p>${movie.Year}</p>
                            <button class="btn-favorito" onclick="guardarEnFavoritos('${movie.imdbID}', '${tituloEscapado}', '${movie.Year}', '${poster}')">
                                Guardar
                            </button>
                        </div>
                    `;
                });
            }
        });

        if (peliculasHTML !== "") {
            contenedor.innerHTML = peliculasHTML;
        } else {
            contenedor.innerHTML = "<p>No se encontraron resultados para tu búsqueda.</p>";
        }

    } catch (error) {
        console.error("Error al cargar películas:", error);
        contenedor.innerHTML = "<p>Error al cargar películas. Inténtalo de nuevo.</p>";
    }
}

window.guardarEnFavoritos = function(id, tituloCodificado, año, poster) {
    const titulo = decodeURIComponent(tituloCodificado);
    
    let favoritos = JSON.parse(localStorage.getItem("misPeliculas")) || [];

    const yaExiste = favoritos.some(pelicula => pelicula.id === id);

    if (yaExiste) {
        alert(`"${titulo}" ya está en tu lista de favoritos.`);
        return;
    }

    const nuevaPelicula = { id, titulo, año, poster };
    favoritos.push(nuevaPelicula);
    
    localStorage.setItem("misPeliculas", JSON.stringify(favoritos));
    alert(`"${titulo}" se ha guardado en tus favoritos.`);
}

function ejecutarBusqueda() {
    const movieName = buscarinput.value.trim();
    if (movieName) {
        seccionResultados.style.display = "block"; 
        cargarPeliculas(movieName, "resultados");
        seccionResultados.scrollIntoView({ behavior: 'smooth' });
    }
}

buscarBtn.addEventListener("click", ejecutarBusqueda);

buscarinput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        ejecutarBusqueda();
    }
});

cargarPeliculas("action", "accion");
cargarPeliculas("comedy", "comedia");
cargarPeliculas("horror", "terror");
cargarPeliculas("series", "series");