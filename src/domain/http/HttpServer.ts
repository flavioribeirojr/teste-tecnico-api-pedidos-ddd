export interface HttpServer<App = object> {
  create(): {
    app: App,
    listen: (port: number) => void;
  }
}