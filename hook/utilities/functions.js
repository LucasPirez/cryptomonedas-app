export function updateElement(o, element) {
  for (const name in o) {
    if (o.hasOwnProperty(name)) {
      element.setAttributeNS(null, name, o[name]);
    }
  }
  return element;
}
