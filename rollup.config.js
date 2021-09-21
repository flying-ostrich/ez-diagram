import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import parseArgs from "minimist";
import path from "path";

const { NODE_ENV } = parseArgs(process.argv);

const baseConfig = [
  resolve(),
  typescript(),
  replace({
    __DEV__: true,
  }),
];

const getProdConfig = () => {
  return baseConfig;
};

const getDevConfig = () => {
  // const serveConfig = {
  //   open: true,
  // };
  // const examplePath = path.join(__dirname, "docs/examples", `${example}.html`);
  // if (example && fs.existsSync(examplePath)) {
  //   serveConfig.openPage = `/docs/examples/${example}.html`;
  // } else {
  //   serveConfig.openPage = "/docs/examples/simple-vertex.html";
  // }

  return [
    ...baseConfig,
    // serve(serveConfig),
    livereload({
      watch: "dist",
      verbose: true,
    }),
  ];
};

const output = path.join(
  process.cwd(),
  "docs",
  ".vuepress",
  "public",
  "ez-diagram",
  "ez-diagram.umd.js"
);

const getOutput = (format) => {
  return path.join(
    process.cwd(),
    "docs",
    ".vuepress",
    "public",
    `ez-diagram-${format}`,
    `ez-diagram-${format}.js`
  );
};

export default {
  input: "src/public-api.ts",
  output: [
    {
      sourcemap: true,
      file: getOutput("umd"),
      format: "umd",
      name: "Ez",
    },
    {
      sourcemap: true,
      file: getOutput("esm"),
      format: "es",
    },
  ],
  plugins: NODE_ENV === "development" ? getDevConfig() : getProdConfig(),
  treeshake: {
    moduleSideEffects: false,
  },
};
