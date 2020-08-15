export const search = (arr = [], query = '') => {
  const needle = query.trim().toLowerCase()
  return arr.filter((x) => fuzzysearch(x.name.toLowerCase(), needle))
}

// Source: https://github.com/bevacqua/fuzzysearch
const fuzzysearch = (haystack, needle) => {
  var hlen = haystack.length
  var nlen = needle.length
  if (nlen > hlen) {
    return false
  }
  if (nlen === hlen) {
    return needle === haystack
  }
  outer: for (var i = 0, j = 0; i < nlen; i++) {
    var nch = needle.charCodeAt(i)
    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer
      }
    }
    return false
  }
  return true
}
