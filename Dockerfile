FROM tranuyson/cross-compiler:debian9.13 AS cc
RUN arm-linux-gnueabihf-gcc -v
COPY .. /tmp/core
WORKDIR /tmp/core
RUN npm run clean
RUN npm run setup_armhf
RUN npm run compile
# RUN cat package.json | grep -A 3 "targets" | grep node | cut -d '-' -f 3| cut -d '"' -f1
WORKDIR /tmp/
RUN tar -zcvf core.tar.gz core
RUN ls /tmp/core/dist/
FROM scratch AS export-stage
COPY --from=cc /tmp/core/dist/core core 
COPY --from=cc /tmp/core.tar.gz core.tar.gz