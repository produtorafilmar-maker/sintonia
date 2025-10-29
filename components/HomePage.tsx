
import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';

const NewsModal: React.FC<{ item: NewsItem; onClose: () => void }> = ({ item, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 border-b">
          <div className="flex justify-between items-start">
            <h2 id="news-modal-title" className="text-xl sm:text-2xl font-bold text-gray-800" dangerouslySetInnerHTML={{ __html: item.title }} />
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-4" aria-label="Fechar">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto text-gray-700 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.fullContent }} />
        <div className="p-4 bg-gray-50 border-t mt-auto">
          <p className="text-sm text-center text-gray-600">
            Acompanhe as matérias de Paracatu e região no portal{' '}
            <a href="https://www.webtvparacatu.com.br" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold hover:underline">
              www.webtvparacatu.com.br
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      // Switched to rss2json API which is more reliable for parsing RSS feeds and handles CORS.
      const rssToJsonApiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.webtvparacatu.com.br/feed/';
      
      try {
        const response = await fetch(rssToJsonApiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.status !== 'ok') {
            throw new Error('Failed to parse RSS feed via API.');
        }

        const newsItems: NewsItem[] = data.items.map((item: any) => {
          const descriptionHtml = item.description || '';
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = descriptionHtml;
          
          const descriptionText = (tempDiv.textContent || tempDiv.innerText || '').trim();
          const imageUrl = tempDiv.querySelector('img')?.src || null;
          
          return {
            title: item.title || '',
            link: item.link || '',
            description: descriptionText,
            imageUrl,
            pubDate: new Date(item.pubDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            fullContent: item.content || '',
          };
        });
        
        setNews(newsItems);
      } catch (e) {
        console.error("Fetching news failed:", e);
        setError('Falha ao carregar notícias. Verifique sua conexão com a internet.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleNewsClick = (item: NewsItem) => setSelectedNews(item);
  const handleCloseModal = () => setSelectedNews(null);

  return (
    <div className="text-white h-full px-4">
      {loading && (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
      
      {error && (
        <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg m-4">
          <p className="font-semibold">Erro de Conexão</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {news.map((item) => (
            <article 
              key={item.link} 
              className="bg-[#1F1433]/70 rounded-lg p-4 cursor-pointer hover:bg-purple-900/50 transition-colors duration-300"
              onClick={() => handleNewsClick(item)}
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleNewsClick(item)}
              aria-label={`Ler notícia: ${item.title}`}
            >
              <h2 className="font-semibold text-md leading-tight" dangerouslySetInnerHTML={{ __html: item.title }}/>
            </article>
          ))}
        </div>
      )}
      
      {selectedNews && <NewsModal item={selectedNews} onClose={handleCloseModal} />}
    </div>
  );
};

export default HomePage;
