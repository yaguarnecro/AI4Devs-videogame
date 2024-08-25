# Claude-3.5-sonnet
# PROMPT 1
Develop a complete JavaScript flappy bird game that runs in a web browser. The game should be fully contained within a single HTML file, utilizing inline JavaScript and CSS for simplicity. Here are the detailed requirements and structure for the game:

1. **Game Overview:**
   - The game is inspired on the "flappy bird" game. 
   - The scenario is an horizontal tunnel.
   - A bird is in a tunnel and the tunnel automatically moves from the right to the left.
   - In the scenario, there are artefacts fixed in the floor and ceiling of the tunnel (vertical rectangles of different shapes).
   - As the game progresses the speed increases and the user sums points to the score.
   - Every now and then a small circle appears from the right, that can be red or blue and increases or reduces the score.
   - The game ends when the bird collides with an artefact or the grid boundaries vertically (ceiling or floor).

2. **Technical Requirements:**
   - Use plain JavaScript without external libraries.
   - Implement the game logic and rendering within an HTML file, using `<script>` tags for JavaScript and `<style>` tags for CSS.
   - Ensure compatibility with major browsers (Chrome, Firefox, Safari).

3. **Game Components:**
   - A game area represented by an horizontal rectangle.
   - A bird that starts at the left central part of the tunnel.
   - Artefacts (vertical rectangles) in the tunnel floor and ceiling, randomly placed and more frequent as the game progress. Each artefact can measure from 10% to 40% of the tunnel height.
   - Circular modifiers that can be blue or red.
   - A score counter at the top left part of the screen.
   - A timer in rounded seconds just below the score.
   - A speedometer at the top right part of the screen.

4. **Functionality:**
   - The game starts when the page loads and the user clicks the space key.
- The bird is fixed at the center left part of the tunnel, at 100 pixels of the left border of the tunnel. 
   - Jump/flutter: The space key makes the bird jump/flutter once (up). The bird jumps/flutter 3 pixels vertically with individual clicks of the space key; one flutter per space key pressed. The bird doesn't move horizontally, it's the background the one that moves from right to left. The initial speed is of 150 pixels per seconds. The bird can't move horizontally.
- The artefacts are joint to the ceiling and floor of the tunnel that moves, so they move with it. As the speed increases, more artefacts are also present. 
- The gravity makes the bird go down if the space key is not pressed. 
- Every 5 seconds of game one circular modifier appears from the right, than can be blue or right. The blue and red circles go straight from the right side of the tunnel to the left. If the bird hits this blue circle, the score is increased by 100 points, if it hits the red circle the score is decreased by 100 points.
- Every 10 seconds of game, the speed of the background increases by 20%, the frequency of the rectangle artefacts is increased; and the background color of the game changes.
- The gravity makes the bird go down by 20% of the speed pixels each second.
   - The score increases by 1 each half second of game played and is rounded to the closest integer value.
   - Display a "Game Over" message when the game ends, along with the final score and an option to start again. Once start again (or enter key) is clicked, the bird starts at its initial position.

5. **Styling:**
   - Style the game area and elements minimally but distinguishably. Use contrasting colors for the bird, artefacts, circles and game area.
   - Ensure the game is visually clear and plays well on a range of screen sizes.

6. **Optimization & Testing:**
   - Code should be well-organized and commented for readability.
   - Test the game for bugs across different browsers to ensure consistent gameplay.

Deliverable: A single HTML file containing all necessary HTML, CSS, and JavaScript for the Flappy Bird game. Include inline comments to explain key parts of the game's code and logic.

Please prioritize functionality, readability of code, and adherence to the game specifications outlined above. This project serves as a comprehensive exercise in JavaScript, CSS, and HTML integration, aiming to showcase proficiency in creating interactive web-based games.

# PROMPT 2
- Make the gravity (down movement) more playable. To do it, track the Y location of the bird and make it vary constantly over time.
- Once the game is over, stop the game (and counters).
- The circles with score modifiers can't appear in top of the rectangular artefacts.

# PROMPT 3
Make the frequency of rectangular artefacts increase as the game progress.

# PROMPT 4
- Each 30 seconds, another circular modifier appears, with pink color and double the size of the blue and red ones. 
- If the bird hits it, a bonus modifier is activated, boosting the score increase x5 as usual during 10 seconds.
- During these 10 bonused seconds, the bird gets gold, and the frame of the screen (tunnel) becomes gold too. 

# PROMPT 5
- When the bonus in enabled, the "BONUS"  word appears in the top center of the screen in gold
- Diable the bird jump when gameover

# PROMPT 6
Instead of changing the background color everytime 10 seconds, make it change randomly among the 6 background present in the @res  folder (i.e. @background-1.png , @background-2.png ...)

# PROMPT 7
Now change the yellow circle representing the bird for the image@bird.png . Keep it at 30x30px

# PROMPT 8
Now change the arfectacts (green rectangles) by the different trees images available at @res (@tree-1.png ...). Be sure that the height of the trees doesn't exceed the maximum size that the rectangles had

# PROMPT 9
- There are 12 trees available at @res (tree-small-*.png, tree-medium-*.png, tree-large-*.png...). Select them randomly and keep the appearance ratio already implemented.
- The trees must only appear in the floor (bottom) and the ceiling (upper) part of the tunnel.
- In the floor (bottom part), the trees must be the ones in the folder and must be touching the floor
- In the ceiling (top part), the trees must be rotated 180º and have its new upper part touching the ceiling

# PROMPT 10
All the trees look small, change it so we include a variation of sizes and tree types constantly

# PROMPT 11
It looks like the bird is collapsing without actually touching the trees. Make the collider more precise.

# PROMPT 12
- The circle modifiers can't appear in top of the trees
- When the bonus score is activated, the border of the game should be goldish, all the texts (score, time & speed) too, and the bird should have a goldish brightness effect

# PROMPT 13
Change the blue and red circles by its equivalent images @blue.png and@red.png and double their size.

# PROMPT 14
- Change the pink modifier by the image pink.png and double its size.
- Any modifier must not overlap with artifacts

# PROMPT 15
Provide a README describing the game, instructions to play it and main dynamics

# COMMENTS
- The bird is collapsing without actually touching the trees. I tried to make the collider more precise but the shape of the trees is not a rectangle nor the bird a circle, so it will need additional work.
- The jump and gravity is not smooth for higher speeds, would need more work.