FROM ubuntu:latest
COPY ./src /HoneyPot
WORKDIR /HoneyPot
RUN apt-get upgrade
RUN ["chmod", "+x", "launch.sh"]
CMD ["./launch.sh" ]
EXPOSE 22
