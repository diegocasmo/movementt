import { buildSelectOptions } from '_utils/select-options'

const UNIT_OF_MEASUREMENT_METRIC = 'metric'
const UNIT_OF_MEASUREMENT_IMPERIAL = 'imperial'

export const UNITS_OF_MEASUREMENT = [
  UNIT_OF_MEASUREMENT_METRIC,
  UNIT_OF_MEASUREMENT_IMPERIAL,
]

const WEIGHT_UNIT_TYPE_LABELS = {
  [UNIT_OF_MEASUREMENT_METRIC]: 'Kg',
  [UNIT_OF_MEASUREMENT_IMPERIAL]: 'lb',
}

const DISTANCE_UNIT_TYPE_LABELS = {
  [UNIT_OF_MEASUREMENT_METRIC]: 'Km',
  [UNIT_OF_MEASUREMENT_IMPERIAL]: 'mi',
}

export const WEIGHT_UNIT_TYPE_OPTS = buildSelectOptions(WEIGHT_UNIT_TYPE_LABELS)
export const DISTANCE_UNIT_TYPE_OPTS = buildSelectOptions(
  DISTANCE_UNIT_TYPE_LABELS
)

export const getWeightUnitTypeLabel = (unitType) =>
  WEIGHT_UNIT_TYPE_LABELS[unitType]

export const getDistanceUnitTypeLabel = (unitType) =>
  DISTANCE_UNIT_TYPE_LABELS[unitType]
