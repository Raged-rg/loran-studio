const fs = require('fs');

async function downloadYarn() {
    console.log("Downloading standalone Yarn CLI...");
    const url = "https://cdn.jsdelivr.net/npm/yarn@1.22.22/lib/cli.js";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch Yarn: ${response.statusText}`);
        }
        const buffer = await response.arrayBuffer();
        fs.writeFileSync("yarn.cjs", Buffer.from(buffer));
        console.log("Successfully downloaded yarn.cjs!");
    } catch (error) {
        console.error("Error downloading Yarn:", error);
        process.exit(1);
    }
}

downloadYarn();
