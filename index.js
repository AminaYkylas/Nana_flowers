const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-theme');

  if (isDark) {
    themeToggle.textContent = 'Light mode'; 
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    themeToggle.textContent = 'Dark mode'; 
    themeToggle.setAttribute('aria-pressed', 'false');
  }
});
