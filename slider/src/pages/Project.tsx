import Header from "../components/custom/Header";
import ProjectContent from "../components/custom/ProjectContent";
import { GeminiAIModel, GeminiAILiveModel } from "./../../config/FirebaseConfig";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { firebaseDb } from "./../../config/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const OUTLINE_PROMPT = 'Generate a PowerPoint slide outline for the topic {userInput}. Create {userSlides} in total. Each slide should include a topic name and a 2-line descriptive outline that clearly explains what content the slide will cover. Include the following structure: The first slide should be a Welcome screen. The second slide should be an Agenda screen. The final screen should be a Thank you screen. Return the response only in JSON format, following this schema: [ { "slideNo": "", "slidePoint": "", "outline": ""}]';

const SLIDER_PROMPT = `Ты — профессиональный дизайнер презентаций.
Создай детальное описание слайдов на основе метаданных.

Стиль дизайна: {DESIGN_STYLE}
Цветовая схема: {COLORS_CODE}

Метаданные первого слайда:
{METADATA}

Для каждого слайда сгенерируй:
- Заголовок слайда
- Полный текст (максимум 6-7 строк)
- Рекомендации по визуализации
- Ключевые слова для изображений

Верни ответ строго в JSON формате:
[{
  "slideNo": number,
  "slidePoint": string,
  "content": string,
  "visualSuggestion": string,
  "imageKeywords": string
}]`;

type Project = {
    userInputPrompt: string;
    projectId: string;
    createdAt: string;
    userSlides: string;
    outline?: Outline[];
    slides?: any[];
    designStyle?: { designGuide: string; colors: any };
};

type Outline = {
    slideNo: string;
    slidePoint: string;
    outline: string;
};

const Project = () => {
    const { projectId } = useParams();
    const [projectDetail, setProjectDetail] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);
    const [outline, setOutline] = useState<Outline[]>([]);
    const [slides, setSlides] = useState<any[]>([]);

    useEffect(() => {
        if (projectId) GetProjectDetail();
    }, [projectId]);

    useEffect(() => {
        if (!projectDetail) return;

        if (!projectDetail.outline?.length) {
            GenerateOutline(projectDetail);
        } else if (!projectDetail.slides || projectDetail.slides.length === 0) {
            GenerateSlides();
        } else {
            setSlides(projectDetail.slides);
        }
    }, [projectDetail]);

    const GetProjectDetail = async () => {
        try {
            setLoading(true);
            const docRef = doc(firebaseDb, "projects", projectId!);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) return;

            const data = docSnap.data() as Project;
            setProjectDetail(data);
            setOutline(data.outline || []);
        } catch (error) {
            console.error("Ошибка загрузки проекта:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveToFirestore = async (updateData: any) => {
        if (!projectId) return;
        try {
            const docRef = doc(firebaseDb, "projects", projectId);
            await updateDoc(docRef, updateData);
        } catch (error) {
            console.error("Ошибка сохранения в Firestore:", error);
        }
    };

    const GenerateOutline = async (projectData: Project) => {
        const USE_STUB = true;

        if (USE_STUB) {
            const stubOutline: Outline[] = [
                { slideNo: "1", slidePoint: "Welcome", outline: "Приветственный слайд" },
                { slideNo: "2", slidePoint: "Agenda", outline: "Структура презентации" },
                { slideNo: "3", slidePoint: "Основная часть", outline: "Ключевые тезисы" },
                { slideNo: "4", slidePoint: "Результаты", outline: "Достигнутые результаты" },
                { slideNo: "5", slidePoint: "Thank You", outline: "Заключительный слайд" },
            ];

            setOutline(stubOutline);
            setProjectDetail(prev => prev ? { ...prev, outline: stubOutline } : null);
            await saveToFirestore({ outline: stubOutline });
            return;
        }

        setLoading(true);
        try {
            const prompt = OUTLINE_PROMPT
                .replace('{userInput}', projectData.userInputPrompt)
                .replace('{userSlides}', projectData.userSlides);

            const result = await GeminiAIModel.generateContent(prompt);
            const text = result.response.text();
            const rawJson = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            const JSONData: Outline[] = JSON.parse(rawJson);

            setOutline(JSONData);
            setProjectDetail(prev => prev ? { ...prev, outline: JSONData } : null);
            await saveToFirestore({ outline: JSONData });
        } catch (error) {
            console.error("GenerateOutline error:", error);
        } finally {
            setLoading(false);
        }
    };

    const GenerateSlides = async () => {
        if (!projectDetail?.outline?.length) return;

        setLoading(true);
        const USE_STUB = true;

        try {
            let finalSlides: any[] = [];

            if (USE_STUB) {
                finalSlides = projectDetail.outline.map((item: any, index: number) => ({
                    id: index + 1,
                    slideNo: index + 1,
                    slidePoint: item.slidePoint,
                    content: `${item.slidePoint}\n\n${item.outline}`,
                    visualSuggestion: "Минималистичный современный дизайн",
                    imageKeywords: "business, technology, abstract"
                }));
            } else {
                // Реальная генерация через Gemini Live
                const prompt = SLIDER_PROMPT
                    .replace('{DESIGN_STYLE}', projectDetail.designStyle?.designGuide ?? 'Modern corporate style')
                    .replace('{COLORS_CODE}', JSON.stringify(projectDetail.designStyle?.colors ?? {}))
                    .replace('{METADATA}', JSON.stringify(projectDetail.outline[0]));

                const session = await GeminiAILiveModel.connect();
                session.send(prompt);

                let text = "";
                for await (const message of session.receive()) {
                    if (message.type === "serverContent") {
                        const parts = message.modelTurn?.parts || [];
                        text += parts.map((part: any) => part.text).join("");

                        if (message.turnComplete) {
                            const cleanText = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
                            finalSlides = JSON.parse(cleanText);
                        }
                    }
                }
            }

            setSlides(finalSlides);
            setProjectDetail(prev => prev ? { ...prev, slides: finalSlides } : null);
            await saveToFirestore({ slides: finalSlides });

        } catch (error) {
            console.error("GenerateSlides error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-black">
            <Header />
            <main className="flex-1 w-full mx-auto md:px-25 px-8 py-8 flex flex-col">
                <ProjectContent loading={loading} slides={slides} />
            </main>
        </div>
    );
};

export default Project;