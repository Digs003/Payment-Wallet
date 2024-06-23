"use client";
import { useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import HomeScreen from "../components/HomeScreen";
import { PrimaryFeatures } from "../components/AboutSection";
import { Team } from "../components/TeamsSection";
import { ReviewSection } from "../components/ReviewSection";
import { Footer } from "../components/Footer";
import { CTA } from "../components/CTA";
import { Header } from "../components/Header";

export default function Page() {
  const { user } = useUser();

  useEffect(() => {
    // Assuming user data is fully loaded and exists
    if (user) {
      // Prepare the data for insertion
      const userData = {
        email : user.emailAddresses[0]?.emailAddress,
        name : user.username,
        number : user.phoneNumbers[0]?.phoneNumber,
      };

      // API call to insertUser endpoint
      fetch('/api/insertUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      .then(response => response.json())
      .then(data => console.log('User inserted:', data))
      .catch(error => console.error('Error inserting user:', error));
    }
  }, [user]); // Re-run effect if user data changes

  return (
    <div className="overflow-x-hidden">
      <Header session={user} />
      <HomeScreen session={user} />
      <PrimaryFeatures />
      <Team />
      <ReviewSection />
      <CTA session={user} />
      <Footer />
    </div>
  );
}