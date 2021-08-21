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

// When everything is async-await))
const onlyOneGender = async (folderOne, folderTwo, gender) => {
    const files = await readDirPromise(folderOne)
    files.forEach(async file => {
        try {
            const data = await readFilePromise(path.join(folderOne, file))
            const data2 = JSON.parse(data)
            if (data2.gender === gender) {
                await renameFSPromise(path.join(folderOne, file), path.join(folderTwo, file))
            }
        } catch (e) {
            console.log("error",e)
        }
    },Error())
}

onlyOneGender(boysPath, girlsPath, female)
onlyOneGender(girlsPath, boysPath, male)



// then time
// const onlyOneGenderThen = (folderOne, folderTwo, gender) => {
//     readDirPromise(folderOne).then(files => {
//         files.forEach(file => {
//             readFilePromise(path.join(folderOne,file)).then(data => {
//                 // readFilePromise(`${folderOne}/${file}`).then(data => {
//                 const data2 = JSON.parse(data)
//                 console.log("data2 ----> ",data2)
//                 if (data2.gender === gender) {
//                     renameFSPromise(path.join(folderOne,file),path.join(folderTwo,file))
//                         // renameFSPromise(`${folderOne}/${file}`,`${folderTwo}/${file}`)
//                         .finally(() => console.log("Сортування за статтю завершено"))
//                 }
//             })
//         })
//     });
// }
//
// onlyOneGenderThen(boysPath, girlsPath, female)
// onlyOneGenderThen(girlsPath, boysPath, male)




// before then
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

