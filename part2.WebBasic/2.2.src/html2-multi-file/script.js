function printGugudan() {
  const dan = parseInt(document.getElementById('dan').value);
  const result = document.getElementById('result');

  result.innerHTML = '';

  if (isNaN(dan) || dan < 1 || dan > 9) {
    result.innerHTML = '<li>1부터 9 사이의 숫자를 입력하세요.</li>';
    return;
  }

  for (let i = 1; i <= 9; i++) {
    const li = document.createElement('li');
    li.textContent = `${dan} × ${i} = ${dan * i}`;
    result.appendChild(li);
  }
}
