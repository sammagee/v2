export function exportedDeclaration(node) {
  return node.type.startsWith('Export') && node.declaration
    ? node.declaration
    : node
}

export function declaredIds(declaration) {
  const ids = declaration.declarations?.map((item) => item.id) ?? [
    declaration.id,
  ]
  return ids.filter(Boolean)
}
