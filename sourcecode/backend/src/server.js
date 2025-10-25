import express from "express";
import cors from "cors";
import pool from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visitors (
        id SERIAL PRIMARY KEY,
        count INT DEFAULT 0
      )
    `);
    const result = await pool.query("SELECT COUNT(*) FROM visitors");
    if (parseInt(result.rows[0].count) === 0) {
      await pool.query("INSERT INTO visitors (count) VALUES (0)");
    }
    console.log("✅ Database ready");
  } catch (err) {
    console.error("❌ Database init failed faga:", err);
  }
})();


app.get("/api/visit", async (req, res) => {
  try {
    const updated = await pool.query(
      "UPDATE visitors SET count = count + 1 RETURNING count"
    );
    res.json({ count: updated.rows[0].count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;

