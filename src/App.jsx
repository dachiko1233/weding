import Hero from "./components/Hero.jsx";
import Invitation from "./components/Invitation.jsx";
import BigDay from "./components/BigDay.jsx";
import Location from "./components/Location.jsx";
import Rsvp from "./components/Rsvp.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero />
      <Invitation />
      <BigDay />
      <Location />
      <Rsvp />
      <Footer />
    </main>
  );
}
