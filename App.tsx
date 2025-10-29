import React, { useState } from 'react';
import { Page } from './types';
import HomePage from './components/HomePage';
import RadioPage from './components/RadioPage';
import TvPage from './components/TvPage';
import ContactsPage from './components/ContactsPage';
import { HomeIcon, RadioIcon, TvIcon, ContactIcon, WebTvIcon, SintoniaRuralIcon, FeedIcon } from './components/Icons';

// Wave Component
const Wave: React.FC<{ color: string; opacity: number; path: string }> = ({ color, opacity, path }) => (
    <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden" style={{ opacity }}>
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
            <path fill={color} d={path}></path>
        </svg>
    </div>
);

// New Brand Button component for the home screen
const BrandButton: React.FC<{ onClick: () => void; Icon: React.ElementType; label: string; colors: string[] }> = ({ onClick, Icon, label, colors }) => (
  <button
    onClick={onClick}
    className={`w-full text-white rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${colors[2]}`}
    style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
    aria-label={`Acessar ${label}`}
  >
    <Icon className="w-16 h-16 mb-4" />
    <span className="text-2xl font-bold">{label}</span>
  </button>
);

// New Home/Brand Selection Page component
const BrandSelectionPage: React.FC<{ onSelectBrand: (page: Page) => void; }> = ({ onSelectBrand }) => {
  const newsColors = ['#F97316', '#EA580C', 'focus:ring-orange-500']; // Orange theme
  const webTVColors = ['#4338CA', '#7C3AED', 'focus:ring-purple-500']; // Indigo to Purple
  const radioColors = ['#15803D', '#22C55E', 'focus:ring-green-500']; // Dark Green to Green

  return (
    <div className="h-screen w-screen flex justify-center items-center font-sans">
      <div className="relative h-full w-full max-w-md bg-[#0f051e] shadow-2xl overflow-hidden flex flex-col justify-center items-center text-white p-8">
        <div className="absolute inset-0">
            <Wave color={webTVColors[0]} opacity={0.2} path="M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,176C672,149,768,107,864,117.3C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
            <Wave color={webTVColors[1]} opacity={0.15} path="M0,256L60,229.3C120,203,240,149,360,144C480,139,600,181,720,192C840,203,960,181,1080,154.7C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </div>
        <div className="relative z-10 flex flex-col items-center w-full">
            <h1 className="text-4xl font-bold mb-2 text-center">TVRÁDIO</h1>
            <p className="text-lg text-gray-300 mb-10 text-center">Sua central de entretenimento</p>
            
            <div className="w-full space-y-5">
                <BrandButton onClick={() => onSelectBrand('WebtvNews')} Icon={FeedIcon} label="WebtvNews" colors={newsColors} />
                <BrandButton onClick={() => onSelectBrand('TV')} Icon={WebTvIcon} label="TV Paracatu" colors={webTVColors} />
                <BrandButton onClick={() => onSelectBrand('Radio')} Icon={SintoniaRuralIcon} label="Rádio Sintonia Rural" colors={radioColors} />
            </div>
        </div>
      </div>
    </div>
  );
};

const WaveBackground: React.FC<{ page: Page }> = ({ page }) => {
    const isRadio = page === 'Radio';
    const webTVColors = ['#4F46E5', '#7C3AED', '#DB2777'];
    const radioColors = ['#16A34A', '#22C55E', '#4ADE80'];
    const colors = isRadio ? radioColors : webTVColors;
    
    return (
        <div className={`absolute inset-0 transition-colors duration-500 ${isRadio ? 'bg-green-900' : 'bg-[#0f051e]'}`}>
            <Wave color={colors[0]} opacity={isRadio ? 0.3 : 0.2} path="M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,176C672,149,768,107,864,117.3C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
            <Wave color={colors[1]} opacity={isRadio ? 0.2 : 0.15} path="M0,256L60,229.3C120,203,240,149,360,144C480,139,600,181,720,192C840,203,960,181,1080,154.7C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </div>
    );
};

// Header Component
const pageTitles: Record<Page, string> = {
    WebtvNews: 'Notícias',
    Radio: 'Rádio',
    TV: 'TV ao Vivo',
    Contacts: 'Contatos',
};

const Header: React.FC<{ activePage: Page }> = ({ activePage }) => {
    return (
        <header className="relative z-20 pt-6 pb-2 px-4 text-center">
            <h1 className="text-2xl font-bold text-white">{pageTitles[activePage]}</h1>
        </header>
    );
};

// BottomNav Component
interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  onGoHome: () => void;
}

const NavItem: React.FC<{
  label: string;
  Icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, Icon, isActive, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-full h-full space-y-1 focus:outline-none">
        <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`} />
        <span className={`text-xs font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
            {label}
        </span>
        {isActive && <div className="w-1 h-1 bg-white rounded-full mt-1"></div>}
    </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage, onGoHome }) => {
  const pageNavItems = [
    { id: 'WebtvNews' as Page, label: 'WebtvNews', Icon: FeedIcon },
    { id: 'Radio' as Page, label: 'Rádio', Icon: RadioIcon },
    { id: 'TV' as Page, label: 'TV ao Vivo', Icon: TvIcon },
    { id: 'Contacts' as Page, label: 'Contatos', Icon: ContactIcon },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 bg-black/30 backdrop-blur-lg border-t border-white/10 z-50 max-w-md mx-auto">
      <div className="flex justify-around h-full">
        <NavItem
            label="Home"
            Icon={HomeIcon}
            isActive={false}
            onClick={onGoHome}
          />
        {pageNavItems.map(item => (
          <NavItem
            key={item.id}
            label={item.label}
            Icon={item.Icon}
            isActive={activePage === item.id}
            onClick={() => setActivePage(item.id)}
          />
        ))}
      </div>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
    const [view, setView] = useState<'home' | 'app'>('home');
    const [activePage, setActivePage] = useState<Page>('WebtvNews');

    const handleSelectBrand = (page: Page) => {
        setActivePage(page);
        setView('app');
    };
    
    const handleGoHome = () => {
        setView('home');
    };

    if (view === 'home') {
        return <BrandSelectionPage onSelectBrand={handleSelectBrand} />;
    }

    const renderPage = () => {
        switch (activePage) {
            case 'WebtvNews': return <HomePage />;
            case 'Radio': return <RadioPage />;
            case 'TV': return <TvPage />;
            case 'Contacts': return <ContactsPage />;
            default: return <HomePage />;
        }
    };
    
    return (
        <div className="h-screen w-screen flex justify-center items-center font-sans">
          <div className="relative h-full w-full max-w-md bg-gray-900 shadow-2xl overflow-hidden flex flex-col">
              <WaveBackground page={activePage} />
              
              <Header activePage={activePage} />

              <main className="flex-grow overflow-y-auto relative z-10 pb-20">
                  {renderPage()}
              </main>

              <BottomNav activePage={activePage} setActivePage={setActivePage} onGoHome={handleGoHome} />
          </div>
        </div>
    );
};

export default App;