
export function orDash(val) {
  return (val) ? val : '-'
}

export function orZero(val) {
  return (val) ? val : '0'
}

export default [
  orDash, orZero
]
