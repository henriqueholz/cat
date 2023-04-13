import { renderHook } from "@testing-library/react"
import { useAppTheme } from "./useAppTheme"

describe('useAppTheme hook', () => {
  it('checking default state', () => {
      const { result } = renderHook(useAppTheme)

      expect(result.current[0]).toBeInstanceOf(Object)
      expect(result.current[1]).toBeInstanceOf(Function)
  })
})