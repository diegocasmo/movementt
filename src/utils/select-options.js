export const buildSelectOptions = (labels) =>
  Object.entries(labels).map(([value, label]) => ({ label, value }))
