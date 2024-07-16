import express from "express";
import path from 'path';
import 'dotenv/config';
import { PaymentController } from "./controllers/MercadoPagoController.js";
import session from "express-session";
import { Session } from "./controllers/SessionController.js";

const __dirname = path.resolve();

const app = express();

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: JSON.parse(process.env.SESSION_SECURE) } 
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/front'));

app.use((req, res, next) => {
    Session.init(req);
    next();
});

app.post("/realizarPago", async (req, res) => {
    let total = Session.calcTotal(req);
    console.log(total);
    console.log(req.session.cart.length);
    let querys = `?nombre=${encodeURIComponent(req.body.nombre)}&apellido=${encodeURIComponent(req.body.apellido)}&email=${encodeURIComponent(req.body.email)}&direc=${encodeURIComponent(req.body.ubicacion)}&tel=${encodeURIComponent(req.body.telefono)}`;
    let preference = await PaymentController.createPreference(total, querys);
    res.setHeader('Content-Type', 'application/json');
    return res.json(preference);
});

app.post("/addItem", (req, res) => {
    if (req.body.operador === "+") {
        Session.addItem(req, req.body);      
    } 
    
    if (req.body.operador === "-") {
        Session.subtractItem(req, req.body);
    } 
    
    if (req.body.operador === "0") {
        Session.subtractWithStock(req, req.body, req.body.stock);
    }
    
    return res.json({message: "Correct"});                                          
});

app.get("/reset", (req, res) => {
    req.session.cart = [];
    res.end();
})

app.get("/success", (req, res) => {
    
});

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + process.env.PORT);
})