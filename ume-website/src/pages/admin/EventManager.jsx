import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://127.0.0.1:8000';

function getFullImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path}`;
}

async function request(path, options = {}) {
  const url = `${API_URL}${path}`;
  const config = {
    headers: { 'Accept': 'application/json', ...options.headers },
    credentials: 'include',
    ...options,
  };
  if (options.body && !(options.body instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(options.body);
  }
  const res = await fetch(url, config);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || `Error ${res.status}`);
  }
  return res.json();
}

const eventApi = {
  getAll: () => request('/events/?show_all=true'), 
  create: (fd) => request('/events/', { method: 'POST', body: fd }),
  update: (slug, fd) => request(`/events/${slug}/`, { method: 'PATCH', body: fd }),
  delete: (slug) => request(`/events/${slug}/`, { method: 'DELETE' }),
};

export default function EventManager({ limit = null, showControls = true }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const emptyForm = {
    title_km: '', title_en: '',
    description_km: '', description_en: '',
    event_date: '', end_date: '',
    location_km: '', location_en: '',
    is_published: true,
  };
  const [form, setForm] = useState({ ...emptyForm });
  const [thumbFile, setThumbFile] = useState(null);
  const [thumbPreview, setThumbPreview] = useState('');

  useEffect(() => { loadEvents(); }, []);

  async function loadEvents() {
    try {
      setLoading(true);
      const data = await eventApi.getAll();
      setEvents(Array.isArray(data) ? data : (data?.results || []));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  // ✅ Helper function to check event status
  function getEventStatus(event) {
    const now = new Date();
    const start = new Date(event.event_date);
    const end = event.end_date ? new Date(event.end_date) : start;
    
    if (now >= start && now <= end) return 'ongoing';
    if (now < start) return 'upcoming';
    return 'past';
  }

  // ✅ Display events with limit
  const displayEvents = useMemo(() => {
    if (limit && !showControls) {
      return events.slice(0, limit);
    }
    return events;
  }, [events, limit, showControls]);

  function openCreate() {
    setEditingSlug(null);
    setForm({ ...emptyForm });
    setThumbFile(null);
    setThumbPreview('');
    setModalOpen(true);
  }

  function openEdit(ev) {
    setEditingSlug(ev.slug);
    setForm({
      title_km: ev.title_km || '',
      title_en: ev.title_en || '',
      description_km: ev.description_km || '',
      description_en: ev.description_en || '',
      event_date: ev.event_date ? ev.event_date.slice(0, 16) : '',
      end_date: ev.end_date ? ev.end_date.slice(0, 16) : '',
      location_km: ev.location_km || '',
      location_en: ev.location_en || '',
      is_published: ev.is_published ?? true,
    });
    setThumbFile(null);
    setThumbPreview(ev.thumbnail ? getFullImageUrl(ev.thumbnail) : '');
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!editingSlug && !thumbFile) { alert('Please select a thumbnail image'); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, v);
      });
      if (thumbFile) fd.append('thumbnail', thumbFile);

      if (editingSlug) await eventApi.update(editingSlug, fd);
      else await eventApi.create(fd);
      setModalOpen(false);
      loadEvents();
    } catch (err) { alert('Save failed: ' + err.message); }
    finally { setSaving(false); }
  }

  async function handleDelete(slug) {
    try { await eventApi.delete(slug); loadEvents(); }
    catch (err) { alert('Delete failed: ' + err.message); }
  }

  function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function formatDateRange(startDate, endDate) {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : null;
    if (!end) return start;
    
    const startObj = new Date(startDate);
    const endObj = new Date(endDate);
    
    if (startObj.toDateString() === endObj.toDateString()) {
      return `${startObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} ${startObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${endObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return `${start} - ${end}`;
  }

  // ✅ ប្រសិនបើ showControls = false បង្ហាញតែ Grid
  if (!showControls) {
    if (loading) {
      return (
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: limit || 3 }).map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-3 gap-6">
        {displayEvents.map((event) => {
          const status = getEventStatus(event);
          return (
            <Link
              to={`/news-events/${event.slug}`}
              key={event.id || event.slug}
              className="group bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="relative h-48 overflow-hidden">
                {event.thumbnail ? (
                  <img 
                    src={getFullImageUrl(event.thumbnail)} 
                    alt={event.title_en || 'Event'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-navy/10 to-gold/10 flex items-center justify-center">
                    <i className="bi bi-calendar-event text-5xl text-gray-300 dark:text-gray-600"></i>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                {/* Event Status Badge */}
                {status === 'ongoing' && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    Live
                  </span>
                )}
                {status === 'upcoming' && (
                  <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    Upcoming
                  </span>
                )}
                {status === 'past' && (
                  <span className="absolute top-3 left-3 bg-gray-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    Past
                  </span>
                )}
                
                {event.is_published === false && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    Draft
                  </span>
                )}
                
                {/* Date */}
                <div className="absolute bottom-3 left-3 text-white/90 text-xs flex items-center gap-1 font-medium">
                  <i className="bi bi-calendar3"></i>
                  {new Date(event.event_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                  {event.end_date && (
                    <span className="text-white/60">
                      {' - '}
                      {new Date(event.end_date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                  {event.title_en}
                </h3>
                
                {event.location_en && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-2">
                    <i className="bi bi-geo-alt-fill text-gold text-xs"></i>
                    {event.location_en}
                  </p>
                )}
                
                {event.description_en && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                    {event.description_en}
                  </p>
                )}
                
                <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all mt-2">
                  View Details 
                  <i className="bi bi-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                </span>
              </div>
            </Link>
          );
        })}
        {displayEvents.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No events available</p>
          </div>
        )}
      </div>
    );
  }

  // ✅ Full controls (Admin mode)
  if (loading) return (
    <div className="flex justify-center items-center py-32">
      <div className="text-center">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-navy border-t-gold mx-auto mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400">Loading events...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-navy to-navy-light rounded-2xl p-8 mb-8 shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
              <span className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <i className="bi bi-calendar-event text-xl"></i>
              </span>
              Events Management
            </h1>
            <p className="text-white/80 ml-14">
              <span className="font-semibold">{events.length}</span> total event{events.length !== 1 ? 's' : ''} 
              {' • '}
              <span className="font-semibold">{events.filter(e => e.is_published).length}</span> published
              {' • '}
              <span className="font-semibold">{events.filter(e => !e.is_published).length}</span> drafts
            </p>
          </div>
          <button 
            onClick={openCreate} 
            className="bg-gold hover:bg-gold-light text-navy font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-gold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <i className="bi bi-plus-lg text-lg"></i> 
            Create New Event
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-4">
        {events.map(ev => {
          const ongoing = getEventStatus(ev) === 'ongoing';
          const upcoming = getEventStatus(ev) === 'upcoming';
          
          return (
            <div 
              key={ev.slug} 
              className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-l-4 ${
                ongoing ? 'border-l-green-500' : upcoming ? 'border-l-blue-500' : 'border-l-gray-300 dark:border-l-gray-600'
              }`}
            >
              <div className="p-6 flex flex-col sm:flex-row gap-6">
                {/* Thumbnail */}
                <div className="relative sm:w-40 h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-700 shadow-sm">
                  {ev.thumbnail ? (
                    <img src={getFullImageUrl(ev.thumbnail)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                      <i className="bi bi-calendar-event text-4xl text-gray-400 dark:text-gray-500"></i>
                    </div>
                  )}
                  {ongoing && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                      Live Now
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-navy dark:text-white group-hover:text-navy-light dark:group-hover:text-gold transition-colors line-clamp-1">
                        {ev.title_en}
                      </h3>
                      {ev.title_km && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                          {ev.title_km}
                        </p>
                      )}
                    </div>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                      ev.is_published 
                        ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' 
                        : 'bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-600'
                    }`}>
                      {ev.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  {ev.description_en && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                      {ev.description_en}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-navy/5 dark:bg-navy/20 text-navy dark:text-navy-light rounded-lg font-medium">
                      <i className="bi bi-calendar3"></i>
                      {formatDateRange(ev.event_date, ev.end_date)}
                    </span>
                    
                    {ev.location_en && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">
                        <i className="bi bi-geo-alt-fill"></i>
                        {ev.location_en}
                      </span>
                    )}
                    
                    {ongoing && (
                      <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium animate-pulse">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Ongoing
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button 
                    onClick={() => openEdit(ev)} 
                    className="w-full sm:w-auto px-4 py-2.5 bg-navy/5 dark:bg-navy/20 text-navy dark:text-navy-light rounded-xl text-sm font-medium hover:bg-navy hover:text-white dark:hover:bg-navy dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <i className="bi bi-pencil group-hover/btn:scale-110 transition-transform"></i> 
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button 
                    onClick={() => setDeleteTarget(ev)} 
                    className="w-full sm:w-auto px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <i className="bi bi-trash group-hover/btn:scale-110 transition-transform"></i> 
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {events.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <i className="bi bi-calendar-event text-4xl text-gray-400 dark:text-gray-500"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Events Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Start creating events to showcase your upcoming activities and engage your audience.
            </p>
            <button 
              onClick={openCreate} 
              className="bg-navy hover:bg-navy-light text-white font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <i className="bi bi-plus-lg"></i> Create Your First Event
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-navy/10 dark:bg-navy/30 rounded-xl flex items-center justify-center">
              <i className={`bi ${editingSlug ? 'bi-pencil' : 'bi-plus-lg'} text-navy dark:text-navy-light text-lg`}></i>
            </span>
            <span>{editingSlug ? 'Edit Event' : 'Create New Event'}</span>
          </div>
        } 
        size="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-translate"></i> Event Title
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
                  placeholder="Enter event title in English"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Khmer Title <span className="text-red-500">*</span>
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

          {/* Date & Time Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-clock"></i> Date & Time
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date/Time <span className="text-red-500">*</span>
                </label>
                <input 
                  type="datetime-local" 
                  value={form.event_date} 
                  onChange={e => setForm({...form, event_date: e.target.value})} 
                  required 
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date/Time
                </label>
                <input 
                  type="datetime-local" 
                  value={form.end_date} 
                  onChange={e => setForm({...form, end_date: e.target.value})} 
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-geo-alt"></i> Location
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location (English)
                </label>
                <input 
                  type="text" 
                  value={form.location_en} 
                  onChange={e => setForm({...form, location_en: e.target.value})} 
                  placeholder="Enter location in English"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ទីតាំង (ភាសាខ្មែរ)
                </label>
                <input 
                  type="text" 
                  value={form.location_km} 
                  onChange={e => setForm({...form, location_km: e.target.value})} 
                  placeholder="បញ្ចូលទីតាំងជាភាសាខ្មែរ"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Thumbnail Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-image"></i> Thumbnail
            </h4>
            <div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={e => { 
                  const f = e.target.files[0]; 
                  if (f) { 
                    setThumbFile(f); 
                    setThumbPreview(URL.createObjectURL(f)); 
                  } 
                }} 
                required={!editingSlug} 
                className="w-full file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-navy-light file:transition-colors file:cursor-pointer" 
              />
              {thumbPreview && (
                <div className="mt-3 relative inline-block group">
                  <img src={thumbPreview} alt="Preview" className="h-32 rounded-xl object-cover shadow-sm" />
                  <button 
                    type="button"
                    onClick={() => {
                      setThumbFile(null);
                      setThumbPreview('');
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
            <h4 className="font-semibold text-navy dark:text-white flex items-center gap-2">
              <i className="bi bi-text-paragraph"></i> Description
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  English Description
                </label>
                <textarea 
                  rows="4" 
                  value={form.description_en} 
                  onChange={e => setForm({...form, description_en: e.target.value})} 
                  placeholder="Enter event description in English"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all resize-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ការពិពណ៌នា (ភាសាខ្មែរ)
                </label>
                <textarea 
                  rows="4" 
                  value={form.description_km} 
                  onChange={e => setForm({...form, description_km: e.target.value})} 
                  placeholder="បញ្ចូលការពិពណ៌នាជាភាសាខ្មែរ"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent dark:bg-gray-700 dark:text-white transition-all resize-none" 
                />
              </div>
            </div>
          </div>

          {/* Publish Toggle */}
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${form.is_published ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                <i className={`bi ${form.is_published ? 'bi-eye' : 'bi-eye-slash'} text-lg`}></i>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Published</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {form.is_published ? 'Event is visible to the public' : 'Event is hidden from the public'}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={form.is_published} 
                onChange={e => setForm({...form, is_published: e.target.checked})} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-navy rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-navy"></div>
            </label>
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
                  {editingSlug ? 'Update Event' : 'Create Event'}
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
        title="Delete Event" 
        message={`Are you sure you want to delete "${deleteTarget?.title_en}"? This action cannot be undone.`} 
      />
    </div>
  );
}