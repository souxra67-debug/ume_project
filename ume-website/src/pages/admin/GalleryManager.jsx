import { useState, useEffect, useMemo } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const API_BASE = API_URL.replace('/api', '');

function getFullImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path}`;
}

async function request(path, options = {}) {
  const url = `${API_URL}${path}`;
  const token = localStorage.getItem('access_token'); 
  const config = {
    headers: { 'Accept': 'application/json',  ...(token && { 'Authorization': `Bearer ${token}` }), ...options.headers },
    credentials: 'include',
    ...options,
  };
  if (options.body && !(options.body instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(options.body);
  }
  const res = await fetch(url, config);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

const galleryApi = {
  getAll: () => request('/gallery/?show_all=true'),
  create: (fd) => request('/gallery/', { method: 'POST', body: fd }),
  update: (id, fd) => request(`/gallery/${id}/`, { method: 'PATCH', body: fd }),
  delete: (id) => request(`/gallery/${id}/`, { method: 'DELETE' }),
};

// Simple Modal Component
function Modal({ isOpen, onClose, title, children, size = "max-w-xl" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
        <div className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full ${size} transform transition-all`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <i className="bi bi-x-lg text-gray-500"></i>
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Simple ConfirmDialog Component
function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
          <div className="flex gap-3 justify-end">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Cancel
            </button>
            <button
              onClick={() => { onConfirm(); onClose(); }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryManager({ limit = null, showControls = true }) {
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  const emptyForm = {
    title_km: '',
    title_en: '',
    category: '',
    order: 0,
    is_published: true
  };

  const [form, setForm] = useState({ ...emptyForm });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      setLoading(true);
      const d = await galleryApi.getAll();
      const images = Array.isArray(d) ? d : (d?.results || []);
      setAllImages(images);
    } catch (e) {
      console.error(e);
      setAllImages([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredImages = useMemo(() => {
    let filtered = [...allImages];

    if (searchTerm) {
      filtered = filtered.filter(img =>
        (img.title_en && img.title_en.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (img.title_km && img.title_km.includes(searchTerm)) ||
        (img.category && img.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(img => img.category === categoryFilter);
    }

    return filtered;
  }, [allImages, searchTerm, categoryFilter]);

  const categories = useMemo(() => {
    return allImages
      .map(img => img.category)
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [allImages]);

  // Public (homepage) view only ever shows published images, ordered, most recent/curated first
  const publicImages = useMemo(() => {
    return [...allImages]
      .filter(img => img.is_published !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [allImages]);

  const totalItems = filteredImages.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentImages = useMemo(() => {
    if (!showControls) {
      return limit ? publicImages.slice(0, limit) : publicImages;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredImages.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredImages, publicImages, currentPage, itemsPerPage, limit, showControls]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, itemsPerPage]);

  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setImageFile(null);
    setImagePreview('');
    setModalOpen(true);
  }

  function openEdit(img) {
    setEditingId(img.id);
    setForm({
      title_km: img.title_km || '',
      title_en: img.title_en || '',
      category: img.category || '',
      order: img.order || 0,
      is_published: img.is_published ?? true,
    });
    setImageFile(null);
    setImagePreview(img.image ? getFullImageUrl(img.image) : '');
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
        await galleryApi.update(editingId, fd);
      } else {
        await galleryApi.create(fd);
      }
      setModalOpen(false);
      await loadImages();
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await galleryApi.delete(id);
      if (currentImages.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
      await loadImages();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function getPageNumbers() {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= 1) return pages;

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

  // ✅ Public homepage mode — clean grid, published images only, hover captions, lightbox
  if (!showControls) {
    if (loading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: limit || 4 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
          ))}
        </div>
      );
    }

    if (currentImages.length === 0) {
      return (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <i className="bi bi-images text-2xl text-gray-400 dark:text-gray-500"></i>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No gallery images available yet.</p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentImages.map((img, idx) => {
            const caption = img.title_en || img.title_km;
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => img.image && setLightboxImage(img)}
                className={`group relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gray-100 dark:bg-gray-700 text-left ${idx === 0 ? 'ring-1 ring-gold/20' : ''}`}
              >
                {img.image ? (
                  <img
                    src={getFullImageUrl(img.image)}
                    alt={caption || 'Gallery image'}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                    <i className="bi bi-image text-4xl text-gray-400 dark:text-gray-500"></i>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  {caption && (
                    <p className="text-white text-xs md:text-sm font-semibold line-clamp-2">{caption}</p>
                  )}
                  {img.category && (
                    <span className="mt-1 inline-flex w-fit items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                      {img.category}
                    </span>
                  )}
                </div>

                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="bi bi-zoom-in text-sm"></i>
                </span>
              </button>
            );
          })}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={getFullImageUrl(lightboxImage.image)}
                alt={lightboxImage.title_en || lightboxImage.title_km || 'Gallery image'}
                className="w-full h-full object-contain rounded-xl max-h-[75vh] mx-auto"
              />
              {(lightboxImage.title_en || lightboxImage.title_km) && (
                <p className="text-white/90 text-center mt-4 text-sm font-medium">
                  {lightboxImage.title_en || lightboxImage.title_km}
                </p>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  // ✅ Full controls (Admin mode)
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-navy border-t-gold mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header + Add button */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Gallery</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{allImages.length} images total</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-navy transition-colors"
        >
          <i className="bi bi-plus-lg"></i> Add Image
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all text-sm"
              />
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>

          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:ring-2 focus:ring-navy focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}

          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:ring-2 focus:ring-navy focus:border-transparent"
          >
            <option value={8}>8 per page</option>
            <option value={12}>12 per page</option>
            <option value={20}>20 per page</option>
            <option value={32}>32 per page</option>
          </select>
        </div>
      </div>

      {/* Gallery Grid */}
      {currentImages.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentImages.map(img => (
              <div
                key={img.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                  {img.image ? (
                    <img
                      src={getFullImageUrl(img.image)}
                      alt={img.title_en || 'Gallery image'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                      <i className="bi bi-image text-4xl text-gray-400 dark:text-gray-500"></i>
                    </div>
                  )}

                  <div className="absolute top-2 left-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      img.is_published
                        ? 'bg-green-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      {img.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  {img.image && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(getFullImageUrl(img.image), '_blank');
                        }}
                        className="opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 bg-white/90 backdrop-blur-sm text-navy px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white"
                      >
                        <i className="bi bi-zoom-in mr-1"></i> View
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); openEdit(img); }}
                        className="opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 bg-white/90 backdrop-blur-sm text-navy px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white"
                      >
                        <i className="bi bi-pencil mr-1"></i> Edit
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-navy dark:text-white text-sm truncate">
                      {img.title_en || 'Untitled'}
                    </h3>
                    {img.category && (
                      <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-md bg-navy/5 dark:bg-navy/20 text-navy dark:text-navy-light text-xs">
                        {img.category}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setDeleteTarget(img)}
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Delete image"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <i className="bi bi-chevron-double-left"></i>
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>

                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                        page === currentPage
                          ? 'bg-navy text-white shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <i className="bi bi-chevron-double-right"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <i className="bi bi-images text-3xl text-gray-400 dark:text-gray-500"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Images Found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto text-sm">
            {searchTerm || categoryFilter !== 'all'
              ? 'No images match your current filters.'
              : 'No gallery images available yet.'}
          </p>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Image' : 'Add New Image'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Title (EN)</label>
              <input type="text" value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">ចំណងជើង (KH)</label>
              <input type="text" value={form.title_km} onChange={e => setForm({...form, title_km: e.target.value})} className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Image {!editingId && '*'}</label>
            <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); } }} required={!editingId} className="w-full" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 rounded-lg object-cover" />}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Category</label>
              <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="Campus, Events..." className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Order</label>
              <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
            </div>
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} /> Published
          </label>
          <div className="flex gap-3 justify-end pt-4 border-t">
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2.5 border rounded-lg">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-navy text-white rounded-lg">
              {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget.id)}
        title="Delete Image"
        message={`Delete "${deleteTarget?.title_en || 'this image'}"?`}
      />
    </div>
  );
}