// Elementos del DOM
const nombreInput = document.getElementById("nombreInput");
const perfilDisplay = document.getElementById("perfil");
const saludo = document.getElementById("saludo");
const perfilForm = document.getElementById("perfilForm");
const toggleActivoBtn = document.getElementById("toggleActivo");
const saludarBtn = document.getElementById("saludarBtn");
const audio = document.getElementById("backgroundMusic");

// Estado del perfil (se actualiza dinámicamente)
let perfil = {
  nombre: "",
  activo: true
};

// Función para mostrar el perfil como JSON formateado
function actualizarVistaPerfil() {
  perfilDisplay.textContent = JSON.stringify(perfil, null, 2);
}

// Función para reproducir música (con manejo de permisos de reproducción)
function reproducirMusica() {
  if (audio.paused) {
    audio.play().catch((error) => {
      console.warn("Error al reproducir el audio automáticamente:", error);
    });
  }
}

// Evento: envío del formulario para actualizar perfil
perfilForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Previene recarga
  const nombre = nombreInput.value.trim();

  if (nombre !== "") {
    perfil.nombre = nombre;
    reproducirMusica();
    actualizarVistaPerfil();
    saludo.textContent = ""; // Limpia el saludo anterior
  }
});

// Evento: alternar estado activo/inactivo
toggleActivoBtn.addEventListener("click", function () {
  perfil.activo = !perfil.activo;
  this.setAttribute("aria-pressed", perfil.activo.toString());
  actualizarVistaPerfil();
});

// Evento: mostrar saludo personalizado
saludarBtn.addEventListener("click", function () {
  if (perfil.nombre) {
    const mensaje = perfil.activo
      ? `¡Hola, ${perfil.nombre}! Estás activo. 😎`
      : `Hola, ${perfil.nombre}. Estás inactivo. 💤`;
    saludo.textContent = mensaje;
  } else {
    saludo.textContent = "Por favor, ingresa tu nombre primero.";
  }
});

// Inicializar vista al cargar
actualizarVistaPerfil();
