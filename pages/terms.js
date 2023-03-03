import React from 'react';
import styles from '../styles/terms.module.css';

export default function Terms() {
	return (
		<div className={styles['main']}>
			<nav>
				<img
					src={'/images/logo.png'}
					className={styles['logo']}
					onClick={() => {
						window.location.href = '/';
					}}
				/>
			</nav>
			<section>
				<h1>RESERVATION POLICIES</h1>
				<h2>TERMS AND CONDITIONS</h2>
				<p>
					Thank you for choosing Gatun Sportfishing services that
					Subsequently, it will be called the{' '}
					<strong>OPERATING AGENT</strong>. By having access to the
					different digital platforms on the internet of the{' '}
					<strong>AGENT OPERATOR</strong>, accepts these terms and
					conditions, therefore that you should review them carefully
					before proceeding. In case of that the <strong>USER</strong>{' '}
					does not agree with our terms and conditions, you must
					immediately discontinue use and not continue contact with
					the <strong>OPERATING AGENT</strong>. Terms and conditions
					set forth in this document are subject to change without
					prior notice.
				</p>
				<h2>RESERVATION POLICIES</h2>
				<p>
					The rates and availability shown on gatunsportfishing.com,
					or in any digital platform of the{' '}
					<strong>OPERATING AGENT</strong> they can change without
					notice. Once <strong>THE USER</strong> makes his reservation
					must make the payment immediately to be respected prices.
					Once <strong>THE USER</strong> complies with the payment,
					will proceed to supply the data required by the system to
					generate your confirmation number. If you want to change or
					cancel your reservation, you must contact us 24 hours prior
					to the date of your reservation to the number{' '}
					<a href="tel:+50769482285">+507 6948-2285</a> or by email{' '}
					<a href="mailto:gatunsportfishing@gmail.com">
						gatunsportfishing@gmail.com
					</a>{' '}
					with your number reservation. Any modification of your
					reservation may suffer changes in prices and availability.
				</p>
				<h2>PAYMENT POLICIES</h2>
				<p>
					At the time of booking a charge will be charged relative to
					the expenses of preparing the service you will receive,
					which will be charged to the credit card you provide. All
					our prices are in US dollars. Users from countries with
					other currencies may have variations in the rate of
					conversion with your bank.
				</p>
				<h2>GENERAL CANCELLATION POLICIES</h2>
				<p>
					Withholding for cancellation will be the full amount of the
					reservation without exceptions.
				</p>
				<h2>OUR CLIMATE CANCELLATION POLICIES</h2>
				<p>
					We do not cancel trips until the day of the reservation, you
					must show up at the port regardless of conditions weather
					conditions, unless he is contacted by us indicating any
					changes related to affectations climatic.
				</p>
				<h2>DISCLAIMER OF LIABILITY</h2>
				<p>
					Gatun Sportfishing is not responsible for any damage, loss
					or damage caused to the user or their belongings during the
					provision of the services for which they were hired. At all
					times you must abide by the rules of safety established by
					the captain and the same is not done responsible for any
					illegal act carried out by the users.
				</p>
				<h2>USER OBLIGATIONS</h2>
				<p>
					At all times the user must follow the safety regulations set
					by the captain. It is the responsibility of the passengers:
				</p>
				<ol>
					<li>Wearing the lifejacket at all times</li>
					<li>Keep your hands inside the pot</li>
					<li>Don't jump into the water</li>
					<li>Do not carry a firearm</li>
				</ol>
				<p>
					It is important that for your safety people are not accepted
					in ethyl state, said this if it is checked or the captain
					has an indication of this has the authorization not to allow
					the boarding of the passenger to avoid any type of incident
					during the service or if during the service the user
					performs activities that put you in danger, you will return
					to the departure marina and will stop the service.
				</p>
				<h2>HIGH STANDARDS OF CLEANING</h2>
				<p>
					Derived from the COVID-19 pandemic that has affected the
					world, have implemented safety and hygiene protocols with
					the objective of providing you with a quality service and a
					vacation safe, this is why passengers at all times must
					abide by the hygiene and safety regulations established by
					the captain in accordance with the provisions of the
					Ministry of Health of Panama.
				</p>
				<h2>RECOMMENDATIONS</h2>
				<h3>TIP TO THE CAPTAIN:</h3>
				<p>
					Our mission is to make you and your group enjoy your tours
					and your fishing day, that is why we provide care customized
					by highly trained captains and with the experience necessary
					to make it so. If the service and company was to your
					liking, it is recommended that you leave a tip of according
					to your discretion. It is appreciated it is in cash and
					directly to the person who is caring for them.
				</p>
				<h2>IMPORTANT INFORMATION YOU SHOULD KNOW</h2>
				<p>
					It is important to know our fishing and safety policy. At
					all times all the people who are inside the boat They must
					do what the Captain indicates, since it is the person expert
					on the subject. It should be noted that captain does not
					guarantee fishing (it depends on the season and the
					requirements of government entities charged with creating
					standards for this type of activity).{' '}
				</p>
				<p>
					It is important that the user who make the reservation of
					knowledge of these policies to the people invited by him,
					according to the maximum capacity indicated in the security
					policies. The captain will take care to provide all the
					necessary tools or equipment so that your fishing tour is
					unforgettable. It is important to know that our policy is
					ENVIRONMENTALLY FRIENDLY, that is why a Once captured, any
					specimen must be released immediately to its natural
					habitat. At all times during your trip you can request the
					captain to return to port for any reason not attributable to
					the captain, who must immediately proceed with the request.
				</p>
				<p>
					The monies paid will not be refundable in these cases. At
					all times, passengers must maintain a good behavior inside
					the boat, any damage attributable to the teams or the boat
					by this, it will be your responsibility and will have to pay
					the value of the damage according to the value current
					market. You must have the knowledge of the dangers involved
					in taking a fishing tour, this is why so the captain is not
					responsible for any fact fortuitous that may arise during
					the service.
				</p>
			</section>
		</div>
	);
}
