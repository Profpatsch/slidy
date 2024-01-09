// This is a runtime shim for tranforming the global sql.js init function to an ES module that can be imported by the browser.
// Typescript modules use `import initSqlJs from "sql.js"`
const initSqlJs = window.initSqlJs;
export default initSqlJs;
