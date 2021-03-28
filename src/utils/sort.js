export const sortAlphabetically = (list, attr = 'name') => {
  return [...list].sort((a, z) => {
    const x = (a[attr] || '').toLowerCase()
    const y = (z[attr] || '').toLowerCase()

    return x.localeCompare(y)
  })
}

export const sortByPosition = (list, attr = 'position') => {
  return [...list].sort((a, z) => a[attr] - z[attr])
}
