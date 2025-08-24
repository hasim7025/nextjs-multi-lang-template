"use client";

import React from "react";
import Header from "../../components/Common/Header";

const Home = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LodgingBusiness',
            name: 'website',
            description: 'website',
            url: 'https://website.app',
            image: 'https://website.app/banner.webp',
            telephone: '+43 123 456789', // Update with real phone if available
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Sample Street 1', // Update with real address
              addressLocality: 'Sample Town', // Update with real locality
              postalCode: '12345', // Update with real postal code
              addressCountry: 'AT',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '47.1234', // Update with real latitude
              longitude: '11.5678', // Update with real longitude
            },
            sameAs: [
              // Add social profiles if available
            ],
          }),
        }}
      />
      <header>
        <Header />
      </header>
      {/* <main>
        <section id="banner">
          <Banner />
        </section>
      </main>
      <footer>
        <Footer />
      </footer> */}
    </>
  );
};

export default Home;
