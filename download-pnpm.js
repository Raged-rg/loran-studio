const fs = require('fs');
const path = require('path');

async function downloadFile(urlPath, localPath) {
    const url = `https://unpkg.com/pnpm/${urlPath}`;
    console.log(`Downloading ${url} to ${localPath}...`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
    fs.writeFileSync(localPath, Buffer.from(buffer));
    console.log(`Successfully downloaded ${localPath}!`);
}

async function download() {
    try {
        await downloadFile("bin/pnpm.cjs", "bin/pnpm.cjs");
        await downloadFile("bin/pnpm.mjs", "bin/pnpm.mjs");
        await downloadFile("dist/pnpm.mjs", "dist/pnpm.mjs");
        console.log("All pnpm CLI files downloaded successfully in correct structure!");
    } catch (error) {
        console.error("Error downloading files:", error);
        process.exit(1);
    }
}

download();
