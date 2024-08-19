 Tiempo de desarrollo del juego "Gusanos"
==================
Miércoles 07/08/2024 : 2h para redactar casi todo el PRD del proyecto

Lunes 19/08/2024 : 10:00 - 

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
Como programador senior especialista en desarrollo de videojuegos HTML + Javascript, puedes implementar la tarea "1 Configuración inicial del proyecto" descrita en el fichero @01_tasks_gusanos.md ?
Sigue siempre buenas prácticas de desarrollo en cualquier lenguaje de programación.
```

## Tarea 2
```
Como analista programador de software, experto en desarrollo de juegos HTML + Javascript, seguiremos con la segunda tarea "Implementación del canvas y renderizado del mapa" del fichero @01_tasks_gusanos.md 
Realiza primero un detalle de la tarea con:  un título, descripción detallada tanto funcional como técnica y un listado de algunas pruebas a realizar para dar por válida la tarea. La tarea debe ser autocontenida, es decir, debe tener toda la información para no tener que mirar el PRD (@00_prd_gusanos.md ) u otros documentos.
El formato de salida del detalle de tarea será Markdown para incorporarlo al fichero @01_tasks_gusanos.md 
```

## Tarea 3
```
Como analista programador de software, experto en desarrollo de juegos HTML + Javascript, seguiremos con la la tarea "3-Creación de la clase Worm y renderizado de un gusano estático" del fichero @01_tasks_gusanos.md 
Realiza un detalle de la tarea con:  un título, descripción detallada tanto funcional como técnica y un listado de algunas pruebas a realizar para dar por válida la tarea. La tarea debe ser autocontenida, es decir, debe tener toda la información para no tener que mirar el PRD (@00_prd_gusanos.md ) u otros documentos.
El formato de salida del detalle de tarea será Markdown para incorporarlo al fichero @01_tasks_gusanos.md 
No implementes la solución aún, solo el detalle de la tarea.
```

```
La posición inicial del Worm debe ser aleatoria y debe ser válida. Es decir, debe situarse encima del terreno del mapa.
Además, ya debemos indicar el uso del framework definido en el PRD.
```

```
Puedes implementar lo anterior?
```

```
Por favor ten en cuenta los ficheros actuales del proyecto 
```

