---
title: "La palabra mágica que ahorra tokens: succinct"
description: "Una sola palabra puede reducir tus respuestas de 800 a 90 tokens en cualquier LLM. Cómo cambiar la distribución de probabilidad del modelo con una instrucción simple."
pubDate: "2026-02-18"
updatedDate: "2026-02-18"
author: "Prompt Lúcido"
tags: ["prompts", "optimización-tokens", "chatgpt", "claude", "ia", "desarrollo", "ingeniería-prompts", "api", "eficiencia", "costos"]
category: "fundamentos"
series: "Trucos"
seriesOrder: 1
draft: false
lang: "es"
image:
  src: "/images/blog/succinct.svg"
  mobileSrc: "/images/blog/succinct-mobile.svg"
  alt: "Ilustracion de la palabra clave succinct ahorrando tokens"
readingTime: 4
translationId: "succinct-magic-word"
audio: false
---

¿Sabes que existe una palabra "mágica" para que la IA te dé una respuesta corta y directa?

Le preguntas qué es una API REST y te suelta tres párrafos de contexto histórico, comparaciones con SOAP, mejores prácticas de seguridad, y una conclusión que resume todo lo anterior. Tú solo querías saber qué es.

Hay una palabra que pocos conocen y que te ahorra todo ese relleno: **succinto** (succinct en inglés).

Prueba con cualquier LLM (Claude, ChatGPT, DeepSeek):

**Sin la palabra:** 800+ tokens de respuesta.  
**Con la palabra:** 80-90 tokens de respuesta.  

Misma información esencial. ~9x menos tokens. Y funciona igual de bien en todos los modelos.

## El problema se multiplica en producción

Si tu app hace 10,000 requests al día con respuestas de 800 tokens, estás pagando por 8 millones de tokens diarios. Pidiendo respuestas sucintas, bajas a menos de 1 millón.

Los LLMs asumen que quieres la versión extendida: contexto, ejemplos, advertencias, casos extremos, y un párrafo final que resume todo. Para un LLM "útil" significa "completo". Pero tú no siempre necesitas completo.

Cuando trabajas con APIs, cada token de relleno es dinero y milisegundos de latencia. Una respuesta de 800 tokens tarda más en generarse que una de 90 tokens.

## Por qué succinct funciona (y qué significa técnicamente)

Cuando añades "succinct" a un prompt, estás cambiando la distribución de probabilidad de los siguientes tokens que el modelo va a generar.

Los LLMs predicen el siguiente token basándose en el contexto anterior. Si el modelo empieza con "Let me provide a comprehensive overview...", ya se comprometió a una respuesta larga. Ese "comprehensive" hace más probable que genere "detailed explanation", "multiple examples", "various approaches".

"Succinct" rompe ese patrón desde el inicio. Prioriza tokens que terminan ideas rápido, no tokens que las expanden.

### Las implicaciones para tu arquitectura

Si estás construyendo sistemas con LLMs, esto cambia varias cosas:

**Context window efficiency:** En una conversación de 10 turnos, si cada respuesta es 800 tokens en vez de 100, llenas el contexto 8x más rápido. Con prompts sucintos, conversaciones más largas sin summarization intermedia.

**Latency percibida:** Con streaming, el usuario ve los primeros tokens casi inmediatamente. Una respuesta de 90 tokens se siente instantánea comparada con una de 800.

**Batch processing:** La diferencia entre procesar 1000 documentos con 800 vs 90 tokens de output es 2 horas vs 15 minutos. El cuello de botella no es solo el costo — es cuántos requests caben en tu rate limit.

### El trade-off que nadie menciona

Los modelos grandes a veces *necesitan* tokens para pensar.

Cuando le pides a GPT-4 que resuelva un problema matemático complejo, esos 500 tokens de razonamiento intermedio no son relleno — son el modelo pensando en voz alta. Chain of Thought funciona porque el modelo usa tokens para construir razonamiento paso a paso.

"Succinct" comprime el output, pero si comprimes demasiado en problemas complejos, el modelo puede saltar pasos y fallar. Es una decisión de arquitectura, no solo de prompt engineering.

## Cuándo pedir respuestas sucintas (y cuándo no)

**Úsalo cuando:**
- Necesitas respuestas rápidas en producción
- Trabajas con la API y pagas por token
- Generas código que vas a revisar tú mismo
- Haces requests en batch y la latencia importa
- El modelo tiende a dar respuestas muy largas por defecto

**No lo uses cuando:**
- Estás aprendiendo un concepto nuevo (necesitas los ejemplos)
- Debuggeas un problema complejo (quieres ver el razonamiento completo)
- Generas documentación (la exhaustividad es el objetivo)
- Necesitas explicar algo a alguien más (el contexto ayuda)

## El reto

Toma los 3 prompts que más usas. Ejecútalos dos veces: normal y con "Be succinct" al final.

Pregúntate: ¿la versión corta tiene todo lo que necesito para mi siguiente paso?

Si es "sí", acabas de encontrar un prompt que estabas sobre-optimizando. La mayoría descubre que 2 de cada 3 prompts podrían ser sucintos.

Comparte tus resultados. Etiqueta [@promptlucido](https://twitter.com/promptlucido) con lo que descubriste.

---

*Este artículo es el primero de la serie "Trucos" en [Beyond Vibe Coding](https://prompt-lucido.com). Desarrollo con IA para los que prefieren pensar.*
