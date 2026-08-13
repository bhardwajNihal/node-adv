const { log } = require('console');
const fs = require('fs');

// const text = fs.readFileSync("test_1.txt", "utf-8");

// console.log(text);

// fs.writeFileSync("test_1.txt", "updated text!!");

// console.log(text);

// fs.appendFileSync("test_1.txt", " (this part is appended!)")


// fs.appendFileSync("test_1.txt", " (this part is appended again!)")

// console.log(text);



// fs.mkdirSync("test2/a/b/c", {recursive: true})      // create folder, inside folder(recursive)


// // to delete files
// fs.rm("test2", {recursive: true})       // rmdirSync deprecated in newer versions


// readfile --> read file asynchronously, for non-blocking operations,
        /// better for larger file reading task where, time required to read the file is high, so other tasks are performed uninterrupted

fs.readFile("test_1.txt", "utf-8", (err, data) => {

    if(err) console.error(err.message);
    else console.log(data);
    
})


// this will be carried out 1st
console.log("later tasks");
