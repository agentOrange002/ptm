### Hi there, I'm Jimboy- aka [agentOrange002][website] 👋

[![Website](https://img.shields.io/website?label=agentOrange002.com&style=for-the-badge&url=https%3A%2F%2Fdistracted-einstein-e83f94.netlify.app)](https://distracted-einstein-e83f94.netlify.app/)


<img src="readme.png" align="right" />

# PTM - Back End [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/agentOrange002/ptm#readme)
> PTM Back End Rest API

Payout Team Management - Back End is a Restfull Web API Services built with Spring Boot, Spring Data JPA, Spring Security, JasperReport, Maven ,PostreSQL and GraalVM Native Image. 

It's an application that can administer and manage Boards and Boardmembers. It allows users, supports and administrators to manage issues.

<br />

### Languages and Tools:

[<img align="left" alt="Java" width="26px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/java.svg"/>][website]

[<img align="left" alt="Spring" width="26px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/spring.svg"/>][website]

[<img align="left" alt="PostgreSQL" width="26px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/postgresql.svg"/>][website]

[<img align="left" alt="Maven" width="26px" src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/apachemaven.svg"/>][website]


<br />
<br />

## Available Maven Command

In the project directory, you can run:

Before you start: Tell Maven to allow downloading from your insecure repository of jasper report by adding this mirror to your ~/.m2/settings.xml

<settings>
  ...
  <mirrors>
	<mirror>
	  <id>jaspersoft-third-party-mirror</id>
	  <mirrorOf>jaspersoft-third-party</mirrorOf>
	  <url>http://jaspersoft.jfrog.io/jaspersoft/third-party-ce-artifacts/</url>
	  <blocked>false</blocked>
	</mirror>
  </mirrors>
  ...
</settings>



### `mvn spring-boot:run`

Runs the restfull app.
Open [http://localhost:8080/itsystem](http://localhost:8080/itsystem) to view it in the browser.

### `mvn clean install`

Builds the jar and docker image for production.
Using this command it can build jar and docker image in one go.

### `docker-compose build`

Builds the docker image for production.
Make sure that build jar first before run this command.

### `docker-compose up`

After creating container using the dockerCompose command, you may use this command.
If you have any changes in your app just run this to update the container.

<br/>

➡️ [more projects...](https://github.com/agentOrange002?tab=repositories)

---

[website]: https://distracted-einstein-e83f94.netlify.app/
