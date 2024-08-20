Desarrollo del juego "Gusanos"
==================
## Proceso general
- He usado Claude para definir el PRD (en `./doc/00_prd_gusanos.md`) que me han servido para luego pedirle generar un listado de tareas (en `./doc/01_tasks_gusanos.md`).
- He usado Claude para realizar una PoC y estudiar la viabilidad de generar un terreno a partir de una imagen de éste y situar los gusanos encima.
- He usado Cursor.sh para generar el código a partir del PRD y el listado de tareas.
- He intentado definir las tareas para practicar e ir implementando poco a poco, pero no me ha aportado mucho. He avanzado más rápido partiendo del PRD y definiendo los prompts sobre la marcha.

## Tiempo de desarrollo del juego "Gusanos"
- Miércoles 07/08/2024 : 2h para redactar casi todo el PRD del proyecto
- Lunes 19/08/2024 : 5h para empezar a programar la parte del mapa y el gusano
- Martes 20/08/2024 : 6h para seguir programando y pulir detalles

## Impresiones del uso de Cursor.sh
- La caga bastante con el uso de librerías a pesar de registrar la documentación de la librería. Le cuesta muchísimo solucionar un error, en cualquier modelo que se use (GPT o Claude). Al final a base de iniciar nuevo chat y soluciones manuales, he podido avanzar. 
- Hay problemas como el movimiento de los gusanos por el terreno que no se ha conseguido pulir
- A veces el diff da problemas y parece que no coge el código actual si has hecho algún cambio manual
- Ha ido implementando alguna cosa antes de hora


Prompts usados para la documentación de Análisis del juego (Claude.ai)
==================
```
Como analista de software experto en desarrollo de videojuegos HTML+JS, necesito que me ayudes a definir la documentación para un nuevo videojuego.
La idea inicial es la siguiente, tendremos que ir refinando hasta conseguir un documento que sirva para generar las tareas y los prompts para luego generar el código usando un Asistente de código con IA.

El videojuego se llamará "Gusanos", será una réplica simplificada del famoso juego "Worms" o "Worms: Armaggedon". ¿Conoces este juego? Puedes resumirme su funcionamiento para empezar a definir el documento?
```

```
Antes de seguir, y en base a los 6 elementos base que has descrito, es viable implementar un juego así? 
Por ejemplo, cómo se podría hacer que el mapa 2D sea destructible y podamos mover los gusanos por el mapa? Lo ideal seria a partir de un PNG para poder generar varios mapas.
```

## Solicitud de PoC para estudiar viabilidad y complejidad
```
Podríamos implementar una pequeña PoC donde carguemos un mapa a partir de un PNG y coloquemos un gusano (Worm) en un punto aleatorio del mapa, teniendo en cuenta que debe situarse encima del terreno. 
Por ejemplo, si el PNG es como el adjunto (worms_mapa_1.png) debería tratarse el fondo negro como vacío y situar el gusano encima del terreno. Nunca debería situarse dentro de lo que se considere terreno.
Tendremos que estructurar el código en un HTML, un fichero CSS y varios Javascript.
```

## Errores de la PoC
```
Se produce este error:

TypeError: Cannot read properties of undefined (reading 'data')
    at Map.isTerrainAt (map.js:19:29)
    at Map.findSurfaceY (map.js:24:22)
    at Worm.placeRandomly (worm.js:12:28)
    at new Worm (worm.js:7:14)
    at Game.map.mapImage.onload (game.js:9:25)

Si hago debug veo que no se está llamando al método initMap() de la clase Map
```

```
Ahora da este error y no llega a instanciar la clase Worm:
-----
Uncaught DOMException: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data.
    at Map.initMap (file:///home/jmlopez/dev/jmlclosa/AI4Devs-videogame/gusanos-JMLC/map.js:18:33)
    at Map.mapImage.onload (file:///home/jmlopez/dev/jmlclosa/AI4Devs-videogame/gusanos-JMLC/map.js:9:18)
-----
```

```
He arrancado con el servidor de Python y el mapa se dibuja pero el gusano no aparece.
Haciendo debug veo que al ejecutar la función placeRandomly la constante `y` siempre vale -1, por lo que deberíamos revisar la función map.findSurfaceY
```

```
El gusano sigue sin mostrarse. 
En la consola aparece: Worm placed at (2700, -101)
He cambiado el constructor de Worm para intentar verlo mejor:
constructor(map) {
        this.map = map;
        this.width = 100;
        this.height = 100;
        this.color = 'red';
        this.placeRandomly();
    }
```

## Fin de la PoC
```
De acuerdo, podemos dar por buena la PoC. Vamos a seguir definiendo el documento de requisitos y demás puntos. Vamos a por el primer punto
```

```
Bien. Vamos por puntos:
1. ok
2. ok. Pero hay que tener en cuenta que la parte inferior se debe considerar agua y por tanto si un gusano llega al agua muere. Podemos reservar los 20 píxeles inferiores para tratarla como agua
3. En esta versión simplificada solo tendremos el arma más característica: Bazooka. Tenemos que preveer que podamos añadir más armas como Pistola una vez terminada el resto de funcionalidad.
4. ok. Hay que contemplar la parábola de las armas (Bazooka) en base a la fuerza que se de (pulsando espacio) y la dirección a la que se apunte. También que el gusano puede caer si debajo suyo no tiene terreno. Se puede considerar que se caerá si el 80% de la base del gusano no tiene terreno debajo.
5. ok. Cada gusano tendrá una vida que se irá gastando en base a los impactos de arma que reciba.
6. Los mapas no se generaran. Se cargaran en base a imagenes prediseñadas.
7. Solo contemplaremos 2 jugadores en el mismo PC por ahora.
8. No habrá personalización, simplemente los gusanos del primer jugador tendrán un color (rojo) y los del segundo jugador azul
9. Sistema de turnos si. Ok al límite de tiempo por turno: 60 segundos que debe mostrarse durante el turno.
10. No habrá caja de suministros en esta versión, pero si el agua como se ha comentado en el punto 2.
```

```
De acuerdo. Reserva los detalles como los píxeles, porcentaje de base, cálculo de la trayectoria, etc para otro apartado más técnico. En este apartado no entraremos en ese detalle.
```

```
De acuerdo, vamos a guardar este artefacto como definitivo y pasar al siguiente: Mecánicas principales.  Puedes ampliar la descripción de los 5 puntos descritos?
```

```
Añado algunos comentarios:
1. Tenemos que tener en cuenta que si llegamos a una pared o obstáculo, moviéndonos o saltando, el gusano no podrá moverse a través de ella.
2. El límite del tiempo se detendrá en el momento en el que el jugador empiece a disparar. 
3. Cada arma tendrá capacidad de destruir o no el terreno. El bazooka si tendrá esta capacidad. 
4. Si se destruye un terreno y un gusano que esté encima se queda sin terreno debajo, el gusano caerá.
5. ok
```

```
De acuerdo, vamos al 3r y 4o apartado, que pueden unificarse: Interfaz de usuario y Gráficos y estilo visual.

El 5o apartado "Sonido y música" lo omitiremos por ahora.
```

```
De acuerdo, vamos a revisar algunos puntos:
Interfaz de usuario:
* Empezamos mejor detallando el menú principal que tendrá el título y luego las 3 opciones que has indicado (Nueva partida, Ayuda y Salir)
* Pantalla de juego principal:
   * Debería tener 2 partes diferenciadas: El canvas donde veremos el juego (terreno y gusanos) y Otra información como la barra de estado superior.
   * El indicador de dirección y de fuerza estaran dentro del canvas, dibujandose alrededor del gusano una vez seleccionada el arma
   * En la barra de estado se visualizaría el turno actual, tiempo restante del turno y Gusanos restantes de cada equipo. Además una opción de ayuda
* Pantalla de fin de partida donde, además de mostrar el ganador se mostrará el resumen de la partida: Tiempo y turnos de duración, gusanos eliminados, ... También las opciones de nueva partida o volver al menú principal

Responsividad: Tenemos que tener en cuenta unos mínimos para poder dibujar el fondo correctamente.
```

```
Perfecto. Vamos a por el último punto, entrando en detalles del desarrollo técnicos. ¿Qué tenemos que detallar en este punto?
```

```
Repasemos los puntos
1. ok
2. ok. Tenemos algun framework que nos pueda ayudar?
3. Creo que faltará el concepto de Team, GameStatistics y quizá Round.
4. La gestión de estados del juego podría hacerse en distintas pantallas?
5. ok
6. ok, aunque quizá empezaría sin animación ni efectos visuales. Solo la destrucción del terreno
7. ok
8. ok
9. Creo que no es necesario persistencia
10. Debería estar incluido en el punto 2
11. Debería estar en el punto 2
12. Debería estar en el punto 2
```

```
De acuerdo, vamos a ir detallando cada punto. Empezamos por 1 Estructura del proyecto. Puedes ampliar un poco?
```

```
No crees que podríamos diferenciar las 3 pantallas principales (Pantalla inicial, Partida y Fin de partida) como 3 HTML distintos? Cada uno con su CSS.
```

```
Me parece razonable. Puedes generar el artefacto final?
```

```
Vamos al siguiente punto de desarrollo técnico. Qué frameworks pueden ayudarnos más en este juego? Teniendo en cuenta que la PoC es bastante funcional tenemos que valorar que nos aporta cada alternativa.
```

```
Puedes dar más detalles de como podría ayudar Matter.js a mejorar la PoC? 
Puedes modificar el código existente añadiendo Matter.js?
```


Prompts usados para la creación del listado de tareas (Claude.ai)
==================

```
Actúa como un analista de software encargado de desgranar el PRD adjunto en tareas.
El PRD define un juego para navegador (HTML + Javascript) llamado "Gusanos".
El desarrollo debe ser incremental, cada tarea debe generar un incremento de valor. Por ejemplo, una primera tarea podría ser generar todo el scaffolding del proyecto y que se muestre el mapa. 
Luego añadir un gusano que se mueva. Luego otro gusano que no se mueva. Luego implementar el sistema de turnos, etc...

Haz un listado de tareas con un título y una breve descripción en una frase del objetivo de la tarea.
```

```
Modifica lo siguiente, teniendo en cuenta que tendremos tareas "Básicas" y tareas "Extra".
Intercambia el punto 5 y 6 porque antes de saltar hay que implementar la gravedad.
En el punto 7 hay que indicar "un gusano por equipo"
El punto 10 y 11 se pueden unificar, puesto que si se carga el Bazooka se debe poder disparar.
El punto 12 se puede dejar para los "Extra"
Los puntos 18, 19 y 20 también para los "Extra".

Falta implementar el concepto de "Agua" después del punto 6 actual, tras implementar las caídas.
```

Prompts usados para el detalle de tareas e implementación (Cursor.sh)
==================

```
Como analista programador de software, experto en desarrollo de juegos HTML + Javascript, tenemos que desgranar cada una de las tareas listadas en el documento de tareas @01_tasks_gusanos.md  usando también el documento donde se describe y define el alcance del proyecto: @00_prd_gusanos.md 
Vamos a empezar con la primera tarea. 
Cada tarea deberá tener un título, descripción detallada tanto funcional como técnica y un listado de algunas pruebas a realizar para dar por válida la tarea. La tarea debe ser autocontenida, es decir, debe tener toda la información para no tener que mirar el PRD u otros documentos.
```

## Tarea 1
```
Eres un programador experto en desarrollo de juegos HTML + Javascript usando el framework Phaser.
Necesito que poco a poco vayamos implementando el juego descrito en el PRD @00_prd_gusanos.md 
Vamos a empezar con la tarea siguiente:

Implementación del canvas y renderizado del terreno. Mostrar el terreno a partir de la imagen  prediseñada @worms_mapa_2.png 

Se debe utilizar Phaser para cargar la imagen e interpretar que los píxeles transparentes son vacío y lo demás terreno sólido. Luego se utilizará para detectar colisiones con los gusanos y proyectiles de las armas.

Ten en cuenta la estructura actual del proyecto.
```

```
Al cargar la página game.html se produce este error en la consola del navegador:

Map.js:21 Uncaught TypeError: Cannot read properties of undefined (reading '3')
    at new Map (Map.js:21:35)
    at Game.create (Game.js:13:20)
    at initialize.create (phaser.min.js:1:954364)
    at initialize.loadComplete (phaser.min.js:1:953753)
    at a.emit (phaser.min.js:1:1643)
    at initialize.loadComplete (phaser.min.js:1:531612)
    at initialize.fileProcessComplete (phaser.min.js:1:531312)
    at t.onProcessComplete (phaser.min.js:1:525102)
    at data.onload (phaser.min.js:1:556046)
```

```
La imagen estaba en assets/maps y he corregido el código de Game.js
El terreno sigue sin verse y se produce este error:

Map.js:15 Uncaught TypeError: texture.getFrameData is not a function
    at new Map (Map.js:15:35)
    at Game.create (Game.js:13:20)
    at initialize.create (phaser.min.js:1:954364)
    at initialize.loadComplete (phaser.min.js:1:953753)
    at a.emit (phaser.min.js:1:1643)
    at initialize.loadComplete (phaser.min.js:1:531612)
    at initialize.fileProcessComplete (phaser.min.js:1:531312)
    at t.onProcessComplete (phaser.min.js:1:525102)
    at data.onload (phaser.min.js:1:556046)


La versión de Phaser usada es: v3.80.1
¿Puedes comprobar que lo usado de la librería sea correcto? Utiliza la documentación de Phaser en @Phaser 3.80 
```

```
El tamaño de todos los mapas será el de la imagen (1080 x 400). 
Se dará un margen de 200 píxeles de altura que representaran vacío.
Hay que revisar que todas las medidas se adapten a este tipo de terreno.
```

## Tarea 2
```
Eres un programador experto en desarrollo de juegos HTML + Javascript usando el framework Phaser.
Necesito avanzar en las tareas para implementar el juego descrito en @00_prd_gusanos.md 
Vamos a seguir introduciendo el gusano en el fichero Worm.js y haciendo que se renderice en forma de rectángulo (15x30 píxeles) en un punto aleatorio del mapa.
Ten en cuenta que debe situarse encima del terreno sólido, justo antes de colisionar en él.
Si la posición aleatoria resulta en el agua, debe encontrar otra posición que esté encima del terreno sólido.
```

```
Puedes actualizar GAme.js para crear un gusano?
```

```
Necesito implementar la clase Team
```

```
Tengo el siguiente error en la consola de logs:


Worm.js:35 Uncaught TypeError: map.isTerrainAt is not a function
    at Worm.checkCollision (Worm.js:35:20)
    at Worm.getRandomValidPosition (Worm.js:21:81)
    at new Worm (Worm.js:10:30)
    at Game.create (Game.js:38:27)
    at SceneManager.create (phaser.js:196456:26)
    at SceneManager.loadComplete (phaser.js:196363:14)
    at LoaderPlugin.emit (phaser.js:200:35)
    at LoaderPlugin.loadComplete (phaser.js:118769:14)
    at LoaderPlugin.fileProcessComplete (phaser.js:118735:18)
    at ImageFile.onProcessComplete (phaser.js:117534:21)

```

```
Al colocar los gusanos no se tiene en cuenta que en @Map.js  se "mueve" el terreno para tener un margen arriba.
Además, al renderizar se ve un recuadro azul del tamaño de la imagen del mapa. Esto es porque tenemos activo el debug de Phaser.
¿Puedes revisar por qué el recuadro azul no cubre también el espacio superior considerado vacío y por qué los gusanos no parecen tener en cuenta este espacio que dejamos?
```

## Tarea 3: Movimiento horizontal de los gusanos (tercer intento)
```
Eres un programador experto en desarrollo de juegos HTML + Javascript usando el framework Phaser con Matter.JS.
Estamos desarrollando el juego "Gusanos" descrito en el PRD @00_prd_gusanos.md 
Utiliza el @Codebase actual para añadir movimiento horizontal al Worm. 
El movimiento se hará utilizando las teclas de dirección "derecha" e "izquierda". También tenemos que añadir el movimiento de salto con la tecla de dirección "arriba".
El gusano debe moverse a una velocidad de 5 píxeles por pulsación o segundo de pulsación. 
El gusano debe parar si se encuentra con una pared o un terreno demasiado inclinado en su dirección de movimiento.
Nunca puede atravesar el terreno, pero si puede caer, en cuyo caso se desplazará verticalmente hasta encontrar terreno sólido o agua.
Si encuentra agua, se hundirá y perderá toda su vida.
```

```
El movimiento lateral debe tener en cuenta que si el terreno desciende ante cualquier inclinación, el gusano debe descender. 
Si el terreno asciende con una inclinación que no se considere una pared, el gusano debe ascender también. Ahora mismo el gusano se mueve solo lateralmente sin subir ni bajar pendientes.
```

### Animación del gusano (no se ha conseguido)
```
He añadido lógica para cargar un sprite de imagenes @worms_and_weapons.png  en @Game.js  y usarlo en @Worm.js  para pintar el gusano en vez de un rectángulo. ¿Puedes revisarlo? No se visualiza nada, solo un recuadro gracias al flag debug de la configuración de PHaser.
```

```
Que hace estas líneas? Qué puede estar causando que no se muestre el gusano?
```

```
He cambiado el sprite y ahora ya se dibuja el primer frame pero la animación al caminar no funciona por el siguiente error:
TypeError: Cannot read properties of undefined (reading 'duration')
    at Animation.getFirstTick (phaser.js:3474:46)
    at AnimationState.startAnimation (phaser.js:6323:14)
    at AnimationState.play (phaser.js:6212:21)
    at Sprite.play (phaser.js:80253:27)
    at Worm.moveLeft (Worm.js:78:32)
    at Game.update (Game.js:59:22)
    at Systems.step (phaser.js:199167:26)
    at SceneManager.update (phaser.js:196402:21)
    at Game.step (phaser.js:17218:20)
    at TimeStep.step (phaser.js:18242:14)

@Worm.js Revisa este fichero por favor
```

```
Qué se puede configurar en este código donde se configura la animación?
El sprite en concreto tiene 15 frames de 60x60. Parece que el error dice que falta definir la duración
```

```
Lo que falla es esta línea de la librería Phaser:

        state.nextTick = (state.currentFrame.duration) ? state.currentFrame.duration : state.msPerFrame;

```

```
Se está produciendo el error siguiente al pulsar una tecla de dirección:

phaser.js:3474 Uncaught TypeError: Cannot read properties of undefined (reading 'duration')
    at Animation.getFirstTick (phaser.js:3474:46)
    at AnimationState.startAnimation (phaser.js:6323:14)
    at AnimationState.play (phaser.js:6212:21)
    at Sprite.play (phaser.js:80253:27)
    at Worm.moveLeft (Worm.js:67:32)
    at Game.update (Game.js:59:22)
    at Systems.step (phaser.js:199167:26)
    at SceneManager.update (phaser.js:196402:21)
    at Game.step (phaser.js:17218:20)
    at TimeStep.step (phaser.js:18242:14)

Revisa el código de @Game.js  y @Worm.js 
```

```
El sprite tiene las imagenes una debajo de otra. No hay una al lado de otra. Puede tener algo que ver?
```

## Tarea 4: Turnos básico
```
Seguimos con la siguiente tarea: Implementación del sistema de turnos básico.
Revisa el @00_prd_gusanos.md  para saber el funcionamiento de los turnos
```

```
Usa el código de @Game.js  y @Round.js  para corregir lo siguiente:
El texto de Turno y Tiempo se debe actualizar en la barra de estado actual de @game.html 
```

```
Revisa el código de @Game.js  y @Round.js  para que el turno sea del equipo pero solo se pueda mover uno de sus gusanos, no todos. Además, la tecla para pasar al siguiente turno debe ser ESC, puesto que space se ha usado para saltar en la línea 85
```

```
Revisa la solución propuesta, la gestión del gusano actual la debe llevar 
```

```
Sale el siguiente error en la consola, Puede ser que no exista `this.cursors.esc`?

phaser.js:114642 Uncaught TypeError: Cannot read properties of undefined (reading '_justDown')
    at Object.JustDown (phaser.js:114642:13)
    at Game.update (Game.js:95:35)
    at Systems.step (phaser.js:199167:26)
    at SceneManager.update (phaser.js:196402:21)
    at Game.step (phaser.js:17218:20)
    at TimeStep.step (phaser.js:18242:14)
    at step (phaser.js:31346:19)
```

```
Bien. Seguimos: Para poder identificar bien los gusanos tenemos que mostrar el nombre del gusano encima de su sprite con el color de su equipo.
```

```
Me gustaría refactorizar @Game.js  y @Map.js  para que sea Map el responsable de definir el setBounds del mundo físico, el fondo, el agua y el cielo o techo del mundo.
```

## Tarea 5: Armas
```
Como analista especializado en desarrollo de juegos HTML + Javascript necesito modificar el PRD @00_prd_gusanos.md  para cambiar todo lo referente a disparo y armas en base a lo siguiente:
- En vez de un Bazooka el primer arma que implementaremos será una Pistola, que la trayectoría es recta y por tanto más simple.
- Todas las armas tendrán un tipo de trayectoria (simple o parábola). Un radio de impacto (número de píxeles con los que se mirará la colisión). Un radio de explosión (una vez colisione, es el número de píxeles a los que afectará). Potencia: Puntos de vida que se eliminará de un gusano si impacta en él.
- Para controlar cualquier arma se utilizaran las flechas "Arriba" y "Abajo". 
- Se mostrará un puntero a cierta distancia del gusano y se moverá arriba o abajo con las flechas y siempre en dirección a la que mire el gusano (derecha o izquierda)
- Para disparar se pulsará la tecla ENTER
- Se debe resolver la trayectoria y evaluar donde impacta, teniendo 3 posibilidades: 
  - Terreno: No pasa nada (En un futuro se eliminará el terreno del área correspondiente al radio de explosión desde donde ha impactado)
  - Gusano: Se le quitará la vida en función a la potencia del arma. ADemás, en un futuro se evaluará el área de explosión y se eliminará el terreno
  - Fuera del mundo: Si sale del área del mundo, se descarta el disparo y finaliza la acción
- Una vez resuelto el disparo, se cambia de turno automáticamente.
```

```
Ahora, como programador experto en HTML, Javascript y el uso de Phaser como framework, empezaremos a implementar la lógica para el arma Pistola.
Ten en cuenta el PRD el PRD @00_prd_gusanos.md  donde se define la funcionalidad.
Seguiremos estos pasos:
1. Dibujar el puntero
2. Mover el puntero en función de la dirección del gusano (Derecha o Izquierda) y el ángulo de disparo (se incrementará con la tecla Arriba y disminuirá con la tecla Abajo)
3. Al pulsar la tecla ENTER se efectuará el disparo. Se imprimirá en consola BOOM y pasará el turno. Nada más.
4. Al efectuar el disparo, se calculará la trayectoria y se buscará la primera colisión contra un gusano o contra el terreno o si sale del mundo. Se imprimirá en consola donde ha impactado pero no hará nada más.
5. Se evaluará el impacto y se calculará su resultado. Como solo tendremos en cuenta el impacto a gusanos, se le restará la vida según la fuerza del arma.

Empecemos con el paso 1, no avances más hasta que te lo indique.
```

```
Revisa @Weapon.js  y @Worm.js  para hacer que la posición de la mirilla o puntero se calcule desde el centro del Gusano, no desde la parte superior del gusano.
```

```
Perfecto. Seguimos con el paso 2 para mover el puntero
```

```
De acuerdo, seguimos con el siguiente paso.
```

```
Parece que la tecla ENTER tampoco está mapeada porque da este error:

phaser.js:114642 Uncaught TypeError: Cannot read properties of undefined (reading '_justDown')
    at Object.JustDown (phaser.js:114642:13)
    at Weapon.update (Weapon.js:58:35)
    at Worm.update (Worm.js:115:21)
    at Game.update (Game.js:83:24)
    at Systems.step (phaser.js:199167:26)
    at SceneManager.update (phaser.js:196402:21)
    at Game.step (phaser.js:17218:20)
    at TimeStep.step (phaser.js:18242:14)
    at step (phaser.js:31346:19)
```

```
Antes de seguir haremos un cambio: Ocultar el puntero de disparo para los gusanos no activos. Puedes revisar @Game.js  y @Worm.js  y @Weapon.js  para este cambio?
```

```
Seguimos con el siguiente paso:
4. Al efectuar el disparo, se calculará la trayectoria y se buscará la primera colisión contra un gusano o contra el terreno o si sale del mundo. Se imprimirá en consola donde ha impactado pero no hará nada más.
```

```
Implementa el último punto:
5. Se evaluará el impacto y se calculará su resultado. Como solo tendremos en cuenta el impacto a gusanos, se le restará la vida según la fuerza del arma.
```

```
Para poder evaluar que funciona, vamos a mostrar la vida de los gusanos en la UI. Encima del nombre situa un texto que muestre la vida actual con el mismo color y tamaño que el nombre.
```

```
Para facilitar apuntar con el gusano vamos a dibujar una línea discontinua de color rojo entre el centro del gusano (donde se tiene en cuenta para trazar el disparo) y la mirilla.
Modifica @Worm.js  y @Weapon.js  para implementarlo.
```

```
Se muestra este error: TypeError: this.aimLine.setTexture is not a function
    at Weapon.updatePointerPosition (Weapon.js:43:22)
    at Weapon.createPointer (Weapon.js:24:14)
    at new Weapon (Weapon.js:16:14)
    at new Worm (Worm.js:45:23)
    at Game.js:43:30
    at Array.forEach (<anonymous>)
    at Game.create (Game.js:39:15)
    at SceneManager.create (phaser.js:196456:26)
    at SceneManager.loadComplete (phaser.js:196363:14)
    at LoaderPlugin.emit (phaser.js:200:35)

Utiliza el código actualizado de @Weapon.js  y @Worm.js 
```

## Pedir Instrucciones del juego
```
A partir del documento @00_prd_gusanos.md  y el código puedes generar unas pequeñas instrucciones de juego para documentar en el Readme.md? Deben estar en formato Markdown
```

```
Puedes traducirlas al castellano?
```


## Fix: Worm animation

```
En este juego de "Gusanos" estoy intentando animar el Worm. 
Para ello se crea la animación en @Game.js  y en @Worm.js  se lanza (play()) cuando se mueve el gusano.
Esto causa un error en la consola del navegador:

phaser.js:3474 Uncaught TypeError: Cannot read properties of undefined (reading 'duration')
    at Animation.getFirstTick (phaser.js:3474:46)
    at AnimationState.startAnimation (phaser.js:6323:14)
    at AnimationState.play (phaser.js:6212:21)
    at Sprite.play (phaser.js:80253:27)
    at Worm.moveLeft (Worm.js:77:36)
    at Worm.update (Worm.js:131:18)
    at Game.update (Game.js:90:24)
    at Systems.step (phaser.js:199167:26)
    at SceneManager.update (phaser.js:196402:21)
    at Game.step (phaser.js:17218:20)

¿Puedes revisar? Utiliza la documentación de Phaser @Phaser 3.80  por si estamos haciendo algo mal.
```

```
Al mover el gusano, la animación se ve mal:
El gusano se mueve pero se va desplazando de abajo hacia arriba. ¿A qué puede deberse?
El sprite mide 26x405. Contiene 15 sprites y cada sprite es de 26x29
```

```
Sigue haciendo un scroll hacia arriba mientras se mueve. El sprite sigue el movimiento correctamente a izquierda o derecha, pero la imagen del gusano se va desplazando de abajo a arriba indefinidamente.
Hay que tener en cuenta que el sprite es vertical, con una columna y 15 filas.
```

**Al final era el sprite que estaba mal generado por la herramienta online**


## Enhance: Change design of target

```
Ahora me gustaría cambiar el diseño de la mirilla y usar la imagen en ./assets/images/target.png
```

## Fix: Hide Worm sprite when died
```
Vamos a implementar otra mejora:
Cuando un Worm muere, debe desaparecer la imagen o sprite actual y aparecer la imagen ./assets/images/sprites/worms/grave1.png para el equipo Red o ./assets/images/sprites/worms/grave1.png para el equipo Blue. 
La configuración del tipo de tumba "grave1" o "grave2" debe hacerse en la constante TEAMS de Constants.js
```

```
Sale este error:
Worm.js:175 Uncaught TypeError: this.weapon.destroy is not a function
    at Worm.die (Worm.js:175:21)
    at Worm.takeDamage (Worm.js:163:18)
    at Weapon.calculateTrajectory (Weapon.js:87:25)
    at Weapon.fire (Weapon.js:61:18)
    at Weapon.update (Weapon.js:136:18)
    at Worm.update (Worm.js:145:21)
    at Game.update (Game.js:97:24)
    at Systems.step (phaser.js:199167:26)
    at SceneManager.update (phaser.js:196402:21)
    at Game.step (phaser.js:17218:20)

Que afecta a la clase @Worm.js  y @Weapon.js 
```

## Fix: Kill worm when touches water
```
Vamos a solucionar otro bug: Cuando un gusano cae a la zona de agua se puede seguir moviendo.
Esto no debe ser así, cuando un gusano cae al agua, debe hundirse hasta la zona inferior del agua y morir allí.
```

```
Puntos a corregir:
- Sigue pasando que si sin saltar llega al agua, puede seguir moviéndose porque no detecta la colisión con el agua.
- Cuando se muere por hundirse en el agua, no se le resta toda la vida.
- Cuando se muere por hundirse en el agua, no llega hasta abajo del todo del agua
Revisa el código actualizado de @Worm.js 
```

**AQUÍ HE TOCADO BASTANTE CÓDIGO MANUALMENTE PORQUE NO HA HABIDO FORMA DE IMPLEMENTAR BIEN LA LÓGICA DE HUNDIRSE**

```
Podemos corregir el código para que el método `createWater` cree el agua con un rectángulo de color azul en vez de usar un sprite?
```
