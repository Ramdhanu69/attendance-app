window.AddSubjectButton = function AddSubjectButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm
        ${disabled 
          ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
          : 'bg-brand-500 hover:bg-brand-600 text-white hover:shadow-md'}
      `}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
      </svg>
      <span>Add</span>
    </button>
  );
}