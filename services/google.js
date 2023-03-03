const { google } = require('googleapis');
const { decrypt } = require('./encryption');
const {
	FIREBASE_PRIVATE_KEY,
	GOOGLE_PRIVATE_KEY,
} = require('../utils/constants/index');
const admin = require('firebase-admin');
const sheets = google.sheets('v4');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const collectionName =
	process.env.APP_ENV === 'production' ? 'bookings' : 'bookings_dev';
const sheetPrefix = process.env.APP_ENV === 'production' ? 'Trips' : 'Dev';

const serviceAccount = {
	type: 'service_account',
	project_id: process.env.FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	private_key: decrypt(FIREBASE_PRIVATE_KEY),
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

try {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
} catch (e) {
	console.error();
}

export class GoogleSheet {
	constructor() {
		this.auth = new google.auth.GoogleAuth({
			scopes: SCOPES,
			credentials: {
				client_email: process.env.GOOGLE_CLIENT_EMAIL,
				private_key: decrypt(GOOGLE_PRIVATE_KEY),
			},
		});
	}

	async getAuthToken() {
		return await this.auth.getClient();
	}

	async getSpreadSheet() {
		const spreadsheetId = process.env.GOOGLE_SHEET_ID;
		const authToken = await this.getAuthToken();
		const res = await sheets.spreadsheets.get({
			spreadsheetId,
			auth: authToken,
		});
		return res?.data;
	}

	async getRows() {
		const authToken = await this.getAuthToken();
		const spreadsheetId = process.env.GOOGLE_SHEET_ID;
		const res = await sheets.spreadsheets.values.get({
			spreadsheetId,
			auth: authToken,
			range: sheetPrefix,
		});
		return res?.data?.values.filter((row) => {
			return row.filter((c) => c).length > 1;
		});
	}

	async getBookings() {
		return (await this.getRows())
			.map((row) => {
				return {
					id: row[0],
					type: row[1],
					price: row[2],
					retention: row[3],
					comision: row[4],
					date: row[5],
					name: row[6],
					lastName: row[7],
					email: row[8],
					order: row[9],
					createTime: row[10],
					status: row[11],
					handler: row[12],
				};
			})
			.filter((b, i) => i > 1);
	}

	async getTripByID(id) {
		const rows = await this.getRows();
		rows.shift();
		if (!id.length) {
			return [];
		}
		for (const row of rows) {
			if (`${row[0]}` === id) {
				return row;
			}
		}
		return [];
	}

	async addTrip({
		id,
		type,
		price,
		retention,
		comision,
		name,
		lastName,
		email,
		phone,
		date,
		order,
	}) {
		const authToken = await this.getAuthToken();
		const spreadsheetId = process.env.GOOGLE_SHEET_ID;
		const createTime = new Date();

		phone = formatPhoneNumber(phone);

		const values = [
			[
				id,
				type,
				price.toFixed(2),
				retention.toFixed(2),
				comision.toFixed(2),
				date,
				name,
				lastName,
				email,
				phone,
				order,
				`${createTime.getFullYear()}-${
					createTime.getMonth() + 1
				}-${createTime.getDate()}`,
			],
		];
		const resource = {
			majorDimension: 'ROWS',
			values,
		};
		const rows = await this.getRows();
		const nextRowIndex = rows.length + 1;
		const range = `${sheetPrefix}!A${nextRowIndex}`;
		const res = await sheets.spreadsheets.values.append({
			spreadsheetId,
			auth: authToken,
			range,
			valueInputOption: 'USER_ENTERED',
			insertDataOption: 'INSERT_ROWS',
			resource,
		});
		// res.data
		return {
			id,
			type,
			price,
			retention,
			comision,
			name,
			lastName,
			email,
			phone,
			date,
			order,
		};
	}

	async format() {
		const authToken = await this.getAuthToken();
		const spreadsheetId = process.env.GOOGLE_SHEET_ID;
		const sheetId = `${sheetPrefix}!F`; // <--- Please set the sheet ID of "MySheet".
		const resource = {
			auth: authToken,
			spreadsheetId,
			resource: {
				requests: [
					{
						repeatCell: {
							range: {
								sheetId: sheetId,
								startRowIndex: 3,
							},
							cell: {
								userEnteredFormat: {
									numberFormat: {
										pattern: 'dd/mm/yyyy',
										type: 'DATE',
									},
									horizontalAlignment: 'CENTER', // <--- Added
								},
							},
							fields: 'userEnteredFormat',
						},
					},
				],
			},
		};
		await sheets.spreadsheets.batchUpdate(resource);
	}
}

export class Firebase {
	constructor() {
		this.db = admin.firestore();
	}

	async getBookings({ start, end }) {
		const bookings = [];
		const snapshot =
			start && end
				? await this.db
						.collection(collectionName)
						.where('date', '<=', end)
						.where('date', '>=', start)
						.get()
				: await this.db.collection(collectionName).get();
		snapshot.forEach((doc) => {
			const {
				commission,
				retention,
				email,
				date,
				type,
				createdAt,
				price,
				lastName,
				name,
				reference,
			} = doc.data();
			bookings.push({
				id: doc.id,
				commission,
				retention,
				email,
				date: date.toDate(),
				type,
				createdAt: createdAt.toDate(),
				price,
				lastName,
				name,
				reference,
			});
		});
		return bookings;
	}

	async getBookingByReference(reference) {
		let booking = null;
		const snapshot = await this.db
			.collection(collectionName)
			.where('reference', '=', reference)
			.get();

		snapshot.forEach((doc) => {
			const {
				commission,
				retention,
				email,
				date,
				type,
				createdAt,
				price,
				lastName,
				name,
				reference,
			} = doc.data();
			booking = {
				id: doc.id,
				commission,
				retention,
				email,
				date: date.toDate(),
				type,
				createdAt: createdAt.toDate(),
				price,
				lastName,
				name,
				reference,
			};
		});
		return booking;
	}

	async createBooking({
		commission,
		retention,
		email,
		phone,
		date,
		type,
		createdAt,
		price,
		lastName,
		name,
		reference,
	}) {
		return await this.db.collection(collectionName).add({
			commission,
			retention,
			email,
			phone,
			date,
			type,
			createdAt,
			price,
			lastName,
			name,
			reference,
			paid: false,
		});
	}

	deleteAllBookings = async () => {
		const snapshot = await this.db.collection(collectionName).get();
		snapshot.docs.forEach((shot) => {
			shot.ref.delete();
		});
	};
}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		}
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
