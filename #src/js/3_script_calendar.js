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