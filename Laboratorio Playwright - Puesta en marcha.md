# Laboratorio Playwright: Puesta en marcha

## Instalaciones

- Node.js LTS (Alternativas)
  - [Node.js](https://nodejs.org/es)
  - [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Git](https://git-scm.com/)

### Extensiones Visual Studio Code

- [Spanish Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-es)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) + [Spanish - Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-spanish)
- [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- Clientes REST:
  - [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
  - [Postman](https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode)

### CI (opcional)

#### GitHub Actions

- Cuenta GitHub

#### Docker Desktop

- [WSL 2 feature on Windows](https://learn.microsoft.com/es-es/windows/wsl/install)
- [Docker Desktop](https://www.docker.com/get-started/)

#### Alternativas a Docker Desktop

- [Podman](https://podman.io/docs/installation)
- [Rancher Desktop](https://rancherdesktop.io/)

#### Configuración de puertos dinámicos en Windows (como administrador)

``` bash
netsh int ipv4 set dynamic tcp start=51000 num=14536
```

### Contenedores

#### Web para pruebas

``` bash
docker run -d --name web-for-testing -p 8181:8181 jamarton/web-for-testing
```

## Documentación

- [Playwright](https://playwright.dev/)

## Creación del proyecto

Para crear un proyecto denominado `appName` (cambiar al nombre real):

``` bash
npm init playwright@latest appName
    √ Do you want to use TypeScript or JavaScript? · TypeScript
    √ Where to put your end-to-end tests? · tests
    √ Add a GitHub Actions workflow? (Y/n) · true
    √ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true

cd appName
npm install eslint typescript-eslint @eslint/js @eslint/json @eslint/markdown globals eslint-plugin-playwright --save-dev
```

Crear en el directorio del proyecto el fichero `eslint.config.mjs`, editar y guardar con el siguiente contenido:

``` javascript
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import playwright from 'eslint-plugin-playwright'

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  tseslint.configs.recommended,
  { files: ['tests/**'], extends: [playwright.configs['flat/recommended']],     rules: { }, },
]);
```

*Como alternativa se puede generar con:*

``` bash
npx eslint --init
    ? What do you want to lint? ...
    (*) JavaScript
    (*) JSON
    ( ) JSON with comments
    ( ) JSON5
    (*) Markdown
    ( ) CSS
    ? How would you like to use ESLint? ...
    To check syntax only
    > To check syntax and find problems
    ? What type of modules does your project use? ...
    > JavaScript modules (import/export)
    CommonJS (require/exports)
    None of these
    ? Which framework does your project use? ...
    React
    Vue.js
    > None of these
    ? Does your project use TypeScript? » No / Yes - Yes
    ? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
    (*) Browser
    (*) Node? 
    Which language do you want your configuration file be written in? ...
    > JavaScript
    TypeScript
    ? What flavor of Markdown do you want to lint? ...
    > CommonMark
    GitHub Flavored Markdown
    eslint, @eslint/js, globals, typescript-eslint, @eslint/json, @eslint/markdown
    ? Would you like to install them now? » No / Yes - Yes
    ? Which package manager do you want to use? ...
    > npm
    yarn
    pnpm
    bun
npm install eslint-plugin-playwright --save-dev
```

*Y editar el fichero `eslint.config.mjs` para añadir:*

``` javascript
// ...
import playwright from 'eslint-plugin-playwright'

export default defineConfig([
  // ...
  { files: ['tests/**'], extends: [playwright.configs['flat/recommended']], rules: { }, },
]);
```

Editar el fichero package.json y sustituir la linea 6 (`"scripts": {},`) por:

``` json
    "scripts": {
      "test": "playwright test",
      "e2e": "playwright test",
      "e2e:report": "playwright show-report",
      "e2e:dev": "playwright test --project=chromium --ui",
      "e2e:chrome": "playwright test --project=chromium",
      "e2e:headed": "playwright test --headed",
      "lint": "eslint tests",
      "lint:fix": "eslint tests --fix"
    },
```

Para analizar que el proyecto no tiene errores:

``` bash
npm run lint
```

Para ejecutar la batería de pruebas solo en el Chrome:

``` bash
npm run e2e:chrome
```

Para ejecutar la batería de pruebas en el interfaz de usuario (dale al play o F5):

``` bash
npm run e2e:dev
```

Para ejecutar la batería de pruebas en todos los navegadores:

``` bash
npm run e2e
```

Para ejecutar la batería de pruebas en todos los navegadores y ver como los abre y ejecuta las pruebas:

``` bash
npm run e2e:headed
```

Para ver el informe con el resultado de las pruebas:

``` bash
npm run e2e:report
```

Para cerrar el servidor de informes, presiona `Ctrl+C`.

## Sitios web para practicar pruebas E2E

- [Web4Testing](https://github.com/jmagit/Web4Testing)
- [Practice Software Testing](https://practicesoftwaretesting.com/)
- [OpenCart](https://opencart.abstracta.us/)
- [Sauce Demo](https://www.saucedemo.com/)
