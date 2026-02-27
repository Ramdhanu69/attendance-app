function subjectsToCsv(subjects) {
  const header = ['id', 'name', 'category', 'attended', 'total'];
  const lines = [header.join(',')];
  subjects.forEach(s => {
    lines.push([s.id, s.name, s.category, s.attended, s.total].join(','));
  });
  return lines.join('\n');
}

module.exports = {
  subjectsToCsv,
};
