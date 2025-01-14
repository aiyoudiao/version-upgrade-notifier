import fs from "fs";
import path from "path";

export default function vunNode(nodeConfig) {
  const { pathValue, keyMaps } = nodeConfig;

  // 指定 HTML 文件的路径
  const filePath = path.join(__dirname, pathValue);

  // 读取 HTML 文件
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("读取文件失败:", err);
      return;
    }

    // 查找 </head> 标签的位置
    const headTagIndex = data.indexOf("</head>");

    if (headTagIndex === -1) {
      console.error("未找到 </head> 标签");
      return;
    }

    // 构建 <meta> 标签字符串
    const metaTag = keyMaps
      .map(({ name, content, auto }) => {
        return `<meta name="${name}" content="${
          // 如果 auto 为 true，则获取当前时间
          auto ? new Date().toISOString() : content
        }">`;
      })
      .join("\n");

    // 在 </head> 标签前插入 <meta> 标签
    const newData =
      data.slice(0, headTagIndex) + metaTag + data.slice(headTagIndex);

    // 将修改后的 HTML 写回文件
    fs.writeFile(filePath, newData, "utf8", (err) => {
      if (err) {
        console.error("写入文件失败:", err);
        return;
      }
      console.log(`成功插入 ${metaTag} 标签`);
    });
  });
}
