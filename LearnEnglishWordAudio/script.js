function speech() {
	var recognition = new webkitSpeechRecognition();
	recognition.lang = 'en-En';
	
	recognition.start();
	
	recognition.onresult = function(event) {
		if (event.results[0].isFinal) {
			console.log(event.results[0]['0'].transcript);
		    recSound = event.results[0]['0'].transcript;
		} else {
			alert('Повторите. Ничего не понял');
		}
    }
}

function createElement(sound) {
	var h1 = document.createElement('h1');
	h1.textContent = sound;
	document.querySelector('#words').appendChild(h1);
}

function shuffle(arr){
	const randomDigit = arr.length;
	
	
	for (var i = 0; i < randomDigit; i++) {
		var firstIndex = 0;
	    var secondIndex = 0;
		
		while (firstIndex === secondIndex) {
		    var firstIndex = Math.floor(Math.random() * randomDigit);
	        var secondIndex = Math.floor(Math.random() * randomDigit);
	    }
		
		var swap = arr[firstIndex];
		arr[firstIndex] = arr[secondIndex];
		arr[secondIndex] = swap;
	}
	return arr
}

function translate(event) {
	
	if (!shuffleWordList.length && countRightWord === wordList.length) {  	                         //Отменяем обработчик события
	    word.textContent = 'Вы знаете все слова!'
		word.removeEventListener('click', translate);
	} else {console.log('shuffleWordList.length = ' + shuffleWordList.length)} 
	
	var countRightWord = 0;
	var startWord = shuffleWordList.shift();
	word.textContent = startWord[0];
	
	var recognition = new webkitSpeechRecognition();
	recognition.lang = 'en-En';
	recognition.start();

	recognition.onresult = function(event) {
		console.log(event.results);
		if (event.results.length === 1) {
			
		    var recSound = event.results[0]['0'].transcript;
			if (startWord[1] === recSound) {                     //Если сказал правильно
				word.textContent = 'Правильно! Нажмите здесь';
				countRightWord += 1;
			} else {                                             //Если сказал НЕ правильно
				console.log(startWord[1], recSound, 'NO');
			}  
		} else {
			alert('Повторите. Ничего не понял');
		}
    }
	
	recognition.onerror = function() {
		console.log('Тишина error')
	}
	
	recognition.onaudioend = function() {
		console.log('Есть какой-то звук')
	}
	
	recognition.onnomatch = function() {
		console.log('nomatch')
	}
}


var word = document.querySelector('.word');
var wordList = [['имя', 'name'], ['я', 'I'], ['что, какой', 'what']];
var shuffleWordList = shuffle(wordList);


word.addEventListener('click', translate);





























/*

После распознование параметр event выдает кучу свойств:

isTrusted : true
script.js:13 resultIndex : 0
script.js:13 results : [object SpeechRecognitionResultList]
script.js:13 interpretation : null
script.js:13 emma : null
script.js:13 NONE : 0
script.js:13 CAPTURING_PHASE : 1
script.js:13 AT_TARGET : 2
script.js:13 BUBBLING_PHASE : 3
script.js:13 type : result
script.js:13 target : [object SpeechRecognition]
script.js:13 currentTarget : [object SpeechRecognition]
script.js:13 eventPhase : 2
script.js:13 bubbles : false
script.js:13 cancelable : false
script.js:13 defaultPrevented : false
script.js:13 composed : false
script.js:13 timeStamp : 3718.574999991688
script.js:13 srcElement : [object SpeechRecognition]
script.js:13 returnValue : true
script.js:13 cancelBubble : false
script.js:13 path : 
script.js:13 composedPath : function composedPath() { [native code] }
script.js:13 stopPropagation : function stopPropagation() { [native code] }
script.js:13 stopImmediatePropagation : function stopImmediatePropagation() { [native code] }
script.js:13 preventDefault : function preventDefault() { [native code] }
script.js:13 initEvent : function initEvent() { [native code] }

Нас интересует results : [object SpeechRecognitionResultList]. Каждый элемент данного списка - сказанное слово. У него есть свойства 
SpeechRecognitionResult {0: SpeechRecognitionAlternative, length: 1, isFinal: true}.
Первое его свойство 0 это SpeechRecognitionAlternative - object. 
SpeechRecognitionAlternative {transcript: "это вы сказали", confidence: время}
Полный путь к сказанному - (event.results[0]['0'].transcript)

*/
















/*
for (var key in recognition) {
		console.log(key + ' : ' + recognition[key]);
	}
	console.log('**************************');
	for (var key in recognition.grammars) {
		console.log(key + ' : ' + recognition.grammars[key]);
	}

grammars : [object SpeechGrammarList]
script.js:4 lang : 
script.js:4 continuous : false
script.js:4 interimResults : false
script.js:4 maxAlternatives : 1
script.js:4 onaudiostart : null
script.js:4 onsoundstart : null
script.js:4 onspeechstart : null
script.js:4 onspeechend : null
script.js:4 onsoundend : null
script.js:4 onaudioend : null
script.js:4 onresult : null
script.js:4 onnomatch : null
script.js:4 onerror : null
script.js:4 onstart : null
script.js:4 onend : null
script.js:4 start : function start() { [native code] }
script.js:4 stop : function stop() { [native code] }
script.js:4 abort : function abort() { [native code] }
script.js:4 addEventListener : function addEventListener() { [native code] }
script.js:4 removeEventListener : function removeEventListener() { [native code] }
script.js:4 dispatchEvent : function dispatchEvent() { [native code] }
**************************
script.js:8 length : 0
script.js:8 item : function item() { [native code] }
script.js:8 addFromUri : function addFromUri() { [native code] }
script.js:8 addFromString : function addFromString() { [native code] }
*/