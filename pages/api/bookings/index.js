import { Paypal } from '../../../services/paypal';
import { Booking } from '../../../services/booking';
const paypal = new Paypal();
const booking = new Booking();

export default async function handler(req, res) {
	try {
		switch (req.method) {
			case 'POST':
				await createBooking(req, res);
				return;
			case 'GET':
				await getBookings(req, res);
				return;
			case 'DELETE':
				await deleteBookings(req, res);
				return;
			default:
				res.status(404).send({
					error: 'Not found',
				});
		}
	} catch (e) {
		res.status(500).send({ error: e.message });
		return;
	}
}

async function getBookings(req, res) {
	const { query } = req;
	let { start, end } = query;
	start = new Date(`${start}T00:00:00`);
	end = new Date(`${end}T00:00:00`);
	res.send(await booking.getBookingsBetweenDates(start, end));
}

async function createBooking(req, res) {
	/*
        1. Check if order is valid
        2. Check the status is completed
        3. Check if the booking is already made
        4. Get unique ID
        5. Add record to firebase
        6. Add record to google sheet
        7. Send Email to gerardo
    */
	const { id } = req.body;
	const order = await paypal.getOrder(id);
	res.send(order);
}

async function deleteBookings(req, res) {
	try {
		// await booking.reset();
		res.send({
			success: true,
		});
	} catch(e) {
		res.send({
			error: e.message
		})
	}
	
}
