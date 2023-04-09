import { RootState } from '../../app/store'
import reducer, {
  SortType,
  initialState,
  selectSort,
  updateSort
} from './sortSlice'

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState)
  })

  it('should update the current sort parameter', () => {
    const newState: SortType = {
      data: 'Origin'
    }

    expect(reducer(initialState, updateSort(newState))).toEqual({
      data: { data: 'Origin' }
    })
  })
})

describe('selectors', () => {
  it('should return filter parameters', () => {
    expect(selectSort({ sortSlice: initialState } as RootState)).toEqual({
      data: 'name'
    })
  })
})
