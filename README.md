# University Course Management System

## File Organization
```
/
├── models.js      Student class (immutable id via Object.defineProperty, addCourse, getAverage)
├── database.js     fetchStudents(callback) — simulates a 2s async DB call with setTimeout
├── analytics.js    calculateClassAverage, findTopStudent, filterStudents (higher-order function)
├── main.js         Entry point: fetches data, builds Student instances, runs the report
├── tests.js        Dependency-free tests (node:assert) for models and analytics
├── package.json    npm scripts (start, test)
└── README.md       This file
```

## How to Run
```
node main.js      # or: npm start
npm test          # runs tests.js
```

With the provided data, the report shows a Course 101 average of `73.33`,
Ali as the top student with an average of `87.5`, and all three students in
Course 102. The assignment's sample labels Zeynep as the top student, but
Ali's grades (90 and 85) give him the higher average.

## Implementation Notes
- `Student`'s `id` is defined with `Object.defineProperty` using
  `writable: false` and `configurable: false`, so any later assignment to
  `student.id` silently fails (no error in non-strict mode, the value just
  stays the same) — this is demonstrated in `main.js`.
- `fetchStudents` uses `setTimeout` to simulate a 2-second network delay
  before invoking the callback with the raw data array.
- `findTopStudent` uses `.reduce()` to compare each student's
  `getAverage()` and keep the one with the highest value.
- `filterStudents` is a generic higher-order function: it just wraps
  `Array.prototype.filter` with a caller-supplied `criteriaFn`, so it can be
  reused for any condition (e.g., "took course 102", "average above 80").

- `addCourse` validates that a grade is a number between 0 and 100 and
  throws a `RangeError` otherwise.
- `findTopStudent` returns `null` for an empty list (a bare `.reduce()`
  would throw), and `main.js` handles that case.

## Challenges Faced
- Making the `id` property truly immutable required using
  `Object.defineProperty` instead of a normal constructor assignment,
  since a plain `this.id = id` would still allow later reassignment.
- Coordinating the asynchronous `fetchStudents` call meant all of the
  analytics logic in `main.js` had to live inside the callback, since the
  data isn't available until the simulated 2-second delay completes.
- The sample output in the assignment shows "Top Student: Zeynep (Average:
  82.5)", but with the provided dataset Ali actually has the highest
  average (87.5) and Zeynep is second (82.5) — this implementation reports
  the mathematically correct top student based on the given data.
