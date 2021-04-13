FROM amazoncorretto:11.0.10-alpine
RUN mkdir /app
COPY build/libs/*.jar /app/ptm.jar
CMD ["java","-jar","/app/ptm.jar"]
RUN apk --update add fontconfig ttf-dejavu



#########---5TH--------------
##FROM findepi/graalvm:java11-native
##FROM ghcr.io/graalvm/graalvm-ce:java11-21.0.0

##FROM ghcr.io/graalvm/graalvm-ce:latest
##RUN gu install native-image
##RUN mkdir /app
##COPY build/libs/*.jar /app/ptm.jar
##RUN native-image -jar ./app/ptm.jar 
##CMD [ "sh", "-c", "./ptm" ]

#########---3RD--------------
#FROM gradle:6.8.0-jdk11 AS stage1
#COPY --chown=gradle:gradle . /home/gradle/src
#WORKDIR /home/gradle/src
#RUN gradle clean build -x test --no-daemon 

#FROM ghcr.io/graalvm/graalvm-ce:java11-21.0.0
#RUN gu install native-image
#EXPOSE 8080
#RUN mkdir /app
#COPY --from=stage1 /home/gradle/src/build/libs/*.jar /app/ptm.jar
#RUN native-image --static -jar ./app/ptm.jar 
#ENTRYPOINT["./ptm"]

#########---4TH--------------
#FROM gradle:6.8.0-jdk11 AS stage1
#COPY --chown=gradle:gradle . /home/gradle/src
#WORKDIR /home/gradle/src
#RUN gradle clean build -x test --no-daemon 

#FROM ghcr.io/graalvm/graalvm-ce:java11-21.0.0 AS stage2
#RUN gu install native-image
#RUN mkdir /app
#COPY --from=stage1 /home/gradle/src/build/libs/*.jar /app/ptm.jar
#RUN native-image -jar ./app/ptm.jar --no-fallback --verbose

#FROM oraclelinux:8.3
#RUN mkdir /ni
#COPY --from=stage2 /ptm /ni/ptm
#CMD [ "sh", "-c", "./ni/ptm" ]

#########---2ND--------------
##FROM gradle:6.8.0-jdk11 AS build
#COPY --chown=gradle:gradle . /home/gradle/src
#WORKDIR /home/gradle/src
#RUN gradle clean build -x test --no-daemon 

#FROM ghcr.io/graalvm/graalvm-ce:java11-21.0.0
#EXPOSE 8080
#RUN mkdir /app
#COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
#ENTRYPOINT ["java","-jar","/app/spring-boot-application.jar"]

#########---1ST--------------
#FROM gradle:6.8.0-jdk15 AS build
#COPY --chown=gradle:gradle . /home/gradle/src
#WORKDIR /home/gradle/src
#RUN gradle clean build -x test --no-daemon 

#FROM openjdk:14-jdk-alpine
#EXPOSE 8080
#RUN mkdir /app
#COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
#ENTRYPOINT ["java","-jar","/app/spring-boot-application.jar"]
#RUN apk --update add fontconfig ttf-dejavu


