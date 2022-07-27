import request from "supertest";
import server from "../../index.js";

let ser;

describe("/api/commissions", () => {

    beforeEach(async () => {
        ser = server;
        await clear();
    });

    afterEach(async () => {
        ser.close();
    });
    const clear = async () => {
        return await request(ser).post("/clear");
    }
    const exec = async () => {
        return await request(ser)
            .post("/api/commissions")
            .send([{
                    "date": "2022-07-19",
                    "user_id": 1,
                    "user_type": "natural",
                    "type": "cash_out",
                    "operation": {
                        "amount": 500.00,
                        "currency": "EUR"
                    }
                },
                {
                    "date": "2022-07-20",
                    "user_id": 1,
                    "user_type": "natural",
                    "type": "cash_out",
                    "operation": {
                        "amount": 600.00,
                        "currency": "EUR"
                    }
                },
                {
                    "date": "2022-07-21",
                    "user_id": 1,
                    "user_type": "natural",
                    "type": "cash_out",
                    "operation": {
                        "amount": 100.00,
                        "currency": "EUR"
                    }
                }
            ]);
    };

    it("should return 200 if request sent", async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });

    it("should return array of objects", async () => {
        const res = await exec();
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(3);
    });

    it("should return array of objects with correct properties", async () => {
        const res = await exec();
        expect(res.body[0]).toBe("0.00");
        expect(res.body[1]).toBe("0.30");
        expect(res.body[2]).toBe("0.30");
    });
})