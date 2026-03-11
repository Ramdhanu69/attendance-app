import React, { useEffect, useState } from 'react';
import SubjectCircle from './SubjectCircle';
import SubjectModal from './SubjectModal';
import HeaderBar from './HeaderBar';
import AddSubjectButton from './AddSubjectButton';
import Toast from './Toast';

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('/subjects')
      .then(r => r.json())
      .then(setSubjects);
  }, []);

  function refresh() {
    fetch('/subjects').then(r => r.json()).then(setSubjects);
  }

  function exportCsv() {
    fetch('/export/csv')
      .then(res => res.text())
      .then(csv => {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'attendance.csv';
        a.click();
        URL.revokeObjectURL(url);
      });
  }

  function openNew() {
    setEditing(null);
    setShowModal(true);
  }

  function openEdit(subj) {
    setEditing(subj);
    setShowModal(true);
  }

  function handleSave(updated) {
    const method = updated.id ? 'PUT' : 'POST';
    const url = updated.id ? `/subjects/${updated.id}` : '/subjects';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
      .then(res => res.json())
      .then(refresh);
    setShowModal(false);
    setToast({ message: 'Saved', type: 'success' });
  }

  return (
    <div className="container mx-auto p-4">
      <HeaderBar onExport={exportCsv} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {subjects.map(s => (
          <SubjectCircle key={s.id} subject={s} onClick={() => openEdit(s)} />
        ))}
        <AddSubjectButton onClick={openNew} disabled={subjects.length >= 15} />
      </div>
      {subjects.length >= 15 && <p className="text-red-500 mt-4">Maximum of 15 subjects reached</p>}

      {showModal && (
        <SubjectModal
          subject={editing}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
