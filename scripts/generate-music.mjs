// Fetches recent songs from NetEase Cloud Music and writes to public/data/music.json
// Expects environment variable NETEASE_USER_ID to be set

const netease = require("NeteaseCloudMusicApi");
const fs = require("fs");
const path = require("path");

const USER_ID = process.env.NETEASE_USER_ID || "5138152592";

async function main() {
  console.log(`Fetching music data for user: ${USER_ID}`);

  try {
    // Get user's recently played songs
    const result = await netease.user_record({
      uid: USER_ID,
      type: 0, // 0 = all, 1 = weekly
    });

    const raw = result.body;

    // Extract recent weekly songs, fallback to all songs
    const rawSongs = raw?.weekData || raw?.allData || [];

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
