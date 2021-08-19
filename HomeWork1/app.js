const fs = require("fs");
const path = require("path");
const util = require("util");

const boysPath = path.join(__dirname, 'boys');
const girlsPath = path.join(__dirname, 'girls');
const male = 'male';
const female = 'female';
const readDirPromise = util.promisify(fs.readdir);
const readFilePromise = util.promisify(fs.readFile);
const renameFSPromise = util.promisify(fs.rename);


const onlyOneGender = (folderOne, folderTwo, gender) => {
    readDirPromise(folderOne).then(files => {
        files.forEach(file => {
            readFilePromise(`${folderOne}/${file}`).then(data => {
                const data2 = JSON.parse(data)
                console.log("data2 ----> ",data2)
                if (data2.gender === gender) {
                    renameFSPromise(`${folderOne}/${file}`,`${folderTwo}/${file}`)
                        .finally(() => console.log("Сортування за статтю завершено"))
                }
            })
        })
    });
}

onlyOneGender(boysPath, girlsPath, female)
onlyOneGender(girlsPath, boysPath, male)








// const onlyOneGender = (folderOne, folderTwo, gender) => {
//     fs.readdir(folderOne, (err, files) => {
//         if (err) {
//             console.log(err)
//             return
//         }
//         files.forEach(file => {
//             fs.readFile(`${folderOne}/${file}`, "utf8",
//                 (error, data) => {
//                     if (error) throw error;
//                     const afterParty = JSON.parse(data)
//                     console.log(afterParty)
//                     if (afterParty.gender === gender) {
//                         fs.rename(`${folderOne}/${file}`, `${folderTwo}/${file}`, () => {
//                             console.log("Сортування за статтю завершено")
//                         })
//                     }
//                 });
//         })
//     });
// }
//
// onlyOneGender(boysPath, girlsPath, female)
// onlyOneGender(girlsPath, boysPath, male)

