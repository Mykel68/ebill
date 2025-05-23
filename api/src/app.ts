import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Ebill API",
      description: "Ebill API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(errorMiddleware);

// welcome api route
app.get("/", (req, res) => {
  res.send("Welcome to Ebill API!");
});

// Catch-All Middleware for 404 Route
app.use((req, res, next) => {
  res.status(404).json({
    message: `The API endpoint ${req.originalUrl} does not exist on this server.`,
  });
});

// Error Handling Middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
