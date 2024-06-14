const request = require('supertest');
const httpMocks = require('node-mocks-http');
const app = require("../index")
const Bar = require("../models/Bar")
const barController = require('../controllers/barController')
const db = require('../config/database')

describe('Testing bar crud', () => {

    beforeAll(async () => {
        await db.sync();
    })

    test('create bar', async () => {
        const barData = {
            "name": "Bar de Toto",
            "adresse": "7, rue de la nuit",
            "ville": "Nantes",
            "tel": "02457897542",
            "email": "bar@latruie.fr",
            "description": "super bar de nuit"
        }

        const res = await request(app)
            .post('/bars')
            .send(barData)
            .set('Accept', 'application/json')

        const bar = await Bar.findByPk(res.body.bar.id)

        expect(bar.name).toBe(barData.name)
        expect(res.body.bar.description).toBe("super bar de nuit")
        expect(res.status).toBe(201)
    });


    test("Delete Bar", async () => {
        const bar = await Bar.create({
            "name": "Bar de Totoro",
            "adresse": "7, rue de la nuit",
            "ville": "Nantes",
            "tel": "02457897542",
            "email": "bar@latruie.fr",
            "description": "super bar de nuit"
        })

        const res = await request(app)
            .delete(`/bars/${bar.id}`)

        const author_db = await Bar.findByPk(bar.id)

        expect(res.status).toBe(200)
        expect(author_db).toBe(null)

    })

    afterAll(async () => {
        await Bar.truncate();
    })

});


