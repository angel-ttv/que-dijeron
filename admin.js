const NOMBRES_DEFECTO = ['Equipo 1', 'Equipo 2'];

let estado = estadoInicial();
estado.usadas = [];

const el = {
  conexion: document.getElementById('estado-conexion'),
  input0: document.getElementById('input-nombre-0'),
  input1: document.getElementById('input-nombre-1'),
  eq0: document.getElementById('marcador-equipo-0'),
  eq1: document.getElementById('marcador-equipo-1'),
  pts0: document.getElementById('marcador-pts-0'),
  pts1: document.getElementById('marcador-pts-1'),
  strikesAdmin: document.getElementById('strikes-admin'),
  panelSeleccion: document.getElementById('panel-seleccion'),
  listaPreguntas: document.getElementById('lista-preguntas'),
  panelPreguntaActiva: document.getElementById('panel-pregunta-activa'),
  faseTag: document.getElementById('fase-tag'),
  preguntaActualTxt: document.getElementById('pregunta-actual-txt'),
  listaRespuestas: document.getElementById('lista-respuestas'),
  panelCareo: document.getElementById('panel-careo'),
  botonesCareo: document.getElementById('botones-careo'),
  panelDecision: document.getElementById('panel-decision'),
  textoDecision: document.getElementById('texto-decision'),
  panelJugando: document.getElementById('panel-jugando'),
  panelRobo: document.getElementById('panel-robo'),
  panelFinRonda: document.getElementById('panel-fin-ronda'),
  textoFinRonda: document.getElementById('texto-fin-ronda'),
  panelFinal: document.getElementById('panel-final'),
  ganadorFinal: document.getElementById('ganador-final'),
};

// ============================================================
// CONEXIÓN A FIREBASE
// ============================================================
estadoRef.on('value', (snap) => {
  const remoto = snap.val();
  estado = remoto ? { ...estadoInicial(), ...remoto } : estadoInicial();
  if (!estado.usadas) estado.usadas = [];
  if (!estado.nombres) estado.nombres = NOMBRES_DEFECTO;
  render();
});

db.ref('.info/connected').on('value', (snap) => {
  const ok = snap.val() === true;
  el.conexion.textContent = ok ? 'conectado' : 'sin conexión';
  el.conexion.className = ok ? 'ok' : 'mal';
});

function guardar(cambios) {
  estadoRef.update({ ...cambios, actualizadoEn: Date.now() });
}

// ============================================================
// NOMBRES DE EQUIPOS
// ============================================================
el.input0.addEventListener('change', () => {
  const nombres = [el.input0.value.trim() || 'Equipo 1', estado.nombres[1]];
  guardar({ nombres });
});
el.input1.addEventListener('change', () => {
  const nombres = [estado.nombres[0], el.input1.value.trim() || 'Equipo 2'];
  guardar({ nombres });
});

// ============================================================
// SELECCIÓN DE PREGUNTA
// ============================================================
function construirListaPreguntas() {
  const categorias = [...new Set(preguntas.map((p) => p.categoria))];
  el.listaPreguntas.innerHTML = '';
  categorias.forEach((cat) => {
    const detalle = document.createElement('details');
    detalle.className = 'categoria-bloque';
    const resumen = document.createElement('summary');
    resumen.textContent = cat;
    detalle.appendChild(resumen);

    preguntas.forEach((p, i) => {
      if (p.categoria !== cat) return;
      const item = document.createElement('div');
      item.className = 'pregunta-item';
      item.dataset.idx = i;
      item.innerHTML = `<span class="cat-txt">${p.pregunta}</span><span class="chip-usada">usada</span>`;
      item.onclick = () => seleccionarPregunta(i);
      detalle.appendChild(item);
    });
    el.listaPreguntas.appendChild(detalle);
  });
}
construirListaPreguntas();

function seleccionarPregunta(i) {
  const usadas = estado.usadas.includes(i) ? estado.usadas : [...estado.usadas, i];
  guardar({
    indicePregunta: i,
    fase: 'careo',
    revelada: new Array(preguntas[i].respuestas.length).fill(false),
    strikes: 0,
    puntosRonda: 0,
    equipoCareoGanador: null,
    equipoJugando: null,
    textoFinRonda: '',
    usadas,
  });
}

function volverASeleccion() {
  guardar({ fase: 'espera', indicePregunta: null });
}

// ============================================================
// FASE: CAREO
// ============================================================
function construirBotonesCareo() {
  el.botonesCareo.innerHTML = `
    <button class="btn btn-equipo0" onclick="ganarCareo(0)">Ganó ${estado.nombres[0]}</button>
    <button class="btn btn-equipo1" onclick="ganarCareo(1)">Ganó ${estado.nombres[1]}</button>
  `;
}

function ganarCareo(equipo) {
  guardar({ equipoCareoGanador: equipo, fase: 'decision' });
}

// ============================================================
// FASE: DECISIÓN
// ============================================================
function decidir(accion) {
  const equipoJugando = accion === 'jugar' ? estado.equipoCareoGanador : 1 - estado.equipoCareoGanador;
  guardar({ equipoJugando, fase: 'jugando' });
}

// ============================================================
// RESPUESTAS EN TABLERO (vistas siempre por el admin)
// ============================================================
function construirRespuestas() {
  const preguntaActual = preguntas[estado.indicePregunta];
  const revelada = estado.revelada || [];
  el.preguntaActualTxt.textContent = `[${preguntaActual.categoria}] ${preguntaActual.pregunta}`;
  el.listaRespuestas.innerHTML = '';
  preguntaActual.respuestas.forEach((r, i) => {
    const fila = document.createElement('div');
    const estaRevelada = !!revelada[i];
    fila.className = 'respuesta-admin' + (estaRevelada ? ' revelada' : '');
    const puedeMarcar = !estaRevelada && (estado.fase === 'jugando' || estado.fase === 'robo');
    fila.innerHTML = `
      <span>${i + 1}. ${r.texto} <strong>(${r.puntos})</strong></span>
      <button ${puedeMarcar ? '' : 'disabled'} onclick="marcarRespuesta(${i})">${estaRevelada ? '✓' : 'Marcar'}</button>
    `;
    el.listaRespuestas.appendChild(fila);
  });
}

function marcarRespuesta(i) {
  const revelada = [...(estado.revelada || [])];
  if (revelada[i]) return;
  revelada[i] = true;
  const preguntaActual = preguntas[estado.indicePregunta];
  const puntosResp = preguntaActual.respuestas[i].puntos;

  if (estado.fase === 'robo') {
    const equipoRobando = 1 - estado.equipoJugando;
    const total = (estado.puntosRonda || 0) + puntosResp;
    const puntajes = [...estado.puntajes];
    puntajes[equipoRobando] += total;
    guardar({
      revelada,
      puntajes,
      fase: 'fin-ronda',
      textoFinRonda: `¡Robo exitoso! ${estado.nombres[equipoRobando]} se lleva ${total} puntos.`,
    });
    return;
  }

  const puntosRonda = (estado.puntosRonda || 0) + puntosResp;
  const todasReveladas = revelada.every((r) => r);

  if (todasReveladas) {
    const puntajes = [...estado.puntajes];
    puntajes[estado.equipoJugando] += puntosRonda;
    guardar({
      revelada,
      puntosRonda,
      puntajes,
      fase: 'fin-ronda',
      textoFinRonda: `¡Tablero completo! ${estado.nombres[estado.equipoJugando]} se lleva ${puntosRonda} puntos.`,
    });
  } else {
    guardar({ revelada, puntosRonda });
  }
}

// ============================================================
// FALLO Y ROBO
// ============================================================
function fallo() {
  const strikes = (estado.strikes || 0) + 1;
  if (strikes >= 3) {
    guardar({ strikes, fase: 'robo' });
  } else {
    guardar({ strikes });
  }
}

function roboFalla() {
  const puntajes = [...estado.puntajes];
  puntajes[estado.equipoJugando] += estado.puntosRonda || 0;
  guardar({
    puntajes,
    fase: 'fin-ronda',
    textoFinRonda: `El robo falló. ${estado.nombres[estado.equipoJugando]} conserva sus ${estado.puntosRonda || 0} puntos.`,
  });
}

// ============================================================
// TERMINAR JUEGO
// ============================================================
function terminarJuego() {
  const [p0, p1] = estado.puntajes;
  let texto;
  if (p0 > p1) texto = `🏆 ${estado.nombres[0]} gana ${p0} - ${p1}`;
  else if (p1 > p0) texto = `🏆 ${estado.nombres[1]} gana ${p1} - ${p0}`;
  else texto = `Empate: ${p0} - ${p1}`;
  guardar({ fase: 'final', ganadorFinal: texto });
}

// ============================================================
// REINICIAR
// ============================================================
function reiniciarTodo() {
  if (!confirm('¿Reiniciar marcador y juego? Esto borra el progreso actual.')) return;
  guardar({
    indicePregunta: null,
    fase: 'espera',
    revelada: [],
    strikes: 0,
    puntosRonda: 0,
    puntajes: [0, 0],
    equipoCareoGanador: null,
    equipoJugando: null,
    textoFinRonda: '',
    ganadorFinal: '',
    usadas: [],
  });
}

// ============================================================
// RENDER GENERAL
// ============================================================
function render() {
  // Marcador
  el.input0.value = estado.nombres[0];
  el.input1.value = estado.nombres[1];
  el.pts0.textContent = estado.puntajes[0];
  el.pts1.textContent = estado.puntajes[1];
  el.eq0.classList.toggle('activo', estado.equipoJugando === 0);
  el.eq1.classList.toggle('activo', estado.equipoJugando === 1);

  // Strikes
  const strikes = estado.strikes || 0;
  el.strikesAdmin.innerHTML = ['✕', '✕', '✕']
    .map((s, i) => `<span class="${i < strikes ? 'activa' : ''}">${s}</span>`)
    .join(' ');

  // Marcar preguntas usadas en la lista
  document.querySelectorAll('.pregunta-item').forEach((item) => {
    const idx = Number(item.dataset.idx);
    item.classList.toggle('usada', estado.usadas.includes(idx));
  });

  // Paneles visibles según fase
  el.panelSeleccion.classList.toggle('oculto', estado.fase !== 'espera');
  el.panelPreguntaActiva.classList.toggle('oculto', estado.indicePregunta == null);
  el.panelCareo.classList.toggle('oculto', estado.fase !== 'careo');
  el.panelDecision.classList.toggle('oculto', estado.fase !== 'decision');
  el.panelJugando.classList.toggle('oculto', estado.fase !== 'jugando');
  el.panelRobo.classList.toggle('oculto', estado.fase !== 'robo');
  el.panelFinRonda.classList.toggle('oculto', estado.fase !== 'fin-ronda');
  el.panelFinal.classList.toggle('oculto', estado.fase !== 'final');

  if (estado.indicePregunta != null) {
    construirRespuestas();
  }

  if (estado.fase === 'careo') {
    construirBotonesCareo();
  }

  if (estado.fase === 'decision') {
    el.textoDecision.textContent = `${estado.nombres[estado.equipoCareoGanador]} ganó el careo. ¿Juega o pasa?`;
  }

  el.faseTag.textContent = ({
    careo: 'Fase: Careo',
    decision: 'Fase: Decisión',
    jugando: 'Fase: Jugando',
    robo: 'Fase: Robo',
    'fin-ronda': 'Fase: Fin de ronda',
  })[estado.fase] || '';

  if (estado.fase === 'fin-ronda') {
    el.textoFinRonda.textContent = estado.textoFinRonda || '';
  }
}