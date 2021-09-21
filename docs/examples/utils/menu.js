(() => {
  window.onload = function () {
    const menuHTML = `
            <div class="menu">
                <div id='rectangle'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><g fill="none" fill-rule="evenodd"><rect width="40" height="40" rx="12"></rect><path fill="#000" fill-rule="nonzero" d="M35 10a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1V11a1 1 0 011-1h30zm-1 2H6v16h28V12z"></path></g></svg>
                </div>
                <div id='line'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g stroke="currentColor" stroke-width="1.6"><path fill="currentColor" d="M27.702 11.798l-2.62 7.861-5.24-5.24 7.86-2.62z"></path><path d="M9.906 29.498l12.021-12.02"></path></g></svg>
                </div>
                <div id="curved-line">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><g fill="none" fill-rule="evenodd"><rect width="40" height="40" rx="12"></rect><path fill="#000" fill-rule="nonzero" d="M35 10a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1V11a1 1 0 011-1h30zm-1 2H6v16h28V12z"></path></g></svg>
                </div>
            </div>
        `;
    const parser = new DOMParser();
    const doc = parser.parseFromString(menuHTML, "text/html");
    const menu = doc.querySelector(".menu");
    const container = document.querySelector(".container");
    container.prepend(menu);

    const rect = menu.querySelector("#rectangle");
    rect.addEventListener("click", () => {
      const rectStyle = {
        shape: "manual-operation",
        fill: "none",
        stroke: "black",
        strokeWidth: 2,
      };
      const vertex = new Ez.EzVertex(
        new Ez.EzRectangle(200, 300, 200, 100),
        rectStyle,
        "sticky"
      );
      vertex.text = " ";
      window.diagram.addVertex(vertex);
    });

    const l = menu.querySelector("#line");
    l.addEventListener("click", () => {
      const style = {
        shape: "line",
        stroke: "black",
        markerStart: "triangle",
        markerEnd: "square",
        strokeWidth: 2,
      };

      const line = new Ez.EzEdge(
        [new Ez.EzPoint(400, 590), new Ez.EzPoint(600, 290)],
        style,
        "line"
      );
      window.diagram.addEdge(line);
    });
  };
})();
