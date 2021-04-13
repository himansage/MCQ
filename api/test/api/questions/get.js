const supertest = require('supertest');
const db = require('../../../src/db');
const app = require('../../../src/app');
const chai = require('chai');
const expect = chai.expect;

describe('GET /questions', function () {
    before(() => {
        return db.connect()
    });
    after(() => {
        return db.close();
    })
    it('should get list of questions', function () {
        return supertest(app)
            .get('/questions')
            .expect(200)
            .then((response) => {
                // Check the response type
                expect(response.body).to.be.an.instanceOf(Array);
            });
    })
});

describe('GET /questions/byTitle/:title', function () {
    before(() => {
        return db.connect()
    });
    after(() => {
        return db.close();
    })
    describe('with invalid title', () => {
        it('should respond with 404', () => {
            return supertest(app)
                .get('/questions/byTitle/Sample')
                .expect(404);
        });
    });
});