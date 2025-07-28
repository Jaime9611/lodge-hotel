FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/lodge-hotel-restapi-0.0.1-SNAPSHOT.jar lodge-hotel-restapi.jar
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "lodge-hotel-restapi.jar"]

