import { defineConfig } from "tsup";

export default defineConfig({
    "entry": ["./src/index.ts"],
    "platform": "neutral",
    "target": "node8",
    "format": ["cjs", "esm"],
    dts: true,
});
