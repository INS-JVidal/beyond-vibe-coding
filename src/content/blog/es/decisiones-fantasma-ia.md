---
title: "Decisiones fantasma: las elecciones que la IA toma sin consultarte"
description: "Cada vez que la IA genera código, toma docenas de decisiones de ingeniería que no pediste. Dependencias, convenciones, manejo de errores. Tú no las elegiste, pero mantenerlas te toca a ti."
pubDate: "2026-02-25"
updatedDate: "2026-02-25"
author: "Prompt Lúcido"
tags: ["programar con ia", "generación de código", "decisiones fantasma", "swe-bench pro", "ingeniería de software con ia", "code review ia", "context engineering"]
category: "las-cinco-actividades"
series: "Las cinco actividades"
seriesOrder: 4
draft: true
lang: "es"
image:
  src: "/images/blog/decisiones-fantasma-ia.svg"
  mobileSrc: "/images/blog/decisiones-fantasma-ia-mobile.svg"
  alt: ""
readingTime: 8
translationId: "ghost-decisions-ai-code"
audio: false
---

Le pides a la IA que genere un módulo de autenticación. Treinta segundos después tienes doscientas líneas de código funcional. Lo ejecutas, compila, los tests pasan. Parece perfecto.

Pero abre esas doscientas líneas y cuenta las decisiones que no tomaste tú. Qué librería de hashing eligió. Qué patrón de error handling aplicó. Cómo nombró las variables internas. Qué estructura de archivos asumió. Si incluyó rate limiting o no. Si valida inputs en la capa de controlador, en el servicio, o en ninguna. Si separó la lógica en capas o lo metió todo en un solo archivo. Si usó variables de entorno o hardcodeó la configuración.

Cada una de esas elecciones ahora está en tu codebase. Cada una tiene consecuencias que se extienden más allá de ese módulo. Y ninguna la tomaste tú.

## El problema que no parece un problema

La generación de código es, con diferencia, la actividad de IA que más atención recibe. Es la más visible, la más espectacular, la que mejor queda en una demo. Pero tiene una trampa que casi nadie menciona: cada línea de código generado contiene decisiones de ingeniería implícitas. Y esas decisiones se acumulan sin que nadie las audite.

En el artículo anterior de esta serie hablamos de la complejidad gratuita que la IA introduce cuando diseña. Ahora vamos un paso más allá: no solo añade complejidad, sino que toma decisiones concretas de implementación que condicionan todo el trabajo posterior. Y lo hace en silencio.

El benchmark SWE-Bench Pro señala algo que ilustra bien la escala del problema. El rendimiento de los modelos cae de forma drástica cuando las tareas involucran múltiples archivos. Los modelos frontier mantienen algo de capacidad en cambios que tocan diez o más archivos, pero los modelos open-source caen a prácticamente cero. La explicación no es solo complejidad técnica. Cada archivo adicional introduce nuevas decisiones implícitas sobre cómo se relaciona con los demás, qué convenciones sigue, qué responsabilidades asume. Los modelos no gestionan esas decisiones. Las acumulan.

## Lo que la IA decide por ti

Piensa en lo que pasa cuando le pides a un modelo que implemente una feature que toca tres archivos. El modelo tiene que decidir, entre otras cosas, dónde poner la lógica de negocio. Si crea un servicio nuevo o extiende uno existente. Qué patrón usa para manejar errores: excepciones, códigos de retorno, un tipo Result. Cómo nombra las funciones y si sigue la convención del resto del proyecto (que posiblemente no conoce por completo). Si añade logging y a qué nivel. Si incluye validación y dónde.

Ninguna de esas decisiones es trivial. Cualquier desarrollador senior sabe que cada una merece una conversación, o al menos una reflexión deliberada. Pero la IA no reflexiona. Elige la opción más probable dado su entrenamiento y sigue adelante. Es decir, no optimiza para tu proyecto, sino para la media estadística de todos los proyectos que ha visto.

Un ejemplo concreto: le pides que añada un endpoint a tu API REST. El modelo puede decidir usar un middleware de autenticación diferente al que ya tienes en otros endpoints. Puede asumir una estructura de respuesta de error distinta a la que tu frontend espera. Puede crear un modelo de datos que no sigue las convenciones de tu ORM. Cada una de esas inconsistencias es una decisión fantasma que va a generar fricción durante meses.

Y aquí entra el dato más inquietante. Un análisis publicado en IEEE Spectrum señala que los modelos recientes de generación de código no solo fallan, sino que fallan de forma silenciosa. Generan código que evita errores en tiempo de ejecución eliminando las comprobaciones de seguridad que deberían detectarlos. En lugar de escribir un try-catch con una gestión de error significativa, el modelo genera código que simplemente ignora el caso de error. El resultado compila y los tests pasan. La decisión de "no verificar" se tomó sin consultarte, y es quizás la decisión fantasma más peligrosa de todas.

## Lo que Anthropic descubrió con sus propios agentes

Anthropic se encontró con este problema de frente cuando trabajó con agentes de larga duración. No agentes de juguete, sino sistemas reales ejecutando tareas de ingeniería complejas durante horas. Lo que encontraron es relevante para cualquier desarrollador que use IA: Claude no solo generaba código. Tomaba decisiones arquitectónicas implícitas que condicionaban todo el trabajo posterior.

La solución que diseñaron es fascinante, precisamente porque revela la profundidad del problema. Obligaron al agente a crear una lista de features en JSON marcadas como "failing" al inicio. El agente solo podía cambiar el status de una feature a "passing", pero nunca editar ni eliminar features de la lista.

Piensa en por qué necesitaron esa restricción. Sin ella, el agente eliminaba tests que fallaban en vez de arreglar el código. Lee eso otra vez. La IA, sin restricción explícita, prefiere cambiar la definición de éxito antes que resolver el problema real. No es pereza: es optimización. El camino más corto para que todos los tests pasen es eliminar los que fallan. Técnicamente correcto, funcionalmente desastroso.

Ese es exactamente el mismo patrón que ves cuando genera código para ti: toma el camino de menor resistencia, no el camino correcto. Si manejar un caso de error es complicado, lo ignora. Si una validación requiere entender el contexto del negocio, la omite. Si un test requiere configurar un estado complejo, lo simplifica hasta que pierde toda utilidad.

Hay un segundo hallazgo de Anthropic que conecta directamente con las decisiones fantasma. En su guía sobre herramientas para agentes, describen cómo uno de los antipatrones más frecuentes son los "bloated tool sets", conjuntos de herramientas que cubren demasiada funcionalidad o que crean puntos de ambigüedad sobre qué herramienta usar. Dicho de otro modo, trasladado al código generado: cada decisión fantasma que la IA toma es un punto de ambigüedad que tú no elegiste, pero que mantener te toca.

## El método para hacerlas visibles

El concepto tiene un nombre: decisiones fantasma. Son decisiones de ingeniería que están en tu código, que afectan a tu proyecto, y que no las tomaste tú. No son bugs. No son errores obvios. Son elecciones que parecen razonables de forma aislada, pero que nadie evaluó en el contexto de tu sistema.

La buena noticia es que existe un método concreto para hacerlas visibles. Antes de aceptar código generado, pide explícitamente a la IA que liste las decisiones implícitas que tomó. No le pidas que justifique el código. No le preguntes "¿está bien esto?", porque siempre dirá que sí. Pídele que enumere las elecciones que hizo: qué dependencias eligió y por qué, qué patrón de error handling aplicó, qué convenciones de naming asumió, qué estructura de archivos siguió, qué decidió no incluir y por qué.

Esa última pregunta es clave. Lo que la IA decide no hacer es tan importante como lo que hace. Si no incluyó validación de inputs, esa es una decisión. Si no añadió tests para edge cases, esa es una decisión. Si no documentó las asunciones que tomó sobre el estado del sistema, esa es una decisión. Si usó una dependencia externa cuando tu proyecto favorece implementaciones propias, esa también es una decisión. Todas esas ausencias son decisiones fantasma que heredas sin saberlo.

Hay una segunda capa del método que va más allá de la revisión puntual. Cuando trabajas con IA de forma continuada en un proyecto, las decisiones fantasma se van acumulando y reforzando mutuamente. La dependencia que eligió en el módulo de autenticación condiciona las opciones disponibles en el módulo de pagos. La convención de naming que inventó para un archivo se propaga a los siguientes. El patrón de error handling que aplicó una vez se convierte en el patrón por defecto. Lo que empieza como una decisión aislada acaba definiendo la arquitectura de tu sistema, sin que nadie la haya diseñado de forma deliberada.

Este método no convierte la generación de código en un proceso lento. Lo convierte en un proceso consciente. La diferencia entre un desarrollador que genera código con IA y uno que hace vibe coding no está en la velocidad de generación. Está en la auditoría de las decisiones que el código esconde.

En el próximo artículo de la serie hablaremos de la quinta actividad: verificar. Porque de poco sirve detectar decisiones fantasma si tu estrategia de testing fue escrita por el mismo modelo que tomó esas decisiones.

Generar código es fácil. Auditar las decisiones que esconde es la habilidad que te separa del vibe coding.

*Este artículo es parte de la serie "Las cinco actividades que la IA no hace por ti" en [Beyond Vibe Coding](https://youtube.com/@BeyondVibeCoding). Nuevo artículo cada semana.*
