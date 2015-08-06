'use strict';

var flatmap = require('flatmap'),
    mdastDefinitions = require('mdast-util-definitions');

var url = require('url'),
    path = require('path');


module.exports = function () {
  return function (ast) {
    var define = mdastDefinitions(ast);
    var definitions = [];
    var hostCount = {};

    (function postorder (node) {
      if (node.children) {
        node.children = flatmap(node.children, postorder);
      }
      return forNode.apply(null, arguments) || node;
    }(ast));

    [].push.apply(ast.children, definitions);

    function forNode (node) {
      if (node.type == 'definition' || node.type == 'heading') {
        var nodes = definitions.concat(node);
        definitions.length = 0;
        return nodes;
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
      var identifier;

      var defined = definitions.some(function (def) {
        if (def.link == link && def.title == title) {
          identifier = def.identifier;
          return true;
        }
      });

      if (defined) {
        return identifier;
      }

      var host = urlHost(link);
      hostCount[host] |= 0;
      while (define(identifier = host + '-' + ++hostCount[host]));

      definitions.push({
        type: 'definition',
        identifier: identifier,
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
