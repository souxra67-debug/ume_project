import { useState, useEffect } from 'react';
import { bannerApi, getFullImageUrl } from '../../services/adminApi';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  
  const emptyForm = {
    title_km: '', 
    title_en: '', 
    subtitle_km: '', 
    subtitle_en: '', 
    button_text_km: '', 
    button_text_en: '', 
    link_url: '', 
    order: 0, 
    is_active: true 
  };
  
  const [form, setForm] = useState({ ...emptyForm });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => { 
    loadBanners(); 
  }, [currentPage]);

  async function loadBanners() {
    try {
      setLoading(true);
      const data = await bannerApi.getAll();
      
      let allBanners = [];
      if (Array.isArray(data)) {
        allBanners = data;
      } else if (data?.results) {
        allBanners = data.results;
      }

      // Filter by search term
      let filtered = allBanners;
      if (searchTerm) {
        filtered = allBanners.filter(b => 
          (b.title_en && b.title_en.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (b.title_km && b.title_km.includes(searchTerm)) ||
          (b.subtitle_en && b.subtitle_en.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      // Manual pagination
      setTotalItems(filtered.length);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);
      setBanners(paginatedData);
      
    } catch (e) {
      console.error('Failed to load banners:', e);
      setBanners([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setImageFile(null);
    setImagePreview('');
    setModalOpen(true);
  }

  function openEdit(b) {
    setEditingId(b.id);
    setForm({
      title_km: b.title_km || '',
      title_en: b.title_en || '',
      subtitle_km: b.subtitle_km || '',
      subtitle_en: b.subtitle_en || '',
      button_text_km: b.button_text_km || '',
      button_text_en: b.button_text_en || '',
      link_url: b.link_url || '',
      order: b.order || 0,
      is_active: b.is_active ?? true,
    });
    setImageFile(null);
    setImagePreview(b.image || '');
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!editingId && !imageFile) {
      alert('Please select an image');
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, v);
      });
      if (imageFile) fd.append('image', imageFile);

      if (editingId) {
        await bannerApi.update(editingId, fd);
      } else {
        await bannerApi.create(fd);
      }
      setModalOpen(false);
      loadBanners();
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await bannerApi.delete(id);
      // If we deleted the last item on a page, go to previous page
      if (banners.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        loadBanners();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  }

  function handleSearch() {
    setCurrentPage(1); // Reset to first page when searching
    loadBanners();
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

  if (loading && banners.length === 0) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-navy border-t-gold mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading banners...</p>
        </div>
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
                <i className="bi bi-image text-xl"></i>
              </span>
              Hero Banners
            </h1>
            <p className="text-white/80 ml-14">
              <span className="font-semibold">{totalItems}</span> total banner{totalItems !== 1 ? 's' : ''}
              {' • '}
              <span className="font-semibold">{banners.filter(b => b.is_active).length}</span> active on this page
            </p>
          </div>
          <button 
            onClick={openCreate} 
            className="bg-gold hover:bg-gold-light text-navy font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-gold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <i className="bi bi-plus-lg text-lg"></i> 
            Add New Banner
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search banners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
            />
          </div>
          <button 
            onClick={handleSearch}
            className="px-6 py-2.5 bg-navy text-white rounded-xl hover:bg-navy-light transition-colors font-medium"
          >
            Search
          </button>
          {searchTerm && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
                loadBanners();
              }}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Banners Grid */}
      <div className="grid gap-6">
        {banners.length > 0 ? (
          banners.map(b => (
            <div 
              key={b.id} 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-l-4 border-l-transparent hover:border-l-navy"
            >
              <div className="p-6 flex flex-col sm:flex-row gap-6">
                {/* Thumbnail */}
                <div className="relative sm:w-64 h-48 sm:h-40 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-700 shadow-sm">
                  {b.image ? (
                    <img 
                      src={getFullImageUrl(b.image)} 
                      alt={b.title_en || 'Banner'} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                      <i className="bi bi-image text-4xl text-gray-400 dark:text-gray-500"></i>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm ${
                      b.is_active 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      {b.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-navy dark:text-white group-hover:text-navy-light transition-colors">
                    {b.title_en || 'Untitled Banner'}
                  </h3>
                  
                  {b.title_km && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {b.title_km}
                    </p>
                  )}
                  
                  {b.subtitle_en && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                      {b.subtitle_en}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    {b.link_url && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-navy/5 dark:bg-navy/20 text-navy dark:text-navy-light rounded-lg text-xs font-medium">
                        <i className="bi bi-link-45deg"></i>
                        {b.link_url}
                      </span>
                    )}
                    {b.button_text_en && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-gold/10 dark:bg-gold/20 text-gold-dark dark:text-gold rounded-lg text-xs font-medium">
                        <i className="bi bi-hand-index"></i>
                        {b.button_text_en}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs">
                      <i className="bi bi-sort-down"></i>
                      Order: {b.order || 0}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button 
                    onClick={() => openEdit(b)} 
                    className="w-full sm:w-auto px-4 py-2.5 bg-navy/5 dark:bg-navy/20 text-navy dark:text-navy-light rounded-xl text-sm font-medium hover:bg-navy hover:text-white dark:hover:bg-navy dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <i className="bi bi-pencil group-hover/btn:scale-110 transition-transform"></i> 
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button 
                    onClick={() => setDeleteTarget(b)} 
                    className="w-full sm:w-auto px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <i className="bi bi-trash group-hover/btn:scale-110 transition-transform"></i> 
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <i className="bi bi-image text-4xl text-gray-400 dark:text-gray-500"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Banners Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {searchTerm 
                ? 'No banners match your search criteria. Try different keywords.'
                : 'Start creating eye-catching banners for your homepage.'}
            </p>
            <button 
              onClick={openCreate} 
              className="bg-navy hover:bg-navy-light text-white font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <i className="bi bi-plus-lg"></i> Add New Banner
            </button>
          </div>
        )}
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
            Showing all <span className="font-semibold text-navy dark:text-white">{totalItems}</span> banners
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
              <i className={`bi ${editingId ? 'bi-pencil' : 'bi-plus-lg'} text-navy dark:text-navy-light text-lg`}></i>
            </span>
            <span>{editingId ? 'Edit Banner' : 'Create New Banner'}</span>
          </div>
        } 
        size="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-translate"></i> Banner Title
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  English Title
                </label>
                <input 
                  type="text" 
                  value={form.title_en} 
                  onChange={e => setForm({...form, title_en: e.target.value})}
                  placeholder="Enter banner title in English"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ចំណងជើង (ភាសាខ្មែរ)
                </label>
                <input 
                  type="text" 
                  value={form.title_km} 
                  onChange={e => setForm({...form, title_km: e.target.value})}
                  placeholder="បញ្ចូលចំណងជើងជាភាសាខ្មែរ"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Subtitle Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-text-paragraph"></i> Subtitle
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  English Subtitle
                </label>
                <input 
                  type="text" 
                  value={form.subtitle_en} 
                  onChange={e => setForm({...form, subtitle_en: e.target.value})}
                  placeholder="Enter subtitle in English"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ចំណងជើងរង (ភាសាខ្មែរ)
                </label>
                <input 
                  type="text" 
                  value={form.subtitle_km} 
                  onChange={e => setForm({...form, subtitle_km: e.target.value})}
                  placeholder="បញ្ចូលចំណងជើងរងជាភាសាខ្មែរ"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-image"></i> Banner Image
            </h4>
            <div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={e => { 
                  const f = e.target.files[0]; 
                  if (f) { 
                    setImageFile(f); 
                    setImagePreview(URL.createObjectURL(f)); 
                  } 
                }} 
                required={!editingId} 
                className="w-full file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-navy-light file:transition-colors file:cursor-pointer" 
              />
              {imagePreview && (
                <div className="mt-3 relative inline-block group">
                  <img 
                    src={imagePreview.startsWith('blob:') ? imagePreview : getFullImageUrl(imagePreview)} 
                    alt="Preview" 
                    className="h-40 rounded-xl object-cover shadow-sm" 
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Button & Link Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-hand-index"></i> Button & Link
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Button Text (English)
                </label>
                <input 
                  type="text" 
                  value={form.button_text_en} 
                  onChange={e => setForm({...form, button_text_en: e.target.value})}
                  placeholder="e.g., Learn More, Get Started"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Button Text (Khmer)
                </label>
                <input 
                  type="text" 
                  value={form.button_text_km} 
                  onChange={e => setForm({...form, button_text_km: e.target.value})}
                  placeholder="ឧ. ស្វែងយល់បន្ថែម"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Link URL
              </label>
              <input 
                type="text" 
                value={form.link_url} 
                onChange={e => setForm({...form, link_url: e.target.value})}
                placeholder="https://example.com or /about"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
              />
            </div>
          </div>

          {/* Order & Status */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-sliders"></i> Settings
            </h4>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Order
                </label>
                <input 
                  type="number" 
                  value={form.order} 
                  onChange={e => setForm({...form, order: Number(e.target.value)})}
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={form.is_active} 
                      onChange={e => setForm({...form, is_active: e.target.checked})} 
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-navy rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-navy"></div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Banner will be visible on the site</p>
                  </div>
                </label>
              </div>
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
                  <i className={`bi ${editingId ? 'bi-check-lg' : 'bi-plus-lg'}`}></i>
                  {editingId ? 'Update Banner' : 'Create Banner'}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog 
        isOpen={!!deleteTarget} 
        onClose={() => setDeleteTarget(null)} 
        onConfirm={() => handleDelete(deleteTarget.id)} 
        title="Delete Banner" 
        message={`Are you sure you want to delete "${deleteTarget?.title_en}"? This action cannot be undone.`} 
      />
    </div>
  );
}