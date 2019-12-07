/* eslint-env jest */

import { sum } from './'

test('1 + 2 = 3', () => {
  expect(sum(1, 2)).toBe(3)
})
