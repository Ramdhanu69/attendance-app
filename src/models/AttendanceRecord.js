// AttendanceRecord model
class AttendanceRecord {
  constructor({ id, subjectId, date, attended }) {
    this.id = id;
    this.subjectId = subjectId;
    this.date = date; // ISO string
    this.attended = attended; // boolean
  }

  toJSON() {
    return {
      id: this.id,
      subjectId: this.subjectId,
      date: this.date,
      attended: this.attended,
    };
  }
}

module.exports = AttendanceRecord;
