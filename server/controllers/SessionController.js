class Session {
    static init(req) {
        if (!req.session.cart) {
            req.session.cart = [];
        } 
        return req.session.cart;
    } 

    static addItem(req, item) {
        this.init(req);
        req.session.cart.push(item);
        return req.session.cart;
    }

    static subtractItem(req, item) {
        this.init(req);
        req.session.cart.pop(item);
        return req.session.cart;
    }

    static subtractWithStock(req, item, stock) {
        this.init(req);
        let arrayProducts = this.getCart(req);
        for (let i = 0; i < stock; i++) {
            let index = arrayProducts.findIndex((element) => element === item);
            arrayProducts.splice(index, 1)
        }
        return req.session.cart;
    }

    static getCart(req) {
        this.init(req);
        return req.session.cart;
    }

    static calcTotal(req) {
        this.init(req);
        let total = req.session.cart.reduce(function (acumulador, producto) { return acumulador + producto.precio; }, 0);
        return total;
    }
}

export { Session }