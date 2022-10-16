const {sequelize} = require('../models');
const app = require('../app');
const  request  = require('supertest');


beforeAll(async () => {
    await sequelize.sync();
});
afterAll(async()=>{
    await sequelize.close();
})

describe("채용 공고 지원",()=>{

    test("정상일 경우",async()=>{
        await request(app)
            .post('/users/1/apply')
            .send({
                "recruitmentId":2
            })
            .expect(201)
            .expect({  message: "채용공고에 지원하였습니다." });
    });

    test("지원했던 채용공고 지원한 경우",async()=>{
        await request(app)
            .post('/users/1/apply')
            .send({
                "recruitmentId":2
            })
            .expect(200)
            .expect({  message: "지원했던 채용공고입니다." });
    });

    test("채용공고 Id가 없는 경우",async()=>{
        await request(app)
            .post('/users/1/apply')
            .expect(400)
            .expect({  message: "Bad Request" });
    });

    test("유저 Id가 없는 경우",async()=>{
        const urlPath = '/users/4/apply';
        const httpMethod = 'POST'
        await request(app)
            .post(urlPath)
            .send({
                "recruitmentId":170
            })
            .expect(500);
    });

});