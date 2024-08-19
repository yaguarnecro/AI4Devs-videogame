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