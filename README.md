팀원
김기현
나승미
유제빈
함우주

# :triangular_flag_on_post: Production Background

![1](https://user-images.githubusercontent.com/80400157/151126099-d2986901-2e66-4977-95f7-cf0f29776255.png)


E&M사업(Entertainment & Media)에서 디지털화가 끊임 없이 진행되고 있는 와중 주요한 요소로 평가되고 있는 부분은 개인 화와 디지털 화 입니다.


유튜브에선 나만의 콘텐츠를 만들고, SNOW, Instagram에선 나의 사진을 가지고 APP에서 제공해주는 커스터마이징 기능을 통해 자신만의 사진을 만듭니다.  그러나 우리는 이러한 점에 있어 하나의 작은 Needs를 발견했습니다. 다양한 나만의 콘텐츠를 만들 때 항상  APP의 제한을 받고 있다는 점입니다. Instagram에선 제공해주는 필터로만 자신의 사진을 커스터마이징 할 수 있으며, SNOW APP또한 필터의 개수가 한정되어 있습니다.  이러한 문제는 개인 화의 제한까지 이어질 수 있습니다.  그렇다고 사용자가 직접 이미지를 포토샵 Application을 통해 조정 및 수정을 하기에는 생각보다 요구되는 진입 장벽이 높을 뿐더러, 시간적.육체적 Cost가 상당하다고 판단했습니다. 



# :loudspeaker: Introduction
![2](https://user-images.githubusercontent.com/80400157/151126839-8a4ade01-5f84-4f2c-979a-6101a8dba2cc.png)<br>
[첨부자료](https://arxiv.org/pdf/2112.13985.pdf)

저희는 해당 문제를 갖고 리서치를 하던 도중 A.I를 통해 TEXT를 IMAGE로 바꾸는 기술이 있다는 자료를 찾아냈습니다. 이러한 기술이 있다면 이미지를 만드는 과정에 있어 진입 장벽을 낮추고, 사용자가 희망하는 이미지를 아무런 육체적 노력 없이, 1~2분의 단출한 시간으로 만들 수 있습니다.  또한 해당 기술은 A.I를 통해 사용자가 입력한 TEXT를  그려주기 때문에 개인 화 이슈도 해결할 수 있다 판단했습니다.



하지만 광범위한 주제 범위로 인해 A.I모델의 정확도가 떨어지는 이슈가 발생하였습니다. 이러한 점에 있어 정확도를 올리기 위해 하나의 주제(콘텐츠)화 시켜야 할 필요가 있다고 생각했습니다. 어떤 식으로 주제를 정할까 생각하던 도중  미국 유명 애니메이션인 심슨을 발견하게 되었습니다. 약 30년의 긴 방영 기간을 갖고 있음에도 불구하고 아직까지 많은 사람들의 사랑을 받고 있는 심슨은 한국에서도 다양한 굿즈화가 이루어지며 그 명성을 유지하고 있습니다. 그에 우리의 목표인 APP에도 잘 어울리고, 수요가 많다는 것이 입증되어 심슨과 관련된 TEXT TO IMAGE 기능을 구현하게 되었습니다.


# :wrench: System Architecture

![Untitled Diagram drawio (19)](https://user-images.githubusercontent.com/80400157/151128063-36ba45de-31e0-4a65-ba6d-3874364a9751.png)




#  :inbox_tray: Tech Stack

|Front-end|Back-end|AI|DevOps|Etc|DB|
|:---:|:---:|:---:|:---:|:---:|:---:|
|<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">| <img src="https://img.shields.io/badge/-FastAPI-%23009688?style=for-the-badge&logo=FastAPI&logoColor=white">|<img src="https://img.shields.io/badge/-PyTorch-%23EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white">|<img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">| <img src="https://img.shields.io/badge/-Grafana-%23F46800?style=for-the-badge&logo=grafana&logoColor=white">|<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
|<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">|||<img src="https://img.shields.io/badge/-NGINX-%23009639?style=for-the-badge&logo=NGINX&logoColor=white">|<img src="https://img.shields.io/badge/-Prometheus-%23E6522C?style=for-the-badge&logo=Prometheus&logoColor=white">
|||||<img src="https://img.shields.io/badge/-Google%20Cloud-4285F4?style=for-the-badge&logo=Google Cloud&logoColor=white">|

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 # :lock: Git Convention 
 
 ## 1. Commit Message Structure
 기본적으로 커밋 메시지는 아래와 같이 제목/본문/꼬리말로 구성한다.
 
 ## 2. Commit Type
 - feat:새로운 기능 추가
 
 - fix:버그 수정
 
 - docs:문서 수정
 
 - style:코드 포맷팅, 세미콜론 누락, 코드 변경이 없는경우
 
 - refactor:코드 리팩토링
 
 - test:테스트코드, 리팩토링 테스트 코드 추가
 
 - chore:빌드 업무 수정, 패키지 매니저 수정
 
 ## 3. Subject
 제목은 50자를 넘기지 않고, 대문자로 작성하고 마침표를 붙이지 않는다.
 
 과거시제를 사용하지 않고 명령어로 작성한다.
 
 ex)"Fixed" -> "Fix"
 
    "Added" -> "Add"
 
 ## 4. Body
 - 선택사항이기 때문에 모든 커밋에 본문내용을 작성할 필요는 없다.
 
 - 부연설명이 필요하거나 커밋의 이유를 설명할 경우 작성해준다.
 
 - 72자를 넘기지 않고 제목과 구분되고 위해 한칸을 띄워 작성한다.
 
 


 # :office: Member
 |:sunglasses:김기현(Leader)|:laughing:함우주|:stuck_out_tongue_winking_eye:나승미|:joy:유제빈|
|:---:|:---:|:---:|:---:|
| Back-end  |AI  |Web Desginer, |Web Desginer,| 
|    Front-end developer       |   AI inference             |   UI/UX Desginer              |  Front-end developer
|AI Traning|||
|DevOps|||
   
   








[노션](https://ce19f003.notion.site/Wee-Waa2-0-b0e38d830e844f0e80cd76f25e113e0f)
