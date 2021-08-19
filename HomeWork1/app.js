const fs = require("fs")
const path = require("path")

const boysPath = path.join(__dirname, 'boys')
const girlsPath = path.join(__dirname, 'girls')
const male = 'male'
const female = 'female'

const onlyOneGender = (folderOne, folderTwo, gender) => {
    fs.readdir(folderOne, (err, files) => {
        if (err) {
            console.log(err)
            return
        }
        files.forEach(file => {
            fs.readFile(`${folderOne}/${file}`, "utf8",
                (error, data) => {
                    if (error) throw error;
                    const afterParty = JSON.parse(data)
                    console.log(afterParty)
                    if (afterParty.gender === gender) {
                        fs.rename(`${folderOne}/${file}`, `${folderTwo}/${file}`, () => {
                            console.log("Сортування за статтю завершено")
                        })
                    }
                });
        })
    });
}

onlyOneGender(boysPath, girlsPath, female)
onlyOneGender(girlsPath, boysPath, male)

