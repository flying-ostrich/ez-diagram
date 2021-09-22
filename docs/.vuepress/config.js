const base = '/ez-diagram/';
module.exports = {
  title: "ez-diagram",
  base,
  description:
    "a powerful and easy javascript framework to help build rich graphs",
  themeConfig: {
    sidebar: "auto",
    nav: [
      { text: "Tutorial", link: "/" },
      { text: "Demos", link: "/demos.md" },
      {
        text: "API Reference",
        link: `${base}api-reference/index.html`,
        target: "_blank",
      },
      { text: "GitHub", link: "http://www.github.com" },
    ],
  },
  plugins: ["vuepress-plugin-element-tabs"],
};
