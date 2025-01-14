#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yargs = require("yargs");

// 获取当前项目的根目录
const getRootDir = () => path.resolve(process.cwd());

// 处理 'vun write' 命令：生成 vun.conf.test.js 文件
const writeConfFile = () => {
  const configPath = path.join(getRootDir(), "vun.conf.test.ts");
  const content = "export default test = { name: 'test' };";

  try {
    fs.writeFileSync(configPath, content, "utf8");
    console.log("成功创建 `vun.conf.test.ts` 文件 🎉，内容是：\n", content);
  } catch (err) {
    console.error("写入配置文件时发生错误 😓", err);
  }
};

// 处理 'vun run' 命令：读取 vun.conf.test.js 文件并输出 name
const runConfFile = async () => {
  const configPath = path.join(getRootDir(), "vun.conf.test.ts");

  try {
    // 引入 ts-node/register 来支持 TypeScript 文件
    require("ts-node/register");
    console.log("正在读取配置文件 ⏳...");
    // 使用动态 import 加载 ESM 模块
    const config = await import(configPath); // 动态加载 ESM 模块
    if (config && config.default && config.default.test) {
      console.log("配置文件中的 name 值是：", config.default.test.name, "🎯");
    } else {
      console.log("配置文件格式不正确 🤔");
    }
  } catch (err) {
    console.error("读取或解析配置文件时发生错误 😓", err);
  }
};

// const runConfFile = () => {
//   const configPath = path.join(getRootDir(), "vun.conf.test.js");

//   try {
//     const data = fs.readFileSync(configPath, "utf8");
//     const config = eval(data); // 执行 JS 代码，得到 test 对象
//     if (config && config.test) {
//       console.log("配置文件中的 name 值是：", config.test.name, "🎯");
//     } else {
//       console.log("配置文件格式不正确 🤔");
//     }
//   } catch (err) {
//     console.error("读取或解析配置文件时发生错误 😓", err);
//   }
// };

// 处理 'vun inject' 命令：修改 package.json 中的 build 脚本
const injectScript = () => {
  const packageJsonPath = path.join(getRootDir(), "package.json");

  try {
    const data = fs.readFileSync(packageJsonPath, "utf8");
    const packageJson = JSON.parse(data);

    if (packageJson.scripts && packageJson.scripts.build) {
      // 仅在 build 脚本中没有包含 &vun run 时添加
      if (!packageJson.scripts.build.includes("& vun run")) {
        packageJson.scripts.build += " & vun run";

        // 写回更新后的 package.json
        fs.writeFileSync(
          packageJsonPath,
          JSON.stringify(packageJson, null, 2),
          "utf8"
        );
        console.log(
          "成功更新 `package.json`，`build` 命令添加了 `& vun run` 🎉"
        );
      } else {
        console.log("`build` 命令中已经包含了 `& vun run` 😅");
      }
    } else {
      console.log("`package.json` 中没有找到 `build` 脚本 🤔");
    }
  } catch (err) {
    console.error("读取或更新 `package.json` 时发生错误 😓", err);
  }
};

// 使用 yargs 设置命令行接口
yargs
  .command("write", "生成 vun.conf.test.js 文件", () => {}, writeConfFile)
  .command(
    "run",
    "读取 vun.conf.test.js 文件并输出 name 的值",
    () => {},
    runConfFile
  )
  .command(
    "inject",
    "在 package.json 的 build 脚本中添加 & vun run",
    () => {},
    injectScript
  )
  .help().argv; // 解析命令行参数
