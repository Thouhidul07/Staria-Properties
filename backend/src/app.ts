import compression from "compression";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { corsOptions } from "./config/cors";
import { env } from "./config/env";
import { morganStream } from "./config/logger";
import { helmetMiddleware, securityHeadersMiddleware } from "./config/security";
import { swaggerSpec } from "./docs/swagger";
import { apiVersionMiddleware, cachePolicies } from "./middleware/cache.middleware";
import { errorHandler, notFound } from "./middleware/error.middleware";
import { performanceMiddleware } from "./middleware/performance.middleware";
import { apiLimiter } from "./middleware/rateLimiter.middleware";
import { requestIdMiddleware } from "./middleware/requestId.middleware";
import routes from "./routes";
import { healthRouter } from "./routes/site.routes";

const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(requestIdMiddleware);
app.use(helmetMiddleware);
app.use(securityHeadersMiddleware);
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev", { stream: morganStream }));
app.use(performanceMiddleware);
app.use(apiVersionMiddleware);
app.use(apiLimiter);

app.use("/health", cachePolicies.noStore, healthRouter);
app.get("/api-docs.json", cachePolicies.noStore, (_req, res) => {
  res.json(swaggerSpec);
});
app.use("/api-docs", cachePolicies.noStore, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", cachePolicies.publicShort, (_req, res) => {
  res.json({
    success: true,
    message: "Staria Properties API is running",
    data: {
      docs: "/api-docs",
      openApi: "/api-docs.json",
      health: "/health",
      api: env.API_PREFIX
    },
    meta: {
      requestId: res.getHeader("x-request-id"),
      timestamp: new Date().toISOString(),
      version: env.API_PREFIX.replace(/^\//, "")
    }
  });
});

app.use(env.API_PREFIX, routes);

app.use(notFound);
app.use(errorHandler);

export default app;
