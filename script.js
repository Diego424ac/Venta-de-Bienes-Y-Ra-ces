let currentLevel = 1;
let playerTokens = 100; // Tokens iniciales
let housesOwned = 0;
let housesToBuy = 3; // Cantidad de casas que se deben comprar para avanzar al siguiente nivel

// Funciones de autenticación (registro e inicio de sesión)
function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (username && password) {
        // Guardar usuario y contraseña en el localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        alert("¡Registro exitoso! Ahora puedes comprar tokens.");

        // Ocultar formulario de registro y mostrar formulario de compra de tokens
        document.getElementById("register-container").classList.add("hidden");
        document.getElementById("buy-tokens-container").classList.remove("hidden");
    } else {
        alert("Por favor ingresa un nombre de usuario y una contraseña.");
    }
}

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (username === savedUsername && password === savedPassword) {
        // Iniciar sesión
        alert("¡Bienvenido de nuevo, " + username + "!");
        startGame();
    } else {
        alert("Nombre de usuario o contraseña incorrectos.");
    }
}

// Comprar Tokens
function buyTokens() {
    const tokens = parseInt(document.getElementById("tokens-to-buy").value);

    if (tokens && tokens > 0) {
        playerTokens += tokens;
        document.getElementById("player-tokens").innerText = playerTokens;

        alert(`¡Has comprado ${tokens} tokens!`);
        
        // Esconde la compra de tokens y muestra el inicio del juego
        document.getElementById("buy-tokens-container").classList.add("hidden");

        // Reiniciar el nivel a 1 y comenzar el juego desde el principio
        currentLevel = 1;
        housesOwned = 0;
        housesToBuy = 3; // 3 casas para avanzar de nivel
        document.getElementById("level").innerText = currentLevel;

        startGame();  // Inicia el juego desde el nivel 1
    } else {
        alert("Por favor ingresa una cantidad de tokens válida.");
    }
}

// Iniciar el juego
function startGame() {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");

    displayHouses(); // Mostrar las casas
}

// Funciones de juego (como antes)
const houses = [
    {
        image: "https://img.freepik.com/foto-gratis/diseno-renderizado-3d-casa_23-2150505820.jpg",
        price: 50,
        name: "Casa 1"
    },
    {
        image: "https://img.freepik.com/free-photo/house-3d-rendering-design_23-2150505826.jpg",
        price: 100,
        name: "Casa 2"
    },
    {
        image: "https://img.freepik.com/psd-gratis/ilustracion-casa-propiedad-3d_23-2151682306.jpg?semt=ais_hybrid",
        price: 150,
        name: "Casa 3"
    },
    {
        image: "https://img.freepik.com/foto-grizado/diseno-renderizado-3d-casa_23-2150505837.jpg?semt=ais_hybrid",
        price: 200,
        name: "Casa 4"
    }
];

// Función para mostrar las casas en cada nivel
function displayHouses() {
    const houseList = document.getElementById("house-list");
    houseList.innerHTML = '';
    houses.forEach((house, index) => {
        const houseCard = document.createElement("div");
        houseCard.classList.add("house-card");
        houseCard.innerHTML = `
            <img src="${house.image}" alt="${house.name}">
            <h4>${house.name}</h4>
            <p>Precio: ${house.price} Tokens</p>
            <button onclick="buyHouse(${index})">Comprar</button>
        `;
        houseList.appendChild(houseCard);
    });

    // Mostrar opción de recarga en el nivel 5
    if (currentLevel === 5) {
        document.getElementById("reload-500-tokens").classList.remove("hidden");
    } else {
        document.getElementById("reload-500-tokens").classList.add("hidden");
    }
}

// Función para comprar una casa
function buyHouse(index) {
    const house = houses[index];

    if (playerTokens >= house.price) {
        playerTokens -= house.price;
        housesOwned++;

        document.getElementById("result-message").innerHTML = `¡Has comprado ${house.name}!`;
        document.getElementById("player-tokens").innerText = playerTokens;

        updatePlayerHouses();

        // Si se compran suficientes casas (3 casas por nivel)
        if (housesOwned >= housesToBuy) {
            // Bonificación de 200 tokens al pasar de nivel
            playerTokens += 200;
            document.getElementById("player-tokens").innerText = playerTokens;
            alert("¡Has recibido una bonificación de 200 tokens!");

            // Avanzar al siguiente nivel
            if (currentLevel < 10) {
                currentLevel++;
                housesOwned = 0; // Reinicia las casas compradas
                document.getElementById("level").innerText = currentLevel;
                displayHouses(); // Mostrar las casas del nuevo nivel
            } else {
                endGame(); // Si llegamos al nivel 10, finalizar el juego
            }
        }
    } else {
        document.getElementById("result-message").innerHTML = "¡No tienes suficientes tokens!";
        document.getElementById("buy-tokens-container").classList.remove("hidden"); // Mostrar la opción para comprar más tokens
    }
}

// Función para recargar 500 tokens en el nivel 5
function reload500Tokens() {
    if (playerTokens >= 500) {
        playerTokens -= 500;
        document.getElementById("player-tokens").innerText = playerTokens;
        alert("¡Has recargado 500 tokens!");

        // Continuar con el juego
        currentLevel++;
        housesOwned = 0;
        housesToBuy = 3; // Reiniciar las casas a comprar
        document.getElementById("level").innerText = currentLevel;
        displayHouses(); // Mostrar las casas del nuevo nivel
    } else {
        alert("No tienes suficientes tokens para recargar 500 tokens.");
    }
}

// Función para actualizar las casas compradas
function updatePlayerHouses() {
    const houseOwnershipList = document.getElementById("house-ownership-list");
    houseOwnershipList.innerHTML = '';
    for (let i = 0; i < housesOwned; i++) {
        const listItem = document.createElement("li");
        listItem.innerText = houses[i].name;
        houseOwnershipList.appendChild(listItem);
    }
}

// Finalizar el juego
function endGame() {
    document.getElementById("game-container").classList.add("hidden");
    document.getElementById("game-end-container").classList.remove("hidden");
}

// Redirigir a la página de recarga de tokens
function redirectToForm() {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSdQ0FlhzdOhS1fPXSQiyoATjdLcBQDD0AETkxKBoaoC_cKAkA/viewform?usp=sharing", "_blank");
}

// Recargar tokens si se quedan sin ellos
function reloadTokens() {
    alert("Por favor, realiza una recarga a través del formulario.");
    redirectToForm();
}
