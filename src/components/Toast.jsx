// Toast component loaded via Babel; attaches to window
// Simple toast notification component. position fixed bottom-right.
// Props: message (string), type ('success'|'error'), onClose (function)
window.Toast = function Toast({ message, type = 'success', onClose }) {
  const bg = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 text-white rounded shadow-lg ${bg}`}
      role="alert"
    >
      {message}
      <button
        onClick={onClose}
        className="ml-2 font-bold"
        aria-label="Close"
      >&times;</button>
    </div>
  );
}
