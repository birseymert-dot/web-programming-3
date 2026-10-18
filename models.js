function validateGrade(grade) {
    if (typeof grade !== 'number' || Number.isNaN(grade) || grade < 0 || grade > 100) {
        throw new RangeError(`Invalid grade "${grade}": must be a number between 0 and 100`);
    }
}

class Student {
    constructor(id, name, courses = []) {
        Object.defineProperty(this, 'id', {
            value: id,
            writable: false,
            configurable: false,
            enumerable: true
        });

        this.name = name;
        this.courses = courses.map(c => {
            validateGrade(c.grade);
            return { courseId: c.courseId, grade: c.grade };
        });
    }

    addCourse(courseId, grade) {
        validateGrade(grade);
        this.courses.push({ courseId, grade });
    }

    getAverage() {
        if (this.courses.length === 0) return 0;
        const total = this.courses.reduce((sum, c) => sum + c.grade, 0);
        return total / this.courses.length;
    }
}

module.exports = { Student };
