import { useState } from "react";
import stars from "../assets/background-stars.svg";
import mascot from "../assets/logo.svg";
import ColorStyle from "../components/custom/ColorStyle";
import FontStyle from "../components/custom/FontStyle";
import FormFooter from "../components/custom/FormFooter";
import SlidersStyle from "../components/custom/SlidersStyle";
import type { FontStyleType, SlidersStyleType } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { firebaseDb, GeminiAIModel } from "./../../config/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { SLIDES_PROMPT } from "../prompts";

const ProjectOutline = () => {
  const { projectId } = useParams();
  const [style, setStyle] = useState<SlidersStyleType>("Professional");
  const [colorPrimary, setColorPrimary] = useState<string>("");
  const [colorSecondary, setColorSecondary] = useState<string>("");
  const [font, setFont] = useState<FontStyleType>("TimesNewRoman");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const GenerateSlides = async () => {
    if (!projectId) return;

    setLoading(true);

    try {
      const docRef = doc(firebaseDb, "projects", projectId);
      await updateDoc(docRef, {
        designStyle: style,
        font: font,
        colorPrimary: colorPrimary,
        colorSecondary: colorSecondary,
      });
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (!data) {
        console.error("Проект не найден");
        return;
      }

      const presentationData = {
        presentationTitle: data.presentationTitle || "Презентация",
        slides: (data.content || []).map((item: any, index: number) => ({
          slideNo: index + 1,
          slideTitle:
            item.slidePoint || item.slideTitle || `Слайд ${index + 1}`,
          outline: item.content
            ? [item.content]
            : item.outline
              ? [item.outline]
              : ["Пункт"],
        })),
      };

      const prompt = SLIDES_PROMPT.replace(
        "{PRESENTATION_JSON}",
        JSON.stringify(presentationData, null, 2),
      )
        .replace("{DESIGN_STYLE}", style)
        .replace("{COLOR_PRIMARY}", colorPrimary || "#1a1a1a")
        .replace("{COLOR_SECONDARY}", colorSecondary || "#22c55e")
        .replace("{FONT}", font);

      const result = await GeminiAIModel.generateContent(prompt);
      const htmlCode = result.response
        .text()
        .replace(/```html/g, "")
        .replace(/```/g, "")
        .trim();

      await updateDoc(docRef, {
        htmlPresentation: htmlCode,
      });

      navigate("/workspace/project/" + projectId + "/finish");
    } catch (error) {
      console.error("Ошибка при генерации презентации:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1 w-full mx-auto md:px-15 lg:px-25 px-8 py-8">
        <div className="relative w-full md:mb-30 mb-15 md:my-25 my-15">
          <img
            src={stars}
            alt="Stars background"
            className="absolute left-1/2 -translate-x-1/2 md:-top-5 -top-3"
            width={1100}
          />
          <div className="flex flex-col items-center relative z-10">
            <h1 className="text-slider-green md:text-5xl text-3xl max-sm:text-2xl text-center">
              <div>
                <span>Теперь выбери параметры </span>
                <div className="inline-block">
                  <img src={mascot} alt="logo" className="md:w-25 w-10" />
                  <span className="line-through">персонажа</span>
                </div>
              </div>

              <span className="text-slider-dark"> презентации</span>
            </h1>
          </div>
        </div>

        <form className="space-y-50" onSubmit={(e) => e.preventDefault()}>
          <SlidersStyle selectedStyle={style} setStyle={setStyle} />
          <FontStyle font={font} setFont={setFont} />
          <ColorStyle
            colorPrimary={colorPrimary}
            colorSecondary={colorSecondary}
            setColorPrimary={setColorPrimary}
            setColorSecondary={setColorSecondary}
          />
          <FormFooter onClick={GenerateSlides} loading={loading} />
        </form>
      </main>
    </div>
  );
};

export default ProjectOutline;
