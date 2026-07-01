interface RightContentProps {
  htmlPresentation: string;
}

const RightContent = ({ htmlPresentation }: RightContentProps) => {
  // Добавляем адаптивные стили к презентации
  const enhancedPresentation = htmlPresentation.replace(
    "</head>",
    `
      <style>
      body {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 1200px) {

        .title-slide {
          min-height: 100vh;}

        body {
          gap: 40px;
        }
          h1 { font-size: 38px !important; }
          h2 { font-size: 24px; }
          li { font-size: 20px; }
          .slide {
            padding: 20px;
          }
        }

        /* Адаптивные стили для мобильных */
        @media (max-width: 768px) {
        .title-slide {
          min-height: 70vh;}
          .slide {
            padding: 20px;
            height: auto;
            
          }
          .text, .image {
            width: 100%;
            height: auto;
          }
          .image {
            height: 40vh;
            min-height: 200px;               
            flex: 1;
            min-width: 0;
          }
          h1 { font-size: 28px !important; }
          h2 { font-size: 22px; }
          li { font-size: 16px; }
        }
        @media (max-width: 480px) {
        .title-slide {
          min-height: 60vh;}
          .slide { padding: 12px; gap: 20px;}
          h1 { font-size: 22px !important;; }
          h2 { font-size: 14px; }
          li { font-size: 12px; }
          .image {
            height: 40vh;
            min-height: 200px;               
            flex: 1;
            min-width: 0;
          }
        }
      </style>
    </head>
    `,
  );

  return (
    <div className="w-full relative" style={{ paddingBottom: "56.25%" }}>
      <iframe
        srcDoc={enhancedPresentation}
        className="absolute top-0 left-0 w-full h-full border-0"
        sandbox="allow-scripts"
        title="Презентация"
      />
    </div>
  );
};

export default RightContent;
