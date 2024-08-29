# Introducción

Se ha utilizado Cursor como IDE para desarrollar el proyecto. No le he añadido la API Key de ningún otro LLM, y hasta ahora no lo he echado en falta.

También he utilizado Dall-E para generar la imagen de portada, que fue un acierto a la primera. Sin embargo cuando le pedí que me diseñara el sprite del coche, nunca llegó a hacerme caso del todo (coche deportivo, fondo transparente, sin sombras, visto desde arriba,...), y finalmente tuve que coger una de las ideas que me facilitó, y editarla con GIMP.

Por lo general Cursor ha funcionado bien, incluso diría que mejor de lo esperado. El principal problema que he tenido de forma reiterada ha sido que en muchas ocasiones me proporcionaba cambios respecto a la última respuesta que me había dado, en lugar de hacerlo respecto al código actual del archivo abierto. He notado que indicándole el archivo como "mention", lo hacía mejor que al simplemente tenerlo abierto (y seleccionado).

Por lo demás, la mayoría de otras veces que ha fallado o me ha dado respuestas inadecuadas, eran relacionadas con Phaser, y en concreto con la gestión de las físicas que proporciona la librería matter.js. Muchas veces ignoraba que debía utilizar matter, y eso ha provocado errores que al principio yo no acababa de entender.

Aún asi, teniendo en cuenta que es la primera vez que desarrollo un juego y, por lo tanto, sin experiencia previa en Phaser o Matter, me parece increíble haber podido llegar al punto al que he llegado, dedicándole unas 15h en total. Teninedo experiencia previa en ese framework, podría haber disminuido el tiempo a unas 4-5 horas. Sin embargo, sin hacer uso de la IA, posiblemente estaría muy por encima de las 50h.

Respecto al desarrollo del juego, los principales problemas que he tenido han sido a la hora de conseguir un movimiento mínimamente realista en los giros, derrapes, desaceleraciones,... y a la hora de detectar los impactos del coche con los bordes del circuito. Para esa última parte he tenido que crear una imagen con los bordes del circuito e indicarle a Phaser que detecte las colisiones del coche con esos bordes. Esta parte ha quedado poco eficiente, puesto que comprueba píxel a píxel si hay colisiones, en lugar de hacerlo mediantes polígonos, que habría sido mucho más adecuado. También he descubierto que Phaser tiene una "editor de niveles", que posiblemente me habría ahorrado porte de estos problemas, aunque mi intención era codificar todo lo posible, para así enfrentarme a estos problemas.

En bastantes ocasiones he optado por modificar el código a mano, cuando tenía clara la solución, o cuando alguna vez Cursor no acababa de entenderme.

El tiempo dedicado a solventar alguno de los problemas anteriores me ha impedido avanzar en otras funcionalidades del juego que tenía previstas:
- Elección de circuitos
- Elección de coche
- Coches enemigos
- Sonidos
- Versión responsive que adapte la zona visible del circuito al tamaño de la pantalla
- Partidas multijugador online

Tampoco he dedicado tiempo a estructurar mejor el código. No se está haciendo uso de clases como "Circuito", "Coche", "Borde", etc., y eso hace que el código, especialmente en GameScene.js sea bastante caótico. Entiendo que esto se podría haber evitado si hubiera planificado mejor el proyecto, y hubiera descrito el proyecto con detalle en un PRD o similar, aunque también lo podría haber ido corrigiendo sobre la marcha según Cursor me proporcionaba los cambios. Reconozco que en este caso tanto la emoción por ir viendo como avanzaba el juego, como la escasez de tiempo me han llevado a no dedicar ese tiempo que habría sido necesario, y que deberé dedicar en el futuro si quiero seguir mejorando el proyecto.

# Prompts

## Prompt 1

¿Conoces el juego micro machines de sega mega drive?

## Prompt 2

Me gustaría crear un clon del juego micro machines de sega mega drive, para poder jugarlo en un navegador web, tanto en ordenadores como en versión movil. He pensado utilizar el framework phaser.js para desarrollar el juego en JS, y la librería matter.js para las físicas necesarias. ¿Te parece adecuado?

### Comentarios

Aquí esperaba una respuesta en la que me diera alguna pista de cómo empezar a desarrollar el juego, pero sin embargo ya empezó a darme instrucciones para crear la estructura básica del proyecto, instalar módulos, etc.

## Prompt 3

Como experto programador de videojuegos usando phaser.js, necesito que me facilites el código nesario para las distintas escenas del juego "mAIcromachines".

Vamos a definir las distintas escenas:

- Escena inicial:  con el nombre del juego (mAIcromachines), y una imagen centrada (está en /micromachines-RMB/assets/images/portada.webp. Al tocar cualquier tecla (o la pantalla si es un dispositivo táctil), se pasa a la siguiente escena.

- Escena selección nombre: la primera vez que se ejecute el juego, nos pedirá un nombre de usuario (por defecto: Player 1). En siguientes ocasiones que se ejecute el juego, recordará el último nombre que se eligió (usando localstorage). Tras elegir nombre, pasa a la siguiente escena.

- Escena selección modo: Se elegirá modo individual o multijugador. También habrá un pequeño botón para volver a la pantalla de selección de nombre, y otro botón "Ver records" para ir a la escena con los records. El botón para ir al modo multijugador inicialmente estará deshabilitado.

- Escena "Records": Permitirá consultar los mejores tiempos de cada circuito. De cada circuito se almacenarán (localStorage) los tiempos de las 10 mejores vueltas y los tiempos de las 10 mejores carreras (suma de todas las vueltas a ese circuito en esa carrera).

- Escena elección de circuito: Tras elegir el modo individual, se podrá elegir uno de los circuitos disponibles. Cada uno tendrá un nombre, una previsualización de su recorrido, un número de vueltas, y sus mejores tiempos por vuelta y por carrera. También aquí se podrá elegir un nivel de zoom para la carrera: Completo (muestra todo el circuito de un solo vistazo), Pequeño (muestra un 50% del circuito), Mediano (un 20%) o Grande (un 5%).
Empezaremos con 3 circuitos distintos, que tendrán la forma de letras "O", "B" y "E" (sería un recorrido por el borde de las letras). Para hacerse una idea del tamaño de los circuitos: una vuelta al circuito "O" podría durar unos 8-10 segundos.

- Escena de carrera: La detallaremos en un paso pasterior.

Facilítame el código necesario para cada escena, añadiendo comentarios a los puntos clave.

## Prompt 4

¿Qué debo hacer para arrancar el proyecto en mi navegador?

### Comentarios

Aquí me recomienda instalar live-server y ejecutar el comando "live-server". Tras ejecutarlo, me encuentro con los primeros problemas, ya que carga una pantalla con el fondo negro. 

## Prompt 5

Perfecto, ya he podido arrancar el proyecto y verlo en el navegador. Al llegar NameScene solo se ve el fondo negro y nada más. Por qué puede ser?

### Comentarios

Tras varias preguntas, no llega a darme una solución. Finalmente, comparando con otros proyectos de Phaser, veo que no era necesario hacer imports de Phaser en cada escena, puesto que ya estaba en el fichero index.html.

## Prompt 6

Los elementos creados con this.add.dom no se ven en la escena, pero otros elementos creados con this.add.text sí se ven

## Prompt 7

```
Ahora necesito el código para la GameScene, en la que tendrán lugar las carreras. Estas son sus características:

- Escena de carrera: Tras una cuenta atrás de 5 segundos, empezará la carrera. Se mostrará en un mini-mapa la ubicación en tiempo real del coche. Al acabar cada vuelta, se indicará cuántas vueltas faltan. Al acabar todas las vueltas, y pasados 3 segundos, se mostrará el desglose de cada vuelta, y el tiempo final. Si alguno de los tiempos está entre los 10 mejores, se actualizarán los records del circuito (tiempo por vuelta o tiempo total de carrera). Con la carrera acabada, pulsando cualquier botón se volverá a la escena de selección de circuito.

# Durante la carrera

- El coche del jugador estará siempre en el centro de la pantalla, y solo variará su orientación según se vayan usando los controles. El sprite a utilizar para el coche está en assets/cars/blue.png

- El circuito se irá moviendo según avance el coche.

- Si el dispositivo tiene teclado, se usarán los cursores para moverse (arriba=acelerar, abajo=frenar, izquierda y derecha giran el coche.

- Si el dispositivo es táctil, tendrá delimitada una zona en la que el usuario deberá presionar para acelerar, frenar o girar..

- Se debe acelerar continuamente para que el coche avance (irá acelerando poco a poca hasta llegar a una velocidad máxima). Si el coche está parado, y se frena, irá marcha atrás. Cuanto más se pulsen izquierda o derecha, más girará el coche. Si se dejan de pulsar, el coche seguirá recto. Ejemplo: Si el coche está orientado hacia arriba (0 grados) y acelerando, y se gira prolongadamente a la derecha, irán creciendo los grados de inclinación (5, 10, 15,...). En el momento en que deje de girarse, el coche seguirá avanzando hacia la última orientación que tuviera (por ejemplo 15 grados).

- El circuito estará delimitado por arcenes. Si se sale de los arcenes, la velocidad disminuirá un 50%, y solo volverá al 100% si vuelve dentro de los arcenes.

- La salida y la meta estarán situadas en el mismo sitio. Se deberá pasar por la meta tantas veces como indique la configuración del circuito.
```

### Comentarios

Aparentemente el código que genera hace lo que debería hacer, pero al arrancarlo, se ve que el coche no se mueve como debería.

## Prompt 8

Adapta lo necesario para que el código sea compatible con matter.js

## Prompt 9

en updateCarControls de @GameScene también se debe usar matter

## Prompt 10

El coche solo debe moverse cuando el usuario acelere (con teclado o táctil). Hasta ese momento estará quieto.

El tamaño del sprite del coche debe ser de 50x50

## Prompt 11

El coche estará inicialmente parado. No podrá acelerar hasta que acabe la cuenta atrás y el usuario interactúe con alguna tecla o la versión táctil. Basarse en el código actual de @GameScene.js 

## Prompt 12

El sprite del coche deberá estar inicialmente girado 90 grados a la derecha

## Prompt 13

No quiero girar el coche, solo quiero girar la imagen png del coche

## Prompt 14

Puedes superponer en la parte derecha de la escena el angulo, rotación y velocidad actual del coche?

### Comentarios

No entendía por qué el coche no se movía según lo esperado (el coche miraba hacia arriba, pero al acelear se desplazaba lateralmente). Le pido que me muestre por pantalla cierta info de debug

## Prompt 15

Se puede conseguir que cambie la rotación del coche sin cambiar el angulo al girar a izquierda o derecha?

### Comentarios

Aquí me sugiere que meta el sprite de un coche dentro de un "contenedor" de Phaser. De esa manera aplicaré movimiento al contenedor en lugar de hacerlo al coche directamente. Spoiler: no funciona, aunque finalmente me sirve para entender qué estaba haciendo mal (no se estaban aplicando las físicas de matter.js sobre ese contenedor).

## Prompt 16

Se puede añadir a la información del coche la posición x e y del contenedor del coche?

## Prompt 17

Cuando empieza la carrera, la posición Y del coche va creciendo sin parar. Debería estar quieto.

## Prompt 18

No quiero que se aplique la fuerza de gravedad. Aplica los cambios sobre el código actual de @GameScene.js 

### Comentarios

Aquí tras varias preguntas, me tengo que dar cuenta que Phaser activa por defecto la gravedad, pensando que el juego es tipo plataformas 2D, y por lo tanto los objetos tienden a caer. Sin embargo, este juego al tener la vista desde arriba, no debería tener gravedad. Desactivo la gravedad de la configuración de Phaser, y funcionando.

## Prompt 19

Cuando el coche acelera o gira, se mueve this.car pero no se mueve this.carContainer. Debería ser al revés

## Prompt 20

Al dejar de acelerar. el coche debe tardar unos 2 segundos en pararse. Irá bajando la velocidad lentamente.

## Prompt 21

La desaceleración solo se debe aplicar si antes el coche estaba acelerando

## Prompt 22

Al desacelerar, el coche debe respetar la dirección en la que se estaba moviendo, pero disminuyendo la velocidad progresivamente. Modificarlo en updateCarControls de @GameScene 

### Comentarios

Le costó entender que "desacelerar" no quería decir "volver marcha atrás al punto inicial".

## Prompt 23

El giro del coche no parece real. Estaría bien que derrapara al contravolantear. Es posible?

## Prompt 24

Phaser está usando la API de canvas?

### Comentarios

Notaba cierta lentitud en algunos puntos, y quería asegurarme de que estaba utilizando la API de canvas, en teoría más apropiada que WebGL.

## Prompt 25

Me gustaría que el coche solo pueda desplazarse por la carretera del circuito, y si va a salirse de la carretera, rebote contra el borde y vuelva a la carretera. ¿Cómo se podría conseguir ese efecto? @GameScene.js 

## Prompt 26

Parece que nunca llegan a producirse las colisiones entre el contenedor del coche y los bordes del circuito

## Prompt 27

@GameScene modifica lo necesario para que todas las físicas las controle matter

### Comentarios

Aquí me ha saltado varios prompts que no sirvieron para nada, hasta que ví que las físicas de los bordes no las estaba generando matter.js, sino Phaser.

## Prompt 28

Se podría generar el array de bordes a partir de una imagen?

## Prompt 29

createTrackBoundsFromMask crea muchos rectángulos de tamaño 1x1, y eso provoca lentitud en el juego. Se podrían generar otro tipo de rectángulos más grandes de forma que la carga y la velocidad de juego sean más rápidas?

## Prompt 30

La posición inicial del coche debe ser 400, 250.

El minimapa debería mostrar la imagen assets/tracks/track1_minimap.png de fondo, y el punto que representa al coche debería ser un poco más grande (unos 3x3 pixeles)

## Prompt 31

@GameScene.js la línea de meta no se ve

## Prompt 32

uncaught TypeError: this.finishLineGraphics.getBounds is not a function
    at GameScene.update (GameScene.js:189:77)

### Comentarios

Me he saltado varios prompts similares para corregir errores puntuales de ejecución. Normalmente los abría en un nuevo chat, para no afectar a la conversación principal.

## Prompt 33

Mientras el coche atraviesa la meta, se llama varias veces a this.handleLapCompletion, pero debería llamarse solo cuando el coche toca la meta por primera vez, y no volver a ejecutarse hasta que el coche cruce la meta de nuevo en la vuelta siguiente. @GameScene.js 

## Prompt 34

Quiero que el sprite cargue aleatoriamente uno de los archivos png que hay en assets/cars/, y que el punto que aparece en el minimapa sea del mismo color que el coche (el color lo indica el nombe del archivo png)

### Comentarios

Aquí esperaba una respuesta más inteligente que me proporcionara el código para leer el contenido de assets/cars/, pero simplemente me rellenó el array con valores dummy.

## Prompt 35

Solo queremos mostrar la info del coche si estamos en modo debug de matter

## Prompt 36

Quiero que la cámara vaya siguiendo al coche según se desplaza por el circuito

## Prompt 37

Quiero que el color de fondo de la escena sea #a1b03b, y que el minimapa esté visible en todo momento, aunque la cámara se desplace

## Prompt 38

@GameScene.js quiero que se vea en la parte superior derecha, sobre un fondo oscuro el tiempo de las vueltas anteriores y el tiempo de la vuelta actual en tiempo real.

### Comentarios

Hasta este momento, solo se avisaba con un texto al acabar cada vuelta.

## Prompt 39

El tiempo de la vuelta actual no debe aparecer si la carrera ya ha terminado.

El tiempo de la vuelta actual y vueltas anteriores debe mostrarse en segundos, con 2 decimales.

### Comentarios

Lo de los segundos tampoco lo entendía, y siempre me mostraba milisegundos, finalmente hubo que cambiarlo a mano.

## Prompt 40

@GameScene.js los tiempos de showRaceResults() deberían mostrarse centrados, sobre un fondo negro con una opacidad al 60%

## Prompt 41

El primer paso por la línea de meta no debe contarse, puesto que se trata de la salida.

### Comentarios

Justo al empezar la carrera, el coche pisaba la meta, y eso descontaba una vuelta. Además, la meta se podía cruzar tanto de izquierda a derecha como al reves, incluso con el coche "de culo". De ese forma, se podía dar una vuelta "entera" en apenas 1 segundo. La solución que me propuso no acabó de gustarme, y opte por crear una sin usar la IA (usando un checkpoint a mitad del ciercuito que el coche debía cruzar en cada vuelta antes de cruzar la meta).

## Prompt 42

@GameScene.js En la versión para dispositivos táctiles, quiero que aparezcan 4 botones en la parte inferior, que al ser pulsados o presionados, actúen como si se hubieran pulsado las teclas del teclado. Los 4 botones son: acelerar, frenar, girar izquierda y girar derecha.

### Comentarios

La versión para dispositivos táctiles no tiene la interfaz adaptada. La única diferencia es que aparecen 4 botones que simulan las teclas de acelerar, frenar, girar izquierda y girar derecha.

## Prompt 43

@GameScene.js Los botones de girar a izquierda y derecha deberían aparecer a la izquierda, y los botones de acelerar y frenar a la derecha.

### Comentarios

Este era el último prompt, y casualmente al ir a recuperarlo para generar este prompts.md, me he dado cuenta de que Cursor no me muestra ni la pregunta ni la respuesta, poruqe dice que tengo un "espacio de respuesta limitado". Solo me muestra hasta parte de la respuesta al prompt 42.

## Prompt 44

Puedes genenar el contenido de un fichero README.md que explique en qué consiste el proyecto mAIcromachines, cómo se juega, qué tecnología utiliza y la forma de instalarlo y ponerlo en marcha? @micromachines-RMB  

## Prompt 45

Quita la alternativa para arrancar con npm start. Solo se debe mencionar la opción de live-server.

Añade la imagen de portada al principio del documento.