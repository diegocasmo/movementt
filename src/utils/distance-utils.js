export const getFormattedDistance = (distanceInMeters) => {
  if (!distanceInMeters) return 'None'

  return DISTANCE_OPTS.find((opt) => opt.valueInMeters === distanceInMeters)
    .label
}

export const DISTANCE_OPTS = [
  { label: 'None', valueInMeters: 0 },
  { label: '200m', valueInMeters: 200 },
  { label: '400m', valueInMeters: 400 },
  { label: '600m', valueInMeters: 600 },
  { label: '800m', valueInMeters: 800 },
  { label: '1 Km', valueInMeters: 1000 },
  { label: '1.2 Km', valueInMeters: 1200 },
  { label: '1.4 Km', valueInMeters: 1400 },
  { label: '1.6 Km', valueInMeters: 1600 },
  { label: '1.8 Km', valueInMeters: 1800 },
  { label: '2 Km', valueInMeters: 2000 },
  { label: '2.2 Km', valueInMeters: 2200 },
  { label: '2.4 Km', valueInMeters: 2400 },
  { label: '2.6 Km', valueInMeters: 2600 },
  { label: '2.8 Km', valueInMeters: 2800 },
  { label: '3 Km', valueInMeters: 3000 },
  { label: '3.2 Km', valueInMeters: 3200 },
  { label: '3.4 Km', valueInMeters: 3400 },
  { label: '3.6 Km', valueInMeters: 3600 },
  { label: '3.8 Km', valueInMeters: 3800 },
  { label: '4 Km', valueInMeters: 4000 },
  { label: '4.2 Km', valueInMeters: 4200 },
  { label: '4.4 Km', valueInMeters: 4400 },
  { label: '4.6 Km', valueInMeters: 4600 },
  { label: '4.8 Km', valueInMeters: 4800 },
  { label: '5 Km', valueInMeters: 5000 },
  { label: '6 Km', valueInMeters: 6000 },
  { label: '7 Km', valueInMeters: 7000 },
  { label: '8 Km', valueInMeters: 8000 },
  { label: '9 Km', valueInMeters: 9000 },
  { label: '10 Km', valueInMeters: 10000 },
]
