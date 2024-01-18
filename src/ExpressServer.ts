import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import { RegisterRoutes } from "@n-routes/routes";

import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";

export default class ExpressServer {
  private app: express.Application;

  private readonly port: number;

  constructor(port: number = Number(process.env.PORT || 4000)) {
    this.app = express();
    this.port = port;

    this.app.set("view engine", "ejs");
    this.app.set("views", __dirname + "/views");
    // Định nghĩa một route
    this.app.get("/", (req, res) => {
      // Render file 'index.ejs' trong thư mục 'views'
      res.render("index");
    });

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  public getApp(): express.Application {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: false, limit: "50mb" }));
    this.app.use(morgan("tiny"));
    this.app.use(express.static("public"));
    this.app.disable("etag");
  }

  private initializeRoutes() {
    this.app.get(
      "/ping",
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(200);
        res.json({ message: "pong" });
      }
    );
    this.app.use(
      "/swagger",
      swaggerUi.serve,
      async (_req: ExRequest, res: ExResponse) =>
        res.send(swaggerUi.generateHTML(await import("../public/swagger.json")))
    );

    RegisterRoutes(this.app);
  
    this.app.use(function errorHandler(
      err: unknown,
      req: ExRequest,
      res: ExResponse,
      next: NextFunction
    ): ExResponse | void {
      if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
          message: "Validation Failed",
          details: err?.fields,
        });
      }
      if (err instanceof Error) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
      next();
    });

    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:8888"); // Cho phép truy cập từ trang web chạy trên cổng 3000
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.status(404);
        res.json({ message: "404 Not found" });
      }
    );
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server express listen at port:${Number(this.port)}`);
    });
  }
}
