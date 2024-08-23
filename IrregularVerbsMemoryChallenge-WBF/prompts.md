
### 1. **Nombre del juego**:  
   "Irregular Verbs Memory Challenge"

### 2. **Objetivo del juego**:  
   Emparejar todos los verbos irregulares (infinitivo con su pasado o participio) antes de que se acabe el tiempo. Si el jugador logra emparejarlos antes de que el cronómetro llegue a 0, gana. Si no, las cartas se vuelven a voltear y el jugador deberá reiniciar el juego.

### 3. **Estructura del proyecto**:
   - **index.html**: Contendrá la estructura básica del juego.
   - **style.css**: Definirá el estilo de las cartas, el cronómetro y la página general con gradientes y efectos visuales.
   - **main.js**: Manejará la lógica del juego (emparejamiento, cronómetro, reinicio).

### 4. **Detalles de juego**:

#### 4.1. **Cartas**:
   - **Diseño**: Las cartas serán estilizadas con CSS. Cada carta tendrá un **gradiente suave** de fondo, bordes redondeados, y un **efecto hover** para que cuando el usuario pase el mouse sobre ellas, brillen o cambien de color.
   - **Contenido**: Los textos de las cartas serán los **verbos irregulares**: unos mostrarán el infinitivo, y otros el pasado o participio.
   - **Comportamiento**: 
     - Cuando el jugador haga clic en una carta, esta se girará (animación CSS `flip`) para mostrar el verbo.
     - El jugador tiene que seleccionar dos cartas. Si ambas coinciden (infinitivo y pasado/participio), las cartas quedarán visibles.
     - Si no coinciden, ambas cartas se girarán de nuevo tras un breve delay (1 segundo).

#### 4.2. **Cronómetro**:
   - **Tiempo**: El cronómetro tendrá un límite (por ejemplo, 60 segundos). 
   - **Visualización**: El cronómetro aparecerá en la parte superior de la pantalla con un diseño atractivo (barras de progreso animadas o números grandes que vayan disminuyendo).
   - **Comportamiento**: 
     - Si el tiempo se acaba antes de que todas las cartas sean emparejadas, todas las cartas se vuelven a voltear y el jugador debe reiniciar.
     - Si el jugador empareja todas las cartas antes de que el tiempo se acabe, el cronómetro se detiene y muestra un mensaje de victoria.

#### 4.3. **Niveles de dificultad**:
   - Puedes agregar niveles de dificultad simplemente aumentando o disminuyendo el número de cartas disponibles.
   - **Fácil**: 6 pares de cartas.
   - **Intermedio**: 8 pares de cartas.
   - **Difícil**: 10 pares de cartas.

### 5. **Interacción**:
   - **Eventos de clic**: Cuando el usuario haga clic en una carta, se activará la animación para girarla y revelar su contenido.
   - **Emparejamiento**: Al hacer clic en dos cartas, el juego verificará si las palabras emparejan (infinitivo y su forma en pasado o participio). Si lo hacen, permanecen visibles; si no, se voltean de nuevo.
   - **Reinicio del juego**: Si se acaba el tiempo o el jugador lo desea, debe haber un botón que permita reiniciar el juego desde cero.

### 6. **Documentación (prompts.md)**:
   En este archivo documentaremos los prompts usados para guiar al asistente de código en la creación de cada parte. Aquí está un primer borrador de los prompts que podrías usar.

---

### **Prompts**

1. **Creación de la estructura básica**:
   > "You are an expert game developer. Your task is to create the structure for a simple web-based memory game using HTML, CSS, and JavaScript. 
   
   Inside 'index.html', include a basic structure with a header that displays a countdown timer, a grid of cards, and a button to restart the game."

2. **Diseño de las cartas**:
> "Please style the cards in the memory game using CSS. Each card should have a gradient background with soft colors, rounded corners, and a flip animation. When the card is flipped, it should display a verb (either in its infinitive form or its past/participle form). If two cards are flipped and matched, they should remain visible; otherwise, they should flip back after 1 second.

> Use this list of irregular verbs to populate the content of the memory game cards. Each card should either show the infinitive, past simple, or past participle form of a verb. Here is the list of verbs to use:
be – was/were – been
beat – beat – beaten
become – became – become
begin – began – begun
bite – bit – bitten
blow – blew – blown
break – broke – broken
bring – brought – brought
build – built – built
buy – bought – bought
catch – caught – caught
choose – chose – chosen
come – came – come
cost – cost – cost
cut – cut – cut
do – did – done
draw – drew – drawn
drink – drank – drunk
drive – drove – driven
eat – ate – eaten
fall – fell – fallen
feel – felt – felt
fight – fought – fought
find – found – found
fly – flew – flown
forget – forgot – forgotten
get – got – got
give – gave – given
go – went – gone
grow – grew – grown
hang – hung – hung
have – had – had
hear – heard – heard
hide – hid – hidden
hit – hit – hit
hold – held – held
hurt – hurt – hurt
keep – kept – kept
know – knew – known
leave – left – left
lend – lent – lent
let – let – let
lie – lay – lain
light – lit – lit
lose – lost – lost
make – made – made
mean – meant – meant
meet – met – met
pay – paid – paid
put – put – put
read – read – read
ride – rode – ridden
ring – rang – rung
rise – rose – risen
run – ran – run
say – said – said
see – saw – seen
sell – sold – sold
send – sent – sent
shine – shone – shone
shoot – shot – shot
show – showed – shown
shut – shut – shut
sing – sang – sung
sit – sat – sat
sleep – slept – slept
speak – spoke – spoken
spend – spent – spent
stand – stood – stood
steal – stole – stolen
swim – swam – swum
take – took – taken
teach – taught – taught
tear – tore – torn
tell – told – told
think – thought – thought
throw – threw – thrown
understand – understood – understood
wake – woke – woken
wear – wore – worn
win – won – won
write – wrote – written

> The game will randomly distribute these forms across the cards. The player must match the correct infinitive, past simple, and past participle forms to win.

3. **Lógica del juego (emparejamiento y cronómetro)**:
   > "Implement the game logic in JavaScript. When the player clicks on a card, it should flip over and show a verb. The player can flip two cards at a time. If the cards match (infinitive and past/participle form of the verb), they should remain visible. If not, they should flip back after 1 second. Also, create a countdown timer that starts at 60 seconds. If the player matches all cards before time runs out, show a 'You Win' message. If time runs out, reset all cards and restart the game."

4. **Cronómetro**:
   > "In the game, implement a countdown timer that starts at 60 seconds and decreases. Show the timer at the top of the screen in a large, bold font. If the timer reaches 0, flip all the cards back over and restart the game. If the player wins (matches all cards), stop the timer."

5. **Ajuste de niveles**:
   > "Create three difficulty levels for the game: Easy (6 pairs of cards), Medium (8 pairs), and Hard (10 pairs). Adjust the number of cards based on the selected difficulty and modify the timer (Easy: 60 seconds, Medium: 45 seconds, Hard: 30 seconds). Allow the player to select the difficulty level before starting the game."





