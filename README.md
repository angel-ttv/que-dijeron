# ¿Qué Dijeron? — Juego estilo "100 mexicanos dijeron" (rescatado 6 nov 2026)

Dos pantallas sincronizadas con Firebase Realtime Database (`juego100/estado`).

- `public.html` + `public.js` — pantalla pública: marcador de 2 equipos, ronda, strikes, respuestas.
- `admin.html` + `admin.js` + `admin.css` — panel de control: nombres de equipos, elegir pregunta por categoría, careo, revelar respuestas, strikes, robo, terminar y reiniciar.
- `preguntas.js` — 42 preguntas de Historia del Arte (Arte Bizantino, etc.).
- `juego.js` — 4 preguntas generales (Revolución Mexicana, destinos de Quintana Roo, tabla periódica).
- `firebase-config.js` — plantilla con valores por reemplazar (poner los de tu proyecto Firebase) y `INSTRUCCIONES.md` mencionado ahí (no se subió).
- `estilo.css` — estilos de la pantalla pública.

Nota: el contenido de las preguntas vive local en cada pantalla; por Firebase solo se sincroniza el índice de la pregunta y el estado del juego.
