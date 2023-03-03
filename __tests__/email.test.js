import { Email } from '../services/email';
test.skip('Send email', async () => {
    const email = new Email();
    const success = await email.send({
        to: process.env.TEST_EMAIL_ADDRESS,
        subject: 'test',
        body: '<h1>Hello world</h1>'
    });

    expect(success).toBe(true);
});
