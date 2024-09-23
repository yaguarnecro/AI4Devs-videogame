# Tamagotchi Clone POC

## Requisitos

### Funcionalidades Principales
1. **Mascota Virtual**:
   - Nacimiento de la mascota.
   - Estadísticas de la mascota (hambre, felicidad, energía).
   - Interacciones básicas (alimentar, jugar, dormir).

2. **Interfaz de Usuario**:
   - Pantalla principal con la mascota.
   - Botones para interactuar con la mascota.
   - Indicadores de estadísticas.

3. **Ciclo de Vida**:
   - La mascota envejece con el tiempo.
   - Las estadísticas cambian con el tiempo y las interacciones.

### Tecnologías Utilizadas
- **HTML5**: Estructura del juego.
- **JavaScript**: Lógica del juego.
- **Phaser 3**: Motor de juego para gráficos y animaciones.

## Estructura del Proyecto

mermaid
graph TD;
    A[Root Directory] -->|contains| B[index.html]
    A -->|contains| C[assets]
    C -->|contains| D[images]
    D -->|contains| E[pet.png]
    D -->|contains| F[background.png]
    C -->|contains| G[sounds]
    G -->|contains| H[feed.mp3]
    G -->|contains| I[play.mp3]
    A -->|contains| J[js]
    J -->|contains| K[main.js]
    J -->|contains| L[config.js]
    J -->|contains| M[scenes]
    M -->|contains| N[BootScene.js]
    M -->|contains| O[PreloadScene.js]
    M -->|contains| P[MainScene.js]
    M -->|contains| Q[GameOverScene.js]



/tamagotchi-clone 
├── index.html 
├── assets 
│ ├── images 
│ │ ├── pet.png 
│ │ └── background.png 
│ ├── sounds 
│ │ ├── feed.mp3 
│ │ └── play.mp3 
└── jsFolder 
| ├── main.js
| ├── pet.js 
| ├── ui.js 
| ├── game.js  
| ├── config.js  
├── scenes 
│ ├── BootScene.js 
│ ├── PreloadScene.js 
│ ├── MainScene.js 
│ └── GameOverScene.js


### Descripción de Archivos

- **index.html**: Archivo principal HTML que carga el juego.
- **assets**: Carpeta que contiene los recursos del juego.
  - **images**: Carpeta para las imágenes del juego.
  - **sounds**: Carpeta para los sonidos del juego.
- **main.js**: Archivo principal de JavaScript que inicializa el juego.
- **pet.js**: Archivo que contiene la lógica de la mascota.
- **ui.js**: Archivo que maneja la interfaz de usuario.
- **game.js**: Archivo que contiene la lógica del juego.
- **config.js**: Archivo de configuración del juego.

## Referencias

- [Tamagotchi Clone by ChrisChrisLoLo](https://github.com/ChrisChrisLoLo/tamagotchiClone)
- [Tamagotchi by antonioamgm](https://github.com/antonioamgm/Tamagotchi_000/blob/master/tamagotchi.html)