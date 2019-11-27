FROM clojure:openjdk-14-lein-slim-buster

COPY target/uberjar/reportly-graph.jar /reportly-graph/app.jar

EXPOSE 3000

CMD ["java", "-jar", "/reportly-graph/app.jar"]
