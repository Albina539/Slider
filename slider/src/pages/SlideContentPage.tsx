import { useNavigate, useParams } from "react-router-dom";
import stars from "../assets/background-stars.svg";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../../config/FirebaseConfig";
import type { SlideContent } from "../types";
import { Skeleton } from "../components/ui/skeleton";
import SlideGrid from "../components/custom/SlideGrid";
import { Button } from "../components/ui/button";
import { ArrowRight, Loader } from "pixelarticons/react";

const SlideContentPage = () => {
  const { projectId } = useParams();
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setError("ID проекта не указан");
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(firebaseDb, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Проект не найден");
          setLoading(false);
          return;
        }
        const data = docSnap.data();

        if (data.content && data.content.length > 0) {
          setSlides(data.content);
        } else {
          setError("Презентация не найдена");
        }
      } catch (error) {
        console.error("Ошибка при загрузке: ", error);
        setError("Не удалось загрузить проект");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleOnUpdateOutline = (
    slideNo: string,
    value: Partial<SlideContent>,
  ) => {
    setSlides((prev) =>
      prev.map((item) =>
        item.slideNo === slideNo ? { ...item, ...value } : item,
      ),
    );
  };

  const handleSaveAndContinue = async () => {
    if (!projectId) return;
    setSaving(true);
    setError("");

    try {
      const docRef = doc(firebaseDb, "projects", projectId);
      await updateDoc(docRef, {
        content: slides,
      });
      navigate(`/workspace/project/${projectId}/outline`);
    } catch (error) {
      console.error("Ошибка при сохранении: ", error);
      setError("Не удалось сохранить изменения");
    } finally {
      setSaving(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <main className="flex-1 w-full mx-auto md:px-15 lg:px-25 px-8 py-8 flex items-center justify-center">
          <p className="text-red-500 text-xl">{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1 w-full mx-auto md:px-15 lg:px-25 px-8 py-8">
        <div className="relative w-full md:mb-30 mb-15 md:my-25 my-15">
          <img
            src={stars}
            alt="Stars background"
            className="absolute left-1/2 -translate-x-1/2 md:-top-10 -top-3"
            width={1100}
          />
          <div className="flex flex-col items-center relative z-10">
            <h1 className="text-slider-green md:text-6xl text-4xl max-sm:text-2xl text-center">
              Текст слайдов
            </h1>
            <p className="text-center leading-none md:text-5xl text-3xl max-sm:text-2xl font-var2 text-white">
              Проверяй пока не поздно
            </p>
          </div>
        </div>
        {loading ? (
          <div className="w-full">
            <div className="flex flex-col w-full max-w-6xl mx-auto gap-8 flex-1">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} className="h-15 w-full mb-4" />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-4xl mx-auto">
              <SlideGrid
                slides={slides}
                onUpdateOutline={handleOnUpdateOutline}
              />
            </div>

            <Button
              type="button"
              onClick={handleSaveAndContinue}
              className="flex items-center lg:px-8 md:px-6 px-4 py-4 bg-slider-green text-black font-medium lg:text-2xl md:text-xl text-lg h-14 cursor-pointer"
            >
              {saving ? (
                <div className="flex gap-2">
                  <Loader
                    className="animate-spin"
                    style={{ width: "32px", height: "32px" }}
                  />
                  <span>Сохраняем...</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <span>Далее</span>
                  <ArrowRight style={{ width: "36px", height: "36px" }} />
                </div>
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SlideContentPage;
