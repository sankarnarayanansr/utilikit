import * as fs from 'fs';
import * as path from 'path';

const SRC_FOLDER = path.join(__dirname, 'src');
const OUTPUT_FILE = path.join(__dirname, 'comments.md');

function getAllFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(filePath));
        } else if (file.endsWith('.ts')) {
            results.push(filePath);
        }
    });

    return results;
}

function extractComments(content: string): string[] {
    const commentRegex = /\/\*\*([\s\S]*?)\*\//g;
    const comments: string[] = [];

    let match;
    while ((match = commentRegex.exec(content)) !== null) {
        comments.push(match[0]);
    }

    return comments;
}

function writeCommentsToFile(comments: string[]): void {
    const content = comments.join('\n\n---\n\n');
    fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
    console.log(`✅ Comments extracted and written to: ${OUTPUT_FILE}`);
}

function main() {
    const files = getAllFiles(SRC_FOLDER);
    let allComments: string[] = [];

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf-8');
        const comments = extractComments(content);

        if (comments.length > 0) {
            allComments.push(`### ${file.replace(SRC_FOLDER + '/', '')}\n\n`);
            allComments.push(...comments);
        }
    });

    if (allComments.length > 0) {
        writeCommentsToFile(allComments);
    } else {
        console.log('❌ No comments found.');
    }
}

main();