# Lodge Hotel Backend

This is the backend REST API implementation for the Lodge Hotel app.

This project consist of 4 services working together to provide the REST endpoints that the Frontend will use.

## Table of content

1. [Tech Overview.](#tech-overview)
2. [Project Structure.](#project-structure)
3. [Initial Data](#initial-data)
   1. [Keystore](#keystore)
   2. [Images](#images)
4. [How to run with Docker.](#how-to-run-with-docker)
   1. [Build the services](#build-the-project)
   2. [Useful docker commands](#useful-docker-commands)

## Tech Overview

This was created using the following technologies:

- Java version 17.0.15
- Maven 3.9.1

In order to run this project ensure you installed and setup your environment with these technologies.

## Project Structure:

- **eureka-server**: Service to register location of each of the services.
- **gateway-server**: Service that listens to incoming request a redirects the request to the correct service.
- **security-service**: Service that handles User Authentication and Authorization.
- **lodge-hotel-restapi**: Service that has all endpoints related to the Hotel.
- **env**: Folder with all `.env` files used by Docker.
- **init-scripts**: Initialization scripts that Docker uses for creating the databases for security and lodge-hotel services.
- **build-all.bat**: Script to create a build of each service.
- **docker-compose.yml**: Docker compose implementation to run all services using docker containers.

## Initial Data

Before running the services you need to provide some initial files:

### Keystore

First its needed to generate a key for the services to create and verify tokens, this tools in `keytool` this will come with your JDK installation for Java. Then you can run this command using CMD to generate a new key:

```bash
keytool -genkeypair -alias auth-server -keyalg RSA -keysize 2048 -storetype JKS -keystore keystore.jks -validity 3650 -storepass <STORE-PASS> -keypass <KEY-PASS> -dname "CN=Auth Server, OU=OAuth2, O=Company, L=City, S=State, C=CO"
```

> Note: replace the variables between <> with the values you want.

The generated `keystore.jks` needs to be copied to the following locations:

- gateway-service/src/main/resources
- security-service/src/main/resources
- lodge-hotel-restapi/src/main/resources

Also you need to update the password value for the keyStore in each respective `application.yml` file.

In each of these files add/replace your password for the keyStore:

- gateway-service/src/main/resources/application.yml
- security-service/src/main/resources/application.yml
- lodge-hotel-restapi/src/main/resources/application.yml

```yml
keyStore:
  path: keystore.jks
  password: <KEY-PASS>
  alias: auth-server
```

### Images

For iniital image you can follow the guide for the [lodge-hotel-restapi](lodge-hotel-restapi/README.md#initial-images) guide.

## How to run with Docker:

### Build the project

Once you have everything in the previous step, in order to make the Docker compose to work its needs a build, for this execute the `build-all.bat` which will create a build for each of the services.

After running the script is recommended to do a Docker build to ensure that Docker update the image with the latest build.

```bash
docker-compose build --no-cache
```

Once you have everything in the previous step you can use your Docker engine to run the `docker-compose.yml` file.

### Useful docker commands

Run service in `docker-compose.yml`

```bash
docker-compose up -d
```

Stop and delete containers for services in `docker-compose.yml`

```bash
docker-compose down
```

## References

= [Spring boot Course] https://www.udemy.com/share/1080GW/
