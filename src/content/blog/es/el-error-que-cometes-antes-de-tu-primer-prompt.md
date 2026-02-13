---
title: "El error que cometes antes de tu primer prompt"
description: "Hay dos formas de equivocarte con la IA al programar: dejar que decida demasiado cuando no sabes nada, y dejar que ignore todo lo que tú sí sabes. Ambas nacen del mismo problema."
pubDate: 2025-02-12
updatedDate: 2025-02-12
author: "Prompt Lúcido"
tags: ["ia", "desarrollo", "greenfield", "brownfield", "ingeniería de software"]
category: "fundamentos"
draft: false
lang: "es"
image:
  src: "/images/blog/greenfield-vs-brownfield.jpg"
  alt: "Dos desarrolladores frente a proyectos completamente distintos"
readingTime: 7
---

La IA no ha cambiado lo que necesitas saber para desarrollar software. Ha cambiado dónde pones la atención.

Hay dos formas de equivocarte con la IA: dejar que decida demasiado cuando no sabes nada, y dejar que ignore todo lo que tú sí sabes. Los dos errores parecen opuestos, pero nacen del mismo problema: no entender qué información tiene la IA y cuál tienes tú.

Vamos a hablar de eso.

## Dos desarrolladores, un lunes por la mañana

Tenemos dos desarrolladores. Los dos abren su editor, los dos van a usar IA, los dos son buenos. Uno tiene un proyecto vacío — todo por decidir. El otro tiene un monolito de tres años y 80.000 líneas de código.

Si su estrategia con la IA es la misma, los dos van a tener problemas. Pero problemas completamente diferentes.

El primero está en lo que en ingeniería de software llamamos *greenfield*: territorio virgen, sin restricciones, sin código previo, sin decisiones tomadas. El segundo está en *brownfield*: un sistema que ya existe, con historia, dependencias ocultas, convenciones de equipo y deuda técnica deliberada.

La mayoría del contenido sobre desarrollo con IA asume que estás en greenfield. "Genera una app completa con un solo prompt." Pero la mayoría de los desarrolladores profesionales pasan su tiempo en brownfield. Y la diferencia no es un detalle — es lo que determina si la IA te ayuda o te sabotea.

## La asimetría invertida

Aquí está la idea central, y merece que la pienses despacio.

En **greenfield**, tú sabes menos de lo que crees. No has descubierto los problemas difíciles todavía, no has chocado con los edge cases, no has tenido que elegir entre dos opciones malas. Pero la IA "sabe" más de lo que debería: tiene patrones de millones de proyectos y te va a dar una arquitectura completa, convincente y prematura. El peligro es que llena el vacío de decisiones con suposiciones que parecen razonables pero no están ancladas a tu contexto real.

En **brownfield**, ocurre exactamente lo contrario. Tú sabes más de lo que la IA puede saber: por qué se eligió esa base de datos, qué módulo no se puede tocar porque dependen de él tres equipos, qué convención de naming nadie documentó pero todos siguen. La IA, en cambio, sabe menos de lo que necesita. Y aun así actúa con total confianza sobre un sistema que no entiende.

El mismo riesgo — confianza sin contexto — manifestado de dos maneras opuestas.

## La transición que nadie te cuenta

Aquí es donde la cosa se pone interesante. Greenfield y brownfield no son dos categorías estáticas. Son un espectro, y todo proyecto se mueve en una sola dirección: hacia brownfield.

Cada commit, cada dependencia añadida, cada decisión de arquitectura estrecha el espacio de posibilidades y aumenta la asimetría de información entre tú y la IA. El día uno de un proyecto es el único momento en el que tú y la IA tenéis la misma información. A partir del primer commit, estás en brownfield.

Con las herramientas de coding agéntico que tenemos hoy — Claude Code, Cursor en modo agente, Windsurf — esta transición ocurre más rápido que nunca. Puedes tener miles de líneas de código generado por IA en cuestión de horas. Tu proyecto se convierte en brownfield *del código de otro*. Y eso es el peor tipo de brownfield, porque ni siquiera tienes la historia en tu cabeza.

## No es una actividad, son cinco

Cuando decimos "usar IA para programar", estamos metiendo en el mismo saco al menos cinco actividades distintas. Y en cada una, la dinámica greenfield/brownfield se manifiesta de forma diferente.

**Entender.** En greenfield, la IA puede funcionar como un experto de dominio simulado: te ayuda a pensar en edge cases que no se te habrían ocurrido. Pero responde con el "caso promedio" de sus datos de entrenamiento. Si tu dominio tiene particularidades — regulaciones locales, convenciones del sector, restricciones del cliente — la IA no las conoce y tú podrías no darte cuenta de que faltan. En brownfield, la IA es muy buena explicando qué hace un módulo. Pero no puede decirte *por qué* se escribió así. Entiende sintaxis y semántica local, no intención histórica.

**Planificar.** En greenfield, la IA funciona bien como sparring partner, pero solo si tú traes restricciones reales. Un truco útil: pídele tres alternativas de arquitectura con tradeoffs explícitos, en vez de "la mejor solución". En brownfield, planificar no es "qué sistema construir" sino "cómo intervenir sin romper nada". Es cirugía, no construcción. La habilidad clave es el scoping: exactamente qué parte del sistema tocar, qué contexto necesita la IA para esa parte, y qué no debe tocar.

**Diseñar.** La IA tiene un sesgo hacia la complejidad. Sus datos de entrenamiento sobrerrepresentan código maduro, empresarial y bien documentado. Infrarrepresentan "código simple que funciona para un equipo pequeño". Si no le pides explícitamente la solución más simple, te va a dar la más elaborada. Y la IA no entiende tu horizonte temporal — si es un prototipo de dos semanas o un producto a cinco años — y esa restricción lo cambia todo.

**Generar código.** Aquí es donde la IA brilla más visiblemente y donde hay más peligro. Cada vez que la IA genera código, toma docenas de decisiones que no te consulta. La estructura de directorios, las dependencias, los patrones de error handling, las convenciones de naming. La mayoría son razonables. Algunas son incorrectas para tu caso. Son lo que podríamos llamar *decisiones fantasma*: están ahí, afectan a tu proyecto, y no las elegiste.

**Verificar.** En greenfield, verificar es "¿hace lo que quiero?", lo cual requiere haber especificado lo que querías. Cuando la IA genera tanto el código como los tests, los tests tienden a verificar *lo que el código hace*, no *lo que debería hacer*. Son tests tautológicos. En brownfield, verificar es "¿rompí algo que ya funcionaba?", un problema fundamentalmente más difícil. La IA puede generar tests de regresión para código existente sin tests — un valor enorme — pero los bugs más peligrosos vienen de *interacciones* entre componentes, no de componentes individuales.

## Tres preguntas antes de cualquier prompt

Si te llevas algo práctico de todo esto, que sean estas tres preguntas. Antes de cualquier interacción con IA para desarrollo:

**¿Estoy construyendo algo nuevo o modificando algo existente?** La respuesta cambia completamente tu estrategia. En greenfield, tu trabajo es poner restricciones antes de que la IA llene el vacío. En brownfield, tu trabajo es transferir contexto sin abrumar.

**¿Qué sabe la IA que yo no, y qué sé yo que la IA no?** Esta es la pregunta que casi nadie se hace. En greenfield, la IA sabe más patrones que tú, pero no conoce tus restricciones reales. En brownfield, tú conoces la historia y la intención, la IA solo ve el código actual.

**¿Cuál es mi estrategia de verificación para lo que genere?** Si no tienes respuesta a esto antes de generar, estás haciendo vibe coding. Y vibe coding funciona hasta que deja de funcionar — normalmente cuando ya es demasiado tarde para volver atrás.

## Lo que no ha cambiado

Entender complejidad, diseñar interfaces limpias, escribir tests significativos, gestionar deuda técnica. Esas habilidades fundamentales de ingeniería de software siguen siendo exactamente las mismas. Lo que ha cambiado es la distribución del tiempo: menos tiempo escribiendo código, más tiempo pensando, revisando y decidiendo.

Las habilidades "meta" — planificar, evaluar, decidir — son ahora más valiosas que las habilidades "objeto" — escribir código que compile. Y eso no es un problema. Es una oportunidad para los desarrolladores que prefieren pensar.

---

*Este artículo es una adaptación del primer episodio de [Prompt Lúcido](https://youtube.com/@BeyondVibeCoding), un canal sobre desarrollo con IA para programadores conscientes. Nuevo vídeo cada semana.*
