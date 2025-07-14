import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Asset download functionality
const downloadedAssets = new Set();
const assetQueue = [];

async function downloadAsset(imageUrl, localPath) {
  return new Promise((resolve, reject) => {
    // Ensure directory exists
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Skip if already exists
    if (fs.existsSync(localPath)) {
      console.log(`  ✓ Asset already exists: ${path.basename(localPath)}`);
      resolve(localPath);
      return;
    }

    const fullUrl = `https://terraria.wiki.gg${imageUrl}`;
    const protocol = fullUrl.startsWith("https:") ? https : http;

    console.log(`  📥 Downloading: ${path.basename(localPath)}`);

    const file = fs.createWriteStream(localPath);

    // Add headers to mimic a browser request
    const options = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        DNT: "1",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    };

    const request = protocol.get(fullUrl, options, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`  ✅ Downloaded: ${path.basename(localPath)}`);
          resolve(localPath);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        file.close();
        fs.unlink(localPath, () => {});
        const redirectUrl = response.headers.location;
        console.log(`  🔄 Redirecting to: ${redirectUrl}`);
        // Recursively download from redirect URL
        downloadAsset(
          redirectUrl.replace("https://terraria.wiki.gg", ""),
          localPath
        )
          .then(resolve)
          .catch(reject);
      } else {
        fs.unlink(localPath, () => {}); // Delete partial file
        reject(
          new Error(
            `Failed to download ${fullUrl}: ${response.statusCode} ${response.statusMessage}`
          )
        );
      }
    });

    request.on("error", (err) => {
      fs.unlink(localPath, () => {}); // Delete partial file
      reject(err);
    });

    file.on("error", (err) => {
      fs.unlink(localPath, () => {}); // Delete partial file
      reject(err);
    });

    // Set a timeout for the request
    request.setTimeout(30000, () => {
      request.destroy();
      fs.unlink(localPath, () => {});
      reject(new Error(`Download timeout for ${fullUrl}`));
    });
  });
}

function queueAssetForDownload(
  imageUrl,
  assetsDir,
  gameStage,
  className,
  itemType
) {
  // Create a unique key for this asset location
  const assetKey = `${gameStage}/${className}/${itemType}/${imageUrl}`;

  if (downloadedAssets.has(assetKey)) {
    // Find existing asset and return its relative path
    const existingAsset = assetQueue.find(
      (asset) =>
        asset.url === imageUrl &&
        asset.relativePath.startsWith(`${gameStage}/${className}/${itemType}/`)
    );
    if (existingAsset) {
      return existingAsset.relativePath;
    }
  }

  downloadedAssets.add(assetKey);

  // Extract filename from URL and create hierarchical path
  const urlParts = imageUrl.split("/");
  const filename = urlParts[urlParts.length - 1].split("?")[0]; // Remove query params

  // Create organized folder structure: /gamestage/className/itemType/file.png
  const relativePath = path.join(gameStage, className, itemType, filename);
  const fullLocalPath = path.join(assetsDir, relativePath);

  assetQueue.push({
    url: imageUrl,
    localPath: fullLocalPath,
    relativePath: relativePath,
    filename: filename,
  });

  return relativePath; // Return relative path for the JSON
}

async function downloadAllAssets() {
  console.log(`\n📦 Starting download of ${assetQueue.length} assets...`);

  // Download assets with rate limiting (5 concurrent downloads)
  const batchSize = 5;
  const successful = [];

  for (let i = 0; i < assetQueue.length; i += batchSize) {
    const batch = assetQueue.slice(i, i + batchSize);
    const batchPromises = batch.map((asset) =>
      downloadAsset(asset.url, asset.localPath).catch((err) => {
        console.error(`❌ Failed to download ${asset.filename}:`, err.message);
        return null;
      })
    );

    const batchResults = await Promise.all(batchPromises);
    successful.push(...batchResults.filter((result) => result !== null));

    // Add a small delay between batches to be respectful to the server
    if (i + batchSize < assetQueue.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  console.log(
    `\n✨ Download complete! ${successful.length}/${assetQueue.length} assets downloaded successfully.`
  );
  return successful.length;
}

// Game stage mapping for vanilla Terraria
const stageMapping = {
  "pre-boss": {
    title: "Pre-Boss",
    icon: "🗡️",
    color: "text-green-400",
  },
  "pre-skeletron": {
    title: "Pre-Skeletron",
    icon: "💀",
    color: "text-gray-400",
  },
  "pre-wall-of-flesh": {
    title: "Pre-Wall of Flesh",
    icon: "🔥",
    color: "text-red-400",
  },
  "pre-mech-boss": {
    title: "Pre-Mechanical Boss",
    icon: "🤖",
    color: "text-blue-400",
  },
  "pre-plantera": {
    title: "Pre-Plantera",
    icon: "🌱",
    color: "text-green-500",
  },
  "pre-golem": {
    title: "Pre-Golem",
    icon: "🗿",
    color: "text-orange-400",
  },
  "pre-lunar": {
    title: "Pre-Lunar Events",
    icon: "🌙",
    color: "text-indigo-400",
  },
  "pre-moon-lord": {
    title: "Pre-Moon Lord",
    icon: "🌙",
    color: "text-purple-400",
  },
  endgame: {
    title: "Endgame",
    icon: "🏆",
    color: "text-gold-400",
  },
};

// Class mapping for vanilla Terraria
const classMapping = {
  Melee: "melee",
  Ranged: "ranged",
  Magic: "magic",
  Summoning: "summoner",
  Mixed: "mixed",
};

function parseMarkdownFile(filePath, assetsDir, gameStage) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const classes = {};
  let currentClass = null;
  let currentSection = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Check if this is a class header
    if (classMapping[trimmedLine]) {
      currentClass = classMapping[trimmedLine];
      classes[currentClass] = {
        weapons: [],
        armor: [],
        accessories: [],
        buffsPotionsAmmo: [],
      };
      currentSection = null;
      continue;
    }

    // Handle different section headers based on vanilla structure
    if (
      trimmedLine === "Single-Target Weapons" ||
      trimmedLine === "Crowd Control Weapons" ||
      trimmedLine === "Crowd-Control Weapons" ||
      trimmedLine === "Support Weapons" ||
      trimmedLine === "Minions" ||
      trimmedLine === "Whips"
    ) {
      if (currentClass) {
        currentSection = "weapons";
      }
      continue;
    }

    // Handle ammunition categories - these go into buffsPotionsAmmo
    if (
      trimmedLine === "Single-Target Ammunition" ||
      trimmedLine === "Crowd-Control Ammunition"
    ) {
      if (currentClass) {
        currentSection = "buffsPotionsAmmo";
      }
      continue;
    }

    if (
      trimmedLine.includes("Armor") ||
      trimmedLine === "Defensive" ||
      trimmedLine === "Glass Cannon"
    ) {
      if (currentClass) {
        currentSection = "armor";
      }
      continue;
    }

    if (
      trimmedLine === "Accessories" ||
      trimmedLine === "Mobility Accessories" ||
      trimmedLine === "Survivability Accessories" ||
      trimmedLine === "Offensive Accessories"
    ) {
      if (currentClass) {
        currentSection = "accessories";
      }
      continue;
    }

    if (trimmedLine === "Buffs/Potions") {
      if (currentClass) {
        currentSection = "buffsPotionsAmmo";
      }
      continue;
    }

    // Skip header lines like "Best", "Pre-Bosses", etc.
    if (
      trimmedLine === "Best" ||
      trimmedLine === "Pre-Bosses" ||
      trimmedLine === "Minion Mixing" ||
      trimmedLine.startsWith("Pre-") ||
      trimmedLine === "" ||
      trimmedLine.startsWith("[![") === false
    ) {
      continue;
    }

    // Parse item links
    if (currentClass && currentSection && trimmedLine.includes("[![")) {
      const items = parseItemsFromLine(
        trimmedLine,
        assetsDir,
        gameStage,
        currentClass,
        currentSection
      );
      if (classes[currentClass] && classes[currentClass][currentSection]) {
        classes[currentClass][currentSection].push(...items);
      }
    }
  }

  return classes;
}

function parseItemsFromLine(line, assetsDir, gameStage, className, itemType) {
  const items = [];
  // Match pattern for vanilla: [![ItemName](/images/path/to/ItemName.png?hash)](/wiki/ItemName "ItemName")[ItemName](/wiki/ItemName "ItemName")
  const regex =
    /\[\!\[([^\]]*?)\]\(([^)]+?\.(?:png|gif)[^)]*?)\)\]\([^)]+?\)\[([^\]]+?)\]/g;

  let match;
  while ((match = regex.exec(line)) !== null) {
    const iconAltText = match[1];
    const fullImagePath = match[2];
    const itemName = match[3];

    // Queue asset for download and get relative path
    const relativePath = queueAssetForDownload(
      fullImagePath,
      assetsDir,
      gameStage,
      className,
      itemType
    );

    items.push({
      name: itemName,
      icon: relativePath,
      link: `/wiki/${encodeURIComponent(itemName.replace(/'/g, "%27"))}`,
    });
  }

  return items;
}

function convertToGameStageFormat(classes) {
  const gameStageClasses = [];

  // Define class order for vanilla
  const classOrder = ["melee", "ranged", "magic", "summoner", "mixed"];

  for (const className of classOrder) {
    if (classes[className]) {
      gameStageClasses.push({
        class: className,
        weapons: classes[className].weapons || [],
        armor: classes[className].armor || [],
        accessories: classes[className].accessories || [],
        buffsPotionsAmmo: classes[className].buffsPotionsAmmo || [],
      });
    }
  }

  return gameStageClasses;
}

async function main() {
  const convertDir = path.join(__dirname, "../convert");
  const outputPath = path.join(__dirname, "../public/vanilla.json");
  const assetsDir = path.join(__dirname, "../public/vanilla-assets");

  // Create assets directory if it doesn't exist
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
    console.log(`Created assets directory: ${assetsDir}`);
  }

  const gameStages = [];

  // Define the correct order of game stages for vanilla
  const stageOrder = [
    "pre-boss",
    "pre-skeletron",
    "pre-wall-of-flesh",
    "pre-mech-boss",
    "pre-plantera",
    "pre-golem",
    "pre-lunar",
    "pre-moon-lord",
    "endgame",
  ];

  // Process each markdown file in the correct order
  for (const stageName of stageOrder) {
    const file = `vanilla-${stageName}.md`;
    const stageInfo = stageMapping[stageName];

    if (!stageInfo) {
      console.warn(`No mapping found for stage: ${stageName}`);
      continue;
    }

    const filePath = path.join(convertDir, file);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${file}`);
      continue;
    }

    console.log(`Processing ${file}...`);

    const classes = parseMarkdownFile(filePath, assetsDir, stageName);
    const gameStageClasses = convertToGameStageFormat(classes);

    gameStages.push({
      title: stageInfo.title,
      icon: stageInfo.icon,
      color: stageInfo.color,
      classes: gameStageClasses,
    });
  }

  // Download all queued assets
  await downloadAllAssets();

  // Write the output JSON
  fs.writeFileSync(outputPath, JSON.stringify(gameStages, null, 2));
  console.log(`\n✅ Conversion complete! Generated ${outputPath}`);
  console.log(`📁 Assets saved to: ${assetsDir}`);
  console.log(`📊 Total game stages: ${gameStages.length}`);

  // Print summary
  gameStages.forEach((stage, index) => {
    console.log(
      `${index + 1}. ${stage.title} - ${stage.classes.length} classes`
    );
  });
}

main().catch(console.error);
