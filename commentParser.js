"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var SRC_FOLDER = path.join(__dirname, 'src');
var OUTPUT_FILE = path.join(__dirname, 'comments.md');
function getAllFiles(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
        var filePath = path.join(dir, file);
        var stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(filePath));
        }
        else if (file.endsWith('.ts')) {
            results.push(filePath);
        }
    });
    return results;
}
function extractComments(content) {
    var commentRegex = /\/\*\*([\s\S]*?)\*\//g;
    var comments = [];
    var match;
    while ((match = commentRegex.exec(content)) !== null) {
        comments.push(match[0]);
    }
    return comments;
}
function writeCommentsToFile(comments) {
    var content = comments.join('\n\n---\n\n');
    fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
    console.log("\u2705 Comments extracted and written to: ".concat(OUTPUT_FILE));
}
function main() {
    var files = getAllFiles(SRC_FOLDER);
    var allComments = [];
    files.forEach(function (file) {
        var content = fs.readFileSync(file, 'utf-8');
        var comments = extractComments(content);
        if (comments.length > 0) {
            allComments.push("### ".concat(file.replace(SRC_FOLDER + '/', ''), "\n\n"));
            allComments.push.apply(allComments, comments);
        }
    });
    if (allComments.length > 0) {
        writeCommentsToFile(allComments);
    }
    else {
        console.log('❌ No comments found.');
    }
}
main();
