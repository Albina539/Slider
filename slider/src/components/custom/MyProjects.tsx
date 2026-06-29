import { Calendar, Clock } from "pixelarticons/react";
import { CardContent, Card } from "../ui/card";
import { FileText } from "pixelarticons/react";
import { useNavigate } from "react-router-dom";

const MyProjects = () => {

  const navigate = useNavigate();
  const mockProjects = [
    { id: 1, title: "AI Agent", slides: 5, createdAt: "2 дня назад" },
    { id: 2, title: "AI Agent", slides: 5, createdAt: "2 дня назад" },
    { id: 3, title: "AI Agent", slides: 5, createdAt: "2 дня назад" },
  ];

  const handleProjectClick = (projectId: string) => {
    console.log('Navigating to project:', projectId);
    navigate(`/project/${projectId}`);
  };

  return (
    <section className="max-md:mt-20">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center justify-center text-black bg-slider-green md:px-8 md:py-3 px-6 py-2 md:text-3xl text-xl w-fit h-fit text-center">
          <h2 className="md:text-3xl text-2xl font-medium text-black">
            Мои проекты
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProjects.map((project) => (
          <Card key={project.id} className="bg-white cursor-pointer"
          onClick={() => handleProjectClick(project.id)}>
            <CardContent className="px-4">
              <div className="mb-3 text-orange-500">
                <FileText style={{ width: "56px", height: "56px" }} />
              </div>
              <h3 className="font-semibold text-2xl text-black">
                {project.title}
              </h3>
              <div className="flex flex-col text-xl text-slider-dark font-var2">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{project.slides} слайдов</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{project.createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MyProjects;
