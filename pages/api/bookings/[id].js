const ics = require('ics');
import { Paypal } from '../../../services/paypal';
import { Booking } from '../../../services/booking';
import { Email } from '../../../services/email';
const paypal = new Paypal();
const book = new Booking();
const emailService = new Email();
export default async function handler(req, res) {
	try {
		switch (req.method) {
			case 'PUT':
				await updateBooking(req, res);
				return;
			default:
				res.status(404).send({
					error: 'Not found',
				});
		}
	} catch (e) {
		if (e.message === 'RESOURCE_NOT_FOUND') {
			res.status(404).send({ error: 'invalid order' });
			return;
		}
		res.status(500).send({ error: e.message });
		return;
	}
}

async function updateBooking(req, res) {
	/*
    Steps: 
    1. The order exist
    2. Confirm that the order do not exist in the records
        2.1 If exists return the redirect url
    3. Create the entry in the sheet
    4. Send an email notification
    5. Return the redirect url 
    */
	const { id } = req.query;
	const { name, lastName, email, phone } = req.body;
	const missingProperties = [];
	if (!name) {
		missingProperties.push('name');
	}
	if (!lastName) {
		missingProperties.push('lastName');
	}
	if (!email) {
		missingProperties.push('email');
	}
	if (!phone) {
		missingProperties.push('phone');
	}

	if (missingProperties.length) {
		throw new Error(
			`missing required property: ${missingProperties.join(', ')}`
		);
	}

	// 1. The order exist
	const { status, type, date } = await paypal.getOrder(id);
	if (status !== 'COMPLETED') {
		res.status(400).sent({ error: 'The requested order is incomplete' });
		return;
	}

	let booking = await book.getBookingByOrder(id);

	// 2. Confirm that the order do not exist in the records
	if (booking) {
		res.send({
			url: `/?success=true&order=${booking.id}`,
		});
		return;
	}

	// 3. Create the entry in the sheet
	booking = await book.create({
		type,
		name,
		lastName,
		email,
		phone,
		date,
		order: id,
	});

	try {
		// 1. Get email body
		const body = emailService.getBody({
			order: booking.id,
			name: `${name} ${lastName}`,
			email,
			phone,
			type,
			date,
		});
		// 2. Send email to the client
		await emailService.send({
			to: email,
			subject: 'Gatun Sport Fishing - Booking confirmed',
			body,
			attachments: {
				filename: 'reservation.ics',
				content: await createICS({
					title: `Gatun Sport Fishing Booking`,
					type,
					description: `Name: ${name} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nBooking Id: ${booking.id}`,
					date,
					attendees: [
						{
							name: `${name} ${lastName}`,
							email,
							rsvp: true,
							partstat: 'ACCEPTED',
							role: 'REQ-PARTICIPANT',
						},
					],
				}),
			},
		});
		// 3. Send email to Gerardo
		if(process.env.EMAIL_USER) {
			await emailService.send({
				to: process.env.EMAIL_USER,
				subject: 'Gatun Sport Fishing - Booking confirmed',
				body,
				attachments: {
					filename: 'reservation.ics',
					content: await createICS({
						title: `Gatun Sport Fishing Booking`,
						description: `Name: ${name} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nBooking Id: ${booking.id}`,
						type,
						date,
						attendees: [
							{
								name: `${name} ${lastName}`,
								email,
								rsvp: true,
								partstat: 'ACCEPTED',
								role: 'REQ-PARTICIPANT',
							},
						],
					}),
				},
			});
		}
		
	} catch (e) {
		console.error(e);
	}

	res.send({
		url: `/?success=true&order=${booking.id}`,
	});
}

async function createICS({ title, type, url, attendees, date, description }) {
	let start = date.split('-').map(parseFloat);
	let duration = {};
	switch (type) {
		case 'half-day':
			start = [...start, 11, 0];
			duration = { hours: 5, minutes: 30 };
			break;
		case 'half-day-noon':
			start = [...start, 17, 0];
			duration = { hours: 5, minutes: 30 };
			break;
		default:
			start = [...start, 11, 0];
			duration = { hours: 10, minutes: 0 };
			break;
	}
	return new Promise((resolve, reject) => {
		ics.createEvent(
			{
				title,
				description,
				start,
				startInputType: 'utc',
				startOutputType: 'utc',
				duration,
				url,
				organizer: {
					name: process.env.EMAIL_ORGANIZER_NAME,
					email: process.env.EMAIL_ORGANIZER_EMAIL,
				},
				attendees,
				geo: { lat: 9.191215, lon: -79.908054 },
				categories: ['fishing', 'charter', 'trip'],
				status: 'CONFIRMED',
				busyStatus: 'BUSY',
			},
			(error, value) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(Buffer.from(value, 'utf8'));
			}
		);
	});
}
