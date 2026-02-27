// SubjectModal component loaded via Babel; attaches to window
window.SubjectModal = function SubjectModal({ subject, onSave, onDelete, onClose }) {
  const [name, setName] = React.useState(subject ? subject.name : '');
  const [attended, setAttended] = React.useState(subject ? subject.attended : 0);
  const [total, setTotal] = React.useState(subject ? subject.total : 0);
  const [error, setError] = React.useState('');
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name required');
      return;
    }
    if (total < attended) {
      setError('Total cannot be less than attended');
      return;
    }
    onSave({ id: subject?.id, name, attended: Number(attended), total: Number(total) });
  }

  function markAttended() {
    setAttended(prev => Number(prev) + 1);
    setTotal(prev => Number(prev) + 1);
  }

  function markAbsent() {
    setTotal(prev => Number(prev) + 1);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <form
        ref={modalRef}
        onSubmit={handleSubmit}
        className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-sm shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">{subject ? 'Edit' : 'Add'} Subject</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && <div className="text-red-400 text-sm mb-4 bg-red-400/10 p-2 rounded border border-red-400/20">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Subject Name
            <input
              type="text"
              className="mt-1 w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Mathematics"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Attended
              <input
                type="number"
                min="0"
                className="mt-1 w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={attended}
                onChange={e => setAttended(Number(e.target.value))}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Total Classes
              <input
                type="number"
                min="0"
                className="mt-1 w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={total}
                onChange={e => setTotal(Number(e.target.value))}
              />
            </label>
          </div>
        </div>

        {/* Quick Actions (Only show if editing an existing subject) */}
        {subject && (
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={markAttended}
              className="flex-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              + Attended
            </button>
            <button
              type="button"
              onClick={markAbsent}
              className="flex-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              - Absent
            </button>
          </div>
        )}

        {/* Updated Footer with Delete Button */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-700 mt-2">
          <div>
            {subject && (
              <button
                type="button"
                onClick={() => onDelete(subject.id)}
                className="text-sm font-medium text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 px-3 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}