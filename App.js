const fs = require('fs');
const path = require('path');

// รายชื่อไฟล์ที่ต้องการอ่าน
const fileNames = ['head.txt', 'body.txt', 'leg.txt', 'feet.txt'];

// อ่านข้อมูลจากไฟล์แต่ละไฟล์
const readFilePromises = fileNames.map((fileName) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, fileName); // ใช้ __dirname เพื่อระบุเส้นทางของไฟล์ในไดเรกทอรีปัจจุบัน
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
});

Promise.all(readFilePromises)
    .then((fileContents) => {
        // นำ String จากไฟล์แต่ละไฟล์มาต่อกัน
        const combinedContent = fileContents.join('\n');

        // เขียนข้อมูลลงในไฟล์ robot.txt
        fs.writeFile('robot.txt', combinedContent, (err) => {
            if (err) {
                console.error('เกิดข้อผิดพลาดในการเขียนไฟล์ robot.txt');
            } else {
                console.log('สร้างไฟล์ robot.txt เรียบร้อย');
            }
        });
    })
    .catch((err) => {
        console.error('เกิดข้อผิดพลาดในการอ่านไฟล์', err);
    });
