# Índice de Prompts


1. [## 1. Primer Prompt: creacion del Proof of concept doc (POC)](#1.-Primer-Prompt:-creacion-del-Proof-of-concept-doc-(POC))
2. [## 2. Segundo Prompt: Prompt: creacion del Proof of concept doc (POC) ver2](#2.-Segundo-Prompt:-Prompt:-creacion-del-Proof-of-concept-doc-(POC)-ver2)
3. 
4. [Texto que se muestra](#ancla-o-id)

# Prompts Documentados

Aquí están los prompts utilizados para las pruebas de IA.

- [Ver resultados completos](prompts-resultados.md)
- [Ir directamente a los errores](prompts-errores.md)



# Prompts y Resultados de IA

## 1. Primer Prompt: creacion del Proof of concept doc (POC)

**Fecha:** 2024-09-22  
**Descripción:** Este prompt busca generar un documento markdown para un clone de tamagotchi.

### Prompt:
```
Eres un experdo en desarrollo de video juegos, crea un documento POC Een formato markdown con los requisitos para un demo ligero y funcional de un clone de Tamagotchi, usando Javascript, html5 y phaser3 (@https://newdocs.phaser.io/docs/3.85.2).
recomendaciones:
- usa las mejores practias de programacion.
- codigo separado por clases
- la mayoria de las lineas comentadas

ejemplos:
- @https://github.com/ChrisChrisLoLo/tamagotchiClone 
- @https://github.com/antonioamgm/Tamagotchi_000/blob/master/tamagotchi.html  

```
### Resultado Generado:
[1. Resultado POC1](prompts-resultados.md#1.-Resultado-POC1)

### Cambios Realizados:
- no deberia crear codigo.
- si fuera necesario crear codigo, no deberia estar en el formato correspondiente no texto.
### Errores:

## 2. Segundo Prompt:creacion del Proof of concept doc (POC) ver2

**Fecha:** 2024-09-22  
**Descripción:** Este prompt busca generar un resumen automát

### Prompt:
```
Eres un experdo en desarrollo de video juegos, crea un documento POC Een formato markdown con los requisitos para un demo ligero y funcional de un clone de Tamagotchi, usando Javascript, html5 y phaser3 (@https://newdocs.phaser.io/docs/3.85.2).
- por ahora solo quiereo el POC no necesito crees otros archivos.

recomendaciones:
- usa las mejores practias de programacion.
- codigo separado por clases
- la mayoria de las lineas comentadas
- no escribas codigo como texto, haslo con el formato correspondiente.

ejemplos:
- @https://github.com/ChrisChrisLoLo/tamagotchiClone 
- @https://github.com/antonioamgm/Tamagotchi_000/blob/master/tamagotchi.html  

```
### Resultado Generado:
[Texto del enlace](prompts-resultados.md#2.-Resultado-POC2)

### Cambios Realizados:

- no deberia crear codigo.
- no genero el contenido del poc en markdown
- no creo la estructura en formato mermaid
  
## 3. Tercer Prompt: creación del Proof of concept doc (POC) ver3

**Fecha:** 2024-09-22  
**Descripción:** POC en markdown y estructro en mermaid

### Prompt:
```
Eres un experdo en desarrollo de video juegos, crea un documento POC Een formato markdown con los requisitos para un demo ligero y funcional de un clone de Tamagotchi, usando Javascript, html5 y phaser3 (@https://newdocs.phaser.io/docs/3.85.2).


requisitos:

- POC en formato markdown
- Estructura en formato Mermaid
- no empiezes a crear los archivos de la estructura.
- no crees el los archivos js o html, ni su contenido, solo necesito la estructura en mermaid 
- no escribas codigo como texto, haslo con el formato correspondiente, en bloques de codigo.
 

ejemplos/referencias:
- @https://github.com/ChrisChrisLoLo/tamagotchiClone 
- @https://github.com/antonioamgm/Tamagotchi_000/blob/master/tamagotchi.html  

``` 
### Resultado Generado:
[resultdo 3](prompts-resultados.md#3.-Resultado-POC3)

### Cambios Realizados:
[POC File](/Tamagotchi-CAAM/POC)
[POC File](/Tamagotchi-CAAM/POC)

## 4. Cuarto Prompt: creación del Product Requirement Document (PRD)

**Fecha:** 2024-09-22  
**Descripción:** PRD en markdown y estructro en mermaid

### Prompt:
```
Como experdo en desarrollo de videojuegos, crea un Documento PRD en formato markdown, describe las características, funcionalidades y requisitos de un producto o sistema. Incluye detalles sobre cómo debería comportarse el producto, las expectativas del usuario y los criterios de aceptación.

- ten en cuenta el contenido del @POC 
- no empiezes a crear los archivos de la 
estructura.
- no crees el los archivos js o html, ni su
contenido, solo necesito la estructura en 
mermaid 
- no escribas codigo como texto, haslo con 
el formato correspondiente, en bloques de 
codigo.
 

ejemplos/referencias:
- @https://github.com/ChrisChrisLoLo/
tamagotchiClone 
- @https://github.com/antonioamgm/
Tamagotchi_000/blob/master/tamagotchi.html 

```
### Resultado Generado:
[resultdo 4](prompts-resultados.md#4.-Resultado-POC4)

### Cambios Realizados:
[PRD File](/Tamagotchi-CAAM/PRD.MD)

## 5. Quinto Prompt: configuracion inicial del proyecto

**Fecha:** 2024-09-22  
**Descripción:** 

### Prompt:
```
Como experdo en desarrollo de videojuegos, ayudame paso a paso con el seting inicial del proyecto. para ello ten en cuenta los documentos @POC y @PRD, en especial la estructura en el @POC


- Presentame El contenido de cada archivo en su formato correspondiente, .HTML, .JS 

- no escribas codigo como texto, haslo con 
el formato correspondiente, en bloques de 
codigo.
- usa las mejores practias de programacion.
- codigo separado por clases
- la mayoria de las lineas comentadas

ejemplos/referencias:
- @https://github.com/ChrisChrisLoLo/
tamagotchiClone 
- @https://github.com/antonioamgm/
Tamagotchi_000/blob/master/tamagotchi.html 


``` 

### Resultado Generado:
[resultdo 5](prompts-resultados.md#5.-Resultado-Configuracion-inicial)

### Cambios Realizados:
[PRD File](/Tamagotchi-CAAM/index.html)
[PRD File](/Tamagotchi-CAAM/styles.css)
[PRD File](/Tamagotchi-CAAM/jsFolder/config.js)
[PRD File](/Tamagotchi-CAAM/jsFolder/main.js)
[PRD File](/Tamagotchi-CAAM/jsFolder/preload.js)
[PRD File](/Tamagotchi-CAAM/jsFolder/mainScene.js)
[PRD File](/Tamagotchi-CAAM/jsFolder/pet.js)
[PRD File](/Tamagotchi-CAAM/jsFolder/ui.js)