# 백엔드 코스 - 5차 선발과제 
Node.js(Express.js), Mysql, Sequelize, 
## 요구사항 분석

---

#### 1\. 채용공고 등록

-   회사를 등록한 후 채용공고를 등록할 수 있습니다.

POST /recruitments
```
Request(Body) :
{
  "companyId":1,
  "position":"백엔드 개발자",
  "reward":100000,
  "content":"백엔드 개발 및 유지보수",
  "skil":"node.js"
}
```
```
Response :
{
  "message": "채용공고 등록하였습니다."
}
```
- Body로 받은 내용을 DB에 저장합니다.

#### 2\. 채용공고 수정

-   회사id를 제외한 요청된 값만 수정합니다.

PATH /recruitments/:id
```
Request(Body) :
{
  "position":"백엔드 개발자",
  "reward":100000,
  "content":"백엔드 개발 및 유지보수",
  "skil":"node.js"
}
```
```
Response :
{
  "message": "채용공고를 수정하였습니다."
}
```
- Body로 받은 내용을 DB(포지션, 채용포상금, 내용, 사용기술)에 수정합니다.

#### 3\. 채용공고 삭제

-   해당 채용공고를 삭제합니다.

DELETE /recruitments/:id

```
Response :
{
  "message": "채용공고를 삭제하였습니다."
}
```

#### 4\. 채용공고 목록조회

-   채용내용을 제외한 채용공고 목록을 조회합니다.

GET /recruitments
```
Response :
[
  {
    "id": 4,
    "position": "백엔드",
    "reward": 1000000,
    "skil": "Django",
    "company_id": 1,
    "Company": {
        "id": 1,
        "name": "wanted",
        "contry": "대한민국",
        "region": "서울"
    }
  },
  {  
    "id": 5,
    "position": "프론드",
    "reward": 100000,
    "skil": "React.js",
    "company_id": 1,
    "Company": {
        "id": 1,
        "name": "wanted",
        "contry": "대한민국",
        "region": "판교"
    }
  }, ...
]
```

- 모든 채용공고를 보여줍니다.

#### 5\. 채용공고 검색

-   회사명과 사용기술, 채용포지션에서 키워드로 검색할 수 있습니다.


GET /recruitments?search=Django

```
Response :
[
  {
    "id": 4,
    "position": "백엔드",
    "reward": 1000000,
    "skil": "Django",
    "company_id": 1,
    "Company": {
        "id": 1,
        "name": "wanted",
        "contry": "대한민국",
        "region": "서울"
    }
  },
  {  
    "id": 5,
    "position": "프론드",
    "reward": 100000,
    "skil": "Django",
    "company_id": 1,
    "Company": {
        "id": 1,
        "name": "wanted",
        "contry": "대한민국",
        "region": "판교"
    }
  }, ...
]
```



#### 6\. 채용공고 상세조회

-   채용내용을 포함한 전체 채용공고를 조회합니다.
-   해당 채용공고는 제외하고 해당 회사에서 올린 채용공고 목록을 포함합니다.


GET /recruitments/:id
```
Response :

{
  "id": 4,
  "position": "백엔드",
  "reward": 1000000,
  "skil": "Django",
  "company_id": 1,
  "Company": {
      "id": 1,
      "name": "wanted",
      "contry": "대한민국",
      "region": "서울"
  }
  "recruitments": [1,2,3]
}
```

#### 7\. 채용공고 지원

-   사용자는 채용공고에 1번만 지원할 수 있습니다.

POST /users/:id/apply
```
Request(Body) :
{
  "recruitmentId":1
}
```
```
Response :
{
  "message": "채용공고 등록하였습니다."
}
```


---
## Unit Test
### jest로 유닛테스트 진행
