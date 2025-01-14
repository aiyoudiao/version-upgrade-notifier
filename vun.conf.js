import { Space, Button, notification } from "antd";
import { UpSquareOutlined } from "@ant-design/icons";

export default {
  node: {
    method: "inject",
    pathValue: "../dist/index.html",
    keyMaps: [
      {
        name: "buildTime",
        auto: true,
        content: "",
      },
    ],
  },
  web: {
    triggerMethods: {
      popstate: true,
      hashchange: true,
      visibilitychange: true,
      linkClick: true,
      setInterval: true,
    },
    platform: "react",
    ui: "antd",
    version: "5.x",
    callback: (keyName) => {
      notification.open({
        message: "系统版本更新通知",
        key: keyName,
        description: "检测到系统有新版本发布，是否立即刷新页面？",
        icon: <UpSquareOutlined style={{ color: "#108ee9" }} />,
        btn: (
          <Space size={8}>
            <Button onClick={() => notification.close(keyName)}>
              稍后再说
            </Button>
            <Button
              type="primary"
              onClick={() => {
                // 去除后门中的 buildTime 的 key，如果 URL 中有 __buildTime__ 参数，则移除 该参数
                if (searchBuildTime) {
                  window.location.search = search.replace(
                    /__buildTime__=([^&]+)/,
                    `now=${now}`
                  );
                  return;
                }
                window.location.reload(true);
              }}
            >
              立即刷新
            </Button>
          </Space>
        ),
        duration: null,
      });
    },
  },
};
