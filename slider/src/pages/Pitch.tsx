import PitchContent from "../components/custom/PitchContent";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { firebaseDb } from "./../../config/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { GeminiAIModel } from "./../../config/FirebaseConfig";
import { SPEECH_PROMPT } from "../prompts"

const Pitch = () => {
  const { projectId } = useParams();
  const [speech, setSpeech] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<any[]>([]);

  useEffect(() => {
    if (projectId) loadProjectData();
  }, [projectId]);

  const loadProjectData = async () => {

      setLoading(true);

      const docRef = doc(firebaseDb, "projects", projectId!);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return;

      const data = docSnap.data();
      setContent(data.content || []);

      if (data.speech) {
        setSpeech(data.speech);
      } else if (data.content && data.content.length > 0) {
        generateSpeech(data.content);
      }

      setLoading(false);

  };

  const generateSpeech = async (contentData: any[]) => {

      setLoading(true);
      const presentationContent = contentData.map((slide, i) =>
        `Слайд ${slide.slideNo || i+1}: "${slide.slideTitle || slide.slidePoint}"
         Цель: ${slide.objective || "Не указана"}
         Содержание: ${slide.content ? slide.content.join("\n") : ""}`
      ).join("\n\n");

      let prompt = SPEECH_PROMPT;
      prompt = prompt.replace("{PRESENTATION_CONTENT}", presentationContent);
      console.log(prompt);

      const result = await GeminiAIModel.generateContent(prompt);
      const generatedSpeech = result.response.text();

      setSpeech(generatedSpeech);

      await updateDoc(doc(firebaseDb, "projects", projectId!), {
        speech: generatedSpeech
      });

      setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1 w-full mx-auto md:px-25 px-8 py-8 flex flex-col">
        <PitchContent speech={speech} loading={loading} />
      </main>
    </div>
  );
};

export default Pitch;