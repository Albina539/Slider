import PitchContent from "../components/custom/PitchContent";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { firebaseDb } from "./../../config/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { GeminiAIModel } from "./../../config/FirebaseConfig";
import { SPEECH_PROMPT } from "../prompts";

const Pitch = () => {
  const { projectId } = useParams();
  const [speech, setSpeech] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const formatContent = (slide: any) => {
    if (Array.isArray(slide.content)) {
      return slide.content.join("\n");
    }
    if (typeof slide.content === "string") {
      return slide.content;
    }
    if (slide.outline) {
      return slide.outline;
    }
    return "";
  };

  useEffect(() => {
    const generateSpeech = async () => {
      if (!projectId) return;
      setLoading(true);

      try {
        const docRef = doc(firebaseDb, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setLoading(false);
          return;
        }

        const data = docSnap.data();

        if (data.speech) {
          setSpeech(data.speech);
          setLoading(false);
          return;
        }

        const contentData = data.content || [];
        if (contentData.length === 0) {
          setLoading(false);
          return;
        }

        const presentationContent = contentData
          .map((slide: any, i: number) => {
            const contentText = formatContent(slide);

            return `Слайд ${slide.slideNo || i + 1}: "${slide.slideTitle || slide.slidePoint}"
                    Цель: ${slide.objective || "Не указана"}
                    Содержание: ${contentText}`;
          })
          .join("\n\n");

        const style = data.designStyle || "Professional";

        let prompt = SPEECH_PROMPT;
        prompt = prompt.replace("{PRESENTATION_CONTENT}", presentationContent);
        prompt = prompt.replace("{STYLE}", style);

        console.log("Промпт для Gemini:", prompt);

        const result = await GeminiAIModel.generateContent(prompt);
        const generatedSpeech = result.response.text();

        setSpeech(generatedSpeech);

        await updateDoc(docRef, {
          speech: generatedSpeech,
        });
      } catch (error) {
        console.error("Ошибка при генерации речи:", error);
      } finally {
        setLoading(false);
      }
    };

    generateSpeech();
  }, [projectId]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1 w-full mx-auto md:px-25 px-8 py-8 flex flex-col">
        <PitchContent speech={speech} loading={loading} />
      </main>
    </div>
  );
};

export default Pitch;
