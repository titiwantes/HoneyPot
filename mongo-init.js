db.createUser({
    user: 'root',
    pwd: 'toor',
    roles: [
        {
            role: 'readWrite',
            db: 'UniversityDB',
        }
    ]
});

db = new Mongo().getDB("UniversityDB");

db.createCollection('students', { capped: false });

db.students.insert([
    {
        "name": "Arthur",
        "age": 21
    },
    {
        "name": "Thierry",
        "age": 22,
    },
]);