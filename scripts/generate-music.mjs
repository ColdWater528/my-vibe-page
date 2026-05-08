// Fetches recent songs from NetEase Cloud Music and writes to public/data/music.json
// Expects environment variable NETEASE_USER_ID to be set

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USER_ID = process.env.NETEASE_USER_ID || "5138152592";

async function main() {
  console.log(`Fetching music data for user: ${USER_ID}`);

  try {
    const netease = (await import("NeteaseCloudMusicApi")).default;

    // Get user's recently played songs
    const result = await netease.user_record({
      uid: USER_ID,
      type: 1, // 1 = weekly (recent), 0 = all-time
    });

    const raw = result.body;

    const rawSongs = raw?.weekData || [];

    const songs = rawSongs.slice(0, 10).map((item) => ({
      name: item.song?.name || "未知歌曲",
      artist: item.song?.ar?.map((a) => a.name).join("/") || "未知歌手",
      album: item.song?.al?.name || "",
      cover: item.song?.al?.picUrl || "",
      url: `https://music.163.com/song?id=${item.song?.id || ""}`,
    }));

    const outputPath = path.join(__dirname, "..", "public", "data", "music.json");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(songs, null, 2), "utf-8");

    console.log(`✓ Written ${songs.length} songs to ${outputPath}`);
  } catch (error) {
    console.error("Failed to fetch music data:", error);
    process.exit(1);
  }
}

main();
