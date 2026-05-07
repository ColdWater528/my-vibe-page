const COUNTRY_FLAGS: Record<string, string> = {
  CN: "🇨🇳",
  US: "🇺🇸",
  JP: "🇯🇵",
  KR: "🇰🇷",
  GB: "🇬🇧",
  DE: "🇩🇪",
  FR: "🇫🇷",
  CA: "🇨🇦",
  AU: "🇦🇺",
  SG: "🇸🇬",
  TW: "🇹🇼",
  HK: "🇭🇰",
  MO: "🇲🇴",
  IN: "🇮🇳",
  BR: "🇧🇷",
  RU: "🇷🇺",
};

const REGION_NAMES: Record<string, string> = {
  Beijing: "北京",
  Shanghai: "上海",
  Guangdong: "广东",
  Zhejiang: "浙江",
  Jiangsu: "江苏",
  Sichuan: "四川",
  Hubei: "湖北",
  Shandong: "山东",
  Fujian: "福建",
  Henan: "河南",
  Shaanxi: "陕西",
  Liaoning: "辽宁",
  Chongqing: "重庆",
  Tianjin: "天津",
  Anhui: "安徽",
  Hunan: "湖南",
  Jiangxi: "江西",
  Hebei: "河北",
  Shanxi: "山西",
  Yunnan: "云南",
  Guizhou: "贵州",
  Gansu: "甘肃",
  Hainan: "海南",
  Jilin: "吉林",
  Heilongjiang: "黑龙江",
  Qinghai: "青海",
  Tibet: "西藏",
  Guangxi: "广西",
  "Inner Mongolia": "内蒙古",
  Ningxia: "宁夏",
  Xinjiang: "新疆",
};

export async function GET(request: Request) {
  // Cloudflare Pages provides cf object via request properties
  const cf = (request as any).cf;

  const country = cf?.country || "未知";
  const region = cf?.region || "";
  const regionName = REGION_NAMES[region] || region;

  return Response.json({
    country,
    region: regionName || country,
    flag: COUNTRY_FLAGS[country] || "🌍",
  });
}
