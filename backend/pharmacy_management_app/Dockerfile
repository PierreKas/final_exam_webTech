FROM azul/zulu-openjdk-debian:21.0.2
WORKDIR /app
COPY pom.xml .
RUN apt-get update && apt-get install -y maven
RUN mvn dependency:go-offline -B
COPY . .
RUN mvn package -DskipTests
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "target/pharmacy_management_app-0.0.1-SNAPSHOT.jar"]