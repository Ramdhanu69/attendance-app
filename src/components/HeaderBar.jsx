// HeaderBar component loaded via Babel; attaches to window
window.HeaderBar = function HeaderBar({ onExport }) {
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Attendance Dashboard</h1>
      <CSVExportButton onClick={onExport} />
    </header>
  );
}
