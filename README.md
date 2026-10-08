# Task Manager

Простой менеджер задач с REST API, веб-интерфейсом и PostgreSQL.

Проект разработан с использованием Node.js, Express, React, PostgreSQL, Python и Docker.

## Возможности

Приложение позволяет:

- создавать задачи;
- просматривать список задач;
- изменять статус задачи;
- удалять задачи;
- хранить задачи в PostgreSQL;
- экспортировать задачи в CSV-файл;
- запускать весь проект с помощью Docker Compose.

## Используемые технологии

- **Node.js** — серверная часть;
- **Express.js** — REST API;
- **PostgreSQL** — база данных;
- **React** — пользовательский интерфейс;
- **Python** — экспорт задач в CSV;
- **Docker** — контейнеризация проекта;
- **Docker Compose** — запуск всех компонентов проекта.

## Проверка работоспособности

Перейти в папку проекта:

cmd в пути папки "task-manager"

со включоным Docker
вписать команду "docker compose up --build"

Проверить запущенные контейнеры "docker ps"

сылка на сайт "http://localhost:5173"

Проверка на сбои "http://localhost:3000"

Состояние таблицы "http://localhost:3000/tasks"

# Как запускать питон

заходим в папку "task-manager\python"
cmd в путь и прописываем "python export_tasks.py"

При успешном выполнении появится сообщение: Задачи успешно экспортированы в tasks.csv


## Структура проекта

task-manager
  backend
    controllers
      tasksController.js
    routes
      tasks.js
    db.js
    server.js
    package.json
    package-lock.json
    Dockerfile
    .env

  frontend
    src
      App.jsx
      App.css
      main.jsx
    index.html
    package.json
    package-lock.json
    Dockerfile

  database
    init.sql

  python
    export_tasks.py
    requirements.txt
    tasks.csv

  docker-compose.yml
  .gitignore
  README.md

## Описание файлоф

## Папка `backend`

Папка `backend` содержит серверную часть приложения. Она отвечает за REST API, обработку запросов от frontend и взаимодействие с базой данных PostgreSQL.

В папке находятся:

- `controllers/` — логика работы с задачами;
- `routes/` — маршруты REST API;
- `db.js` — подключение к PostgreSQL;
- `server.js` — запуск Express-сервера;
- `package.json` — зависимости и команды проекта;
- `Dockerfile` — настройка Docker-контейнера backend;
- `.env` — параметры подключения к базе данных.

## Папка `database`

Папка `database` содержит SQL-скрипт для создания и настройки таблицы задач в PostgreSQL.

В папке находится:

- `init.sql` — создаёт таблицу `tasks` с полями для идентификатора, названия, описания, статуса и даты создания задачи.

## Папка `frontend`

Папка `frontend` содержит клиентскую часть приложения на React. Она отвечает за отображение интерфейса и взаимодействие пользователя с REST API.

В папке находятся:

- `src/` — исходный код React-приложения;
- `index.html` — основной HTML-файл;
- `package.json` — зависимости и настройки frontend;
- `Dockerfile` — настройка Docker-контейнера frontend.

## Папка `python`

Папка `python` содержит скрипт для экспорта задач из PostgreSQL в CSV-файл.

В папке находятся:

- `export_tasks.py` — подключается к базе данных и экспортирует задачи;
- `requirements.txt` — содержит необходимые Python-зависимости;
- `tasks.csv` — файл с результатом экспорта задач.

## Оставшиеся файлы

- `docker-compose.yml` — описывает Docker-контейнеры проекта и их взаимодействие.
- `.gitignore` — содержит список файлов и папок, которые не должны добавляться в Git.
- `README.md` — содержит описание проекта, его структуры и инструкции по запуску.