FROM amazoncorretto:17-alpine
WORKDIR /app
COPY src ./src
COPY target .
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "lodge-hotel-restapi-0.0.1-SNAPSHOT.jar"]

