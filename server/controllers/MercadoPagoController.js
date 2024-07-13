import { MercadoPagoConfig, Preference } from 'mercadopago';
import 'dotenv/config';

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });
console.log(client)

class PaymentController {
    static createPreference(precio) {
        const preference = new Preference(client);
        return preference.create({
            body: {
              items: [
                {
                  title: 'Compra en Mi Tienda',
                  quantity: 1,
                  unit_price: precio
                }
              ],
              back_urls: {
                success: "http://localhost:8000"
              }
            }
          })
    }
}

export { PaymentController };