import { MercadoPagoConfig, Preference } from 'mercadopago';
import 'dotenv/config';

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

class PaymentController {
    static async createPreference(precio, querys) {
      try {
        const initPreference = new Preference(client)
        let preference = await initPreference.create({
            body: {
              items: [
                {
                  title: 'Compra en Mi Tienda',
                  quantity: 1,
                  unit_price: precio
                }
              ],
              back_urls: {
                success: "http://localhost:8000/success" + querys
              }
            }
          })
        return preference;
      }catch(err) {
        console.log(err);
      }
    }
}

export { PaymentController };