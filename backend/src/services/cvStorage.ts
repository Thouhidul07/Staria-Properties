import { randomUUID } from "crypto";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";
import { AppError } from "../utils/AppError";

const directory = path.resolve(process.env.CV_STORAGE_DIR || "private-uploads/cvs");
export const cvMarker = /\[CV:([0-9a-f-]{36})\]\s*$/;

export async function saveCv(file: Express.Multer.File | undefined) {
  if (!file) throw new AppError("Please upload your CV as a PDF", 400);
  if (file.mimetype !== "application/pdf" || path.extname(file.originalname).toLowerCase() !== ".pdf" || file.buffer.subarray(0, 5).toString() !== "%PDF-") {
    throw new AppError("Only PDF CV files are allowed", 400);
  }
  const key = randomUUID();
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, `${key}.pdf`), file.buffer, { flag: "wx", mode: 0o600 });
  return key;
}

export async function removeCv(key: string) {
  await unlink(path.join(directory, `${key}.pdf`)).catch(() => undefined);
}

export async function readCv(message: string) {
  const key = message.match(cvMarker)?.[1];
  if (!key) throw new AppError("No PDF CV is attached to this application", 404);
  try { return await readFile(path.join(directory, `${key}.pdf`)); }
  catch { throw new AppError("The CV file could not be found", 404); }
}
