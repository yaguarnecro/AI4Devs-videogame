 Concepto del juego: Gusanos
=================================================

"Gusanos" es un juego de estrategia por turnos inspirado en el clásico "Worms". El juego se desarrolla en un entorno 2D destructible donde dos jugadores controlan equipos de gusanos armados.

## Características principales:

1. **Jugabilidad por turnos**: Los jugadores se alternan para controlar a sus gusanos, realizando acciones como movimiento y ataque.

2. **Terreno destructible**: El mapa del juego es destructible, permitiendo a los jugadores modificar el terreno durante la partida. La parte inferior del mapa se considera agua y es letal para los gusanos.

3. **Arsenal limitado**: En esta versión inicial, los gusanos solo tendrán acceso a un arma: la Pistola. El diseño contemplará la posibilidad de añadir más armas en futuras actualizaciones.

4. **Física simplificada**: 
   - La trayectoria de la Pistola será recta, basada en la dirección del disparo.
   - Los gusanos podrán caer si no tienen suficiente terreno debajo.

5. **Sistema de salud**: Cada gusano tiene una cantidad de vida que disminuye al recibir daño. El objetivo es eliminar a todos los gusanos del equipo contrario.

6. **Mapas prediseñados**: El juego utilizará mapas basados en imágenes prediseñadas.

7. **Modo dos jugadores**: El juego permite partidas de 2 jugadores en el mismo dispositivo.

8. **Equipos diferenciados**: Los gusanos de cada jugador tendrán colores distintos para fácil identificación.

9. **Límite de tiempo por turno**: Cada jugador tiene un tiempo limitado para realizar sus acciones en cada turno, añadiendo presión y estrategia al juego.

10. **Peligro ambiental**: El agua en la parte inferior del mapa actúa como un peligro letal para los gusanos.

El juego busca ofrecer una experiencia divertida y estratégica, adaptando la esencia de "Worms" a un formato más simple para navegadores web usando HTML5 y JavaScript.



 Mecánicas principales de "Gusanos"
=================================================

## 1. Movimiento de los gusanos

- Los jugadores pueden mover sus gusanos horizontalmente utilizando las teclas de dirección izquierda y derecha.
- Los gusanos pueden saltar utilizando una tecla designada (por ejemplo, la barra espaciadora).
- Si un gusano se mueve fuera de una plataforma, caerá hasta encontrar terreno sólido o alcanzar el agua.
- El movimiento debe ser fluido pero con cierta "torpeza" característica de los gusanos.
- Los gusanos no pueden atravesar paredes u obstáculos. Al chocar con estos, el movimiento se detendrá.

## 2. Sistema de turnos

- El juego alterna entre dos jugadores, cada uno controlando su equipo de gusanos.
- Cada turno tiene una duración limitada (60 segundos).
- Durante su turno, un jugador puede mover un gusano y realizar una acción (disparar).
- El límite de tiempo se detiene en el momento en que el jugador comienza a disparar.
- El turno termina cuando el jugador dispara, cuando se acaba el tiempo, o si el jugador decide terminar su turno manualmente.
- Después de cada turno, el control pasa al otro jugador.

## 3. Uso de las armas

- Características de las armas:
  - Tipo de trayectoria: Simple (recta) o parabólica
  - Radio de impacto: Número de píxeles para evaluar la colisión
  - Radio de explosión: Área afectada tras la colisión
  - Potencia: Puntos de vida que se eliminan al impactar un gusano
  - Afecta a terreno: Una arma puede afectar a terreno o no

- La Pistola es el arma principal y única en esta versión del juego.
- Características de la Pistola:
  - Tipo de trayectoria: Simple (recta)
  - Radio de impacto: 10 píxeles
  - Radio de explosión: 10 píxeles
  - Potencia: 40 punto de vida
  - Afecta a terreno: No
- Para usar la Pistola, el jugador debe:
  1. Apuntar: ajustar el ángulo de disparo usando las flechas "Arriba" y "Abajo".
  2. Disparar: pulsar la tecla ENTER para realizar el disparo.
- Un puntero se mostrará a cierta distancia del gusano, moviéndose arriba o abajo según las flechas y siempre en la dirección que mire el gusano.
- La trayectoria del disparo es recta y se evalúa su impacto:
  - Terreno: No hay efecto inmediato (en futuras versiones se destruirá el terreno)
  - Gusano: Se reduce la vida del gusano impactado según la potencia del arma
  - Fuera del mundo: El disparo se descarta y finaliza la acción
- Tras resolver el disparo, el turno cambia automáticamente al siguiente jugador.

## 4. Destrucción del terreno

- Los impactos de la Pistola destruyen partes del terreno
- La destrucción del terreno es persistente durante toda la partida.
- Los jugadores pueden usar la destrucción del terreno estratégicamente para crear caminos o eliminar cobertura.
- Si se destruye el terreno debajo de un gusano, este caerá inmediatamente hasta encontrar una nueva superficie sólida o alcanzar el agua.

## 5. Sistema de salud y daño

- Cada gusano comienza con una cantidad predeterminada de puntos de salud.
- Los gusanos reciben daño por:
  - Impactos directos o cercanos de la Pistola.
  - Caídas desde grandes alturas.
  - Contacto con el agua en la parte inferior del mapa.
- El daño se resta de los puntos de salud del gusano.
- Cuando los puntos de salud de un gusano llegan a cero, el gusano es eliminado del juego.
- El equipo que elimine todos los gusanos del equipo contrario gana la partida.

Estas mecánicas trabajarán en conjunto para crear la experiencia de juego de "Gusanos", ofreciendo a los jugadores oportunidades para la estrategia, la habilidad y la diversión.


 Interfaz de Usuario y Estilo Visual de "Gusanos"
=================================================

## Estilo Visual General

- Juego 2D con gráficos simples pero atractivos.
- Paleta de colores vibrante y contrastante.
- Estilo de arte caricaturesco, manteniendo el espíritu humorístico del juego original "Worms".

## Elementos del Juego

1. **Gusanos**
   - Diseño simple pero expresivo, con formas redondeadas.
   - Color rojo para el equipo del Jugador 1, azul para el equipo del Jugador 2.
   - Animaciones básicas para movimiento, salto y reacción al daño.

2. **Terreno**
   - Textura detallada pero no compleja, distinguiendo claramente entre terreno sólido y fondo.
   - Agua en la parte inferior con animación simple.

3. **Armas y Proyectiles**
   - Pistola con diseño distintivo y reconocible.
   - Proyectiles visibles durante su trayectoria.
   - Efectos de explosión simples pero visualmente impactantes.

## Interfaz de Usuario

1. **Menú Principal**
   - Título del juego "Gusanos" prominentemente mostrado.
   - Tres opciones claramente visibles:
     1. Nueva partida
     2. Ayuda
     3. Salir

2. **Pantalla de Juego Principal**
   - Dividida en dos áreas principales:
     a. **Canvas de Juego**
        - Ocupa la mayor parte de la pantalla.
        - Muestra el terreno, gusanos, y efectos de juego.
        - Indicadores visuales integrados en el canvas:
          * Dirección de apuntado: flecha o línea que sale del gusano activo.
          * Fuerza de disparo: barra o medidor cerca del gusano activo cuando se carga el arma.
     b. **Barra de Estado Superior**
        - Turno actual (Jugador 1 o Jugador 2)
        - Tiempo restante del turno (contador de 60 segundos)
        - Gusanos restantes de cada equipo
        - Botón de ayuda para acceder a instrucciones rápidas

3. **Pantalla de Fin de Partida**
   - Anuncio del equipo ganador.
   - Resumen de la partida:
     * Duración total (tiempo y número de turnos)
     * Gusanos eliminados por cada equipo
     * Estadísticas adicionales relevantes (p.ej., disparos realizados, daño total)
   - Opciones:
     * Iniciar nueva partida
     * Volver al menú principal

## Elementos de Feedback Visual

- Indicadores de daño al impactar a un gusano
- Animación de destrucción del terreno
- Efecto visual para gusanos eliminados
- Resaltado del gusano activo durante el turno de cada jugador

## Responsividad

- Se establecerá un tamaño mínimo de pantalla para garantizar la correcta visualización del juego.
- El canvas de juego mantendrá una relación de aspecto fija.
- La interfaz se adaptará a diferentes tamaños de pantalla por encima del mínimo, reajustando la disposición de los elementos de la UI según sea necesario.
- Los elementos de la UI se escalarán apropiadamente en diferentes resoluciones.

## Accesibilidad

- Uso de colores contrastantes para mejorar la visibilidad
- Textos claros y legibles en todos los menús e indicadores
- Opción de ayuda fácilmente accesible desde la pantalla de juego principal

Este diseño de interfaz y estilo visual busca crear una experiencia de juego intuitiva y atractiva, manteniendo la esencia divertida y estratégica de "Gusanos" mientras se adapta a las capacidades de un juego basado en navegador.


 Detalles Técnicos del Desarrollo de "Gusanos"
=================================================

## 1. Estructura del proyecto

### Organización de Carpetas y Archivos

```
gusanos/
│
├── index.html
├── game.html
├── end.html
│
├── assets/
│   ├── images/
│   │   ├── backgrounds/
│   │   ├── worms/
│   │   └── weapons/
│   └── maps/
│
├── src/
│   ├── main.js
│   ├── game/
│   │   ├── Game.js
│   │   ├── Map.js
│   │   ├── Worm.js
│   │   ├── Team.js
│   │   ├── Weapon.js
│   │   ├── Round.js
│   │   └── GameStatistics.js
│   ├── physics/
│   │   ├── Movement.js
│   │   └── Collision.js
│   ├── ui/
│   │   ├── UI.js
│   │   ├── MainMenu.js
│   │   ├── GameScreen.js
│   │   └── EndScreen.js
│   └── utils/
│       ├── Constants.js
│       └── Helpers.js
│
├── styles/
│   ├── main.css
│   ├── index.css
│   ├── game.css
│   └── end.css
│
└── tests/
    ├── game/
    ├── physics/
    └── ui/
```

### Descripción de Componentes

1. **Archivos HTML**
   - `index.html`: Pantalla de inicio del juego.
   - `game.html`: Pantalla principal de la partida.
   - `end.html`: Pantalla de fin de partida.
2. **assets/**
   - Contiene todos los recursos estáticos del juego.
   - `images/`: Imágenes organizadas por categorías.
   - `maps/`: Archivos de mapas prediseñados.
3. **src/**
   - Contiene todo el código fuente del juego.
   - `main.js`: Punto de entrada JavaScript, inicializa el juego.
   - `game/`: Clases principales del juego (lógica central).
   - `physics/`: Manejo de movimientos y colisiones.
   - `ui/`: Componentes de la interfaz de usuario para cada pantalla.
   - `utils/`: Utilidades y constantes compartidas.
4. **styles/**
   - `main.css`: Estilos comunes para todas las pantallas.
   - `index.css`, `game.css`, `end.css`: Estilos específicos para cada pantalla.
5. **tests/**
   - Estructura para pruebas unitarias, reflejando la organización de `src/`.

### Principios de Organización

1. **Separación de Pantallas**: 
   - Cada pantalla principal (inicio, juego, fin) tiene su propio HTML y CSS.
2. **Modularidad**: 
   - Componentes del juego separados en archivos individuales para facilitar el mantenimiento.
3. **Separación de Responsabilidades**: 
   - Clara distinción entre lógica del juego, física, UI y utilidades.
4. **Recursos Centralizados**: 
   - Todos los assets en una ubicación central para fácil gestión.
5. **Estilos Específicos y Comunes**: 
   - Estilos base compartidos y estilos específicos para cada pantalla.
6. **Estructura para Pruebas**: 
   - Organización de pruebas que refleja la estructura del código fuente.
7. **Escalabilidad**: 
   - Diseño que permite añadir fácilmente nuevas características o componentes.


## 2. Tecnologías, herramientas y consideraciones generales
- HTML5 Canvas para el renderizado
- JavaScript para la lógica del juego
- Phaser: Una biblioteca para el desarrollo de juegos
- Imágenes PNG para el terreno
- Optimización y rendimiento:
  * Estrategias para mantener un buen rendimiento en navegadores
- Enfoque de pruebas:
  * Jest para pruebas unitarias de JavaScript
  * Cypress para pruebas de integración y end-to-end
- Proceso de despliegue:
  * Uso de GitHub Pages o Netlify para un despliegue sencillo

## 3. Clases y objetos principales
- Game (controlador principal)
- Map (manejo del terreno)
- Worm (lógica de los gusanos)
- Team (gestión de equipos)
- Weapon (lógica de armas, empezando con Pistola)
- UI (manejo de la interfaz de usuario)
- GameStatistics (seguimiento de estadísticas del juego)
- Round (manejo de rondas individuales)

## 4. Manejo de estados del juego
- Implementación de diferentes pantallas:
  * Pantalla de menú principal
  * Pantalla de juego
  * Pantalla de fin de partida
- Gestión de transiciones entre pantallas

## 5. Física del juego
- Movimiento de los gusanos
- Trayectoria de los proyectiles
- Detección de colisiones

## 6. Renderizado
- Dibujo del mapa
- Representación de los gusanos (sin animaciones inicialmente)
- Destrucción del terreno

## 7. Gestión de entrada del usuario
- Manejo de teclado:
  - Flechas izquierda/derecha: Movimiento horizontal del gusano
  - Flechas arriba/abajo: Ajuste del ángulo de disparo
  - ENTER: Realizar el disparo
  - TAB: Cambiar el gusano activo
  - ESC: Finalizar el turno
- Interacción con la interfaz

## 8. Gestión del tiempo y turnos
- Implementación del sistema de turnos
- Manejo del contador de tiempo