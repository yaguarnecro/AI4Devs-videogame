import pygame
import sys

# Initialize Pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
CUBE_COLORS = [(255, 0, 0), (0, 255, 0), (0, 0, 255)]

# Set up the display
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Q*bert")

# Pyramid dimensions
ROWS = 7

 #Cube size
CUBE_SIZE = 50

# Initialize the pyramid with default colors
pyramid = [[0 for _ in range(row + 1)] for row in range(ROWS)]

# Function to draw the pyramid with colors
def draw_pyramid():
    for row in range(ROWS):
        for col in range(row + 1):
            x = SCREEN_WIDTH // 2 + (col - row / 2) * CUBE_SIZE
            y = 100 + row * CUBE_SIZE
            color = CUBE_COLORS[pyramid[row][col]]
            pygame.draw.rect(screen, color, (x, y, CUBE_SIZE, CUBE_SIZE))
            pygame.draw.rect(screen, WHITE, (x, y, CUBE_SIZE, CUBE_SIZE), 1)

# Player class
class Player:
    def __init__(self):
        self.row = 0
        self.col = 0
        self.x = SCREEN_WIDTH // 2
        self.y = 100

    def move(self, direction):
        if direction == "up" and self.row > 0:
            self.row -= 1
            self.col -= 1
        elif direction == "down" and self.row < ROWS - 1:
            self.row += 1
            self.col += 1
        elif direction == "left" and self.col > 0:
            self.col -= 1
        elif direction == "right" and self.col < self.row:
            self.col += 1

        self.x = SCREEN_WIDTH // 2 + (self.col - self.row / 2) * CUBE_SIZE
        self.y = 100 + self.row * CUBE_SIZE

        # Change the color of the cube
        pyramid[self.row][self.col] = (pyramid[self.row][self.col] + 1) % len(CUBE_COLORS)

    def draw(self):
        pygame.draw.circle(screen, WHITE, (self.x + CUBE_SIZE // 2, self.y + CUBE_SIZE // 2), CUBE_SIZE // 2)

# Main game loop
def main():
    clock = pygame.time.Clock()
    running = True
    player = Player()

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    player.move("up")
                elif event.key == pygame.K_DOWN:
                    player.move("down")
                elif event.key == pygame.K_LEFT:
                    player.move("left")
                elif event.key == pygame.K_RIGHT:
                    player.move("right")

        screen.fill(BLACK)

        draw_pyramid()
        player.draw()

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
