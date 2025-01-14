class VuMetaNotifier {
  #webConfig = null;
  constructor(webConfig) {
    // 从这里 读取配置，
    this.#webConfig = webConfig;
    this.#register();
  }

  // 通知处理器
  async #notificationHandler() {
    const now = Date.now();
    const res = await window.fetch(`/?now=${now}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    const html = await res.text();

    const match = html.match(/<meta name="buildTime" content="(.*?)">/);

    const newBuildTime = match?.[1] || "";

    // 插入一个后门，方便 QA 测试
    // 使用 URL 参数中获取 __buildTime__ 的值 来作为当前首页中 meta 标签中的 buildTime
    // ================================================
    const { search } = window.location;
    const searchBuildTime =
      search.includes("__buildTime__") &&
      search.match(/__buildTime__=([^&]+)/)[1];
    // ================================================

    const oldBuildTime =
      searchBuildTime ||
      window.document
        ?.querySelector?.('meta[name="buildTime"]')
        ?.getAttribute?.("content");

    if (newBuildTime !== oldBuildTime) {
      this.#webConfig.callback(oldBuildTime);
    }
  }

  // 防抖的通知，并设置一个延迟，避免频繁触发通知
  #notify(wait) {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.#notificationHandler();
      }, wait || 200);
    };
  }

  // 注册事件监听器
  #register() {
    // 获取一个 3 秒的防抖通知处理器
    const debounceNotificationHandler = this.#notify(3000);
    const { popstate, hashchange, visibilitychange, linkClick, setInterval } =
      this.#webConfig.triggerMethods;

    // 绑定事件监听器，常规的用户操作行为会触发通知处理器
    if (popstate) {
      window.addEventListener("popstate", debounceNotificationHandler);
    }

    if (hashchange) {
      window.addEventListener("hashchange", debounceNotificationHandler);
    }

    if (visibilitychange) {
      window.addEventListener("visibilitychange", debounceNotificationHandler);
    }

    if (linkClick) {
      window.addEventListener(
        "click",
        (e) =>
          e.target.tagName === "A" &&
          e.target.href &&
          debounceNotificationHandler()
      );
    }

    if (setInterval) {
      window.setInterval(
        debounceNotificationHandler,
        (setInterval && setInterval.time) || 1000 * 60 * 60 * 5
      );
    }
  }
}

export default function vunWeb() {
  // 读取配置
  const webConfig = {};
  new VuMetaNotifier(webConfig);
}
