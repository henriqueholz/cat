import { RootState } from '../../app/store'
import { filter } from '../mocks/filter'
import reducer, {
  FilterType,
  initialState,
  selectFilter,
  updateFilter
} from './filterSlice'

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState)
  })

  it('should update the current filter parameters', () => {
    expect(reducer(initialState, updateFilter(filter))).toEqual({
      data: filter
    })
  })
})

describe('selectors', () => {
  it('should return filter parameters', () => {
    const previousState: FilterType = {
      data: filter
    }
    expect(selectFilter({ filterSlice: previousState } as RootState)).toEqual(
      filter
    )
  })
})
