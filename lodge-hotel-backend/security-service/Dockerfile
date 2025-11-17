FROM amazoncorretto:17-alpine
WORKDIR /app
COPY target/security-service-0.0.1-SNAPSHOT.jar security-service.jar
EXPOSE 8091
ENTRYPOINT ["java", "-jar", "security-service.jar"]