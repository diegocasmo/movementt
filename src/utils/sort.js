export const sortAlphabetically = (list, attr = 'name') => {
  return [...list].sort((a, z) => {
    const x = (a[attr] || '').toLowerCase()
    const y = (z[attr] || '').toLowerCase()

    return x.localeCompare(y)
  })
}

export const sortByAscPosition = (list, attr = 'position') => {
  return [...list].sort((a, z) => a[attr] - z[attr])
}

export const sortByDescPosition = (list, attr = 'position') => {
  return [...list].sort((a, z) => z[attr] - a[attr])
}
