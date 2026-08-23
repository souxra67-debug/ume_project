import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bannerApi, newsApi, categoryApi } from '../../services/adminApi';
import { getVisitorSummary } from '../../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ 
    banners: 0, 
    news: 0, 
    categories: 0,
    publishedNews: 0,
    draftNews: 0,
  });
  const [visitorStats, setVisitorStats] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    loadData(); 
  }, []);

  async function loadData() {
    try {
      setError(null);
      const [b, n, c, vs] = await Promise.all([
        bannerApi.getAll().catch(() => []),
        newsApi.getAll().catch(() => []),
        categoryApi.getAll().catch(() => []),
        getVisitorSummary().catch(() => null),
      ]);

      const banners = Array.isArray(b) ? b : (b?.results || []);
      const news = Array.isArray(n) ? n : (n?.results || []);
      const categories = Array.isArray(c) ? c : (c?.results || []);

      setStats({
        banners: banners.length,
        news: news.length,
        categories: categories.length,
        publishedNews: news.filter(item => item.is_published).length,
        draftNews: news.filter(item => !item.is_published).length,
      });

      setRecentNews(news.slice(0, 5));
      setVisitorStats(vs);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Failed to load some data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-navy border-t-gold mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Banners',
      value: stats.banners,
      icon: 'bi-image',
      color: 'blue',
      link: '/admin/banners',
      bgClass: 'bg-blue-50 dark:bg-blue-900/20',
      iconClass: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Total News',
      value: stats.news,
      icon: 'bi-newspaper',
      color: 'green',
      link: '/admin/news',
      bgClass: 'bg-green-50 dark:bg-green-900/20',
      iconClass: 'text-green-600 dark:text-green-400',
      subStats: [
        { label: 'Published', value: stats.publishedNews, color: 'text-green-600' },
        { label: 'Drafts', value: stats.draftNews, color: 'text-gray-500' },
      ],
    },
    {
      label: 'Categories',
      value: stats.categories,
      icon: 'bi-tags',
      color: 'purple',
      link: '/admin/categories',
      bgClass: 'bg-purple-50 dark:bg-purple-900/20',
      iconClass: 'text-purple-600 dark:text-purple-400',
    },
    {
      label: 'Visitors Today',
      value: visitorStats?.today_visitors || 0,
      icon: 'bi-people',
      color: 'amber',
      link: '#',
      bgClass: 'bg-amber-50 dark:bg-amber-900/20',
      iconClass: 'text-amber-600 dark:text-amber-400',
      subStats: [
        { label: 'Total', value: visitorStats?.total_visitors || 0, color: 'text-amber-600' },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-navy to-navy-light rounded-2xl p-8 mb-8 shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="relative">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-white/80">
            Welcome back! Here's what's happening with your site today.
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-2xl flex items-center gap-3">
          <i className="bi bi-exclamation-triangle text-xl"></i>
          <p>{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl ${card.bgClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <i className={`bi ${card.icon} ${card.iconClass} text-2xl`}></i>
              </div>
              <i className="bi bi-arrow-up-right text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-navy dark:text-white mb-1">
                {card.value.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {card.label}
              </p>
            </div>
            {card.subStats && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-4">
                {card.subStats.map((sub) => (
                  <div key={sub.label} className="text-xs">
                    <span className={`font-semibold ${sub.color}`}>{sub.value}</span>
                    <span className="text-gray-400 ml-1">{sub.label}</span>
                  </div>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        {/* Recent News Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-newspaper text-gold"></i>
              Recent News
            </h2>
            <Link 
              to="/admin/news" 
              className="text-sm text-navy dark:text-navy-light hover:underline font-medium"
            >
              View All →
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentNews.length > 0 ? (
                  recentNews.map((item) => (
                    <tr key={item.slug}>
                      <td className="font-medium text-navy dark:text-white max-w-xs truncate">
                        {item.title_en || 'Untitled'}
                      </td>
                      <td>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.is_published 
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.is_published ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          {item.is_published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="text-gray-500 dark:text-gray-400 text-sm">
                        {item.published_at 
                          ? new Date(item.published_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })
                          : 'N/A'
                        }
                      </td>
                      <td>
                        <Link 
                          to={`/admin/news/edit/${item.slug}`}
                          className="text-navy hover:text-navy-light dark:text-navy-light font-medium text-sm"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-400">
                      <i className="bi bi-inbox text-3xl block mb-2"></i>
                      No news articles yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-navy dark:text-white mb-6 flex items-center gap-2">
            <i className="bi bi-lightning text-gold"></i>
            Quick Actions
          </h2>
          
          <div className="space-y-3">
            <Link 
              to="/admin/news/new" 
              className="flex items-center gap-3 p-4 rounded-xl bg-navy/5 dark:bg-navy/10 hover:bg-navy hover:text-white dark:hover:bg-navy transition-all group"
            >
              <i className="bi bi-plus-circle text-xl group-hover:text-gold transition-colors"></i>
              <div>
                <p className="font-semibold text-sm">Create News</p>
                <p className="text-xs text-gray-500 group-hover:text-white/70">Add a new article</p>
              </div>
            </Link>

            <Link 
              to="/admin/banners" 
              className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-all group"
            >
              <i className="bi bi-image text-xl group-hover:text-white transition-colors"></i>
              <div>
                <p className="font-semibold text-sm">Manage Banners</p>
                <p className="text-xs text-gray-500 group-hover:text-white/70">Update homepage slides</p>
              </div>
            </Link>

            <Link 
              to="/admin/categories" 
              className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-600 transition-all group"
            >
              <i className="bi bi-tags text-xl group-hover:text-white transition-colors"></i>
              <div>
                <p className="font-semibold text-sm">Categories</p>
                <p className="text-xs text-gray-500 group-hover:text-white/70">Organize content</p>
              </div>
            </Link>

            <Link 
              to="/admin/events" 
              className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/10 hover:bg-green-500 hover:text-white dark:hover:bg-green-600 transition-all group"
            >
              <i className="bi bi-calendar-event text-xl group-hover:text-white transition-colors"></i>
              <div>
                <p className="font-semibold text-sm">Events</p>
                <p className="text-xs text-gray-500 group-hover:text-white/70">Manage upcoming events</p>
              </div>
            </Link>
          </div>

          {/* Visitor Overview */}
          {visitorStats && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-4">
                <i className="bi bi-graph-up mr-2"></i>
                Visitor Overview
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Today</span>
                  <span className="font-bold text-navy dark:text-white">{visitorStats.today_visitors || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                  <span className="font-bold text-navy dark:text-white">{visitorStats.week_visitors || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                  <span className="font-bold text-navy dark:text-white">{visitorStats.month_visitors || 0}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total</span>
                  <span className="font-bold text-gold text-lg">{visitorStats.total_visitors || 0}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}