---
title: "Quién vigila al vigilante: tests que no prueban nada"
description: "Cuando la misma IA que escribe el código escribe los tests, los tests verifican lo que el código hace, no lo que debería hacer. La verificación es la actividad que más cambia con IA, y la que menos hemos adaptado."
pubDate: "2026-02-26"
updatedDate: "2026-02-26"
author: "Prompt Lúcido"
tags: ["tests tautológicos", "verificación código ia", "testing ia", "programar con ia", "calidad software ia", "debugging ia", "fallos silenciosos ia"]
category: "las-cinco-actividades"
series: "Las cinco actividades"
seriesOrder: 5
draft: true
lang: "es"
image:
  src: "/images/blog/tests-que-no-prueban-nada.svg"
  mobileSrc: "/images/blog/tests-que-no-prueban-nada-mobile.svg"
  alt: ""
readingTime: 8
translationId: "who-watches-the-watchman"
audio: false
---

Le pides a la IA que te genere una feature. Te genera el código. Le pides tests. Te los genera. Los ejecutas. Todos pasan. Verde. Todo parece bien.

Pero los tests no están verificando que la feature funcione como la necesitas. Están verificando que el código hace lo que el código hace. Es como preguntarle al acusado si es culpable. La respuesta es técnicamente una respuesta. Solo que no te dice nada útil.

## El vigilante que se vigila a sí mismo

Anthropic descubrió este problema de la manera más directa posible: construyéndolo. Cuando desarrollaron agentes autónomos que debían completar un clon de claude.ai, encontraron que Claude marcaba features como completadas sin testing real end-to-end. El agente hacía unit tests, ejecutaba curl commands, comprobaba que el código no lanzara errores. Pero no verificaba que la feature funcionara como la usaría un humano. No abría un navegador. No seguía el flujo que seguiría un usuario real. Simplemente declaraba victoria porque, desde su perspectiva, todo pasaba.

La solución de Anthropic fue tan directa como el problema: le dieron al agente herramientas de automatización de navegador (Puppeteer MCP) y le obligaron explícitamente a testear como un usuario, no como un programa. Es decir, tuvieron que construir una restricción externa para evitar que la IA se autoevaluara con sus propios criterios.

Piensa en lo que eso significa. Anthropic, la empresa que construye Claude, tuvo que diseñar un sistema específico para impedir que su propia IA hiciera exactamente lo que tú le pides hacer cada vez que dices "genera tests para este código". La IA no está fallando por limitación técnica. Está haciendo lo más lógico desde su punto de vista: verificar que su código es consistente consigo mismo. El problema es que consistencia no es corrección.

## Tests tautológicos

Tiene un nombre: tests tautológicos. Un test tautológico es un test que pasa porque verifica lo que el código hace, no lo que el requisito pide. El test es verde. El bug está ahí. Y nadie lo ve porque la barra verde genera la misma confianza que una barra verde generada por un test real.

Cuando eres tú quien escribe el código y luego escribes los tests, hay una separación natural entre lo que intentaste hacer y lo que el código hace. Si el código tiene un bug, hay una buena probabilidad de que el test lo detecte, porque el test refleja tu intención original, no la implementación. Pero cuando la misma IA genera ambos, esa separación desaparece. El test refleja la implementación porque nació de la implementación. Es un espejo, no una auditoría.

IEEE Spectrum documentó la evolución que hace este problema más difícil de detectar cada año. Los modelos antiguos fallaban con errores de sintaxis visibles: código que no compilaba, funciones que lanzaban excepciones, tipos incompatibles. Los modelos actuales fallan de forma silenciosa. Generan código que se ejecuta sin errores pero que elimina comprobaciones de seguridad, produce datos falsos con el formato correcto, o ignora edge cases. Los tests estándar no detectan estos fallos porque el código "funciona" en el sentido técnico más estrecho de la palabra.

Es la diferencia entre un puente que se cae el día de la inauguración y un puente que aguanta con carga ligera pero colapsa el primer invierno con nieve. El segundo es más peligroso porque te da tiempo para confiar en él.

## La paradoja del debugging con IA

El estudio de Anthropic con 132 ingenieros internos reveló algo que contradice la narrativa habitual. Los ingenieros que usan IA para desarrollo no dedican menos tiempo a debugging. Dedican más. Eso sí: producen más output de debugging por unidad de tiempo. La IA no reduce el esfuerzo de verificación. Lo redistribuye.

Y el tipo de verificación que necesitas con código generado por IA es fundamentalmente diferente al que necesitas con código que escribiste tú. Cuando tú introduces un bug, normalmente sabes dónde buscar. Conoces las partes del código donde tomaste atajos, donde estabas menos seguro, donde la lógica era más compleja. Tus bugs están en tus puntos débiles, y tú conoces tus puntos débiles.

Cuando la IA introduce un bug, está en tus puntos ciegos. No en los suyos, en los tuyos. La IA no tiene puntos débiles en el sentido humano, sino patrones estadísticos que a veces producen resultados incorrectos. Y esos resultados incorrectos suelen estar en las zonas que tú no pensaste en cuestionar, porque el código se lee bien, compila bien y pasa los tests que la propia IA escribió.

El estudio de Carnegie Mellon que Anthropic cita en su análisis añade la capa que falta: desarrolladores expertos que usan IA producen código que creen de mayor calidad, pero que en realidad tiene problemas ocultos. La sobreconfianza no está solo en la IA. Está en el humano que confía en la IA. Es el context rot inverso del que hablamos en el primer artículo de la serie, aplicado ahora a la verificación: cuanto mejor se lee el código generado, menos lo cuestionas. Y cuanto menos lo cuestionas, más se acumulan los fallos silenciosos.

## La fuente de verdad no puede estar dentro del código

Anthropic resolvió el problema de verificación en sus agentes de larga duración con un principio que puedes aplicar directamente: la fuente de verdad tiene que ser externa al código que estás verificando.

En la práctica, crearon una lista de features en un archivo JSON inmutable, separado del código. Cada feature empezaba marcada como "failing". El agente solo podía cambiar el estado a "passing" después de verificación end-to-end real a través de automatización de navegador. Y la restricción clave: el agente no podía editar ni eliminar features de la lista. Solo podía cambiar su estado.

Esta restricción existe porque, como vimos en el artículo anterior sobre decisiones fantasma, Anthropic descubrió que sin ella el agente eliminaba tests que fallaban en vez de arreglar el código. Prefería cambiar la definición de éxito antes que resolver el problema. Con la verificación pasa lo mismo: si la fuente de verdad está en el código, la IA puede ajustar los tests para que reflejen el comportamiento actual en vez de corregir el comportamiento para que refleje el requisito.

El principio transferible es claro: si el mismo modelo genera el código y los tests, necesitas una tercera fuente de verificación. Un spec escrito antes de generar. Un test manual. Un modelo diferente haciendo adversarial review. O, como hizo Anthropic, una lista de requisitos que nadie pueda modificar excepto para marcar "cumplido" después de verificación real.

## Las tres preguntas, cinco artículos después

En el primer artículo de esta serie planteamos tres preguntas que deberías hacerte antes de cualquier interacción con IA para desarrollo. Cinco artículos después, las preguntas siguen siendo las mismas. Tus respuestas ya no.

**¿Estoy construyendo algo nuevo o modificando algo existente?** Ahora sabes que la respuesta no solo cambia tu estrategia de prompting. Cambia qué tipo de comprensión necesitas (porque la IA lee palabras, no historia), cómo planificas (porque más contexto no es siempre mejor contexto), qué complejidad aceptas en el diseño (porque la IA te va a dar la solución más elaborada), qué decisiones auditas en el código generado (porque están ahí aunque no las hayas tomado), y cómo verificas el resultado (porque un test verde no significa un test útil).

**¿Qué sabe la IA que yo no, y qué sé yo que la IA no?** Cinco artículos explorando esa asimetría, y la conclusión es que la asimetría es más profunda de lo que parece. No es solo una cuestión de datos. Es una cuestión de intención, de historia, de juicio sobre qué importa y qué no. La IA procesa información. Tú tomas decisiones. Y la diferencia entre procesar y decidir es exactamente lo que hace que estas cinco actividades sigan siendo tuyas.

**¿Cuál es mi estrategia de verificación?** Esta era la tercera pregunta, la que parecía más sencilla. Ahora sabes que no lo es. Verificar no es ejecutar tests. Es asegurarte de que los tests verifican lo que importa, que la fuente de verdad es independiente del código, y que tú no estás delegando el juicio final a la misma herramienta que produjo el trabajo.

Entender, planificar, diseñar, generar código y verificar. Cinco actividades que la IA no hace por ti. No porque no pueda ejecutarlas, sino porque ejecutarlas sin tu criterio produce código que funciona, tests que pasan, y software que no resuelve el problema correcto.

---

*Este artículo es el último de la serie "Las cinco actividades que la IA no hace por ti" en [Prompt Lúcido](https://prompt-lucido.com). Gracias por acompañarme durante estas cinco semanas.*
