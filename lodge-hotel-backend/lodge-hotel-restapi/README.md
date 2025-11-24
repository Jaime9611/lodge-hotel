# Overview

This is the main service for the Lodge Hotel API REST.

# How to run this service locally?

## Initial images:

You can add initial images by creating this folder in the `src/main/resources/static/images`
There you can add images of `.webp` type. To correctly map these images in the database you should
update the `data.sql` for `cabins`, and add the following urlPath (for each cabin image)
`<GATEWAY-SERVICE-DOMAIN-&-PORT>/api/v1/storage/public/cabin/<IMAGE-NAME>.webp`
replacing the variables with the correct values.

## Keystore.jks

Ensure there is a `keystore.jks` inside the `src/main/resources` folder. See `README.md` in the
parent folder of this service, for [instructions](../README.md#keystore) on how to create a `keystore`.

## Database

This service needs a MySQL database. You can modify the `src/main/resources/application.yml` file
to add the Domain/Port and user/password for your database instance. For example in the
`application.yml` you can replace this properties with the actual values for your Database.
Text between `<>` should be replaced with the actual values for your database instance:

```yml
spring:
  datasource:
    username: <USER-NAME>
    password: <PASSWORD>
    url: jdbc:mysql://${DB_SERVER:<DOMAIN>}:<PORT>/${DB_NAME:<DB-NAME>}?createDatabaseIfNotExists=true&serverTimeZone=UTC
```

> Note: your <DB-NAME> should are already exists in the database.
> Note: You can also use ENV variables, you just need to create these variables in your environment
>
> - DB_USERNAME (user to access Database instance)
> - DB_PASSWORD (password to access Database instance)
> - DB_SERVER (domain to access Database instance)
> - DB_PORT (port to access Database instance)
> - DB_NAME (database name to be use by this service.)

## Run the Project

You can run the application by using the command `mvn spring-boot:run -DskipTests`
Optionally if you want to use custom environment variables with Maven you can use this format,
replacing the text between `<>` with your key/value variables:

`mvn spring-boot:run -DskipTests -Dspring-boot.run.jvmArguments="-D<ENV-KEY1>=<ENV-VALUE1> -D<ENV-KEY2>=<ENV-VALUE2>"`
