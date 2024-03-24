import config from "./config";
import App from "./app";

const start = async () => {
    const app = new App({
        port: config.serverPort,
    });
    await app.start();
};


if (require.main === module) {
    start().catch((err) => console.error(err));
}