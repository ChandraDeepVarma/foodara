import fs from "fs";
import path from "path";
import archiver from "archiver";
import mysqldump from "mysqldump";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const exportDatabase = async (req, res) => {
  console.log("EXPORT ROUTE HIT"); //testing purpose
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }


    const adminId = req.admin?.id;
    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // const admin = await Admin.findOne();
    // if (!admin) {
    //   return res.status(404).json({ message: "Admin not found" });
    // }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const timestamp = Date.now();
    const tempDir = path.join(__dirname, "../temp");
    const sqlPath = path.join(tempDir, `db_${timestamp}.sql`);
    const zipPath = path.join(tempDir, `db_${timestamp}.zip`);

    fs.mkdirSync(tempDir, { recursive: true });

    // 1️⃣ Dump database to SQL
    await mysqldump({
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
      dumpToFile: sqlPath,
    });

    // 2️⃣ Create ZIP
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);

    archive.file(sqlPath, { name: "database.sql" });

    // IMPORTANT: wait for ZIP to finish
    output.on("close", () => {
      res.download(zipPath, "foodara_database_backup.zip", () => {
        fs.unlinkSync(sqlPath);
        fs.unlinkSync(zipPath);
      });
    });

    archive.on("error", (err) => {
      throw err;
    });

    await archive.finalize();
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ message: "Export failed" });
  }
};
