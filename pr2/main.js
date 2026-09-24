const firstRow = 'Slow and steady wins the race';
const secondRow = 'You can say that again';

function countLetter(row, letter = 'a') {
  const target = letter.toLowerCase();
  let count = 0;
  for (let i = 0; i < row.length; i++) {
    if (row.charAt(i).toLowerCase() === target) {
      count++;
    }
  }
  return count;
}

function getRow(firstRow, secondRow, letter = 'a') {
  const first = countLetter(firstRow, letter);
  const second = countLetter(secondRow, letter);

  if (first === second) {
    return 'Літер порівну (' + first + ')';
  }
  return first > second ? firstRow : secondRow;
}

console.log(getRow(firstRow, secondRow));


const FORMAT_ERROR = 'Неправильний формат номера телефону';


function formattedPhone(phone) {
  const cleaned = String(phone).trim().replace(/[\s()\-]/g, '');

  if (!/^\+?\d+$/.test(cleaned)) {
    return FORMAT_ERROR;
  }

  const digits = cleaned.replace('+', '');
  let local;

  if (digits.length === 12 && digits.startsWith('38')) {
    local = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('8')) {
    local = digits.slice(1);
  } else if (digits.length === 10 && digits.startsWith('0')) {
    local = digits;
  } else {
    return FORMAT_ERROR;
  }

  if (!local.startsWith('0')) {
    return FORMAT_ERROR;
  }

  return '+38 (' + local.slice(0, 3) + ') ' +
    local.slice(3, 6) + '-' +
    local.slice(6, 8) + '-' +
    local.slice(8, 10);
}

console.log(formattedPhone('+380664567890')); 
console.log(formattedPhone('80971234567'));   
console.log(formattedPhone('0671234567'));    
console.log(formattedPhone('12345'));         


const result1 = document.getElementById('result1');
const result2 = document.getElementById('result2');

function showTask1(row1, row2, letter) {
  const c1 = countLetter(row1, letter);
  const c2 = countLetter(row2, letter);
  const winner = getRow(row1, row2, letter);
  return 'Літера "' + letter + '": ' + c1 + ' і ' + c2 + '. Більше в рядку: ' + winner;
}

document.getElementById('task1Btn').addEventListener('click', function () {
  const letter = document.getElementById('letter').value;
  if (letter === '') {
    result1.textContent = 'Введіть літеру';
    result1.classList.add('error');
    return;
  }
  result1.classList.remove('error');
  result1.textContent = showTask1(
    document.getElementById('row1').value,
    document.getElementById('row2').value,
    letter
  );
});

document.getElementById('task1Prompt').addEventListener('click', function () {
  const row1 = prompt('Введіть перший рядок:', firstRow);
  if (row1 === null) return;
  const row2 = prompt('Введіть другий рядок:', secondRow);
  if (row2 === null) return;
  const letter = prompt('Яку літеру порахувати?', 'a');
  if (letter === null || letter === '') return;

  alert(showTask1(row1, row2, letter.charAt(0)));
});

function showTask2(phone) {
  const formatted = formattedPhone(phone);
  result2.textContent = formatted;
  result2.classList.toggle('error', formatted === FORMAT_ERROR);
  return formatted;
}

document.getElementById('task2Btn').addEventListener('click', function () {
  showTask2(document.getElementById('phone').value);
});

document.getElementById('task2Prompt').addEventListener('click', function () {
  const phone = prompt('Введіть номер телефону:', '0671234567');
  if (phone === null) return;
  alert(showTask2(phone));
});