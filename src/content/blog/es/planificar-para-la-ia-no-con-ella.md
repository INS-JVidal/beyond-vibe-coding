---
title: "No planifiques con la IA. Planifica para la IA."
description: "La IA no te ahorra tiempo de planificación. Cambia dónde lo pones. Y si no decides tú dónde, lo decide ella por ti."
pubDate: "2026-02-23"
updatedDate: "2026-02-23"
author: "Prompt Lúcido"
tags: ["programar con ia", "desarrollo con ia", "planificación de software", "context engineering", "greenfield brownfield", "claude code", "ingeniería de software", "scoping"]
category: "fundamentos"
series: "Las cinco actividades que la IA no hace por ti"
seriesOrder: 3
draft: false
lang: "es"
image:
  src: "/images/blog/planificar-para-la-ia.svg"
  mobileSrc: "/images/blog/planificar-para-la-ia-mobile.svg"
  alt: ""
readingTime: 8
translationId: "plan-for-the-ai"
audio: false
---

Abres tu editor. Proyecto nuevo y carpeta vacía. Le dices a la IA: "Hazme una API REST para gestión de tareas con autenticación, base de datos y deploy en AWS". En menos de un minuto tienes una arquitectura completa con diagramas, dependencias y un plan de ejecución en cinco fases. Te parece razonable. Le das a aceptar.

Acabas de cometer el error más caro del desarrollo asistido por IA. No porque el plan sea malo, sino porque no tienes forma de saber si es bueno. La IA no planificó contigo. Planificó por ti. Y la diferencia entre esas dos preposiciones es lo que separa un proyecto que funciona de uno que solo lo parece durante las primeras 48 horas.

## La trampa del plan convincente

Hay un dato que debería cambiar cómo piensas sobre la planificación con IA. En un estudio interno de Anthropic con 132 ingenieros y más de 200.000 sesiones de Claude Code, publicado en diciembre de 2025, el hallazgo que más atención recibió fue el aumento de productividad cercano al 50%. Pero el dato realmente interesante estaba en otra parte: el 27% del trabajo asistido por IA no se habría hecho sin ella. Y al mismo tiempo, los ingenieros señalaron que dedicaban más tiempo a verificar lo que la IA producía, no menos.

Lee eso otra vez. Más trabajo hecho, pero más tiempo verificando. Es decir, la IA no elimina la planificación. La mueve. Y si no decides tú a dónde, el tiempo se va en arreglar cosas que no deberían haberse generado en primer lugar.

Esto enlaza directamente con algo que ya vimos en ["El error que cometes antes de tu primer prompt"](/blog/el-error-que-cometes-antes-de-tu-primer-prompt): la asimetría de información entre tú y la IA funciona de manera opuesta en greenfield y en brownfield. En planificación, esa asimetría se amplifica. Porque cuando le pides a la IA que planifique, estás delegando la actividad donde más importa saber lo que ella no sabe.

## El síndrome del one-shot

Cuando Anthropic construyó sus primeros agentes de larga duración, descubrieron un patrón que documentaron en su artículo "Effective harnesses for long-running agents": Claude tendía a intentar resolver el proyecto entero de golpe. Un solo intento, una sola arquitectura, todo de una vez. El equipo lo llamó "one-shot" y lo identificó como uno de los problemas más persistentes del comportamiento del modelo.

La solución que encontraron fue forzar al agente a trabajar de forma incremental: un feature a la vez, con commits descriptivos entre cada paso y archivos de progreso que documentaban el estado actual. No le dieron un plan mejor. Le impusieron una estructura que hacía imposible planificar todo de golpe.

Piensa en lo que eso significa para ti. Cuando abres un proyecto greenfield y le pides a la IA un plan completo, estás reproduciendo exactamente el patrón que los propios creadores de la IA identificaron como problemático. La IA genera una arquitectura que suena bien, cubre todos los puntos, tiene una estructura coherente. Y eso es precisamente lo que la hace peligrosa: es convincente antes de ser correcta.

El plan que la IA te propone en greenfield no se basa en lo que tu proyecto necesita. Se basa en lo que estadísticamente aparece en proyectos similares. Esto es, un plan promedio para un proyecto que todavía no ha definido qué lo hace diferente. Y aceptar un plan promedio al principio de un proyecto es la mejor manera de garantizar que tu arquitectura no encaje cuando lleguen las decisiones difíciles, esas que sí necesitan contexto real.

Un estudio de Carnegie Mellon, referenciado en el análisis del propio estudio de Anthropic, añade otra capa al problema: desarrolladores con experiencia se vuelven un 19% más lentos cuando usan herramientas de IA, mientras creen que van más rápido. No es que la herramienta falle. Es que la sobreconfianza que genera la herramienta desactiva exactamente el tipo de pensamiento que planificar requiere. Cuanto más convincente suena el plan, menos lo cuestionas. Y cuanto menos lo cuestionas, peor resultado obtienes.

## En brownfield, el plan no es lo que haces. Es lo que muestras.

Si en greenfield el problema es aceptar un plan demasiado pronto, en brownfield el problema es diferente: darle a la IA demasiado contexto de golpe. Y esto tiene una base técnica que merece la pena entender.

Anthropic introdujo en su artículo sobre context engineering un concepto que ellos mismos expresan así: "LLMs, like humans, have an attention budget." Es una frase que parece sencilla, pero que tiene implicaciones profundas para cómo planificas. Cada token que entra en la ventana de contexto consume parte de la capacidad de atención del modelo. Y el rendimiento del modelo decrece a medida que el contexto crece, incluso cuando técnicamente queda espacio en la ventana.

Voy a llamar a esto el presupuesto de atención, porque es exactamente eso: un recurso finito que gastas cada vez que añades información al prompt. Más contexto no siempre produce mejores resultados. A veces produce peores.

En brownfield, tu proyecto ya tiene historia. Tiene convenciones implícitas, deuda técnica acumulada, dependencias que no están en el código sino en la cabeza del equipo. La tentación natural es volcar toda esa información en el contexto para que la IA "entienda" el proyecto. Pero eso viola el presupuesto de atención. Le estás pidiendo que procese todo para entender una parte, y el resultado es que procesa todo mal.

Lo que Anthropic propone, y que funciona tanto para agentes como para desarrolladores humanos, es lo que llaman progressive disclosure: revelar el contexto por capas, en el orden que la tarea necesita, con el nivel de detalle justo para cada paso. En definitiva, en vez de cargar todo el contexto de golpe, dejas que el proceso descubra lo que necesita capa por capa.

Traducido a tu trabajo diario, planificar en brownfield no es escribir un documento de especificaciones larguísimo para la IA. Es decidir qué le muestras, en qué orden y con cuánto detalle. Por ejemplo, si necesitas refactorizar un módulo de autenticación, no le das todo el codebase. Le das primero el módulo, luego los tests que existen, luego las dependencias directas. Cada paso consume presupuesto de atención, y tú decides cómo gastarlo.

Esta es la diferencia entre planificar con la IA y planificar para la IA. Planificar con la IA es decirle "aquí tienes todo, hazme un plan". Planificar para la IA es decidir tú qué información necesita, en qué secuencia, y qué puede ignorar. Dicho de otro modo: en el primer caso, delegas el pensamiento. En el segundo, lo aplicas donde más importa.

## El scoping como habilidad central

Si juntas todo lo anterior, surge un patrón claro. En greenfield, el error es aceptar el primer plan completo. En brownfield, el error es dar todo el contexto de golpe. Los dos problemas son variantes de lo mismo: confundir planificación con generación.

La actividad real que la IA no hace por ti es el scoping. Es decir, decidir qué es lo próximo que hay que hacer, con qué nivel de detalle, y qué queda fuera. Eso requiere juicio que la IA no tiene, porque depende de cosas que no están en el código: plazos, prioridades del equipo, deuda técnica que se puede tolerar y deuda que no, funcionalidades que importan al usuario y las que solo importan al roadmap.

El scoping es, por ejemplo, lo que convierte "hazme una API de tareas" en "primero necesito el modelo de datos y la autenticación básica, sin roles, sin deploy, solo la estructura que me permita validar que las relaciones entre entidades funcionan antes de construir encima". El segundo prompt no es más largo por capricho. Es más preciso porque alguien hizo el trabajo de pensar qué es lo mínimo que necesita existir antes de lo siguiente.

Aquí va un método concreto que puedes usar antes de cualquier interacción con la IA en un proyecto, ya sea greenfield o brownfield.

Primero, define la unidad de trabajo. No "la aplicación". No "el módulo". El siguiente incremento que tiene sentido por sí solo. Algo que puedas verificar cuando esté hecho, sin necesidad de que exista lo que viene después.

Segundo, haz el inventario de contexto. En greenfield: qué restricciones tienes que no son obvias (stack del equipo, infraestructura existente, convenciones que quieres mantener). En brownfield: qué necesita saber la IA de lo que ya existe, y en qué orden.

Tercero, escribe el criterio de verificación antes de generar nada. Si no puedes definir cuándo algo está "bien hecho", la IA tampoco puede. Y vas a acabar verificando sin criterio, que es peor que no verificar.

Esto no es un checklist que seguir mecánicamente. Es una forma de pensar que garantiza que cuando abras la conversación con la IA, tú ya hayas hecho el trabajo que ella no puede hacer.

## La competencia que nadie te enseña

La diferencia entre un desarrollador junior y uno senior con IA no es la calidad de sus prompts. Es la calidad de su scoping. El junior le pide a la IA un plan completo y acepta el primero que suena bien. El senior ya tiene claro qué necesita antes de abrir el chat, y usa la IA para ejecutar incrementos que él ya ha definido.

Eso sí: esto no significa que la IA no ayude a planificar. Significa que ayuda después de que tú hayas hecho el scoping. Puedes pedirle que identifique riesgos en tu plan, que sugiera alternativas a una decisión concreta, que genere la estructura de un incremento que tú ya delimitaste. Pero la decisión de qué viene primero, qué queda fuera y cuánto contexto dar en cada paso es tuya. Siempre tuya.

En el próximo artículo vamos a hablar de la tercera actividad: diseñar. Porque una vez que tienes claro el scoping, la siguiente pregunta es cómo traducir ese incremento en una estructura que la IA pueda generar con precisión, sin inventar lo que no le dijiste.

---

*Este artículo es parte de la serie "Las cinco actividades que la IA no hace por ti" en [Prompt Lúcido](https://prompt-lucido.com). Nuevo artículo cada semana.*
