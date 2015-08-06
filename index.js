'use strict';

var url = require('url'),
    path = require('path');


module.exports = function () {
  return function (ast) {
    var definitions = [];

    (function postorder (node) {
      if (node.children) {
        node.children.forEach(postorder);
      }
      forNode.apply(null, arguments);
    }(ast));

    function forNode (node, index, siblings) {
      if (node.type == 'definition' || node.type == 'heading') {
        [].splice.apply(siblings, [index, 0].concat(definitions));
        definitions.length = 0;
        return;
      }

      var linkKey = { link: 'href', image: 'src' }[node.type];
      if (!linkKey) return;

      node.type += 'Reference';
      node.referenceType = 'full';
      node.identifier = identifier(node[linkKey], node.title);

      delete node[linkKey];
      delete node.title;
    }

    function identifier (link, title) {
      var identifier,
          hostCount = 1,
          host = urlHost(link);

      var defined = definitions.some(function (def) {
        if (def.link == link && def.title == title) {
          identifier = def.identifier;
          return true;
        }
        hostCount += urlHost(def.link) == host;
      });

      if (defined) {
        return identifier;
      }

      definitions.push({
        type: 'definition',
        identifier: identifier = host + '-' + hostCount,
        title: title,
        link: link
      });

      return identifier;
    }
  };
};


function urlHost (link) {
  return path.parse(url.parse(link).host).name;
}
