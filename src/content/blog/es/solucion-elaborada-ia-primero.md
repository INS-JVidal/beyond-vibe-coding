---
title: "La solución más elaborada es la que la IA te va a dar primero"
description: "Los asistentes de código generan soluciones sobredimensionadas por defecto. Diseñar antes de generar es la actividad que separa al desarrollador del operador de prompts."
pubDate: "2026-02-17"
updatedDate: "2026-02-17"
author: "Prompt Lúcido"
tags: ["inteligencia artificial", "desarrollo de software", "diseño de software", "deuda técnica", "programar con ia", "código con ia", "arquitectura de software", "buenas prácticas programación"]
category: "las-cinco-actividades"
series: "Las cinco actividades"
seriesOrder: 3
draft: false
lang: "es"
image:
  src: "/images/blog/solucion-elaborada-ia-primero.svg"
  mobileSrc: "/images/blog/solucion-elaborada-ia-primero-mobile.svg"
  alt: "Ilustracion de arquitectura de codigo sobreingeniada"
readingTime: 8
translationId: "solucion-elaborada-ia-te-da-primero"
audio: false
---

Le pides a la IA una API para gestionar usuarios y te devuelve un microservicio con autenticación OAuth2, rate limiting, middleware de logging y una capa de caché con Redis. Tú solo necesitabas cuatro endpoints CRUD y una validación básica.

No es un error. Es el comportamiento por defecto. Y si no lo reconoces como un problema, cada línea de código que aceptes será deuda técnica que no pediste.

## Código que parece funcionar

IEEE Spectrum publicó en enero de 2026 un análisis que pone números a algo que muchos desarrolladores ya intuían: los asistentes de código más recientes están produciendo **fallos silenciosos**. No hablamos de errores que rompen la compilación. Hablamos de código que se ejecuta sin problemas pero no hace lo que debería.

El autor, CEO de Carrington Labs, documentó cómo GPT-5 genera código que evita crashes eliminando safety checks o creando output falso que coincide con el formato esperado. No es un bug en el modelo. Es una consecuencia directa de cómo optimiza: para "que parezca que funciona" en vez de para "que funcione".

Piensa en lo que esto significa para el diseño. Si a nivel de líneas de código la IA ya optimiza para la apariencia de corrección, a nivel de arquitectura el problema se amplifica. No elige la solución que mejor encaja con tu problema. Elige la solución más representada en sus datos de entrenamiento. Y esos datos sobrerrepresentan código empresarial maduro y bien documentado: repositorios open source con miles de estrellas, proyectos con equipos de decenas de personas, aplicaciones diseñadas para escalar a millones de usuarios.

Tu script de 200 líneas recibe la arquitectura de una aplicación de 200.000. No porque sea la correcta, sino porque es la más probable según la distribución estadística del código en el que la IA fue entrenada.

## Usuarios no deterministas de herramientas deterministas

El blog de ingeniería de Anthropic sobre herramientas para agentes contiene una frase que merece atención: *"agents are non-deterministic users of deterministic tools."* Los agentes de IA usan las herramientas de formas que no predices. Esto se escribió en el contexto de agentes autónomos, pero aplica con la misma fuerza cuando le pides a la IA que diseñe software.

Cuando un desarrollador experimentado elige entre una base de datos relacional y una documental, está aplicando juicio de ingeniería: el volumen de datos, los patrones de acceso, las restricciones del equipo, el horizonte temporal del proyecto. La IA no tiene acceso a ese juicio. Aplica patrones estadísticos. Y los patrones más frecuentes en sus datos de entrenamiento corresponden a aplicaciones empresariales con requisitos que probablemente no son los tuyos.

Anthropic documenta cómo las **descripciones de herramientas** para agentes necesitan ser tan cuidadosamente diseñadas como los propios prompts, porque definen el contrato entre el agente y su espacio de acción. La analogía para tu trabajo diario es directa: tus restricciones de diseño (horizonte temporal, tamaño del equipo, complejidad aceptable, stack existente) son el equivalente de esas tool descriptions. Si no las haces explícitas, la IA llena el vacío con la solución más frecuente en sus datos.

Imagina que le pides "diseña el modelo de datos para una app de tareas". Sin restricciones, es probable que recibas: tablas separadas para usuarios, workspaces, proyectos, tareas, subtareas, etiquetas, comentarios, adjuntos y permisos. Diez tablas con relaciones many-to-many para lo que podría resolverse con dos o tres tablas y un campo JSON. La IA no sabe que tu app de tareas es para uso personal y que nunca va a tener más de un usuario.

Y la solución más frecuente es, casi siempre, la más elaborada.

## La altitud correcta

El concepto de **"right altitude"** en context engineering, también de Anthropic, describe el punto medio entre instrucciones demasiado rígidas e instrucciones demasiado vagas. Aplicado al diseño de software con IA, este concepto explica por qué la mayoría de los desarrolladores obtienen soluciones sobredimensionadas.

Piensa en dos extremos. En un lado, le dices a la IA exactamente cómo implementar cada componente: "usa Express con middleware X, estructura Y, patrón Z". Esto es demasiado rígido. Pierdes la capacidad del modelo de aportar algo que no habías considerado, y si un detalle es incorrecto, toda la implementación se resiente.

En el otro lado, le dices "haz una API de usuarios". Esto es demasiado vago. Sin restricciones, la IA completa los huecos con sus propios valores por defecto. Y sus valores por defecto son los de una empresa con 50 ingenieros, no los de tu equipo de tres personas o tu proyecto personal de fin de semana. Le has dado libertad total para decidir el nivel de complejidad, y la IA siempre escoge hacia arriba.

Esto no es un defecto del modelo. Es una consecuencia lógica de cómo aprende. Si el 90% del código de gestión de usuarios que ha visto incluye autenticación OAuth, la IA lo incluirá. Si la mayoría de las APIs que ha procesado tienen middleware de rate limiting, lo añadirá. Cada patrón que incluye "por defecto" fue la decisión correcta en algún contexto. Solo que probablemente no en el tuyo.

La altitud correcta está en comunicar las restricciones sin dictar la implementación. "Necesito una API de usuarios para un MVP con un solo desarrollador. Va a tener como máximo 1.000 usuarios el primer año. No necesita autenticación propia porque va detrás de un API gateway. Prioriza simplicidad sobre extensibilidad."

Esas cinco frases eliminan el 80% de la complejidad gratuita.

## Complejidad gratuita

Hay un nombre para lo que ocurre cuando no comunicas restricciones: **complejidad gratuita**. Son capas de abstracción que la IA introduce sin que las pidas, cada una con su propio coste de mantenimiento. Es deuda técnica disfrazada de buenas prácticas.

La IA te da un microservicio cuando necesitas un script. Un ORM cuando necesitas una query. Un framework cuando necesitas una función. Un sistema de plugins cuando necesitas un if-else.

Puedes verlo en acción con un ejemplo trivial. Pide "una función que lea un CSV y devuelva las filas con errores". Una respuesta proporcionada podría incluir: una clase abstracta para validadores, un patrón Strategy para diferentes tipos de validación, un sistema de logging configurable, manejo de múltiples encodings, y soporte para archivos de varios gigabytes con streaming. Cinco capas de abstracción para lo que podría resolverse con veinte líneas de Python y un `csv.reader`.

Cada una de esas capas añadidas "por si acaso" tiene costes reales: más código que leer, más dependencias que actualizar, más superficie de error, más tiempo de onboarding para quien venga después. Los datos de SWE-Lancer de OpenAI son ilustrativos aquí: Claude 3.5 completó solo el 26.2% de tareas prácticas de ingeniería y el 44.9% de decisiones de gestión técnica. Si los propios modelos tienen dificultades con decisiones de diseño reales, delegar esas decisiones sin restricciones explícitas es exactamente el escenario donde más fallan.

La complejidad gratuita es particularmente insidiosa porque *parece* profesional. Un code review superficial no la detecta. Sigue patrones reconocidos. Usa nombres de clases que suenan a Clean Architecture. El problema no es que esté mal escrita. El problema es que no debería existir.

## Diseñar es restringir

Si has leído los artículos anteriores de esta serie, reconoces el patrón. Entender tu proyecto establece qué problema estás resolviendo. Planificar establece cómo vas a resolverlo. Diseñar es el paso que establece *qué no vas a hacer*.

Diseñar antes de generar código no significa crear diagramas UML ni escribir documentos de arquitectura de 40 páginas. Significa tomar tres decisiones que la IA no puede tomar por ti:

**¿Cuál es el horizonte temporal?** Un prototipo que vas a validar en dos semanas tiene restricciones radicalmente diferentes a un sistema que va a estar en producción tres años. La IA no sabe cuál de los dos estás construyendo a menos que se lo digas. Un prototipo puede usar SQLite, rutas hardcodeadas y cero abstracción. Un sistema de producción necesita otra cosa. Pero la IA te va a dar el segundo incluso cuando necesitas el primero.

**¿Cuál es el nivel de complejidad aceptable?** Esto depende de quién va a mantener el código, cuánta experiencia tiene el equipo con el stack elegido, y cuánto tiempo puedes dedicar a resolver problemas que no son de negocio. Un patrón CQRS puede ser la decisión correcta para un equipo de veinte personas con experiencia en Domain-Driven Design. Para un equipo de dos juniors, es una trampa. La IA siempre asume el nivel más alto porque es lo que más ha visto.

**¿Qué no necesitas?** Esta es la pregunta más difícil y la más valiosa. Por cada feature que excluyes explícitamente, eliminas una cadena entera de decisiones de implementación que la IA habría tomado por ti. "No necesito autenticación", "no necesito internacionalización", "no necesito soporte para más de un tenant" son restricciones que cambian fundamentalmente la solución.

La próxima vez que vayas a pedirle algo a la IA, prueba esto: antes del prompt, escribe tres cosas que tu proyecto *no* necesita. Verás cómo la respuesta cambia.

No es un truco de prompt engineering. Es diseño. Es la diferencia entre decirle a un arquitecto "constrúyeme una casa" y decirle "constrúyeme una casa para dos personas, sin garaje, con un presupuesto de X". El segundo encargo no produce una casa peor. Produce la casa correcta.

## La solución correcta

Hay una intuición que los desarrolladores experimentados tienen y que la IA no puede replicar: saber cuándo algo es suficiente. No suficiente como "mediocre". Suficiente como "resuelve el problema sin crear problemas nuevos".

El siguiente artículo de esta serie habla de la cuarta actividad: generar código. Pero si has llegado hasta aquí, ya entiendes por qué esa actividad es la menos importante de las cinco. Porque la calidad del código que genera la IA depende enteramente de las decisiones de diseño que tomaste antes de escribir el primer prompt.

La solución correcta no es la más robusta. Es la más simple que sobrevive a tu horizonte temporal. Y eso es una decisión de diseño que solo tú puedes tomar.

---

*Este artículo es parte de la serie "Las cinco actividades que la IA no hace por ti" en [Beyond Vibe Coding](https://youtube.com/@BeyondVibeCoding). Nuevo artículo cada semana.*
