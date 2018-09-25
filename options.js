const save = document.querySelector('#save');

document.addEventListener('DOMContentLoaded', () => {
  const token_input = document.querySelector('#token');
  token_input.value = JSON.parse(localStorage.getItem('items')).token || '';
});

save.addEventListener('click', () => {
  const token = document.querySelector("#token").value;
  if(token) {
    localStorage.setItem('items', JSON.stringify({token}));
    window.close();
  } else {
    alert('save failed');
  }
});
