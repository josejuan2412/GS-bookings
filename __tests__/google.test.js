import { GoogleSheet, Firebase } from '../services/google';

test.skip('Get Auth Token', () => {
    const googleSheet = new GoogleSheet();
    return googleSheet.getAuthToken().then(data => {
        expect(data).toBeDefined();
    });
});

test.skip('Get spread sheet', () => {
    const googleSheet = new GoogleSheet();
    return googleSheet.getSpreadSheet().then(spreadSheet => {
        const { sheets } = spreadSheet;
        expect(sheets.length).toBeGreaterThan(0);
    });
});

test.skip('Get spread sheet rows', () => {
    const googleSheet = new GoogleSheet();
    return googleSheet.getRows().then(rows => {
        expect(rows.length).toBeGreaterThan(0);
    });
});

test.skip('Get trip by id', () => {
    const googleSheet = new GoogleSheet();
    return googleSheet.getTripByID('123').then(row => {
        expect(row.length).toBeGreaterThan(0);
    });
});

test.skip('Get unique id', () => {
    const googleSheet = new GoogleSheet();
    return googleSheet.getUniqueId().then(id => {
        expect(id.length).toBeGreaterThan(0);
    });
});


test.skip('Add trip', () => {
    const googleSheet = new GoogleSheet();
    const trip = {
        type: 'online-full-day',
        price: 399,
        retention: 94.25,
        comision: 59.85,
        name: 'John',
        lastName: 'Doe',
        email: 'jdoe@example.com',
        date: new Date('2021-06-21T00:00:00'),
        order: '1111111',
        status: 'paid'
    }

    return googleSheet.addTrip(trip).then(row => {
        console.log(`ROW`)
        console.log(row)
        expect(row).toBeDefined();
        // expect(row.length).toBeGreaterThan(0);
    });
});

test.skip('Format Table', () => {
    const googleSheet = new GoogleSheet();
    return googleSheet.format().then(row => {
        expect(true).toBe(true);
    });
});

test.skip('Get bookings from firebase', async () => {
    const firebase = new Firebase();
    const bookings = firebase.getBookings();
    expect(bookings).toEqual([]);
});

test.only('Get bookings from firebase with id', async () => {
    const firebase = new Firebase();
    const id = '5NW30407CJ931074U';
    const booking = await firebase.getBooking(id);
    console.log(`Booking`);
    console.log(booking);
    expect(booking).not.toBe(null);
}) 

