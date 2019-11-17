function isOperator(value) {
	var operators = document.querySelectorAll('.operator');
	
	for (var i = 0; i < operators.length; i++) {
		if (operators[i].textContent == value) {
			return true; 
		}
	}
	return false
}



window.addEventListener('DOMContentLoaded', function() {
	var tbody = document.querySelector('tbody');
	var input = document.querySelector('#input');
	var result = document.querySelector('.result');
	var arrInput = [];
	
	tbody.addEventListener('click', function(event) {
		var target = event.target;
		
		if (target && result.textContent && result.classList.contains('calculate')) {
			
			input.textContent = '';
			result.textContent = '';
			arrInput = [];
			result.classList.remove('calculate');
			
		}
		
		if (target && input.textContent == '') {
			
			if (target.classList.contains('digit') || target.textContent == '-') {
				input.textContent = target.textContent;
				arrInput.push(target.textContent);
			}
			
		} else if (target && target.classList.contains('digit')) {
			
			arrInput.push(target.textContent);
			input.textContent += target.textContent;
			result.textContent = eval(input.textContent);
			
		} else if (target && target.textContent == 'del') {
			
			arrInput.pop();
			input.textContent =
			input.textContent.slice(0, input.textContent.length - 1);
			
		} else if (target && target.textContent == 'C') {
			
			input.textContent = '';
			result.textContent = '';
			arrInput = [];
			
		} else if (target && target.classList.contains('operator') &&
		    !isOperator(arrInput[arrInput.length - 1])) {
			
			arrInput.push(target.textContent);
			input.textContent += target.textContent;
			
		} else if (target && target.textContent == '.' &&
		    !isOperator(arrInput[arrInput.length - 1])) {
			
			arrInput.push(target.textContent);
			input.textContent += target.textContent;
			
		} else if (target && target.classList.contains('enter') &&
		    input.textContent != '') {
			
			if (input.textContent == '-') {
				result.textContent = 0;
			} else {
				if (isOperator(arrInput[arrInput.length - 1])) {
					var end = arrInput.length - 1;
					input.textContent = input.textContent.slice(0, end);
				} 
				result.classList.add('calculate');
				result.textContent = eval(input.textContent);

			}
		}
		
			
		
	});
	
	
	
});































