/*
  - Applicable if runtime is NODEJS
  - Elysia is single threaded by default,
  - below is a cluster config. This will make sure that Elysia is running on multiple CPU cores.
*/

import { app } from "./server";

// import cluster from "node:cluster";
// import os from "node:os";
// import process from "node:process";

// if (cluster.isPrimary) {
//   // --- BAGIAN INI KITA UBAH ---
//   console.log(`Primary process ${process.pid} is running`);
//   console.log(`Forking server for ${os.availableParallelism()} CPUs...`);
//   console.log("🚀 Server ready at: http://localhost:3000"); //
//   for (let i = 0; i < os.availableParallelism(); i++) cluster.fork();
// } else {
//   await import("./server");
//   console.log(`Worker ${process.pid} started`);
// }

const PORT = process.env.PORT ?? 3000;
app.listen(PORT);

console.log("Server is running");
