# Use official OpenJDK image
FROM openjdk:17-jdk-slim

# Set environment variables
ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JAVA_OPTS=""

# Create a directory for the app
WORKDIR /app

# Copy and build the JAR
COPY target/skillsync-0.0.1-SNAPSHOT.jar app.jar

# Expose the port
EXPOSE 8080

# Run the JAR
ENTRYPOINT ["java","-jar","app.jar"]
