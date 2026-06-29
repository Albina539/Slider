import stars from "../../assets/background-stars.svg";
import { ArrowBigUpDash, Loader } from "pixelarticons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDb, GeminiAIModel } from "./../../../config/FirebaseConfig";
import { auth } from "./../../../config/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { CONTENT_PROMPT } from "../../prompts";
import type { Presentation } from "../../types";

const PromptBox = () => {
  const [text, setText] = useState<string>("");
  const [slides, setSlides] = useState<string>("4 to 6");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const generateContent = async (prompt: string, slidesCount: string) => {
    const fullPrompt = CONTENT_PROMPT.replace("{userInput}", prompt).replace(
      "{userSlides}",
      slidesCount,
    );

    console.log(fullPrompt);

    const result = await GeminiAIModel.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    console.log("Gemini: ", text);

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const JSONData = JSON.parse(cleanText);
    return JSONData;
  };

  const createAndSaveProject = async () => {
    setLoading(true);
    try {
      const projectId = uuid4();

      const projectData = {
        projectId: projectId,
        userInputPrompt: text,
        userSlides: slides,
        createdBy: user?.displayName || user?.email || "Anonymous",
        content: null,
        createdAt: new Date(),
      };
      const docRef = doc(firebaseDb, "projects", projectId);
      await setDoc(docRef, projectData);
      console.log("Проект успешно сохранен!");
      const presentation: Presentation = await generateContent(text, slides);

      await updateDoc(docRef, {
        content: presentation.slides,
        presentationTitle: presentation.presentationTitle,
      });
      navigate("/workspace/project/" + projectId + "/content");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center text-center mb-12 md:my-25 my-15">
      <div className="relative w-full md:mb-30 mb-15">
        <img
          src={stars}
          alt="Stars background"
          className="absolute left-1/2 -translate-x-1/2 md:-top-10 -top-3"
          width={1100}
        />
        <div className="flex flex-col items-center relative z-10">
          <h1
            className="text-slider-green md:text-5xl text-3xl max-sm:text-2xl text-center"
            id="gide"
          >
            Вставь свой текст, а Slider начнет играть
          </h1>
          <p className="text-center leading-none md:text-5xl text-3xl max-sm:text-2xl font-var2 text-white">
            Твой проект сохранится
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <InputGroup className="bg-white p-5 max-w-250">
          <InputGroupTextarea
            placeholder="Здесь мог быть твой текст..."
            className="text-black min-h-40"
            onChange={(e) => setText(e.target.value)}
          />
          <InputGroupAddon align={"block-end"}>
            <Select onValueChange={(value) => setSlides(value)}>
              <SelectTrigger className="w-50">
                <SelectValue placeholder="Слайды не выбраны" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Количество слайдов</SelectLabel>
                  <SelectItem value="4 to 6">4-6 слайдов</SelectItem>
                  <SelectItem value="6 to 8">6-8 слайдов</SelectItem>
                  <SelectItem value="8 to 12">8-12 слайдов</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <InputGroupButton
              className="ml-auto bg-slider-dark text-white h-12 w-12"
              onClick={() => createAndSaveProject()}
              disabled={!text}
            >
              {loading ? (
                <Loader
                  className="animate-spin"
                  style={{ width: "32px", height: "32px" }}
                />
              ) : (
                <ArrowBigUpDash style={{ width: "32px", height: "32px" }} />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
};

export default PromptBox;
