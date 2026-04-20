# Pokemon Battle Simulator

## Stack del proyecto

![stack](https://go-skill-icons.vercel.app/api/icons?i=pnpm,vite,react,reactrouter,javascript,zustand,tanstack)

- dnd kit react: libreria de drag and drop

## Instalación

```bash
pnpm install

pnpm run dev
```

## Dependencias

|Dependecia                    |Versión              |
|------------------------------|---------------------|
|Node.js                       |22.20.00             |
|React                         |19.2.4               |
|React Router                  |7.14.1               |
|Zustand                       |5.0.12               |
|Tanstack Query (React Query)  |5.99.0               |

## Estructura

- src/ -> carpeta principal, donde se encuentra el proyecto en sí
- src/pages -> componentes que renderizan rutas
- src/components -> Componentes ordenados por page
- src/services -> llamadas asíncronas a PokeAPI
- src/hooks -> uso de las llamadas asíncronas mediante tanstack query
- src/utils -> colección de funciones reutilizables en todo el proyecto
- src/store -> store de la aplicación, se exporta mediante un archivo de barril

## Estilos

El proyecto utiliza CSS Modules

## Rutas

El proyecto utiliza React Router

- /
- /teams

## Testing

- jest — framework principal de testing, ejecuta los tests y genera los reportes
- jest-environment-jsdom — simula el DOM del navegador en Node para poder testear componentes React
- babel-jest — transforma los archivos ESM a CommonJS para que Jest pueda procesarlos
- @babel/core, @babel/preset-env, @babel/preset-react — permiten a Babel entender sintaxis moderna de JS y JSX
- @testing-library/react — utilidades para renderizar componentes React en los tests
- @testing-library/jest-dom — matchers adicionales para Jest como toBeInTheDocument o toHaveAttribute
- @testing-library/dom — utilidades base de DOM sobre las que se apoya @testing-library/react
- identity-obj-proxy — mockea los CSS Modules para que Jest no falle al importar archivos .css

### Tests

- capitalize.utils.js: 5 tests de la función
- battle.utils.js: 3 tests de lógica de combate
- Render del componente SinglePokemonCard

### Ejecución de los tests

```bash
pnpm test
```
