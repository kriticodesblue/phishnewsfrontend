import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import { newsAPI, locationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaFire, FaChartLine } from 'react-icons/fa';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, [isAuthenticated]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (isAuthenticated) {
        data = await newsAPI.getPersonalized('all');
      } else {
        data = await newsAPI.getNews({ country: 'us', source: 'all' });
      }
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const trendingTopics = [
    'Tech Layoffs', 'Climate Change', 'Space Exploration', 
    'Cryptocurrency', 'Remote Work', 'Healthcare AI'
  ];

  return (
    <div className="pt-16 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Trending Topics Bar */}
        <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaFire className="text-red-500 text-sm" />
              <span className="text-gray-900 dark:text-white font-medium text-sm">Trending:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {trendingTopics.map((topic, index) => (
                <button
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Latest News Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Latest News</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {articles.length} articles • AI-summarized for quick reading
          </p>
        </div>
        
        {/* Content */}
        <div>
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading news...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-800 dark:text-red-200">Error: {error}</p>
            </div>
          )}
          
          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No news articles available.</p>
            </div>
          )}
          
          {!loading && !error && articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <NewsCard
                  key={article.url || article.title}
                  article={article}
                  showStatus={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}