import initSqlJs from "sql.js";

export async function main() {
  console.log("hello world");
  const SQL = await initSqlJs({
    locateFile: (url, scriptDirectory) => {
      // we map the wasm file to one single file depending on whether prod or debug,
      // might want to reconsider later
      switch (url) {
        case "sql-wasm-debug.wasm":
        case "sql-wasm.wasm":
          return "./js/sqlite.wasm";
      }
      throw new Error(
        `trying locate file ${url} in ${scriptDirectory} and failing!!`
      );
    },
  });
  const dbFile = await fetch("./slides.sqlite");
  const db = new SQL.Database(new Uint8Array(await dbFile.arrayBuffer()));

  const res = db.exec("SELECT * from slides;");
  console.log(res[0]);
}
