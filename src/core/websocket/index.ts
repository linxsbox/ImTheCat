const WebSocket = (window as any)['WebSocket'];

export class WebSocketOnline {
  private static webSocket: any;
  private static url = '';
  private static prototcol?: string | string[];
  // 限制产生多个对象
  private constructor () {
    // ...
  }
  // 使用单例模式获得 websocket 实例对象
  public static getInstance (url: string, prototcol?: string | string[]): any {
    this.url = url;
    this.prototcol = prototcol;
    if (!this.webSocket) {
      this.webSocket = new WebSocket(url, prototcol);
    }
    return this.webSocket;
  }

  // 重新连接 websocket
  public static reconnect () {
    // 如果已有 websocket 还在连接状态，则直接关闭
    if (this.webSocket) {
      this.webSocket.close();
    }

    this.webSocket = null;
    this.getInstance(this.url, this.prototcol);
  }
}
