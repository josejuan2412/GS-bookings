import axios from 'axios';
export class Paypal {
    constructor() {
        this.host = `${process.env.PAYPAL_HOST}/v2`;
        this.client = axios.create({
            auth: {
                username: process.env.PAYPAL_CLIENT_ID, //This could be your email
                password: process.env.PAYPAL_SECRET_ID,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async getOrder(id) {
        try {
            const { data } = await this.client.get(
                `${this.host}/checkout/orders/${id}`
            );
            const response = data;
            const { status, purchase_units, payer } = response;
            const { reference_id, amount, description, custom_id } = purchase_units[0];
            return {
                id,
                status,
                amount: parseFloat(amount?.value),
                currency: amount?.currency_code,
                type: reference_id,
                description,
                email: payer?.email_address,
                name: payer?.name?.given_name,
                lastName: payer?.name?.surname,
                date: custom_id
            };
        } catch (err) {
            const { name } = err.response.data;
            throw new Error(name);
        }
    }
}
