## How to run

1. Install [Node.js](https://nodejs.org) (v18 or newer).

2. Get the code and install dependencies:

```
git fetch
git checkout main
git pull
npm install
```

3. Download the real camera data from OpenStreetMap (can take a few minutes)
```
node server/db/download.js
```
if it says server is busy, wait a few minutes and try again.

4. Build the database and import the cameras:
```

node server/db/importCameras.js
```

5. Start the app
```

node server/app.js
```

then open http://localhost:3000

**Troubleshooting**
-`no such column: latitude`: You have an old data base. Delete `server/db/flocker.db` and run step 4 again.
`running scripts is disabled` (Windows PowerShell): run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.
-The camera data file  (`alpr.json`) and database (`flocker.db`) are not on GitHub because they're large or generated. Each person creates them with steps 3–4.