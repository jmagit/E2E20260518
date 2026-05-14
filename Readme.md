# Curso de Playwright

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

    netsh int ipv4 set dynamic tcp start=51000 num=14536

### Contenedores

#### Web para pruebas

    docker run -d --name web-for-testing -p 8181:8181 jamarton/web-for-testing

## Documentación

- [Playwright](https://playwright.dev/)

## Sitios web para practicar pruebas E2E

- [Web4Testing](https://github.com/jmagit/Web4Testing)
- [Practice Software Testing](https://practicesoftwaretesting.com/)
- [OpenCart](https://opencart.abstracta.us/)
- [Sauce Demo](https://www.saucedemo.com/)
