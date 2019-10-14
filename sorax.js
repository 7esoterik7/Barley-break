var numbers = [3, 4, 5, 9, 2, 5, 1];
var swap;


for (var i = 0; i < numbers.length - 1; i++) {
  
  if (numbers[i + 1] < numbers[i]) {
    swap = numbers[i];
    numbers[i] = numbers[i + 1];
    numbers[i + 1] = swap;
  }
}

console.log(numbers);