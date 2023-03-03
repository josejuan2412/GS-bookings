import React, { createContext, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Head from 'next/head';
import styles from '../../styles/Booking.module.css';
import { productPrices } from '../../utils/constants/index';

import { DayPickerSingleDateController } from 'react-dates';
import moment from 'moment';

const BookingContext = createContext({
	view: 'date',
	isCheckoutOpen: false,
});

export default function Booking() {
	const [view, setView] = useState('date');
	const [isAgreed, setIsAgreed] = useState(false);
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
	const [selectedDay, setSetSelectedDay] = useState(null);
	const [availableTrips, setAvailableTrips] = useState([]);
	const [selectedTripType, setSelectedTripType] = useState(
		availableTrips.length ? availableTrips[0] : null
	);
	const [startDate, setStartDate] = useState(
		moment().startOf('month').format('YYYY-MM-DD')
	);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');

	const fetcher = (url, start, end) =>
		fetch(`${url}?start=${start}&end=${end}`).then((r) => r.json());

	const { data, error } = useSWR(
		['/api/bookings', startDate, endDate],
		fetcher
	);

	const trips = new Map();
	if (!!data && Array.isArray(data)) {
		for (const trip of data) {
			trips.set(trip.day, trip.trips);
		}
	}

	return (
		<BookingContext.Provider
			value={{
				view,
				isCheckoutOpen,
				changeView: setView,
				setIsCheckoutOpen,
				startDate,
				setStartDate,
				endDate,
				trips,
				selectedDay,
				availableTrips,
				setSetSelectedDay,
				setAvailableTrips,
				selectedTripType,
				setSelectedTripType,
				firstName,
				setFirstName,
				lastName,
				setLastName,
				email,
				setEmail,
				phone,
				setPhone,
				isAgreed,
				setIsAgreed,
			}}
		>
			<div className={styles['body']}>
				<Head>
					<title>Gatun Sport Fishing</title>
					<meta
						name="description"
						content="Booking - Gatun Sport Fishing"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<nav>
					<img src={'/images/logo.png'} className={styles['logo']} />
					<div></div>
				</nav>
				<main>
					<div className={styles['content']}>
						<div className={styles['customer']}>
							<Information />
							<DatePicker />
							<LengthPicker />
						</div>
						<Confirmation />
					</div>
				</main>
			</div>
		</BookingContext.Provider>
	);
}

function Information() {
	const {
		firstName,
		setFirstName,
		lastName,
		setLastName,
		email,
		setEmail,
		phone,
		setPhone,
	} = useContext(BookingContext);
	return (
		<section className={styles['information']}>
			<div className={styles['title']}>
				<h2>Information</h2>
			</div>
			<div>
				<input
					type="text"
					minLength={1}
					value={firstName}
					placeholder="Name"
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<input
					type="text"
					minLength={1}
					value={lastName}
					placeholder={'Last Name'}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<input
					type="email"
					placeholder={'Email'}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="phone"
					placeholder={'Phone'}
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
			</div>
		</section>
	);
}

function DatePicker() {
	const {
		selectedDay,
		setStartDate,
		trips,
		setSetSelectedDay,
		setAvailableTrips,
		setSelectedTripType,
	} = useContext(BookingContext);
	const dateFormat = 'YYYY-MM-DD';
	const onMonthChange = (date) => {
		setStartDate(date.startOf('month').format(dateFormat));
	};
	const blockDayCallback = (day) => {
		const availableTrips = trips.get(day.format(dateFormat));
		return !availableTrips || !availableTrips.length;
	};
	const onDateChange = (day) => {
		const availableTrips = trips.get(day.format(dateFormat));
		if (blockDayCallback(day)) {
			return;
		}

		if (!selectedDay) {
			setSetSelectedDay(day);
			setAvailableTrips(availableTrips);
			setSelectedTripType(availableTrips[0]);
			return;
		}
		if (selectedDay.format(dateFormat) !== day.format(dateFormat)) {
			setSetSelectedDay(day);
			setAvailableTrips(availableTrips);
			setSelectedTripType(availableTrips[0]);
		}
	};
	return (
		<section className={styles['date']}>
			<div className={styles['title']}>
				<h2>Pick a date</h2>
			</div>
			<div>
				<DayPickerSingleDateController
					hideKeyboardShortcutsPanel={true}
					isDayBlocked={blockDayCallback}
					date={selectedDay}
					onDateChange={onDateChange}
					onPrevMonthClick={onMonthChange}
					onNextMonthClick={onMonthChange}
					numberOfMonths={1}
				/>
			</div>
		</section>
	);
}

function LengthPicker() {
	let { selectedTripType, setSelectedTripType, availableTrips } =
		useContext(BookingContext);

	if (!selectedTripType) {
		return null;
	}

	const onChange = (e) => {
		setSelectedTripType(e.currentTarget.value);
	};

	const trips = availableTrips.map((t, i) => {
		let name = '';
		let time = '';

		switch (t) {
			case 'full-day':
				name = 'Full Day';
				time = '6:00 AM - 4:00 PM';
				break;
			case 'half-day':
				name = 'Half day';
				time = '6:00 AM - 11:30 AM';
				break;
			case 'half-day-noon':
				name = 'Half day noon';
				time = '12:00 PM - 5:30 PM';
				break;
			default:
				return null;
		}

		return (
			<React.Fragment key={i}>
				<input
					id={t}
					key={i}
					value={t}
					name={t}
					type={'radio'}
					onChange={onChange}
					checked={t === selectedTripType}
				/>
				<label key={`label-for-${i}`} htmlFor={t}>
					<h3>{name}</h3>
					<span className={styles[`icon-${t}`]} />
					<small>{time}</small>
				</label>
			</React.Fragment>
		);
	});

	return (
		<section>
			<div className={styles['title']}>
				<h2>Choose Length</h2>
			</div>
			<div className={styles['length-picker']}>{trips}</div>
		</section>
	);
}

function Confirmation() {
	const { selectedTripType, firstName, lastName, email, phone, selectedDay } =
		useContext(BookingContext);
	const name = firstName && lastName ? `${firstName} ${lastName}` : null;
	const [product, setProduct] = useState(null);
	useEffect(() => {
		if (selectedTripType && selectedDay) {
			setProduct(getPaypalProduct(selectedTripType, selectedDay));
		}
	}, [selectedTripType, selectedDay, selectedDay]);

	let time = null;
	switch (selectedTripType) {
		case 'half-day-noon':
			time = '12:00 PM - 5:30 PM';
			break;
		case 'half-day':
			time = '6:00 AM - 11:30 AM';
			break;
		case 'full-day':
			time = '6:00 AM - 4:00 PM';
			break;
		default:
			time = null;
	}
	return (
		<div className={styles['confirmation']}>
			<div className={styles['wrapper']}>
				<div className={styles['title']}>
					<h2>Booking Details</h2>
				</div>
				<div className={styles['summary']}>
					<section className={styles['information']}>
						<h2>Information</h2>
						{name ? (
							<div>
								<h4>Name</h4>
								<span>{name}</span>
							</div>
						) : null}
						{validateEmail(email) ? (
							<div>
								<h4>Email</h4>
								<span>{email}</span>
							</div>
						) : null}
						{phone ? (
							<div>
								<h4>Phone</h4>
								<span>{formatPhoneNumber(phone)}</span>
							</div>
						) : null}
						{selectedDay ? (
							<div>
								<h4>Date</h4>
								<span>
									{selectedDay.format('MMM. D, YYYY')}
								</span>
							</div>
						) : null}
						{time ? (
							<div>
								<h4>
									Time <small>(GMT-5)</small>
								</h4>
								<span>{time}</span>
							</div>
						) : null}
					</section>
					{product ? (
						<section className={styles['charges']}>
							<h2>Charges</h2>
							<div>
								<h4>{product.name}</h4>
								<span>
									$
									{(product.balance + product.total).toFixed(
										2
									)}
								</span>
							</div>
							<div>
								<h4>Booking Fee</h4>
								<span>${product.total.toFixed(2)}</span>
							</div>
							<div>
								<h4>Pending Balance</h4>
								<span>${product.balance.toFixed(2)}</span>
							</div>
						</section>
					) : null}
					<Terms />
					<footer>
						<PayButton />
					</footer>
				</div>
			</div>
		</div>
	);
}

function Terms() {
	const {
		isAgreed,
		setIsAgreed,
		selectedTripType,
		firstName,
		lastName,
		email,
		selectedDay,
		phone,
	} = useContext(BookingContext);
	const [product, setProduct] = useState(null);
	useEffect(() => {
		setProduct(null);
		setTimeout(() => {
			if (selectedTripType && selectedDay) {
				setProduct(getPaypalProduct(selectedTripType, selectedDay));
			}
		}, 100);
	}, [selectedTripType, selectedDay, selectedDay]);
	if (
		!selectedTripType ||
		!firstName ||
		!lastName ||
		!email ||
		!phone ||
		!validateEmail(email) ||
		!selectedDay ||
		!product
	) {
		return null;
	}
	return (
		<section className={styles['terms']}>
			<div>
				<input
					type="checkbox"
					checked={isAgreed}
					name="agreed-terms-services"
					onChange={({ target }) => {
						setIsAgreed(target.checked);
					}}
				/>
				<label htmlFor="agreed-terms-services">
					By clicking the checkbox, I hereby:
				</label>
			</div>
			<ul>
				<li style={{marginBottom: 20}}>
					Agree and consent to the{' '}
					<Link href="/terms">
						<a target="_blank">Terms and Conditions</a>
					</Link>
				</li>
				<li>
					Our boats have a maximum capacity of 3 adults or 650 pounds
					in weight. You can also do a combination of:
					<ul style={{marginBottom: 8}}>
						<li>3 Adults</li>
						<li>2 Adults + 2 Kids</li>
						<li>1 Adult + 3 kids </li>
					</ul>
					If you want to bring more people to the trip, let us know
					via email so we can arrange a bigger vessel or multiple
					boats for you. Price change may apply.
				</li>
			</ul>
		</section>
	);
}

function formatPhoneNumber(phoneNumberString) {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3];
	}
	return null;
}

function PayButton() {
	const {
		selectedTripType,
		firstName,
		lastName,
		email,
		selectedDay,
		phone,
		isAgreed,
	} = useContext(BookingContext);
	const [succeeded, setSucceeded] = useState(false);
	const [paypalErrorMessage, setPaypalErrorMessage] = useState('');
	const [orderID, setOrderID] = useState(false);
	const [billingDetails, setBillingDetails] = useState('');
	const [product, setProduct] = useState(null);
	useEffect(() => {
		setProduct(null);
		setTimeout(() => {
			if (selectedTripType && selectedDay) {
				setProduct(getPaypalProduct(selectedTripType, selectedDay));
			}
		}, 100);
	}, [selectedTripType, selectedDay, selectedDay]);

	if (
		!selectedTripType ||
		!firstName ||
		!lastName ||
		!email ||
		!phone ||
		!validateEmail(email) ||
		!selectedDay ||
		!product ||
		!isAgreed
	) {
		return null;
	}

	const createOrder = (data, actions) => {
		return actions.order
			.create({
				purchase_units: [product.paypal],
				application_context: {
					shipping_preference: 'NO_SHIPPING',
					user_action: 'PAY_NOW',
					payment_method: {
						payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
					},
				},
			})
			.then((orderID) => {
				setOrderID(orderID);
				console.log(`ORDER ID: ${orderID}`);
				return orderID;
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const onCancel = (err) => {
		console.log(`The user cancels the order`);
		console.error(err);
	};

	// handles when a payment is confirmed for paypal
	const onApprove = (data, actions) => {
		return actions.order
			.capture()
			.then(function (details) {
				const { payer } = details;
				console.log(`The transaction was a success`);
				setBillingDetails(payer);
				setSucceeded(true);
			})
			.catch((err) => setPaypalErrorMessage('Something went wrong.'));
	};

	return succeeded && orderID ? (
		<CreateBookingButton order={orderID} />
	) : (
		<PayPalButtons
			style={{
				color: 'black',
				shape: 'rect',
				label: 'pay',
				tagline: false,
				layout: 'horizontal',
			}}
			createOrder={createOrder}
			onApprove={onApprove}
		/>
	);
}

function getPaypalProduct(type, selectedDay) {
	const products = {
		'half-day': {
			name: 'Half day',
			subtotal: productPrices['half-day'].subtotal,
			fee: productPrices['half-day'].fee,
			total: productPrices['half-day'].retention,
			balance: productPrices['half-day'].balance,
			paypal: {
				reference_id: 'half-day',
				custom_id: selectedDay.format('YYYY-MM-DD'),
				amount: {
					value: productPrices['half-day'].retention,
				},
				description: 'Half day trip',
				soft_descriptor: 'GSF - Half Day Trip',
			},
		},
		'half-day-noon': {
			name: 'Half day (Noon)',
			subtotal: productPrices['half-day-noon'].subtotal,
			fee: productPrices['half-day-noon'].fee,
			total: productPrices['half-day-noon'].retention,
			balance: productPrices['half-day-noon'].balance,
			paypal: {
				reference_id: 'half-day-noon',
				custom_id: selectedDay.format('YYYY-MM-DD'),
				amount: {
					value: productPrices['half-day-noon'].retention,
				},
				description: 'Half day trip (Noon)',
				soft_descriptor: 'GSF - Half Day Trip',
			},
		},
		'full-day': {
			name: 'Full day',
			subtotal: productPrices['full-day'].subtotal,
			fee: productPrices['full-day'].fee,
			total: productPrices['full-day'].retention,
			balance: productPrices['full-day'].balance,
			paypal: {
				reference_id: 'full-day',
				custom_id: selectedDay.format('YYYY-MM-DD'),
				amount: {
					value: productPrices['full-day'].retention,
				},
				description: 'Full day trip',
				soft_descriptor: 'GSF - Full Day Trip',
			},
		},
	};

	return products[type];
}

function CreateBookingButton({ order }) {
	const { firstName, lastName, email, phone } = useContext(BookingContext);
	const fetcher = (url) =>
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json; charset=UTF-8', // Indicates the content
			},
			body: JSON.stringify({
				name: firstName,
				lastName,
				email,
				phone,
			}),
		}).then((r) => r.json());

	const [isLoading, setIsLoading] = useState(true);
	const { data, error } = useSWR(`/api/bookings/${order}`, fetcher);
	useEffect(() => {
		if (data || error) {
			setIsLoading(false);
			if (data && data.url) {
				window.location.href = data.url;
			}
		}
	}, [data, error]);

	if (error) {
		return <div>{error.message}</div>;
	}

	return (
		<div>
			{isLoading ? (
				<b>Creating order please wait </b>
			) : (
				<b>Order completed</b>
			)}
		</div>
	);
}

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
