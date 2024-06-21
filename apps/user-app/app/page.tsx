"use client";
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