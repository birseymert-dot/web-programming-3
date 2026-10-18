const assert = require('node:assert');
const { Student } = require('./models');
const { calculateClassAverage, findTopStudent, filterStudents } = require('./analytics');

const ali = new Student(1, 'Ali', [{ courseId: 101, grade: 90 }, { courseId: 102, grade: 85 }]);
const zeynep = new Student(2, 'Zeynep', [{ courseId: 101, grade: 70 }, { courseId: 102, grade: 95 }]);
const ahmet = new Student(3, 'Ahmet', [{ courseId: 101, grade: 60 }, { courseId: 102, grade: 55 }]);
const students = [ali, zeynep, ahmet];

const tests = [
    ['Student id is immutable', () => {
        ali.id = 999;
        assert.strictEqual(ali.id, 1);
    }],
    ['getAverage returns the mean grade', () => {
        assert.strictEqual(ali.getAverage(), 87.5);
        assert.strictEqual(new Student(4, 'Empty').getAverage(), 0);
    }],
    ['addCourse appends a course', () => {
        const s = new Student(5, 'Test');
        s.addCourse(103, 80);
        assert.deepStrictEqual(s.courses, [{ courseId: 103, grade: 80 }]);
    }],
    ['addCourse rejects invalid grades', () => {
        const s = new Student(6, 'Test');
        assert.throws(() => s.addCourse(103, 150), RangeError);
        assert.throws(() => s.addCourse(103, 'A'), RangeError);
        assert.throws(() => s.addCourse(103, NaN), RangeError);
    }],
    ['calculateClassAverage averages one course', () => {
        assert.ok(Math.abs(calculateClassAverage(students, 101) - 73.3333) < 0.001);
        assert.strictEqual(calculateClassAverage(students, 999), 0);
    }],
    ['findTopStudent returns the highest average', () => {
        assert.strictEqual(findTopStudent(students).name, 'Ali');
        assert.strictEqual(findTopStudent([]), null);
    }],
    ['filterStudents applies the criteria function', () => {
        const result = filterStudents(students, s => s.getAverage() > 80);
        assert.deepStrictEqual(result.map(s => s.name), ['Ali', 'Zeynep']);
    }]
];

let failed = 0;
for (const [name, fn] of tests) {
    try {
        fn();
        console.log(`PASS  ${name}`);
    } catch (err) {
        failed++;
        console.log(`FAIL  ${name}\n      ${err.message}`);
    }
}

console.log(`\n${tests.length - failed}/${tests.length} tests passed`);
process.exit(failed === 0 ? 0 : 1);
