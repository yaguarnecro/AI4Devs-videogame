# Doomfall

**Doomfall** es un juego de disparos retro donde te enfrentas a oleadas de enemigos en un campo de batalla lleno de obstáculos. Derrota a todos los enemigos, evita ser alcanzado, y completa la misión final.

## Instrucciones para Descargar el Repositorio y Poner a Funcionar el Código Fuente

Sigue estos pasos para descargar y ejecutar **Doomfall** en tu máquina local:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/doomfall.git
   ```

2. **Navega al directorio del juego:**

   ```bash
   cd doomfall
   ```

3. **Abre el archivo `index.html` en tu navegador:**

   Simplemente abre el archivo `index.html` en tu navegador preferido. No se requieren configuraciones adicionales.

## Características del Juego

- **Tamaño del Jugador y Enemigos:** El jugador es el doble de grande de su tamaño original, mientras que los enemigos son un 50% más grandes que el jugador.
- **Generación Dinámica de Enemigos:** Si todos los enemigos son derrotados y no quedan más, un nuevo enemigo aparecerá automáticamente sin pausar el juego.
- **Reposicionamiento Inteligente:** Cuando un enemigo alcanza al jugador, este reaparece en una ubicación segura y alejada de los enemigos, listo para continuar la batalla.
- **Objetivo del Juego:** Derrota a 5 enemigos para completar la misión. Si logras derrotar a 5 enemigos, el juego termina con el mensaje "MISION COMPLETADA".
- **Sonidos Dinámicos:** Los disparos y los impactos tienen efectos de sonido ajustados a diferentes niveles de volumen para una experiencia más inmersiva.
- **Obstáculos con Textura:** Los obstáculos en el campo de batalla tienen texturas aplicadas y no interfieren con la zona donde se muestra el puntaje y las vidas.

## Instrucciones para Jugar

1. **Controles del Jugador:**
   - **Moverse:** Usa las teclas de flecha (↑ ↓ ← →) o `W`, `A`, `S`, `D` para mover al jugador por el campo de batalla.
   - **Disparar:** Haz clic en cualquier parte de la pantalla para disparar en esa dirección.
   - **Pausar:** Presiona la barra espaciadora para pausar el juego. Mientras está en pausa, aparecerá el mensaje "PAUSADO". Presiona cualquier tecla para reanudar.

2. **Objetivo:**
   - El objetivo principal es derrotar a 5 enemigos para completar la misión. Cada enemigo requiere 5 disparos para ser derrotado.
   - Evita ser alcanzado por los enemigos. Cada vez que un enemigo te alcance, perderás una vida y reaparecerás en una nueva ubicación alejada del enemigo.

3. **Condiciones de Fin del Juego:**
   - **Misión Completa:** El juego terminará con el mensaje "MISION COMPLETADA" cuando derrotes a 5 enemigos.
   - **Juego Terminado:** Si pierdes todas tus vidas, el juego terminará y se mostrará el mensaje "Juego Terminado. CTRL+F5 para Reiniciar".

¡Buena suerte y que disfrutes de **Doomfall**!

