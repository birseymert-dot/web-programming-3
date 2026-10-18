function calculateClassAverage(students, courseId) {

    const grades = students.flatMap((student) =>
        student.courses
            .filter((course) => course.courseId === courseId)
            .map((course) => course.grade)
    );
   
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return total / grades.length;
}

function findTopStudent(students) {
    // reduce() without an initial value throws on an empty array
    if (students.length === 0) return null;

    return students.reduce((top, current) => {
        return current.getAverage() > top.getAverage() ? current : top;
    });
}

function filterStudents(students, criteriaFn) {
    return students.filter(criteriaFn);
}

module.exports = { calculateClassAverage, findTopStudent, filterStudents };
