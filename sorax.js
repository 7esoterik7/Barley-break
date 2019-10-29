function shuffle(arr) {
	const randomMultiple = arr.length;
	for (var i = 0; i < arr.length; i++) {
		var sel1 = Math.floor(Math.random() * randomMultiple);
		var sel2 = Math.floor(Math.random() * randomMultiple);
		var swap = arr[sel1];
		arr[sel1] = arr[sel2];
		arr[sel2] = swap;
	}

	return arr
}

function mix() {
	var mixIndex = shuffle([...Array(tds.length).keys()]);
	for (var i = 0; i < tds.length; i++) {
	  var img = tds[i].querySelector('img');
	  img.src = arrSrcImg[mixIndex[i]];
	}
}

function getTds() {
	var tds = document.querySelectorAll('td');
	return tds
}


function click(td) {
	td.addEventListener('click', function() {
		td.classList.toggle('click');
	});
}

function checkNoDiagonal() {
	var tds = getTds();
	var lenTr = document.querySelector('tr').querySelectorAll('td').length; //Разность по вертикали. По горизонтали будет всегда 1
	
	var listClickIndex = [];
	for (var i = 0; i < tds.length; i++) {
		if (tds[i].classList.contains('click')){
			listClickIndex.push(i);
		}
	}
	
	if (Math.abs(listClickIndex[0] - listClickIndex[1]) === 1 || Math.abs(listClickIndex[0] - listClickIndex[1]) === lenTr) {
		return true
	}
	return false
}

function checkVictory(arrJs, arrNode){
	for (var i = 0; i < arrJs.length; i++) {
		var imgFromArrNode = arrNode[i].querySelector('img').src;
		if (imgFromArrNode !== arrJs[i]) return false;
	}
	return true;
}


var tds = document.querySelectorAll('td');
var arrSrcImg = [];
for (var i = 0; i < tds.length; i++) {
	arrSrcImg.push(tds[i].querySelector('img').src);
}

/*var arrSrcImg = ['img/1.jpg',
                 'img/2.jpg',
				 'img/3.jpg',
				 'img/4.jpg',
				 'img/5.jpg',
				 'img/6.jpg',
				 'img/7.jpg',
				 'img/8.jpg',
				 'img/9.jpg',
				 'img/10.jpg',
				 'img/11.jpg',
				 'img/12.jpg',
				 'img/13.jpg',
				 'img/14.jpg',
				 'img/15.jpg',
				 'img/empty.jpg'];*/
				 
var emptyImg = tds[arrSrcImg.length - 1].firstChild.src;

var buttonMix = document.querySelector('#mix');
var beginPlay = document.querySelector('#beginPlay');
var advice = document.querySelector('#advice');
var tbody = document.querySelector('tbody');


buttonMix.addEventListener('click', function() {
	mix();
});

beginPlay.addEventListener('click', function() {
	buttonMix.classList.add('hidden');
	beginPlay.classList.add('hidden');
	advice.classList.remove('hidden');
	
	var tds = getTds();
	
    for (var i = 0; i < tds.length; i++) {
		click(tds[i]);
	}
	
	tbody.addEventListener('click', function() {
	    var tdsClick = tbody.querySelectorAll('.click');
		
		if (tdsClick.length === 2) {
		    img0 = tdsClick[0].querySelector('img');
		    img1 = tdsClick[1].querySelector('img');
		}
		
		if (tdsClick.length === 2 && (img0.src === emptyImg || img1.src === emptyImg) && checkNoDiagonal()) {
			var swap = img0.src;
			img0.src = img1.src;
			img1.src = swap;
			
			tdsClick[0].classList.remove('click');
			tdsClick[1].classList.remove('click');
		} else if (tdsClick.length === 2) {
			tdsClick[0].classList.remove('click');
			tdsClick[1].classList.remove('click');
		}
		
		tds = getTds();
		if (checkVictory(arrSrcImg, tds)) {
			alert('YOU ARE WINNER!!!')
		}
    });
});






































