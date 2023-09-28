const modalBlock = document.querySelector('#weather')
const weatherBlock = document.querySelector('#viget')
const gismeteo = 'https://www.gismeteo.ru/weather-timiryazevo-133937/month/'

let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
let date = new Date()
let today = date.getDate() + ' ' + months[date.getMonth()]

const openWeather = document.querySelector('.weather-button')
openWeather.addEventListener('click', function(){
	modalBlock.classList.add('open')
})

function closeModal(){
	modalBlock.classList.remove('open')
}

const closeX = document.querySelector('.close-viget')
closeX.addEventListener('click', closeModal)

modalBlock.addEventListener("click", function (e) {
	if (!e.target.closest('.viget')){
		closeModal()
	}
})

async function loadWeather() {
	weatherBlock.innerHTML = '<div class="loading"> <img src="img/load.gif" alt="Loading..."></div>';

	const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Gorokhovets&appid=5c2ab0f2e6c2ad23c076711877a90062'

	const response = await fetch(server, { method: 'GET' })

	const responserezult = await response.json()

	if (response.ok) {
		getWeather(responserezult)
	} else {
		weatherBlock.innerHTML = responserezult.message;
	}
}

function getWeather(data) {
	console.log(data);
	let location;
	if (data.name === 'Gorokhovets') {
		location = 'Гороховец';
	}
	else {
		location = data.name;
	}

	let temp = Math.round(data.main.temp)
	let weath = data.weather[0].main
	let weatherIcon = data.weather[0].icon

	const template = `
		<div class="city"><span>${location}</span><span class="weather__small"> ${today}</span></div>
		<div class="row">
			<div>${weath}</div>
			<img class="icon" src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="">
		</div>
		<div class="temper">${temp}</div>
		<div id="giz" class="giz"><a href="${gismeteo}" target="_blank">Погода на даче на месяц</a></div>
	`
	weatherBlock.innerHTML = template;
}

if (weatherBlock) {
	loadWeather()
}