function getNodeText(nodes: any) {
  let text = ''
  for (const el of nodes.props?.children ?? []) {
    if (typeof el === 'string') {
      text += el
    }
    text += getNodeText(el)
  }
  return text
}

type SectionProps = {
  id: string
  title: string
  children: {
    id: string
    title: string
  }[]
}

export function collectHeadings(nodes: NodeListOf<any>) {
  const sections: SectionProps[] = []
  nodes.forEach((node) => {
    if (node.type === 'h2' || node.type === 'h3') {
      const title = getNodeText(node)
      if (title) {
        if (node.type === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`'
            )
          }
          sections[sections.length - 1].children.push({
            ...node.props,
            title,
          })
        } else {
          sections.push({ ...node.props, title, children: [] })
        }
      }
    }
    sections.push(...collectHeadings(node.children ?? []))
  })

  return sections
}
