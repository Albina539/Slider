import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, FileText, Calendar, Clock, Send, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const mockProjects = [
  { id: 1, title: 'AI Agent', slides: 5, createdAt: '2 дня назад' },
  { id: 2, title: 'AI Agent', slides: 5, createdAt: '2 дня назад' },
  { id: 3, title: 'AI Agent', slides: 5, createdAt: '2 дня назад' },
];

const WorkspacePage = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleGenerate = () => {
    if (text.trim()) {
      navigate('/generate', { state: { text } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-8">
        {/* Блок с заголовком и текстовым полем */}
        <section className="flex flex-col items-center justify-center text-center mb-12" 
        style={{ 
          marginTop: '15vh',
          paddingLeft: '5%',
          paddingRight: '5%',
          }}
        >  
          <div className="relative w-full max-w-[90%] mx-auto">
            <h1 
              className="font-bold leading-none"
              style={{
                fontFamily: '"Pixel Font7", monospace',
                fontSize: '42px',
                fontWeight: 250,
                color: 'hsla(124, 100%, 59%, 1)',
                lineHeight: 1,
                letterSpacing: 'normal',
                textAlign: 'center',
                position: 'relative', // ← чтобы не перекрываться звёздочками
                zIndex: 1,         
              }}
            >
              Вставь свой текст, а Slider начнёт играть
            </h1>
            <img 
              src="/src/assets/sparkle.svg" 
              alt="sparkle"
              className="absolute"
              style={{
                width: '24px',               
                height: '24px',            
                top: '-65px',                   
                left: '23%',              
                transform: 'rotate(-180deg)', 
              }}
            />
            <img 
              src="/src/assets/sparkle.svg" 
              alt="sparkle"
              className="absolute"
              style={{
                width: '24px',               
                height: '24px',            
                top: '-68px',                   
                left: '7%',                
                transform: 'rotate(-180deg)', 
              }}
            />
            <img 
              src="/src/assets/sparkle.svg" 
              alt="sparkle"
              className="absolute"
              style={{
                width: '24px',               
                height: '24px',            
                top: '-65px',                   
                left: '71%',                
                transform: 'rotate(-180deg)', 
              }}
            />
            <img 
              src="/src/assets/sparkle.svg" 
              alt="sparkle"
              className="absolute"
              style={{
                width: '24px',               
                height: '24px',            
                top: '-68px',                   
                left: '88%',                
                transform: 'rotate(-180deg)', 
              }}
            />
            <img 
              src="/src/assets/sparkle.svg" 
              alt="sparkle"
              className="absolute"
              style={{
                width: '24px',               
                height: '24px',            
                top: '25px',                   
                left: '105%',                
                transform: 'rotate(-180deg)', 
              }}
            />
            <img 
              src="/src/assets/sparkle.svg" 
              alt="sparkle"
              className="absolute"
              style={{
                width: '24px',               
                height: '24px',            
                top: '25px',                   
                left: '-7%',                
                transform: 'rotate(-180deg)', 
              }}
            />
          </div>

          <p 
            className="text-center leading-none"
            style={{
              fontFamily: '"Pixel Font7", monospace',
              fontSize: '24px',        
              fontWeight: 50,
              color: 'hsla(0, 0%, 100%, 1)',
              lineHeight: 1,
              letterSpacing: 0,
              marginTop: '12px',
              marginBottom: '24px',
            }}
          >  
            Твой проект сохранится
          </p>

          {/* Текстовое поле */}
          <div 
            className="relative"
            style={{
              width: '65%',              // ← адаптивная ширина
              maxWidth: '1061px',        
              height: 'auto',            // ← высота автоматическая
              minHeight: 'clamp(150px, 25vh, 313px)', // ← адаптивная высота
              marginTop: '5vh',          // ← адаптивный отступ сверху
              marginLeft: 'auto',       
              marginRight: 'auto',      
              backgroundColor: 'hsla(0, 0%, 100%, 1)',
              padding: 'clamp(16px, 3%, 40px)', // ← адаптивные отступы внутри
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              position: 'relative', 
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '20px',  
                left: '30px',         
                fontFamily: '"Advanced Pixel-7", "Pixel Font7", monospace',
                fontSize: 'clamp(10px, 3vw, 20px)',
                fontWeight: 20,
                color: 'hsla(0, 0%, 0%, 1)',
                lineHeight: 1,
                letterSpacing: 'normal',
                textAlign: 'left',
                width: 'auto',
                flexShrink: 0,
              }}
            >
              Здесь мог быть твой текст...
            </span>
            <div 
              style={{
                position: 'absolute',
                bottom: '20px',       
                right: '30px', 
                top: '120px',  
                left: '365px', 
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'hsl(273, 100%, 37%)', 
                cursor: 'pointer',
                marginLeft: 'auto',
                marginTop: '20pxalignSelf', 
              }}
            >
              <img 
              src="/src/assets/Frame 37.svg" 
              alt="frame"
              style={{
                width: '42px',               
                height: '42px',            
              }}
            />
            </div>
            {/* КНОПКА ВЫБОРА КОЛИЧЕСТВА СЛАЙДОВ */}
            <div 
              style={{
                position: 'absolute',
                top: '120px',  
                left: '30px', 
                width: '150px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: 'hsl(273, 100%, 37%)', 
                cursor: 'pointer',
                color: '#fff',
                fontFamily: '"Advanced Pixel-7", "Pixel Font7", monospace',
                fontSize: 'clamp(14px, 1.5vw, 20px)',
                fontWeight: 400,
                textAlign: 'center',
                paddingLeft: '10px',
                paddingRight: '10px',
                //flexShrink: 0,
              }}
            >
              3-5 слайдов   
              <img 
              src="/src/assets/Frame 38.svg" 
              alt="sparkle"
              className="absolute"
              style={{
                width: '11px',               
                height: '24px',       
                top: '10px',                   
                left: '85%',                 
              }}
            />
            </div>
           </div> 
        </section>

        {/* Раздел "Мои проекты" */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">Мои проекты</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/generate')}
              className="text-green-400 border-green-400 hover:bg-green-400 hover:text-black transition-colors"
            >
              <Plus className="mr-1 h-4 w-4" />
              Новый проект
            </Button>
          </div>

          {mockProjects.length === 0 ? (
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="py-12 text-center">
                <p className="text-gray-400">У вас пока нет проектов</p>
                <Button onClick={() => navigate('/generate')} className="mt-4 bg-green-500 hover:bg-green-400 text-black">
                  Создать первый проект
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockProjects.map((project) => (
                <Card key={project.id} className="bg-gray-900 border-gray-700 hover:border-green-500 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg mb-3 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="font-semibold text-lg text-white">{project.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {project.slides} слайдов
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.createdAt}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WorkspacePage;