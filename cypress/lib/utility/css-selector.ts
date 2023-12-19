export enum SelectorTypes {
  Attribute = "attribute",
  Class = "class",
  Id = "id",
  Type = "type",
  CSS = "css",
}

export interface ISelector {
  // key (name)
  k: string;
  // value
  v: string;
  // optional attribute name
  a?: string;
  // type
  t: SelectorTypes;
}

type SelectorKeys<T extends ISelector[]> = {
  [K in T[number]["k"]]: NonNullable<string>;
};

// CSS selector formatters, klass/typ named to avoid conflict with reserved words
const att = (name: string, value: string): string => `[${name}="${value}"]`;
const klass = (value: string): string => `.${value}`;
const id = (value: string): string => `#${value}`;
const typ = (value: string): string => value;
const css = (value: string): string => value;

const createCssDict = (
  selectors: ISelector[],
  defaultAttribute = "data-testid",
): SelectorKeys<typeof selectors> => {
  const selectorMap: SelectorKeys<typeof selectors> = {};
  for (const selector of selectors) {
    // preference the attribute defined on the Selector if defined
    const attribute = selector.a || defaultAttribute;
    switch (selector.t) {
      case SelectorTypes.Attribute: {
        selectorMap[selector.k] = att(attribute, selector.v);
        break;
      }
      case SelectorTypes.Class: {
        selectorMap[selector.k] = klass(selector.v);
        break;
      }
      case SelectorTypes.Id: {
        selectorMap[selector.k] = id(selector.v);
        break;
      }
      case SelectorTypes.Type: {
        selectorMap[selector.k] = typ(selector.v);
        break;
      }
      case SelectorTypes.CSS: {
        selectorMap[selector.k] = css(selector.v);
        break;
      }
    }
  }

  return selectorMap;
};

export { createCssDict };
