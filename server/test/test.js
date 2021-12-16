const server = require('../index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Should get all recipes from a user', async () => {
    try {
        const response = await fetch(`http://localhost:5001/recipe/search`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6InJhbW9uIiwiaWF0IjoxNjM5MTA4NjU4LCJleHAiOjE2NzA2NDQ2NTh9.cw3dLwOks7rMl1i_UYOJM8ph0YfFx1Jl0k8EzLz2l1I'
            },
            mode: 'cors',
        });
        expect(response.StatusCode).toEqual(200);
        expect(response.type).toEqual('json');
        expect(response.body).toHaveProperty('Result');
    } catch(error) {
        throw error;
    }
})

describe('Should get a token for a given credentials', async() => {
    try {
        const response = await fetch(`http"//localhost:5001/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                body: `{
                    "email": "ramon",
                    "password": "123"
                }`
            }
        })
        expect(response.StatusCode).toEqual(200);
        expect(response.type).toEqual('json');
        expect(response.body).toHaveProperty('Result.token')
    }catch(error) {
        throw error;
    }
    
})