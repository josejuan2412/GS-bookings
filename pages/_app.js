import App from 'next/app';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import '../styles/globals.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

function MyApp({ Component, pageProps, clientId }) {
	return (
		<PayPalScriptProvider options={{ 'client-id': clientId }}>
			<Component {...pageProps} />
		</PayPalScriptProvider>
	);
}

MyApp.getInitialProps = async (appContext) => {
	const appProps = await App.getInitialProps(appContext);
	const result = {
		...appProps,
	};
	const clientId = process.env.PAYPAL_CLIENT_ID;
	result.clientId = clientId;
	return result;
};

export default MyApp;
