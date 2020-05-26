//url   : mongodb+srv://rdy_d3n0:<password>@denolearn-lwiut.mongodb.net/test?retryWrites=true&w=majority
//pass  : HaUhzzO0sLPshsX3
import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb+srv://rdy_d3n0:HaUhzzO0sLPshsX3@denolearn-lwiut.mongodb.net/test?retryWrites=true&w=majority");
const db = client.database('products')

export default db


// import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

// // Initialize the plugin
// await init()

// class DB {
//   public client: MongoClient;
//   constructor(public dbName: string, public url: string) {
//     this.dbName = dbName;
//     this.url = url;
//     this.client = {} as MongoClient;
//   }
//   connect() {
//     const client = new MongoClient();
//     client.connectWithUri(this.url);
//     this.client = client;
//   }
//   get getDatabase() {
//     return this.client.database(this.dbName);
//   }
// }

// const dbName = Deno.env.get("DB_NAME") || "deno_demo";
// const dbHostUrl = Deno.env.get("DB_HOST_URL") || "mongodb://localhost:27017";
// const db = new DB(dbName, dbHostUrl);
// db.connect();

// export default db;