const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "tes1";

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Koneksi ke database berhasil");
    const db = client.db(dbName);

  } catch (error) {
    console.log("Koneksi ke database gagal", error);
  } finally {
    await client.close();
  }
}

connectToDatabase();
