// ============================================================
// BANCO DE PREGUNTAS — Historia del Arte
// Este archivo debe ser IDÉNTICO en admin.html y public.html:
// solo se sincroniza el ÍNDICE de la pregunta por Firebase,
// el contenido vive local en cada pantalla.
// ============================================================
const preguntas = [
  // ---------------- ARTE BIZANTINO ----------------
  {
    categoria: "Arte Bizantino",
    pregunta: "Un elemento que nunca falta en el arte bizantino es...",
    respuestas: [
      { texto: "El fondo dorado", puntos: 38 },
      { texto: "Los mosaicos", puntos: 27 },
      { texto: "Los íconos religiosos", puntos: 20 },
      { texto: "Las cúpulas", puntos: 10 },
      { texto: "Las inscripciones griegas", puntos: 5 },
    ],
  },
  {
    categoria: "Arte Bizantino",
    pregunta: "El templo más representativo del arte bizantino es...",
    respuestas: [
      { texto: "Santa Sofía", puntos: 52 },
      { texto: "San Marcos de Venecia", puntos: 21 },
      { texto: "San Vital de Rávena", puntos: 15 },
      { texto: "La Capilla Palatina", puntos: 8 },
      { texto: "El Monasterio de Santa Catalina", puntos: 4 },
    ],
  },
  {
    categoria: "Arte Bizantino",
    pregunta: "El arte bizantino se caracteriza por figuras...",
    respuestas: [
      { texto: "Rígidas y frontales", puntos: 45 },
      { texto: "Alargadas", puntos: 25 },
      { texto: "Sin volumen", puntos: 18 },
      { texto: "Con halos dorados", puntos: 8 },
      { texto: "Simbólicas, no realistas", puntos: 4 },
    ],
  },
  {
    categoria: "Arte Bizantino",
    pregunta: "La técnica más usada para decorar interiores bizantinos era...",
    respuestas: [
      { texto: "El mosaico", puntos: 60 },
      { texto: "La pintura al fresco", puntos: 20 },
      { texto: "El icono en madera", puntos: 12 },
      { texto: "El relieve en marfil", puntos: 5 },
      { texto: "El vitral", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Bizantino",
    pregunta: "El emperador que más impulsó el arte bizantino fue...",
    respuestas: [
      { texto: "Justiniano", puntos: 55 },
      { texto: "Constantino", puntos: 30 },
      { texto: "Teodosio", puntos: 8 },
      { texto: "Basilio II", puntos: 5 },
      { texto: "Heraclio", puntos: 2 },
    ],
  },
  {
    categoria: "Arte Bizantino",
    pregunta: "Una imagen religiosa bizantina pintada sobre tabla se llama...",
    respuestas: [
      { texto: "Icono", puntos: 70 },
      { texto: "Fresco", puntos: 12 },
      { texto: "Retablo", puntos: 10 },
      { texto: "Ábside", puntos: 5 },
      { texto: "Díptico", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Bizantino",
    pregunta: "El arte bizantino tuvo su origen en la ciudad de...",
    respuestas: [
      { texto: "Constantinopla", puntos: 58 },
      { texto: "Roma", puntos: 20 },
      { texto: "Rávena", puntos: 12 },
      { texto: "Atenas", puntos: 6 },
      { texto: "Alejandría", puntos: 4 },
    ],
  },

  // ---------------- ARTE ROMÁNTICO ----------------
  {
    categoria: "Arte Romántico",
    pregunta: "El pintor romántico más famoso es...",
    respuestas: [
      { texto: "Francisco de Goya", puntos: 35 },
      { texto: "Eugène Delacroix", puntos: 28 },
      { texto: "Caspar David Friedrich", puntos: 20 },
      { texto: "Théodore Géricault", puntos: 12 },
      { texto: "William Turner", puntos: 5 },
    ],
  },
  {
    categoria: "Arte Romántico",
    pregunta: "El Romanticismo, a diferencia del Neoclasicismo, le da más importancia a...",
    respuestas: [
      { texto: "Las emociones", puntos: 50 },
      { texto: "La naturaleza", puntos: 25 },
      { texto: "La imaginación", puntos: 15 },
      { texto: "El individuo", puntos: 7 },
      { texto: "Lo exótico", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Romántico",
    pregunta: "Una obra romántica muy famosa es...",
    respuestas: [
      { texto: "\"La libertad guiando al pueblo\"", puntos: 40 },
      { texto: "\"La balsa de la Medusa\"", puntos: 27 },
      { texto: "\"El caminante sobre el mar de nubes\"", puntos: 18 },
      { texto: "\"Saturno devorando a su hijo\"", puntos: 10 },
      { texto: "\"El tres de mayo\"", puntos: 5 },
    ],
  },
  {
    categoria: "Arte Romántico",
    pregunta: "El Romanticismo surgió principalmente como reacción contra...",
    respuestas: [
      { texto: "El Neoclasicismo", puntos: 48 },
      { texto: "La razón ilustrada", puntos: 25 },
      { texto: "El academicismo", puntos: 15 },
      { texto: "El orden napoleónico", puntos: 8 },
      { texto: "El clasicismo grecorromano", puntos: 4 },
    ],
  },
  {
    categoria: "Arte Romántico",
    pregunta: "En la pintura romántica, el color se usa para...",
    respuestas: [
      { texto: "Transmitir emoción", puntos: 45 },
      { texto: "Crear dramatismo", puntos: 30 },
      { texto: "Resaltar contrastes de luz", puntos: 15 },
      { texto: "Representar lo sublime", puntos: 7 },
      { texto: "Dar movimiento", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Romántico",
    pregunta: "Un tema recurrente en el arte romántico es...",
    respuestas: [
      { texto: "La naturaleza salvaje", puntos: 33 },
      { texto: "Lo sobrenatural y lo misterioso", puntos: 25 },
      { texto: "Las revoluciones y la libertad", puntos: 22 },
      { texto: "Los sueños y pesadillas", puntos: 12 },
      { texto: "El pasado medieval", puntos: 8 },
    ],
  },
  {
    categoria: "Arte Romántico",
    pregunta: "El movimiento romántico se desarrolló principalmente durante...",
    respuestas: [
      { texto: "Finales del siglo XVIII e inicios del XIX", puntos: 60 },
      { texto: "Todo el siglo XIX", puntos: 20 },
      { texto: "Principios del siglo XVIII", puntos: 10 },
      { texto: "Finales del siglo XIX", puntos: 7 },
      { texto: "Siglo XX", puntos: 3 },
    ],
  },

  // ---------------- ARTE BARROCO ----------------
  {
    categoria: "Arte Barroco",
    pregunta: "El pintor barroco más famoso es...",
    respuestas: [
      { texto: "Caravaggio", puntos: 35 },
      { texto: "Diego Velázquez", puntos: 25 },
      { texto: "Rembrandt", puntos: 20 },
      { texto: "Peter Paul Rubens", puntos: 15 },
      { texto: "Bernini", puntos: 5 },
    ],
  },
  {
    categoria: "Arte Barroco",
    pregunta: "La técnica de luces y sombras muy marcadas se llama...",
    respuestas: [
      { texto: "Claroscuro", puntos: 65 },
      { texto: "Tenebrismo", puntos: 20 },
      { texto: "Sfumato", puntos: 8 },
      { texto: "Esgrafiado", puntos: 4 },
      { texto: "Veladura", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Barroco",
    pregunta: "Una obra barroca muy conocida es...",
    respuestas: [
      { texto: "\"Las Meninas\"", puntos: 42 },
      { texto: "\"La ronda de noche\"", puntos: 25 },
      { texto: "\"El éxtasis de Santa Teresa\"", puntos: 18 },
      { texto: "\"La vocación de San Mateo\"", puntos: 10 },
      { texto: "\"El jardín de las delicias\"", puntos: 5 },
    ],
  },
  {
    categoria: "Arte Barroco",
    pregunta: "El arte barroco se caracteriza por...",
    respuestas: [
      { texto: "El movimiento y el dramatismo", puntos: 40 },
      { texto: "La exageración y el ornamento", puntos: 25 },
      { texto: "Los contrastes de luz", puntos: 20 },
      { texto: "La emoción religiosa", puntos: 10 },
      { texto: "La grandiosidad", puntos: 5 },
    ],
  },
  {
    categoria: "Arte Barroco",
    pregunta: "El Barroco se impulsó fuertemente gracias a...",
    respuestas: [
      { texto: "La Iglesia Católica", puntos: 55 },
      { texto: "La Contrarreforma", puntos: 25 },
      { texto: "Las monarquías absolutas", puntos: 12 },
      { texto: "La burguesía", puntos: 5 },
      { texto: "Los mecenas italianos", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Barroco",
    pregunta: "El escultor y arquitecto más importante del Barroco italiano fue...",
    respuestas: [
      { texto: "Gian Lorenzo Bernini", puntos: 68 },
      { texto: "Francesco Borromini", puntos: 18 },
      { texto: "Pietro da Cortona", puntos: 7 },
      { texto: "Carlo Maderno", puntos: 5 },
      { texto: "Alessandro Algardi", puntos: 2 },
    ],
  },
  {
    categoria: "Arte Barroco",
    pregunta: "El Barroco se originó en...",
    respuestas: [
      { texto: "Italia", puntos: 62 },
      { texto: "España", puntos: 20 },
      { texto: "Flandes", puntos: 10 },
      { texto: "Francia", puntos: 5 },
      { texto: "Holanda", puntos: 3 },
    ],
  },

  // ---------------- RENACIMIENTO ----------------
  {
    categoria: "Renacimiento",
    pregunta: "El artista más representativo del Renacimiento es...",
    respuestas: [
      { texto: "Leonardo da Vinci", puntos: 45 },
      { texto: "Miguel Ángel", puntos: 30 },
      { texto: "Rafael", puntos: 15 },
      { texto: "Botticelli", puntos: 6 },
      { texto: "Donatello", puntos: 4 },
    ],
  },
  {
    categoria: "Renacimiento",
    pregunta: "La obra renacentista más famosa del mundo es...",
    respuestas: [
      { texto: "La Mona Lisa", puntos: 55 },
      { texto: "La Capilla Sixtina", puntos: 22 },
      { texto: "El nacimiento de Venus", puntos: 12 },
      { texto: "La última cena", puntos: 8 },
      { texto: "El David", puntos: 3 },
    ],
  },
  {
    categoria: "Renacimiento",
    pregunta: "El Renacimiento se caracteriza por retomar...",
    respuestas: [
      { texto: "El arte grecorromano", puntos: 50 },
      { texto: "La perspectiva y la proporción", puntos: 25 },
      { texto: "El humanismo", puntos: 15 },
      { texto: "La anatomía realista", puntos: 7 },
      { texto: "La razón sobre lo divino", puntos: 3 },
    ],
  },
  {
    categoria: "Renacimiento",
    pregunta: "La técnica que da profundidad y realismo a las pinturas renacentistas es...",
    respuestas: [
      { texto: "La perspectiva lineal", puntos: 55 },
      { texto: "El sfumato", puntos: 20 },
      { texto: "El escorzo", puntos: 12 },
      { texto: "La proporción áurea", puntos: 8 },
      { texto: "El claroscuro", puntos: 5 },
    ],
  },
  {
    categoria: "Renacimiento",
    pregunta: "El Renacimiento nació en...",
    respuestas: [
      { texto: "Florencia", puntos: 60 },
      { texto: "Roma", puntos: 20 },
      { texto: "Venecia", puntos: 10 },
      { texto: "Milán", puntos: 6 },
      { texto: "Nápoles", puntos: 4 },
    ],
  },
  {
    categoria: "Renacimiento",
    pregunta: "Los mecenas más importantes del Renacimiento fueron...",
    respuestas: [
      { texto: "Los Médici", puntos: 65 },
      { texto: "El Papado", puntos: 20 },
      { texto: "Los Sforza", puntos: 8 },
      { texto: "Los Este", puntos: 4 },
      { texto: "Los Gonzaga", puntos: 3 },
    ],
  },
  {
    categoria: "Renacimiento",
    pregunta: "El \"hombre renacentista\" se refiere a alguien que...",
    respuestas: [
      { texto: "Domina varias disciplinas (arte, ciencia, etc.)", puntos: 60 },
      { texto: "Es culto y refinado", puntos: 20 },
      { texto: "Cree en el humanismo", puntos: 12 },
      { texto: "Estudia la antigüedad clásica", puntos: 5 },
      { texto: "Es un genio universal", puntos: 3 },
    ],
  },

  // ---------------- ARTE NEOCLÁSICO ----------------
  {
    categoria: "Arte Neoclásico",
    pregunta: "El pintor neoclásico más importante es...",
    respuestas: [
      { texto: "Jacques-Louis David", puntos: 55 },
      { texto: "Jean-Auguste-Dominique Ingres", puntos: 25 },
      { texto: "Anton Raphael Mengs", puntos: 12 },
      { texto: "Antonio Canova (escultor)", puntos: 5 },
      { texto: "Angelica Kauffman", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Neoclásico",
    pregunta: "El Neoclasicismo retoma como modelo el arte de...",
    respuestas: [
      { texto: "Grecia y Roma", puntos: 65 },
      { texto: "El Renacimiento", puntos: 20 },
      { texto: "Egipto", puntos: 8 },
      { texto: "El Barroco", puntos: 4 },
      { texto: "Bizancio", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Neoclásico",
    pregunta: "Una obra neoclásica muy conocida es...",
    respuestas: [
      { texto: "\"El juramento de los Horacios\"", puntos: 40 },
      { texto: "\"La muerte de Marat\"", puntos: 25 },
      { texto: "\"La coronación de Napoleón\"", puntos: 20 },
      { texto: "\"Psique reanimada por el beso de Amor\"", puntos: 10 },
      { texto: "\"La gran odalisca\"", puntos: 5 },
    ],
  },
  {
    categoria: "Arte Neoclásico",
    pregunta: "El arte neoclásico se caracteriza por...",
    respuestas: [
      { texto: "Líneas claras y orden", puntos: 42 },
      { texto: "Temas heroicos y morales", puntos: 25 },
      { texto: "La simetría y el equilibrio", puntos: 18 },
      { texto: "La sobriedad frente al Barroco", puntos: 10 },
      { texto: "El uso de la razón", puntos: 5 },
    ],
  },
  {
    categoria: "Arte Neoclásico",
    pregunta: "El Neoclasicismo surgió como reacción contra...",
    respuestas: [
      { texto: "El Barroco y el Rococó", puntos: 60 },
      { texto: "El exceso ornamental", puntos: 22 },
      { texto: "El absolutismo", puntos: 10 },
      { texto: "El arte religioso", puntos: 5 },
      { texto: "El Romanticismo", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Neoclásico",
    pregunta: "El Neoclasicismo estuvo muy ligado al pensamiento de...",
    respuestas: [
      { texto: "La Ilustración", puntos: 60 },
      { texto: "La Revolución Francesa", puntos: 25 },
      { texto: "El racionalismo", puntos: 8 },
      { texto: "El humanismo", puntos: 4 },
      { texto: "El liberalismo", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Neoclásico",
    pregunta: "El Neoclasicismo se desarrolló principalmente en el siglo...",
    respuestas: [
      { texto: "XVIII", puntos: 55 },
      { texto: "XIX (inicios)", puntos: 30 },
      { texto: "XVII", puntos: 8 },
      { texto: "XX", puntos: 4 },
      { texto: "XVI", puntos: 3 },
    ],
  },

  // ---------------- ARTE GÓTICO ----------------
  {
    categoria: "Arte Gótico",
    pregunta: "El elemento arquitectónico más representativo del Gótico es...",
    respuestas: [
      { texto: "El arco ojival", puntos: 40 },
      { texto: "Los vitrales", puntos: 28 },
      { texto: "Las bóvedas de crucería", puntos: 18 },
      { texto: "Los arbotantes", puntos: 10 },
      { texto: "Las gárgolas", puntos: 4 },
    ],
  },
  {
    categoria: "Arte Gótico",
    pregunta: "La catedral gótica más famosa es...",
    respuestas: [
      { texto: "Notre Dame de París", puntos: 50 },
      { texto: "La catedral de Chartres", puntos: 20 },
      { texto: "La catedral de Colonia", puntos: 15 },
      { texto: "La catedral de Milán", puntos: 10 },
      { texto: "La catedral de Reims", puntos: 5 },
    ],
  },
  {
    categoria: "Arte Gótico",
    pregunta: "El arte gótico sucede cronológicamente al arte...",
    respuestas: [
      { texto: "Románico", puntos: 70 },
      { texto: "Bizantino", puntos: 15 },
      { texto: "Renacentista", puntos: 8 },
      { texto: "Clásico", puntos: 4 },
      { texto: "Barroco", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Gótico",
    pregunta: "Los vitrales góticos se usaban principalmente para...",
    respuestas: [
      { texto: "Dejar entrar luz de colores", puntos: 40 },
      { texto: "Contar historias bíblicas", puntos: 35 },
      { texto: "Decorar los templos", puntos: 15 },
      { texto: "Simbolizar lo divino", puntos: 7 },
      { texto: "Reemplazar los muros", puntos: 3 },
    ],
  },
  {
    categoria: "Arte Gótico",
    pregunta: "El arte gótico se caracteriza por buscar...",
    respuestas: [
      { texto: "Verticalidad y elevación", puntos: 45 },
      { texto: "Luz y luminosidad", puntos: 25 },
      { texto: "Delicadeza en las figuras", puntos: 15 },
      { texto: "Espiritualidad", puntos: 10 },
      { texto: "Ornamentación detallada", puntos: 5 },
    ],
  },
  {
    categoria: "Arte Gótico",
    pregunta: "El estilo gótico surgió en...",
    respuestas: [
      { texto: "Francia", puntos: 62 },
      { texto: "Alemania", puntos: 15 },
      { texto: "Inglaterra", puntos: 10 },
      { texto: "Italia", puntos: 8 },
      { texto: "España", puntos: 5 },
    ],
  },
  {
    categoria: "Arte Gótico",
    pregunta: "En la escultura gótica, las figuras a diferencia del Románico son...",
    respuestas: [
      { texto: "Más naturales y expresivas", puntos: 50 },
      { texto: "Más estilizadas y elegantes", puntos: 25 },
      { texto: "Con mayor movimiento", puntos: 15 },
      { texto: "Más humanas", puntos: 7 },
      { texto: "Menos rígidas", puntos: 3 },
    ],
  },
];