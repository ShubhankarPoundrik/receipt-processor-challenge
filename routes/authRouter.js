import express from "express";
import { process, data } from "./process.js";
import { getReceiptPoints } from "./getReceiptPoints.js";

const router = express.Router();

router.post("/receipts/process", process);

router.get("/receipts/:id/points", getReceiptPoints);

export { router };
