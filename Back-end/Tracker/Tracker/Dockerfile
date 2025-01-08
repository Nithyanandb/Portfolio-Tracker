# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Copy the application properties file
COPY src/main/resources/application.properties ./src/main/resources/

# Install Maven
RUN apk add --no-cache maven

# Build the application
RUN mvn clean package -DskipTests

# Expose the port the app runs on
EXPOSE 2000

# Command to run the application
CMD ["java", "-jar", "target/Tracker-0.0.1-SNAPSHOT.jar"]