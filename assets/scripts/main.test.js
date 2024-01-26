

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("play.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
})

