import initSqlJs, { Database } from "sql.js";

export async function main() {
  const db = await loadDb();

  let _ = await measure("select from slides", () => {
    let table = (content: Element[]) => (
      <>
        <table>
          <thead>
            <td>Type</td>
            abc
          </thead>
          <tbody>{content}</tbody>
        </table>
        <div>mydiv</div>
        <button disabled>mybutton</button>
      </>
    );
    let s = db.prepare("SELECT type from slides;");
    let tableContent = [];
    while (s.step()) {
      let r = s.getAsObject() as { type: string };
      let td = <td>{r.type}</td>;
      tableContent.push(td);
    }
    s.free();

    let slides = document.getElementById("slides");
    if (slides) {
      slides.innerHTML = "";
      slides.appendChild(table(tableContent));
    }
    return Promise.resolve(null);
  });
}

async function loadDb(): Promise<Database> {
  const SQL = await measure("loading sqlite library", () =>
    initSqlJs({
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
    })
  );

  return await measure("loading sqlite file", async () => {
    const dbFile = await fetch("./slides.sqlite");
    return new SQL.Database(new Uint8Array(await dbFile.arrayBuffer()));
  });
}

/** Measure the time the given callback takes and print its entry and exit.
 *
 */
async function measure<A>(name: string, act: () => Promise<A>): Promise<A> {
  console.log(name + " start");
  const start = performance.now();
  const res = await act();
  const end = performance.now();
  const duration = end - start;
  console.log(name + ` took ${duration.toString()}ms`);
  return res;
}
