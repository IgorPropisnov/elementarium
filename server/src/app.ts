import express from 'express';
import cors from 'express'
import path from 'path';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.initControllers(controllers);

        this.app.use(express.static(path.join(__dirname, '../../client')));
        this.app.use(cors());
        this.app.options('*', cors());
    }

    public initControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App run on port: ${this.port}`);
        });
    }
}

export default App;
