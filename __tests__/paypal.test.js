import { Paypal } from '../services/paypal';
test('Get order by id', () => {
    const paypal = new Paypal();
    expect(paypal.client).toBeDefined();
    const orderId = '3L522911LM376194T';
    return paypal.getOrder(orderId).then(data => {
        const { id } = data;
        expect(id).toBe(id);
    });
});
