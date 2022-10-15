const {sequelize} = require('../models');
const app = require('../app');
const  request  = require('supertest');


beforeAll(async () => {
    await sequelize.sync();
});
afterAll(async()=>{
    await sequelize.close();
})

describe("채용 공고 등록",()=>{

    test("정상일 경우",async()=>{
        await request(app)
            .post('/recruitments')
            .send({
                "companyId":2,
                "position":"ad",
                "reward":100000000,
                "content":"zxscs",
                "skil":"scc"
            })
            .expect(201)
            .expect({  message: "채용공고 등록하였습니다." });
    });

    test("없는 경로일 경우",async()=>{
        const urlPath = '/recruitmen';
        const httpMethod = 'POST'
        await request(app)
            .post(urlPath)
            .send({
                "companyId":2,
                "position":"ad",
                "reward":100000000,
                "content":"zxscs",
                "skil":"scc"
            })
            .expect(404)
            .expect({  message: `${httpMethod} ${urlPath} 주소가 없습니다.` });
    });

    test("파라미터가 잘못된 경우",async()=>{
        await request(app)
            .post('/recruitments')
            .send({
                "companyId":2,
                "position":"ad",
                "skil":"scc"
            })
            .expect(400)
            .expect({  message: `Bad Request` });
    });

    test("DB 동작 중 문제생기는 경우",async()=>{
        await request(app)
            .post('/recruitments')
            .send({
                "companyId":3,
                "position":"ad",
                "reward":100000000,
                "content":"zxscs",
                "skil":"scc"
            })
            .expect(500);
    });
});


describe("채용 공고 수정",()=>{

    test("정상일 경우",async()=>{
        await request(app)
            .patch('/recruitments/20')
            .send({
                "companyId":2,
                "position":"ad",
                "reward":100000000,
                "content":"zxscs",
                "skil":"saacc"
            })
            .expect(200)
            .expect({  message: "채용공고를 수정하였습니다." });
    });

    test("변경할 내용이 DB와 동일한 경우",async()=>{
        await request(app)
            .patch('/recruitments/20')
            .send({
                "companyId":2,
                "position":"ad",
                "reward":100000000,
                "content":"zxscs",
                "skil":"saacc"
            })
            .expect(200)
            .expect({  message: "채용공고를 수정하였습니다." });
    });

    test("Id가 없는 경우",async()=>{
        const urlPath = '/recruitment/7';
        const httpMethod = 'PATCH'
        await request(app)
            .patch(urlPath)
            .send({
                "companyId":2,
                "position":"ad",
                "reward":100000000,
                "content":"zxscs",
                "skil":"saacc"
            })
            .expect(404)
            .expect({  message: `${httpMethod} ${urlPath} 주소가 없습니다.` });
    });

    test("DB 동작 중 문제생기는 경우",async()=>{
        await request(app)
            .patch('/recruitments/7')
            .send({
                "companyId":3,
                "position":"ad",
                "reward":"hfgjfhjg",
                "content":"zxscs",
                "skil":"scc"
            })
            .expect(500);
    });

});


describe("채용 공고 삭제",()=>{

    test("정상일 경우",async()=>{
        await request(app)
            .delete('/recruitments/150')
            .expect(200)
            .expect({  message: "채용공고를 삭제하였습니다." });
    });

    test("Id가 없는 경우",async()=>{
        const urlPath = '/recruitment/7';
        const httpMethod = 'DELETE'
        await request(app)
            .delete(urlPath)
            .expect(404)
            .expect({  message: `${httpMethod} ${urlPath} 주소가 없습니다.` });
    });

    test("DB 동작 중 문제생기는 경우",async()=>{
        await request(app)
            .delete('/recruitments/qweqwe')
            .expect(500);
    });

});

describe("채용 공고 목록",()=>{

    test("정상일 경우",async()=>{
        await request(app)
            .get('/recruitments/')
            .expect(200);
    });

    test("검색 정상일 경우",async()=>{
        await request(app)
            .get('/recruitments/')
            .query({search:"123"})
            .expect(200);
    });

    test("검색했는데 DB에 없는 경우",async()=>{
        await request(app)
            .get('/recruitments/')
            .query({search:"121123123"})
            .expect(404);
    });

});

describe("채용 공고 상세페이지",()=>{

    test("정상일 경우",async()=>{
        await request(app)
            .get('/recruitments/40')
            .expect(200);
    });

    test("Id가 없는 경우",async()=>{
        await request(app)
            .get('/recruitments/1')
            .expect(404);
    });



});