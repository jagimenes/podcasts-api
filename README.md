## Nestjs Application to simulate calls from Listen Notes API

## :computer: Functionalities
🔴API /best_podcasts, with query params page, genre_id, region and safe_mode. You can use like this: <br>
{base_url}/best_podcasts?genre_id=140&page=1&region=us&safe_mode=1 <br>

## Technologies and tools you have to use:
☑️ [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) <br>
☑️ [Typescript](https://www.typescriptlang.org/) <br>
☑️ [Node.js](https://nodejs.org/) <br>
☑️ [Nestjs](https://nestjs.com/) <br>
☑️ [Docker](https://www.docker.com/) <br>

## Start instructions (Locally)
- Make sure you have the Node.js installed
- clone this repo
- Access the folder
- Configure .env with the params (whe have a .env.example to use as reference)
- If you not configure any access_tokens, the application you generate a dinamically one and drop to the console
- Execute command npm install
- Execute command npm run start

## Start instructions (Using Docker)
- Make sure you have Docker installed
- Clone this repo
- Access the folder
- Configure .env with the params (whe have a .env.example to use as reference)
- If you not configure any access_tokens, the application you generate a dinamically one and drop to the console
- Execute command docker-compose up
