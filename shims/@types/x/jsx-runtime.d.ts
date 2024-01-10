// dumb workaround to prevent JSX.Element definition from referring to itself
type ElementShadow = Element;

export declare namespace JSX {
  type Element = ElementShadow;
  interface IntrinsicElements {
    [elemName: string]: Record<string, string | boolean>;
  }
}
