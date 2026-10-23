const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {

  const isDark = body.classList.toggle('dark-theme');

  
  if (isDark) {
    themeToggle.textContent = ' Light mode';
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    themeToggle.textContent = ' Dark mode';
    themeToggle.setAttribute('aria-pressed', 'false');
  }
});



const favForm     = document.getElementById('favForm');
const favInput    = document.getElementById('favInput');
const favList     = document.getElementById('favList');
const favCount    = document.getElementById('favCount');
const favMessage  = document.getElementById('favMessage');


function updateFavCount() {
  const total = favList.children.length;
  favCount.textContent = 'Favourites: ' + total;
}


favForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const text = favInput.value.trim();

  
  if (text === '') {
    favMessage.textContent = 'Please enter a flower name.';
    favInput.focus();
    return;
  }

  favMessage.textContent = '';

  const li = document.createElement('li');

  
  const nameSpan = document.createElement('span');
  nameSpan.textContent = text; 
  nameSpan.className = 'fav-name';

  
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'fav-remove';
  removeBtn.setAttribute('aria-label', 'Remove ' + text);

  
  removeBtn.addEventListener('click', () => {
    li.remove();
    updateFavCount();
  });

  li.appendChild(nameSpan);
  li.appendChild(removeBtn);
  favList.appendChild(li);

  favInput.value = '';
  favInput.focus();
  updateFavCount();
});

updateFavCount();
