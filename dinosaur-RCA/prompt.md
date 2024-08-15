# PROMPT 1:

Develop a complete JavaScript game like Chrome's dinosaur game that runs in a web browser. The game should be fully contained within a single HTML file, utilizing inline JavaScript and CSS for simplicity. Here are the detailed requirements and structure for the game:

1. **Game Overview:**
   - The game consists of a dinosaur advancing while dodging obstacles that appear on the screen. The objective is to last as long as possible without the dinosaur colliding with an object.
   - The game ends when the dinosaur collides with an object.
   - The game displays a "Game Over" message and the final score when the dinosaur collides with an object.
   - The game shows a score counter that increases each time the dinosaur dodges an object.
   - The more objects the dinosaur dodges, the faster the game moves.

2. **Technical Requirements:**
   - Use plain JavaScript without external libraries.
   - Implement the game logic and rendering within an HTML file, using `<script>` tags for JavaScript and `<style>` tags for CSS.
   - Ensure compatibility with major browsers (Chrome, Firefox, Safari).

3. **Game Components:**
   - The background is white and the entire game is in black and white
   - The dinosaur is a black rectangle that moves forward
   - The obstacles are small black rectangles that appear on the screen
   - The score counter is black text displayed at the top of the screen

4. **Functionality:**
   - The game starts when the page loads.
   - The dinosaur moves forward automatically.
   - The dinosaur jumps if the spacebar is pressed.
   - The score increases each time the dinosaur dodges an object.
   - The game ends when the dinosaur collides with an object.
   - The game displays a "Game Over" message and the final score when the dinosaur collides with an object.
   - The dinosaur can always dodge obstacles by jumping
   - The more objects the dinosaur dodges, the faster the game moves.
   - The game restarts if the spacebar is pressed when the "Game Over" message is displayed.

5. **Styling:**
   - The background is white and the entire game is in black and white
   - The dinosaur is a black rectangle that moves forward
   - The obstacles are small black rectangles that appear on the screen
   - The score counter is black text displayed at the top of the screen
   - Ensure the game is visually clear and plays well on a range of screen sizes.

6. **Optimization & Testing:**
   - Code should be well-organized and commented for readability.
   - Test the game for bugs across different browsers to ensure consistent gameplay.

Deliverable: A single HTML file containing all necessary HTML, CSS, and JavaScript for the Dinosaur game. Include inline comments to explain key parts of the game's code and logic.

Please prioritize functionality, readability of code, and adherence to the game specifications outlined above. This project serves as a comprehensive exercise in JavaScript, CSS, and HTML integration, aiming to showcase proficiency in creating interactive web-based games.

# PROMPT 1 - Comentarios

El juego resultante de la primera versión del prompt 1 es perfectamente funcional. Sin embargo existen algunas mejoras a realizar:

- Mejorar el estilo gráfico
- Corregir el bug al finalizar el juego y volver a empezar
- Arrancar el juego con un primer click en el boton "Enter"
- Mejorar las físicas del salto
- Añadir más aleatoriedad a la aparición de los obstáculos
- Añadir unas instrucciones al comienzo del juego

# PROMPT 2: Estilo gráfico

I want to improve the graphic style of the game, for this:

- Place the entire game area centered vertically and horizontally within the screen, occupying 60% of the width and 60% of the height.
- Add a horizontal line representing the ground
- Make the score display at the top of the screen, centered horizontally, showing Score: [Score]

# PROMPT 3: Estilo gráfico

- Remove the border surrounding the game area
- Make the line representing the ground thinner
- Change the font used in the game to use Press Start 2P from Google Fonts

# PROMPT 4: Bugs

There are some bugs in the game that I want to fix:

- When starting the game, the dinosaur is not touching the ground, fix it so that it is touching the ground
- The obstacles are not touching the ground and are slightly above it, fix it so that they are touching the ground
- When the game ends change the bevaiour to use "Enter" instead of "Space" to restart the game. 
- When restarting the game, the dinosaur should return to its initial position, obstacles should disappear, and the score should be reset to 0

# PROMPT 5: Experiencia de usuario

- Make the dinosaur jump a little less, do it faster and with more realistic physics
- Make the obstacles rectangles with varied shapes and heights
- Make the obstacles appear with more random timing instead of always with the same periodicity

# PROMPT 5: Comentarios

Aquí ha sido más fácil modificar ciertos valores manualmente para conseguir los resultados deseados. 

# PROMPT 5: Experiencia de usuario

- When the score reaches 1000, change the color of the dinosaur to red and add a subtitle below the Score that says: "Maximum speed reached"
- When the score reaches 1500, change the color of the dinosaur to blue and add a subtitle below the Score that says: "Just kidding, it can be faster"
- When the score reaches 2000, change the color of the dinosaur to orange and add a subtitle below the Score that says: "Come on, you can do it. Go for it!"
- When a score of 2500 is reached, change the color of the dinosaur to dark red and add a legend below the Score that says: "Ha ha ha! I'm comming for you!".

# PROMPT 6: Instrucciones

- Before starting the game, add instructions at the beginning of the game that say: "Press Enter to start the game", "Use the spacebar to jump"
- When the game ends, add a subtitle: "Press Enter to restart the game"

# Comentarios finales:

La experiencia de usuario ha sido bastante buena. Creo que se ha conseguido hacer un buen juego entretenido en pocas horas de trabajo. Practicamente su totalidad ha sido implementado por la IA utilizando pocos prompts, sin embargo para modificar algunos aspectos especialmente de la usabilidad y la experiencia la manera más sencilla ha sido modificando manualmenente algunos parametros.

