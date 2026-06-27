import Header from "../components/custom/Header";
import PitchContent from "../components/custom/PitchContent";

const Pitch = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 w-full mx-auto md:px-25 px-8 py-8 flex flex-col">
        <PitchContent />
      </main>
    </div>
  );
};

export default Pitch;
