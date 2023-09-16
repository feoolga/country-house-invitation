const modalBlock = document.querySelector('#weather')
const weatherBlock = document.querySelector('#viget')
const gismeteo = 'https://www.gismeteo.ru/weather-timiryazevo-133937/month/'

let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
let date = new Date()
let today = date.getDate() + ' ' + months[date.getMonth()]

const openWeather = document.querySelector('.time__weather')
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
let preloader = document.querySelector('#preloader')
window.onload = function(){
    preloader.remove()
}

;(function() {

    let sectionParallax = document.querySelector('.hero')

	sectionParallax.addEventListener('mousemove', e => {
        Object.assign(document.documentElement, {
            style: `
                --move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
                --move-y: ${(e.clientY - window.innerHeight / 2) * -.01}deg;
            `
        })
    })

})();

;(function() {

    let blockLargeImg = document.querySelector('.large-img')
    let srcImg = './img/list/'

    document.querySelectorAll('.col-image').forEach(function(item,index){
        item.addEventListener('click', function() {
            console.log(index);
            blockLargeImg.classList.add('open')
            let template = `
            <div class="large-img__card">
                <img src="${srcImg + (index+1) + '_img.jpg'}" alt="где она?">
            </div>
            `
            blockLargeImg.innerHTML = template;
        })
    })

    blockLargeImg.addEventListener('click', function(){
        this.classList.remove('open')
    })

})();

;(function() {

    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    let heroParallax = document.querySelector('.hero__content-parallax')
    let heroTouch = document.querySelector('.hero__content-touch-large')
    
    if (isMobile.any()) {
        heroParallax.classList.add('hide')
        heroTouch.classList.add('show')
    } else {
        heroParallax.classList.add('show')
        heroTouch.classList.add('hide')
    }

})();
function Calendar(year, month) {

	const calengarParent = document.querySelector('#calengarParent')

	for(let k=0; k<3; k++){
		var Dlast = new Date(year, month + k + 1, 0).getDate(), // Последнее число текущего месяца
			D = new Date(year, month + k, Dlast), // Последний день текущего месяца (полные данные)
			DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(), // Порядковый номер последнего дня месяца. На данный момент 5
			DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),	// Порядковый номер певого дня месяца. На данный момент 4
			calendar = '<tr>',
			months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

		if (DNfirst != 0) {
			for (var i = 1; i < DNfirst; i++) calendar += '<td>';
		} else {
			for (var i = 0; i < 6; i++) calendar += '<td>';
		}
		for (var i = 1; i <= Dlast; i++) {
			if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
				calendar += '<td class="today">' + i;
			} else {
				calendar += '<td>' + i;
			}
			if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
				calendar += '<tr>';
			}
		}
		for (var i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
		
		let first = months[D.getMonth()] + ' ' + D.getFullYear();
		let div = document.createElement('div');
		div.classList.add('col')
		div.innerHTML = `
			<table id="calendar">
				<thead>
					<tr>
						<td></td>
						<td colspan="5">${first}</td>
						<td></td>
					</tr>
					<tr>
						<td>Пн</td>
						<td>Вт</td>
						<td>Ср</td>
						<td>Чт</td>
						<td>Пт</td>
						<td>Сб</td>
						<td>Вс</td>
					</tr>
				</thead>
				<tbody>${calendar}</tbody>
			</table>
		`;

		calengarParent.appendChild(div);
	}
}

Calendar(new Date().getFullYear(), new Date().getMonth());

let days = document.querySelectorAll('td')
for(let elem of days){
	elem.addEventListener('click', function(e){
		let block = e.target
		console.log(block);
		block.classList.toggle('clicked')
	})
}