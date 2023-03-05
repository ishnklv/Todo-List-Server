<h1>Todo List Api Server</h1>
<div>Author: Aktan Ishenkulov</div>
<div>License: MT</div>

# Инструкции для запуска приложения 

<div>1. Для Запуска в режиме разработки нужно:</div>
<ul>
    <li>Node.js >= 18</li>
    <li>Nest.js >= 9.0</li>
    <li>Postgres >= 14</li>
</ul>
<ul>
    <li>npm run install - для установки всех зависимостей</li>
    <li>cp .env.example .env && vim .env - скопируйте все дефолтные переменные окружения и настройте их под свою среду</li>
    <li>npm run typeorm:migration:run - для запуска всех бд миграций</li>
    <li>npm run start:dev - для запуска приложения в режиме development</li>
    <li>npm run start - для запуска приложения в режиме production</li>
</ul>
<div>Критерии:</div>

<div>2. Для запуска приложения через docker</div>
<ul>
    <li>cp docker.example.env docker.env - чтобы скопировать все переменные окружения для докер среды</li>
    <li>vim docker.env - вы можете настроить себя, но желательно не стоит менять перменные окружения postgres</li>
    <li>docker-compose up -d</li>
</ul>

<div>Api url: <a>https://localhost:3000</a></div>
<div>Swagger url: <a>https://localhost:3000/docs</a></div>
