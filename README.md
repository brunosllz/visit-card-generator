
<h4 align="center">
 🪪 Visit Card Generator 🪪
</h4>

<p align="center">
  <a href="#--about-the-project">About</a> •
  <a href="#-%EF%B8%8F-functionalities">Functionalities</a> •
  <a href="#--technologies">Technologies</a>
</p>

<br/>

![](https://github.com/brunosllz/visit-card-generator/blob/main/src/assets/github-cover.png)

## [](https://github.com/brunosllz/Platform_lab#--sobre-o-projeto) 💻 About the project
This project was developed as part of [Buzzvel](https://buzzvel.com/) technical test. The objective of the project was to create a solution to generate business cards that include a QR code. The QR code would be scanned by others and redirect to a page with the user's contact information, making it easier for people to find their information. The end result is a simple and effective solution to improve the visibility and accessibility of user's contact information.

---

## [](https://github.com/brunosllz/Platform_lab#-%EF%B8%8F-funcionalidades) ⚙️ Functionalities

- Register personal describe
- Register personal contacts
- Custom visit card
- Generate visit card
- Download visit card
- Generate page of contacts

---

#### 🧭 Running the application
This project use a database, here i`m using [Docker](https://www.docker.com/), for run this application you need to have the MySQL database up.

```bash
# Clone this repository
$ git clone https://github.com/brunosllz/visit-card-generator
# Install the dependencies
$ npm install
# Run docker compose
$ docker-compose up -d
```

Now you need create ".env" file in the project root, like this [file](https://github.com/brunosllz/visit-card-generator/blob/main/.env-example).

```bash
# Run database migrations
$ npx prisma migrate dev
# Run the application
$ npm run dev
```
---

## [](https://github.com/brunosllz/Platform_lab#--tecnologias) 🛠 Technologies

The following tools were used in building the project:

- Nextjs
- Typescript
- Prisma
- React Hook Form
- Zod
- Vitest


> See the file [package.json](https://github.com/brunosllz/visit-card-generator/blob/main/package.json)
