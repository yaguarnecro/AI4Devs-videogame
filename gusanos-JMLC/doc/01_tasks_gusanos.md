# Listado de tareas

## Tareas Básicas:

1. Configuración inicial del proyecto
   Crear la estructura de carpetas y archivos básicos, incluyendo HTML, CSS y JavaScript principales para mostrar la pantalla de inicio con las opciones de nueva partida, ayuda y salir.

2. Implementación del canvas y renderizado del mapa
   Mostrar un mapa básico en el canvas utilizando una imagen prediseñada.

3. Creación de la clase Worm y renderizado de un gusano estático
   Implementar la lógica básica de la clase Worm y mostrar un gusano inmóvil en el mapa.

4. Implementación del movimiento horizontal del gusano
   Permitir que el gusano se mueva de izquierda a derecha con las teclas de dirección.

5. Implementación de la gravedad y caídas
   Hacer que el gusano caiga cuando no hay terreno debajo de él.

6. Adición de la mecánica de salto para el gusano
   Implementar la capacidad de salto del gusano con la barra espaciadora.

7. Implementación del concepto de "Agua"
   Añadir una zona de agua en la parte inferior del mapa que sea letal para los gusanos.

8. Creación de la clase Team y adición de un gusano por equipo
   Implementar la lógica de equipos y mostrar dos gusanos de diferentes colores, uno por equipo.

9. Implementación del sistema de turnos básico
   Alternar el control entre los dos gusanos con un sistema de turnos simple.

10. Adición del límite de tiempo por turno
    Implementar un contador de 60 segundos para cada turno.

11. Creación de la clase Weapon, lógica de la Bazooka y trayectoria del proyectil
    Implementar la mecánica de apuntar, cargar y disparar la Bazooka, incluyendo la trayectoria parabólica del proyectil.

12. Implementación del sistema de salud y daño
    Añadir puntos de salud a los gusanos y la lógica de daño por impactos.

13. Creación de la interfaz de usuario en el juego
    Implementar la barra de estado superior con información del turno, tiempo y gusanos restantes.

14. Implementación de la detección de fin de juego
    Añadir la lógica para detectar cuándo un equipo ha ganado la partida.

15. Creación de la pantalla de fin de partida
    Implementar la pantalla que muestra el resultado y estadísticas al finalizar el juego.

## Tareas Extra:

17. Adición de la destrucción del terreno
    Implementar la mecánica de destrucción del terreno cuando impacta un proyectil.

18. Adición de efectos visuales básicos
    Implementar efectos simples como explosiones y animaciones de daño.

19. Optimización del rendimiento
    Mejorar la eficiencia del renderizado y la lógica del juego.

20. Implementación de pruebas unitarias básicas
    Crear pruebas para las funciones y clases principales del juego.

# Tarea 1: Configuración inicial del proyecto

## Descripción funcional
Crear la estructura básica del proyecto "Gusanos", incluyendo los archivos y carpetas necesarios para mostrar una pantalla de inicio con las opciones de nueva partida, ayuda y salir. Esta tarea establece la base sobre la cual se construirá el resto del juego.

## Descripción técnica
1. Crear la estructura de carpetas según el esquema definido en el documento técnico:
   ```
   gusanos/
   ├── index.html
   ├── game.html
   ├── end.html
   ├── assets/
   │   ├── images/
   │   └── maps/
   ├── src/
   │   ├── main.js
   │   ├── game/
   │   ├── physics/
   │   ├── ui/
   │   └── utils/
   ├── styles/
   │   ├── main.css
   │   ├── index.css
   │   ├── game.css
   │   └── end.css
   └── tests/
   ```

2. Crear el archivo `index.html` con la estructura básica HTML5:
   - Incluir un título "Gusanos"
   - Crear un contenedor para el menú principal
   - Añadir tres botones: "Nueva partida", "Ayuda" y "Salir"

3. Crear el archivo `styles/main.css` con estilos básicos comunes:
   - Definir una fuente sans-serif para todo el juego
   - Establecer colores base para el fondo y el texto

4. Crear el archivo `styles/index.css` con estilos específicos para la pantalla de inicio:
   - Centrar el contenido del menú
   - Estilizar los botones con colores vibrantes y efectos de hover

5. Crear el archivo `src/main.js`:
   - Añadir un event listener para `DOMContentLoaded`
   - Implementar funciones básicas para manejar los clics en los botones del menú

6. Crear archivos vacíos `game.html` y `end.html` para su posterior implementación

7. Configurar un servidor local básico (por ejemplo, usando la extensión "Live Server" de VS Code) para probar el proyecto

## Pruebas de validación
1. Verificar que la estructura de carpetas y archivos se ha creado correctamente
2. Abrir `index.html` en un navegador y comprobar que:
   - El título "Gusanos" se muestra correctamente
   - Los tres botones (Nueva partida, Ayuda, Salir) están presentes y centrados
   - Los estilos se aplican correctamente (fuente, colores, efectos de hover en botones)
3. Hacer clic en cada botón y verificar que:
   - "Nueva partida" muestra un mensaje de consola (la funcionalidad real se implementará más tarde)
   - "Ayuda" muestra un mensaje de alerta con instrucciones básicas del juego
   - "Salir" cierra la ventana o pestaña del navegador
4. Comprobar que la página es responsive y se ve correctamente en diferentes tamaños de pantalla
5. Validar el HTML y CSS utilizando herramientas como W3C Validator

Esta tarea establece la base del proyecto y proporciona una pantalla de inicio funcional desde la cual se puede comenzar a construir el resto del juego "Gusanos".

# Tarea 2: Implementación del canvas y renderizado del mapa

## Descripción funcional
Mostrar un mapa básico en el canvas utilizando una imagen prediseñada. Esta tarea se centra en la configuración del canvas en la pantalla de juego y en la carga y renderizado de una imagen de mapa en dicho canvas.

## Descripción técnica

1. **Crear el archivo `game.html` con la estructura básica HTML5:**
   - Incluir un título "Gusanos - Juego"
   - Crear un elemento `<canvas>` para el renderizado del mapa
   - Incluir un contenedor para la barra de estado superior

2. **Actualizar el archivo `styles/game.css` con estilos específicos para la pantalla de juego:**
   - Establecer el tamaño y la posición del canvas
   - Estilizar la barra de estado superior

3. **Crear el archivo `src/game/Game.js`:**
   - Configurar el canvas y su contexto 2D
   - Implementar la lógica para cargar y renderizar una imagen de mapa en el canvas

4. **Actualizar el archivo `src/main.js` para manejar la navegación a la pantalla de juego:**
   - Implementar la lógica para cambiar de `index.html` a `game.html` al hacer clic en "Nueva partida"

5. **Añadir una imagen de mapa prediseñada en `assets/maps/`:**
   - Utilizar la imagen `worms_mapa_2.png` para el mapa

## Pruebas de validación

1. **Verificar la estructura de carpetas y archivos:**
   - Asegurarse de que `game.html`, `styles/game.css`, `src/game/Game.js` y la imagen del mapa están en las ubicaciones correctos

2. **Abrir `game.html` en un navegador y comprobar que:**
   - El título "Gusanos - Juego" se muestra correctamente
   - El canvas está presente y tiene el tamaño adecuado
   - La barra de estado superior está presente y estilizada correctamente

3. **Verificar el renderizado del mapa:**
   - Comprobar que la imagen del mapa se carga y se renderiza correctamente en el canvas

4. **Navegación desde `index.html` a `game.html`:**
   - Hacer clic en "Nueva partida" en `index.html` y verificar que se navega a `game.html` y se muestra el canvas con el mapa

5. **Validar el HTML y CSS utilizando herramientas como W3C Validator:**
   - Asegurarse de que el HTML y CSS son válidos y no contienen errores


# Tarea 3: Creación de la clase Worm y renderizado de un gusano estático

## Descripción funcional
Implementar la lógica básica de la clase Worm y mostrar un gusano inmóvil en una posición aleatoria válida del mapa. Esta tarea se centra en crear la estructura fundamental para los gusanos en el juego, utilizando Matter.js para la física y posicionamiento.

## Descripción técnica

1. **Configurar Matter.js:**
   - Añadir Matter.js al proyecto (ya sea mediante CDN o npm)
   - Importar los módulos necesarios de Matter.js en `Game.js`

2. **Crear el archivo `src/game/Worm.js` con la clase Worm:**
   - Propiedades:
     - `body`: cuerpo físico de Matter.js
     - `width`: ancho del gusano (por ejemplo, 30 píxeles)
     - `height`: alto del gusano (por ejemplo, 30 píxeles)
     - `color`: color del gusano (por ejemplo, 'red' para el primer jugador)
     - `health`: puntos de salud del gusano (inicialmente 100)
   - Métodos:
     - `constructor(x, y, color)`: inicializa las propiedades del gusano y crea el cuerpo de Matter.js
     - `render(ctx)`: dibuja el gusano en el contexto del canvas basado en la posición del cuerpo de Matter.js

3. **Actualizar el archivo `src/game/Game.js`:**
   - Importar la clase Worm y los módulos necesarios de Matter.js
   - Crear un mundo de Matter.js
   - Implementar el método `findValidPosition()` que busca una posición aleatoria válida en el mapa para el gusano. Debe tener en cuenta las colisiones con el terreno y el agua.
   - Crear una instancia de Worm en una posición válida utilizando `findValidPosition()` y dibujarla en el canvas
   - Añadir el método `renderWorm()` que llama al método `render()` del gusano
   - Implementar la actualización del mundo de Matter.js en el bucle de juego


## Pruebas de validación

- Abrir `game.html` en un navegador y verificar que:
   - Se muestra un gusano estático en el mapa
   - El gusano tiene el tamaño y color correctos
   - El gusano aparece en una posición válida encima del terreno
   - Al recargar la página, el gusano aparece en diferentes posiciones válidas
- Verificar que el gusano no atraviesa el terreno y se mantiene en una posición estable

