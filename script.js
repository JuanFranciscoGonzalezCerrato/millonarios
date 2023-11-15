const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Vector para almacenar los usuarios
let userList = [];

// Función que obtiene de la API un nombre aleatorio,
// genera una cantidad de dinero aleatoria cuyo máximo es 1.000.000
// y añade al usuario con ambos datos
async function getRandomUser() {
	let res = await fetch('https://randomuser.me/api');
	let data = await res.json();
	let user = data.results[0];
	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	};

	// Añadir el nuevo usuario al listado
	addData(newUser);
}
// Función para obtener los datos del LocalStorage al cargar la página
function getDataFromLocalStorage() {
    // Obtener los usuarios del LocalStorage
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
        if (key.startsWith('user_')) {
            const user = JSON.parse(localStorage.getItem(key));
            userList.push(user);
        }
    });

    // Obtener el total de la riqueza del LocalStorage
    const totalWealth = JSON.parse(localStorage.getItem('total_wealth'));

    // Mostrar los usuarios y el total de la riqueza en el DOM
    updateDOM();
    showTotalWealth(totalWealth);
}

// Función para mostrar el total de la riqueza en el DOM
function showTotalWealth(totalWealth) {
    if (totalWealth) {
        if (!wealthElement) {
            wealthElement = document.createElement('div');
            wealthElement.innerHTML = `<h3>Total de riqueza: <strong>${formatMoney(totalWealth)}</strong></h3>`;
            main.appendChild(wealthElement);
        } else {
            wealthElement.innerHTML = `<h3>Total de riqueza: <strong>${formatMoney(totalWealth)}</strong></h3>`;
        }
    }
}

// Obtener los datos del LocalStorage al cargar la página
getDataFromLocalStorage();
// TODO: Función que añade un nuevo usuario (objeto) al listado de usuarios (array)
function addData(obj) {
	userList.push(obj);
	updateDOM();
}

// TODO: Función que dobla el dinero de todos los usuarios existentes
function doubleMoney() {
	// Utiliza map() para duplicar el dinero
	userList = userList.map(user => {
		return { ...user, money: user.money * 2 };
	});

	updateDOM();
}

// TODO: Función que ordena a los usuarios por la cantidad de dinero que tienen
function sortByRichest() {
	// Utiliza sort() para ordenar por riqueza
	userList.sort((a, b) => b.money - a.money);
	updateDOM();
}

// TODO: Función que muestra únicamente a los usuarios millonarios (tienen más de 1.000.000)
function showMillionaires() {
	userList = userList.filter(user => user.money >= 1000000);
	updateDOM();
}
function saveToLocalStorage() {
	userList.forEach((user, index) => {
		const key = `user_${index}`;
		localStorage.setItem(key, JSON.stringify(user));
	});
}

function addData(obj) {
	userList.push(obj);
	saveToLocalStorage();
	updateDOM();
}

function doubleMoney() {
	userList = userList.map(user => {
		return { ...user, money: user.money * 2 };
	});
	saveToLocalStorage();
	updateDOM();
}

function sortByRichest() {
	userList.sort((a, b) => b.money - a.money);
	saveToLocalStorage();
	updateDOM();
}

function showMillionaires() {
	userList = userList.filter(user => user.money >= 1000000);
	saveToLocalStorage();
	updateDOM();
}

// TODO: Función que calcula y muestra el dinero total de todos los usuarios

function calculateWealth() {
	const wealth = userList.reduce((total, user) => total + user.money, 0);

	
		wealthElement = document.createElement('div');
		wealthElement.innerHTML = `<h3>Total de riqueza: <strong>${formatMoney(wealth)}</strong></h3>`;
		main.appendChild(wealthElement);


	localStorage.setItem('total_wealth', JSON.stringify(wealth));
}



// TODO: Función que actualiza el DOM
function updateDOM() {
	// Limpia el contenido actual
	main.innerHTML = '<h2><strong>Persona</strong> Dinero</h2>';

	// Utiliza forEach() para actualizar el DOM con cada usuario y su dinero
	userList.forEach(user => {
		const userElement = document.createElement('div');
		userElement.classList.add('user');
		userElement.innerHTML = `<strong>${user.name} ${formatMoney(user.money)}</strong>`;
		main.appendChild(userElement);
	});
}

// Función que formatea un número a dinero
function formatMoney(number) {
	return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}

// Obtenemos un usuario al iniciar la app
getRandomUser();

// TODO: Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
