// Import the required libraries
const chai = require('chai');
const chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

const app = require('../index'); 

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Users", () => {
    describe("GET /", () => {
        // Test to get all users
        it("should get 200 res", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

describe("Users", () => {
    describe("GET api/user", () => {
        // Test to get all users
        it("should get 200 res", (done) => {
            chai.request(app)
                .get('/api/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});