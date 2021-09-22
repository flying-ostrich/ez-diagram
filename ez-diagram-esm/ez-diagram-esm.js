/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics$1 = function(d, b) {
    extendStatics$1 = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics$1(d, b);
};

function __extends$1(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics$1(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray$1(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

var EzDiagramNode = /** @class */ (function () {
    function EzDiagramNode(type) {
        this._id = v4();
        this._type = type;
    }
    Object.defineProperty(EzDiagramNode.prototype, "id", {
        /**
         * Getter id
         * @return {string}
         */
        get: function () {
            return this._id;
        },
        /**
         * Setter id
         * @param {string} value
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzDiagramNode.prototype, "type", {
        /**
         * Getter type
         * @return {string}
         */
        get: function () {
            return this._type;
        },
        /**
         * Setter type
         * @param {string} value
         */
        set: function (value) {
            this._type = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzDiagramNode.prototype, "parent", {
        /**
         * Getter parent
         * @return {EzDiagramNode}
         */
        get: function () {
            return this._parent;
        },
        /**
        * Setter parent
        * @param {EzDiagramNode} value
        */
        set: function (value) {
            this._parent = value;
        },
        enumerable: false,
        configurable: true
    });
    return EzDiagramNode;
}());

var COLOR_TRANSPARENT_WHITE = '#ffffff03';
var COLOR_WHITE = 'white';

var EZ_VIEW_VERTEX_CLASS = 'ez-vertex';
var EZ_VIEW_EDGE_CLASS = 'ez-edge';

var EzDirection;
(function (EzDirection) {
    EzDirection[EzDirection["TOP"] = 0] = "TOP";
    EzDirection[EzDirection["LEFT"] = 1] = "LEFT";
    EzDirection[EzDirection["BOTTOM"] = 2] = "BOTTOM";
    EzDirection[EzDirection["RIGHT"] = 3] = "RIGHT";
    EzDirection[EzDirection["TOP_LEFT"] = 4] = "TOP_LEFT";
    EzDirection[EzDirection["TOP_RIGHT"] = 5] = "TOP_RIGHT";
    EzDirection[EzDirection["BOTTOM_LEFT"] = 6] = "BOTTOM_LEFT";
    EzDirection[EzDirection["BOTTOM_RIGHT"] = 7] = "BOTTOM_RIGHT";
})(EzDirection || (EzDirection = {}));

var DEFAULT_STROKE_WIDTH = 1;
/** mouse action area is based on shape's real size with expanding tolerence */
var DEFAULT_MOUSE_ACTION_TOLERENCE = 4;
function getSvgStyle(style) {
    var svgStyle = {};
    Object.keys(style).forEach(function (key) {
        if (typeof (style[key]) === 'string' || typeof (style[key]) === 'number') {
            svgStyle[key] = style[key];
        }
    });
    if (svgStyle['fill'] === 'none') {
        svgStyle['fill'] = COLOR_TRANSPARENT_WHITE;
    }
    return svgStyle;
}
function getFontStyles(style) {
    var fontStyleAttributes = ['fontSize', 'color'];
    var result = {};
    Object.keys(style).forEach(function (key) {
        if (fontStyleAttributes.some(function (attrKey) { return attrKey === key; })) {
            result[key] = style[key];
        }
    });
    return result;
}

var style = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DEFAULT_STROKE_WIDTH: DEFAULT_STROKE_WIDTH,
    DEFAULT_MOUSE_ACTION_TOLERENCE: DEFAULT_MOUSE_ACTION_TOLERENCE,
    getSvgStyle: getSvgStyle,
    getFontStyles: getFontStyles
});

var DEFAULT_GRID_SIZE = 1;
var DEFAULT_ROTATION_STEP = 4;
/***********default vertex styles *****************/
var DEFAULT_VERTEX_FILL_COLOR = 'none';
var DEFAULT_VERTEX_STROKE_COLOR = 'black';
/***********default edge styles *****************/
var DEFAULT_EDGE_STROKE = 'black';
var DEFAULT_EDGE_STROKE_WIDTH = 2;

var EzConfigManager = /** @class */ (function () {
    function EzConfigManager() {
        /**
         *  specify rotation angle step , the value should between 0 and 90
         */
        this._rotationStep = DEFAULT_ROTATION_STEP;
        /**
         *  when user move element or element handler's bend on a diagram.
         *  the shortest distance should be the _gridSize
         */
        this._gridSize = DEFAULT_GRID_SIZE;
        /**
         *  specifiy whether the diagram should scale or translate using touch pad or mouse
         */
        this._shouldScaleAndTranslate = false;
    }
    Object.defineProperty(EzConfigManager.prototype, "shouldScaleAndTranslate", {
        /**
         * Getter shouldScaleAndTranslate
         * @return {boolean}
         */
        get: function () {
            return this._shouldScaleAndTranslate;
        },
        /**
        * Setter shouldScaleAndTranslate
        * @param {boolean} value
        */
        set: function (value) {
            this._shouldScaleAndTranslate = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzConfigManager.prototype, "gridSize", {
        /**
         * Getter gridSize
         * @return {number}
         */
        get: function () {
            return this._gridSize;
        },
        /**
         * Setter gridSize
         * @param {number} value
         */
        set: function (value) {
            this._gridSize = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzConfigManager.prototype, "rotationStep", {
        /**
         * Getter rotationStep
         * @return {number}
         */
        get: function () {
            return this._rotationStep;
        },
        /**
         * Setter rotationStep
         * @param {number} value
         */
        set: function (value) {
            this._rotationStep = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * default style for vertex
     */
    EzConfigManager.defaultVertexStyle = {
        fill: DEFAULT_VERTEX_FILL_COLOR,
        stroke: DEFAULT_VERTEX_STROKE_COLOR,
        strokeWidth: DEFAULT_STROKE_WIDTH
    };
    /**
     * default style for edge
     */
    EzConfigManager.defaultEdgeStyle = { stroke: DEFAULT_EDGE_STROKE,
        strokeWidth: DEFAULT_EDGE_STROKE_WIDTH };
    return EzConfigManager;
}());

var EzEdge = /** @class */ (function (_super) {
    __extends$1(EzEdge, _super);
    function EzEdge(points, style, type) {
        var _this = _super.call(this, type) || this;
        _this._points = points;
        _this._style = Object.assign({}, EzConfigManager.defaultEdgeStyle, style);
        return _this;
    }
    EzEdge.prototype.setEndPoint = function (vertex, constraint, isSource) {
        if (isSource === void 0) { isSource = false; }
        vertex.edges.push(this);
        if (isSource) {
            this._sourceConstraint = constraint;
            this._source = vertex;
        }
        else {
            this._targetConstraint = constraint;
            this._target = vertex;
        }
    };
    Object.defineProperty(EzEdge.prototype, "points", {
        /**
         * Getter points
         * @return {EzPoint[]}
         */
        get: function () {
            return this._points;
        },
        /**
         * Setter points
         * @param {EzPoint[]} value
         */
        set: function (value) {
            this._points = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzEdge.prototype, "style", {
        /**
         * Getter style
         * @return {EzEdgeStyleOptions}
         */
        get: function () {
            return this._style;
        },
        /**
         * Setter style
         * @param {EzEdgeStyleOptions} value
         */
        set: function (value) {
            this._style = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzEdge.prototype, "source", {
        /**
         * Getter source
         * @return {EzVertex}
         */
        get: function () {
            return this._source;
        },
        /**
         * Setter source
         * @param {EzVertex} value
         */
        set: function (value) {
            this._source = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzEdge.prototype, "target", {
        /**
         * Getter target
         * @return {EzVertex}
         */
        get: function () {
            return this._target;
        },
        /**
         * Setter target
         * @param {EzVertex} value
         */
        set: function (value) {
            this._target = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzEdge.prototype, "sourceConstraint", {
        /**
         * Getter sourceConstraint
         * @return {EzConstraint}
         */
        get: function () {
            return this._sourceConstraint;
        },
        /**
        * Setter sourceConstraint
        * @param {EzConstraint} value
        */
        set: function (value) {
            this._sourceConstraint = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzEdge.prototype, "targetConstraint", {
        /**
        * Getter targetConstraint
        * @return {EzConstraint}
        */
        get: function () {
            return this._targetConstraint;
        },
        /**
        * Setter targetConstraint
        * @param {EzConstraint} value
        */
        set: function (value) {
            this._targetConstraint = value;
        },
        enumerable: false,
        configurable: true
    });
    return EzEdge;
}(EzDiagramNode));

/**
 * EzConstaint defined how a side of edge connect to it's terminal vertex
 * The Ezcontaint use four properties to define the connection releationship
 * between edge and vertex: percentX / percentY / offsetX / offsetY
 * for example:
 * ```
 *   // the following constraint indicates one edge should connect the center point of it's terminal
 *   let contraint = new EzConstraint(0.5,0.5,0,0);
 *   // the following constraint indicates one edge should connect the top-left corner with 5 pixel offset on x axis
 *   let contraint = new EzConstraint(0,0,5,0);
 * ```
 *
 */
var EzConstraint = /** @class */ (function () {
    function EzConstraint(percentX, percentY, offsetX, offsetY) {
        this.percentX = 0;
        this.percentY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        {
            if (percentX < 0 || percentX > 1) {
                console.error("EzConstraint:invalid param.note 0<= percentX<=1, got " + percentX + " ");
            }
            if (percentY < 0 || percentY > 1) {
                console.error("EzConstraint:invalid param.note 0<= percentY<=1, got " + percentY + " ");
            }
        }
        this.percentX = percentX;
        this.percentY = percentY;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
    }
    EzConstraint.createByDirection = function (direction) {
        switch (direction) {
            case EzDirection.LEFT:
                return new EzConstraint(0, 0.5);
            case EzDirection.TOP:
                return new EzConstraint(0.5, 0);
            case EzDirection.RIGHT:
                return new EzConstraint(1, 0.5);
            case EzDirection.BOTTOM:
                return new EzConstraint(0.5, 1);
        }
    };
    return EzConstraint;
}());

var EZ_DIAGGRAM_DEFAULT_CONFIG = { VERTEX_CONSTRAINTS: [
        new EzConstraint(0.5, 0, 0, 0),
        new EzConstraint(1, 0.5, 0, 0),
        new EzConstraint(0.5, 1, 0, 0),
        new EzConstraint(0, 0.5, 0, 0),
    ] };

var EzVertex = /** @class */ (function (_super) {
    __extends$1(EzVertex, _super);
    function EzVertex(bounds, style, text, layout, type) {
        if (text === void 0) { text = ''; }
        var _this = _super.call(this, type) || this;
        _this._constraints = EZ_DIAGGRAM_DEFAULT_CONFIG.VERTEX_CONSTRAINTS;
        _this._edges = [];
        _this._text = '';
        _this._layoutChildren = [];
        _this._style = Object.assign({}, EzConfigManager.defaultVertexStyle, style);
        _this._bounds = bounds;
        _this._text = text;
        if (layout) {
            _this.layout = layout;
        }
        return _this;
    }
    /**
     * remove edge which connected to current vertex
     * @param edge
     */
    EzVertex.prototype.removeEdge = function (edge) {
        var edges = this._edges;
        var index = edges.indexOf(edge);
        if (index === -1) {
            {
                console.error('EzVertex:removeEdge no edge found!');
            }
            return false;
        }
        edges.splice(index, 1);
    };
    Object.defineProperty(EzVertex.prototype, "text", {
        /**
         * Getter text
         * @return {string}
         */
        get: function () {
            return this._text;
        },
        /**
         * Setter text
         * @param {string} value
         */
        set: function (value) {
            this._text = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzVertex.prototype, "bounds", {
        /**
         * Getter bounds
         * @return {EzRectangle}
         */
        get: function () {
            return this._bounds;
        },
        /**
         * Setter bounds
         * @param {EzRectangle} value
         */
        set: function (value) {
            this._bounds = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzVertex.prototype, "style", {
        /**
         * Getter style
         * @return {EzVertexStyleOptions}
         */
        get: function () {
            return this._style;
        },
        /**
         * Setter style
         * @param {EzVertexStyleOptions} value
         */
        set: function (value) {
            this._style = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzVertex.prototype, "edges", {
        /**
         * Setter style
         * @param {EzVertexStyleOptions} value
         */
        /**
         * Getter edges
         * @return {EzEdge[]}
         */
        get: function () {
            return this._edges;
        },
        /**
         * Setter edges
         * @param {EzEdge[]} value
         */
        set: function (value) {
            this._edges = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzVertex.prototype, "constraints", {
        /**
         * Getter constraints
         * @return {EzConstraint[]}
         */
        get: function () {
            return this._constraints;
        },
        /**
        * Setter constraints
        * @param {EzConstraint[]} value
        */
        set: function (value) {
            this._constraints = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzVertex.prototype, "layoutChildren", {
        /**
        * Getter layoutChildren
        * @return {EzVertex[]}
        */
        get: function () {
            return this._layoutChildren;
        },
        /**
        * Setter layoutChildren
        * @param {EzVertex[]} value
        */
        set: function (value) {
            this._layoutChildren = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzVertex.prototype, "layoutParent", {
        /**
         * Getter layoutParent
         * @return {EzVertex[]}
         */
        get: function () {
            return this._layoutParent;
        },
        /**
        * Setter layoutParent
        * @param {EzVertex} value
        */
        set: function (value) {
            this._layoutParent = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzVertex.prototype, "layout", {
        /**
         * Getter layout
         * @return {string}
         */
        get: function () {
            return this._layout;
        },
        /**
        * Setter layout
        * @param {string} value
        */
        set: function (value) {
            this._layout = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EzVertex.prototype, "layoutDirection", {
        /**
         * Getter layoutDirection
         * @return {EzDirection}
         */
        get: function () {
            return this._layoutDirection;
        },
        /**
        * Setter layoutDirection
        * @param {string} value
        */
        set: function (value) {
            this._layoutDirection = value;
        },
        enumerable: false,
        configurable: true
    });
    return EzVertex;
}(EzDiagramNode));

var EzModel = /** @class */ (function () {
    function EzModel() {
        this._nodeMap = new Map();
        this.nodes = [];
    }
    EzModel.prototype.isVertex = function (node) {
        return node instanceof EzVertex;
    };
    EzModel.prototype.isEdge = function (node) {
        return node instanceof EzEdge;
    };
    EzModel.prototype.addVertex = function (node) {
        this._nodeMap.set(node.id, node);
        this.nodes.push(node);
    };
    EzModel.prototype.removeVertex = function (node) {
        var idx = this.nodes.indexOf(node);
        if (idx === -1)
            return false;
        this.nodes.splice(idx, 1);
        this._nodeMap.delete(node.id);
        return true;
    };
    /**
     * add edge
     * @param node
     */
    EzModel.prototype.addEdge = function (node) {
        this._nodeMap.set(node.id, node);
        if (node.source) {
            node.source.edges.push(node);
        }
        if (node.target) {
            node.target.edges.push(node);
        }
        this.nodes.push(node);
    };
    /**
     * remove edge
     * @param node
     * @returns
     */
    EzModel.prototype.removeEdge = function (node) {
        var idx = this.nodes.indexOf(node);
        if (idx === -1)
            return false;
        this.nodes.splice(idx, 1);
        this._nodeMap.delete(node.id);
        if (node.source) {
            this.removeVertex(node.source);
        }
        if (node.target) {
            this.removeVertex(node.target);
        }
        return true;
    };
    /**
     * update or set related terminal vertex for edge
     * @param edge
     * @param terminal
     * @param constraint - terminal constraint
     * @param isSource - is source point of vertex
     */
    EzModel.prototype.updateTerminalVertex = function (edge, terminal, constraint, isSource) {
        if (isSource === void 0) { isSource = false; }
        if (isSource) {
            edge.source = terminal;
            edge.sourceConstraint = constraint;
        }
        else {
            edge.target = terminal;
            edge.targetConstraint = constraint;
        }
        terminal.edges.push(edge);
    };
    /**
     * change z index oder for given node
     * @param node
     * @param targetPosition
     *
     */
    EzModel.prototype.changeOrder = function (node, targetPosition) {
        if (targetPosition < 0)
            targetPosition = 0;
        if (targetPosition > this.nodes.length - 1)
            targetPosition = this.nodes.length - 1;
        var currentIndex = this.nodes.indexOf(node);
        var tmp = this.nodes[targetPosition];
        this.nodes[targetPosition] = node;
        this.nodes[currentIndex] = tmp;
    };
    /**
     * update bounds for vertex
     * @param vertex
     * @param bounds
     */
    EzModel.prototype.updateBounds = function (vertex, bounds) {
        vertex.bounds = bounds;
    };
    /**
     * return all layout root
     * @returns
     */
    EzModel.prototype.getLayoutRoots = function () {
        var roots = [];
        this._nodeMap.forEach(function (node) {
            if (node instanceof EzVertex && node.layout) {
                roots.push(node);
            }
        });
        return roots;
    };
    /**
     * edge connect to source or target vertex
     * @param edge
     * @param source
     * @param sourcePosition
     * @param target
     * @param targetPosition
     */
    EzModel.prototype.connect = function (edge, source, sourcePosition, target, targetPosition) {
        if (source) {
            edge.source = source;
            if (sourcePosition instanceof EzConstraint) {
                edge.sourceConstraint = sourcePosition;
            }
            else {
                edge.sourceConstraint = EzConstraint.createByDirection(sourcePosition);
            }
            edge.source.edges.push(edge);
        }
        if (target) {
            edge.target = target;
            if (targetPosition instanceof EzConstraint) {
                edge.targetConstraint = targetPosition;
            }
            else {
                edge.targetConstraint = EzConstraint.createByDirection(targetPosition);
            }
            edge.target.edges.push(edge);
        }
    };
    /**
     * set layout child
     * @param parent
     * @param child
     * @param direction
     * @param connectEdge
     */
    EzModel.prototype.setLayoutChild = function (parent, child, direction, connectEdge) {
        if (direction === void 0) { direction = EzDirection.BOTTOM; }
        child.layoutParent = parent;
        child.layoutDirection = direction;
        if (parent.layoutChildren.indexOf(child) === -1) {
            parent.layoutChildren.push(child);
        }
        if (connectEdge) {
            switch (direction) {
                case EzDirection.BOTTOM:
                    this.connect(connectEdge, parent, EzDirection.BOTTOM, child, EzDirection.TOP);
                    break;
                case EzDirection.LEFT:
                    this.connect(connectEdge, parent, EzDirection.LEFT, child, EzDirection.RIGHT);
                    break;
                case EzDirection.TOP:
                    this.connect(connectEdge, parent, EzDirection.TOP, child, EzDirection.BOTTOM);
                    break;
                case EzDirection.RIGHT:
                    this.connect(connectEdge, parent, EzDirection.RIGHT, child, EzDirection.LEFT);
                    break;
            }
        }
    };
    /**
     * change constarint for edge
     * @param edge
     * @param constraint
     * @param isSource
     */
    EzModel.prototype.changeConstraint = function (edge, constraint, isSource) {
        if (isSource === void 0) { isSource = false; }
        if (isSource) {
            if (edge.source) {
                if (constraint instanceof EzConstraint) {
                    edge.sourceConstraint = constraint;
                    this.updateConstraintPoint(edge, edge.source, isSource);
                }
                else {
                    edge.sourceConstraint = EzConstraint.createByDirection(constraint);
                    this.updateConstraintPoint(edge, edge.source, isSource);
                }
            }
            else {
                {
                    console.error('edge source not found');
                }
            }
        }
        else {
            if (edge.target) {
                if (constraint instanceof EzConstraint) {
                    edge.targetConstraint = constraint;
                    this.updateConstraintPoint(edge, edge.target, isSource);
                }
                else {
                    edge.targetConstraint = EzConstraint.createByDirection(constraint);
                    this.updateConstraintPoint(edge, edge.target, isSource);
                }
            }
            else {
                {
                    console.error('edge target not found');
                }
            }
        }
    };
    EzModel.prototype.updateConstraintPoint = function (edge, terminal, isSource) {
        if (isSource === void 0) { isSource = false; }
        var bounds = terminal.bounds;
        if (isSource) {
            var constraint = edge.sourceConstraint;
            var point = new EzPoint(bounds.x + bounds.width * constraint.percentX + constraint.offsetX, bounds.y + bounds.height * constraint.percentY + constraint.offsetY);
            edge.points[0] = point;
        }
        else {
            var constraint = edge.targetConstraint;
            var point = new EzPoint(bounds.x + bounds.width * constraint.percentX + constraint.offsetX, bounds.y + bounds.height * constraint.percentY + constraint.offsetY);
            edge.points[edge.points.length - 1] = point;
        }
    };
    return EzModel;
}());

var EzPoint = /** @class */ (function () {
    function EzPoint(x, y) {
        this.x = x;
        this.y = y;
    }
    EzPoint.prototype.translate = function (point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    };
    EzPoint.prototype.clone = function () {
        return new EzPoint(this.x, this.y);
    };
    return EzPoint;
}());

var EzRectangle = /** @class */ (function () {
    function EzRectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    /**
     *  return center point
     */
    EzRectangle.prototype.center = function () {
        return new EzPoint(this.x + this.width / 2, this.y + this.height / 2);
    };
    EzRectangle.prototype.clone = function () {
        return new EzRectangle(this.x, this.y, this.width, this.height);
    };
    EzRectangle.prototype.plain = function () {
        return {
            x: this.x, y: this.y, width: this.width, height: this.height
        };
    };
    EzRectangle.prototype.grow = function (expanding) {
        this.x -= expanding / 2;
        this.y -= expanding / 2;
        this.width += expanding;
        this.height += expanding;
        return this;
    };
    EzRectangle.prototype.add = function (rect) {
        var minX = Math.min(this.x, rect.x);
        var maxX = Math.max(this.x + this.width, rect.x + rect.width);
        var minY = Math.min(this.y, rect.y);
        var maxY = Math.max(this.y + this.height, rect.y + rect.height);
        this.x = minX;
        this.y = minY;
        this.width = maxX - minX;
        this.height = maxY - minY;
        return this;
    };
    EzRectangle.scale = function (_a, scale) {
        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        {
            if (scale <= 0) {
                console.error('scale for EzRectangle should larger than 0, got ', scale);
            }
        }
        var w = width * scale;
        var h = height * scale;
        return new EzRectangle(x + width * (1 - scale), y + height * (1 - scale), w, h);
    };
    EzRectangle.translate = function (_a, distance) {
        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        return new EzRectangle(x + distance.x, y + distance.y, width, height);
    };
    return EzRectangle;
}());

/**
 *  given two points , return a vector which starts from the startPoint
 *  and ends with endPoint
 * @param startPoint
 * @param endPoint
 */
function getVector(startPoint, endPoint) {
    return { x: endPoint.x - startPoint.x,
        y: endPoint.y - startPoint.y };
}
/**
 *  get norm of a given vector
 * @param vector
 */
function getNormOfVector(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}
/**
 *  get a scalar mul val of a given vector
 * @param vector
 * @param scalar
 * @returns
 */
function getScalarMulOfVector(vector, scalar) {
    return { x: vector.x * scalar,
        y: vector.y * scalar };
}
/**
 *  get unit vector of a given vector
 * @param vector
 */
function getUnitVector(vector) {
    var norm = getNormOfVector(vector);
    return getScalarMulOfVector(vector, 1 / norm);
}
/**
 *  given a vector and it’s start point , return end point
 * @param vector
 * @param startPoint
 */
function getVectorEndPoint(vector, startPoint) {
    return new EzPoint(vector.x + startPoint.x, vector.y + startPoint.y);
}
/**
 * calculate bounding box from points
 * @param points
 */
function getBoundingBoxFromPoints(points) {
    var xs = points.map(function (p) { return p.x; });
    var ys = points.map(function (p) { return p.y; });
    var _a = [Math.min.apply(Math, xs), Math.max.apply(Math, xs), Math.min.apply(Math, ys), Math.max.apply(Math, ys)], xMin = _a[0], xMax = _a[1], yMin = _a[2], yMax = _a[3];
    return new EzRectangle(xMin, yMin, xMax - xMin, yMax - yMin);
}
/**
 * get dot product of two vectors
 * @param vector1
 * @param vector2
 * @returns
 */
function getDotProduct(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y;
}
/**
 * get included angle of two vectors
 * @param vector1
 * @param vector2
 * @returns
 */
function getIncludedAngleOfTwoVector(vector1, vector2) {
    var dotProduct = getDotProduct(vector1, vector2);
    var norm1 = getNormOfVector(vector1);
    var norm2 = getNormOfVector(vector2);
    var cosAngle = dotProduct / (norm1 * norm2);
    var radian = Math.acos(cosAngle);
    return (radian * 180) / Math.PI;
}
/**
 * get vector1's projection on vector2
 * @param vector1
 * @param vector2
 */
function getVectorProjection(vector1, vector2) {
    return (vector1.x * vector2.x + vector1.y * vector2.y) / getNormOfVector(vector2);
}
/**
 * get four vertexes of a rectangle
 * @param rect
 * @returns
 */
function toRectPoints(rect, rotation) {
    if (rotation === void 0) { rotation = 0; }
    var points = {
        TOP_LEFT: getRotatedPoint(new EzPoint(rect.x, rect.y), rotation, rect.center()),
        TOP_RIGHT: getRotatedPoint(new EzPoint(rect.x + rect.width, rect.y), rotation, rect.center()),
        BOTTOM_LEFT: getRotatedPoint(new EzPoint(rect.x, rect.y + rect.height), rotation, rect.center()),
        BOTTOM_RIGHT: getRotatedPoint(new EzPoint(rect.x + rect.width, rect.y + rect.height), rotation, rect.center())
    };
    return points;
}
/**
 * return if the given point is inside a rectangle
 * @param rectPoints
 * @param point
 * @returns
 */
function isPointInsideRect(rectPoints, point) {
    var getCross = function (p1, p2, p) {
        return (p2.x - p1.x) * (p.y - p1.y) - (p.x - p1.x) * (p2.y - p1.y);
    };
    return (getCross(rectPoints.BOTTOM_LEFT, rectPoints.TOP_LEFT, point) * getCross(rectPoints.TOP_RIGHT, rectPoints.BOTTOM_RIGHT, point) >= 0 &&
        getCross(rectPoints.TOP_LEFT, rectPoints.TOP_RIGHT, point) * getCross(rectPoints.BOTTOM_RIGHT, rectPoints.BOTTOM_LEFT, point) >= 0);
}
function getRotatedPoint(originalPoint, rotation, rotateCenterPoint) {
    var x = originalPoint.x - rotateCenterPoint.x;
    var y = originalPoint.y - rotateCenterPoint.y;
    var cos = Math.cos(toRadians(rotation));
    var sin = Math.sin(toRadians(rotation));
    var dx = x * cos - y * sin;
    var dy = y * cos + x * sin;
    return new EzPoint(rotateCenterPoint.x + dx, rotateCenterPoint.y + dy);
}
function toRadians(deg) {
    return (Math.PI * deg) / 180;
}
function getCenterPoint(point1, point2) {
    return new EzPoint((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
}

var math = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getVector: getVector,
    getNormOfVector: getNormOfVector,
    getScalarMulOfVector: getScalarMulOfVector,
    getUnitVector: getUnitVector,
    getVectorEndPoint: getVectorEndPoint,
    getBoundingBoxFromPoints: getBoundingBoxFromPoints,
    getDotProduct: getDotProduct,
    getIncludedAngleOfTwoVector: getIncludedAngleOfTwoVector,
    getVectorProjection: getVectorProjection,
    toRectPoints: toRectPoints,
    isPointInsideRect: isPointInsideRect,
    getRotatedPoint: getRotatedPoint,
    toRadians: toRadians,
    getCenterPoint: getCenterPoint
});

var EzDiagramPlugin = /** @class */ (function () {
    function EzDiagramPlugin(diagram, context) {
        this.active = true;
        this.disabled = false;
        this.diagram = diagram;
        this.context = context;
    }
    EzDiagramPlugin.prototype.setDisabled = function (disabled) {
        this.disabled = disabled;
    };
    /**
     * this method defermine the plugin active status.
     * if return true , plugin hook will be correctly called , otherwise , hook will be disabled.
     * note that subclass can overwrite this method to determine plugin active status
     * @returns
     */
    EzDiagramPlugin.prototype.canActivate = function () {
        return true;
    };
    EzDiagramPlugin.prototype.onDeActivate = function () { };
    return EzDiagramPlugin;
}());

var EzDiagramPluginManager = /** @class */ (function () {
    function EzDiagramPluginManager(diagram) {
        this.plugins = new Map();
        this.pluginContext = {};
        this.diagram = diagram;
    }
    /**
     * register a new diagram plugin
     * @param pluginName
     * @param plugin
     * @param rerender - specify if the view should rerender
     */
    EzDiagramPluginManager.prototype.use = function (pluginName, plugin, rerender) {
        if (rerender === void 0) { rerender = false; }
        if (!this.plugins.has(pluginName)) {
            this.plugins.set(pluginName, plugin);
            if (rerender) {
                this.diagram.render();
            }
        }
        else {
            {
                console.error("EzDiagramPluginManager:use plugin " + pluginName + " is already existed");
            }
        }
    };
    /**
     * remove plugin by the given plugin name
     * @param pluginName
     * @param rerender
     */
    EzDiagramPluginManager.prototype.remove = function (pluginName, rerender) {
        if (rerender === void 0) { rerender = true; }
        if (this.plugins.has(pluginName)) {
            this.plugins.delete(pluginName);
            if (rerender) {
                this.diagram.render();
            }
        }
        else {
            {
                console.error("EzDiagramPluginManager:remove plugin " + pluginName + " is not found");
            }
        }
    };
    /**
     * get plugin instance
     * @param pluginName
     * @returns
     */
    EzDiagramPluginManager.prototype.get = function (pluginName) {
        if (this.plugins.has(pluginName)) {
            return this.plugins.get(pluginName);
        }
    };
    /**
     * call a hook by the given hook name
     * @param hookName
     * @param restArgs
     */
    EzDiagramPluginManager.prototype.callHook = function (hookName) {
        var restArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            restArgs[_i - 1] = arguments[_i];
        }
        var plugins = this.diagram.pluginManager.getPlugins();
        plugins.forEach(function (plugin) {
            if (plugin.canActivate() && !plugin.disabled) {
                plugin.active = true;
                var eventHook = plugin === null || plugin === void 0 ? void 0 : plugin[hookName];
                if (!eventHook)
                    return;
                eventHook.apply(plugin, restArgs);
            }
            else if (plugin.active) {
                plugin.active = false;
                plugin === null || plugin === void 0 ? void 0 : plugin.onDeActivate();
            }
        });
    };
    EzDiagramPluginManager.prototype.getPlugins = function () {
        return this.plugins;
    };
    EzDiagramPluginManager.prototype.getContext = function () {
        return this.pluginContext;
    };
    return EzDiagramPluginManager;
}());

function camelCaseToHyphenCase(camelCaseStr) {
    return camelCaseStr.split(/(?=[A-Z])/).map(function (i) { return i.toLowerCase(); }).join('-');
}
function isMac() {
    var v = navigator.appVersion;
    if (!v)
        return false;
    return v.indexOf('Mac') !== -1;
}

var SVG_NAME_SPACE = 'http://www.w3.org/2000/svg';
var HTML_NAME_SPACE = 'http://www.w3.org/1999/xhtml';
var EzElement = /** @class */ (function () {
    function EzElement(el, xmlns) {
        if (xmlns === void 0) { xmlns = SVG_NAME_SPACE; }
        this.relativeMode = false;
        this.pathDefs = [];
        if (el instanceof Element) {
            this.el = el;
        }
        else {
            this.el = document.createElementNS(xmlns, el);
        }
    }
    EzElement.prototype.beginPath = function (relativeMode, bounds) {
        this.bounds = bounds;
        this.relativeMode = relativeMode;
        return this;
    };
    EzElement.prototype.moveTo = function (x, y) {
        var pt = this._transformedPt(x, y);
        this.pathDefs.push("M" + pt.x + " " + pt.y);
        return this;
    };
    EzElement.prototype.lineTo = function (x, y) {
        var pt = this._transformedPt(x, y);
        this.pathDefs.push("L" + pt.x + " " + pt.y);
        return this;
    };
    EzElement.prototype.curveTo = function (cx1, cy1, cx2, cy2, x, y) {
        var c1 = this._transformedPt(cx1, cy1);
        var c2 = this._transformedPt(cx2, cy2);
        var t = this._transformedPt(x, y);
        this.pathDefs.push("C" + c1.x + " " + c1.y + " " + c2.x + " " + c2.y + " " + t.x + " " + t.y);
        return this;
    };
    EzElement.prototype.arcTo = function (rx, ry, rotation, largeArcFlag, sweepFlag, x, y) {
        var pt = this._transformedPt(x, y);
        this.pathDefs.push("A" + rx + " " + ry + " " + rotation + " " + largeArcFlag + " " + sweepFlag + " " + pt.x + " " + pt.y);
        return this;
    };
    EzElement.prototype._transformedPt = function (x, y) {
        return { x: this.relativeMode ? (this.bounds.x + this.bounds.width * x) : x, y: this.relativeMode ? (this.bounds.y + this.bounds.height * y) : y };
    };
    EzElement.prototype.closePath = function () {
        this.attr({ d: this.pathDefs.join(' ') + 'Z' });
        this.bounds = null;
        this.relativeMode = false;
        this.pathDefs = [];
        return this;
    };
    EzElement.prototype.prependChild = function (child) {
        this.el.prepend(child.el);
        return this;
    };
    EzElement.prototype.appendChild = function (child) {
        this.el.appendChild(child.el);
        return this;
    };
    EzElement.prototype.appendChildren = function (children) {
        var _this = this;
        children.map(function (c) { return c.el; }).forEach(function (el) { return _this.el.appendChild(el); });
        return this;
    };
    /**
     *  return current element's child elements
     */
    EzElement.prototype.childElements = function () {
        var childEls = [].slice.call(this.el.children);
        return childEls.map(function (el) { return EzElement.el(el); });
    };
    EzElement.prototype.attr = function (attr, toHyphenCase) {
        var _this = this;
        if (toHyphenCase === void 0) { toHyphenCase = true; }
        Object.keys(attr).forEach(function (key) {
            if (toHyphenCase) {
                var attrName = camelCaseToHyphenCase(key);
                _this.el.setAttribute(attrName, '' + attr[key]);
            }
            else {
                _this.el.setAttribute(key, '' + attr[key]);
            }
        });
        return this;
    };
    EzElement.prototype.getAttr = function (key) {
        return this.el.getAttribute(key);
    };
    EzElement.prototype.hasAttr = function (key) {
        return this.el.hasAttribute(key);
    };
    EzElement.prototype.removeAttr = function (attr) {
        var attrName = camelCaseToHyphenCase(attr);
        this.el.removeAttribute(attrName);
        return this;
    };
    EzElement.prototype.style = function (attr) {
        var el = this.el;
        Object.keys(attr).forEach(function (key) {
            el.style[key] = attr[key];
        });
        return this;
    };
    EzElement.prototype.line = function (points) {
        var d = '';
        points.forEach(function (point, index) {
            if (index === 0) {
                d += "M " + point.x + " " + point.y;
            }
            else {
                d += " L " + point.x + " " + point.y;
            }
        });
        this.attr({ d: d });
        return this;
    };
    /**
     * add a "handler" attribute to element.
     * every handler element (such as vertex handler or edge handlder) should have this attribute
     * @returns
     */
    EzElement.prototype.asHandler = function () {
        return this.attr({ handler: 1 });
    };
    /**
     * clear innerHTML of current element
     * @returns
     */
    EzElement.prototype.empty = function () {
        this.el.innerHTML = '';
        return this;
    };
    EzElement.prototype.clone = function () {
        return EzElement.el(this.el.cloneNode(true));
    };
    /**
     * find the nearest ancestor with the given selector
     * @param el
     * @param selector
     * @returns
     */
    EzElement.prototype.nearestAncestor = function (selector) {
        var el = this.el;
        var parent = el.parentElement;
        while (parent) {
            if (parent.matches(selector)) {
                return EzElement.el(parent);
            }
            parent = parent.parentElement;
        }
    };
    /**
     * find the farest ancestor  with the given selector
     * @param el
     * @param selector
     * @returns
     */
    EzElement.prototype.farestAncestor = function (selector) {
        var el = this.el;
        var parent = el.parentElement;
        var result;
        while (parent) {
            if (parent.matches(selector)) {
                result = parent;
            }
            parent = parent.parentElement;
        }
        if (result) {
            return EzElement.el(result);
        }
    };
    /**
     * return if the current element matches the given selector
     * @param selector
     */
    EzElement.prototype.is = function (selector) {
        return this.el.matches(selector);
    };
    /**
     * remove element from document
     */
    EzElement.prototype.remove = function () {
        this.el.remove();
    };
    /**
     * set el innerHTML
     * @param html
     * @returns
     */
    EzElement.prototype.html = function (html) {
        this.el.innerHTML = html;
        return this;
    };
    /**
     * return the first element child of current elment
     */
    EzElement.prototype.firstElementChild = function () {
        var c = this.el.firstElementChild;
        if (c) {
            return EzElement.el(c);
        }
    };
    /**
     * retrieve data from element's dataSet with the given key
     * @param key
     * @returns
     */
    EzElement.prototype.data = function (key) {
        var el = this.el;
        return el.dataset[key];
    };
    /**
     * insert current element before the given element
     * @param el
     */
    EzElement.prototype.insertBefore = function (el) {
        this.el.parentNode.insertBefore(this.el, el.el);
        return this;
    };
    EzElement.el = function (tag, xmlns) {
        if (xmlns === void 0) { xmlns = SVG_NAME_SPACE; }
        return new EzElement(tag, xmlns);
    };
    EzElement.line = function (points) {
        return new EzElement('path').line(points);
    };
    return EzElement;
}());

var EzShape = /** @class */ (function () {
    function EzShape() {
        this.root = EzElement.el('g');
    }
    EzShape.prototype.setStyle = function (style) {
        this.style = style;
    };
    EzShape.prototype.destroy = function () {
        this.onDestroy();
        this.root.remove();
    };
    /**
     * life cycle hook , invoke before shape destroy
     */
    EzShape.prototype.onDestroy = function () { };
    return EzShape;
}());

var STATE_WORK_TYPE;
(function (STATE_WORK_TYPE) {
    STATE_WORK_TYPE[STATE_WORK_TYPE["NO_WORK"] = 0] = "NO_WORK";
    STATE_WORK_TYPE[STATE_WORK_TYPE["REMOVE"] = 1] = "REMOVE";
    STATE_WORK_TYPE[STATE_WORK_TYPE["NEED_CREATE"] = 2] = "NEED_CREATE";
    STATE_WORK_TYPE[STATE_WORK_TYPE["UPDATE_FROM_MODEL"] = 3] = "UPDATE_FROM_MODEL";
    STATE_WORK_TYPE[STATE_WORK_TYPE["UPDATE_TO_MODEL"] = 4] = "UPDATE_TO_MODEL";
    STATE_WORK_TYPE[STATE_WORK_TYPE["UPDATE_VIEW"] = 5] = "UPDATE_VIEW";
})(STATE_WORK_TYPE || (STATE_WORK_TYPE = {}));
var EzState = /** @class */ (function () {
    function EzState(view) {
        this._updateWork = STATE_WORK_TYPE.NEED_CREATE;
        this.view = view;
        this.id = v4();
    }
    EzState.prototype.scalePoints = function (scale, points, translate) {
        return points.map(function (point) {
            return new EzPoint((point.x + translate.x) * scale, (point.y + translate.y) * scale);
        });
    };
    Object.defineProperty(EzState.prototype, "updateWork", {
        get: function () {
            return this._updateWork;
        },
        set: function (value) {
            if (!this.shape) {
                value = STATE_WORK_TYPE.NEED_CREATE;
            }
            if (value !== STATE_WORK_TYPE.NO_WORK) {
                if (this.view.dirtyStates.indexOf(this) === -1) {
                    this.view.dirtyStates.push(this);
                }
            }
            this._updateWork = value;
        },
        enumerable: false,
        configurable: true
    });
    return EzState;
}());
var EzVertexViewState = /** @class */ (function (_super) {
    __extends$1(EzVertexViewState, _super);
    function EzVertexViewState(vertex, view) {
        var _this = _super.call(this, view) || this;
        _this.node = vertex;
        _this.bounds = vertex.bounds.clone();
        _this.style = Object.assign({}, vertex.style);
        return _this;
    }
    EzVertexViewState.prototype.translate = function (delta) {
        this.bounds = EzRectangle.translate(this.bounds, delta);
    };
    EzVertexViewState.prototype.scaleAndTranslate = function (scale, translate) {
        var points = toRectPoints(this.node.bounds);
        var scaled = this.scalePoints(scale, [points.TOP_LEFT, points.TOP_RIGHT, points.BOTTOM_LEFT, points.BOTTOM_RIGHT], translate);
        this.bounds = getBoundingBoxFromPoints(scaled);
    };
    EzVertexViewState.prototype.getBounds = function () {
        return this.bounds;
    };
    EzVertexViewState.prototype.clone = function () {
        var state = new EzVertexViewState(this.node, this.view);
        state.id = this.id;
        state.bounds = this.bounds.clone();
        state.style = Object.assign({}, this.style);
        return state;
    };
    return EzVertexViewState;
}(EzState));
var EzEdgeViewState = /** @class */ (function (_super) {
    __extends$1(EzEdgeViewState, _super);
    function EzEdgeViewState(edge, view) {
        var _this = _super.call(this, view) || this;
        _this.node = edge;
        _this.points = edge.points.map(function (pt) { return pt.clone(); });
        _this.style = Object.assign({}, edge.style);
        return _this;
    }
    EzEdgeViewState.prototype.translate = function (translate) {
        this.points = this.points.map(function (pt) { return pt.translate(translate); });
    };
    EzEdgeViewState.prototype.scaleAndTranslate = function (scale, translate) {
        var points = this.node.points;
        this.style.strokeWidth = (this.style.strokeWidth || DEFAULT_STROKE_WIDTH) * scale;
        this.points = this.scalePoints(scale, points, translate);
    };
    EzEdgeViewState.prototype.getBounds = function () {
        return getBoundingBoxFromPoints(this.points);
    };
    EzEdgeViewState.prototype.getPoints = function () {
        return this.points;
    };
    EzEdgeViewState.prototype.clone = function () {
        var state = new EzEdgeViewState(this.node, this.view);
        state.id = this.id;
        state.points = this.points.map(function (pt) { return pt.clone(); });
        state.style = Object.assign({}, this.style);
        return state;
    };
    return EzEdgeViewState;
}(EzState));

var EzVertexShape = /** @class */ (function (_super) {
    __extends$1(EzVertexShape, _super);
    function EzVertexShape(state) {
        var _this = _super.call(this) || this;
        {
            if (!(state instanceof EzVertexViewState)) {
                console.error("EzRectangleShape: expect state instance of EzVertexViewState, got " + Object.prototype.toString.call(state));
            }
        }
        _this.state = state;
        _this.style = getSvgStyle(_this.state.style);
        _this.root.attr({ dataId: state.node.id, class: EZ_VIEW_VERTEX_CLASS });
        _this.root.el['state'] = _this.state;
        return _this;
    }
    EzVertexShape.prototype.draw = function () {
        this._updateRotation();
        this.style = getSvgStyle(this.state.style);
    };
    EzVertexShape.prototype.redraw = function () {
        this._updateRotation();
        this.style = getSvgStyle(this.state.style);
    };
    EzVertexShape.prototype._updateRotation = function () {
        var state = this.state.alternate || this.state;
        var center = state.getBounds().center();
        this.root.attr({ transform: "rotate(" + (state.style.rotation || 0) + "," + center.x + "," + center.y + ")" });
    };
    EzVertexShape.prototype.updateStyle = function () { };
    EzVertexShape.prototype.onStartEditing = function () { };
    EzVertexShape.prototype.onStopEditing = function () { };
    EzVertexShape.prototype.onClick = function () { };
    EzVertexShape.prototype.onDblClick = function () { };
    EzVertexShape.prototype.onMouseMove = function () { };
    EzVertexShape.prototype.onMouseDown = function () { };
    EzVertexShape.prototype.onMouseUp = function () { };
    return EzVertexShape;
}(EzShape));

var EditableVertexShape = /** @class */ (function (_super) {
    __extends$1(EditableVertexShape, _super);
    function EditableVertexShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditableVertexShape.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var bounds = this.state.getBounds().plain();
        this.text = EzElement.el('div', HTML_NAME_SPACE).html(this.state.node.text).style({
            width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', userSelect: 'none'
        });
        this.foreignObject = EzElement.el('foreignObject').attr(__assign({}, bounds)).appendChild(this.text);
        this.root.prependChild(this.foreignObject);
        this._udpateStyle();
    };
    EditableVertexShape.prototype.redraw = function () {
        _super.prototype.redraw.call(this);
        var state = this.state.alternate || this.state;
        var bounds = state.getBounds().plain();
        this.foreignObject.attr(bounds);
        this.text.html(state.node.text);
        this._udpateStyle();
    };
    EditableVertexShape.prototype.onStartEditing = function () {
        this.foreignObject.style({ display: 'none' });
    };
    EditableVertexShape.prototype.onStopEditing = function () {
        this.foreignObject.style({ display: 'block' });
    };
    EditableVertexShape.prototype._udpateStyle = function () {
        var textStyle = getFontStyles(this.state.style);
        this.text.style(textStyle);
    };
    return EditableVertexShape;
}(EzVertexShape));

var EzSimpleEditableVertexShape = /** @class */ (function (_super) {
    __extends$1(EzSimpleEditableVertexShape, _super);
    function EzSimpleEditableVertexShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EzSimpleEditableVertexShape.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.shape = this.createShapeElement();
        this.updateShape();
        this.updateStyle();
        this.root.prependChild(this.shape);
    };
    EzSimpleEditableVertexShape.prototype.redraw = function () {
        _super.prototype.redraw.call(this);
        this.updateShape();
        this.updateStyle();
    };
    EzSimpleEditableVertexShape.prototype.updateStyle = function () {
        var _a;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.attr(this.style);
    };
    return EzSimpleEditableVertexShape;
}(EditableVertexShape));

var EzRectangleShape = /** @class */ (function (_super) {
    __extends$1(EzRectangleShape, _super);
    function EzRectangleShape(state) {
        return _super.call(this, state) || this;
    }
    EzRectangleShape.prototype.createShapeElement = function () {
        return EzElement.el('rect');
    };
    EzRectangleShape.prototype.updateShape = function () {
        var state = this.state.alternate || this.state;
        var bounds = state.getBounds().plain();
        this.shape.attr(__assign(__assign({}, bounds), { fill: COLOR_TRANSPARENT_WHITE }));
    };
    return EzRectangleShape;
}(EzSimpleEditableVertexShape));

var EzEdgeShape = /** @class */ (function (_super) {
    __extends$1(EzEdgeShape, _super);
    function EzEdgeShape(state) {
        var _this = _super.call(this) || this;
        {
            if (!(state instanceof EzEdgeViewState)) {
                console.error("EzEdgeShape: expect state instance of EzEdgeViewState, got " + Object.prototype.toString.call(state));
            }
        }
        _this.state = state;
        _this.style = getSvgStyle(_this.state.style);
        _this.root.attr({ dataId: state.node.id, class: EZ_VIEW_EDGE_CLASS, });
        _this.root.el['state'] = state;
        return _this;
    }
    EzEdgeShape.prototype.updateStyle = function () { };
    return EzEdgeShape;
}(EzShape));

/**
 *  EzLineShape is a kind of edge shape , which points are all connected with straight line
 */
var EzLineShape = /** @class */ (function (_super) {
    __extends$1(EzLineShape, _super);
    function EzLineShape(state) {
        return _super.call(this, state) || this;
    }
    EzLineShape.prototype.draw = function () {
        var state = this.state;
        var markerStyle = {};
        var points = state.points;
        if (this.style.markerStart) {
            markerStyle.markerStart = "url(#" + this.style.markerStart + ")";
        }
        if (this.style.markerEnd) {
            markerStyle.markerEnd = "url(#" + this.style.markerEnd + ")";
        }
        this.style.fill = 'none';
        this.setStyle(__assign(__assign(__assign({}, this.style), markerStyle), { fill: 'none' }));
        this.line = EzElement.line(points).attr(this.style);
        this.transparentLine = this.line.clone()
            .attr({ strokeWidth: +this.style.strokeWidth + DEFAULT_MOUSE_ACTION_TOLERENCE, stroke: COLOR_TRANSPARENT_WHITE })
            .removeAttr('markerStart')
            .removeAttr('markerEnd');
        this.root.appendChildren([this.line, this.transparentLine]);
    };
    EzLineShape.prototype.redraw = function () {
        var state = (this.state.alternate || this.state);
        this.line.line(state.points);
        this.transparentLine.line(state.points);
    };
    return EzLineShape;
}(EzEdgeShape));

var AlternateProcessShape = /** @class */ (function (_super) {
    __extends$1(AlternateProcessShape, _super);
    function AlternateProcessShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlternateProcessShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    AlternateProcessShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0, 0.05).curveTo(0, 0, 0, 0, 0.05, 0).lineTo(0.95, 0).curveTo(1, 0, 1, 0, 1, 0.05).lineTo(1, 0.95).curveTo(1, 1, 1, 1, 0.95, 1).lineTo(0.05, 1).curveTo(0, 1, 0, 1, 0, 0.95).lineTo(0, 0.05).closePath();
    };
    return AlternateProcessShape;
}(EzSimpleEditableVertexShape));

var DataShape = /** @class */ (function (_super) {
    __extends$1(DataShape, _super);
    function DataShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    DataShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0.196, 0.084).curveTo(0.208, 0.031, 0.227, 0, 0.247, 0.001).lineTo(0.945, 0.001).curveTo(0.961, 0.001, 0.977, 0.01, 0.987, 0.026).lineTo(0.997, 0.043).curveTo(1, 0.064, 0.996, 0.084, 0.804, 0.916).lineTo(0.792, 0.969).curveTo(0.773, 1, 0.753, 0.999, 0.044, 0.999).lineTo(0.03, 0.995).curveTo(0.018, 0.985, 0.01, 0.969, 0.002, 0.953).lineTo(0.004, 0.916).lineTo(0.196, 0.084).closePath();
    };
    return DataShape;
}(EzSimpleEditableVertexShape));

var DecisionShape = /** @class */ (function (_super) {
    __extends$1(DecisionShape, _super);
    function DecisionShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DecisionShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    DecisionShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0, 0.5).lineTo(0.5, 0).lineTo(1, 0.5).lineTo(0.5, 1).lineTo(0, 0.5).closePath();
    };
    return DecisionShape;
}(EzSimpleEditableVertexShape));

var DelayShape = /** @class */ (function (_super) {
    __extends$1(DelayShape, _super);
    function DelayShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DelayShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    DelayShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0, 0.05).curveTo(0, 0, 0, 0, 0.05, 0).lineTo(0.9, 0).curveTo(1, 0.25, 1, 0.75, 0.9, 1).lineTo(0.05, 1).curveTo(0, 1, 0, 1, 0, 0.95).lineTo(0, 0.05).closePath();
    };
    return DelayShape;
}(EzSimpleEditableVertexShape));

var DisplayShape = /** @class */ (function (_super) {
    __extends$1(DisplayShape, _super);
    function DisplayShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DisplayShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    DisplayShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0, 0.5).curveTo(0.082, 0.233, 0.224, 0.05, 0.388, 0).lineTo(0.796, 0).curveTo(0.918, 0.083, 1, 0.283, 1, 0.5).curveTo(1, 0.7, 0.918, 0.9, 0.796, 1).lineTo(0.388, 1).curveTo(0.224, 0.933, 0.082, 0.75, 0, 0.5).closePath();
    };
    return DisplayShape;
}(EzSimpleEditableVertexShape));

var DocumentShape = /** @class */ (function (_super) {
    __extends$1(DocumentShape, _super);
    function DocumentShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocumentShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    DocumentShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0, 0.067).curveTo(0, 0.05, 0, 0.033, 0.01, 0.017).curveTo(0.02, 0, 0.031, 0, 0.051, 0).lineTo(0.949, 0).curveTo(0.959, 0, 0.969, 0, 0.98, 0.017).curveTo(0.99, 0.033, 1, 0.05, 1, 0.067).lineTo(1, 0.9).curveTo(0.837, 0.8, 0.653, 0.8, 0.5, 0.9).curveTo(0.337, 1, 0.153, 1, 0, 0.9).closePath();
    };
    return DocumentShape;
}(EzSimpleEditableVertexShape));

var InputOutputShape = /** @class */ (function (_super) {
    __extends$1(InputOutputShape, _super);
    function InputOutputShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputOutputShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    InputOutputShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0.25, 0).lineTo(1, 0).lineTo(0.75, 1).lineTo(0, 1).lineTo(0.25, 0).closePath();
    };
    return InputOutputShape;
}(EzSimpleEditableVertexShape));

var ManualInputShape = /** @class */ (function (_super) {
    __extends$1(ManualInputShape, _super);
    function ManualInputShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ManualInputShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    ManualInputShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0, 0.417).lineTo(0.939, 0).curveTo(0.969, 0, 0.99, 0.033, 0.99, 0.083).lineTo(0.99, 0.917).curveTo(1, 0.95, 0.98, 0.983, 0.949, 1).lineTo(0.051, 1).curveTo(0.02, 1, 0, 0.95, 0, 0.917).lineTo(0, 0.417).closePath();
    };
    return ManualInputShape;
}(EzSimpleEditableVertexShape));

var ManualOperationShape = /** @class */ (function (_super) {
    __extends$1(ManualOperationShape, _super);
    function ManualOperationShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ManualOperationShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    ManualOperationShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0, 0).lineTo(1, 0).lineTo(0.8, 1).lineTo(0.2, 1).closePath();
    };
    return ManualOperationShape;
}(EzSimpleEditableVertexShape));

var MultiDocumentShape = /** @class */ (function (_super) {
    __extends$1(MultiDocumentShape, _super);
    function MultiDocumentShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiDocumentShape.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.shape1 = EzElement.el('path').attr({ fill: COLOR_WHITE, stroke: 'black' });
        this.shape2 = this.shape1.clone();
        this.shape3 = this.shape1.clone();
        this._drawShape();
        this.root.prependChild(this.shape3);
        this.root.prependChild(this.shape2);
        this.root.prependChild(this.shape1);
    };
    MultiDocumentShape.prototype.redraw = function () {
        _super.prototype.redraw.call(this);
        this._drawShape();
    };
    MultiDocumentShape.prototype._drawShape = function () {
        var _a, _b, _c;
        var state = this.state.alternate || this.state;
        var bounds1 = state.getBounds().clone();
        bounds1.width -= bounds1.width * 0.09;
        bounds1.height -= bounds1.height * 0.12;
        bounds1.x += bounds1.width * 0.09;
        (_a = this.shape1) === null || _a === void 0 ? void 0 : _a.beginPath(true, bounds1).moveTo(0, 0.067).curveTo(0, 0.05, 0, 0.033, 0.01, 0.017).curveTo(0.02, 0, 0.031, 0, 0.051, 0).lineTo(0.949, 0).curveTo(0.959, 0, 0.969, 0, 0.98, 0.017).curveTo(0.99, 0.033, 1, 0.05, 1, 0.067).lineTo(1, 0.9).curveTo(0.837, 0.8, 0.653, 0.8, 0.5, 0.9).curveTo(0.337, 1, 0.153, 1, 0, 0.9).closePath();
        var bounds2 = state.getBounds().clone();
        bounds2.width -= bounds2.width * 0.09;
        bounds2.height -= bounds2.height * 0.12;
        bounds2.x += bounds2.width * 0.045;
        bounds2.y += bounds2.height * 0.06;
        (_b = this.shape2) === null || _b === void 0 ? void 0 : _b.beginPath(true, bounds2).moveTo(0, 0.067).curveTo(0, 0.05, 0, 0.033, 0.01, 0.017).curveTo(0.02, 0, 0.031, 0, 0.051, 0).lineTo(0.949, 0).curveTo(0.959, 0, 0.969, 0, 0.98, 0.017).curveTo(0.99, 0.033, 1, 0.05, 1, 0.067).lineTo(1, 0.9).curveTo(0.837, 0.8, 0.653, 0.8, 0.5, 0.9).curveTo(0.337, 1, 0.153, 1, 0, 0.9).closePath();
        var bounds3 = state.getBounds().clone();
        bounds3.width -= bounds3.width * 0.09;
        bounds3.height -= bounds3.height * 0.12;
        bounds3.y += bounds3.height * 0.12;
        (_c = this.shape3) === null || _c === void 0 ? void 0 : _c.beginPath(true, bounds3).moveTo(0, 0.067).curveTo(0, 0.05, 0, 0.033, 0.01, 0.017).curveTo(0.02, 0, 0.031, 0, 0.051, 0).lineTo(0.949, 0).curveTo(0.959, 0, 0.969, 0, 0.98, 0.017).curveTo(0.99, 0.033, 1, 0.05, 1, 0.067).lineTo(1, 0.9).curveTo(0.837, 0.8, 0.653, 0.8, 0.5, 0.9).curveTo(0.337, 1, 0.153, 1, 0, 0.9).closePath();
        this.shape1.attr(this.style);
        this.shape2.attr(this.style);
        this.shape3.attr(this.style);
    };
    return MultiDocumentShape;
}(EditableVertexShape));

var OffPageConnectorShape = /** @class */ (function (_super) {
    __extends$1(OffPageConnectorShape, _super);
    function OffPageConnectorShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OffPageConnectorShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    OffPageConnectorShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        var bounds = state.getBounds();
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, bounds).moveTo(0, 0.05).curveTo(0, 0, 0, 0, 0.05, 0).lineTo(0.95, 0).curveTo(1, 0, 1, 0, 1, 0.05).lineTo(1, 0.5).lineTo(0.5, 1).lineTo(0, 0.5).lineTo(0, 0.05).closePath();
    };
    return OffPageConnectorShape;
}(EzSimpleEditableVertexShape));

var OnPageConnectorShape = /** @class */ (function (_super) {
    __extends$1(OnPageConnectorShape, _super);
    function OnPageConnectorShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OnPageConnectorShape.prototype.createShapeElement = function () {
        return EzElement.el('ellipse');
    };
    OnPageConnectorShape.prototype.updateShape = function () {
        var state = this.state.alternate || this.state;
        var bounds = state.getBounds().plain();
        var radius = Math.min(bounds.width, bounds.height) / 2;
        this.shape.attr({
            rx: radius, ry: radius, cx: bounds.x + bounds.width / 2, cy: bounds.y + bounds.height / 2
        });
    };
    return OnPageConnectorShape;
}(EzSimpleEditableVertexShape));

var PredefinedProcessShape = /** @class */ (function (_super) {
    __extends$1(PredefinedProcessShape, _super);
    function PredefinedProcessShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredefinedProcessShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    PredefinedProcessShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0, 0).lineTo(1, 0).lineTo(1, 1).lineTo(0, 1).lineTo(0, 0).moveTo(0.1, 0).lineTo(0.1, 1).moveTo(0.9, 0).lineTo(0.9, 1).closePath();
    };
    return PredefinedProcessShape;
}(EzSimpleEditableVertexShape));

var PreparationShape = /** @class */ (function (_super) {
    __extends$1(PreparationShape, _super);
    function PreparationShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreparationShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    PreparationShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0.206, 0.083).curveTo(0.237, 0.017, 0.278, 0, 0.32, 0).lineTo(0.67, 0).curveTo(0.711, 0, 0.753, 0.017, 0.784, 0.083).lineTo(0.99, 0.467).curveTo(1, 0.483, 1, 0.5, 0.99, 0.533).lineTo(0.784, 0.917).curveTo(0.753, 0.967, 0.711, 0.983, 0.67, 1).lineTo(0.32, 1).curveTo(0.278, 0.983, 0.237, 0.967, 0.206, 0.917).lineTo(0, 0.533).curveTo(0, 0.5, 0, 0.483, 0, 0.467).lineTo(0.206, 0.083).closePath();
    };
    return PreparationShape;
}(EzSimpleEditableVertexShape));

var ProcessShape = /** @class */ (function (_super) {
    __extends$1(ProcessShape, _super);
    function ProcessShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProcessShape.prototype.createShapeElement = function () {
        return EzElement.el('rect');
    };
    ProcessShape.prototype.updateShape = function () {
        var state = this.state.alternate || this.state;
        this.shape.attr(state.getBounds().plain());
    };
    return ProcessShape;
}(EzSimpleEditableVertexShape));

var TerminalShape = /** @class */ (function (_super) {
    __extends$1(TerminalShape, _super);
    function TerminalShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TerminalShape.prototype.createShapeElement = function () {
        return EzElement.el('path');
    };
    TerminalShape.prototype.updateShape = function () {
        var _a;
        var state = this.state.alternate || this.state;
        (_a = this.shape) === null || _a === void 0 ? void 0 : _a.beginPath(true, state.getBounds()).moveTo(0.2, 0).curveTo(-0.05, 0, -0.05, 1, 0.2, 1).lineTo(0.8, 1).curveTo(1.05, 1, 1.05, 0, 0.8, 0).lineTo(0.2, 0).closePath();
    };
    return TerminalShape;
}(EzSimpleEditableVertexShape));

var GridBackgroundShape = /** @class */ (function (_super) {
    __extends$1(GridBackgroundShape, _super);
    function GridBackgroundShape() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gridSize = 8;
        return _this;
    }
    GridBackgroundShape.prototype.draw = function () {
        this.grid = EzElement.el('rect').attr(__assign(__assign({}, this.style), {
            x: 0,
            y: 0,
            width: this.gridSize,
            height: this.gridSize,
            fill: 'none',
            stroke: 'red',
            strokeWidth: 5
        }));
    };
    GridBackgroundShape.prototype.redraw = function () { };
    GridBackgroundShape.prototype.updateStyle = function () { };
    return GridBackgroundShape;
}(EzShape));

/**
 *  EzLineShape is a kind of edge shape , which points are all connected with straight line
 */
var EzTreeLineShape = /** @class */ (function (_super) {
    __extends$1(EzTreeLineShape, _super);
    function EzTreeLineShape(state) {
        return _super.call(this, state) || this;
    }
    EzTreeLineShape.prototype.draw = function () {
        var state = this.state;
        var markerStyle = {};
        var points = state.points;
        if (points.length !== 2) {
            {
                console.error('unexpected point length');
            }
        }
        if (this.style.markerStart) {
            markerStyle.markerStart = "url(#" + this.style.markerStart + ")";
        }
        if (this.style.markerEnd) {
            markerStyle.markerEnd = "url(#" + this.style.markerEnd + ")";
        }
        this.style.fill = 'none';
        this.setStyle(__assign(__assign(__assign({}, this.style), markerStyle), { fill: 'none' }));
        this.line = EzElement.line(this._getPoints(points)).attr(this.style);
        this.transparentLine = this.line.clone()
            .attr({ strokeWidth: +this.style.strokeWidth + DEFAULT_MOUSE_ACTION_TOLERENCE, stroke: 'transparent' })
            .removeAttr('markerStart')
            .removeAttr('markerEnd');
        this.root.appendChildren([this.line, this.transparentLine]);
    };
    EzTreeLineShape.prototype.redraw = function () {
        var state = (this.state.alternate || this.state);
        var points = this._getPoints(state.points);
        this.line.line(points);
        this.transparentLine.line(points);
    };
    EzTreeLineShape.prototype._getPoints = function (points) {
        var pt1 = points[0];
        var pt2 = points[1];
        var w = pt2.x - pt1.x;
        var h = pt2.y - pt1.y;
        var c1;
        var c2;
        if (this.state.style.direction === 'vertical') {
            c1 = new EzPoint(pt1.x, pt1.y + h / 2);
            c2 = new EzPoint(pt2.x, pt1.y + h / 2);
        }
        else {
            c1 = new EzPoint(pt1.x + w / 2, pt1.y);
            c2 = new EzPoint(pt1.x + w / 2, pt2.y);
        }
        return [pt1, c1, c2, pt2];
    };
    return EzTreeLineShape;
}(EzEdgeShape));

var RoundStickerShape = /** @class */ (function (_super) {
    __extends$1(RoundStickerShape, _super);
    function RoundStickerShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoundStickerShape.prototype.createShapeElement = function () {
        return EzElement.el('ellipse');
    };
    RoundStickerShape.prototype.updateShape = function () {
        var state = this.state.alternate || this.state;
        var bounds = state.getBounds();
        var radius = Math.min(bounds.width, bounds.height) / 2;
        this.shape.attr({
            cx: bounds.center().x,
            cy: bounds.center().y,
            rx: radius,
            ry: radius
        });
    };
    RoundStickerShape.prototype.updateStyle = function () {
        _super.prototype.updateStyle.call(this);
        this.shape.attr({ strokeWidth: 0 }).style({ filter: 'drop-shadow(gray 1px 1px 2px)' });
    };
    RoundStickerShape.defaultColor = '#ffcf2f';
    return RoundStickerShape;
}(EzSimpleEditableVertexShape));

var StickerShape = /** @class */ (function (_super) {
    __extends$1(StickerShape, _super);
    function StickerShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StickerShape.prototype.createShapeElement = function () {
        return EzElement.el('rect');
    };
    StickerShape.prototype.updateShape = function () {
        var state = this.state.alternate || this.state;
        var bounds = state.getBounds().plain();
        this.shape.attr(__assign({}, bounds));
    };
    StickerShape.prototype.updateStyle = function () {
        _super.prototype.updateStyle.call(this);
        this.shape.attr({ strokeWidth: 0 }).style({ filter: 'drop-shadow(gray 1px 1px 2px)' });
    };
    StickerShape.defaultColor = '#ffcf2f';
    return StickerShape;
}(EzSimpleEditableVertexShape));

var BUILTIN_SHAPE = {
    GRID_BACKGROUND: 'grid-background',
    RECTANGLE: 'rectangle',
    LINE: 'line',
    STICKER: 'sticker',
    ROUND_STICKER: 'round-sticker',
    FLOW_CHART: {
        TERMINAL: 'terminal',
        PROCESS: 'process',
        DECISION: 'decision',
        INPUT_OUTPUT: 'input-output',
        PREDEFINED_PROCESS: 'predefined-process',
        ON_PAGE_CONNECTOR: 'on-page-connector',
        OFF_PAGE_CONNECTOR: 'off-page-connector',
        DELAY: 'delay',
        ALTERNATE_PROCESS: 'alternate-process',
        DATA: 'data',
        DOCUMENT: 'document',
        MULTI_DOCUMENT: 'multi-document',
        PREPARATION: 'preparation',
        DISPLAY: 'display',
        MANUAL_INPUT: 'manual-input',
        MANUAL_OPERATION: 'manual-operation'
    },
    EDGE: { TREE_LINE: 'tree-line' }
};
var EzShapeManager = /** @class */ (function () {
    function EzShapeManager() {
        this.shapes = new Map();
        this.registerBuiltInShapes();
    }
    EzShapeManager.prototype.registerBuiltInShapes = function () {
        this.shapes.set(BUILTIN_SHAPE.LINE, EzLineShape);
        this.shapes.set(BUILTIN_SHAPE.EDGE.TREE_LINE, EzTreeLineShape);
        this.shapes.set(BUILTIN_SHAPE.RECTANGLE, EzRectangleShape);
        this.shapes.set(BUILTIN_SHAPE.GRID_BACKGROUND, GridBackgroundShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.TERMINAL, TerminalShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.PROCESS, ProcessShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.DECISION, DecisionShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.INPUT_OUTPUT, InputOutputShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.PREDEFINED_PROCESS, PredefinedProcessShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.ON_PAGE_CONNECTOR, OnPageConnectorShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.OFF_PAGE_CONNECTOR, OffPageConnectorShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.DELAY, DelayShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.ALTERNATE_PROCESS, AlternateProcessShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.DATA, DataShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.DOCUMENT, DocumentShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.MULTI_DOCUMENT, MultiDocumentShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.PREPARATION, PreparationShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.DISPLAY, DisplayShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.MANUAL_INPUT, ManualInputShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.MANUAL_OPERATION, ManualOperationShape);
        this.shapes.set(BUILTIN_SHAPE.STICKER, StickerShape);
        this.shapes.set(BUILTIN_SHAPE.ROUND_STICKER, RoundStickerShape);
    };
    EzShapeManager.prototype.registerShape = function (shapeName, shape) {
        {
            if (this.shapes.get(shapeName)) {
                console.error("shapeName " + shapeName + " already exists , please use another shapeName");
            }
        }
        this.shapes.set(shapeName, shape);
    };
    EzShapeManager.prototype.getShape = function (shapeName) {
        return this.shapes.get(shapeName);
    };
    return EzShapeManager;
}());

var EzEvent = /** @class */ (function () {
    function EzEvent(diagram, view) {
        this._isMouseDown = false;
        this._diagram = diagram;
        this._view = view;
        this._pluginManager = diagram.pluginManager;
    }
    EzEvent.prototype.setupEventSystem = function (container) {
        this.setupRootListeners(container);
    };
    EzEvent.prototype.setupRootListeners = function (container) {
        container.addEventListener('mousedown', this.mouseHandler.bind(this));
        container.addEventListener('mousemove', this.mouseHandler.bind(this));
        container.addEventListener('mouseup', this.mouseHandler.bind(this));
        container.addEventListener('click', this.mouseHandler.bind(this));
        container.addEventListener('dblclick', this.mouseHandler.bind(this));
    };
    EzEvent.prototype.mouseHandler = function (evt) {
        var view = this._diagram.view;
        var target = evt.target;
        var state = view.getState(target);
        var type = evt.type;
        switch (type) {
            case 'mousedown':
                this._isMouseDown = true;
                this._mouseDown({ evt: evt, state: state });
                break;
            case 'mousemove':
                this._mouseMove({ evt: evt, state: state });
                if (this._isMouseDown) {
                    this._pressMove({ evt: evt, state: state });
                }
                break;
            case 'mouseup':
                this._isMouseDown = false;
                this._mouseUp({ evt: evt, state: state });
                break;
            case 'click':
                this._click({ evt: evt, state: state });
                break;
            case 'dblclick':
                this._dblclick({ evt: evt, state: state });
                break;
        }
    };
    EzEvent.prototype._mouseDown = function (evt) {
        this._callHooks('onMouseDown', evt);
    };
    EzEvent.prototype._mouseMove = function (evt) {
        this._callHooks('onMouseMove', evt);
    };
    EzEvent.prototype._mouseUp = function (evt) {
        this._callHooks('onMouseUp', evt);
    };
    EzEvent.prototype._click = function (evt) {
        this._callHooks('onClick', evt);
    };
    EzEvent.prototype._dblclick = function (evt) {
        this._callHooks('onDblClick', evt);
    };
    EzEvent.prototype._pressMove = function (evt) {
        this._callHooks('onPressMove', evt);
    };
    EzEvent.prototype._callHooks = function (hookName, evt) {
        this._pluginManager.callHook('beforeCallingHook', evt);
        this._pluginManager.callHook(hookName, evt);
        if (evt.state) {
            this._view.callShapeEventHook(evt.state, hookName);
        }
    };
    return EzEvent;
}());

var Direction;
(function (Direction) {
    Direction[Direction["TOP"] = 0] = "TOP";
    Direction[Direction["LEFT"] = 1] = "LEFT";
    Direction[Direction["RIGHT"] = 2] = "RIGHT";
    Direction[Direction["BOTTOM"] = 3] = "BOTTOM";
    Direction[Direction["TOP_LEFT"] = 4] = "TOP_LEFT";
    Direction[Direction["TOP_RIGHT"] = 5] = "TOP_RIGHT";
    Direction[Direction["BOTTOM_LEFT"] = 6] = "BOTTOM_LEFT";
    Direction[Direction["BOTTOM_RIGHT"] = 7] = "BOTTOM_RIGHT";
})(Direction || (Direction = {}));
var BEND_SIZE = 5;
var BEND_CLASS = 'bend';
var SOURCE_BEND_CLASS = 'source-bend';
var VIRTUAL_BEND_CLASS = 'virtual-bend';
var TERMINAL_BEND_CLASS = 'terminal-bend';
var HANDLER_CONTAINER_CLASS = 'handler-container';
var getBend = function () { return EzElement.el('ellipse').asHandler().attr({
    rx: BEND_SIZE, ry: BEND_SIZE, fill: 'white', stroke: '#d7d7d8', class: BEND_CLASS
}); };
var getVirtualBend = function () { return EzElement.el('ellipse').asHandler().attr({
    rx: BEND_SIZE, ry: BEND_SIZE, fill: '#84a8ebe6', stroke: '#d7d7d8', class: VIRTUAL_BEND_CLASS
}); };
var rotateHandleImg = 'data:image/svg+xml,%3Csvg viewBox=\'0 0 16 16\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\'%3E %3Cpath d=\'M12.3912347,0.817629762 L13.3201585,4.17991814 L9.92775351,5.06028113 L9.5648437,3.74713753 L10.6449102,3.46643754 C9.42413688,2.82130749 8.00003902,2.65790004 6.65758935,3.01795124 C5.19519461,3.4072743 4.03005981,4.34885886 3.3285111,5.55662172 C2.62712304,6.76410802 2.38915649,8.23763041 2.78082924,9.69095528 C3.17253996,11.1439344 4.12000262,12.3014777 5.33486562,12.9985533 C6.55019029,13.6958938 8.03314201,13.9324678 9.49571085,13.5429692 C10.6137545,13.2477979 11.5781765,12.6164418 12.2868512,11.7707691 C13.0260002,10.888731 13.4869338,9.77354808 13.5537768,8.56349595 L13.5537768,8.56349595 L14.9762304,8.67622825 C14.8845994,10.1866299 14.3056729,11.5780384 13.3818873,12.6804719 C12.4887835,13.7462902 11.2733479,14.5420101 9.86458935,14.9139512 C8.02169426,15.4045722 6.15325419,15.1065535 4.62214536,14.2279878 C3.09080913,13.3492916 1.89691924,11.8899232 1.4031713,10.0580468 C0.909274184,8.22612814 1.209206,6.36837862 2.09373695,4.84598612 C2.97785145,3.3243104 4.4460621,2.13765442 6.28921632,1.64710063 C7.99908526,1.18943811 9.81443957,1.40503907 11.3644489,2.24050621 L11.3644489,2.24050621 L11.0669155,1.16215767 L12.3912347,0.817629762 Z\' stroke=\'%23fff\' stroke-width=\'0.3\' fill=\'%23222325\'%3E %3C/path%3E %3C/svg%3E ';
var getResizeBends = function () {
    var _a;
    return _a = {},
        _a[Direction.TOP] = getBend().style({ cursor: 'ns-resize' }).attr({ direction: Direction.TOP }),
        _a[Direction.RIGHT] = getBend().style({ cursor: 'ew-resize' }).attr({ direction: Direction.RIGHT }),
        _a[Direction.BOTTOM] = getBend().style({ cursor: 'ns-resize' }).attr({ direction: Direction.BOTTOM }),
        _a[Direction.LEFT] = getBend().style({ cursor: 'ew-resize' }).attr({ direction: Direction.LEFT }),
        _a[Direction.TOP_LEFT] = getBend().style({ cursor: 'nwse-resize' }).attr({ direction: Direction.TOP_LEFT }),
        _a[Direction.TOP_RIGHT] = getBend().style({ cursor: 'nesw-resize' }).attr({ direction: Direction.TOP_RIGHT }),
        _a[Direction.BOTTOM_LEFT] = getBend().style({ cursor: 'nesw-resize' }).attr({ direction: Direction.BOTTOM_LEFT }),
        _a[Direction.BOTTOM_RIGHT] = getBend().style({ cursor: 'nwse-resize' }).attr({ direction: Direction.BOTTOM_RIGHT }),
        _a;
};
var getHandlerRects = function (bounds) {
    return { rect: EzElement.el('rect').asHandler().attr(__assign(__assign({}, bounds.plain()), {
            stroke: '#4e9dec',
            strokeWidth: 1,
            fill: COLOR_TRANSPARENT_WHITE
        })),
        transparent: EzElement.el('rect').asHandler().attr(__assign(__assign({}, bounds.plain()), {
            stroke: COLOR_TRANSPARENT_WHITE,
            strokeWidth: 3,
            fill: 'none'
        })), };
};
var getRotationHandler = function () {
    var image = EzElement.el('image').asHandler();
    image.el.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', rotateHandleImg);
    return image.style({ cursor: 'pointer' }).attr({ class: 'rotation-handler' });
};
var getHandlerContainer = function (state) {
    return EzElement.el('g').attr({ class: HANDLER_CONTAINER_CLASS, dataId: state.node.id });
};

var EzMarker = /** @class */ (function () {
    function EzMarker(markerWidth, markerHeight, refX, refY, shapeGetter) {
        this.markerWidth = markerWidth;
        this.markerHeight = markerHeight;
        this.refX = refX;
        this.refY = refY;
        this.drawMarker();
        this.markerNode.appendChild(shapeGetter());
    }
    EzMarker.prototype.drawMarker = function () {
        this.markerNode = EzElement.el('marker').attr({
            markerWidth: this.markerWidth,
            markerHeight: this.markerHeight,
            refX: this.refX,
            refY: this.refY,
            orient: 'auto-start-reverse'
        }, false).el;
    };
    return EzMarker;
}());

var squareMarker = new EzMarker(4, 4, 2, 2, function () {
    return EzElement.el('rect').attr(new EzRectangle(0, 0, 4, 4).plain()).el;
});

var triangleMarker = new EzMarker(4, 4, 3.5, 2, function () {
    return EzElement.line([
        new EzPoint(0, 0),
        new EzPoint(0, 4),
        new EzPoint(4, 2),
        new EzPoint(0, 0)
    ]).el;
});

var BUILTIN_MARKER = { SQUARE: 'SQUARE', TRIANGLE: 'TRIANGLE' };
var EzMarkerRegister = /** @class */ (function () {
    function EzMarkerRegister() {
    }
    EzMarkerRegister.registerMarker = function (markerName, marker) {
        if (!marker)
            return;
        if (EzMarkerRegister.markers.has(markerName))
            return;
        EzMarkerRegister.markers.set(markerName, marker);
        return true;
    };
    EzMarkerRegister.markers = new Map();
    return EzMarkerRegister;
}());
EzMarkerRegister.registerMarker(BUILTIN_MARKER.SQUARE, squareMarker);
EzMarkerRegister.registerMarker(BUILTIN_MARKER.TRIANGLE, triangleMarker);

var EzDiagramView = /** @class */ (function () {
    function EzDiagramView(diagram) {
        this._translate = new EzPoint(0, 0);
        this._scaleCenter = new EzPoint(0, 0);
        this._scale = 1;
        this.stateMapping = new Map();
        this.shapeManager = new EzShapeManager();
        this.states = [];
        this.dirtyStates = [];
        this._diagram = diagram;
        this._init();
    }
    EzDiagramView.prototype._init = function () {
        this._createSvg();
        this._createDefs();
        this._createShapeGroup();
        this._createOverlayGroup();
        this._createEventSystem();
        this._startCommitLoop();
        this.stateMapping.clear();
        this.states.length = 0;
        this.dirtyStates.length = 0;
    };
    EzDiagramView.prototype._startCommitLoop = function () {
        var _this = this;
        var step = function () {
            _this.commit();
            window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    };
    EzDiagramView.prototype.getScale = function () {
        return this._scale;
    };
    EzDiagramView.prototype.setScale = function (scale) {
        this._diagram.pluginManager.callHook('onScaleDiagram', this._scale, scale);
        this._scale = scale;
    };
    EzDiagramView.prototype.translate = function (offset) {
        this.setTranslate(this.getTranslate().clone().translate(offset));
    };
    EzDiagramView.prototype.setTranslate = function (translate) {
        this._diagram.pluginManager.callHook('onTranslateDiagram', this._translate.clone(), translate);
        this._translate = translate;
    };
    EzDiagramView.prototype.getTranslate = function () {
        return this._translate;
    };
    EzDiagramView.prototype.rerender = function () {
        this._init();
        var svg = this.render();
        this.diagram.pluginManager.callHook('onRendered');
        return svg;
    };
    EzDiagramView.prototype.render = function () {
        var _this = this;
        var nodes = this.diagram.model.nodes;
        nodes.forEach(function (child) {
            var state;
            if (child instanceof EzVertex && !_this.stateMapping.get(child.id)) {
                state = _this._createState(child);
                _this.stateMapping.set(child.id, state);
                _this.states.push(state);
            }
            if (child instanceof EzEdge && !_this.stateMapping.get(child.id)) {
                state = _this._createState(child);
                _this.stateMapping.set(child.id, state);
                _this.states.push(state);
            }
        });
        requestAnimationFrame(function () {
            _this.size = _this.svg.el.getBoundingClientRect();
        });
        return this.svg;
    };
    EzDiagramView.prototype.getState = function (el) {
        var elm = EzElement.el(el);
        var stateEl = elm.farestAncestor("." + EZ_VIEW_VERTEX_CLASS);
        if (!stateEl)
            stateEl = elm.farestAncestor("." + EZ_VIEW_EDGE_CLASS);
        if (!stateEl)
            stateEl = elm.farestAncestor("." + HANDLER_CONTAINER_CLASS);
        if (stateEl) {
            var stateId = stateEl.data('id');
            return this.stateMapping.get(stateId);
        }
    };
    EzDiagramView.prototype._createEventSystem = function () {
        var ev = new EzEvent(this._diagram, this);
        ev.setupEventSystem(this.svg.el);
    };
    EzDiagramView.prototype._createSvg = function () {
        this.svg = EzElement.el('svg');
    };
    EzDiagramView.prototype._createDefs = function () {
        this.defs = EzElement.el('defs');
        this.svg.appendChild(this.defs);
    };
    EzDiagramView.prototype._createShapeGroup = function () {
        this.shapeGroup = EzElement.el('g').attr({ class: 'ez-shape-group' });
        this.svg.appendChild(this.shapeGroup);
    };
    EzDiagramView.prototype._createOverlayGroup = function () {
        this.overlayGroup = EzElement.el('g').attr({ class: 'ez-overlay-group' });
        this.svg.appendChild(this.overlayGroup);
    };
    EzDiagramView.prototype._createState = function (node) {
        var _this = this;
        var state;
        if (node instanceof EzVertex) {
            state = new EzVertexViewState(node, this);
        }
        else if (node instanceof EzEdge) {
            state = new EzEdgeViewState(node, this);
        }
        state.updateWork = STATE_WORK_TYPE.NEED_CREATE;
        state.scaleAndTranslate(this._scale, this._translate, new EzPoint(0, 0));
        state = state;
        if (state instanceof EzVertexViewState) {
            state.bounds = this.ensureBoundsMeetsGridSize(state.bounds);
        }
        if (state instanceof EzEdgeViewState) {
            state.points = state.points.map(function (pt) { return _this.ensurePointMeetsGrid(pt); });
        }
        return state;
    };
    EzDiagramView.prototype._updateState = function (state) {
        state.style = state.node.style;
        state.scaleAndTranslate(this._scale, this._translate);
    };
    EzDiagramView.prototype._generateMarkerDefs = function (state) {
        var _this = this;
        var style = state.style;
        var stateId = state.id;
        var updatedStyle = {};
        var genMarkerDef = function (markerType, markerId) {
            var marker = EzMarkerRegister.markers.get(markerType);
            var clonedEl = marker.markerNode.cloneNode(true);
            clonedEl.setAttribute('id', markerId);
            _this.defs.appendChild(EzElement.el(clonedEl));
        };
        if (style.markerStart) {
            var startType = style.markerStart;
            var markerId = startType + "_" + stateId;
            updatedStyle.markerStart = markerId;
            genMarkerDef(startType, markerId);
        }
        if (style.markerEnd) {
            var endType = style.markerEnd;
            var markerId = endType + "_" + stateId;
            updatedStyle.markerEnd = markerId;
            if (markerId !== updatedStyle.markerStart) {
                genMarkerDef(endType, markerId);
            }
        }
        return __assign(__assign({}, getSvgStyle(style)), updatedStyle);
    };
    EzDiagramView.prototype._translateState = function (state, distance, workType) {
        var _this = this;
        var moveState = function (state) {
            var _a;
            if (state instanceof EzVertexViewState) {
                var alternate = state.clone();
                var bounds = EzRectangle.translate(state.getBounds(), distance);
                alternate.bounds = _this.ensureBoundsMeetsGridSize(bounds);
                state.updateWork = workType;
                state.alternate = alternate;
                _this.diagram.pluginManager.callHook(workType === STATE_WORK_TYPE.UPDATE_VIEW ? 'onMovingVertex' : 'onMoveVertex', state);
                if ((_a = state.children) === null || _a === void 0 ? void 0 : _a.length) {
                    moveChildren(state);
                }
            }
            else {
                var alternate = state.clone();
                alternate.translate(distance);
                alternate.points = alternate.points.map(function (pt) { return _this.ensurePointMeetsGrid(pt); });
                state.updateWork = workType;
                state.alternate = alternate;
            }
        };
        var moveChildren = function (state) {
            state.children.forEach(function (childState) {
                if (childState instanceof EzVertexViewState) {
                    moveState(childState);
                }
            });
        };
        moveState(state);
    };
    EzDiagramView.prototype._rotateState = function (state, deltaAngle, workType) {
        var _a;
        {
            if ((_a = state.children) === null || _a === void 0 ? void 0 : _a.length) {
                console.error('rotation is only support vertex that does not have children.');
            }
        }
        var alternate = state.alternate || state.clone();
        var rotationAngle = (state.style.rotation || 0) + deltaAngle;
        var rotationStep = this.diagram.configManager.rotationStep;
        alternate.style.rotation = rotationAngle === 0 ? rotationAngle : Math.floor(rotationAngle / rotationStep) * rotationStep;
        state.updateWork = workType;
        state.alternate = alternate;
        this.diagram.pluginManager.callHook(workType === STATE_WORK_TYPE.UPDATE_VIEW ? 'onRotatingVertex' : 'onRotateVertex', state);
    };
    EzDiagramView.prototype._scaleState = function (state, currentMousePoint, workType, direction) {
        var _this = this;
        currentMousePoint = this.ensurePointMeetsGrid(currentMousePoint);
        var scaleVertex = function (state) {
            var _a;
            var centerPt;
            var width;
            var height;
            var originalBounds = state.getBounds();
            var originalRectPts = toRectPoints(originalBounds, state.style.rotation);
            var wVector = getVector(originalRectPts.TOP_LEFT, originalRectPts.TOP_RIGHT);
            var hVector = getVector(originalRectPts.TOP_LEFT, originalRectPts.BOTTOM_LEFT);
            var wUnitVector = getUnitVector(wVector);
            var hUnitVector = getUnitVector(hVector);
            // drag rectangle's four vertexes
            if ([Direction.TOP_LEFT, Direction.TOP_RIGHT, Direction.BOTTOM_LEFT, Direction.BOTTOM_RIGHT].includes(direction)) {
                switch (direction) {
                    case Direction.TOP_LEFT:
                        centerPt = new EzPoint((currentMousePoint.x + originalRectPts.BOTTOM_RIGHT.x) / 2, (currentMousePoint.y + originalRectPts.BOTTOM_RIGHT.y) / 2);
                        width = getVectorProjection(getVector(currentMousePoint, originalRectPts.BOTTOM_RIGHT), wVector);
                        height = getVectorProjection(getVector(currentMousePoint, originalRectPts.BOTTOM_RIGHT), hVector);
                        break;
                    case Direction.TOP_RIGHT:
                        centerPt = new EzPoint((currentMousePoint.x + originalRectPts.BOTTOM_LEFT.x) / 2, (currentMousePoint.y + originalRectPts.BOTTOM_LEFT.y) / 2);
                        width = getVectorProjection(getVector(currentMousePoint, originalRectPts.BOTTOM_LEFT), wVector);
                        height = getVectorProjection(getVector(currentMousePoint, originalRectPts.BOTTOM_LEFT), hVector);
                        break;
                    case Direction.BOTTOM_LEFT:
                        centerPt = new EzPoint((currentMousePoint.x + originalRectPts.TOP_RIGHT.x) / 2, (currentMousePoint.y + originalRectPts.TOP_RIGHT.y) / 2);
                        width = getVectorProjection(getVector(currentMousePoint, originalRectPts.TOP_RIGHT), wVector);
                        height = getVectorProjection(getVector(currentMousePoint, originalRectPts.TOP_RIGHT), hVector);
                        break;
                    case Direction.BOTTOM_RIGHT:
                        centerPt = new EzPoint((currentMousePoint.x + originalRectPts.TOP_LEFT.x) / 2, (currentMousePoint.y + originalRectPts.TOP_LEFT.y) / 2);
                        width = getVectorProjection(getVector(currentMousePoint, originalRectPts.TOP_LEFT), wVector);
                        height = getVectorProjection(getVector(currentMousePoint, originalRectPts.TOP_LEFT), hVector);
                        break;
                }
            }
            // drag rectangle's four edges
            if ([Direction.TOP, Direction.RIGHT, Direction.BOTTOM, Direction.LEFT].includes(direction)) {
                var startPt = void 0;
                var projection = void 0;
                var movedVector = void 0;
                var endPoint = void 0;
                switch (direction) {
                    case Direction.LEFT:
                        startPt = getCenterPoint(originalRectPts.BOTTOM_LEFT, originalRectPts.TOP_LEFT);
                        projection = getVectorProjection(getVector(startPt, currentMousePoint), wVector);
                        movedVector = getScalarMulOfVector(wUnitVector, getNormOfVector(wVector) - projection);
                        endPoint = getVectorEndPoint(getScalarMulOfVector(movedVector, -1), originalRectPts.TOP_RIGHT);
                        centerPt = new EzPoint((endPoint.x + originalRectPts.BOTTOM_RIGHT.x) / 2, (endPoint.y + originalRectPts.BOTTOM_RIGHT.y) / 2);
                        width = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_RIGHT), wVector);
                        height = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_RIGHT), hVector);
                        break;
                    case Direction.TOP:
                        startPt = getCenterPoint(originalRectPts.TOP_LEFT, originalRectPts.TOP_RIGHT);
                        projection = getVectorProjection(getVector(startPt, currentMousePoint), hVector);
                        movedVector = getScalarMulOfVector(hUnitVector, getNormOfVector(hVector) - projection);
                        endPoint = getVectorEndPoint(getScalarMulOfVector(movedVector, -1), originalRectPts.BOTTOM_LEFT);
                        centerPt = new EzPoint((endPoint.x + originalRectPts.BOTTOM_RIGHT.x) / 2, (endPoint.y + originalRectPts.BOTTOM_RIGHT.y) / 2);
                        width = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_RIGHT), wVector);
                        height = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_RIGHT), hVector);
                        break;
                    case Direction.RIGHT:
                        startPt = getCenterPoint(originalRectPts.TOP_RIGHT, originalRectPts.BOTTOM_RIGHT);
                        projection = getVectorProjection(getVector(startPt, currentMousePoint), wVector);
                        movedVector = getScalarMulOfVector(wUnitVector, getNormOfVector(wVector) + projection);
                        endPoint = getVectorEndPoint(movedVector, originalRectPts.TOP_LEFT);
                        centerPt = new EzPoint((endPoint.x + originalRectPts.BOTTOM_LEFT.x) / 2, (endPoint.y + originalRectPts.BOTTOM_LEFT.y) / 2);
                        width = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_LEFT), wVector);
                        height = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_LEFT), hVector);
                        break;
                    case Direction.BOTTOM:
                        startPt = getCenterPoint(originalRectPts.BOTTOM_LEFT, originalRectPts.BOTTOM_RIGHT);
                        projection = getVectorProjection(getVector(startPt, currentMousePoint), hVector);
                        movedVector = getScalarMulOfVector(hUnitVector, getNormOfVector(hVector) + projection);
                        endPoint = getVectorEndPoint(movedVector, originalRectPts.TOP_LEFT);
                        centerPt = new EzPoint((endPoint.x + originalRectPts.TOP_RIGHT.x) / 2, (endPoint.y + originalRectPts.TOP_RIGHT.y) / 2);
                        width = getVectorProjection(getVector(endPoint, originalRectPts.TOP_RIGHT), wVector);
                        height = getVectorProjection(getVector(endPoint, originalRectPts.TOP_RIGHT), hVector);
                        break;
                }
            }
            width = Math.abs(width);
            height = Math.abs(height);
            var nextBounds = new EzRectangle(centerPt.x - width / 2, centerPt.y - height / 2, width, height);
            var alternate = state.alternate || state.clone();
            alternate.bounds = nextBounds;
            state.updateWork = workType;
            state.alternate = alternate;
            _this.diagram.pluginManager.callHook(workType === STATE_WORK_TYPE.UPDATE_VIEW ? 'onResizingVertex' : 'onResizeVertex', state);
            if ((_a = state.children) === null || _a === void 0 ? void 0 : _a.length) {
                scaleChildren(state);
            }
        };
        var scaleChildren = function (state) {
            state.children.forEach(function (childState) {
                if (childState instanceof EzVertexViewState) {
                    scaleVertex(childState);
                }
            });
        };
        scaleVertex(state);
    };
    EzDiagramView.prototype._updateEdgePoint = function (state, nextPosition, index, update, workType) {
        var alternate = state.clone();
        nextPosition = this.ensurePointMeetsGrid(nextPosition);
        var points = state.points.map(function (pt) { return pt.clone(); });
        // if nextPosition is not provided , delete point
        if (!nextPosition) {
            points.splice(index, 1);
        }
        else if (update) {
            points = state.points.map(function (p, i) {
                if (i === index) {
                    return nextPosition.clone();
                }
                else {
                    return p.clone();
                }
            });
        }
        else {
            points.splice(index, 0, nextPosition.clone());
        }
        alternate.points = points;
        state.updateWork = workType;
        state.alternate = alternate;
    };
    EzDiagramView.prototype._updateModel = function (state) {
        var scale = this.getScale();
        var translate = this.getTranslate();
        if (state instanceof EzVertexViewState) {
            var node = state.node;
            var stateBounds = state.getBounds();
            var bounds = new EzRectangle(stateBounds.x / scale - translate.x, stateBounds.y / scale - translate.y, stateBounds.width / scale, stateBounds.height / scale);
            node.bounds = bounds;
        }
        else if (state instanceof EzEdgeViewState) {
            var node = state.node;
            var statePoints = state.getPoints();
            var points = statePoints.map(function (point) {
                return new EzPoint(point.x / scale - translate.x, point.y / scale - translate.y);
            });
            node.points = points;
        }
    };
    EzDiagramView.prototype._removeState = function (state) {
        state.shape.destroy();
        if (state.node) {
            if (state.node instanceof EzVertex) {
                this.diagram.model.removeVertex(state.node);
            }
            else {
                this.diagram.model.removeEdge(state.node);
            }
            this.diagram.pluginManager.callHook('onRemoveState', state);
        }
        this.stateMapping.delete(state.node.id);
        this.states.splice(this.states.indexOf(state), 1);
    };
    /**
     *
     * ensure bounds meets grid line
     * @param bounds
     */
    EzDiagramView.prototype.ensureBoundsMeetsGridSize = function (bounds) {
        var gridSize = this.diagram.configManager.gridSize;
        bounds.x = Math.round(bounds.x / gridSize) * gridSize;
        bounds.y = Math.round(bounds.y / gridSize) * gridSize;
        bounds.width = Math.floor(bounds.width / gridSize) * gridSize;
        bounds.height = Math.floor(bounds.height / gridSize) * gridSize;
        return bounds;
    };
    /**
     * ensure point meets grid
     * @param point
     * @returns
     */
    EzDiagramView.prototype.ensurePointMeetsGrid = function (point) {
        var gridSize = this.diagram.configManager.gridSize;
        var pt = point.clone();
        pt.x = Math.floor(pt.x / gridSize) * gridSize;
        pt.y = Math.floor(pt.y / gridSize) * gridSize;
        return pt;
    };
    EzDiagramView.prototype.movingVertex = function (state, distance) {
        this._translateState(state, distance, STATE_WORK_TYPE.UPDATE_VIEW);
    };
    EzDiagramView.prototype.moveVertex = function (state, distance) {
        this._translateState(state, distance, STATE_WORK_TYPE.UPDATE_TO_MODEL);
    };
    EzDiagramView.prototype.rotatingVertex = function (state, deltaAngle) {
        this._rotateState(state, deltaAngle, STATE_WORK_TYPE.UPDATE_VIEW);
    };
    EzDiagramView.prototype.rotateVertex = function (state, deltaAngle) {
        this._rotateState(state, deltaAngle, STATE_WORK_TYPE.UPDATE_TO_MODEL);
    };
    EzDiagramView.prototype.resizingVertex = function (state, currentMousePoint, direction) {
        this._scaleState(state, currentMousePoint, STATE_WORK_TYPE.UPDATE_VIEW, direction);
    };
    EzDiagramView.prototype.resizeVertex = function (state, currentMousePoint, direction) {
        this._scaleState(state, currentMousePoint, STATE_WORK_TYPE.UPDATE_TO_MODEL, direction);
    };
    EzDiagramView.prototype.updateText = function (state, text) {
        if (state instanceof EzVertexViewState) {
            var node = state.node;
            node.text = text;
            state.updateWork = STATE_WORK_TYPE.UPDATE_TO_MODEL;
            // this.diagram.pluginManager.callEventHook()
        }
    };
    EzDiagramView.prototype.movingEdge = function (state, distance) {
        this._translateState(state, distance, STATE_WORK_TYPE.UPDATE_VIEW);
    };
    EzDiagramView.prototype.moveEdge = function (state, distance) {
        this._translateState(state, distance, STATE_WORK_TYPE.UPDATE_TO_MODEL);
    };
    EzDiagramView.prototype.changingEdgePoint = function (state, nextPosition, index, update) {
        if (update === void 0) { update = false; }
        this._updateEdgePoint(state, nextPosition, index, update, STATE_WORK_TYPE.UPDATE_VIEW);
    };
    EzDiagramView.prototype.changeEdgePoint = function (state, nextPosition, index, update) {
        if (update === void 0) { update = false; }
        this._updateEdgePoint(state, nextPosition, index, update, STATE_WORK_TYPE.UPDATE_TO_MODEL);
    };
    /**
     * update or set related terminal vertex for edge
     * @param state
     * @param terminal
     * @param constraint - terminal constraint
     * @param isSource - is source point of vertex
     */
    EzDiagramView.prototype.updateTerminalVertex = function (state, terminal, constraint, isSource) {
        if (isSource === void 0) { isSource = false; }
        {
            if (!(state instanceof EzEdgeViewState)) {
                console.error("EzDiagramView.updateTerminalVertex: invalid param , expect state instance of EzEdgeViewState , got " + Object.prototype.toString.call(state));
            }
        }
        var model = this.diagram.model;
        model.updateTerminalVertex(state.node, terminal, constraint, isSource);
    };
    /**
     * commit changes to DOM
     * @param force force udpate all DOM elements
     * @returns
     */
    EzDiagramView.prototype.commit = function () {
        var _this = this;
        this._diagram.pluginManager.callHook('beforeViewUpdate', this._diagram);
        this.dirtyStates.forEach(function (state) {
            var createShape = function () {
                var shapeCtor = _this.shapeManager.getShape(state.style.shape);
                {
                    if (!shapeCtor) {
                        console.error("no shape found for the given name: " + state.style.shape);
                    }
                }
                if (state instanceof EzVertexViewState) {
                    state.shape = new shapeCtor(state);
                    state.shape.draw();
                }
                else {
                    var updatedStyle = _this._generateMarkerDefs(state);
                    state.shape = new shapeCtor(state);
                    state.shape.setStyle(updatedStyle);
                    state.shape.draw();
                }
                var parentEl = _this.shapeGroup;
                parentEl.appendChild(state.shape.root);
                state.updateWork = STATE_WORK_TYPE.NO_WORK;
            };
            // first time to render dom
            if (state.updateWork === STATE_WORK_TYPE.NEED_CREATE) {
                createShape();
            }
            if (state.updateWork === STATE_WORK_TYPE.UPDATE_VIEW) {
                state.shape.redraw();
                state.updateWork = STATE_WORK_TYPE.NO_WORK;
            }
            if (state.updateWork === STATE_WORK_TYPE.UPDATE_TO_MODEL) {
                state.shape.redraw();
                state.updateWork = STATE_WORK_TYPE.NO_WORK;
                Object.assign(state, state.alternate);
                state.alternate = null;
                _this._updateModel(state);
            }
            if (state.updateWork === STATE_WORK_TYPE.UPDATE_FROM_MODEL) {
                _this._updateState(state);
                if (state.shape) {
                    state.shape.redraw();
                }
                else {
                    createShape();
                }
                state.updateWork = STATE_WORK_TYPE.NO_WORK;
            }
        });
        if (this.dirtyStates.length) {
            this._diagram.pluginManager.callHook('afterViewUpdate', this._diagram);
        }
        this.dirtyStates.length = 0;
    };
    EzDiagramView.prototype.markAllDirty = function () {
        this.states.forEach(function (state) {
            state.updateWork = STATE_WORK_TYPE.UPDATE_FROM_MODEL;
        });
    };
    /**
     * add state for temporary usage
     * @param node
     * @returns
     */
    EzDiagramView.prototype.addTempState = function (node) {
        var state = this._createState(node);
        this.states.push(state);
        this.stateMapping.set(node.id, state);
        return state;
    };
    /**
     * remove temporary state
     * @param node
     * @returns
     */
    EzDiagramView.prototype.removeTempState = function (state) {
        return this._removeState(state);
    };
    /**
     * get current mouse point relative to view container
     * @param evt
     */
    EzDiagramView.prototype.getMousePointRelateToContainer = function (evt) {
        return new EzPoint(evt.pageX - this.size.left, evt.pageY - this.size.top);
    };
    EzDiagramView.prototype.setZoomCenter = function (point) {
        if (!point)
            return;
        this._scaleCenter = point;
    };
    EzDiagramView.prototype.getZoomCenter = function () {
        return this._scaleCenter;
    };
    /**
     * call event hook on a given state's shape
     * @param state
     * @param hookName
     * @param args
     * @returns
     */
    EzDiagramView.prototype.callShapeEventHook = function (state, hookName) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var shape = state.shape;
        if (!shape)
            return;
        var hookFn = shape[hookName];
        if (hookFn) {
            hookFn.apply(shape, args);
        }
    };
    /**
     * remove view states from EzDiagramView
     * @param states
     */
    EzDiagramView.prototype.removeStates = function (states) {
        var _this = this;
        states.forEach(function (state) {
            _this._removeState(state);
        });
    };
    /**
     * change z index oder for given node
     * @param node
     * @param targetPosition
     *
     */
    EzDiagramView.prototype.changeOrder = function (node, targetPosition) {
        var state = this.stateMapping.get(node.id);
        var siblings = state.parent.children;
        if (targetPosition < 0)
            targetPosition = 0;
        if (targetPosition > siblings.length - 1)
            targetPosition = siblings.length - 1;
        var currentIndex = siblings.indexOf(state);
        var tmp = siblings[targetPosition];
        siblings[targetPosition] = state;
        siblings[currentIndex] = tmp;
        if (targetPosition > currentIndex) {
            var sibling = tmp.shape.root.el.nextElementSibling;
            if (sibling) {
                state.shape.root.insertBefore(EzElement.el(sibling));
            }
            else {
                state.shape.root.el.parentElement.appendChild(state.shape.root.el);
            }
        }
        else {
            state.shape.root.insertBefore(tmp.shape.root);
        }
        this.diagram.model.changeOrder(node, targetPosition);
    };
    Object.defineProperty(EzDiagramView.prototype, "diagram", {
        /**
         * Getter diagram
         * @return {EzDiagram}
         */
        get: function () {
            return this._diagram;
        },
        /**
         * Setter diagram
         * @param {EzDiagram} value
         */
        set: function (value) {
            this._diagram = value;
        },
        enumerable: false,
        configurable: true
    });
    return EzDiagramView;
}());

/**
 *  selection plugin is a built in plugin that handles element selection in a diagram,for example:
 *  + if you click on a single element(edge or vertex) , the element will be selected and will be placed in the {@link EzDiagramPluginManager.pluginContext}
 *  + if you use mouse dragging to select multiple elements, those elements will  also be placed in the {@link EzDiagramPluginManager.pluginContext}
 *
 *  access the selected element via:
 *  ```javascript
 *     // diagram is instance of EzDiagram
 *     const selected = diagram.pluginManager.getContext().selectedViewStates;
 *  ```
 */
var SelectPlugin = /** @class */ (function (_super) {
    __extends$1(SelectPlugin, _super);
    function SelectPlugin(diagram, context) {
        var _this = _super.call(this, diagram, context) || this;
        _this.createSelectionBox();
        return _this;
    }
    Object.defineProperty(SelectPlugin.prototype, "selected", {
        get: function () {
            return this.context.selectedViewStates || [];
        },
        enumerable: false,
        configurable: true
    });
    SelectPlugin.prototype.canActivate = function () {
        return true;
    };
    SelectPlugin.prototype.createSelectionBox = function () {
        this.selectionBox = EzElement.el('rect').attr({
            stroke: '#0000DD',
            strokeWidth: 1,
            fill: '#99ccff2b',
            x: 0,
            y: 0,
            width: SelectPlugin.SELECTION_BOX_TOLERANCE,
            height: SelectPlugin.SELECTION_BOX_TOLERANCE
        }).el;
    };
    SelectPlugin.prototype.getInterSelectionStates = function (view) {
        var svg = view.svg.el;
        var rect = svg.createSVGRect();
        rect.x = this.selectionArea.x;
        rect.y = this.selectionArea.y;
        rect.width = this.selectionArea.width;
        rect.height = this.selectionArea.height;
        var nodeList = svg.getIntersectionList(rect, null);
        var states = [];
        nodeList.forEach(function (node) {
            var state = view.getState(node);
            if (state)
                states.push(state);
        });
        return states;
    };
    SelectPlugin.prototype.onMouseDown = function (_a) {
        var _b;
        var state = _a.state, evt = _a.evt;
        this.startPoint = this.diagram.view.getMousePointRelateToContainer(evt);
        if ((state === null || state === void 0 ? void 0 : state.style.selectable) === false) {
            this.changeSelection([]);
            this.selectionBox.remove();
            this.selectionArea = null;
            return;
        }
        if (this.isHandlerEvent(evt))
            return;
        if (state) {
            if ((_b = this.context.selectedViewStates) === null || _b === void 0 ? void 0 : _b.includes(state))
                return;
            else
                this.changeSelection([state]);
        }
        else {
            this.changeSelection([]);
        }
    };
    SelectPlugin.prototype.onPressMove = function (_a) {
        var state = _a.state, evt = _a.evt;
        if ((state === null || state === void 0 ? void 0 : state.style.selectable) === false)
            return;
        if (this.selected.length)
            return;
        var view = this.diagram.view;
        var currentPoint = this.diagram.view.getMousePointRelateToContainer(evt);
        var moveDistance = getNormOfVector(getVector(this.startPoint, currentPoint));
        if (moveDistance > SelectPlugin.SELECTION_BOX_TOLERANCE) {
            view.overlayGroup.appendChild(EzElement.el(this.selectionBox));
            this.selectionArea = new EzRectangle(Math.min(this.startPoint.x, currentPoint.x), Math.min(this.startPoint.y, currentPoint.y), Math.abs(this.startPoint.x - currentPoint.x), Math.abs(this.startPoint.y - currentPoint.y));
            EzElement.el(this.selectionBox).attr({
                x: this.selectionArea.x, y: this.selectionArea.y, width: this.selectionArea.width, height: this.selectionArea.height
            });
        }
        else {
            this.selectionBox.remove();
            this.selectionArea = null;
        }
    };
    SelectPlugin.prototype.onMouseUp = function (_a) {
        var _b;
        var state = _a.state;
        (_b = this.selectionBox) === null || _b === void 0 ? void 0 : _b.remove();
        if ((state === null || state === void 0 ? void 0 : state.style.selectable) === false)
            return;
        if (this.selected.length)
            return;
        if (this.selectionArea) {
            var view = this.diagram.view;
            if (view.svg['getIntersectionList']) {
                var states = this.getInterSelectionStates(view);
                this.changeSelection(states);
                this.selectionArea = null;
            }
        }
    };
    /**
     *  check removing state is currently selected , if true , remove it from selected states
     */
    SelectPlugin.prototype.onRemoveState = function (state) {
        var idx = this.selected.indexOf(state);
        if (idx !== -1) {
            var prev = __spreadArray$1([], this.selected, true);
            this.selected.splice(idx, 1);
            this.diagram.pluginManager.callHook('onChangeSelection', prev, this.selected);
        }
    };
    /**
     * change current selected states
     * @param selectedStates
     */
    SelectPlugin.prototype.changeSelection = function (selectedStates) {
        var prev = this.context.selectedViewStates;
        this.context.selectedViewStates = selectedStates;
        this.diagram.pluginManager.callHook('onChangeSelection', prev, selectedStates);
    };
    SelectPlugin.prototype.isHandlerEvent = function (evt) {
        var target = evt.target;
        if (!target)
            return false;
        var el = EzElement.el(target);
        var handlerSelector = '[handler="1"]';
        return el.is(handlerSelector) || !!el.nearestAncestor(handlerSelector);
    };
    SelectPlugin.SELECTION_BOX_TOLERANCE = 4;
    return SelectPlugin;
}(EzDiagramPlugin));

/**
 *   handle move and change edge points for single selected {@link EzLineShape}
 */
var SingleLineHandler = /** @class */ (function (_super) {
    __extends$1(SingleLineHandler, _super);
    function SingleLineHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isPressMove = false;
        _this.bends = [];
        _this.virtualBends = [];
        return _this;
    }
    SingleLineHandler.prototype.canActivate = function () {
        var _a;
        return ((_a = this.context.selectedViewStates) === null || _a === void 0 ? void 0 : _a.length) === 1 &&
            this.context.selectedViewStates[0] instanceof EzEdgeViewState &&
            this.context.selectedViewStates[0].shape instanceof EzLineShape;
    };
    SingleLineHandler.prototype.onDeActivate = function () {
        this.reset();
    };
    SingleLineHandler.prototype.onChangeSelection = function (_, next) {
        this.destroyBends();
        this.selected = next[0];
    };
    SingleLineHandler.prototype.onDblClick = function (_a) {
        var evt = _a.evt;
        var target = evt.target;
        var view = this.diagram.view;
        var points = this.selected.points;
        if (target.matches("." + BEND_CLASS)) {
            this.handlerAction = HandlerAction$1.REMOVE_BEND;
            if (this.bendIndex === 0 || this.bendIndex === points.length - 1) {
                return;
            }
            view.changeEdgePoint(this.selected, null, this.bendIndex, false);
        }
    };
    SingleLineHandler.prototype.onMouseDown = function (_a) {
        var evt = _a.evt;
        this.getHandlerAction(evt);
        if (!this.bends.length) {
            this.generateBends();
            this.handlerAction = HandlerAction$1.MOVE_SHAPE;
        }
        this.startPoint = this.diagram.view.getMousePointRelateToContainer(evt);
    };
    SingleLineHandler.prototype.onPressMove = function (_a) {
        var evt = _a.evt;
        this.isPressMove = true;
        var view = this.diagram.view;
        var currentPoint = view.getMousePointRelateToContainer(evt);
        this.movingDistance = new EzPoint(currentPoint.x - this.startPoint.x, currentPoint.y - this.startPoint.y);
        switch (this.handlerAction) {
            case HandlerAction$1.MOVE_SHAPE:
                view.movingEdge(this.selected, this.movingDistance);
                break;
            case HandlerAction$1.MOVE_BEND:
                view.changingEdgePoint(this.selected, currentPoint, this.bendIndex, true);
                break;
            case HandlerAction$1.MOVE_VIRTUAL_BEND:
                view.changingEdgePoint(this.selected, currentPoint, this.bendIndex, false);
                break;
        }
    };
    SingleLineHandler.prototype.onMouseUp = function (_a) {
        var evt = _a.evt;
        this.isPressMove = false;
        var view = this.diagram.view;
        var currentPoint = this.diagram.view.getMousePointRelateToContainer(evt);
        this.movingDistance = new EzPoint(currentPoint.x - this.startPoint.x, currentPoint.y - this.startPoint.y);
        if (this.movingDistance.x === 0 && this.movingDistance.y === 0)
            return;
        switch (this.handlerAction) {
            case HandlerAction$1.MOVE_SHAPE:
                view.moveEdge(this.selected, this.movingDistance);
                this.destroyBends();
                break;
            case HandlerAction$1.MOVE_BEND:
                view.changeEdgePoint(this.selected, currentPoint, this.bendIndex, true);
                break;
            case HandlerAction$1.MOVE_VIRTUAL_BEND:
                view.changeEdgePoint(this.selected, currentPoint, this.bendIndex, false);
                break;
        }
    };
    SingleLineHandler.prototype.afterViewUpdate = function () {
        this.destroyBends();
        this.generateBends();
    };
    SingleLineHandler.prototype.getHandlerAction = function (evt) {
        var target = evt.target;
        this.bendIndex = +target.getAttribute('index');
        if (target.matches("." + BEND_CLASS)) {
            this.handlerAction = HandlerAction$1.MOVE_BEND;
        }
        else if (target.matches("." + VIRTUAL_BEND_CLASS)) {
            this.handlerAction = HandlerAction$1.MOVE_VIRTUAL_BEND;
        }
        else {
            this.handlerAction = HandlerAction$1.MOVE_SHAPE;
        }
    };
    SingleLineHandler.prototype.generateBends = function () {
        var _a;
        if (this.isPressMove && this.handlerAction === HandlerAction$1.MOVE_SHAPE)
            return;
        this.shapeEl = this.selected.shape.root.clone().asHandler();
        var view = this.diagram.view;
        var points = ((_a = this.selected.alternate) === null || _a === void 0 ? void 0 : _a.points) || this.selected.points;
        var size = BEND_SIZE * view.getScale();
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            var bend = getBend().attr({
                cx: point.x, cy: point.y, rx: size, ry: size, index: i
            });
            this.bends.push(bend);
            if (i > 0) {
                var virtualBendPosition = getCenterPoint(point, points[i - 1]);
                var virtualBend = getVirtualBend().attr({
                    cx: virtualBendPosition.x, cy: virtualBendPosition.y, rx: size, ry: size, index: i
                });
                this.virtualBends.push(virtualBend);
            }
            if (i === 0) {
                bend.attr({ class: BEND_CLASS + " " + SOURCE_BEND_CLASS });
            }
            if (i === points.length - 1) {
                bend.attr({ class: BEND_CLASS + " " + TERMINAL_BEND_CLASS });
            }
        }
        this.shapeEl.attr({ pointerEvents: 'none' });
        this.diagram.view.overlayGroup.appendChildren(__spreadArray$1(__spreadArray$1([this.shapeEl], this.bends, true), this.virtualBends, true));
    };
    SingleLineHandler.prototype.destroyBends = function () {
        var _a, _b, _c;
        (_a = this.bends) === null || _a === void 0 ? void 0 : _a.forEach(function (bend) { return bend.el.remove(); });
        (_b = this.virtualBends) === null || _b === void 0 ? void 0 : _b.forEach(function (bend) { return bend.el.remove(); });
        (_c = this.shapeEl) === null || _c === void 0 ? void 0 : _c.el.remove();
        this.bends = [];
        this.virtualBends = [];
        this.shapeEl = null;
    };
    SingleLineHandler.prototype.reset = function () {
        this.destroyBends();
        this.selected = null;
        this.startPoint = null;
        this.movingDistance = null;
    };
    return SingleLineHandler;
}(EzDiagramPlugin));
var HandlerAction$1;
(function (HandlerAction) {
    HandlerAction[HandlerAction["MOVE_BEND"] = 0] = "MOVE_BEND";
    HandlerAction[HandlerAction["MOVE_SHAPE"] = 1] = "MOVE_SHAPE";
    HandlerAction[HandlerAction["REMOVE_BEND"] = 2] = "REMOVE_BEND";
    HandlerAction[HandlerAction["MOVE_VIRTUAL_BEND"] = 3] = "MOVE_VIRTUAL_BEND";
})(HandlerAction$1 || (HandlerAction$1 = {}));

var HandlerAction;
(function (HandlerAction) {
    HandlerAction[HandlerAction["MOVE"] = 0] = "MOVE";
    HandlerAction[HandlerAction["RESIZE"] = 1] = "RESIZE";
    HandlerAction[HandlerAction["ROTATE"] = 2] = "ROTATE";
})(HandlerAction || (HandlerAction = {}));
/**
 *  handle move 、 rotate 、 resize action for single selected vertex
 */
var SingleVertexHandler = /** @class */ (function (_super) {
    __extends$1(SingleVertexHandler, _super);
    function SingleVertexHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SingleVertexHandler.prototype, "handlerBounds", {
        get: function () {
            var _a;
            return ((_a = this.selected.alternate) === null || _a === void 0 ? void 0 : _a.getBounds()) || this.selected.getBounds();
        },
        enumerable: false,
        configurable: true
    });
    SingleVertexHandler.prototype.canActivate = function () {
        var _a;
        return ((_a = this.context.selectedViewStates) === null || _a === void 0 ? void 0 : _a.length) === 1 && this.context.selectedViewStates[0] instanceof EzVertexViewState;
    };
    SingleVertexHandler.prototype.onMouseDown = function (_a) {
        var evt = _a.evt;
        this._startPoint = this.diagram.view.getMousePointRelateToContainer(evt);
        var current = this.context.selectedViewStates[0];
        if (this.handlerEl) {
            if (current === this.selected) {
                this._handlerAction = this._getHandlerAction(evt);
            }
            else {
                this.selected = current;
                this._handlerAction = HandlerAction.MOVE;
            }
        }
        else {
            this.selected = current;
            this.resizeAnchors = getResizeBends();
            this.handlerRects = getHandlerRects(this.handlerBounds);
            this.rotationHandler = getRotationHandler();
            this._createHandlerEl();
            this._handlerAction = HandlerAction.MOVE;
        }
        this._updateHandlerEl();
    };
    SingleVertexHandler.prototype.onPressMove = function (_a) {
        var evt = _a.evt;
        var view = this.diagram.view;
        var moveDistance = this._getMoveDistance(evt);
        if (this._handlerAction === HandlerAction.MOVE) {
            if (moveDistance.x !== 0 || moveDistance.y !== 0) {
                view.movingVertex(this.selected, moveDistance);
            }
        }
        if (this._handlerAction === HandlerAction.RESIZE) {
            view.resizingVertex(this.selected, this.diagram.view.getMousePointRelateToContainer(evt), this._resizeAnchor);
        }
        if (this._handlerAction === HandlerAction.ROTATE) {
            var currentAngle = this._getAngleRelateToStateBounds(evt);
            this._deltaAngle = currentAngle - this._startAngle;
            view.rotatingVertex(this.selected, this._deltaAngle);
        }
        this._updateHandlerEl();
    };
    SingleVertexHandler.prototype.onMouseUp = function (_a) {
        var evt = _a.evt;
        var view = this.diagram.view;
        var moveDistance = this._getMoveDistance(evt);
        if (this._handlerAction === HandlerAction.MOVE) {
            if (moveDistance.x !== 0 || moveDistance.y !== 0) {
                view.moveVertex(this.selected, moveDistance);
            }
        }
        if (this._handlerAction === HandlerAction.RESIZE) {
            view.resizeVertex(this.selected, view.getMousePointRelateToContainer(evt), this._resizeAnchor);
        }
        if (this._handlerAction === HandlerAction.ROTATE) {
            var currentAngle = this._getAngleRelateToStateBounds(evt);
            this._deltaAngle = currentAngle - this._startAngle;
            view.rotateVertex(this.selected, this._deltaAngle);
        }
        this._updateHandlerEl();
        this._reset();
    };
    SingleVertexHandler.prototype.afterViewUpdate = function () {
        this._updateHandlerEl();
    };
    SingleVertexHandler.prototype.onDeActivate = function () {
        this._destroy();
    };
    SingleVertexHandler.prototype.onChangeSelection = function () {
        if (this.context.selectedViewStates.indexOf(this.selected) === -1) {
            this._destroy();
        }
    };
    SingleVertexHandler.prototype._destroy = function () {
        if (this.handlerEl) {
            this.handlerEl.remove();
            this.handlerEl = null;
        }
        this.selected = null;
        this._reset();
    };
    SingleVertexHandler.prototype._reset = function () {
        this._startPoint = null;
        this._handlerAction = null;
        this._startAngle = 0;
        this._deltaAngle = 0;
    };
    SingleVertexHandler.prototype._getHandlerAction = function (evt) {
        var target = evt.target;
        if (Object.values(this.handlerRects).map(function (i) { return i.el; }).indexOf(target) !== -1) {
            return HandlerAction.MOVE;
        }
        if (Object.values(this.resizeAnchors).map(function (i) { return i.el; }).indexOf(target) !== -1) {
            this._resizeAnchor = +target.getAttribute('direction');
            return HandlerAction.RESIZE;
        }
        if (target.matches('.rotation-handler')) {
            this._startAngle = this._getAngleRelateToStateBounds(evt);
            return HandlerAction.ROTATE;
        }
    };
    SingleVertexHandler.prototype._createHandlerEl = function () {
        var _this = this;
        this.handlerEl = getHandlerContainer(this.selected).appendChildren(__spreadArray$1(__spreadArray$1(__spreadArray$1([], Object.values(this.handlerRects), true), Object.values(this.resizeAnchors), true), [
            this.rotationHandler
        ], false));
        this._updateHandlerEl();
        this.handlerEl.attr({ pointerEvents: 'none' });
        this.diagram.view.overlayGroup.appendChild(this.handlerEl);
        setTimeout(function () {
            _this.handlerEl.removeAttr('pointerEvents');
        }, 200);
    };
    SingleVertexHandler.prototype._updateHandlerEl = function () {
        var _this = this;
        var getPosition = function (x, y) {
            var pt = _this.diagram.view.ensurePointMeetsGrid(new EzPoint(x, y));
            return { cx: pt.x, cy: pt.y };
        };
        var bounds = this.handlerBounds.plain();
        this.resizeAnchors[Direction.TOP_LEFT].attr(getPosition(bounds.x, bounds.y));
        this.resizeAnchors[Direction.TOP].attr(getPosition(bounds.x + bounds.width / 2, bounds.y));
        this.resizeAnchors[Direction.TOP_RIGHT].attr(getPosition(bounds.x + bounds.width, bounds.y));
        this.resizeAnchors[Direction.RIGHT].attr(getPosition(bounds.x + bounds.width, bounds.y + bounds.height / 2));
        this.resizeAnchors[Direction.BOTTOM_RIGHT].attr(getPosition(bounds.x + bounds.width, bounds.y + bounds.height));
        this.resizeAnchors[Direction.BOTTOM].attr(getPosition(bounds.x + bounds.width / 2, bounds.y + bounds.height));
        this.resizeAnchors[Direction.BOTTOM_LEFT].attr(getPosition(bounds.x, bounds.y + bounds.height));
        this.resizeAnchors[Direction.LEFT].attr(getPosition(bounds.x, bounds.y + bounds.height / 2));
        this.handlerRects.rect.attr(bounds);
        this.handlerRects.transparent.attr(bounds);
        this.rotationHandler.attr({
            x: bounds.x - 18, y: bounds.y + bounds.height + 6, width: 16, height: 16
        });
        var rotationAngle = (this.selected.style.rotation || 0) + (this._deltaAngle || 0);
        var rotationStep = this.diagram.configManager.rotationStep;
        this.handlerEl.attr({ transform: "rotate(" + (rotationStep === 0 ? rotationAngle : Math.floor(rotationAngle / rotationStep) * rotationStep) + "," + this.handlerBounds.center().x + "," + this.handlerBounds.center().y + ")" });
    };
    SingleVertexHandler.prototype._getMoveDistance = function (evt) {
        var pt = this.diagram.view.getMousePointRelateToContainer(evt);
        return new EzPoint(pt.x - this._startPoint.x, pt.y - this._startPoint.y);
    };
    SingleVertexHandler.prototype._getAngleRelateToStateBounds = function (evt) {
        var view = this.diagram.view;
        var currentPoint = view.getMousePointRelateToContainer(evt);
        var stateCenterPoint = this.selected.getBounds().center();
        var angle = getIncludedAngleOfTwoVector(getVector(stateCenterPoint, currentPoint), { x: 0, y: 1 });
        return stateCenterPoint.x - currentPoint.x > 0 ? angle : -angle;
    };
    return SingleVertexHandler;
}(EzDiagramPlugin));

var BG_ID = 'ez-bg';
var BG_GRID_SIZE = 30;
var EzBackGround = /** @class */ (function (_super) {
    __extends$1(EzBackGround, _super);
    function EzBackGround() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EzBackGround.prototype.onRendered = function () {
        this.createBgDef();
        this.createBgContainer();
    };
    EzBackGround.prototype.afterViewUpdate = function () {
        this.update();
    };
    EzBackGround.prototype.update = function () {
        var _a;
        var view = this.diagram.view;
        if (!view.size)
            return;
        if (((_a = view === null || view === void 0 ? void 0 : view.size) === null || _a === void 0 ? void 0 : _a.width) === 0)
            return;
        var scale = view.getScale();
        var translate = view.getTranslate();
        var translateX = translate.x % view.size.width - view.size.width * 3;
        var translateY = translate.y % view.size.height - view.size.height * 3;
        this.bgContaner.style({ transform: "scale(" + scale + ") translate(" + translateX + "px," + translateY + "px)" });
    };
    EzBackGround.prototype.createBgDef = function () {
        var view = this.diagram.view;
        var pattern;
        if (this.context.background) {
            pattern = this.context.background(this.diagram);
        }
        else {
            pattern = this.getDefaultGrid();
        }
        view.defs.appendChild(pattern);
    };
    EzBackGround.prototype.createBgContainer = function () {
        var view = this.diagram.view;
        this.bgContaner = EzElement.el('g').attr({
            class: 'ez-bg-container', width: '600%', height: '600%'
        }).appendChild(EzElement.el('rect').attr({
            fill: "url(#" + BG_ID + ")", width: '600%', height: '600%'
        }));
        view.svg.prependChild(this.bgContaner);
    };
    EzBackGround.prototype.getDefaultGrid = function () {
        return EzElement.el('pattern').attr({
            width: BG_GRID_SIZE * this.diagram.view.getScale(), height: BG_GRID_SIZE * this.diagram.view.getScale(), id: BG_ID, patternUnits: 'userSpaceOnUse'
        }, false).appendChild(EzElement.el('rect').attr({
            x: 0, y: 0, width: BG_GRID_SIZE * this.diagram.view.getScale(), height: BG_GRID_SIZE * this.diagram.view.getScale(), fill: 'none', stroke: '#e0e0e0', strokeWidth: 1
        }));
    };
    return EzBackGround;
}(EzDiagramPlugin));

var ModifierKey;
(function (ModifierKey) {
    ModifierKey[ModifierKey["none"] = 0] = "none";
    ModifierKey[ModifierKey["alt"] = 1] = "alt";
    ModifierKey[ModifierKey["meta"] = 16] = "meta";
    ModifierKey[ModifierKey["shift"] = 256] = "shift";
    ModifierKey[ModifierKey["control"] = 4096] = "control";
    ModifierKey[ModifierKey["altMeta"] = 17] = "altMeta";
    ModifierKey[ModifierKey["altShift"] = 257] = "altShift";
    ModifierKey[ModifierKey["altControl"] = 4097] = "altControl";
    ModifierKey[ModifierKey["metaShift"] = 272] = "metaShift";
    ModifierKey[ModifierKey["metaControl"] = 4112] = "metaControl";
    ModifierKey[ModifierKey["shiftControl"] = 4352] = "shiftControl";
})(ModifierKey || (ModifierKey = {}));
var Key;
(function (Key) {
    Key["X"] = "x";
    Key["BACKSPACE"] = "Backspace";
    Key["ARROW_DOWN"] = "ArrowDown";
    Key["ARROW_UP"] = "ArrowUp";
    Key["ARROW_LEFT"] = "ArrowLeft";
    Key["ARROW_RIGHT"] = "ArrowRight";
})(Key || (Key = {}));
/**
 * The HotkeyHandler Provides the function of binding and unbinding shortcut key event handlers
 */
var HotkeyHandler = /** @class */ (function () {
    function HotkeyHandler() {
        this.handlers = {};
    }
    /**
     * bind key handler
     * @param modifierKey
     * @param code
     * @param handler
     */
    HotkeyHandler.prototype.bindKeyHandler = function (modifierKey, key, handler) {
        if (modifierKey in ModifierKey) {
            if (!this.handlers[modifierKey])
                this.handlers[modifierKey] = {};
            this.handlers[modifierKey][key] = handler;
        }
        else {
            {
                console.error("HotkeyHandler:bindKeyHandler the mofidfierKey " + modifierKey + " is not found");
            }
        }
    };
    /**
     * unbind key handler
     * @param modifierKey
     * @param code
     */
    HotkeyHandler.prototype.unbindKeyHandler = function (modifierKey, code) {
        var _a, _b;
        if (modifierKey in ModifierKey) {
            if ((_b = (_a = this.handlers) === null || _a === void 0 ? void 0 : _a[modifierKey]) === null || _b === void 0 ? void 0 : _b[code]) {
                this.handlers[modifierKey][code] = null;
            }
        }
        else {
            {
                console.error("HotkeyHandler:bindKeyHandler the mofidfierKey " + modifierKey + " is not found");
            }
        }
    };
    HotkeyHandler.prototype.handleKeyPress = function (event) {
        var _a, _b;
        var alt = event.altKey ? ModifierKey.alt : ModifierKey.none;
        var meta = event.metaKey ? ModifierKey.meta : ModifierKey.none;
        var shift = event.shiftKey ? ModifierKey.shift : ModifierKey.none;
        var ctrl = event.ctrlKey ? ModifierKey.control : ModifierKey.none;
        var modifierKey = alt | meta | shift | ctrl;
        var keyCode = event.key;
        var handler = (_b = (_a = this.handlers) === null || _a === void 0 ? void 0 : _a[modifierKey]) === null || _b === void 0 ? void 0 : _b[keyCode];
        if (handler) {
            handler();
        }
    };
    return HotkeyHandler;
}());

var BUILTIN_PLGUIN = {
    BACKGROUND: 'BACKGROUND',
    CONNECT_VERTEX: 'CONNECT_VERTEX',
    EDGE_GENERATOR: 'EDGE_GENERATOR',
    HOT_KEY: 'HOT_KEY',
    SELECT: 'SELECT',
    SINGLE_LINE_HANDLER: 'SINGLE_LINE_HANDLER',
    SINGLE_VERTEX_HANDLER: 'SINGLE_VERTEX_HANDLER',
    VERTEX_TEXT_EDITOR: 'VERTEX_TEXT_EDITOR',
};

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    EzDiagramPlugin: EzDiagramPlugin,
    EzDiagramPluginManager: EzDiagramPluginManager,
    SelectPlugin: SelectPlugin,
    SingleLineHandler: SingleLineHandler,
    SingleVertexHandler: SingleVertexHandler,
    EzBackGround: EzBackGround,
    HotkeyHandler: HotkeyHandler,
    get ModifierKey () { return ModifierKey; },
    get Key () { return Key; },
    BUILTIN_PLGUIN: BUILTIN_PLGUIN
});

var BUILTIN_LAYOUT = {
    GROUP_LAYOUT: 'GROUP_LAYOUT',
    TREE_LAYOUT: 'TREE_LAYOUT',
    MINDMAP_LAYOUT: 'MINDMAP_LAYOUT'
};

var EzLayoutManager = /** @class */ (function () {
    function EzLayoutManager() {
        this.layouts = new Map();
    }
    /**
     * register layout with layout name
     * @param layoutName
     * @param layout
     * @returns
     */
    EzLayoutManager.prototype.use = function (layoutName, layout) {
        if (this.layouts.has(layoutName)) {
            {
                console.error("layout " + layoutName + " is already exist");
            }
            return;
        }
        this.layouts.set(layoutName, layout);
    };
    /**
     * get layout instance
     * @param layoutName
     */
    EzLayoutManager.prototype.get = function (layoutName) {
        return this.layouts.get(layoutName);
    };
    return EzLayoutManager;
}());

var BaseLayout = /** @class */ (function (_super) {
    __extends$1(BaseLayout, _super);
    function BaseLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layoutNodes = [];
        return _this;
    }
    BaseLayout.prototype.execute = function (node) {
        this.layoutRoot = node;
        this._getLayoutNodes();
        this.executeLayout();
        this.updateViewStates();
    };
    BaseLayout.prototype._getLayoutNodes = function () {
        var _this = this;
        this.layoutNodes.length = 0;
        this.layoutNodes.push(this.layoutRoot);
        var visit = function (parentNode) {
            var _a;
            var children = parentNode.layoutChildren;
            (_a = parentNode.edges) === null || _a === void 0 ? void 0 : _a.forEach(function (c) {
                _this.layoutNodes.push(c);
            });
            children.forEach(function (c) {
                _this.layoutNodes.push(c);
                visit(c);
            });
        };
        visit(this.layoutRoot);
    };
    BaseLayout.prototype.canActivate = function () {
        return true;
    };
    return BaseLayout;
}(EzDiagramPlugin));

var TreeLayout = /** @class */ (function (_super) {
    __extends$1(TreeLayout, _super);
    function TreeLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._direction = EzDirection.BOTTOM;
        _this._config = { nodeSpacing: 20, layerSpacing: 30 };
        return _this;
    }
    Object.defineProperty(TreeLayout.prototype, "_isVertical", {
        get: function () {
            return this._direction === EzDirection.TOP || this._direction === EzDirection.BOTTOM;
        },
        enumerable: false,
        configurable: true
    });
    TreeLayout.prototype.updateLayoutNodes = function () {
        var _this = this;
        var updateChildren = function (parent, layer) {
            var children = parent.layoutChildren.filter(function (c) { return c.layoutDirection === _this._direction; });
            if (!children.length)
                return;
            var getMinPosition = function () {
                var center = parent.bounds.center()[_this._isVertical ? 'x' : 'y'];
                var totalLength = children.reduce(function (total, child) {
                    return total + child['layoutLength'];
                }, (children.length - 1) * _this._config.nodeSpacing);
                return center - totalLength / 2;
            };
            var model = _this.diagram.model;
            var xMin;
            var yMin;
            var nextLayer;
            switch (_this._direction) {
                case EzDirection.LEFT:
                    yMin = getMinPosition();
                    nextLayer = layer - Math.max.apply(Math, children.map(function (c) { return c.bounds.width; })) - _this._config.layerSpacing;
                    children.forEach(function (child) {
                        var _a;
                        model.updateBounds(child, new EzRectangle(layer - child.bounds.width, yMin + (child['layoutLength'] - child.bounds.height) / 2, child.bounds.width, child.bounds.height));
                        yMin += (child['layoutLength'] + _this._config.nodeSpacing);
                        if ((_a = child.layoutChildren) === null || _a === void 0 ? void 0 : _a.length) {
                            updateChildren(child, nextLayer);
                        }
                    });
                    break;
                case EzDirection.TOP:
                    xMin = getMinPosition();
                    nextLayer = layer - Math.max.apply(Math, children.map(function (c) { return c.bounds.height; })) - _this._config.layerSpacing;
                    children.forEach(function (child) {
                        var _a;
                        model.updateBounds(child, new EzRectangle(xMin + (child['layoutLength'] - child.bounds.width) / 2, layer - child.bounds.height, child.bounds.width, child.bounds.height));
                        xMin += (child['layoutLength'] + _this._config.nodeSpacing);
                        if ((_a = child.layoutChildren) === null || _a === void 0 ? void 0 : _a.length) {
                            updateChildren(child, nextLayer);
                        }
                    });
                    break;
                case EzDirection.RIGHT:
                    yMin = getMinPosition();
                    nextLayer = layer + Math.max.apply(Math, children.map(function (c) { return c.bounds.width; })) + _this._config.layerSpacing;
                    children.forEach(function (child) {
                        var _a;
                        model.updateBounds(child, new EzRectangle(layer, yMin + (child['layoutLength'] - child.bounds.height) / 2, child.bounds.width, child.bounds.height));
                        yMin += (child['layoutLength'] + _this._config.nodeSpacing);
                        if ((_a = child.layoutChildren) === null || _a === void 0 ? void 0 : _a.length) {
                            updateChildren(child, nextLayer);
                        }
                    });
                    break;
                case EzDirection.BOTTOM:
                    xMin = getMinPosition();
                    nextLayer = layer + Math.max.apply(Math, children.map(function (c) { return c.bounds.height; })) + _this._config.layerSpacing;
                    children.forEach(function (child) {
                        var _a;
                        model.updateBounds(child, new EzRectangle(xMin + (child['layoutLength'] - child.bounds.width) / 2, layer, child.bounds.width, child.bounds.height));
                        xMin += (child['layoutLength'] + _this._config.nodeSpacing);
                        if ((_a = child.layoutChildren) === null || _a === void 0 ? void 0 : _a.length) {
                            updateChildren(child, nextLayer);
                        }
                    });
                    break;
            }
            children.forEach(function (child) {
                var edges = child.edges.filter(function (edge) { return edge.target === child; });
                edges.forEach(function (edge) {
                    switch (_this._direction) {
                        case EzDirection.LEFT:
                            _this.diagram.model.changeConstraint(edge, EzDirection.LEFT, true);
                            _this.diagram.model.changeConstraint(edge, EzDirection.RIGHT, false);
                            break;
                        case EzDirection.TOP:
                            _this.diagram.model.changeConstraint(edge, EzDirection.TOP, true);
                            _this.diagram.model.changeConstraint(edge, EzDirection.BOTTOM, false);
                            break;
                        case EzDirection.RIGHT:
                            _this.diagram.model.changeConstraint(edge, EzDirection.RIGHT, true);
                            _this.diagram.model.changeConstraint(edge, EzDirection.LEFT, false);
                            break;
                        case EzDirection.BOTTOM:
                            _this.diagram.model.changeConstraint(edge, EzDirection.BOTTOM, true);
                            _this.diagram.model.changeConstraint(edge, EzDirection.TOP, false);
                            break;
                    }
                });
            });
        };
        var layerStart;
        var rootBounds = this.layoutRoot.bounds;
        switch (this._direction) {
            case EzDirection.TOP:
                layerStart = rootBounds.y - this._config.layerSpacing;
                break;
            case EzDirection.BOTTOM:
                layerStart = rootBounds.y + rootBounds.height + this._config.layerSpacing;
                break;
            case EzDirection.LEFT:
                layerStart = rootBounds.x - this._config.layerSpacing;
                break;
            case EzDirection.RIGHT:
                layerStart = rootBounds.x + rootBounds.width + this._config.layerSpacing;
                break;
        }
        updateChildren(this.layoutRoot, layerStart);
    };
    TreeLayout.prototype.executeLayout = function () {
        var _this = this;
        [EzDirection.TOP, EzDirection.BOTTOM, EzDirection.LEFT, EzDirection.RIGHT].forEach(function (direction) {
            _this._direction = direction;
            var updateLayerNodes = function (parent) {
                var children = parent.layoutChildren.filter(function (c) { return c.layoutDirection === _this._direction; });
                var pLength = _this._isVertical ? parent.bounds.width : parent.bounds.height;
                if (!children.length)
                    ;
                var cLength = children.reduce(function (prev, cur) {
                    return prev + updateLayerNodes(cur);
                }, (children.length - 1) * _this._config.nodeSpacing);
                var len = Math.max(pLength, cLength);
                parent['layoutLength'] = len;
                return len;
            };
            updateLayerNodes(_this.layoutRoot);
            _this.updateLayoutNodes();
        });
    };
    TreeLayout.prototype.updateViewStates = function () {
        var _this = this;
        this.layoutNodes.forEach(function (node) {
            var state = _this.diagram.view.stateMapping.get(node.id);
            state.updateWork = STATE_WORK_TYPE.UPDATE_FROM_MODEL;
        });
    };
    return TreeLayout;
}(BaseLayout));

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BUILTIN_LAYOUT: BUILTIN_LAYOUT,
    EzLayoutManager: EzLayoutManager,
    BaseLayout: BaseLayout,
    TreeLayout: TreeLayout
});

/**
 *   DELETE_SELECTED:  delete selected elements
 *
 *   MOVE_UP:  move up selected elements
 *
 *   MOVE_DOWN: move down selected elements
 *
 *   MOVE_LEFT: move left selected elements
 *
 *   MOVE_RIGHT: move right selected elements
 */
var BUILTIN_ACTIONS = {
    DELETE_SELECTED: 'DELETE_SELECTED',
    MOVE_UP: 'MOVE_UP',
    MOVE_DOWN: 'MOVE_DOWN',
    MOVE_LEFT: 'MOVE_LEFT',
    MOVE_RIGHT: 'MOVE_RIGHT'
};
/**
 *  register default diagram actions
 */
var EzDiagramActions = /** @class */ (function () {
    function EzDiagramActions(diagram) {
        var _this = this;
        this.actions = new Map();
        /**
         * delete selected elements on a diagram
         * @param diagram
         */
        this._deleteSelected = function (diagram) {
            if (!_this._selected.length)
                return false;
            diagram.view.removeStates(_this._selected);
            return true;
        };
        /**
         * move up selected elements on a diagram
         * @param diagram
         */
        this._moveUpSelected = function (diagram) {
            if (!_this._selected.length)
                return false;
            var view = diagram.view;
            var distance = new EzPoint(0, -10);
            _this._selected.forEach(function (state) {
                if (state instanceof EzVertexViewState) {
                    view.moveVertex(state, distance);
                }
                else {
                    view.moveEdge(state, distance);
                }
            });
            return true;
        };
        /**
         * move down selected elements on a diagram
         * @param diagram
         */
        this._moveDownSelected = function (diagram) {
            var view = diagram.view;
            var distance = new EzPoint(0, 10);
            _this._selected.forEach(function (state) {
                if (state instanceof EzVertexViewState) {
                    view.moveVertex(state, distance);
                }
                else {
                    view.moveEdge(state, distance);
                }
            });
            return true;
        };
        /**
         * move left selected elements on a diagram
         * @param diagram
         */
        this._moveLeftSelected = function (diagram) {
            var view = diagram.view;
            var distance = new EzPoint(-10, 0);
            _this._selected.forEach(function (state) {
                if (state instanceof EzVertexViewState) {
                    view.moveVertex(state, distance);
                }
                else {
                    view.moveEdge(state, distance);
                }
            });
            return true;
        };
        /**
         * move right selected elements on a diagram
         * @param diagram
         */
        this._moveRightSelected = function (diagram) {
            var view = diagram.view;
            var distance = new EzPoint(10, 0);
            _this._selected.forEach(function (state) {
                if (state instanceof EzVertexViewState) {
                    view.moveVertex(state, distance);
                }
                else {
                    view.moveEdge(state, distance);
                }
            });
            return true;
        };
        this.diagram = diagram;
        this._registerBuiltinActions();
    }
    /**
     * execute action with given action type
     * @param actionType
     * @returns
     */
    EzDiagramActions.prototype.execute = function (actionType) {
        var actionHandler = this.actions.get(actionType);
        if (!actionHandler) {
            {
                console.error("EzDiagramActions:execute no registered action handler found for action type : " + actionType);
            }
            return false;
        }
        var result = actionHandler(this.diagram);
        return result;
    };
    /**
     * register action handler
     * @param actionType
     * @param handler
     */
    EzDiagramActions.prototype.register = function (actionType, handler) {
        this.actions.set(actionType, handler);
    };
    Object.defineProperty(EzDiagramActions.prototype, "_selected", {
        get: function () {
            var _a;
            return (_a = this.diagram.pluginManager.getContext()) === null || _a === void 0 ? void 0 : _a.selectedViewStates;
        },
        enumerable: false,
        configurable: true
    });
    EzDiagramActions.prototype._registerBuiltinActions = function () {
        this.actions.set(BUILTIN_ACTIONS.DELETE_SELECTED, this._deleteSelected);
        this.actions.set(BUILTIN_ACTIONS.MOVE_LEFT, this._moveLeftSelected);
        this.actions.set(BUILTIN_ACTIONS.MOVE_UP, this._moveUpSelected);
        this.actions.set(BUILTIN_ACTIONS.MOVE_RIGHT, this._moveRightSelected);
        this.actions.set(BUILTIN_ACTIONS.MOVE_DOWN, this._moveDownSelected);
    };
    return EzDiagramActions;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function isFunction(value) {
    return typeof value === 'function';
}

function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}

var UnsubscriptionError = createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}

var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._teardowns = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialTeardown = this.initialTeardown;
            if (isFunction(initialTeardown)) {
                try {
                    initialTeardown();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            var _teardowns = this._teardowns;
            if (_teardowns) {
                this._teardowns = null;
                try {
                    for (var _teardowns_1 = __values(_teardowns), _teardowns_1_1 = _teardowns_1.next(); !_teardowns_1_1.done; _teardowns_1_1 = _teardowns_1.next()) {
                        var teardown_1 = _teardowns_1_1.value;
                        try {
                            execTeardown(teardown_1);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_teardowns_1_1 && !_teardowns_1_1.done && (_b = _teardowns_1.return)) _b.call(_teardowns_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execTeardown(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._teardowns = (_a = this._teardowns) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _teardowns = this._teardowns;
        _teardowns && arrRemove(_teardowns, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execTeardown(teardown) {
    if (isFunction(teardown)) {
        teardown();
    }
    else {
        teardown.unsubscribe();
    }
}

var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};

var timeoutProvider = {
    setTimeout: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) || setTimeout).apply(void 0, __spreadArray([], __read(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};

function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function () {
        var onUnhandledError = config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}

function noop() { }

var COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}

var context = null;
function errorContext(cb) {
    {
        cb();
    }
}
function captureError(err) {
    if (config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}

var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification(nextNotification(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification(errorNotification(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription));
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var next;
        if (isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            (next = observerOrNext.next, error = observerOrNext.error, complete = observerOrNext.complete);
            var context_1;
            if (_this && config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
            }
            else {
                context_1 = observerOrNext;
            }
            next = next === null || next === void 0 ? void 0 : next.bind(context_1);
            error = error === null || error === void 0 ? void 0 : error.bind(context_1);
            complete = complete === null || complete === void 0 ? void 0 : complete.bind(context_1);
        }
        _this.destination = {
            next: next ? wrapForErrorHandling(next) : noop,
            error: wrapForErrorHandling(error !== null && error !== void 0 ? error : defaultErrorHandler),
            complete: complete ? wrapForErrorHandling(complete) : noop,
        };
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
function wrapForErrorHandling(handler, instance) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            handler.apply(void 0, __spreadArray([], __read(args)));
        }
        catch (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                captureError(err);
            }
            else {
                reportUnhandledError(err);
            }
        }
    };
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config.onStoppedNotification;
    onStoppedNotification && timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};

var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

function identity(x) {
    return x;
}

function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
        errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}

function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}

var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        var closed = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    };
    return OperatorSubscriber;
}(Subscriber));

var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};

var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        return this;
    };
    return Action;
}(Subscription));

var intervalProvider = {
    setInterval: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) || setInterval).apply(void 0, __spreadArray([], __read(args)));
    },
    clearInterval: function (handle) {
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: undefined,
};

var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        intervalProvider.clearInterval(id);
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = (!!e && e) || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(Action));

var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = dateTimestampProvider.now;
    return Scheduler;
}());

var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        _this._scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler));

var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;

function scheduleArray(input, scheduler) {
    return new Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}

var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();

function isInteropObservable(input) {
    return isFunction(input[observable]);
}

function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

function innerFrom(input) {
    if (input instanceof Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
    return new Observable(function (subscriber) {
        var obs = obj[observable]();
        if (isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}

function internalFromArray(input, scheduler) {
    return scheduler ? scheduleArray(input, scheduler) : fromArrayLike(input);
}

function isScheduler(value) {
    return value && isFunction(value.schedule);
}

function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
}

function map(project, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}

var isArray = Array.isArray;
function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return map(function (args) { return callOrApply(fn, args); });
}

function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalTeardown) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        innerFrom(project(value, index++)).subscribe(new OperatorSubscriber(subscriber, function (innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
                outerNext(innerValue);
            }
            else {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        innerSubScheduler ? subscriber.add(innerSubScheduler.schedule(function () { return doInnerSub(bufferedValue); })) : doInnerSub(bufferedValue);
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe(new OperatorSubscriber(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
        additionalTeardown === null || additionalTeardown === void 0 ? void 0 : additionalTeardown();
    };
}

function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction(resultSelector)) {
        return mergeMap(function (a, i) { return map(function (b, ii) { return resultSelector(a, b, i, ii); })(innerFrom(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return operate(function (source, subscriber) { return mergeInternals(source, subscriber, project, concurrent); });
}

var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
    }
    var _a = __read(isEventTarget(target)
        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
        :
            isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                : isJQueryStyleEventEmitter(target)
                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                    : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
        if (isArrayLike(target)) {
            return mergeMap(function (subTarget) { return fromEvent(subTarget, eventName, options); })(internalFromArray(target));
        }
    }
    if (!add) {
        throw new TypeError('Invalid event target');
    }
    return new Observable(function (subscriber) {
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function () { return remove(handler); };
    });
}
function toCommonHandlerRegistry(target, eventName) {
    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
}
function isNodeStyleEventEmitter(target) {
    return isFunction(target.addListener) && isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
    return isFunction(target.on) && isFunction(target.off);
}
function isEventTarget(target) {
    return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
}

function timer(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) { dueTime = 0; }
    if (scheduler === void 0) { scheduler = async; }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
        if (isScheduler(intervalOrScheduler)) {
            scheduler = intervalOrScheduler;
        }
        else {
            intervalDuration = intervalOrScheduler;
        }
    }
    return new Observable(function (subscriber) {
        var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
            due = 0;
        }
        var n = 0;
        return scheduler.schedule(function () {
            if (!subscriber.closed) {
                subscriber.next(n++);
                if (0 <= intervalDuration) {
                    this.schedule(undefined, intervalDuration);
                }
                else {
                    subscriber.complete();
                }
            }
        }, due);
    });
}

function filter(predicate, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}

function tap(observerOrNext, error, complete) {
    var tapObserver = isFunction(observerOrNext) || error || complete
        ?
            { next: observerOrNext, error: error, complete: complete }
        : observerOrNext;
    return tapObserver
        ? operate(function (source, subscriber) {
            var _a;
            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
            var isUnsub = true;
            source.subscribe(new OperatorSubscriber(subscriber, function (value) {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                subscriber.next(value);
            }, function () {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                subscriber.complete();
            }, function (err) {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                subscriber.error(err);
            }, function () {
                var _a, _b;
                if (isUnsub) {
                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
            }));
        })
        :
            identity;
}

var defaultThrottleConfig = {
    leading: true,
    trailing: false,
};
function throttle(durationSelector, _a) {
    var _b = _a === void 0 ? defaultThrottleConfig : _a, leading = _b.leading, trailing = _b.trailing;
    return operate(function (source, subscriber) {
        var hasValue = false;
        var sendValue = null;
        var throttled = null;
        var isComplete = false;
        var endThrottling = function () {
            throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
            throttled = null;
            if (trailing) {
                send();
                isComplete && subscriber.complete();
            }
        };
        var cleanupThrottling = function () {
            throttled = null;
            isComplete && subscriber.complete();
        };
        var startThrottle = function (value) {
            return (throttled = innerFrom(durationSelector(value)).subscribe(new OperatorSubscriber(subscriber, endThrottling, cleanupThrottling)));
        };
        var send = function () {
            if (hasValue) {
                hasValue = false;
                var value = sendValue;
                sendValue = null;
                subscriber.next(value);
                !isComplete && startThrottle(value);
            }
        };
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            sendValue = value;
            !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
        }, function () {
            isComplete = true;
            !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
        }));
    });
}

function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    if (config === void 0) { config = defaultThrottleConfig; }
    var duration$ = timer(duration, scheduler);
    return throttle(function () { return duration$; }, config);
}

/**
 *  bind hot key action for diagram
 */
var EzHotKey = /** @class */ (function (_super) {
    __extends$1(EzHotKey, _super);
    function EzHotKey() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isEditing = false;
        return _this;
    }
    EzHotKey.prototype.onCreate = function () {
        this._bindScaleAndTranslate();
        this._bindKeyhandlers();
        this._bindShortcut();
    };
    EzHotKey.prototype.onStartEditing = function () {
        this._isEditing = true;
    };
    EzHotKey.prototype.onStopEditing = function () {
        this._isEditing = false;
    };
    EzHotKey.prototype.isValidKeyEvent = function (event) {
        var _a;
        return !!((_a = this.context.selectedViewStates) === null || _a === void 0 ? void 0 : _a.length);
    };
    /**
     *  press Backspace to delete element
     */
    EzHotKey.prototype._bindShortcut = function () {
        var _this = this;
        var keyHandler = this.diagram.keyHandler;
        keyHandler.bindKeyHandler(ModifierKey.none, Key.BACKSPACE, function () { return !_this._isEditing && _this.diagram.actions.execute(BUILTIN_ACTIONS.DELETE_SELECTED); });
        keyHandler.bindKeyHandler(ModifierKey.none, Key.ARROW_UP, function () { return _this.diagram.actions.execute(BUILTIN_ACTIONS.MOVE_UP); });
        keyHandler.bindKeyHandler(ModifierKey.none, Key.ARROW_DOWN, function () { return _this.diagram.actions.execute(BUILTIN_ACTIONS.MOVE_DOWN); });
        keyHandler.bindKeyHandler(ModifierKey.none, Key.ARROW_LEFT, function () { return _this.diagram.actions.execute(BUILTIN_ACTIONS.MOVE_LEFT); });
        keyHandler.bindKeyHandler(ModifierKey.none, Key.ARROW_RIGHT, function () { return _this.diagram.actions.execute(BUILTIN_ACTIONS.MOVE_RIGHT); });
    };
    /**
     *  bind key handlers
     */
    EzHotKey.prototype._bindKeyhandlers = function () {
        var _this = this;
        fromEvent(document.documentElement, 'keydown').pipe(map(function (event) {
            if (_this.isValidKeyEvent(event)) {
                _this.diagram.keyHandler.handleKeyPress(event);
            }
        })).subscribe();
    };
    /**
     *  zoom and scale graph using mouse wheel or touch pad
     */
    EzHotKey.prototype._bindScaleAndTranslate = function () {
        var _this = this;
        var view = this.diagram.view;
        this.root = view.svg;
        var wheelDeltaX = 0;
        var wheelDeltaY = 0;
        var wheel = fromEvent(this.root.el, 'wheel').pipe(filter(function () { return _this.diagram.configManager.shouldScaleAndTranslate; }), tap(function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
        }), throttleTime(16), tap(function (evt) {
            wheelDeltaX += evt['wheelDeltaX'];
            wheelDeltaY += evt['wheelDeltaY'];
        }));
        this.zoomSubscription = wheel.pipe(filter(function (evt) {
            return evt.ctrlKey || (evt.metaKey && isMac());
        })).subscribe(function (evt) {
            var scaleCenter = new EzPoint(evt.clientX - view.size.left, evt.clientY - view.size.top);
            if (evt.deltaY > 0) {
                if (view.getScale() < 0.5)
                    return;
                _this.diagram.zoomOut(0.15, scaleCenter);
            }
            else {
                if (view.getScale() > 4)
                    return;
                _this.diagram.zoomIn(0.15, scaleCenter);
            }
            wheelDeltaX = 0;
            wheelDeltaY = 0;
        });
        this.translateSubscription = wheel.pipe(filter(function (evt) {
            return !evt.ctrlKey && !(evt.metaKey && isMac());
        })).subscribe(function () {
            var offset = new EzPoint(Math.round(wheelDeltaX), Math.round(wheelDeltaY));
            _this.diagram.translate(offset);
            wheelDeltaX = 0;
            wheelDeltaY = 0;
        });
    };
    EzHotKey.prototype.onDestroy = function () {
        this.zoomSubscription.unsubscribe();
        this.translateSubscription.unsubscribe();
    };
    return EzHotKey;
}(EzDiagramPlugin));

function generateElements(view, state, grow) {
    if (grow === void 0) { grow = 0; }
    var getData = function () {
        var s = state.alternate || state;
        var bounds = s.getBounds().clone().grow(grow);
        var targetConstraints = state.node.constraints;
        var constraintPoints = targetConstraints.map(function (constraint) {
            return new EzPoint(bounds.x + constraint.percentX * bounds.width + constraint.offsetX, bounds.y + constraint.percentY * bounds.height + constraint.offsetY);
        }).map(function (point) { return getRotatedPoint(point, state.style.rotation || 0, bounds.center()); }).map(function (pt) { return view.ensurePointMeetsGrid(pt); });
        return [bounds, targetConstraints, constraintPoints];
    };
    var _a = getData(), bounds = _a[0], targetConstraints = _a[1], constraintPoints = _a[2];
    var rectEl = EzElement.el('rect').attr({
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        fill: 'rgba(255,255,255,0.01)',
        transform: "rotate(" + (state.style.rotation || 0) + " " + bounds.center().x + " " + bounds.center().y + ")"
    }).style({ pointerEvents: 'stroke' });
    var constraintEls = constraintPoints.map(function (point, index) { return EzElement.el('ellipse').attr({
        cx: point.x, cy: point.y, rx: 5, ry: 5, fill: 'rgba(132, 168, 235,0.5)', class: 'edge-generate-bend', dataIndex: index
    }); });
    var children = __spreadArray$1([rectEl], constraintEls, true);
    var handlerElement = getHandlerContainer(state).appendChildren(children);
    var update = function () {
        var _a = getData(), bounds = _a[0], constraintPoints = _a[2];
        rectEl.attr(bounds.plain());
        constraintEls.forEach(function (el, idx) {
            var point = constraintPoints[idx];
            el.attr({
                cx: point.x, cy: point.y, rx: 5, ry: 5
            });
        });
    };
    return [targetConstraints, constraintPoints, handlerElement, update];
}

var ConnectVertex = /** @class */ (function (_super) {
    __extends$1(ConnectVertex, _super);
    function ConnectVertex() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._connectTolerence = 10;
        _this._constraintTolerence = 30;
        return _this;
    }
    Object.defineProperty(ConnectVertex.prototype, "selected", {
        get: function () {
            var selected = this.context.selectedViewStates;
            if (selected) {
                if (selected.length > 1)
                    return;
                if (selected.length === 1) {
                    if (selected[0] instanceof EzEdgeViewState)
                        return selected[0];
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    ConnectVertex.prototype._getTerminalType = function (evt) {
        var target = evt.target;
        var el = EzElement.el(target);
        if (!el.hasAttr('handler'))
            return;
        var idx = Number(el.getAttr('index'));
        if (isNaN(idx))
            return;
        if (idx === 0)
            return EdgeTerminalType.SOURCE;
        if (idx === this.selected.getPoints().length - 1)
            return EdgeTerminalType.TARGET;
    };
    ConnectVertex.prototype._getTopMostIntersectedVertexState = function (point) {
        var _this = this;
        var view = this.diagram.view;
        var intersected = [];
        view.stateMapping.forEach(function (state) {
            if (state instanceof EzEdgeViewState)
                return;
            if ((state instanceof EzVertexViewState) && state.style.editable !== false) {
                var bounds = state.getBounds().clone().grow(_this._constraintTolerence);
                var rect = toRectPoints(bounds, state.style.rotation);
                if (isPointInsideRect(rect, point)) {
                    intersected.push(state);
                }
            }
        });
        // TODO return first matched vertex state for temporary use , remember to return top most state
        return intersected[0];
    };
    ConnectVertex.prototype._generateConnectionPoints = function (state) {
        if (this._handlerElement)
            return;
        var _a = generateElements(this.diagram.view, state), _targetConstraints = _a[0], _constraintPoints = _a[1], _handlerElement = _a[2];
        this._targetConstraints = _targetConstraints;
        this._constraintPoints = _constraintPoints;
        this._handlerElement = _handlerElement;
        this.diagram.view.overlayGroup.appendChild(this._handlerElement);
    };
    ConnectVertex.prototype._handleConnectToConnectionPoint = function (evt) {
        var view = this.diagram.view;
        var mousePosition = view.getMousePointRelateToContainer(evt);
        var distances = this._constraintPoints.map(function (point) { return getNormOfVector(getVector(point, mousePosition)); });
        var nearestDistance = Math.min.apply(Math, distances);
        var idx = distances.findIndex(function (i) { return i === nearestDistance; });
        var nearestPoint = this._constraintPoints[idx];
        this._constraint = this._targetConstraints[idx];
        if (nearestDistance <= this._connectTolerence) {
            this._constraintPoint = nearestPoint;
            view.changingEdgePoint(this.selected, nearestPoint, this._terminalType === EdgeTerminalType.SOURCE ? 0 : this.selected.getPoints().length - 1, true);
        }
        else {
            this._constraintPoint = null;
        }
    };
    ConnectVertex.prototype._destroyHandlerElement = function () {
        var _a;
        (_a = this._handlerElement) === null || _a === void 0 ? void 0 : _a.remove();
        this._handlerElement = null;
    };
    ConnectVertex.prototype.canActivate = function () {
        var _a;
        return !!((_a = this.context.selectedViewStates) === null || _a === void 0 ? void 0 : _a.length);
    };
    ConnectVertex.prototype.onDeActivate = function () {
    };
    ConnectVertex.prototype.onMouseDown = function (_a) {
        var evt = _a.evt;
        if (!this.selected)
            return;
        this._terminalType = this._getTerminalType(evt);
    };
    ConnectVertex.prototype.onPressMove = function (_a) {
        var evt = _a.evt;
        if (!this.selected)
            return;
        if (this._terminalType === EdgeTerminalType.SOURCE || this._terminalType === EdgeTerminalType.TARGET) {
            var intersected = this._getTopMostIntersectedVertexState(this.diagram.view.getMousePointRelateToContainer(evt));
            if (intersected) {
                this._targetVertex = intersected.node;
                this._generateConnectionPoints(intersected);
                this._handleConnectToConnectionPoint(evt);
            }
            else {
                this._destroyHandlerElement();
            }
        }
    };
    ConnectVertex.prototype.onMouseUp = function () {
        if (!this.selected)
            return;
        var view = this.diagram.view;
        if (this._constraintPoint) {
            var index = this._terminalType === EdgeTerminalType.SOURCE ? 0 : this.selected.getPoints().length - 1;
            view.changeEdgePoint(this.selected, this._constraintPoint, index, true);
            view.updateTerminalVertex(this.selected, this._targetVertex, this._constraint, this._terminalType === EdgeTerminalType.SOURCE);
        }
        this._destroyHandlerElement();
        this._constraintPoint = null;
        this._terminalType = null;
        this._targetVertex = null;
        this._constraint = null;
        this._targetConstraints = null;
    };
    ConnectVertex.prototype._updateRelatedEdgeTerminalPoint = function (state, update) {
        var s = state.alternate || state;
        var vertex = s.node;
        var edges = vertex.edges;
        var bounds = s.getBounds();
        var view = this.diagram.view;
        var getTerminalPoint = function (edge, isSource) {
            var constraint = isSource ? edge.sourceConstraint : edge.targetConstraint;
            var point = new EzPoint(bounds.x + constraint.percentX * bounds.width + constraint.offsetX, bounds.y + constraint.percentY * bounds.height + constraint.offsetY);
            return getRotatedPoint(point, s.style.rotation || 0, bounds.center());
        };
        edges.forEach(function (edge) {
            var isSource = edge.source === vertex;
            var point = getTerminalPoint(edge, isSource);
            var idx = isSource ? 0 : edge.points.length - 1;
            var state = view.stateMapping.get(edge.id);
            update ? view.changeEdgePoint(state, point, idx, true) : view.changingEdgePoint(state, point, idx, true);
        });
    };
    ConnectVertex.prototype.onMoveVertex = function (state) {
        this._updateRelatedEdgeTerminalPoint(state, true);
    };
    ConnectVertex.prototype.onMovingVertex = function (state) {
        this._updateRelatedEdgeTerminalPoint(state, false);
    };
    ConnectVertex.prototype.onRotateVertex = function (state) {
        this._updateRelatedEdgeTerminalPoint(state, true);
    };
    ConnectVertex.prototype.onRotatingVertex = function (state) {
        this._updateRelatedEdgeTerminalPoint(state, false);
    };
    ConnectVertex.prototype.onResizingVertex = function (state) {
        this._updateRelatedEdgeTerminalPoint(state, true);
    };
    ConnectVertex.prototype.onResizeVertex = function (state) {
        this._updateRelatedEdgeTerminalPoint(state, false);
    };
    return ConnectVertex;
}(EzDiagramPlugin));
var EdgeTerminalType;
(function (EdgeTerminalType) {
    EdgeTerminalType[EdgeTerminalType["SOURCE"] = 0] = "SOURCE";
    EdgeTerminalType[EdgeTerminalType["TARGET"] = 1] = "TARGET";
})(EdgeTerminalType || (EdgeTerminalType = {}));

var VertexTextEditor = /** @class */ (function (_super) {
    __extends$1(VertexTextEditor, _super);
    function VertexTextEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isMouseDown = false;
        return _this;
    }
    Object.defineProperty(VertexTextEditor.prototype, "selected", {
        get: function () {
            var selected = this.context.selectedViewStates;
            if (selected && selected.length === 1 && selected[0] instanceof EzVertexViewState) {
                return selected[0];
            }
        },
        enumerable: false,
        configurable: true
    });
    VertexTextEditor.prototype.canActivate = function () {
        return !!this.selected;
    };
    VertexTextEditor.prototype.onDeActivate = function () {
        this._clear();
    };
    VertexTextEditor.prototype.onChangeSelection = function () {
        this._clear();
    };
    VertexTextEditor.prototype.onDblClick = function (evt) {
        if (this._canStartEditing(evt) && evt.state.style.editable !== false) {
            this._startEditing();
        }
    };
    VertexTextEditor.prototype.onMouseDown = function () {
        this._isMouseDown = true;
    };
    VertexTextEditor.prototype.onMouseMove = function (_a) {
        var evt = _a.evt;
        var target = evt.target;
        if (!target)
            return;
        if (!this._isMouseDown)
            return;
        if (this._isEditorFocused(evt))
            return;
        if (this._editorElm) {
            this._updateEditorElm();
        }
    };
    VertexTextEditor.prototype.onMouseUp = function () {
        this._isMouseDown = false;
    };
    VertexTextEditor.prototype._clear = function () {
        var _a;
        var view = this.diagram.view;
        if (this._editingState) {
            var val = this._editorContentWrapper.el.innerHTML;
            view.updateText(this._editingState, val);
            this.diagram.pluginManager.callHook('onStopEditing', this._editingState);
            view.callShapeEventHook(this._editingState, 'onStopEditing');
            this._editingState = null;
        }
        (_a = this._editorElm) === null || _a === void 0 ? void 0 : _a.remove();
        this._editorElm = null;
        this._editorContentWrapper = null;
    };
    VertexTextEditor.prototype._canStartEditing = function (evt) {
        var target = evt.evt.target;
        if (!target)
            return false;
        return !this._isEditorFocused(evt.evt);
    };
    VertexTextEditor.prototype._startEditing = function () {
        if (!this._editorElm) {
            this._createEditorElm();
        }
        this._updateEditorElm();
        this._focusEditor();
        this._editingState = this.selected;
        this.diagram.pluginManager.callHook('onStartEditing', this.selected);
        this.diagram.view.callShapeEventHook(this.selected, 'onStartEditing');
    };
    VertexTextEditor.prototype._createEditorElm = function () {
        this._editorContentWrapper = EzElement.el('div', HTML_NAME_SPACE).attr({ contenteditable: 'true', id: 'editor' }).style({
            outline: 'none',
            maxWidth: '98%',
            minWidth: '10px',
            textAlign: 'center'
        });
        this._editorContentWrapper.el.appendChild(document.createTextNode(''));
        var fontStyles = getFontStyles(this.selected.style);
        this._editorElm = getHandlerContainer(this.selected).appendChild(EzElement.el('foreignObject').attr(__assign({}, this.selected.getBounds().plain())).appendChild(EzElement.el('div', HTML_NAME_SPACE).style({
            width: '100%', height: '100%', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', textAlign: 'center'
        }).style(fontStyles).appendChild(this._editorContentWrapper)));
        this.diagram.view.overlayGroup.appendChild(this._editorElm);
    };
    VertexTextEditor.prototype._focusEditor = function () {
        var _this = this;
        var range = document.createRange();
        var sel = window.getSelection();
        var last = (function () {
            var _a;
            var last = (_a = _this._editorContentWrapper.el) === null || _a === void 0 ? void 0 : _a.lastChild;
            while (last.nodeType !== 3) {
                last = last.lastChild;
            }
            return last;
        })();
        var len = last.textContent.length;
        range.setStart(last, len);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    };
    VertexTextEditor.prototype._updateEditorElm = function () {
        var _a;
        var state = this.selected.alternate || this.selected;
        var bounds = state.getBounds().plain();
        (_a = this._editorElm.attr(bounds).firstElementChild()) === null || _a === void 0 ? void 0 : _a.attr(bounds);
        var text = state.node.text;
        if (!text) {
            this._editorContentWrapper.el.appendChild(document.createTextNode(''));
        }
        else {
            this._editorContentWrapper.html(text);
        }
    };
    VertexTextEditor.prototype._isEditorFocused = function (evt) {
        var target = evt.target;
        return !!(EzElement.el(target).farestAncestor('#editor') || EzElement.el(target).is('#editor'));
    };
    return VertexTextEditor;
}(EzDiagramPlugin));

var EdgeGenerator = /** @class */ (function (_super) {
    __extends$1(EdgeGenerator, _super);
    function EdgeGenerator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._constraintGrow = 0;
        return _this;
    }
    Object.defineProperty(EdgeGenerator.prototype, "selected", {
        /** selected vertex */
        get: function () {
            var selected = this.context.selectedViewStates;
            if (selected) {
                if (selected.length > 1)
                    return;
                if (selected.length === 1) {
                    if (selected[0] instanceof EzVertexViewState)
                        return selected[0];
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EdgeGenerator.prototype, "state", {
        get: function () {
            var _a;
            return ((_a = this.selected) === null || _a === void 0 ? void 0 : _a.alternate) || this.selected;
        },
        enumerable: false,
        configurable: true
    });
    EdgeGenerator.prototype.beforeCallingHook = function (_a) {
        var evt = _a.evt;
        var target = EzElement.el(evt.target);
        if (evt.type === 'mousedown' && !this.selected && target.is('.edge-generate-bend')) {
            this._setSelectPluginDisabled(true);
        }
    };
    EdgeGenerator.prototype.onMouseDown = function (_a) {
        var evt = _a.evt;
        if (!this._isEdgeGenerateBend(evt))
            return;
        var _b = this._getTargetConstraintInfo(evt), _constraint = _b[0], _constraintPoint = _b[1];
        this._constraint = _constraint;
        this._constraintPoint = _constraintPoint;
    };
    EdgeGenerator.prototype.onMouseMove = function (_a) {
        var evt = _a.evt, state = _a.state;
        if (state && state instanceof EzVertexViewState) {
            if (!this._handlerElement && !this.selected && state.style.editable !== false) {
                var _b = generateElements(this.diagram.view, state, this._constraintGrow), _targetConstraints = _b[0], _constraintPoints = _b[1], _handlerElement = _b[2];
                this._handlerElement = _handlerElement;
                this._constraintPoints = _constraintPoints;
                this._currentVertex = state;
                this._targetConstraints = _targetConstraints;
                this.diagram.view.overlayGroup.appendChild(_handlerElement);
            }
            else if (this._currentVertex !== state) {
                this._reset();
            }
        }
        else if (!this._constraintPoint) {
            this._reset();
        }
        if (this._constraintPoint) {
            this.diagram.clearSelection();
            var view = this.diagram.view;
            var current = view.getMousePointRelateToContainer(evt);
            if (this._tempEdge) {
                view.changingEdgePoint(this._tempEdge, current, 1, true);
            }
            else {
                var node = new EzEdge([this._constraintPoint.clone(), current.clone()], { shape: BUILTIN_SHAPE.LINE, markerEnd: BUILTIN_MARKER.TRIANGLE, });
                this._tempEdge = view.addTempState(node);
            }
        }
    };
    EdgeGenerator.prototype.onMouseUp = function (_a) {
        var evt = _a.evt;
        var diagram = this.diagram;
        var view = diagram.view;
        var current = view.getMousePointRelateToContainer(evt);
        if (this._tempEdge) {
            view.changeEdgePoint(this._tempEdge, current, 1, true);
            var viewPoints = this._tempEdge.alternate.getPoints();
            view.removeTempState(this._tempEdge);
            var modelPoints = viewPoints.map(function (point) {
                return new EzPoint(point.x / view.getScale() - view.getTranslate().x, point.y / view.getScale() - view.getTranslate().y);
            });
            var edge = this._tempEdge.node;
            edge.points = modelPoints;
            edge.source = this._currentVertex.node;
            edge.sourceConstraint = this._constraint;
            diagram.addEdge(edge);
        }
        this._setSelectPluginDisabled(false);
        this._constraintPoint = null;
        this._constraint = null;
        this._constraintPoints = null;
        this._targetConstraints = null;
        this._tempEdge = null;
    };
    EdgeGenerator.prototype.onChangeSelection = function () {
        if (this.selected) {
            this._reset();
        }
    };
    EdgeGenerator.prototype._setSelectPluginDisabled = function (disabled) {
        var pluginManager = this.diagram.pluginManager;
        var selectPlugin = pluginManager.getPlugins().get(BUILTIN_PLGUIN.SELECT);
        selectPlugin === null || selectPlugin === void 0 ? void 0 : selectPlugin.setDisabled(disabled);
    };
    EdgeGenerator.prototype._getTargetConstraintInfo = function (evt) {
        if (this._isEdgeGenerateBend(evt)) {
            var el = EzElement.el(evt.target);
            var index = +el.data('index');
            return [this._targetConstraints[index], this._constraintPoints[index]];
        }
    };
    EdgeGenerator.prototype._isEdgeGenerateBend = function (evt) {
        var el = EzElement.el(evt.target);
        return el.is('.edge-generate-bend');
    };
    EdgeGenerator.prototype._reset = function () {
        var _a;
        (_a = this._handlerElement) === null || _a === void 0 ? void 0 : _a.remove();
        this._handlerElement = null;
    };
    return EdgeGenerator;
}(EzDiagramPlugin));

var EzDiagram = /** @class */ (function () {
    function EzDiagram(container, opts) {
        if (opts === void 0) { opts = {}; }
        /**
         *  holds all registered plugins
         */
        this.pluginManager = new EzDiagramPluginManager(this);
        /**
         * holds default configs for current diagram.
         * also, it supply methods to changes default configs
         */
        this.configManager = new EzConfigManager();
        /**
         * holds all built in layouts for current diagram.
         * also ,  it supply methods to add or modify layout
         */
        this.layoutmanager = new EzLayoutManager();
        /**
         * provides a esay way to bind or unbind hotkey shortcuts
         * for diagram
         * `
         *   // delete a diagram element while press ctrl + x
         *   // TODO
         * `
         */
        this.keyHandler = new HotkeyHandler();
        /**
         * holds default diagram actions
         */
        this.actions = new EzDiagramActions(this);
        this.options = opts;
        this._applyBuiltInPlugins();
        this._applyBuiltInLayouts();
        this.container = EzElement.el(container, HTML_NAME_SPACE);
        this.view = new EzDiagramView(this);
        this.model = new EzModel();
        this.pluginManager.callHook('onCreate');
    }
    /**
     * clear container and render svg element
     */
    EzDiagram.prototype.render = function () {
        this.executeLayouts();
        var svg = this.view.rerender();
        this.container.empty();
        this.container.appendChild(svg);
    };
    EzDiagram.prototype._applyBuiltInPlugins = function () {
        var _this = this;
        var ctx = this.pluginManager.getContext();
        var plugins = [
            { name: BUILTIN_PLGUIN.SELECT, plugin: new SelectPlugin(this, ctx) },
            { name: BUILTIN_PLGUIN.SINGLE_LINE_HANDLER, plugin: new SingleLineHandler(this, ctx) },
            { name: BUILTIN_PLGUIN.EDGE_GENERATOR, plugin: new EdgeGenerator(this, ctx) },
            { name: BUILTIN_PLGUIN.SINGLE_VERTEX_HANDLER, plugin: new SingleVertexHandler(this, ctx) },
            { name: BUILTIN_PLGUIN.HOT_KEY, plugin: new EzHotKey(this, ctx) },
            { name: BUILTIN_PLGUIN.CONNECT_VERTEX, plugin: new ConnectVertex(this, ctx) },
            { name: BUILTIN_PLGUIN.VERTEX_TEXT_EDITOR, plugin: new VertexTextEditor(this, ctx) },
        ];
        //  use dynamic background here
        if (this.options.background) {
            plugins.push({ name: BUILTIN_PLGUIN.BACKGROUND, plugin: new EzBackGround(this, ctx) });
        }
        plugins.forEach(function (_a) {
            var name = _a.name, plugin = _a.plugin;
            _this.pluginManager.use(name, plugin);
        });
    };
    EzDiagram.prototype._applyBuiltInLayouts = function () {
        var ctx = this.pluginManager.getContext();
        this.layoutmanager.use(BUILTIN_LAYOUT.TREE_LAYOUT, new TreeLayout(this, ctx));
    };
    EzDiagram.prototype.zoomIn = function (zoomStep, centerPoint) {
        var nextScale = this.view.getScale() + zoomStep;
        this.zoomTo(nextScale, centerPoint);
    };
    EzDiagram.prototype.zoomOut = function (zoomStep, centerPoint) {
        var nextScale = this.view.getScale() - zoomStep;
        this.zoomTo(nextScale, centerPoint);
    };
    /**
     * zooms the diagram to the given scale with an center argument
     * @param scale
     * @param centerPoint
     */
    EzDiagram.prototype.zoomTo = function (scale, centerPoint) {
        if (centerPoint === void 0) { centerPoint = this.getViewCenter(); }
        var lastScale = this.view.getScale();
        var step = scale / lastScale - 1;
        var translate = new EzPoint(-(centerPoint.x * step / scale), -(centerPoint.y * step / scale));
        this.view.translate(translate);
        this.view.setScale(scale);
        this.view.markAllDirty();
    };
    /**
     * execute layout for all layout root nodes
     */
    EzDiagram.prototype.executeLayouts = function () {
        var _this = this;
        var roots = this.model.getLayoutRoots();
        roots.forEach(function (root) {
            var layout = root.layout;
            var layoutInst = _this.layoutmanager.get(layout);
            if (!layoutInst) {
                {
                    console.warn("layout " + layout + " is not found");
                }
                return;
            }
            layoutInst.execute(root);
        });
    };
    /**
     * get center point of current view
     * @returns
     */
    EzDiagram.prototype.getViewCenter = function () {
        var vSize = this.view.size;
        return new EzPoint(vSize.left + vSize.width / 2, vSize.top + vSize.height / 2);
    };
    /**
     * move the diagram with the given offset
     * @param offset
     */
    EzDiagram.prototype.translate = function (offset) {
        this.view.translate(offset);
        this.view.markAllDirty();
    };
    EzDiagram.prototype.setTranslate = function (translate) {
        this.view.setTranslate(translate);
        this.view.markAllDirty();
    };
    /**
     * add a vertex to model
     * @param vertex
     */
    EzDiagram.prototype.addVertex = function (vertex) {
        this.model.addVertex(vertex);
        this.view.render();
    };
    /**
     * add a edge to model
     * @param edge
     * @param parent - default parent is model root
     */
    EzDiagram.prototype.addEdge = function (edge) {
        this.model.addEdge(edge);
        this.view.render();
    };
    /**
     * clear all selected diagram elements
     */
    EzDiagram.prototype.clearSelection = function () {
        var selectPlugin = this.pluginManager.get(BUILTIN_PLGUIN.SELECT);
        selectPlugin.changeSelection([]);
    };
    /**
     * move the given diagram node to front
     * @param node
     */
    EzDiagram.prototype.toFront = function (node) {
        this.view.changeOrder(node, this.model.nodes.length - 1);
    };
    /**
     * move the given diagram node to bottom
     * @param node
     */
    EzDiagram.prototype.toBottom = function (node) {
        this.view.changeOrder(node, 0);
    };
    /**
     *
     * @param vertex
     * @param style
     */
    EzDiagram.prototype.setVertexStyle = function (vertex, style) {
        Object.assign(vertex.style, style);
        var state = this.view.stateMapping.get(vertex.id);
        state.updateWork = STATE_WORK_TYPE.UPDATE_FROM_MODEL;
    };
    /**
     *
     * @param edge
     * @param style
     */
    EzDiagram.prototype.setEdgeStyle = function (edge, style) {
        Object.assign(edge.style, style);
        var state = this.view.stateMapping.get(edge.id);
        state.updateWork = STATE_WORK_TYPE.UPDATE_FROM_MODEL;
    };
    EzDiagram.prototype.registerShape = function (shapeName, shape) {
        this.view.shapeManager.registerShape(shapeName, shape);
    };
    EzDiagram.prototype.destroy = function () {
        // TODO do some clear work
        this.pluginManager.callHook('onDestroy');
    };
    return EzDiagram;
}());

export { BUILTIN_ACTIONS, BUILTIN_MARKER, BUILTIN_SHAPE, COLOR_TRANSPARENT_WHITE, COLOR_WHITE, EZ_DIAGGRAM_DEFAULT_CONFIG, EZ_VIEW_EDGE_CLASS, EZ_VIEW_VERTEX_CLASS, EditableVertexShape, EzConstraint, EzDiagram, EzDiagramActions, EzDiagramView, EzDirection, EzEdge, EzEdgeShape, EzElement, EzLineShape, math as EzMath, EzModel, EzPoint, EzRectangle, EzRectangleShape, EzShape, EzShapeManager, EzVertex, EzVertexShape, HTML_NAME_SPACE, index as Layout, index$1 as Plugin, SVG_NAME_SPACE, style as Style, getBoundingBoxFromPoints, getCenterPoint, getDotProduct, getIncludedAngleOfTwoVector, getNormOfVector, getRotatedPoint, getScalarMulOfVector, getUnitVector, getVector, getVectorEndPoint, getVectorProjection, isPointInsideRect, toRadians, toRectPoints };
//# sourceMappingURL=ez-diagram-esm.js.map
