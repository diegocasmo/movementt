export const sortAlphabetically = (list, attr = 'name') => {
  return [...list].sort((a, z) => {
    const x = (a[attr] || '').toLowerCase()
    const y = (z[attr] || '').toLowerCase()

    return x.localeCompare(y)
  })
}
