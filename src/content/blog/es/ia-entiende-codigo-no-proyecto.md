---
title: "La IA entiende tu código. No entiende tu proyecto."
description: "Los modelos de IA resuelven el 80% de los problemas de benchmark, pero se desploman al 23% cuando el problema exige comprensión real. La diferencia entre ambos números es exactamente lo que tú aportas — y lo que nunca deberías delegar."
pubDate: "2026-02-17"
updatedDate: "2026-02-17"
author: "Prompt Lúcido"
tags: ["ia", "desarrollo", "entender", "contexto", "ingeniería de software"]
category: "las-cinco-actividades"
series: "Las cinco actividades"
seriesOrder: 1
draft: false
lang: "es"
image:
  src: "/images/blog/ia-entiende-codigo-no-proyecto.svg"
  mobileSrc: "/images/blog/ia-entiende-codigo-no-proyecto-mobile.svg"
  alt: ""
readingTime: 8
translationId: "ai-understands-code-not-project"
---

Tienes un bug en producción. Un endpoint devuelve datos inconsistentes, pero solo cuando dos usuarios editan el mismo recurso en un intervalo de menos de tres segundos. Le pegas el código del controlador a Claude, le describes el problema, y en menos de un minuto tienes una respuesta detallada: el modelo identifica la race condition, te explica por qué ocurre, y te propone una solución con bloqueo optimista que es técnicamente impecable.

Solo que ese endpoint no debería existir. Se creó hace ocho meses como workaround temporal porque el equipo de producto necesitaba una demo para un cliente que al final nunca firmó. El sistema de permisos real se diseñó después y lo hace redundante. La solución correcta no es arreglar la race condition — es eliminar el endpoint y redirigir las llamadas al flujo que ya funciona. Pero eso la IA no lo sabe, porque eso no está en el código.

## Lo que falla no es la capacidad, es la comprensión

A principios de 2026, los modelos de IA resuelven más del 80% de los problemas de SWE-Bench Verified — la referencia clásica de ingeniería de software. Claude Opus 4.5 lidera esa tabla. Parece que la IA ya programa casi tan bien como un ingeniero senior.

Pero en septiembre de 2025, Scale AI publicó SWE-Bench Pro, un benchmark diseñado para algo distinto: tareas de larga duración en repositorios con licencias copyleft y bases de código privadas de startups — tareas que a un ingeniero profesional le llevarían horas o días. Aquí los números cambian radicalmente: los mejores modelos, incluidos GPT-5 y Claude Opus 4.1, no superaron el 23% de resolución.

Pero el dato que merece más atención no es ese. Es lo que pasó cuando los investigadores eliminaron las especificaciones escritas por humanos — los requisitos, las interfaces, la descripción del comportamiento esperado. GPT-5 cayó del 25.9% al 8.4%. El mismo modelo, el mismo código, el mismo problema. La única diferencia fue quitar el contexto humano. Y el rendimiento se desplomó a un tercio.

Pero lo más revelador es el tipo de fallo. El análisis de trayectorias mostró que Claude Opus 4.1 falla principalmente por lo que el estudio llama "problemas de comprensión semántica" — soluciones técnicamente correctas al problema equivocado, que representaron el 35.9% de sus fallos. No es que el código tenga bugs. Es que resuelve lo que no se le pidió. Entiende sintaxis con precisión milimétrica. Entiende intención pobremente.

Y esto es lo que no aparece en ninguna tabla de benchmark: el salto de 23% en SWE-Bench Pro a 80% en SWE-Bench Verified no refleja un salto en comprensión. Refleja que los problemas más fáciles no necesitan comprensión profunda — solo ejecución técnica limpia. Cuando el problema exige entender por qué el código es así y no de otra manera, los números se desploman.

## El diccionario y el historiador

La mayor parte del contenido sobre IA y desarrollo da por hecho que "entender código" es algo que los modelos ya hacen bien. Y en cierto sentido, es verdad. Pídele a Claude que te explique qué hace una función y te dará una respuesta precisa. Pídele que trace el flujo de datos a través de tres módulos y lo hará sin despeinarse. El problema es que eso es solo un tipo de comprensión: la semántica local. Qué hace este código, cómo se conecta con este otro, qué valores espera y qué devuelve.

Pero hay otra capa que la IA no toca: la intención histórica. Por qué existe este código. Qué decisión del equipo llevó a esta arquitectura y no a otra. Qué restricción de negocio hizo que ese módulo tenga esa forma rara. Qué se intentó antes y no funcionó.

La diferencia es la misma que hay entre un diccionario y un historiador. El diccionario te dice qué significa cada palabra. El historiador te dice por qué se escribió esa frase en ese momento. La IA es un diccionario extraordinariamente bueno. Pero tú necesitas un historiador.

Esta distinción importa porque la actividad de entender — la primera y más importante de las cinco que exploramos en esta serie — no es "comprender el código". Es comprender por qué el código es así y no de otra manera. Y eso incluye comprender las cosas que no están escritas en ningún archivo.

## Dos mundos, dos problemas distintos

Si leíste el artículo introductorio de esta serie, recuerdas que la asimetría de información entre tú y la IA cambia radicalmente según estés en un proyecto greenfield o brownfield. Con la actividad de entender, esa diferencia se amplifica.

En brownfield — que es donde vive la mayoría del desarrollo profesional — el problema es directo: la IA no tiene memoria. Cada vez que abres una conversación nueva, el modelo llega sin ningún conocimiento de lo que se discutió antes, de las decisiones que se tomaron, de los callejones sin salida que ya exploraste. El equipo de Anthropic lo documentó en noviembre de 2025 cuando publicó su artículo sobre harnesses para agentes de larga duración: incluso un modelo frontier como Opus 4.5, ejecutándose en un loop con el Claude Agent SDK, falla al intentar construir una aplicación completa solo con un prompt de alto nivel. El problema no era la capacidad del modelo — era que cada nueva sesión comienza sin memoria de lo que vino antes. Como un equipo de ingenieros trabajando por turnos donde cada persona nueva llega sin recordar nada del turno anterior.

Esto significa que en brownfield, entender es fundamentalmente tu trabajo. La IA puede ayudarte a analizar lo que hay — leer código desconocido, trazar dependencias, generar documentación técnica. Pero no puede decirte por qué una parte del sistema tiene esa forma. Si delegas el "entender" a la IA en un proyecto brownfield, vas a recibir análisis técnicamente correctos que ignoran todo el contexto que importa.

En greenfield parece más fácil, porque en teoría no hay historia. Pero aquí el problema es diferente y más sutil. Anthropic describió en su artículo sobre context engineering cómo el contexto no es infinito — es un recurso finito donde cada token compite con los demás por la atención del modelo. Los modelos están optimizados para producir la respuesta más probable dada la distribución de datos con la que fueron entrenados. En la práctica, esto significa que cuando le pides a la IA que diseñe una solución desde cero, converge hacia la solución estándar — la "respuesta promedio" del dataset.

Piensa en esto: si le pides a la IA que diseñe la arquitectura de una app de gestión de tareas, te va a proponer algo que se parece mucho a lo que ya existe en los mil repositorios de apps de tareas con los que fue entrenada. Técnicamente sólido, genéricamente correcto — y probablemente inadecuado para las necesidades específicas de tu proyecto. Porque lo que hace tu proyecto diferente no está en los datos de entrenamiento. Está en tu cabeza, en las conversaciones con tu equipo, en las restricciones de negocio que aún no has escrito en ningún sitio.

Y aquí está la trampa: como en greenfield no hay código previo que analizar, parece que no hay nada que "entender". Pero sí lo hay — lo que tienes que entender es tu propio problema con suficiente profundidad como para distinguir la solución estándar de la solución correcta. Sin ese trabajo previo, la IA no converge hacia tu solución. Converge hacia la solución de todos.

## El context rot inverso

Hay un concepto técnico de Anthropic que merece una vuelta de tuerca. En su artículo de septiembre de 2025 sobre context engineering, el equipo de ingeniería describió lo que llaman "context rot": cuando la ventana de contexto crece, la atención del modelo se degrada. La información está ahí, pero funciona peor — a medida que los tokens se acumulan, la señal se diluye en el ruido.

Lo que me parece más interesante es que esto tiene un espejo en el lado humano, y nadie habla de ello. Voy a llamarlo **context rot inverso**: cuanto más plausible y articulada es la respuesta de la IA, menos cuestiona el desarrollador lo que falta en esa respuesta.

Es un sesgo cognitivo alimentado por la fluidez del modelo. Cuando Claude te da una explicación de tres párrafos perfectamente estructurada sobre cómo funciona un módulo, tu cerebro interpreta esa fluidez como comprensión profunda. Pero la IA no te está diciendo que entiende — te está diciendo lo que puede inferir a partir de lo que le diste. Todo lo que no le diste, no existe para ella. Y cuando la respuesta suena tan bien, tú dejas de preguntarte qué falta.

El context rot inverso es especialmente peligroso en 2026 porque los modelos son mejores que nunca. Opus 4.6 escribe con más fluidez, estructura mejor los argumentos y genera respuestas más convincentes que cualquier modelo anterior. Eso no significa que entienda más tu proyecto — significa que es más fácil que te convenza de que lo hace. Y como vimos con SWE-Bench Pro, la diferencia entre una IA con contexto humano y sin él no es marginal — es de tres a uno.

## Antes de preguntar, entiende qué no sabe

Hay una regla práctica que puedes aplicar desde tu próxima sesión con IA. Antes de escribir un prompt, hazte una sola pregunta: **¿qué sabe la IA sobre esto y qué no puede saber?**

En brownfield, la respuesta casi siempre es: sabe leer el código pero no sabe por qué es así. Tu trabajo antes del prompt es decidir qué contexto histórico necesita — y dárselo explícitamente. No todo. El contexto relevante para la tarea.

En greenfield, la respuesta es diferente: la IA sabe lo que es estándar pero no sabe lo que hace tu proyecto particular. Tu trabajo antes del prompt es definir las restricciones y peculiaridades — y asegurarte de que el modelo no converja hacia la solución genérica.

En ambos casos, "entender" no es algo que delegas. Es algo que haces antes de delegar cualquier otra cosa.

## El cimiento invisible

De las cinco actividades que exploramos en esta serie — entender, planificar, diseñar, generar y verificar — entender es la que menos se ve y la que más impacta. Un error de generación de código lo detecta un test. Un error de planificación lo detecta una revisión. Pero un error de comprensión puede pasar desapercibido durante semanas, porque el código funciona perfectamente... para el problema equivocado.

La IA es un diccionario, no un historiador. Lee las palabras, no la historia. Y la próxima vez que te dé una respuesta impecablemente articulada, recuerda que la fluidez no es comprensión — a veces es exactamente lo contrario.

En el próximo artículo hablamos de la segunda actividad: planificar. Porque una vez que entiendes de verdad lo que tienes entre manos, la tentación inmediata es generar código. Y ahí es donde el segundo error empieza.

---

*Este artículo es parte de la serie "Las cinco actividades que la IA no hace por ti" en [Beyond Vibe Coding](https://youtube.com/@BeyondVibeCoding). Nuevo artículo cada semana.*