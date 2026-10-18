const { Student } = require('./models');
const { fetchStudents } = require('./database');
const { calculateClassAverage, findTopStudent, filterStudents } = require('./analytics');

console.log("Fetching data from database...");

fetchStudents((rawData) => {
    console.log("Data received!\n");

    // Convert raw data into Student class instances
    const students = rawData.map(s => new Student(s.id, s.name, s.courses));

    // Test immutability of the id property
    console.log("Testing Immutability:");
    console.log(`Original ID: ${students[0].id}`);
    const descriptor = Object.getOwnPropertyDescriptor(students[0], "id");
    console.log(`ID is read-only: ${!descriptor.writable && !descriptor.configurable}`);
    console.log("Attempting to change ID to 999...");
    students[0].id = 999; // Should silently fail (non-writable)
    console.log(`Final ID: ${students[0].id} (Success: ID did not change)\n`);

    console.log("--- Analytics Report ---");

    // Class average for course 101
    const avg101 = calculateClassAverage(students, 101);
    console.log(`Class Average for Course 101: ${avg101.toFixed(2)}`);

    // Top student
    const topStudent = findTopStudent(students);
    if (topStudent) {
        console.log(`Top Student: ${topStudent.name} (Average: ${topStudent.getAverage()})`);
    } else {
        console.log("Top Student: none (no student data available)");
    }

    // Students who took course 102
    const studentsInCourse102 = filterStudents(students, (student) =>
        student.courses.some(c => c.courseId === 102)
    );
    const names = studentsInCourse102.map(s => s.name).join(", ");
    console.log(`Students in Course 102: ${names}`);
});
