'use strict';

var flatmap = require('flatmap'),
    Index = require('unist-util-index');

var url = require('url'),
    path = require('path');


module.exports = function (opts) {
  opts = opts || {};
  opts.id = (opts.id
             ? (Array.isArray(opts.id)
                ? opts.id.map(String)
                : [String(opts.id)])
             : []);

  return function (ast) {
    var definitionsById = Index(ast, 'definition', function (definition) {
      return definition.identifier.toLowerCase();
    });
    var definitionsByLink = Index(ast, 'definition', 'url');
    var newDefinitions = [];
    var hostCount = Object.create(null);

    (function postorder (node) {
      if (node.children) {
        node.children = flatmap(node.children, postorder);
      }
      return forNode.apply(null, arguments) || node;
    }(ast));

    [].push.apply(ast.children, newDefinitions);

    function forNode (node) {
      if (node.type == 'definition' || node.type == 'heading') {
        var nodes = newDefinitions.concat(node);
        newDefinitions.length = 0;
        return nodes;
      }

      if (node.type !== 'link' && node.type !== 'image') return;

      node.type += 'Reference';
      node.referenceType = 'full';
      node.identifier = identifier(node.url, node.title);

      delete node.url;
      delete node.title;
    }

    function identifier (link, title) {
      var identifier;

      var found = definitionsByLink.get(link).some(function (def) {
        if (def.title == title) {
          identifier = def.identifier;
          return true;
        }
      });

      if (found) {
        return identifier;
      }

      if (!(identifier = opts.id.shift())) {
        var host = urlHost(link);
        hostCount[host] |= 0;
        do {
          identifier = host + '-' + ++hostCount[host];
        } while (definitionsById.get(identifier).length);
      }

      var newDefinition = {
        type: 'definition',
        identifier: identifier,
        title: title,
        url: link
      };

      newDefinitions.push(newDefinition);
      definitionsById.add(newDefinition);
      definitionsByLink.add(newDefinition);

      return identifier;
    }
  };
};


function urlHost (link) {
  return path.parse(url.parse(link).host).name;
}
