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