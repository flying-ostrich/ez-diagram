module.exports = {
  title: "ez-diagram",
  description:
    "a powerful and easy javascript framework to help build rich graphs",
  dest:'docs/site',
  themeConfig: {
    sidebar: "auto",
    nav: [
      { text: "Tutorial", link: "/" },
      { text: "Demos", link: "/demos.md" },
      {
        text: "API Reference",
        link: "/api-reference/index.html",
        target: "_blank",
      },
      { text: "GitHub", link: "http://www.github.com" },
    ],
  },
  plugins: ["vuepress-plugin-element-tabs"],
};
