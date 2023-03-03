import moment from 'moment';
import { Firebase, GoogleSheet } from './google';
import { productPrices } from '../utils/constants/index';
export class Booking {
	isinit = false;
	constructor() {
		this.googleSheet = new GoogleSheet();
		this.firebase = new Firebase();
	}
	async getBookingsBetweenDates(start, end) {
		const days = this.getDaysBetweenDates(start, end);
		const bookings = await this.getBookings(start, end);
		const daysMap = days.reduce((acc, day) => {
			let booking = bookings.get(day);
			let availability = new Set([
				'full-day',
				'half-day',
				'half-day-noon',
			]);
			// There are no booking for this day so we enable everything
			if (!booking) {
				acc.set(day, [...availability]);
				return acc;
			}

			const count = this.getCountOfTypes(booking);
			// Full booked
			if (count['full-day'] >= 2) {
				acc.set(day, []);
				return acc;
			}

			if (count['half-day'] >= 2 && count['half-day-noon'] >= 2) {
				acc.set(day, []);
				return acc;
			}

			if (count['half-day'] >= 2) {
				availability.delete('half-day');
				availability.delete('full-day');
			}

			if (count['half-day-noon'] >= 2) {
				availability.delete('half-day-noon');
				availability.delete('full-day');
			}

			if (
				count['full-day'] >= 1 &&
				(count['half-day'] == 1 || count['half-day-noon'] == 1)
			) {
				availability.delete('full-day');

				if (count['half-day'] == 1) {
					availability.delete('half-day');
				}
				if (count['half-day-noon'] == 1) {
					availability.delete('half-day-noon');
				}
			}

			acc.set(day, [...availability]);
			return acc;
		}, new Map());

		const response = [];
		const minimunDate = moment(new Date()).add(3, 'days');
		daysMap.forEach((trips, day) => {
			const isValidDate = moment(new Date(day), 'days').isAfter(
				minimunDate
			);
			if (!isValidDate) {
				trips = [];
			}

			response.push({
				day,
				trips,
			});
		});
		return response;
	}

	getCountOfTypes = (booking) => {
		return booking.reduce(
			(acc, type) => {
				acc[type] += 1;
				return acc;
			},
			{
				'full-day': 0,
				'half-day': 0,
				'half-day-noon': 0,
			}
		);
	};

	async getBookings(start, end) {
		return (
			await this.firebase.getBookings({
				start,
				end,
			})
		).reduce((acc, booking) => {
			let { date, type } = booking;
			const dateKey = moment(date).format('YYYY-MM-DD');
			if (!acc.get(dateKey)) {
				acc.set(dateKey, []);
			}
			const types = acc.get(dateKey);
			types.push(type);
			acc.set(dateKey, types);
			return acc;
		}, new Map());
	}

	async getBookingByOrder(order) {
		return await this.firebase.getBookingByReference(order);
	}

	async create({ type, name, lastName, email, phone, date, order }) {
		const { price, retention, comision } = productPrices[type];
		const { id } = await this.firebase.createBooking({
			commission: comision,
			retention,
			email,
			phone,
			date: new Date(`${date}T00:00:00`),
			type,
			createdAt: new Date(),
			price,
			lastName,
			name,
			reference: order,
		});

		const booking = await this.googleSheet.addTrip({
			id,
			type: `online-${type}`,
			price,
			retention,
			comision,
			name,
			lastName,
			email,
			phone,
			date,
			order,
		});
		return booking;
	}

	getDaysBetweenDates(start, end) {
		if (!start || !end) {
			throw new Error('One or more dates are not defined');
		}
		if (moment(start).isSame(end)) {
			return [moment(start).format('YYYY-MM-DD')];
		}

		if (moment(start).isAfter(end)) {
			throw new Error('Invalid date range');
		}

		const days = [moment(start).format('YYYY-MM-DD')];
		const diff = moment(end).diff(moment(start), 'days');
		for (let i = 0; i < diff; i++) {
			const date = new Date(
				moment(days[days.length - 1]).format('YYYY-MM-DD') + 'T00:00:00'
			);
			const dateStr = moment(date).add(1, 'days').format('YYYY-MM-DD');
			days.push(dateStr);
		}

		return days;
	}

	async reset() {
		await this.firebase.deleteAllBookings();
	}
}