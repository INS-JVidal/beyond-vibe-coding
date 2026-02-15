---
title: "El error que cometes antes de tu primer prompt"
description: "Hay dos formas de equivocarte con la IA al programar: dejar que decida demasiado cuando no sabes nada, y dejar que ignore todo lo que tú sí sabes. Ambas nacen del mismo problema."
pubDate: "2026-02-14"
updatedDate: "2026-02-14"
author: "Prompt Lúcido"
tags: ["ia", "desarrollo", "greenfield", "brownfield", "ingeniería de software"]
category: "fundamentos"
series: "Fundamentos"
seriesOrder: 1
draft: false
lang: "es"
image:
  src: "/images/blog/greenfield-vs-brownfield.svg"
  mobileSrc: "/images/blog/greenfield-vs-brownfield-mobile.svg"
  alt: ""
readingTime: 8
translationId: "mistake-before-first-prompt"
audio: true
---

La IA no ha cambiado lo que necesitas saber para desarrollar software. Ha cambiado dónde pones la atención.

Busca cualquier tutorial de desarrollo con IA. El 90% empieza con un proyecto vacío. "Genera una app completa con un solo prompt." Suena bien, se demuestra fácil, y genera muchos clics. Pero la mayoría de los desarrolladores profesionales no viven ahí. Viven en sistemas que ya existen, con historia, con deuda técnica, con decisiones que tomó alguien que ya no está en el equipo. Y para ellos, ese tutorial no solo es irrelevante: es peligroso, porque enseña exactamente la actitud equivocada.

Hay dos formas de equivocarte con la IA: dejar que decida demasiado cuando no sabes nada, y dejar que ignore todo lo que tú sí sabes. Los dos errores parecen opuestos, pero nacen del mismo problema: no entender qué información tiene la IA y cuál tienes tú.

Vamos a hablar de eso.

## Dos desarrolladores, un lunes por la mañana

Tenemos dos desarrolladores. Los dos abren su editor, los dos van a usar IA, los dos son competentes. Uno tiene un proyecto vacío y todo por decidir. El otro tiene un monolito de tres años y 80.000 líneas de código.

Si su estrategia con la IA es la misma, los dos van a tener problemas. Problemas completamente diferentes.

El primero está en lo que en ingeniería de software llamamos *greenfield*: territorio virgen, sin restricciones, sin código previo, sin decisiones tomadas. El segundo está en *brownfield*: un sistema que ya existe, con dependencias ocultas, convenciones de equipo y deuda técnica deliberada.

La diferencia no es un detalle menor. Es lo que determina si la IA te ayuda o te sabotea.

## La asimetría invertida

Aquí está la idea central, y merece que la pienses despacio.

En **greenfield**, tú sabes menos de lo que crees. No has descubierto los problemas difíciles todavía, no has chocado con los edge cases, no has tenido que elegir entre dos opciones malas. Pero la IA "sabe" más de lo que debería: tiene patrones de millones de proyectos y te va a dar una arquitectura completa, convincente y prematura. El peligro es que llena el vacío de decisiones con suposiciones que parecen razonables pero no están ancladas a tu contexto real.

En **brownfield**, ocurre exactamente lo contrario. Tú sabes más de lo que la IA puede saber: por qué se eligió esa base de datos, qué módulo no se puede tocar porque dependen de él tres equipos, qué convención de naming nadie documentó pero todos siguen. La IA, en cambio, sabe menos de lo que necesita. Y aun así actúa con total confianza sobre un sistema que no entiende.

El mismo riesgo (confianza sin contexto) manifestado de dos maneras opuestas. Y esto tiene un nombre: *asimetría de información invertida*. En greenfield, la asimetría favorece a la IA. En brownfield, te favorece a ti. Tu valor como desarrollador no está en escribir código más rápido que la IA. Está en saber lo que ella no sabe.

## La transición que nadie te cuenta

Aquí es donde la cosa se pone interesante. Greenfield y brownfield no son dos categorías estáticas. Son un espectro, y todo proyecto se mueve en una sola dirección: hacia brownfield.

Cada commit, cada dependencia añadida, cada decisión de arquitectura estrecha el espacio de posibilidades y aumenta la asimetría de información entre tú y la IA. El día uno de un proyecto es el único momento en el que tú y la IA tenéis la misma información. A partir del primer commit, estás en brownfield.

Con las herramientas de coding agéntico que tenemos hoy (Claude Code, Cursor en modo agente, Windsurf), esta transición ocurre más rápido que nunca. Puedes tener miles de líneas de código generado por IA en cuestión de horas. Tu proyecto se convierte en brownfield *del código de otro*. Y eso es el peor tipo de brownfield, porque ni siquiera tienes la historia en tu cabeza.

El vibe coding funciona. Hasta que deja de funcionar. Y el momento en que deja de funcionar es exactamente el punto donde tu proyecto pasa de greenfield a brownfield, y nadie te preparó para esa transición. De repente tienes un sistema que no entiendes del todo, generado con decisiones que no tomaste, y la IA sigue actuando con la misma confianza que tenía cuando el proyecto estaba vacío.

## No es una actividad, son cinco

Cuando decimos "usar IA para programar", estamos metiendo en el mismo saco al menos cinco actividades distintas. Y en cada una, la dinámica greenfield/brownfield se manifiesta de forma diferente.

**Entender.** En greenfield, la IA puede funcionar como un experto de dominio simulado que te ayuda a pensar en edge cases que no se te habrían ocurrido. Pero responde con el "caso promedio" de sus datos de entrenamiento. Si tu dominio tiene particularidades (regulaciones locales, convenciones del sector, restricciones del cliente), la IA no las conoce. Y tú podrías no darte cuenta de que faltan. En brownfield, la IA es muy buena explicando qué hace un módulo. Pero no puede decirte *por qué* se escribió así. Entiende sintaxis y semántica local, no intención histórica.

**Planificar.** En greenfield, la IA funciona bien como sparring partner, pero solo si tú traes restricciones reales. Un enfoque útil: pídele tres alternativas de arquitectura con tradeoffs explícitos, en vez de "la mejor solución". En brownfield, planificar no es "qué sistema construir" sino "cómo intervenir sin romper nada". Es cirugía, no construcción. La habilidad clave es el scoping: saber exactamente qué parte del sistema tocar, qué contexto necesita la IA para esa parte concreta, y qué no debe tocar.

**Diseñar.** La IA tiene un sesgo hacia la complejidad. Sus datos de entrenamiento sobrerrepresentan código maduro, empresarial y bien documentado. Infrarrepresentan "código simple que funciona para un equipo pequeño". Si no le pides explícitamente la solución más simple, te va a dar la más elaborada. Además, la IA no entiende tu horizonte temporal. No distingue entre un prototipo de dos semanas y un producto a cinco años, y esa restricción lo cambia todo.

**Generar código.** Aquí es donde la IA brilla más visiblemente y donde hay más peligro. Cada vez que la IA genera código, toma docenas de decisiones que no te consulta: la estructura de directorios, las dependencias, los patrones de error handling, las convenciones de naming. La mayoría son razonables. Algunas son incorrectas para tu caso. Son lo que podríamos llamar *decisiones fantasma*: están ahí, afectan a tu proyecto, y no las elegiste.

**Verificar.** En greenfield, verificar es "¿hace lo que quiero?", lo cual requiere haber especificado lo que querías. Cuando la IA genera tanto el código como los tests, los tests tienden a verificar *lo que el código hace*, no *lo que debería hacer*. Son tests tautológicos. En brownfield, verificar es "¿rompí algo que ya funcionaba?", un problema fundamentalmente más difícil. La IA puede generar tests de regresión para código existente sin tests, y eso tiene un valor enorme. Pero los bugs más peligrosos vienen de *interacciones* entre componentes, no de componentes individuales.

## Tres preguntas que deberían ser un reflejo

Si te llevas algo práctico de todo esto, que sean estas tres preguntas. No como una checklist que consultas, sino como algo que internalizas hasta que se vuelve automático. Antes de cualquier interacción con IA para desarrollo:

**¿Estoy construyendo algo nuevo o modificando algo existente?** La respuesta cambia completamente tu estrategia. En greenfield, tu trabajo es poner restricciones antes de que la IA llene el vacío. En brownfield, tu trabajo es transferir contexto sin abrumar.

**¿Qué sabe la IA que yo no, y qué sé yo que la IA no?** Esta es la pregunta que casi nadie se hace, y es la más importante. Porque la respuesta define tu rol en la conversación. No eres un usuario pidiendo un servicio. Eres la mitad de un equipo donde cada parte tiene información que la otra no tiene. Tu ventaja no es técnica. Es contextual.

**¿Cuál es mi estrategia de verificación para lo que genere?** Si no tienes respuesta a esto antes de generar, estás delegando decisiones sin supervisión. Y eso no es ingeniería, independientemente de lo sofisticada que sea la herramienta.

## Lo que no ha cambiado

Entender complejidad, diseñar interfaces limpias, escribir tests significativos, gestionar deuda técnica. Esas habilidades fundamentales de ingeniería de software siguen siendo exactamente las mismas. Lo que ha cambiado es la distribución del tiempo: menos tiempo escribiendo código, más tiempo pensando, revisando y decidiendo.

Las habilidades "meta" (planificar, evaluar, decidir) son ahora más valiosas que las habilidades "objeto" (escribir código que compile). Y eso no es un problema. Es una oportunidad para los desarrolladores que prefieren pensar.

---

*Este artículo es una adaptación del primer episodio de [Prompt Lúcido](https://youtube.com/@BeyondVibeCoding), un canal sobre desarrollo con IA para programadores conscientes. Nuevo vídeo cada semana.*