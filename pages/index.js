import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const { success, order } = router?.query;
    setTimeout(() => {
      if (success && order) {
        alert(
          [
            `Booking order created successfully:`,
            `- Booking Order: #${order}`,
            'Please check your email',
          ].join('\n')
        );
      }

      window.location.href = '/bookings';
    }, 1000);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Gatun Sport Fishing</title>
        <meta
          name="description"
          content="Gatun Sport Fishing - Panama"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src={'/images/logo.png'} />
      </main>
    </div>
  );
}
