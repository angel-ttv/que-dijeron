const NOMBRES_DEFECTO = ['Equipo 1', 'Equipo 2'];

const el = {
  pregunta: document.getElementById('pregunta'),
  tablero: document.getElementById('tablero'),
  catWrap: document.getElementById('categoria-etiqueta-wrap'),
  numeroRonda: document.getElementById('numero-ronda'),
  puntosRondaWrap: document.getElementById('puntos-ronda-wrap'),
  puntosRonda: document.getElementById('puntos-ronda'),
  puntaje0: document.getElementById('puntaje-0'),
  puntaje1: document.getElementById('puntaje-1'),
  nombre0: document.getElementById('nombre-equipo-0'),
  nombre1: document.getElementById('nombre-equipo-1'),
  tag0: document.getElementById('tag-equipo-0'),
  tag1: document.getElementById('tag-equipo-1'),
  strikesX: document.querySelectorAll('#strikes-visual .x'),
  textoCentral: document.getElementById('texto-central'),
};

function textoFase(estado, preguntaActual) {
  switch (estado.fase) {
    case 'espera':
      return 'Esperando a que el anfitrión inicie el juego…';
    case 'careo':
      return '¿Qué equipo acierta primero?';
    case 'decision':
      return `${(estado.nombres || NOMBRES_DEFECTO)[estado.equipoCareoGanador]} ganó el careo. Decidiendo: ¿jugar o pasar?`;
    case 'jugando':
      return `${(estado.nombres || NOMBRES_DEFECTO)[estado.equipoJugando]} está jugando…`;
    case 'robo':
      return '¡3 strikes! El equipo rival tiene un intento para robar…';
    case 'fin-ronda':
      return estado.textoFinRonda || '';
    case 'final':
      return estado.ganadorFinal || '';
    default:
      return '';
  }
}

function render(estado) {
  if (!estado) return;
  const nombres = estado.nombres || NOMBRES_DEFECTO;
  const preguntaActual = estado.indicePregunta != null ? preguntas[estado.indicePregunta] : null;

  // Marcador
  el.nombre0.textContent = nombres[0].toUpperCase();
  el.nombre1.textContent = nombres[1].toUpperCase();
  el.puntaje0.textContent = (estado.puntajes || [0, 0])[0];
  el.puntaje1.textContent = (estado.puntajes || [0, 0])[1];
  el.tag0.classList.toggle('activo', estado.equipoJugando === 0);
  el.tag1.classList.toggle('activo', estado.equipoJugando === 1);

  // Strikes
  const strikes = estado.strikes || 0;
  el.strikesX.forEach((x, i) => x.classList.toggle('activa', i < strikes));

  // Pregunta / categoría
  if (preguntaActual) {
    el.pregunta.textContent = preguntaActual.pregunta;
    el.catWrap.innerHTML = `<span class="categoria-etiqueta">${preguntaActual.categoria}</span>`;
  } else {
    el.pregunta.textContent = 'Esperando a que el anfitrión inicie el juego…';
    el.catWrap.innerHTML = '';
  }

  // Tablero
  el.tablero.innerHTML = '';
  if (preguntaActual) {
    const revelada = estado.revelada || [];
    preguntaActual.respuestas.forEach((resp, i) => {
      const tarjeta = document.createElement('div');
      const estaRevelada = !!revelada[i];
      tarjeta.className = 'tarjeta' + (estaRevelada ? ' revelada' : '');
      if (estaRevelada) {
        tarjeta.innerHTML = `<span>${resp.texto}</span><span class="pts">${resp.puntos}</span>`;
      } else {
        tarjeta.innerHTML = `<span class="num">${i + 1}.</span><span>¿?</span>`;
      }
      el.tablero.appendChild(tarjeta);
    });
  }

  // Puntos de la ronda
  const mostrarPuntosRonda = ['jugando', 'robo', 'fin-ronda'].includes(estado.fase);
  el.puntosRondaWrap.classList.toggle('oculto', !mostrarPuntosRonda);
  el.puntosRonda.textContent = estado.puntosRonda || 0;

  // Ronda / número
  if (preguntaActual) {
    const idx = preguntas.indexOf(preguntaActual);
    el.numeroRonda.textContent = `Pregunta ${idx + 1} de ${preguntas.length}`;
  } else {
    el.numeroRonda.textContent = '';
  }

  // Texto central según fase
  const txt = textoFase(estado, preguntaActual);
  if (estado.fase === 'careo' || estado.fase === 'jugando' || estado.fase === 'espera') {
    el.textoCentral.classList.add('oculto');
  } else {
    el.textoCentral.textContent = txt;
    el.textoCentral.classList.remove('oculto');
  }

  if (estado.fase === 'final') {
    el.pregunta.textContent = '🏆 ¡Fin del juego! 🏆';
    el.tablero.innerHTML = '';
    el.textoCentral.textContent = estado.ganadorFinal || '';
    el.textoCentral.classList.remove('oculto');
  }
}

// Conexión en vivo a Firebase
estadoRef.on('value', (snap) => {
  const estado = snap.val() || estadoInicial();
  render(estado);
});