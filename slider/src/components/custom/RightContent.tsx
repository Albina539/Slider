interface Slide {
  id: number;
  title: string;
  content?: string;
}

const RightContent = ({ slides }: { slides: Slide[] }) => {
  return (
    <div className="h-full bg-white p-6 flex flex-col gap-3">
      {slides.map((slide) => (
        <div key={slide.id} className="flex-1 p-4 bg-gray-500" />
      ))}
    </div>
  );
};

export default RightContent;
