# Diego Fernando Oroco - DOOM
## LLM ChatGPT 4o

Actúa como un experto en video juegos.
Vas a crear un clon del video juego DOOM versión retro, este juego debes crearlo usando html5, css y javascript.
- Crea la estructura del proyecto utilizando buenas prácticas de arquitectura de software.
- Genera el script para crear la estructura de carpetas y los archivos para DOS 
- Genera el código mínimo necesario para probar que el juego está listo para hacer una prueba inicial.

---

genera el Script para Crear la Estructura de Carpetas y Archivos en formato Batch

---

ya tengo la pantalla negra, ahora con qué seguimos para que el juego sea funcional?

---

cómo hago esto? o de donde saco estos archivos?

"incluir archivos de sonido en la carpeta assets/sounds y sprites en assets/images."

---

genera el código completo para el html y los archivos js

---

error en main.js

Uncaught SyntaxError: Cannot use import statement outside a module

---

ya funciona, pero quiero que hagamos algunos cambios:
1 - que "player" sea el doble de grande
2 - que "enemy" sea 4 veces más grande
3 - que el disparo sea con la "barra espaciadora" o con "click"
4 - que el "enemy" sea lento al principio pero que cada 10 segundos aumente su velocidad de seguimiento al "player"

genera todo el "game.js" ajustado

---

error, no dispara con la barra espaciadora

---

el disparo solo sale hacia la derecha, ajústalo para que el disparo se de hacia la dirección en la cual está pulsando "click"

---

no funciona, el disparo sigue saliendo solo hacia el lado derecho y no hacia dónde estoy dando click

---

primero elimina que dispare con la barra espaciadora y amplía al doble del tamaño el espacio de juego

---

cada que un disparo le de al enemigo vas a realizar lo siguiente:
1 - Cambiar la imagen del enemigo a otra llamada "enemy-shot.png"
2 - Vas a detener al enemigo durante 3 segundos
3 - Al pasar los 3 segundos vuelves a dejar el enemigo con la imagen "enemy.png"

---

Ahora implementa los siguientes cambios:
1 - en la parte superior derecha muestra el resultado de veces que un disparo ha impactado al enemigo, ten en cuenta que los impactos solo cuentan cuando no está detenido. Muestra "Puntaje: " seguido de la cantidad de impactos al enemigo.
2 - Genera de manera obstáculos entre 3 y 10 de diferentes tamaños y direcciones y ubícalos de forma aleatoria sin interferir con la zona donde se visualiza el puntaje.
3 - Implementa una pausa de todo el juego cuando se presione la barra espaciadora o tecla espacio. Pausar el juego significa que tanto el jugador como el enemigo se quedan quietos y se muestra un mensaje muy grande en pantalla con la palabra "PAUSADO"
3.1 - Si se presiona cualquier tecla el juego continúa
4 - Coloca un fondo como lienzo para el juego, se llamará "background.png"

---

haz los siguientes ajustes:
1 - Los disparos no puede atravesar los obstáculos
2 - El enemigo no puede atravesar los obstáculos
3 - Cada minuto que pase se incrementa el número de enemigos en 1 y este aparece en cualquier parte del escenario de manera aleatoria.

---

Cada que generes un enemigo escógelo de forma aleatoria, tienes estas opciones:
enemy01
enemy02
enemy03
enemy04
enemy05
enemy06
enemy07
enemy08
enemy10

ya no usarás "enemy" como un único enemigo tendrás que elegirlo de manera aleatoria tanto al inicio del juego como cada que vayan apareciendo.

solo dame el código completo de los procedimientos que haz de modificar y todo aquello que sea nuevo.

--- 

Hagamos otros cambios:
1 - Que el número de enemigos sea máximo 6, desde el "enemy01" hasta el "enemy06"
2 - Cada que el enemigo reciba un disparo debe cambiar a su correspondiente -shot, ejemplo para el enemigo "enemy01" al dispararle se cambiaría por "enemy01-shot", para el enemigo "enemy02" al dispararle se cambiaría por "enemy02-shot" y así para todos los demás
3 - Cada que un enemigo reciba 10 disparos este debe desaparecer de esta forma, parpadea y desaparece.

---

generó este error:

game.js:357 Uncaught DOMException: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The HTMLImageElement provided is in the 'broken' state.
    at file:///C:/SALVAVIDAS/OneDrive%20-%20Eficacia/EFICACIA/Cursos/AI4Devs/Forks/AI4Devs-videogame/doom-clone/src/game.js:357:26
    at Array.forEach (<anonymous>)
    at Game.render (file:///C:/SALVAVIDAS/OneDrive%20-%20Eficacia/EFICACIA/Cursos/AI4Devs/Forks/AI4Devs-videogame/doom-clone/src/game.js:355:22)
    at Game.loop (file:///C:/SALVAVIDAS/OneDrive%20-%20Eficacia/EFICACIA/Cursos/AI4Devs/Forks/AI4Devs-videogame/doom-clone/src/game.js:390:14)

---

después del impacto al enemigo y después de los 3 segundos que se queda inmóvil sale este error:

game.js:363 Uncaught DOMException: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The HTMLImageElement provided is in the 'broken' state.
    at file:///C:/SALVAVIDAS/OneDrive%20-%20Eficacia/EFICACIA/Cursos/AI4Devs/Forks/AI4Devs-videogame/doom-clone/src/game.js:363:26
    at Array.forEach (<anonymous>)
    at Game.render (file:///C:/SALVAVIDAS/OneDrive%20-%20Eficacia/EFICACIA/Cursos/AI4Devs/Forks/AI4Devs-videogame/doom-clone/src/game.js:361:22)
    at Game.loop (file:///C:/SALVAVIDAS/OneDrive%20-%20Eficacia/EFICACIA/Cursos/AI4Devs/Forks/AI4Devs-videogame/doom-clone/src/game.js:397:14)

---

ahora ya no hay errores, pero algo funciona mal, luego que un enemigo es impactado este cambia a la imagen -shot, pero luego de los 3 segundos debe volver a ser la imagen sin el -shot.
Haz este ajuste por favor.

---

Las siguientes funcionalidades están erradas:

1 - El puntaje se dañó, arréglalo para que cuente los impactos que reciben todos los enemigos
2 - Los obstáculos no pueden salir uno sobre otro y que ya no sean máximo 10 sino máximo 5

----

Hagamos los siguientes ajustes:
- El jugador tendrá 3 vidas
- Al lado derecho del puntaje deja dos espacios y coloca "Vidas: " y después el valor de las vidas, iniciando en 3
- Si un enemigo alcanza al jugador, entonces:
  - Reproduce el sonido "quejido.wav"
  - Reduce la cantidad de vidas en 1 y actualiza "Vidas" en el nuevo valor
- Si la cantidad de vidas llega a cero, entonces muestra el mensaje "Juego Terminado. CTRL-F5 para reiniciar"
- Los obstáculos salen de color gris, colócales la textura "texture.png" que cubra todo obstáculo

---

Corrige lo siguiente:
1 - La cantidad de vidas con que inicia el jugador son 3 y cada que lo alcanza un enemigo se reduce en 1 y así mismo se actualiza el valor de Vidas en pantalla.
2 - Cada que algún enemigo alcance al jugador no se debe pausar el juego, debe continuar, solo si las vidas del jugador llegan a cero se detiene el juego con el mensaje "Juego Terminado. CTRL+F5 para Reiniciar"

---

El contador de vidas está errado porque empieza en 3 lo que está bien, pero si alcanzan al jugador las vidas no se decrementan empezando en 3, sino empezando en cero y esto es un error. Ajústalo.

---

por favor, ajusta el sonido del disparo al 10%, y dame solo el código del método completo donde haces el ajuste.

---

ajusta el sonido del disparo al 5% y el sonido del impacto al enemigo el 30%

---

Estas funcionalidades están erradas:
1 - Al pulsar la barra espaciadora no sale el mensaje "PAUSADO"
2 - Cada que un enemigo alcanza al jugador, está saliendo el mensaje de Juego terminado y las vidas quedan por debajo de cero

Haz los ajustes correspondientes y dame los métodos completos qué actualices.

---

Haz los siguientes ajustes:
1 - Después de que el jugador sea alcanzado, haz que aparezca en otra zona alejada del enemigo que lo alcanzó.
2 - El enemigo desaparece después que reciba 5 disparos
3 - Si un enemigo desaparece y no quedan más enemigos en el juego, entonces se crea un nuevo enemigo.
4 - Cuándo el jugador complete 5 enemigos derrotados, se termina el juego y sale un mensaje que dice "MISION COMPLETADA"

---

Cuando el jugador fue alcanzado por el enemigo se bloqueó el juego con este error:

game.js:330 Uncaught TypeError: Cannot read properties of undefined (reading 'x')
    at Game.handlePlayerHit (game.js:330:44)
    at game.js:299:26
    at Array.forEach (<anonymous>)
    at Game.update (game.js:268:22)
    at Game.loop (game.js:507:14)

---

ahora ya no sale el error, pero el jugador se pierde en la pantalla. Asegúrate que:
- El jugador quede dentro del área de juego
- El jugador de quede dentro del área de algún obstáculo
- El jugador quede visible y activo para jugar

---

Cambia el tamaño del jugador al doble y el del enemigo redúcelo en un 25% de su tamaño

---

- Haz que los enemigos sean un 50% más grandes que el jugador
- Asegura que cualquier obstáculo no se superponga en donde está el puntaje y las vidas

---

Cada que un enemigo desaparece si no hay más enemigos en juego, entonces aparece un nuevo enemigo, no se debe pausar el juego

---

esta funcionalidad no se está cumpliendo:
 Cuando el jugador complete 5 enemigos derrotados, se termina el juego y sale un mensaje que dice "MISION COMPLETADA"

---

genera 5 opciones de nombres para este juego, algo corto con no más de 2 palabras o algo impactante.

---

Hola, genera el contenido en markdown del archivo readme.md, el cual debe incluir:
- Nombre del juego, el cual es Doomfall
- Instrucciones para descargar el repositorio y poner a funcionar el código fuente
- Características del juego
- Instrucciones para jugar

Genera todo el contenido para copiarlo en el archivo readme.md

---