"use server";

import fs from "fs/promises";
import path from "path";

const targetDir = path.join(process.cwd(), "ravindran-dev.github.io");

export async function getTerminalFiles() {
  try {
    const files = await fs.readdir(targetDir);
    return files;
  } catch (error) {
    console.error("Failed to read terminal files:", error);
    return [];
  }
}

export async function readTerminalFile(filename: string) {
  try {
    // Basic security to prevent reading outside the directory
    if (filename.includes("..") || filename.startsWith("/")) {
      return `cat: ${filename}: Permission denied`;
    }
    
    const targetPath = path.join(targetDir, filename);
    const stat = await fs.stat(targetPath);
    
    if (stat.isDirectory()) {
      return `cat: ${filename}: Is a directory`;
    }
    
    const content = await fs.readFile(targetPath, "utf-8");
    return content;
  } catch (error) {
    return `cat: ${filename}: No such file or directory`;
  }
}
