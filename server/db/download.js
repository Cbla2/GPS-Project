const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");

const query = '[out:json][timeout:600];area["ISO3166-1"="US"][admin_level=2]->.us;node["surveillance:type"="ALPR"](area.us);out body;';

const servers = [
       "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter"
];

async function download() {
    for (const server of servers) {
        try {
            console.log("Trying", servers, "Can take 1-3 mins");
            const response = await fetch(server, {
            method: "POST",
            body: new URLSearchParams({ data: query })
        });

        if(!response.ok){
            console.log("Server responded", response.status, "trying next");

            continue;
        }

        const text = await response.text();
        fs.writeFileSync(path.join(__dirname, "alpr.json"), text);
        console.log("Saved alpr.json:", text.length, "characters");
        return;
    } catch (error) {
        console.log("Failed:", error.message, "trying next");
    }
}

console.log("All servers filed. Try again in a few minutes");

}

download();