import { Booking } from '../services/booking';
test.skip('Should return the same day', () => {
    const booking = new Booking();
    const start = new Date('2021-02-01');
    const end = new Date('2021-02-01');
    const days = booking.getDaysBetweenDates(start, end);
    expect(days).toBeDefined();
    expect(days.length).toBe(1);
});
test.skip('Should fail because the start date is in the future', () => {
    const booking = new Booking();
    const start = new Date('2021-02-14');
    const end = new Date('2021-02-01');
    expect(booking.getDaysBetweenDates(start, end)).toThrow(Error);
});

test.skip('Get days between date', () => {
    const booking = new Booking();
    const start = new Date('2021-02-01');
    const end = new Date('2021-02-03');
    const days = booking.getDaysBetweenDates(start, end);
    expect(days).toBeDefined();
    expect(days.length).toBe(3);
});

test.skip('Get booking dates', () => {
    const booking = new Booking();
    const start = new Date('2021-02-01T00:00:00');
    const end = new Date('2021-02-03T00:00:00');
    return booking.getBookingsBetweenDates(start, end).then(days => {
        expect(days).toBeDefined();
    });
});