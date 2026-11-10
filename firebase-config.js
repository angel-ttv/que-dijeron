// ============================================================
// CONFIGURACIÓN DE FIREBASE
// Reemplaza los valores de abajo con los de TU proyecto.
// Instrucciones completas en INSTRUCCIONES.md
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyCvQF9u_iS9osSOH799kdU9E22xiMYjrVs",
  authDomain: "mexicanos-18b75.firebaseapp.com",
  databaseURL: "https://mexicanos-18b75-default-rtdb.firebaseio.com", // ⚠️ revisa este paso abajo
  projectId: "mexicanos-18b75",
  storageBucket: "mexicanos-18b75.firebasestorage.app",
  messagingSenderId: "83463916244",
  appId: "1:83463916244:web:83a67fc2a5dcece9bd8941",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const estadoRef = db.ref("juego100/estado");

// Estado inicial en caso de que la base de datos esté vacía
function estadoInicial() {
  return {
    indicePregunta: null,
    fase: "espera", // espera | careo | decision | jugando | robo | fin-ronda | final
    revelada: [],
    strikes: 0,
    puntosRonda: 0,
    puntajes: [0, 0],
    equipoCareoGanador: null,
    equipoJugando: null,
    textoFinRonda: "",
    ganadorFinal: "",
    nombres: ["Equipo 1", "Equipo 2"],
    actualizadoEn: Date.now(),
  };
}