jest.mock('uuid', () => ({ v4: () => 'test-id' }));
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const subjectsRouter = require('../src/api/subjects');
const attendanceRouter = require('../src/api/attendance');
const exportRouter = require('../src/api/export');
const { writeData } = require('../src/utils/storage');

// create app just for tests
const app = express();
app.use(bodyParser.json());
app.use('/subjects', subjectsRouter);
app.use('/subjects', attendanceRouter);
app.use('/export', exportRouter);

beforeEach(() => {
  // reset storage
  writeData({ subjects: [], attendance: [], users: [] });
});

describe('Attendance API', () => {
  test('can add subject and retrieve it', async () => {
    await request(app).post('/subjects').send({ name: 'Math', category: 'Core' }).expect(200);
    const res = await request(app).get('/subjects').expect(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Math');
  });

  test('mark attended increments numbers', async () => {
    const sub = (await request(app).post('/subjects').send({ name: 'Math', category: 'Core' })).body;
    await request(app).post(`/subjects/${sub.id}/attendance`).send({ date: '2026-02-26', attended: true }).expect(200);
    const list = (await request(app).get('/subjects')).body;
    expect(list[0].attended).toBe(1);
    expect(list[0].total).toBe(1);
  });

  test('mark absent increments total only', async () => {
    const sub = (await request(app).post('/subjects').send({ name: 'Math', category: 'Core' })).body;
    await request(app).post(`/subjects/${sub.id}/attendance`).send({ date: '2026-02-27', attended: false }).expect(200);
    const list = (await request(app).get('/subjects')).body;
    expect(list[0].attended).toBe(0);
    expect(list[0].total).toBe(1);
  });

  test('cannot add more than 10 subjects', async () => {
    for (let i = 0; i < 10; i++) {
      await request(app).post('/subjects').send({ name: `S${i}`, category: 'Cat' }).expect(200);
    }
    await request(app).post('/subjects').send({ name: 'Extra', category: 'Cat' }).expect(400);
  });

  test('export csv returns correct format', async () => {
    await request(app).post('/subjects').send({ name: 'Math', category: 'Core' });
    const res = await request(app).get('/export/csv').expect(200);
    expect(res.text).toMatch(/id,name,category,attended,total/);
  });
});
