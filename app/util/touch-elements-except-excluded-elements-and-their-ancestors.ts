export function touchElementsExceptExcludedElementsAndTheirAncestors(
  rootElement: Element,
  elementsToExclude: Element[],
  cb: (element: Element) => void
) {
  const excludedElements = new Set<Element>();

  for (let i = 0; i < elementsToExclude.length; i++) {
    let element: Element | null | undefined = elementsToExclude[i];
    while (element && !excludedElements.has(element)) {
      excludedElements.add(element);
      element = element.parentElement;
    }
  }

  traverseTreeFromRoot(rootElement);

  function traverseTreeFromRoot(root: Element) {
    if (excludedElements.has(root)) {
      const childElements = Array.from(root.children);
      for (const childElement of childElements) {
        traverseTreeFromRoot(childElement);
      }
    } else {
      cb(root);
    }
  }
}
