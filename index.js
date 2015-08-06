'use strict';

var flatmap = require('flatmap'),
    visit = require('unist-util-visit');

var url = require('url'),
    path = require('path');


module.exports = function () {
  return function (ast) {
    var definitions = Definitions(ast);
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

      var found = definitions.byLink(link).some(function (def) {
        if (def.title == title) {
          identifier = def.identifier;
          return true;
        }
      });

      if (found) {
        return identifier;
      }

      var host = urlHost(link);
      hostCount[host] |= 0;
      while (definitions.byId(identifier = host + '-' + ++hostCount[host]).length);

      var newDefinition = {
        type: 'definition',
        identifier: identifier,
        title: title,
        link: link
      };

      newDefinitions.push(newDefinition);
      definitions.add(newDefinition);

      return identifier;
    }
  };
};


function Definitions (ast) {
  var definitionsById = Object.create(null),
      definitionsByLink = Object.create(null);

  var assocPut = function (collection, key, value) {
    collection[key] = collection[key] || [];
    collection[key].push(value);
  };

  var add = function (definition) {
    assocPut(definitionsById, definition.identifier.toLowerCase(), definition);
    assocPut(definitionsByLink, definition.link, definition);
  };

  // If there are several matching definitions, the first one takes precedence.
  visit(ast, 'definition', add, true);

  return {
    add: add,
    byId: function (id) { return definitionsById[id.toLowerCase()] || [] },
    byLink: function (link) { return definitionsByLink[link] || [] }
  };
}


function urlHost (link) {
  return path.parse(url.parse(link).host).name;
}
