export type FontStyleType =
  | "TimesNewRoman"
  | "Calibri"
  | "Arial"
  | "Helvetica"
  | "Roboto"
  | "Segoe UI";

export const SlidersStyleType = {
  PROFESSIONAL: "Professional",
  CREATIVE: "Creative",
  MODERN: "Modern",
  ELEGANT: "Elegant",
  STARTUP: "Startup pitch",
  MINIMAL: "Minimal",
} as const;

export type SlidersStyleType =
  (typeof SlidersStyleType)[keyof typeof SlidersStyleType];

export type Slide = {
  slideNo: number;
  slideTitle: string;
  content: string;
};

export type Presentation = {
  presentationTitle: string;
  slides: Slide[];
};
