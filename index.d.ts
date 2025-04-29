import type { Node, Options } from "astring";
import type { Writable } from "stream";

export { baseGenerator, GENERATOR, Generator, Options, State } from "astring";

export function generate(node: Node, options?: Options<null>): string;
export function generate(node: Node, options?: Options<Writable>): Writable;
