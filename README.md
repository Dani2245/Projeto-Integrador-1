# Projeto-Integrador-1
projeto integrador UNIVESP- criação de um framework web agendamento de um salão 

## Pré-requisitos
Python 3.10 ou 3.11
Poetry
PIP
Git

## Instalação

Este guia assume que você está utilizando o Windows como sistema operacional.

### Instalação do Python 3.10 ou 3.11
Primeiramente certifique de que a sua versão de Python é a 3.10.X ou 3.11.X
```python --version```

1. Baixe o instalador do Python 3.10 do site oficial [python.org](https://www.python.org/downloads/release/python-3100/).
2. Execute o instalador. Certifique-se de marcar a opção "Add Python 3.10 to PATH" antes de clicar em "Install Now".

### Instalação do Poetry

Após instalar o Python, instale o Poetry, um gerenciador de dependências e pacotes para Python.

1. Abra o Prompt de Comando ou o PowerShell.
2. Execute o seguinte comando para instalar o Poetry:

```pip install poetry```

## Instalação das Dependências

Com o Poetry instalado, você pode instalar as dependências do projeto.

1. Navegue até o diretório do projeto onde o arquivo `pyproject.toml` está localizado.
2. Execute o comando abaixo para instalar as dependências:

```poetry install```

```npm install```


Agora você deve ter todas as dependências necessárias instaladas e está pronto para começar a trabalhar no projeto!

## Iniciando o projeto

Para executar o projeto, execute o comando:
```npm run pyhipster```

O resultado deverá ser parecido com a seguinte saída:


```
npm run pyhipster

> projeto-integrador-um@0.0.1-SNAPSHOT pyhipster
> concurrently "npm:start" "npm:pyhipster:sqlite:start" npm:pyhipster:backend:start

[start]
[start] > projeto-integrador-um@0.0.1-SNAPSHOT start
[start] > npm run webapp:dev --
[start]
[pyhipster:sqlite:start]
[pyhipster:sqlite:start] > projeto-integrador-um@0.0.1-SNAPSHOT pyhipster:sqlite:start
[pyhipster:sqlite:start] > poetry run sqlite_web --port 8092 --url-prefix "/sqlite-console" --no-browser pyhipster.db3
[pyhipster:sqlite:start]
[pyhipster:backend:start]
[pyhipster:backend:start] > projeto-integrador-um@0.0.1-SNAPSHOT pyhipster:backend:start
[pyhipster:backend:start] > poetry run task run_app
[pyhipster:backend:start]
[start]
[start] > projeto-integrador-um@0.0.1-SNAPSHOT webapp:dev
[start] > npm run webpack-dev-server -- --config webpack/webpack.dev.js --env stats=minimal
[start]
[start]
[start] > projeto-integrador-um@0.0.1-SNAPSHOT webpack-dev-server
[start] > webpack serve --config webpack/webpack.dev.js --env stats=minimal
[start]
[pyhipster:sqlite:start]  * Serving Flask app 'sqlite_web.sqlite_web' (lazy loading)
[pyhipster:sqlite:start]  * Environment: production
[pyhipster:sqlite:start]    WARNING: This is a development server. Do not use it in a production deployment.
[pyhipster:sqlite:start]    Use a production WSGI server instead.
[pyhipster:sqlite:start]  * Debug mode: off
[pyhipster:sqlite:start]  * Running on http://127.0.0.1:8092 (Press CTRL+C to quit)
[start] <i> [webpack-dev-server] [HPM] Proxy created: /api,/services,/management,/v3/api-docs,/h2-console,/auth  -> http://localhost:8080
[start] <i> [webpack-dev-server] [HPM] Proxy created: /sqlite-console  -> http://localhost:8092
Webpack: Starting ...
[start]
[start]   √ Compile modules
[start]   > Build modules (0%)
[start] <i> [webpack-dev-server] Project is running at:
[start] <i> [webpack-dev-server] Loopback: http://localhost:9060/
Webpack: Starting ...
[start]
[start]   √ Compile modules
[start]   √ Build modules
[start]   √ Optimize modules
[start]   √ Emit files
[start]
[start] Finished after 1.766 seconds.
[start]
[start] 47 assets
[start] 601 modules
[start] webpack 5.88.2 compiled successfully in 1753 ms
[start] Type-checking in progress...
[start] [Browsersync] Proxying: http://localhost:9060
[start] [Browsersync] Access URLs:
[start]  -------------------------------------
[start]        Local: http://localhost:9000
[start]     External: http://192.168.56.1:9000
[start]  -------------------------------------
[start]           UI: http://localhost:3001
[start]  UI External: http://localhost:3001
[start]  -------------------------------------
[pyhipster:backend:start]  * Serving Flask app 'ProjetoIntegradorUmApp' (lazy loading)
[pyhipster:backend:start]  * Environment: development
[pyhipster:backend:start]  * Debug mode: on
[pyhipster:backend:start] 13-Mar-24 22:24:03 -  * Running on http://127.0.0.1:8080 (Press CTRL+C to quit)
[pyhipster:backend:start] 13-Mar-24 22:24:03 -  * Restarting with stat
[pyhipster:backend:start] 13-Mar-24 22:24:05 -  * Debugger is active!
[pyhipster:backend:start] 13-Mar-24 22:24:05 -  * Debugger PIN: 110-765-480
[pyhipster:backend:start] 13-Mar-24 22:24:05 - 127.0.0.1 - - [13/Mar/2024 22:24:05] "GET /api/account HTTP/1.1" 200 -
[pyhipster:backend:start] 13-Mar-24 22:24:05 - 127.0.0.1 - - [13/Mar/2024 22:24:05] "GET /api/management/info HTTP/1.1" 200 -
[start] No errors found.
```
