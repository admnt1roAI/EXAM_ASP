/***********************
  script.js - Banco 100 preguntas bomberiles -> mostrar 20 aleatorias
  Comentado línea por línea (explicación en cada sección)
  - Tipo: opción múltiple 4 alternativas (a,b,c,d)
  - Modo: mostrar explicación de cada respuesta después del examen
  - Corrección: puntaje guardado como número de aciertos (ej. 9) en el CSV
***********************/

/* --------------------
   BANCO: 100 preguntas (mezcladas, en español)
   Cada objeto: { id, q, options: [a,b,c,d], answer: 'a'|'b'|'c'|'d', explanation }
   Temática: Bomberos (incendios, HAZMAT, SCBA, primeros auxilios, rescate, etc.)
   -------------------- */
// Banco de preguntas CGBVP - 100 preguntas (formato JS listo para Apps Script)
const PREGUNTAS_100 = [
  {id:1, q:"¿Fundación de la primera compañía de bomberos del Perú?", options:["1860","1870","1880","1890"], answer:"a", explanation:"La primera compañía de bomberos del Perú fue fundada en 1860."},
  {id:2, q:"¿Quiénes fueron los 13 Garibaldinos?", options:["Grupo de bomberos italianos que llegaron al Perú en el siglo XIX.","Grupo de bomberos peruanos que fundaron la primera compañía de bomberos del país.","Grupo de bomberos que lucharon en la Guerra del Pacífico.","Grupo de bomberos de la ciudad de Garibaldi en Italia."], answer:"a", explanation:"Los 13 Garibaldinos fueron bomberos italianos que fundaron la primera compañía del Perú."},
  {id:3, q:"¿Quiénes fueron los héroes de Plumereros?", options:["Bomberos que participaron en la lucha contra incendios en Lima en 1868.","Bomberos que combatieron en la Batalla de Plumerillo en Argentina.","Bomberos que salvaron a una familia de un incendio en la fábrica de Plumereros.","Bomberos que recibieron una medalla de honor por su valentía."], answer:"a", explanation:"Los héroes de Plumereros participaron en el incendio de Lima en 1868."},
  {id:4, q:"¿Quién fue el primer héroe del CGBVP?", options:["Félix Larrabure y Unanue","Néstor Gambetta","José Villalta","Pedro Ruiz Gallo"], answer:"b", explanation:"Néstor Gambetta es considerado el primer héroe del CGBVP."},
  {id:5, q:"¿Qué es mística en el CGBVP?", options:["Los valores, principios y sentido de pertenencia que caracterizan a la institución y a sus miembros.","Un tipo de entrenamiento físico para bomberos.","Una técnica de rescate en situaciones de emergencia.","La organización interna del Cuerpo General de Bomberos Voluntarios del Perú."], answer:"a", explanation:"La mística representa los valores y el sentido de pertenencia en el CGBVP."},
  {id:6, q:"¿Qué es mística en el CGBVP?", options:["Los valores, principios y sentido de pertenencia que caracterizan a la institución y a sus miembros.","Un tipo de entrenamiento físico para bomberos.","Una técnica de rescate en situaciones de emergencia.","La organización interna del Cuerpo General de Bomberos Voluntarios del Perú."], answer:"a", explanation:"La mística bomberil es el conjunto de valores y principios del bombero voluntario."},
  {id:7, q:"¿Grado y nombre del Comandante General del CGBVP?", options:["Brigadier General CBP Juan Carlos Morales Carpio","Brigadier Mayor CBP José Luis Paredes Ramos","Brigadier CBP Ricardo Gómez Huamán","Coronel CBP Alfredo Torres Meléndez"], answer:"a", explanation:"El Comandante General del CGBVP es el Brigadier General CBP Juan Carlos Morales Carpio."},
  {id:8, q:"¿Grado y nombre del Director General de Formación Académica del CGBVP?", options:["Brigadier Mayor CBP Carlos Alberto Malpica Coronado","Brigadier Mayor CBP Rocío Valentina Bayona Aranda","Brigadier CBP Luis Alberto Quispe Chávez","Comandante CBP Miguel Torres Aguilar"], answer:"a", explanation:"El Director General de Formación Académica del CGBVP es el Brigadier Mayor CBP Carlos Alberto Malpica Coronado."},
  {id:9, q:"¿Grado y nombre del Director General de Voluntariado del CGBVP?", options:["Brigadier Mayor CBP Jaime Martín Palacios Ferrari","Brigadier CBP Juan Pérez Vargas","Brigadier CBP Ricardo Díaz López","Comandante CBP Julio César Herrera Soto"], answer:"a", explanation:"El Director General de Voluntariado del CGBVP es el Brigadier Mayor CBP Jaime Martín Palacios Ferrari."},
  {id:10, q:"¿Grado y nombre del Inspector General del CGBVP?", options:["Brigadier Mayor CBP José Antonio Palacios Molinelli","Brigadier CBP Luis Enrique Tapia Ramos","Brigadier CBP Manuel Delgado Rojas","Comandante CBP Mario Torres Guzmán"], answer:"a", explanation:"El Inspector General del CGBVP es el Brigadier Mayor CBP José Antonio Palacios Molinelli."},
  {id:11, q:"¿Grado y nombre del Presidente del Consejo Nacional de Disciplina del CGBVP?", options:["CBP Jorge Artemio Jhong Valdez","Brigadier CBP Luis Vargas León","Comandante CBP Carlos Mendoza Flores","CBP Alberto Rojas Gamarra"], answer:"a", explanation:"El Presidente del Consejo Nacional de Disciplina del CGBVP es el CBP Jorge Artemio Jhong Valdez."},
  {id:12, q:"¿Grado y nombre del Director General de Operaciones del CGBVP?", options:["Brigadier Mayor CBP José Máximo Obando Morgan","Brigadier CBP Miguel Ángel Cárdenas Núñez","Comandante CBP Henry Villalobos Pacheco","Brigadier CBP Pedro Morales Gonzales"], answer:"a", explanation:"El Director General de Operaciones del CGBVP es el Brigadier Mayor CBP José Máximo Obando Morgan."},
  {id:13, q:"¿Qué son las Comandancias Departamentales?", options:["Sedes regionales del CGBVP ubicadas en diferentes partes del país.","Instituciones educativas para la formación de bomberos.","Grupos de trabajo en la prevención de incendios.","Equipos especializados en rescate de montaña."], answer:"a", explanation:"Las Comandancias Departamentales son sedes regionales del CGBVP."},
  {id:14, q:"¿Cuándo se celebra el Día del Bombero Veterano?", options:["14 de junio","8 de diciembre","1 de mayo","25 de octubre"], answer:"a", explanation:"El Día del Bombero Veterano se celebra el 14 de junio."},
  {id:15, q:"¿Himno del Bombero, autor y letra?", options:["Himno al Bombero Voluntario, autor: Luis A. Motta, letra: Mario Altamirano","Canción del Bombero, autor: Pedro Rodríguez, letra: José Pérez","Marcha del Bombero Peruano, autor: Juan López, letra: Carlos Gómez","Himno de los Voluntarios del Fuego, autor: José Martínez, letra: Manuel García"], answer:"a", explanation:"El Himno al Bombero Voluntario fue creado por Luis A. Motta con letra de Mario Altamirano."},
  {id:16, q:"¿Cuáles son los símbolos institucionales del CGBVP?", options:["El escudo, la bandera y el himno.","El uniforme, el casco y la manguera.","La sirena, el camión y el extintor.","El emblema, el uniforme y la insignia."], answer:"a", explanation:"Los símbolos institucionales del CGBVP son el escudo, la bandera y el himno."},
  {id:17, q:"¿Qué establece el Decreto Legislativo 1260?", options:["Establece el marco normativo para el Cuerpo General de Bomberos Voluntarios del Perú.","Regula el funcionamiento de las empresas de seguridad privada en el país.","Define las normas de tránsito para vehículos de emergencia.","Establece el sistema de jubilaciones para bomberos."], answer:"a", explanation:"El Decreto Legislativo 1260 establece el marco legal del CGBVP."},
  {id:18, q:"¿Qué es el CGBVP?", options:["Una institución encargada de brindar servicios de prevención y extinción de incendios en el Perú.","Un grupo de voluntarios dedicados a la limpieza de playas.","Una organización religiosa.","Un club deportivo."], answer:"a", explanation:"El CGBVP es una institución pública de servicio voluntario dedicada a la prevención y atención de emergencias."},
  {id:19, q:"¿Qué es la Intendencia Nacional de Bomberos?", options:["El órgano encargado de coordinar y supervisar las actividades bomberiles en el Perú.","Una asociación de bomberos a nivel internacional.","Una ONG dedicada al cuidado del medio ambiente.","Un instituto de investigación científica."], answer:"a", explanation:"La Intendencia Nacional de Bomberos coordina y supervisa las actividades bomberiles en el país."},
  {id:20, q:"¿Cuál es el significado de las siglas 'UBO'?", options:["Unidad de Bomberos Operativos","Unión de Bomberos Oficiales","Unidad de Búsqueda y Rescate","Unión de Bomberos Voluntarios"], answer:"a", explanation:"UBO significa Unidad Básica Operativa, el nivel operativo más básico del CGBVP."},
  {id:21, q:"¿Qué incluye la estructura orgánica del CGBVP?", options:["Distintas direcciones, departamentos y unidades encargadas de diferentes funciones dentro de la institución.","Solo un comandante general.","No tiene estructura definida.","Se compone de brigadas independientes."], answer:"a", explanation:"La estructura del CGBVP está organizada en direcciones, departamentos y unidades."},
  {id:22, q:"¿Cuándo se celebra el Día del Bombero Peruano?", options:["5 de diciembre","14 de junio","21 de marzo","25 de octubre"], answer:"a", explanation:"El Día del Bombero Peruano se celebra el 5 de diciembre."},
  {id:23, q:"¿Qué determina el orden jerárquico en el CGBVP?", options:["Los distintos grados y rangos que ostentan sus miembros.","La antigüedad de servicio.","Por sorteo.","Todos los bomberos tienen el mismo rango."], answer:"a", explanation:"El orden jerárquico del CGBVP está determinado por grados y rangos institucionales."},
  {id:24, q:"¿Cuáles son las sanciones disciplinarias en el CGBVP?", options:["Desde amonestaciones verbales hasta suspensiones temporales o expulsiones.","Solo se aplica la expulsión.","No hay sanciones disciplinarias.","Solo se aplica la amonestación."], answer:"a", explanation:"Las sanciones van desde amonestaciones hasta suspensiones o expulsiones según la gravedad."},
  {id:25, q:"¿Qué son las Comandancias Territoriales del CGBVP?", options:["Sedes regionales ubicadas en diferentes partes del país.","Unidades móviles de rescate.","Bases de entrenamiento de bomberos.","Cuarteles principales del CGBVP."], answer:"a", explanation:"Las Comandancias Territoriales son sedes regionales que coordinan operaciones por zonas."},
  {id:26, q:"Según el código de ética del CGBVP, ¿qué representa el respeto?", options:["Uno de los principios fundamentales del comportamiento bomberil.","No se menciona el respeto en el código de ética.","Solo se aplica a las autoridades.","Solo se aplica a los superiores."], answer:"a", explanation:"El respeto es un valor esencial dentro del código de ética del CGBVP."},
  {id:27, q:"¿Quién fue el primer Comandante General del CGBVP?", options:["Félix Larrabure y Unanue","José Villalta","Néstor Gambetta","Pedro Ruiz Gallo"], answer:"a", explanation:"El primer Comandante General del CGBVP fue Félix Larrabure y Unanue."},
  {id:28, q:"¿Cómo se llamaba inicialmente el Día del Bombero Voluntario del Perú?", options:["Día del Bombero Voluntario del Perú","Día del Bombero Heroico","Día del Bombero Solidario","Día del Bombero Voluntario y Heroico"], answer:"b", explanation:"Inicialmente fue llamado Día del Bombero Heroico."},
  {id:29, q:"¿En qué año se reglamentó el lema institucional 'Dios, Patria, Humanidad'?", options:["2007","1990","2015","1985"], answer:"a", explanation:"El lema institucional fue reglamentado en el año 2007."},
  {id:30, q:"¿Cuáles son los elementos de la comunicación?", options:["Emisor, receptor, mensaje, canal, código y contexto.","Solo el intercambio verbal.","No tiene elementos específicos.","Solo incluye emisor y receptor."], answer:"a", explanation:"La comunicación incluye emisor, receptor, mensaje, canal, código y contexto."}
];


/* --------------------
   UTILIDADES (funciones de ayuda)
   - shuffleArray: mezcla un array (Fisher-Yates)
   - csvEscape: escapa correctamente cada campo para CSV
   -------------------- */

// Mezcla (Fisher-Yates) para obtener orden aleatorio de preguntas
function shuffleArray(arr){
  const a = arr.slice(); // clona para no modificar array original
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a; // devuelve copia mezclada
}

// Escapa un campo para CSV: duplica comillas internas y encierra todo entre comillas
function csvEscape(value){
  if (value === null || value === undefined) return '""';
  const s = String(value);
  return '"' + s.replace(/"/g, '""') + '"';
}

/* --------------------
   LÓGICA DE PREGUNTAS:
   - seleccionar 20 preguntas aleatorias del banco de 100
   - renderizar esas 20 en la página
   -------------------- */

let preguntasMostradas = [];           // array con las 20 preguntas que se muestran
const TOTAL_MUESTRA = 30;              // número de preguntas por examen (20)

function generarPreguntasAleatorias(){
  // mezclamos todo el banco y tomamos los primeros TOTAL_MUESTRA
  const shuffled = shuffleArray(PREGUNTAS_100);
  preguntasMostradas = shuffled.slice(0, TOTAL_MUESTRA).map((p, idx) => {
    // añadimos displayIndex para referencia en UI (1..20)
    return Object.assign({}, p, { displayIndex: idx + 1 });
  });
}

// Renderiza las preguntas en el contenedor con id 'questions-list'
function renderPreguntas(){
  const container = document.getElementById('questions-list');
  if (!container) return; // si no existe el contenedor, salimos
  container.innerHTML = ""; // limpiamos
  preguntasMostradas.forEach((p, idx) => {
    const qid = `q${idx+1}`; // name para los input radio (q1..q20)
    const div = document.createElement('div');
    div.className = 'q-card';
    // Construimos HTML de las 4 opciones
    const optsHtml = p.options.map((opt, i) => {
      const val = ['a','b','c','d','e'][i];
      // label con input radio y texto de opción
      return `<label class="opt"><input type="radio" name="${qid}" value="${val}"> ${val}) ${opt}</label>`;
    }).join("");
    // Estructura de la tarjeta de pregunta (incluye ID original)
    div.innerHTML = `
      <div class="q-head">
        <div class="q-title">Pregunta ${idx+1}</div>
        <div class="muted">ID:${p.id}</div>
      </div>
      <div style="margin-top:6px;">${p.q}</div>
      <div class="options">${optsHtml}</div>
    `;
    container.appendChild(div);
  });
}

/* Inicialización: generar y renderizar examen al cargar el script */
function initExam(){
  generarPreguntasAleatorias();
  renderPreguntas();
  const resultadoDiv = document.getElementById('resultado');
  if (resultadoDiv) resultadoDiv.innerHTML = ""; // limpiar resultados previos
}
initExam();

/* --------------------
   FUNCIONALIDAD: recoger respuestas, evaluar, construir CSV y descargar
   - obtenerRespuestas: lee radios seleccionados
   - evaluar: compara con respuestas correctas y construye detalles
   - construirEncabezadoCSV / construirFilaCSV: forman contenido CSV
   -------------------- */

// Obtener respuestas seleccionadas en la UI (array de 20 valores 'a'|'b'|'c'|'d' o "" si no contestó)
function obtenerRespuestas(){
  const respuestas = [];
  for (let i = 0; i < TOTAL_MUESTRA; i++){
    const name = `q${i+1}`;
    const sel = document.querySelector(`input[name="${name}"]:checked`);
    respuestas.push(sel ? sel.value : "");
  }
  return respuestas;
}

// Evaluar respuestas: devuelve puntaje (número de aciertos) y detalles por pregunta
function evaluar(respuestas){
  let puntaje = 0;             // contador de aciertos
  const detalles = [];         // detalles para revisión/explanación
  for (let i = 0; i < TOTAL_MUESTRA; i++){
    const p = preguntasMostradas[i];            // pregunta mostrada en la posición i
    const selected = respuestas[i] || "";       // respuesta seleccionada por el usuario
    const correctLetter = p.answer;             // letra correcta del banco
    const correct = selected && selected === correctLetter; // booleano
    if (correct) puntaje++;                     // si acierta, incrementa puntaje
    // agregamos detalle para la revisión posterior
    detalles.push({
      id: p.id,
      preguntaIndex: i + 1,
      selected: selected,
      correct: correct,
      correctLetter: correctLetter,
      explanation: p.explanation,
      opciones: p.options
    });
  }
  return { puntaje, detalles };
}

// Construir encabezado CSV dinámico (FECHA, NOMBRE, DNI, PUNTAJE, luego Q1_ID,Q1_RESP,Q1_CORR, ... Q20_ID,Q20_RESP,Q20_CORR)
function construirEncabezadoCSV(){
  const headers = ["FECHA","APELLIDOS Y NOMBRES","DNI","PUNTAJE"];
  for (let i = 1; i <= TOTAL_MUESTRA; i++){
    headers.push(`Q${i}_ID`);
    headers.push(`Q${i}_RESP`);
    headers.push(`Q${i}_CORR`);
  }
  return headers.join(",") + "\r\n"; // CRLF para compatibilidad con Excel en Windows
}

// Construir la fila CSV con los datos del examen: FECHA, NOMBRE, DNI, PUNTAJE (como número) y detalles por pregunta
function construirFilaCSV(fecha, nombre, dni, resultadoEval){
  const row = [];
  // Fecha y datos básicos (escapados para CSV)
  row.push(csvEscape(fecha));
  row.push(csvEscape(nombre));
  row.push(csvEscape(dni));
  // ---------- CORRECCIÓN SOLICITADA ----------
  // Guardar solo el número de aciertos como valor numérico (sin comillas) para evitar cualquier
  // interpretación como fecha. No usamos csvEscape() aquí para que el campo quede sin comillas
  // y Excel lo reconozca como número directamente. Ejemplo: 9
  row.push(String(resultadoEval.puntaje)); // convertimos a string sin escapar (sin comillas en CSV)
  // Añadimos por cada pregunta: ID, respuesta del examinado y si estuvo correcta (SI/NO)
  resultadoEval.detalles.forEach(d => {
    row.push(csvEscape(d.id));                // ID de la pregunta (escapado por si acaso)
    row.push(csvEscape(d.selected || ""));    // respuesta seleccionada
    row.push(csvEscape(d.correct ? "SI" : "NO")); // SI/NO para indicar acierto
  });
  return row.join(",") + "\r\n";
}

/* --------------------
   EVENTOS: botones Guardar, Ver Puntuación y Reiniciar
   - 'guardar': evalúa, muestra explicaciones y descarga CSV
   - 'verPuntuacion': muestra puntaje actual en alerta
   - 'reiniciar': genera nuevas 20 preguntas
   -------------------- */

// Evento GUARDAR: valida datos, evalúa, muestra explicación y descarga CSV
document.getElementById('guardar').addEventListener('click', function(){
  // Tomamos nombre y dni desde inputs (validación simple)
  const nombreEl = document.getElementById('nombre');
  const dniEl = document.getElementById('dni');
  const nombre = nombreEl ? (nombreEl.value || "").trim() : "";
  const dni = dniEl ? (dniEl.value || "").trim() : "";

  // Validación básica: ambos campos obligatorios
  if (!nombre || !dni){
    alert("Por favor complete APELLIDOS Y NOMBRES y DNI.");
    return;
  }

  // Recolectar respuestas
  const respuestas = obtenerRespuestas();
  
  // ✅ NUEVA VALIDACIÓN: Verificar que todas las preguntas estén respondidas
  const preguntasSinResponder = respuestas.filter(resp => resp === "").length;
  if (preguntasSinResponder > 0) {
    alert(`Falta seleccionar respuestas. Tiene ${preguntasSinResponder} pregunta(s) sin responder.`);
    return;
  }

  // Evaluar respuestas
  const resultado = evaluar(respuestas);

  // Formatear fecha local en formato YYYY-MM-DD HH:MM:SS (sin comas)
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const fecha = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

  // ---------- Mostrar resultados y explicaciones en la página ----------
  const resultadoDiv = document.getElementById('resultado');
  let html = `<div style="margin-bottom:8px;"><strong>Tu puntaje:</strong> ${resultado.puntaje} / ${TOTAL_MUESTRA}</div>`;
  html += `<div style="font-size:13px; color:#374151; margin-bottom:8px;">Fecha: ${fecha}</div>`;
  html += `<div>`;
  // Iteramos detalles para mostrar respuesta seleccionada, correcta y explicación
  resultado.detalles.forEach((d) => {
    const correctaLetra = d.correctLetter;
    const correctaTexto = d.opciones[['a','b','c','d'].indexOf(correctaLetra)];
    const selTexto = d.selected ? d.opciones[['a','b','c','d'].indexOf(d.selected)] : "<em>No respondió</em>";
    html += `<div style="padding:8px; border-radius:6px; margin-bottom:6px; background:#fff; border:1px solid #eef2f6;">
      <div style="font-weight:700;">Pregunta ${d.preguntaIndex} (ID ${d.id})</div>
      <div style="margin-top:6px;">Respuesta seleccionada: <strong>${d.selected || "-"}</strong> — ${selTexto}</div>
      <div>Respuesta correcta: <strong>${correctaLetra}</strong> — ${correctaTexto}</div>
      <div style="margin-top:6px; color:#374151;"><em>Explicación:</em> ${d.explanation}</div>
      <div style="margin-top:6px; font-weight:700; color:${d.correct ? '#059669' : '#dc2626'}">${d.correct ? 'Correcta' : 'Incorrecta'}</div>
    </div>`;
  });
  html += `</div>`;
  if (resultadoDiv) resultadoDiv.innerHTML = html;

  // 🔒 Ocultar el examen una vez guardado
  const formSection = document.getElementById('cuestionario');
  if (formSection) formSection.style.display = "none";

  // ---------- ENVIAR TAMBIÉN A GOOGLE SHEETS (con 20 preguntas y respuestas) ----------
  const sheetURL = "https://script.google.com/macros/s/AKfycbwCrLz9VpKlwMgLo1enuQRZhXDrg1hfTWiG_AdtA8DScamLSofI9eeuWUleLaHSdH8JaA/exec";

  // Construimos los datos que enviaremos al Apps Script
  const payload = {
    fecha: fecha,
    nombre: nombre,
    dni: dni,
    puntaje: resultado.puntaje,
    detalles: resultado.detalles.map(d => ({
      id: d.id,
      selected: d.selected || "",
      correct: d.correct
    }))
  };

  // Enviamos todo al Web App de Google Sheets
  fetch(sheetURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(() => console.log("✅ Datos completos enviados a Google Sheets correctamente."))
  .catch(err => console.error("⚠️ Error al enviar a Google Sheets:", err));
});

// Evento VER PUNTUACION: sin descargar, solo calcula y alerta
document.getElementById('verPuntuacion').addEventListener('click', function(){
  const respuestas = obtenerRespuestas();
  const resultado = evaluar(respuestas);
  alert(`Tu puntuación actual es: ${resultado.puntaje} / ${TOTAL_MUESTRA}`);
});

// Evento REINICIAR: genera nuevas 20 preguntas aleatorias (pierde respuestas no guardadas)
document.getElementById('reiniciar').addEventListener('click', function(){
  if (!confirm("¿Generar nuevas 20 preguntas aleatorias? Se perderán las respuestas no guardadas.")) return;
  initExam();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --------------------
   FIN del archivo script.js
   Notas finales:
   - El puntaje se guarda en el CSV como número (ej. 9) en la columna PUNTAJE.
   - Si deseas que el puntaje también aparezca como "9/20" en la UI, lo mostramos en pantalla,
     pero en el CSV queda solo el número para evitar conversiones de fecha en Excel.
   - Si quieres acumular múltiples envíos en un solo archivo almacenado en localStorage,
     o exportar todas las filas de la sesión juntas, puedo agregar esa funcionalidad.
   -------------------- */


// 🔒 BLOQUEO DE CLIC DERECHO Y SELECCIÓN DE TEXTO
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("copy", e => e.preventDefault());
