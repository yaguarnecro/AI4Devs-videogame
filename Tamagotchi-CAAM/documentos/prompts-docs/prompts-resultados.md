# Índice de resultados


1. ##
2. [Texto que se muestra](#ancla-o-id)

## 1. Resultado POC1
```
# Tamagotchi Clone - Proof of Concept (POC)

## Requisitos

### Objetivo
Crear un demo ligero y funcional de un clon de Tamagotchi utilizando JavaScript, HTML5 y Phaser 3.

### Funcionalidades Básicas
1. **Mascota Virtual**: Una mascota que puede ser alimentada, jugar y dormir.
2. **Interfaz de Usuario**: Botones para interactuar con la mascota.
3. **Estados de la Mascota**: La mascota puede estar feliz, hambrienta, cansada, etc.
4. **Animaciones**: Animaciones básicas para las acciones de la mascota.

### Herramientas y Tecnologías
- **JavaScript**
- **HTML5**
- **Phaser 3** (versión 3.85.2)

## Estructura del Proyecto

tamagotchi-clone/
│
├── index.html
├── src/
│ ├── main.js
│ ├── scenes/
│ │ ├── BootScene.js
│ │ ├── GameScene.js
│ ├── assets/
│ │ ├── images/
│ │ ├── audio/
│ ├── classes/
│ │ ├── Pet.js
│ │ ├── UI.js


## Código
### index.html

tamagotchi-clone/
│
├── index.html
├── src/
│ ├── main.js
│ ├── scenes/
│ │ ├── BootScene.js
│ │ ├── GameScene.js
│ ├── assets/
│ │ ├── images/
│ │ ├── audio/
│ ├── classes/
│ │ ├── Pet.js
│ │ ├── UI.js
html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tamagotchi Clone</title>
<script src="https://cdn.jsdelivr.net/npm/phaser@3.85.2/dist/phaser.js"></script>
<script src="src/main.js" defer></script>
</head>
<body>
</body>
</html>


### src/main.js

javascript
import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';
const config = {
type: Phaser.AUTO,
width: 800,
height: 600,
scene: [BootScene, GameScene],
physics: {
default: 'arcade',
arcade: {
debug: false
}
}
};
const game = new Phaser.Game(config);


### src/scenes/BootScene.js

javascript
export default class BootScene extends Phaser.Scene {
constructor() {
super('BootScene');
}
preload() {
// Cargar assets aquí
this.load.image('pet', 'src/assets/images/pet.png');
this.load.image('button', 'src/assets/images/button.png');
}
create() {
this.scene.start('GameScene');
}
}

### src/scenes/GameScene.js

javascript
import Pet from '../classes/Pet.js';
import UI from '../classes/UI.js';
export default class GameScene extends Phaser.Scene {
constructor() {
super('GameScene');
}
create() {
this.pet = new Pet(this, 400, 300, 'pet');
this.ui = new UI(this);
}
update() {
this.pet.update();
}
}

### src/classes/Pet.js

javascript
export default class Pet extends Phaser.GameObjects.Sprite {
constructor(scene, x, y, texture) {
super(scene, x, y, texture);
scene.add.existing(this);
this.hunger = 100;
this.energy = 100;
this.happiness = 100;
this.setInteractive();
this.on('pointerdown', this.feed, this);
}
feed() {
this.hunger = Math.min(this.hunger + 10, 100);
}
update() {
// Lógica de actualización de la mascota
this.hunger -= 0.1;
this.energy -= 0.05;
this.happiness -= 0.05;
if (this.hunger <= 0 || this.energy <= 0 || this.happiness <= 0) {
this.setTexture('pet_sad');
} else {
this.setTexture('pet');
}
}
}


### src/classes/UI.js

javascript
export default class UI {
constructor(scene) {
this.scene = scene;
this.createButtons();
}
createButtons() {
this.feedButton = this.scene.add.image(100, 500, 'button').setInteractive();
this.feedButton.on('pointerdown', () => {
this.scene.pet.feed();
});
// Crear más botones para otras acciones
}
}

## Conclusión

Este documento POC proporciona una estructura básica y un ejemplo de código para un clon de Tamagotchi utilizando JavaScript, HTML5 y Phaser 3. Se recomienda seguir las mejores prácticas de programación, como la separación de código en clases y el uso de comentarios para mejorar la legibilidad y el mantenimiento del código.

```

## 2. Resultado POC2
```
Tamagotchi Clone POC
Requisitos

Objetivo

Crear un demo ligero y funcional de un clon de Tamagotchi utilizando JavaScript, HTML5 y Phaser 3.
Funcionalidades Básicas

1. Mascota Virtual: Una mascota que puede ser alimentada, jugar y dormir.
2. Interfaz de Usuario: Botones para interactuar con la mascota.
3. Estados de la Mascota: La mascota puede estar feliz, hambrienta, cansada, etc.
4. Ciclo de Vida: La mascota envejece y puede morir si no se cuida adecuadamente.

Herramientas y Tecnologías

- HTML5: Para la estructura del documento.
- JavaScript: Para la lógica del juego.
- Phaser 3: Para la creación y gestión del juego.

Estructura del Proyecto

- HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tamagotchi Clone</title>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js"></script>
    <script src="main.js" defer></script>
</head>
<body>
    <div id="game-container"></div>
</body>
</html>
- JavaScript (main.js)
class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Cargar recursos necesarios
        this.load.image('pet', 'assets/pet.png');
        this.load.image('button', 'assets/button.png');
    }

    create() {
        // Iniciar la siguiente escena
        this.scene.start('GameScene');
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Crear la mascota
        this.pet = this.add.sprite(400, 300, 'pet');
        
        // Crear botones de interacción
        this.feedButton = this.add.sprite(100, 500, 'button').setInteractive();
        this.playButton = this.add.sprite(300, 500, 'button').setInteractive();
        this.sleepButton = this.add.sprite(500, 500, 'button').setInteractive();

        // Añadir eventos a los botones
        this.feedButton.on('pointerdown', () => this.feedPet());
        this.playButton.on('pointerdown', () => this.playWithPet());
        this.sleepButton.on('pointerdown', () => this.putPetToSleep());

        // Inicializar estados de la mascota
        this.petState = {
            hunger: 100,
            happiness: 100,
            energy: 100
        };

        // Actualizar estados periódicamente
        this.time.addEvent({
            delay: 1000,
            callback: this.updatePetState,
            callbackScope: this,
            loop: true
        });
    }

    feedPet() {
        // Lógica para alimentar a la mascota
        this.petState.hunger = Math.min(this.petState.hunger + 20, 100);
    }

    playWithPet() {
        // Lógica para jugar con la mascota
        this.petState.happiness = Math.min(this.petState.happiness + 20, 100);
    }

    putPetToSleep() {
        // Lógica para poner a dormir a la mascota
        this.petState.energy = Math.min(this.petState.energy + 20, 100);
    }

    updatePetState() {
        // Reducir los estados de la mascota con el tiempo
        this.petState.hunger = Math.max(this.petState.hunger - 1, 0);
        this.petState.happiness = Math.max(this.petState.happiness - 1, 0);
        this.petState.energy = Math.max(this.petState.energy - 1, 0);

        // Verificar si la mascota está en un estado crítico
        if (this.petState.hunger === 0 || this.petState.happiness === 0 || this.petState.energy === 0) {
            this.pet.setTint(0xff0000); // Cambiar color de la mascota a rojo
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [BootScene, GameScene],
    parent: 'game-container'
};

const game = new Phaser.Game(config);
Comentarios
BootScene: Carga los recursos necesarios y transiciona a la escena principal del juego.
GameScene: Contiene la lógica principal del juego, incluyendo la creación de la mascota, los botones de interacción y la actualización de los estados de la mascota.
Estados de la Mascota: Se manejan mediante un objeto petState que se actualiza periódicamente.
Interacción: Los botones permiten al usuario alimentar, jugar y poner a dormir a la mascota.
Este POC proporciona una base sólida para un clon de Tamagotchi, con una estructura clara y separada por clases, siguiendo las mejores prácticas de programación.
```

## 3. Resultado POC3
```
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
index.html --> jsFolder
jsFolder[assets] --> images
jsFolder[assets] --> sounds
jsFolder --> main.js
jsFolder --> pet.js
jsFolder --> ui.js
jsFolder --> game.js
jsFolder --> config.js


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
```

## 4. Resultado PRD1
```
# Documento PRD: Tamagotchi Clone

## Descripción General

### Objetivo
Desarrollar un clon de Tamagotchi utilizando HTML5, JavaScript y Phaser 3, que permita a los usuarios interactuar con una mascota virtual a través de una interfaz gráfica.

### Stakeholders
- **Propietario del Producto**: @Nombre
- **Diseño**: @Nombre
- **Desarrollo**: @Nombre

## Antecedentes y Ajuste Estratégico
El Tamagotchi es un juego clásico que ha capturado la imaginación de muchas generaciones. Este proyecto busca recrear esa experiencia utilizando tecnologías modernas, proporcionando una plataforma educativa y entretenida para los usuarios.

## Investigación del Cliente
- **Entrevistas con Usuarios**: Realizar entrevistas para entender las expectativas y deseos de los usuarios en relación con un juego de mascota virtual.
- **Análisis de Competencia**: Estudiar otros clones de Tamagotchi y juegos de mascotas virtuales para identificar características clave y áreas de mejora.

## Criterios de Éxito
- **Interacción del Usuario**: Los usuarios deben poder alimentar, jugar y cuidar a la mascota virtual.
- **Retención del Usuario**: Los usuarios deben sentirse motivados a regresar al juego para cuidar de su mascota.
- **Estabilidad del Juego**: El juego debe funcionar sin errores y ser accesible en múltiples dispositivos.

## Alcance

### Historias de Usuario y Requisitos

| **Historia de Usuario** | **Requisito** | **Prioridad** |
| ----------------------- | ------------- | ------------- |
| Como usuario, quiero poder alimentar a mi mascota para que no tenga hambre. | Implementar botón de "Alimentar" que aumente la estadística de hambre. | Alta |
| Como usuario, quiero poder jugar con mi mascota para que sea feliz. | Implementar botón de "Jugar" que aumente la estadística de felicidad. | Alta |
| Como usuario, quiero que mi mascota pueda dormir para recuperar energía. | Implementar botón de "Dormir" que aumente la estadística de energía. | Media |
| Como usuario, quiero ver las estadísticas de mi mascota en todo momento. | Mostrar indicadores de hambre, felicidad y energía en la interfaz. | Alta |

### Mejoras Futuras
- **Interacciones Avanzadas**: Añadir más tipos de interacciones como bañar a la mascota o llevarla al veterinario.
- **Personalización**: Permitir a los usuarios personalizar la apariencia de su mascota.
- **Red Social**: Implementar una funcionalidad para que los usuarios puedan compartir el progreso de su mascota en redes sociales.

### Fuera de Alcance
- **Multijugador**: No se implementará funcionalidad multijugador en esta versión.
- **Monetización**: No se incluirán compras dentro de la aplicación en esta versión.

## Diseño

### Estructura del Proyecto
mermaid
graph TD;
index.html --> jsFolder
jsFolder[assets] --> images
jsFolder[assets] --> sounds
jsFolder --> main.js
jsFolder --> pet.js
jsFolder --> ui.js
jsFolder --> game.js
jsFolder --> config.js


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

## Tareas de Seguimiento
- **Revisión de Diseño**: Revisar y aprobar los diseños de la interfaz de usuario.
- **Desarrollo**: Implementar las funcionalidades descritas en las historias de usuario.
- **Pruebas**: Realizar pruebas de usabilidad y funcionalidad.
- **Lanzamiento**: Preparar y ejecutar el lanzamiento del juego.

## Referencias

- [Tamagotchi Clone by ChrisChrisLoLo](https://github.com/ChrisChrisLoLo/tamagotchiClone)
- [Tamagotchi by antonioamgm](https://github.com/antonioamgm/Tamagotchi_000/blob/master/tamagotchi.html)
```
## 5. Resultado Configuracion inicial
```
Para comenzar con el proyecto del clon de Tamagotchi, vamos a seguir los documentos POC y PRD, y estructuraremos el proyecto según las mejores prácticas de programación. Aquí tienes el contenido inicial de cada archivo en su formato correspondiente.

index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tamagotchi Clone</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="game-container"></div>
    <script src="js/config.js"></script>
    <script src="js/main.js"></script>
</body>
</html>

config.js

// Configuración del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [PreloadScene, MainScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

main.js

// Inicialización del juego
window.onload = function() {
    const game = new Phaser.Game(config);
};

preload.js

// Clase para la escena de precarga
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Cargar los assets del juego
        this.load.image('pet', 'assets/images/pet.png');
        this.load.image('background', 'assets/images/background.png');
        // ... otros assets
    }

    create() {
        // Iniciar la escena principal
        this.scene.start('MainScene');
    }
}

mainScene.js

// Clase para la escena principal
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        // Añadir fondo
        this.add.image(400, 300, 'background');

        // Crear la mascota
        this.pet = new Pet(this, 400, 300, 'pet');

        // Crear la interfaz de usuario
        this.ui = new UI(this);
    }

    update() {
        // Actualizar la mascota y la interfaz de usuario
        this.pet.update();
        this.ui.update();
    }
}

pet.js

// Clase para la mascota
class Pet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        // Inicializar estadísticas de la mascota
        this.hunger = 100;
        this.happiness = 100;
        this.energy = 100;

        // Temporizador para disminuir estadísticas
        this.timer = scene.time.addEvent({
            delay: 1000,
            callback: this.decreaseStats,
            callbackScope: this,
            loop: true
        });
    }

    decreaseStats() {
        // Disminuir estadísticas con el tiempo
        this.hunger -= 1;
        this.happiness -= 1;
        this.energy -= 1;
    }

    update() {
        // Actualizar lógica de la mascota
        if (this.hunger <= 0 || this.happiness <= 0 || this.energy <= 0) {
            this.setTint(0xff0000); // Cambiar color si alguna estadística es 0
        }
    }
}

ui.js

// Clase para la interfaz de usuario
class UI {
    constructor(scene) {
        this.scene = scene;

        // Crear botones de interacción
        this.feedButton = this.createButton(100, 500, 'Feed', this.feedPet);
        this.playButton = this.createButton(300, 500, 'Play', this.playWithPet);
        this.sleepButton = this.createButton(500, 500, 'Sleep', this.putPetToSleep);

        // Crear indicadores de estadísticas
        this.hungerText = this.createText(50, 50, 'Hunger: 100');
        this.happinessText = this.createText(50, 100, 'Happiness: 100');
        this.energyText = this.createText(50, 150, 'Energy: 100');
    }

    createButton(x, y, label, callback) {
        // Crear un botón interactivo
        let button = this.scene.add.text(x, y, label, { fontSize: '32px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', callback.bind(this));
        return button;
    }

    createText(x, y, text) {
        // Crear un texto para mostrar estadísticas
        return this.scene.add.text(x, y, text, { fontSize: '24px', fill: '#fff' });
    }

    feedPet() {
        // Alimentar a la mascota
        this.scene.pet.hunger = Math.min(this.scene.pet.hunger + 10, 100);
    }

    playWithPet() {
        // Jugar con la mascota
        this.scene.pet.happiness = Math.min(this.scene.pet.happiness + 10, 100);
    }

    putPetToSleep() {
        // Poner a dormir a la mascota
        this.scene.pet.energy = Math.min(this.scene.pet.energy + 10, 100);
    }

    update() {
        // Actualizar los textos de estadísticas
        this.hungerText.setText('Hunger: ' + this.scene.pet.hunger);
        this.happinessText.setText('Happiness: ' + this.scene.pet.happiness);
        this.energyText.setText('Energy: ' + this.scene.pet.energy);
    }
}

styles.css

styles.css
/* Estilos básicos para el juego */
body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000;
}

#game-container {
    width: 800px;
    height: 600px;
}

Estructura del Proyecto

graph TD;
    index.html --> jsFolder
    jsFolder[assets] --> images
    jsFolder[assets] --> sounds
    jsFolder --> main.js
    jsFolder --> pet.js
    jsFolder --> ui.js
    jsFolder --> game.js
    jsFolder --> config.js

Este es el setup inicial del proyecto. Cada archivo está comentado para explicar su propósito y cómo se integra en el juego. Puedes expandir y mejorar este código según las necesidades del proyecto.
``` 
