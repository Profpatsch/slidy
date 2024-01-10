export { jsx, jsx as jsxs, jsx as Fragment };

function jsx(node, props) {
  if (node === jsx) node = document.createDocumentFragment();
  else if (typeof node === "function") return node(props);
  else node = document.createElement(node);

  for (let name in props) {
    if (name !== "children") {
      const prop = props[name];
      if (typeof prop == "boolean") {
        // set only attribute name if true, leave out if false
        if (prop) node.setAttribute(name, true);
      } else {
        node.setAttribute(name, prop);
      }
    } else {
      Array.isArray(props.children)
        ? node.append(...props.children)
        : node.append(props.children);
    }
  }

  return node;
}
