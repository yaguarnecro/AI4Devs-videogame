# Getting started

Para arrancar el juego necesitamos arrancar un servidor HTTP con el siguiente comando 
puesto que el juego usa rutas relativas y da problemas de CORS al usar el fichero game.html directamente:
```bash
python -m http.server
```
o 
```bash
python3 -m http.server
```

Luego accede a la URL:
```
http://localhost:8000/
```

# Instrucciones del juego

## Objetivo del juego
Elimina todos los gusanos del equipo contrario mientras mantienes vivo a tu equipo.

## Controles
- **Teclas de flecha Izquierda/Derecha**: Mover el gusano activo horizontalmente
- **Teclas de flecha Arriba/Abajo**: Ajustar la dirección de apuntado
- **Barra espaciadora**: Saltar
- **Enter**: Disparar el arma
- **Tab**: Cambiar entre los gusanos de tu equipo
- **Esc**: Finalizar tu turno

## Mecánica de juego
1. El juego alterna entre dos jugadores, cada uno controlando un equipo de gusanos.
2. Cada turno dura 60 segundos.
3. Durante tu turno, puedes mover un gusano y realizar una acción (disparar).
4. Los gusanos reciben daño por impactos de armas y caídas desde alturas.
5. Los gusanos mueren instantáneamente si caen al agua en la parte inferior del mapa.
6. El juego termina cuando todos los gusanos de un equipo son eliminados.

## Armas
- Actualmente, solo está disponible la Pistola.
- La Pistola dispara en línea recta en la dirección en la que estás apuntando.

## Terreno
- Actualmente el terreno no es destructible.
- ~~Usa esto a tu favor para crear caminos o eliminar cobertura.~~

Recuerda, ¡la estrategia es clave! Usa el terreno y posiciona tus gusanos sabiamente para superar a tu oponente.