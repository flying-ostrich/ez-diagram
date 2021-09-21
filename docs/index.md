# Tutorial
## Essentials
### What is ez-diagram ?
ez-graph is a powerful and easy javascript framework to help build rich graphs.
### Installation
TODO
### Hello world
The following demo demonstrates how to use ez-diagram to create a simple graph with vertex and edge.

:::: tabs
::: tab preview
<a href="/examples/hello-world/hello-world.html" target="_blank">open in new tab</a>
<iframe class="thin" src="/examples/hello-world/hello-world.html"></iframe>
:::
::: tab code for es module env
<<< @/docs/.vuepress/public/examples/hello-world/hello-world.esm.js
:::
::: tab code for browser env
<<< @/docs/.vuepress/public/examples/hello-world/hello-world.umd.js
:::
::::


### Vertex and Edge
in this section we will talk about how to create  vertex or  edge to a graph.

ez-diagram provides many built in shapes to help you create different vertex .

:::: tabs
::: tab preview
<a href="/examples/add-vertex/add-vertex.html" target="_blank">open in new tab</a>
<iframe class="thin" src="/examples/add-vertex/add-vertex.html"></iframe>
:::
::: tab code for adding vertex
<<< @/docs/.vuepress/public/examples/add-vertex/add-vertex.esm.js
:::
::::

for more built in shapes , see <a href="/api-reference/modules.html#BUILTIN_SHAPE" target="_blank">built in shapes</a>

also , you can create edge with class EzEdge.
:::: tabs
::: tab preview
<a href="/examples/add-edge/add-edge.html" target="_blank">open in new tab</a>
<iframe class="thin" src="/examples/add-edge/add-edge.html"></iframe>
:::
::: tab code for adding vertex
<<< @/docs/.vuepress/public/examples/add-edge/add-edge.esm.js
:::
::::

for more built in markers , see <a href="/api-reference/modules.html#BUILTIN_MARKER" target="_blank">built in markers</a>

### Diagram actions

**diagram actions** provides a easy mechanism to modify current diagram. for example , you can simply execute
```javascript
 diagram.actions.execute(BUILTIN_ACTIONS.DELETE_SELECTED)
```
to delete the selected elements . for more built in actions , see 
<a href="/api-reference/modules.html#BUILTIN_MARKER" target="_blank">built in actions</a>

if you want to chage default behavior of diagram action , you can simply overwrite corresponding action handler
```javascript
// overwrite delete action handler , only delete vertex , ignore edges
diagram.actions.register(BUILTIN_ACTIONS.DELETE_SELECTED, (diagram) => {
    let selected = diagram.pluginManager.getContext()?.selectedViewStates;
    if (!selected?.length) return false;

    selected = selected.filter((state) => state.node instanceof EzVertex);
    diagram.view.removeStates(selected);
    return true;
});
```

### Key handler
**key handler** enable use to handle keyboard events . ez-diagram provides serveral built in behavior for some keyboard event , such as
```
'Backspace' - delete selected elements
'ArrowDown' - move down selected elements
'ArrowUp' - move up selected elements
'ArrowLeft' - move left selected elements
'ArrowRight' - move right selected elements
```
you can use ``` diagram.keyHandler.bindKeyhandler ``` to overwrite or bind key handler , for example
```javascript
// overwrite exists key handler
diagram.keyHandler.bindKeyHandler(ModifierKey.none, "Backspace", () => {
    // implementation
});
// add a new handler when user press 'shift + d'
diagram.keyHandler.bindKeyHandler(ModifierKey.shift, "d", () => {
    // implementation
});

```

### styling vertex and edge



## Advanced
### custom shape
### custom arrow heads

