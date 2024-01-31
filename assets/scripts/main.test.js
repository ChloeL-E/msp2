const { addSum } = require("./main");


beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("play-game.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
})

describe("", () => {
    test("", () => {
        expect().toBe();
    });
})
