document.addEventListener("DOMContentLoaded", () => {
    mostrarFavoritos();
});

function mostrarFavoritos() {
    const contenedor = document.getElementById("lista-favoritos");
    const favoritos = JSON.parse(localStorage.getItem("misPeliculas")) || [];

    if (favoritos.length === 0) {
        contenedor.innerHTML = "<p style='color: white; text-align: center; width: 100%; grid-column: 1/-1;'>Aún no tienes películas guardadas en tu lista.</p>";
        return;
    }

    contenedor.innerHTML = "";

    favoritos.forEach(movie => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("movie-card");

        tarjeta.innerHTML = `
            <img src="${movie.poster}" alt="${movie.titulo}">
            <h3>${movie.titulo}</h3>
            <p>${movie.año}</p>
            <button class="btn-eliminar" onclick="eliminarDeFavoritos('${movie.id}')" style="background-color: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                ❌ Eliminar
            </button>
        `;
        contenedor.appendChild(tarjeta);
    });
}

window.eliminarDeFavoritos = function(id) {
    let favoritos = JSON.parse(localStorage.getItem("misPeliculas")) || [];
    
    favoritos = favoritos.filter(movie => movie.id !== id);
    
    localStorage.setItem("misPeliculas", JSON.stringify(favoritos));
    mostrarFavoritos();
};