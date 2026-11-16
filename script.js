const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// Animación de entrada al desplazarse por la página.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.getElementById('year').textContent = new Date().getFullYear();

// El formulario prepara un correo con los datos ingresados.
document.getElementById('contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Consulta web: ${data.get('service')}`);
  const body = encodeURIComponent(
    `Nombre: ${data.get('name')}\nCorreo: ${data.get('email')}\nServicio: ${data.get('service')}\n\nMensaje:\n${data.get('message')}`
  );
  document.getElementById('formNote').textContent = 'Abriendo tu aplicación de correo…';
  window.location.href = `mailto:silviaquindesaguma6@gmail.com?subject=${subject}&body=${body}`;
});
