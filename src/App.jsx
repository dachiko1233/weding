import Invitation from "./components/Invitation.jsx";
import BigDay from "./components/BigDay.jsx";
import Location from "./components/Location.jsx";
import DressCode from "./components/DressCode.jsx";
import Rsvp from "./components/Rsvp.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <main className="">
      <Invitation />
      <BigDay />
      <Location />
      <DressCode />
      <Rsvp />
      <Footer />
    </main>
  );
}
