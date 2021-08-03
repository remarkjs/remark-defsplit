import {URL} from 'url'
import path from 'path'
import {Index} from 'unist-util-index'

export default function remarkDefsplit(options) {
  const id = (options || {}).id || []
  const ids = (typeof id === 'object' && 'length' in id ? id : [id]).map((d) =>
    String(d)
  )

  return transform

  function transform(tree) {
    const definitionsById = new Index('identifier', tree, 'definition')
    const definitionsByUrl = new Index('url', tree, 'definition')
    const definitions = []
    const hosts = Object.create(null)

    postorder(tree)

    tree.children.push(...definitions)

    function postorder(node) {
      let nodes

      if (node.children) {
        node.children = node.children.flatMap((node) => postorder(node))
      }

      if (node.type === 'definition' || node.type === 'heading') {
        nodes = definitions.concat(node)
        definitions.length = 0
        return nodes
      }

      if (node.type === 'link' || node.type === 'image') {
        node.type += 'Reference'
        node.referenceType = 'full'
        node.identifier = identifier(node.url, node.title)

        delete node.url
        delete node.title
      }

      return node
    }

    function identifier(link, title) {
      let identifier = null
      const found = definitionsByUrl.get(link).some((def) => {
        if (def.title === title) {
          identifier = def.identifier
          return true
        }

        return false
      })

      if (found) {
        return identifier
      }

      identifier = ids.shift()

      if (!identifier) {
        const host = urlHost(link)
        // `Math.trunc` doesn’t work.
        /* eslint-disable-next-line unicorn/prefer-math-trunc */
        hosts[host] |= 0

        do {
          identifier = (host ? host + '-' : '') + ++hosts[host]
        } while (definitionsById.get(identifier).length > 0)
      }

      const definition = {
        type: 'definition',
        identifier,
        title,
        url: link
      }

      definitions.push(definition)
      definitionsById.add(definition)
      definitionsByUrl.add(definition)

      return identifier
    }
  }
}

function urlHost(link) {
  let host

  try {
    host = new URL(link).host
  } catch {}

  return host ? path.parse(host).name : ''
}
