import mjml2html from 'mjml';
import * as ejs from 'ejs';
const nodemailer = require('nodemailer');
import { productPrices } from '../utils/constants/index';
import { invoiceTemplate } from './email/templates';
import moment from 'moment';

export class Email {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PWD,
			},
		});
	}

	getBody({ order, name, email, phone, type, date }) {
		const product = productPrices[type];
		const { price, retention, balance, hour } = product;

		const properties = {
			order,
			name,
			email,
			phone,
			total: price,
			bookingFee: retention,
			balance,
			date: moment(date).format('MMM. D, YYYY'),
			hour,
			type: product['name']
		};
		return mjml2html(ejs.render(invoiceTemplate, properties)).html;
	}

	async send({ to, subject, body, attachments }) {
		const transporter = this.transporter;
		return new Promise((resolve, reject) => {
			const options = {
				from: process.env.EMAIL_USER,
				to,
				subject,
				html: body,
				attachments,
			};
			transporter.sendMail(options, (err) => {
				if (err) {
					reject(error);
					return;
				}
				resolve(true);
			});
		});
	}
}
