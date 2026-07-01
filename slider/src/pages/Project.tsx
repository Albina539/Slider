import ProjectContent from "../components/custom/ProjectContent";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { firebaseDb } from "./../../config/FirebaseConfig";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import pptxgen from "pptxgenjs";

const Project = () => {
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const GetProjectDetail = async () => {
      if (!projectId) return;

      try {
        const docRef = doc(firebaseDb, "projects", projectId!);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.error("Проект не найден");
          setLoading(false);
          return;
        }

        const data = docSnap.data();
        setProjectDetail(data);
      } catch (error) {
        console.error("Ошибка при загрузке проекта:", error);
      } finally {
        setLoading(false);
      }
    };
    GetProjectDetail();
  }, [projectId]);

  const exportToPPTX = () => {
    if (!projectDetail?.htmlPresentation) {
      console.warn("Нет презентации для экспорта");
      return;
    }

    setExporting(true);

    try {
      const pres = new pptxgen();
      pres.defineLayout({ name: "WIDE", width: 13.33, height: 7.5 });
      pres.layout = "WIDE";

      const colorPrimary = projectDetail.colorPrimary || "#1a1a1a";
      const font = projectDetail.font || "Inter";
      const htmlPresentation = projectDetail.htmlPresentation;

      const slideRegex = /<section class="slide[^>]*>([\s\S]*?)<\/section>/g;
      let match;
      const slides = [];

      while ((match = slideRegex.exec(htmlPresentation)) !== null) {
        slides.push(match[1]);
      }

      if (slides.length === 0) {
        const altRegex =
          /<div[^>]*class="[^"]*slide[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
        while ((match = altRegex.exec(htmlPresentation)) !== null) {
          slides.push(match[1]);
        }
      }

      slides.forEach((slideContent, index) => {
        const slide = pres.addSlide();

        let slideBgColor = "FFFFFF";
        let textColor = "363636";

        const isDark =
          colorPrimary === "#1a1a1a" ||
          colorPrimary === "black" ||
          colorPrimary === "темный" ||
          colorPrimary === "#000000";

        if (isDark) {
          slideBgColor = "363636";
          textColor = "FFFFFF";
        } else {
          slideBgColor = "F5F5F5";
          textColor = "363636";
        }

        if (
          colorPrimary &&
          colorPrimary !== "#1a1a1a" &&
          colorPrimary !== "black"
        ) {
          const hexMatch = colorPrimary.match(/#([0-9a-f]{6})/i);
          if (hexMatch) {
            slideBgColor = hexMatch[1].toUpperCase();
            const r = parseInt(slideBgColor.substring(0, 2), 16);
            const g = parseInt(slideBgColor.substring(2, 4), 16);
            const b = parseInt(slideBgColor.substring(4, 6), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            textColor = brightness > 128 ? "363636" : "FFFFFF";
          }
        }

        slide.background = { color: slideBgColor };

        let title = `Слайд ${index + 1}`;
        const titleMatch = slideContent.match(/<h[12][^>]*>([^<]*)<\/h[12]>/);
        if (titleMatch) {
          title = titleMatch[1].trim();
        } else {
          const anyTitle = slideContent.match(/<[^>]*>([^<]*)<\/[^>]*>/);
          if (anyTitle && anyTitle[1].trim().length > 0) {
            title = anyTitle[1].trim();
          }
        }

        slide.addText(title, {
          x: 0.5,
          y: 0.5,
          w: 12.33,
          h: 1.2,
          fontSize: 32,
          fontFace: font || "Arial",
          bold: true,
          color: textColor,
          align: "center",
        });

        const items = [];
        const itemMatches = slideContent.matchAll(/<li[^>]*>([^<]*)<\/li>/g);
        for (const item of itemMatches) {
          const text = item[1].trim();
          if (text.length > 0) {
            items.push(text);
          }
        }

        if (items.length === 0) {
          const pMatches = slideContent.matchAll(/<p[^>]*>([^<]*)<\/p>/g);
          for (const p of pMatches) {
            const text = p[1].trim();
            if (text.length > 0) {
              items.push(text);
            }
          }
        }

        if (items.length > 0) {
          const text = items.map((item, i) => `${i + 1}. ${item}`).join("\n");
          slide.addText(text, {
            x: 0.5,
            y: 2.0,
            w: 12.33,
            h: 4.5,
            fontSize: 18,
            fontFace: font || "Arial",
            color: textColor,
            align: "left",
            valign: "top",
            lineSpacing: 28,
          });
        }
      });

      const fileName = `${projectDetail?.userInputPrompt || "presentation"}.pptx`;
      pres.writeFile({ fileName });
    } catch (error) {
      console.error("Ошибка при экспорте в PPTX:", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1 w-full mx-auto md:px-25 px-8 py-8 flex flex-col">
        <ProjectContent
          projectDetail={projectDetail}
          loading={loading}
          onExport={exportToPPTX}
          exporting={exporting}
        />
      </main>
    </div>
  );
};

export default Project;
