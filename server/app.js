import express from "express";
import path from 'path';
import 'dotenv/config';
import { PaymentController } from "./controllers/MercadoPagoController.js";

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/front'));

app.post("/realizarPago", async (req, res) => {
    console.log(req.body);
    let { precio } = req.body;
    PaymentController.createPreference(precio)
    .then(pref => res.json(pref.id))
});

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + process.env.PORT);
})