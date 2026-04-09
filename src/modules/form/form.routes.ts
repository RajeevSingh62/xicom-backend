import { Router } from "express";
import upload from "../../utils/cloudinary";
import { createCandidate, uploadDocument } from "./form.controller";



const router = Router();


router.post("/upload", upload.single("file"), uploadDocument);


router.post("/", createCandidate);



export default router;
