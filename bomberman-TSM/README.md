## Funcionalidades del Juego Bomberman TSM

### Jugabilidad Básica

- **Movimiento del Jugador**: Los jugadores pueden moverse por el mapa utilizando las teclas de flecha. Las animaciones correspondientes al movimiento se configuran en la función `create`.
- **Colocación de Bombas**: Los jugadores pueden colocar bombas presionando la barra espaciadora. Las bombas tienen un tiempo de detonación predeterminado y afectan áreas en forma de cruz. La lógica de colocación y explosión de bombas se maneja en la función `create`.

### Interacciones del Juego

- **Destructibilidad de Muros**: Algunos muros en el mapa son destructibles. Las explosiones de las bombas pueden destruir estos muros, lo que puede revelar ítems ocultos. La creación y gestión de muros destructibles se realiza en la función `create`.
- **Ítems y Poderes**: Al destruir muros destructibles, hay una probabilidad de que aparezcan ítems que otorgan poderes especiales a los jugadores, como aumento de velocidad, capacidad extra de bombas, mayor alcance de explosión, invulnerabilidad temporal, capacidad de empujar bombas o detonador remoto. La lógica para generar ítems y aplicar sus efectos se encuentra en las funciones `createExplosion` y `applyItemEffect`.

### Efectos Especiales y Animaciones

- **Animaciones de Jugador y Bombas**: Se han implementado animaciones para el movimiento del jugador y la activación de las bombas. Estas animaciones se configuran en la función `create`.
- **Sonidos y Música**: El juego incluye efectos de sonido para las explosiones y una música de fondo que se reproduce durante el juego. La gestión de sonidos se realiza en la función `create`.

### Manejo de Eventos del Juego

- **Colisiones y Superposiciones**: Se manejan colisiones entre jugadores, bombas, fuegos y muros. Además, se detectan superposiciones entre jugadores y fuegos para gestionar los impactos. La configuración de colisiones y superposiciones se realiza en la función `create`.
- **Efectos de Ítems**: Al recoger un ítem, se aplican efectos específicos según el tipo de ítem recogido. La función `applyItemEffect` maneja la aplicación de estos efectos.

### UI y Control de Flujo del Juego

- **Pantallas de Inicio y Fin de Juego**: El juego cuenta con pantallas para iniciar el juego, mostrar instrucciones, y manejar el fin del juego con opciones para reiniciar o salir. La gestión de estas interfaces se realiza mediante las funciones `showRestartMenu` y otras funciones de control de UI.

### Configuración y Extensibilidad

- **Configuración de Seguridad y Compatibilidad**: Se ha configurado el juego para ser seguro y compatible con diferentes navegadores y políticas de contenido. La configuración de seguridad se especifica en el archivo `index.html`.

### Documentación y Pruebas

- **Documentación del Proceso de Desarrollo**: Se incluyen detalles sobre el proceso de desarrollo y pruebas del juego. La documentación se encuentra en el archivo `README.md`.

Este resumen proporciona una visión general de las características y funcionalidades implementadas en el juego Bomberman TSM, ofreciendo una guía útil para los desarrolladores y jugadores.
