FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/SellCar_Spring-0.0.1-SNAPSHOT.jar backend.jar
EXPOSE 8080
CMD ["java", "-jar", "backend.jar"]