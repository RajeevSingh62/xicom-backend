import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";

import errorHandler from "./middleware/errorHandler";
import formRoutes from "./modules/form/form.routes";



const app: Application = express();


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://xicom.netlify.app", 
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//testing api hereeee

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running ",
   
  });
});

// all routes 
app.use("/api/candidate", formRoutes);


app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


app.use(errorHandler);

export default app;
