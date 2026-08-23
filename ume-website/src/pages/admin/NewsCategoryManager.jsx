import { useState, useEffect } from 'react';
import { categoryApi } from '../../services/adminApi';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

export default function NewsCategoryManager() {
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState({ name_km: '', name_en: '' });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'slug', 'newest', 'oldest'

  useEffect(() => { loadCategories(); }, []);

  async function loadCategories() {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryApi.getAll();
      const categories = Array.isArray(data) ? data : (data?.results || []);
      setAllCategories(categories);
    } catch (err) {
      console.error(err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  }

  // Get filtered, sorted, and paginated categories
  function getFilteredCategories() {
    let filtered = [...allCategories];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(cat => 
        cat.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.name_km?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.slug?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => (a.name_en || '').localeCompare(b.name_en || ''));
        break;
      case 'slug':
        filtered.sort((a, b) => (a.slug || '').localeCompare(b.slug || ''));
        break;
      case 'newest':
        // If you have created_at field
        filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
        break;
      default:
        break;
    }
    
    return filtered;
  }

  const filteredCategories = getFilteredCategories();
  const totalItems = filteredCategories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Paginate
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  function openCreateModal() {
    setEditingSlug(null);
    setForm({ name_km: '', name_en: '' });
    setModalOpen(true);
  }

  function openEditModal(cat) {
    setEditingSlug(cat.slug);
    setForm({ name_km: cat.name_km || '', name_en: cat.name_en || '' });
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name_en.trim()) {
      alert('Please enter category name in English');
      return;
    }
    setSaving(true);
    try {
      if (editingSlug) {
        await categoryApi.update(editingSlug, form);
      } else {
        await categoryApi.create(form);
      }
      setModalOpen(false);
      await loadCategories();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug) {
    try {
      await categoryApi.delete(slug);
      // If we deleted the last item on a page, go to previous page
      if (paginatedCategories.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      await loadCategories();
    } catch (err) {
      alert('Error: ' + err.message);
    }
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

  // Generate a color based on category name for icon background
  function getCategoryColor(name) {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-teal-500 to-teal-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-cyan-500 to-cyan-600',
      'from-amber-500 to-amber-600',
    ];
    
    if (!name) return colors[0];
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-navy border-t-gold mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <i className="bi bi-exclamation-triangle-fill text-red-400 text-4xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Failed to Load Categories</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
        <button 
          onClick={loadCategories} 
          className="bg-navy hover:bg-navy-light text-white font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
        >
          <i className="bi bi-arrow-clockwise"></i> Try Again
        </button>
      </div>
    );
  }

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
                <i className="bi bi-tags text-xl"></i>
              </span>
              News Categories
            </h1>
            <p className="text-white/80 ml-14">
              <span className="font-semibold">{allCategories.length}</span> total categor{allCategories.length !== 1 ? 'ies' : 'y'}
              {searchTerm && (
                <span className="ml-2">
                  • <span className="font-semibold">{filteredCategories.length}</span> found
                </span>
              )}
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-gold hover:bg-gold-light text-navy font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-gold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <i className="bi bi-plus-lg text-lg"></i> Add Category
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
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
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

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:ring-2 focus:ring-navy focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="slug">Sort by Slug</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          {/* Items Per Page */}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:ring-2 focus:ring-navy focus:border-transparent"
          >
            <option value={6}>6 per page</option>
            <option value={9}>9 per page</option>
            <option value={12}>12 per page</option>
            <option value={24}>24 per page</option>
          </select>
        </div>
      </div>

      {/* Categories Grid */}
      {paginatedCategories.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedCategories.map((cat) => (
            <div
              key={cat.slug}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Header with Color */}
              <div className={`h-2 bg-gradient-to-r ${getCategoryColor(cat.name_en)}`}></div>
              
              <div className="p-6">
                {/* Category Icon & Name */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(cat.name_en)} flex items-center justify-center shrink-0 shadow-lg`}>
                    <i className="bi bi-folder text-white text-xl"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-navy dark:text-white group-hover:text-navy-light dark:group-hover:text-gold transition-colors truncate">
                      {cat.name_en || 'Untitled'}
                    </h3>
                    {cat.name_km && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {cat.name_km}
                      </p>
                    )}
                  </div>
                </div>

                {/* Slug */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
                    <i className="bi bi-link-45deg text-gray-400"></i>
                    <code className="text-gray-600 dark:text-gray-400 font-mono">/{cat.slug}</code>
                  </div>
                </div>

                {/* Stats (if available) */}
                {cat.news_count !== undefined && (
                  <div className="mb-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <i className="bi bi-newspaper"></i>
                    <span>{cat.news_count} article{cat.news_count !== 1 ? 's' : ''}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="flex-1 px-4 py-2 bg-navy/5 dark:bg-navy/20 text-navy dark:text-navy-light rounded-lg text-sm font-medium hover:bg-navy hover:text-white dark:hover:bg-navy dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
                  >
                    <i className="bi bi-pencil group-hover/btn:scale-110 transition-transform"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(cat)}
                    className="flex-1 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
                  >
                    <i className="bi bi-trash group-hover/btn:scale-110 transition-transform"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <i className="bi bi-tags text-4xl text-gray-400 dark:text-gray-500"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {searchTerm ? 'No Matching Categories' : 'No Categories Yet'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {searchTerm 
              ? 'No categories match your search criteria. Try different keywords.'
              : 'Create categories to organize your news articles and make them easier to find.'}
          </p>
          <button
            onClick={openCreateModal}
            className="bg-navy hover:bg-navy-light text-white font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
          >
            <i className="bi bi-plus-lg"></i> Add Your First Category
          </button>
        </div>
      )}

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
              categor{totalItems !== 1 ? 'ies' : 'y'}
              {searchTerm && ' (filtered)'}
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
            Showing all <span className="font-semibold text-navy dark:text-white">{totalItems}</span> categor{totalItems !== 1 ? 'ies' : 'y'}
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-navy/10 dark:bg-navy/30 rounded-xl flex items-center justify-center">
              <i className={`bi ${editingSlug ? 'bi-pencil' : 'bi-plus-lg'} text-navy dark:text-navy-light text-lg`}></i>
            </span>
            <span>{editingSlug ? 'Edit Category' : 'Create New Category'}</span>
          </div>
        }
        size="max-w-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-translate"></i> Category Name
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                English Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="bi bi-alphabet text-gray-400"></i>
                </div>
                <input
                  type="text"
                  value={form.name_en}
                  onChange={e => setForm({...form, name_en: e.target.value})}
                  required
                  placeholder="e.g., Scholarship, Events, News"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ឈ្មោះជាភាសាខ្មែរ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="bi bi-alphabet text-gray-400"></i>
                </div>
                <input
                  type="text"
                  value={form.name_km}
                  onChange={e => setForm({...form, name_km: e.target.value})}
                  required
                  placeholder="ឧ. អាហារូបករណ៍, ព្រឹត្តិការណ៍"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Info Box */}
          {editingSlug ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <i className="bi bi-info-circle text-blue-600 dark:text-blue-400 text-lg mt-0.5"></i>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Editing Category</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Changing the name will also update the URL slug automatically.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <i className="bi bi-lightbulb text-green-600 dark:text-green-400 text-lg mt-0.5"></i>
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">New Category</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    The URL slug will be automatically generated from the English name.
                  </p>
                </div>
              </div>
            </div>
          )}

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
                  {editingSlug ? 'Update Category' : 'Create Category'}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget.slug)}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteTarget?.name_en}"? This action cannot be undone. News articles in this category will become uncategorized.`}
      />
    </div>
  );
}