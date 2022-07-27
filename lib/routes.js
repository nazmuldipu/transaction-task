import {
    json
} from "express";
import CommissionCalulator from "./commission/commission-calculator.js";

export default function (app, users) {
    app.use(json());
    app.post("/api/commissions", (req, res) => {
        let resp = [];
        for (let i = 0; i < req.body.length; i++) {
            const transaction = req.body[i];
            resp.push(CommissionCalulator(users, transaction));
        }
        res.send(resp);
    });
    app.post("/clear", (req, res) => {
        users = []
        res.send({
            message: "Clear done"
        });
    });
};