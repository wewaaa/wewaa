FROM node:14.17.4 as builder

# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json

# 소스를 작업폴더로 복사하고 빌드
COPY src /usr/src/app/src
COPY .env.* /usr/src/app/
COPY public /usr/src/app/public

COPY node_modules /usr/src/app/node_modlues

RUN npm install --silent
RUN npm install react-scripts@4 -g --silent

RUN npm run build

FROM nginx:latest
# 앱에서 설정한 파일을 복사
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY conf/conf.d/default.conf /etc/nginx/conf.d/default.conf

# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# 80포트 오픈하고 nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]