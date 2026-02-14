const request=require("supertest");
const app=require("../server");
const {expect}=require("chai");

describe("user routing",()=>{
    it("get"),async()=>{
        const res=await request(app).get("/users");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    };

    it("post",async()=>{
        const res=await request(app).post("/users");
        expect(res.status).to.equal(201);
    });
});