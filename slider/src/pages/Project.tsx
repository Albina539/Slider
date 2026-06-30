import { GeminiAIModel } from "./../../config/FirebaseConfig";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { firebaseDb } from "./../../config/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import pptxgen from "pptxgenjs"
import SlidersStyle from "../components/custom/SlidersStyle";
import FontStyle from "../components/custom/FontStyle";
import ColorStyle from "../components/custom/ColorStyle";

import { SLIDES_PROMPT } from "../prompts";

const Project = () => {
  const { projectId } = useParams();

  const [projectDetail, setProjectDetail] = useState<any>(null);
  const [content, setContent] = useState<any[]>([]);
  const [htmlPresentation, setHtmlPresentation] = useState<string>("");

  const [designStyle, setDesignStyle] = useState("Professional");
  const [font, setFont] = useState("Inter");
  const [colorPrimary, setColorPrimary] = useState("#1a1a1a");
  const [colorSecondary, setColorSecondary] = useState("#22c55e");

  useEffect(() => {
    if (projectId) GetProjectDetail();
  }, [projectId]);

  const GetProjectDetail = async () => {

      const docRef = doc(firebaseDb, "projects", projectId!);
      const docSnap = await getDoc(docRef);

      const data = docSnap.data();

      setProjectDetail(data);
      setContent(data.content || []);

      const presentationData = {
          presentationTitle: data.userInputPrompt || "Презентация",
          slides: data.content.map((item: any, index: number) => ({
            slideNo: index + 1,
            slideTitle: item.slidePoint || item.slideTitle || `Слайд ${index + 1}`,
            outline: item.content ? [item.content] : item.outline ? [item.outline] : ["Пункт"]
          }))
        };

      if (data.designStyle) setDesignStyle(data.designStyle);
      if (data.font) setFont(data.font);
      if (data.colorPrimary) setColorPrimary(data.colorPrimary);
      if (data.colorSecondary) setColorSecondary(data.colorSecondary);

      if (data.content && data.content.length > 0) {
          GenerateHTMLPresentation(
            data.colorPrimary,
            data.font,
            data.designStyle,
            data.colorSecondary,
            presentationData
          );
      }
  };

  const GenerateHTMLPresentation = async ( colorPrimary, font, designStyle, colorSecondary, presentationData) => {

        let prompt = SLIDES_PROMPT;
        let htmlCode = "";

        prompt = prompt
          .replace("{PRESENTATION_JSON}", JSON.stringify(presentationData, null, 2))
          .replace("{DESIGN_STYLE}", designStyle)
          .replace("{COLOR_PRIMARY}", colorPrimary)
          .replace("{COLOR_SECONDARY}", colorSecondary)
          .replace("{FONT}", font);

        console.log(prompt);

        const result = await GeminiAIModel.generateContent(prompt);
        htmlCode = result.response.text().replace(/```html/g, '').replace(/```/g, '').trim();
        setHtmlPresentation(htmlCode);
        await updateDoc(doc(firebaseDb, "projects", projectId!), { htmlPresentation: htmlCode });
};

  const exportToPPTX = () => {

      const pres = new pptxgen();

      pres.defineLayout({ name: 'WIDE', width: 13.33, height: 7.5 });
      pres.layout = 'WIDE';

      const slideRegex = /<section class="slide[^>]*>([\s\S]*?)<\/section>/g;
      let match;
      let slideIndex = 0;
      const slides = [];

      while ((match = slideRegex.exec(htmlPresentation)) !== null) {
        slides.push(match[1]);
      }

      if (slides.length === 0) {
        const altRegex = /<div[^>]*class="[^"]*slide[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
        while ((match = altRegex.exec(htmlPresentation)) !== null) {
          slides.push(match[1]);
        }
      }

      slides.forEach((slideContent, index) => {
        const slide = pres.addSlide();

        const isDark = colorPrimary === '#1a1a1a' ||
                       colorPrimary === 'black' ||
                       colorPrimary === 'темный' ||
                       colorPrimary === '#000000';

        let bgColor = 'FFFFFF';
        let textColor = '363636';

        if (isDark) {
          bgColor = '363636';
          textColor = 'FFFFFF';
        } else {
          bgColor = 'F5F5F5';
          textColor = '363636';
        }

        if (colorPrimary && colorPrimary !== '#1a1a1a' && colorPrimary !== 'black') {
          const hexMatch = colorPrimary.match(/#([0-9a-f]{6})/i);
          if (hexMatch) {
            bgColor = hexMatch[1].toUpperCase();
            const r = parseInt(bgColor.substr(0,2), 16);
            const g = parseInt(bgColor.substr(2,2), 16);
            const b = parseInt(bgColor.substr(4,2), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            textColor = brightness > 128 ? '363636' : 'FFFFFF';
          }
        }

        slide.background = { color: bgColor };

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
          fontFace: font || 'Arial',
          bold: true,
          color: textColor,
          align: 'center'
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
          const text = items.map((item, i) => `${i+1}. ${item}`).join('\n');
          slide.addText(text, {
            x: 0.5,
            y: 2.0,
            w: 12.33,
            h: 4.5,
            fontSize: 18,
            fontFace: font || 'Arial',
            color: textColor,
            align: 'left',
            valign: 'top',
            lineSpacing: 28
          });
        }
      });

      const fileName = `${projectDetail?.userInputPrompt || 'presentation'}.pptx`;
      pres.writeFile({ fileName });
  }
};

  return (
    <div className="min-h-screen bg-white">
      {htmlPresentation ? (
        <>
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={exportToPPTX}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Скачать PPTX
            </button>
          </div>

          {/* Презентация */}
          <div
            className="w-full min-h-screen"
            dangerouslySetInnerHTML={{ __html: htmlPresentation }}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slider-green border-t-transparent mx-auto mb-4"></div>
            <p className="text-white text-xl">Генерация презентации...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;