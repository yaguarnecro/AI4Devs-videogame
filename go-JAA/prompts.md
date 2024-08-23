## Prompts

### Prompt1
Quiero que actúes como un desarrollador web experto que implementa juegos web, además quiero que actues como un experto jungando al `Go` porque necesito que me ayudes a crear una versión web del juego `Go`; como experto quiero que conozcas todas las reglas del juego, por favor respondeme si conoces estas reglas con un Sí o un No, o si necesitas más contexto del juego.

### Prompt2
Quiero crear una versión versión básica del juego desde cero, en en un tablero 9x9; donde se pueda incrementar de nivel desde básico a medio-avanzado; en esta versión del juego se podria jugar un solo jugardor contra el ordenador. será una versión web que pueda ser compatible con todos los navegadores, utilizar puro JavaScript sin formato y evitar cualquier biblioteca externa, necesito implementar la lógica del juego y la representación dentro de un archivo HTML, utilizando etiquetas <script> para JavaScript y etiquetas <style> para CSS; y se necesita garantizar la compatibilidad con los principales navegadores (Chrome, Firefox, Safari).

### Prompt3
Voy a describir algunas reglas que necesitas que adaptes al juego, son las siguientes:

- Se juega sobre un tablero inicialmente vacío de 9x9 líneas, aunque también es habitual utilizar tableros menores, por lo que podríamos dejar al jugador que configure el tablero antes de empezar a jugar en un espacio llamado Configuración.
- Los dos jugadores que participan disponen de un abundante número de piedras de color negro o blanco, espectivamente, que se van colocando sobre el tablero, al principio del juego el jugador deberá seleccionar su color.
- El objetivo básico del juego es utilizar las piedras propias para formar territorio rodeando regiones vacias del tablero; realizar capturas no es el objetivo final, pero sirve para obtener dicho territorio. Gana quien alcanza la máxima puntuación, que básicamente se corresponde con el control de un mayor territorio. Por lo que deberás calcular la puntuación final de ambos jugadores una vez finalizada la partida.
- Para entender la dinámica y objetivo del juego es preciso definir previamente un par de conceptos:
  * Los puntos no ocupados que se encuentran horizontal y verticalmente adyacentes a una piedra o grupo de piedras se denominan libertades.
  * Los grupos de intersecciones libres que se encuentran rodeadas de piedras de un solo color se dice que son territorio del jugador que juega con dicho color.
  * Un grupo de piedras es capturado cuando no tiene ninguna libertad, es decir, cuando es rodeado totalmente por piedras del jugador rival sin que el grupo de piedras capturado tenga ningún hueco libre en su interior.
  * En particular, una piedra aislada es capturada cuando es rodeada por 4 piedras rivales; si la piedra se encuentra en un lateral o esquina del tablero, es suficiente con que sea rodeada respectivamente por 3 ó 2 piedras rivales.
  * Las piedras capturadas son retiradas del tablero.
- Existen dos motivos que pueden impedir la colocación de una piedra:
  * Suicidio: no está permitido jugar una piedra en un punto donde quedaría sin libertades o formaría parte de una cadena que queda sin libertades, a menos que como resultado de la colocación de la piedra se realice alguna captura.
  * La regla del ko: no está permitido realizar un movimiento que provoque que la partida vuelva a una situación previa. Esta regla se aplica frecuentemente en situaciones en las que una piedra que acaba de ser colocada realizando una captura podría ser a su vez capturada de inmediato colocando una nueva piedra en la misma posición que ocupaba la piedra recién capturada, lo cual podría provocar una situación cíclica.
- La partida finaliza mediante un acuerdo entre ambos jugadores. Cuando alguno de ellos cree que no es posible hacer más territorio, capturar más piedras enemigas o reducir el territorio del rival debe pasar en lugar de colocar una piedra en el tablero. El protocolo de final de partida se inicia cuando ambos jugadores pasan consecutivamente.

### Prompt4
Necesito que hagas algunas mejoras de esta versión para que sea más adecuada para los jugadores:

**Uso del juego:**
- El jugador necesitará entrar al juego pulsando el botón empezar.
- El jugador podría configurar el juego pulsando el botón configurar.
- El jugador podría finalizar el juego una vez empezado pulsando el botón finalizar.
- El jugador podría pasar una jugada pulsando el botón pasar.
- El jugador jugará diferentes niveles, del 1 al 10, aumentando la dificultadde de la IA cada vez que gane.
- Al finalizar el juego deberás mostrar la puntuación de ambos jugadores y mostrar el ganador.

N**UI:**
 - Los botones Empezar y Configurar debería inactivarse una vez se empieza la partida.
 - El mensaje de puntuación debería desaparecer cuando se empieza una prtida nueva.
 - Necesito que muestres las reglas de juego, para eso necesitas crear un nuevo botón que pueda mostrar un popup con las reglas de Go.
 
**Optimización de la IA:**
- El código debe estar bien organizado y comentado para facilitar su lectura.
- La IA debería tener niveles cuando juegue, van del 1 al 10, 1 el más básico el 10 el más avanzado; necesito que la IA pueda jugar "mejor" cuando el jugador vaya ganando partidas. Si necesitas alguna API o recurso externo para crear esta IA la puedes implementar  
- Quiero que muestres el nivel que se está jugando a medida que el jugador va pasando de niveles.

### Prompt5
Existe un error en la contabilidad final, quiero que contabilices la partida usando la Contabilidad por área: este es el método utilizado en las reglas chinas. Cada jugador se puntúa por cada piedra situada sobre el tablero y por cada intersección en territorio propio.Tiene la ventaja de ser más fácil de entender al comenzar a practicar el juego, y de que el resultado no se ve influído por los posibles desacuerdos en el final de partida. 

### Prompt6
Parece que hay un error en el método `function isLegalMove(x, y, color)`, ahora no me permite realizar ningun movimiento, las piedras no se están poniendo en el tablero, al parcer el método hasLiberties retorna siempre un false.

### Prompt7
Parece que has eliminado la llamada a !isKo(x, y, color) ?? Podrías restablecerla ?

### Prompt8
Crea la description de este juego, el concepto y un resumen técnico en formato Pull request.

### Prompt9
Necesito que validez la última version, que la analices y dime si cubre todas las funcionalidades que se han definido

### Prompt10
Hay una funcionalidad que tambien está parcial y necesita mejoras, "El color de las piedras muertas";  esto no se cumple, podría ser por un bug, las piedras siguen teniendo el mismo color o el color de las piedras muertas siguen igual. Esto se podría mejorar?

### Prompt11
De acuerdo con la conclusión que diste sobre la IA, se necesitan mejoras adicionales en la IA para hacerlo más avanzado, podría ser necesario integrar una biblioteca de IA o un motor de juego de Go, lo cual no está implementado en la versión actual. Me gustaría seguir con esta mejora y proceder con la integración de un motor de IA más avanzado o realizar cualquier ajuste menor necesario en la interfaz o lógica del juego. Qué sugieres, cómo comenzamos?