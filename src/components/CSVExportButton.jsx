// CSVExportButton component loaded via Babel; attaches to window
window.CSVExportButton = function CSVExportButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2"
    >
      <img src="/public/assets/export.svg" alt="Export" className="w-5 h-5 mr-1" />
      Export CSV
    </button>
  );
}
