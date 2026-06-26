
interface Slide {
  id: number;        // обязательное поле
  title: string;     // обязательное поле
  content?: string;  // необязательное
}

const RightContent = ({ slides }: { slides: Slide[] }) => {
  const colors = [
    "hsla(299, 100%, 83%, 1)",
    "hsla(124, 100%, 59%, 1)",
    "hsla(26, 100%, 50%, 1)",
  ];

  return (
    <div className="h-full bg-white rounded-lg p-6 flex flex-col gap-3">
      {slides.map((slide, index) => (
        <div
          key={slide.id}  // ← используем id из данных
          className="flex-1 rounded-md p-4"
          style={{
            backgroundColor: colors[index % colors.length],
          }}
        />
      ))}
    </div>
  );
};

export default RightContent;