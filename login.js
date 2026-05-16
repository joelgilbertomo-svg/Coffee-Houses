document.getElementById('loginForm').addEventListener('submit', function(e) {
     e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
            
    console.log("Intentando iniciar sesión con:", email);

    alert("¡Inicio de sesión enviado!");
});