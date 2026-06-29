import ProjectContent from "../components/custom/ProjectContent";
import { GeminiAIModel } from "./../../config/FirebaseConfig";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { firebaseDb } from "./../../config/FirebaseConfig";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

const OUTLINE_PROMPT =
  'Generate a PowerPoint slide outline for the topic {userInput}. Create {userSlides} in total. Each slide should include a topic name and a 2-line descriptive outline that clearly explains what content the slide will cover. Include the following structure: The first slide should be a Welcome screen. The second slide should be an Agenda screen. The final screen should be a Thank you screen. Return the response only in JSON format, following this schema: [ { "slideNo": "", "slidePoint": "", "outline": ""}]';

type Project = {
  userInputPrompt: string;
  projectId: string;
  createdAt: string;
  userSlides: string;
  outline: Outline[];
};

type Outline = {
  slideNo: string;
  slidePoint: string;
  outline: string;
};

const Project = () => {
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState<Project | null>();
  const [loading, setLoading] = useState(false);
  const [outline, setOutline] = useState<Outline[]>();

  const GenerateOutline = async (projectData: Project) => {
    setLoading(true);

    const prompt = OUTLINE_PROMPT.replace(
      "{userInput}",
      projectData?.userInputPrompt,
    ).replace("{userSlides}", projectData?.userSlides);

    const result = await GeminiAIModel.generateContent(prompt);

    const response = result.response;
    const text = response.text();
    console.log(text);
    const rawJson = text.replace("```json", "").replace("```", "");
    const JSONData = JSON.parse(rawJson);
    setOutline(JSONData);

    setLoading(false);
  };

  useEffect(() => {
    const GetProjectDetail = async () => {
      const docRef = doc(firebaseDb, "projects", projectId ?? "");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return;
      }
      console.log(docSnap.data());
      setProjectDetail(docSnap.data() as Project);
      if (!docSnap.data()?.outline) {
        GenerateOutline(docSnap.data() as Project);
      }
    };
    GetProjectDetail();
  }, [projectId]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1 w-full mx-auto md:px-25 px-8 py-8 flex flex-col">
        <ProjectContent loading={loading} />
      </main>
    </div>
  );
};

export default Project;
