FROM amazoncorretto:11.0.10-alpine
RUN mkdir /app
COPY target/*.jar /app/ptm.jar
CMD ["java","-jar","/app/ptm.jar"]
RUN apk --update add fontconfig ttf-dejavu
