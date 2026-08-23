import { useState, useEffect } from 'react';
import { newsApi, categoryApi } from '../../services/adminApi';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import '../../services/api'


function getFullImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path}`;
}

export default function NewsManager() {
  const [allNews, setAllNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const emptyForm = {
    title_km: '', 
    title_en: '',
    excerpt_km: '', 
    excerpt_en: '',
    content_km: '', 
    content_en: '',
    category_id: '', 
    is_featured: false, 
    is_published: true,
  };
  
  const [form, setForm] = useState({ ...emptyForm });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  useEffect(() => { 
    loadData(); 
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [n, c] = await Promise.all([
        newsApi.getAll(), 
        categoryApi.getAll()
      ]);
      
      const newsData = Array.isArray(n) ? n : (n?.results || []);
      const categoriesData = Array.isArray(c) ? c : (c?.results || []);
      
      setAllNews(newsData);
      setCategories(categoriesData);
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    }
  }

  // Get filtered and paginated news
  function getFilteredNews() {
    let filtered = [...allNews];
    
    // Status filter
    if (filter === 'published') {
      filtered = filtered.filter(item => item.is_published);
    } else if (filter === 'draft') {
      filtered = filtered.filter(item => !item.is_published);
    } else if (filter === 'featured') {
      filtered = filtered.filter(item => item.is_featured);
    }
    
    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => 
        item.category?.id?.toString() === categoryFilter
      );
    }
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title_km?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt_en?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }

  const filteredNews = getFilteredNews();
  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Paginate
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  function openCreate() {
    setEditingSlug(null);
    setForm({ ...emptyForm });
    setThumbnailFile(null); 
    setThumbnailPreview(''); 
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditingSlug(item.slug);
    setForm({
      title_km: item.title_km || '', 
      title_en: item.title_en || '',
      excerpt_km: item.excerpt_km || '', 
      excerpt_en: item.excerpt_en || '',
      content_km: item.content_km || '', 
      content_en: item.content_en || '',
      category_id: item.category?.id || '', 
      is_featured: item.is_featured || false, 
      is_published: item.is_published ?? true,
    });
    setThumbnailFile(null); 
    setThumbnailPreview(item.thumbnail || ''); 
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title_en || !form.content_en) {
      alert('Please fill in required fields (EN title and content)');
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, v);
      });
      if (thumbnailFile) fd.append('thumbnail', thumbnailFile);
      
      if (editingSlug) {
        await newsApi.update(editingSlug, fd);
      } else {
        await newsApi.create(fd);
      }
      setModalOpen(false); 
      loadData();
    } catch (err) { 
      alert('Error: ' + err.message); 
    } finally { 
      setSaving(false); 
    }
  }

  async function handleDelete(slug) {
    try { 
      await newsApi.delete(slug); 
      // If we deleted the last item on a page, go to previous page
      if (paginatedNews.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      loadData(); 
    } catch (err) { 
      alert('Error: ' + err.message); 
    }
  }

  function handleSearch() {
    setCurrentPage(1);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Generate pagination numbers
  function getPageNumbers() {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-navy border-t-gold mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading news articles...</p>
        </div>
      </div>
    );
  }

  // Stats
  const publishedCount = allNews.filter(item => item.is_published).length;
  const draftCount = allNews.filter(item => !item.is_published).length;
  const featuredCount = allNews.filter(item => item.is_featured).length;

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-navy to-navy-light rounded-2xl p-8 mb-8 shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
              <span className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <i className="bi bi-newspaper text-xl"></i>
              </span>
              News Management
            </h1>
            <p className="text-white/80 ml-14">
              <span className="font-semibold">{allNews.length}</span> total articles
              {' • '}
              <span className="font-semibold">{publishedCount}</span> published
              {' • '}
              <span className="font-semibold">{draftCount}</span> drafts
              {' • '}
              <span className="font-semibold">{featuredCount}</span> featured
            </p>
          </div>
          <button 
            onClick={openCreate} 
            className="bg-gold hover:bg-gold-light text-navy font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-gold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <i className="bi bi-plus-lg text-lg"></i> 
            Create New Article
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchTerm} 
                onChange={e => {
                  setSearchTerm(e.target.value);
                  handleSearch();
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all text-sm" 
              />
            </div>
            {searchTerm && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select 
            value={filter} 
            onChange={e => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }} 
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:ring-2 focus:ring-navy focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="featured">Featured</option>
          </select>

          {/* Category Filter */}
          <select 
            value={categoryFilter} 
            onChange={e => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:ring-2 focus:ring-navy focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name_en || c.name_km}</option>
            ))}
          </select>

          {/* Items Per Page */}
          <select 
            value={itemsPerPage} 
            onChange={e => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:ring-2 focus:ring-navy focus:border-transparent"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  <i className="bi bi-file-text mr-1"></i> Article
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400 hidden md:table-cell">
                  <i className="bi bi-folder mr-1"></i> Category
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400 hidden md:table-cell">
                  <i className="bi bi-flag mr-1"></i> Status
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400 hidden lg:table-cell">
                  <i className="bi bi-calendar mr-1"></i> Date
                </th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  <i className="bi bi-gear mr-1"></i> Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedNews.length > 0 ? (
                paginatedNews.map(item => (
                  <tr 
                    key={item.slug} 
                    className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {/* Thumbnail */}
                        {item.thumbnail ? (
                          <img 
                            src={getFullImageUrl(item.thumbnail)} 
                            alt="" 
                            className="w-12 h-12 rounded-xl object-cover hidden sm:block shadow-sm group-hover:scale-105 transition-transform" 
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 hidden sm:flex items-center justify-center">
                            <i className="bi bi-image text-gray-400"></i>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-navy dark:text-white truncate max-w-xs group-hover:text-navy-light transition-colors">
                            {item.title_en || 'Untitled'}
                          </p>
                          {item.title_km && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-xs mt-0.5">
                              {item.title_km}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.category?.name_en || item.category?.name_km || (
                          <span className="text-gray-400 italic">Uncategorized</span>
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.is_published 
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.is_published ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          {item.is_published ? 'Published' : 'Draft'}
                        </span>
                        {item.is_featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold dark:text-gold-light">
                            <i className="bi bi-star-fill text-[10px]"></i>
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(item.published_at)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => openEdit(item)} 
                          className="p-2 text-gray-400 hover:text-navy dark:hover:text-navy-light hover:bg-navy/5 dark:hover:bg-navy/20 rounded-lg transition-all"
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          onClick={() => setDeleteTarget(item)} 
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <i className="bi bi-newspaper text-3xl text-gray-400 dark:text-gray-500"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Articles Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                      {searchTerm || filter !== 'all' || categoryFilter !== 'all'
                        ? 'No articles match your current filters. Try adjusting your search criteria.'
                        : 'Start creating news articles to keep your audience informed.'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Results info */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing 
              <span className="font-semibold text-navy dark:text-white mx-1">
                {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}
              </span>
              -
              <span className="font-semibold text-navy dark:text-white mx-1">
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>
              of
              <span className="font-semibold text-navy dark:text-white ml-1">
                {totalItems}
              </span>
              articles
              {(searchTerm || filter !== 'all' || categoryFilter !== 'all') && ' (filtered)'}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              {/* First Page */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="First Page"
              >
                <i className="bi bi-chevron-double-left"></i>
              </button>

              {/* Previous */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Previous Page"
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                    page === currentPage
                      ? 'bg-navy text-white shadow-md shadow-navy/25 scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Next Page"
              >
                <i className="bi bi-chevron-right"></i>
              </button>

              {/* Last Page */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Last Page"
              >
                <i className="bi bi-chevron-double-right"></i>
              </button>
            </div>
          </div>

          {/* Page Jump */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Go to page:</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                defaultValue={currentPage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const page = Math.min(Math.max(1, Number(e.target.value) || 1), totalPages);
                    handlePageChange(page);
                  }
                }}
                className="w-16 px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-center dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-navy focus:border-transparent"
              />
              <button
                onClick={(e) => {
                  const input = e.target.previousElementSibling;
                  const page = Math.min(Math.max(1, Number(input.value) || 1), totalPages);
                  handlePageChange(page);
                  input.value = page;
                }}
                className="px-3 py-1.5 bg-navy text-white rounded-lg text-sm hover:bg-navy-light transition-colors"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single page info */}
      {totalPages <= 1 && totalItems > 0 && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Showing all <span className="font-semibold text-navy dark:text-white">{totalItems}</span> articles
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-navy/10 dark:bg-navy/30 rounded-xl flex items-center justify-center">
              <i className={`bi ${editingSlug ? 'bi-pencil' : 'bi-plus-lg'} text-navy dark:text-navy-light text-lg`}></i>
            </span>
            <span>{editingSlug ? 'Edit Article' : 'Create New Article'}</span>
          </div>
        } 
        size="max-w-4xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-translate"></i> Article Title
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  English Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={form.title_en} 
                  onChange={e => setForm({...form, title_en: e.target.value})} 
                  required 
                  placeholder="Enter article title in English"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ចំណងជើង (ភាសាខ្មែរ) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={form.title_km} 
                  onChange={e => setForm({...form, title_km: e.target.value})} 
                  required 
                  placeholder="បញ្ចូលចំណងជើងជាភាសាខ្មែរ"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Excerpt Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-text-paragraph"></i> Excerpt
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  English Excerpt
                </label>
                <textarea 
                  rows="2" 
                  value={form.excerpt_en} 
                  onChange={e => setForm({...form, excerpt_en: e.target.value})} 
                  placeholder="Brief summary in English"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all resize-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  សេចក្តីសង្ខេប (ភាសាខ្មែរ)
                </label>
                <textarea 
                  rows="2" 
                  value={form.excerpt_km} 
                  onChange={e => setForm({...form, excerpt_km: e.target.value})} 
                  placeholder="សេចក្តីសង្ខេបជាភាសាខ្មែរ"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all resize-none" 
                />
              </div>
            </div>
          </div>

          {/* Thumbnail & Category */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-image"></i> Thumbnail & Category
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Featured Image {!editingSlug && <span className="text-red-500">*</span>}
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => { 
                    const f = e.target.files[0]; 
                    if (f) { 
                      setThumbnailFile(f); 
                      setThumbnailPreview(URL.createObjectURL(f)); 
                    } 
                  }} 
                  required={!editingSlug} 
                  className="w-full file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-navy-light file:transition-colors file:cursor-pointer" 
                />
                {thumbnailPreview && (
                  <div className="mt-3 relative inline-block group">
                    <img 
                      src={thumbnailPreview.startsWith('blob:') ? thumbnailPreview : getFullImageUrl(thumbnailPreview)} 
                      alt="Preview" 
                      className="h-24 rounded-xl object-cover shadow-sm" 
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        setThumbnailFile(null);
                        setThumbnailPreview('');
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select 
                  value={form.category_id} 
                  onChange={e => setForm({...form, category_id: e.target.value})} 
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name_en || c.name_km} {c.name_km && c.name_en && `(${c.name_km})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-file-text"></i> Content
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  English Content <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows="6" 
                  value={form.content_en} 
                  onChange={e => setForm({...form, content_en: e.target.value})} 
                  required 
                  placeholder="Write your article content in English..."
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all resize-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ខ្លឹមសារ (ភាសាខ្មែរ) <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows="6" 
                  value={form.content_km} 
                  onChange={e => setForm({...form, content_km: e.target.value})} 
                  required 
                  placeholder="សរសេរខ្លឹមសារជាភាសាខ្មែរ..."
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all resize-none" 
                />
              </div>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-sliders"></i> Publishing Options
            </h4>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={form.is_published} 
                    onChange={e => setForm({...form, is_published: e.target.checked})} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-navy rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Published</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Article will be visible to the public</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={form.is_featured} 
                    onChange={e => setForm({...form, is_featured: e.target.checked})} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-navy rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gold"></div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Show this article in featured sections</p>
                </div>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              type="button" 
              onClick={() => setModalOpen(false)} 
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving} 
              className="px-6 py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <i className={`bi ${editingSlug ? 'bi-check-lg' : 'bi-plus-lg'}`}></i>
                  {editingSlug ? 'Update Article' : 'Create Article'}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog 
        isOpen={!!deleteTarget} 
        onClose={() => setDeleteTarget(null)} 
        onConfirm={() => handleDelete(deleteTarget.slug)} 
        title="Delete Article" 
        message={`Are you sure you want to delete "${deleteTarget?.title_en}"? This action cannot be undone.`} 
      />
    </div>
  );
}