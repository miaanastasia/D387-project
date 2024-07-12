FROM openjdk:17-jdk-alpine

ARG JAR_FILE=target/*.jar
COPY target/D387_sample_code-0.0.2-SNAPSHOT.jar app.jar

WORKDIR /app

EXPOSE 8080 4200

ENTRYPOINT ["java", "-jar", "/app.jar"]

