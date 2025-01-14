# Version-upgrade-notifier

Version Upgrade Notifier 是一款为开发者提供的工具包，能够在构建过程中自动插入构建时间和版本信息，同时提供版本更新通知功能。通过这个工具包，你可以轻松管理构建信息和版本更新通知，确保用户在访问时第一时间获得版本更新提示，提升用户体验和开发效率。 🚀🔧

Version Upgrade Notifier is a tool designed to help developers automatically insert build time and version information during the build process, while also providing version update notifications. With this package, you can easily manage build information and version updates, ensuring that users are notified of updates the moment they access the application, enhancing both user experience and development efficiency. 🚀🔧

请帮我用 nodejs 写一个命令行工具，功能如下：
1. 在我输入 vun write 时，在当前运行的项目根目录下 输出 vun.conf.test.js 文件，写的 内容 是 export default test = { name: 'test' };
2. 在我输入 vun run 时，读取当前运行的项目的根目录下的 vun.conf.test.js 文件，并输出 test 中的 name 的值。
3. 在我输入 vun inject 时，在当前运行的项目的根目录下的 package.json 中的 scripts 字段中的 build 命令的尾部 添加一个 &vun run 命令。
