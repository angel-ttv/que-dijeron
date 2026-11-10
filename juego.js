// ============================================================
// BANCO DE PREGUNTAS
// Reemplaza esto con los datos reales de tu encuesta.
// "puntos" = cuántas personas dieron esa respuesta.
// ============================================================
const preguntas = [
  {
    pregunta: "Menciona un personaje de la Revolución Mexicana",
    respuestas: [
      { texto: "Emiliano Zapata", puntos: 38 },
      { texto: "Francisco Villa", puntos: 27 },
      { texto: "Francisco I. Madero", puntos: 15 },
      { texto: "Porfirio Díaz", puntos: 10 },
      { texto: "Venustiano Carranza", puntos: 6 },
      { texto: "Álvaro Obregón", puntos: 4 },
    ],
  },
  {
    pregunta: "Menciona un destino turístico de Quintana Roo",
    respuestas: [
      { texto: "Cancún", puntos: 34 },
      { texto: "Tulum", puntos: 26 },
      { texto: "Playa del Carmen", puntos: 18 },
      { texto: "Bacalar", puntos: 12 },
      { texto: "Isla Mujeres", puntos: 10 },
    ],
  },
  {
    pregunta: "Menciona un elemento de la tabla periódica",
    respuestas: [
      { texto: "Oxígeno", puntos: 31 },
      { texto: "Hidrógeno", puntos: 24 },
      { texto: "Carbono", puntos: 20 },
      { texto: "Oro", puntos: 15 },
      { texto: "Hierro", puntos: 10 },
    ],
  },
];

// ============================================================
// ESTADO DEL JUEGO
// ============================================================
let indicePregunta = 0;
let puntajes = [0, 0];
let respuestasRonda = [];   // copia de la pregunta actual con estado "revelada"
let equipoCareoGanador = null;
let equipoJugando = null;   // 0 o 1: quién está intentando llenar el tablero
let strikes = 0;
let puntosRonda = 0;
let enRobo = false;

// ============================================================
// ELEMENTOS DEL DOM
// ============================================================
const el = {
  pregunta: document.getElementById('pregunta'),
  tablero: document.getElementById('tablero'),
  numeroRonda: document.getElementById('numero-ronda'),
  puntosRonda: document.getElementById('puntos-ronda'),
  puntaje0: document.getElementById('puntaje-0'),
  puntaje1: document.getElementById('puntaje-1'),
  tag0: document.getElementById('tag-equipo-0'),
  tag1: document.getElementById('tag-equipo-1'),
  strikesX: document.querySelectorAll('#strikes-visual .x'),
  faseCareo: document.getElementById('fase-careo'),
  faseDecision: document.getElementById('fase-decision'),
  textoDecision: document.getElementById('texto-decision'),
  faseJugando: document.getElementById('fase-jugando'),
  faseRobo: document.getElementById('fase-robo'),
  faseFinRonda: document.getElementById('fase-fin-ronda'),
  textoFinRonda: document.getElementById('texto-fin-ronda'),
  faseFinal: document.getElementById('fase-final'),
  ganadorFinal: document.getElementById('ganador-final'),
};

const NOMBRES = ['Equipo 1', 'Equipo 2'];

// ============================================================
// CARGAR UNA PREGUNTA NUEVA
// ============================================================
function cargarPregunta() {
  const preguntaActual = preguntas[indicePregunta];
  el.pregunta.textContent = preguntaActual.pregunta;
  el.numeroRonda.textContent = `Ronda ${indicePregunta + 1} de ${preguntas.length}`;

  respuestasRonda = preguntaActual.respuestas.map((r) => ({ ...r, revelada: false }));
  strikes = 0;
  puntosRonda = 0;
  equipoCareoGanador = null;
  equipoJugando = null;
  enRobo = false;

  actualizarTablero();
  actualizarStrikes();
  actualizarPuntosRonda();
  marcarEquipoActivo(null);

  mostrarSoloFase('fase-careo');
}

// ============================================================
// FASE 1: CAREO — el anfitrión indica quién acertó primero
// ============================================================
function ganarCareo(equipo) {
  equipoCareoGanador = equipo;
  el.textoDecision.textContent = `${NOMBRES[equipo]} ganó el careo. ¿Juega o pasa?`;
  mostrarSoloFase('fase-decision');
}

// ============================================================
// FASE 2: JUGAR O PASAR
// ============================================================
function decidir(accion) {
  equipoJugando = accion === 'jugar' ? equipoCareoGanador : 1 - equipoCareoGanador;
  marcarEquipoActivo(equipoJugando);
  mostrarSoloFase('fase-jugando');
}

// ============================================================
// FASE 3: EL EQUIPO ACTIVO VA REVELANDO RESPUESTAS
// ============================================================
function actualizarTablero() {
  el.tablero.innerHTML = '';
  respuestasRonda.forEach((resp, i) => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta' + (resp.revelada ? ' revelada' : '');

    if (resp.revelada) {
      tarjeta.innerHTML = `<span>${resp.texto}</span><span class="pts">${resp.puntos}</span>`;
    } else {
      tarjeta.innerHTML = `<span class="num">${i + 1}.</span><span>¿?</span>`;
      // Al hacer clic en una tarjeta oculta, el anfitrión confirma que
      // ESA fue la respuesta que dio el equipo (revelación manual, no automática).
      tarjeta.onclick = () => revelarCarta(i);
    }
    el.tablero.appendChild(tarjeta);
  });
}

function revelarCarta(i) {
  const resp = respuestasRonda[i];
  if (resp.revelada) return;
  resp.revelada = true;

  if (enRobo) {
    resolverRobo(resp.puntos);
    return;
  }

  puntosRonda += resp.puntos;
  actualizarTablero();
  actualizarPuntosRonda();

  if (respuestasRonda.every((r) => r.revelada)) {
    finalizarRonda(equipoJugando, `¡Tablero completo! ${NOMBRES[equipoJugando]} se lleva ${puntosRonda} puntos.`);
  }
}

function fallo() {
  if (enRobo) return;
  strikes++;
  actualizarStrikes();
  if (strikes >= 3) {
    enRobo = true;
    mostrarSoloFase('fase-robo');
  }
}

// ============================================================
// FASE 4: ROBO — el equipo rival tiene UN intento
// ============================================================
function resolverRobo(puntosRespuesta) {
  const equipoRobando = 1 - equipoJugando;
  const totalRobado = puntosRonda + puntosRespuesta;
  actualizarTablero();
  finalizarRonda(equipoRobando, `¡Robo exitoso! ${NOMBRES[equipoRobando]} se lleva ${totalRobado} puntos.`, puntosRespuesta);
}

function roboFalla() {
  finalizarRonda(equipoJugando, `El robo falló. ${NOMBRES[equipoJugando]} conserva sus ${puntosRonda} puntos.`);
}

// ============================================================
// CIERRE DE RONDA
// ============================================================
function finalizarRonda(equipoGanador, mensaje, extraPuntos = 0) {
  puntajes[equipoGanador] += puntosRonda + extraPuntos;
  el.puntaje0.textContent = puntajes[0];
  el.puntaje1.textContent = puntajes[1];

  el.textoFinRonda.textContent = mensaje;
  mostrarSoloFase('fase-fin-ronda');
}

function siguientePregunta() {
  indicePregunta++;
  if (indicePregunta < preguntas.length) {
    cargarPregunta();
  } else {
    mostrarGanadorFinal();
  }
}

function mostrarGanadorFinal() {
  let texto;
  if (puntajes[0] > puntajes[1]) texto = `🏆 ${NOMBRES[0]} gana ${puntajes[0]} - ${puntajes[1]}`;
  else if (puntajes[1] > puntajes[0]) texto = `🏆 ${NOMBRES[1]} gana ${puntajes[1]} - ${puntajes[0]}`;
  else texto = `Empate: ${puntajes[0]} - ${puntajes[1]}`;
  el.ganadorFinal.textContent = texto;
  mostrarSoloFase('fase-final');
}

// ============================================================
// UTILIDADES DE INTERFAZ
// ============================================================
function mostrarSoloFase(idFaseVisible) {
  document.querySelectorAll('.fase').forEach((f) => {
    f.classList.toggle('oculto', f.id !== idFaseVisible);
  });
}

function actualizarStrikes() {
  el.strikesX.forEach((x, i) => x.classList.toggle('activa', i < strikes));
}

function actualizarPuntosRonda() {
  el.puntosRonda.textContent = puntosRonda;
}

function marcarEquipoActivo(equipo) {
  el.tag0.classList.toggle('activo', equipo === 0);
  el.tag1.classList.toggle('activo', equipo === 1);
}

// ============================================================
// INICIO
// ============================================================
cargarPregunta();
