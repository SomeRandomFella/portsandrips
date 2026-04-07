const fs = require("fs");
const path = require("path");

const SCAN_DIR = __dirname;
const MAX_SIZE = 19 * 1024 * 1024;
const CHUNK_SIZE = MAX_SIZE;

function getAllFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (entry.isFile()) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function splitFile(filePath) {
  const stat = fs.statSync(filePath);
  const totalSize = stat.size;
  const totalParts = Math.ceil(totalSize / CHUNK_SIZE);
  const fileName = path.basename(filePath);
  const dir = path.dirname(filePath);

  // Use FIRST dot to split, so "dotnet.native.uey65rbv7y.wasm0"
  // becomes base="dotnet", ext=".native.uey65rbv7y.wasm0"
  // and "Content.tar00" becomes base="Content", ext=".tar00"
  const firstDot = fileName.indexOf(".");
  const base = firstDot !== -1 ? fileName.slice(0, firstDot) : fileName;
  const ext = firstDot !== -1 ? fileName.slice(firstDot) : "";

  console.log(`\n[SPLITTING] ${filePath}`);
  console.log(
    `  Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB → ${totalParts} parts`,
  );
  console.log(`  Base: "${base}"  Ext: "${ext}"`);

  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.alloc(CHUNK_SIZE);

  for (let i = 0; i < totalParts; i++) {
    const partNum = String(i + 1).padStart(3, "0");
    const partName = `${base}.part${partNum}${ext}`;
    const partPath = path.join(dir, partName);
    const bytesRead = fs.readSync(fd, buffer, 0, CHUNK_SIZE, i * CHUNK_SIZE);
    const chunk = buffer.slice(0, bytesRead);
    fs.writeFileSync(partPath, chunk);
    console.log(
      `  → ${partName} (${(chunk.length / 1024 / 1024).toFixed(2)} MB)`,
    );
  }

  fs.closeSync(fd);
  fs.unlinkSync(filePath);
  console.log(`  ✓ Original deleted: ${fileName}`);
}

function main() {
  if (!fs.existsSync(SCAN_DIR)) {
    console.error(`Directory not found: ${SCAN_DIR}`);
    process.exit(1);
  }

  console.log(`Scanning: ${path.resolve(SCAN_DIR)}`);
  console.log(`Split threshold: 19 MB\n`);

  const allFiles = getAllFiles(SCAN_DIR);
  const largeFiles = allFiles.filter((f) => {
    const name = path.basename(f);
    // Skip already-split parts, manifests, count files, js, html, json
    if (name.match(/\.part\d+/)) return false;
    if (name.includes(".split_manifest.json")) return false;
    if (name.endsWith(".count")) return false;
    if (name.endsWith(".js")) return false;
    if (name.endsWith(".html")) return false;
    if (name.endsWith(".json")) return false;
    return fs.statSync(f).size > MAX_SIZE;
  });

  if (largeFiles.length === 0) {
    console.log("No files found over 19 MB. Nothing to do.");
    return;
  }

  console.log(`Found ${largeFiles.length} file(s) over 19 MB:`);
  largeFiles.forEach((f) => {
    const mb = (fs.statSync(f).size / 1024 / 1024).toFixed(2);
    console.log(`  ${f} (${mb} MB)`);
  });

  console.log("\nStarting splits...");
  let success = 0;
  let failed = 0;

  for (const file of largeFiles) {
    try {
      splitFile(file);
      success++;
    } catch (err) {
      console.error(`[ERROR] Failed to split ${file}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n=============================`);
  console.log(`Done! ${success} file(s) split, ${failed} failed.`);
}

main();
