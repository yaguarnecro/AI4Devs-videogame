import os

# Crear la estructura de carpetas
folders = [
    "gusanos",
    "gusanos/assets",
    "gusanos/assets/images",
    "gusanos/assets/maps",
    "gusanos/src",
    "gusanos/src/game",
    "gusanos/src/physics",
    "gusanos/src/ui",
    "gusanos/src/utils",
    "gusanos/styles",
    "gusanos/tests"
]

for folder in folders:
    os.makedirs(folder, exist_ok=True)

# Crear los archivos vacíos
files = [
    "gusanos/index.html",
    "gusanos/game.html",
    "gusanos/end.html",
    "gusanos/src/main.js",
    "gusanos/styles/main.css",
    "gusanos/styles/index.css",
    "gusanos/styles/game.css",
    "gusanos/styles/end.css"
]

for file in files:
    with open(file, 'w') as f:
        pass

# Verificar la estructura de carpetas y archivos creados
os.listdir("gusanos"), os.listdir("gusanos/assets"), os.listdir("gusanos/src"), os.listdir("gusanos/styles")
