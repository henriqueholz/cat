import { RootState } from '../../app/store'
import {
  catListWithSortLifeSpan,
  catListWithSortName,
  catListWithSortOrigin,
  catListWithSortWeight
} from '../mocks/catSortingLists'
import {
  catList,
  favoriteList,
  catListWithFavorite,
  favoriteCat,
  catWithNewImage,
  catListWithNewImage,
  cat,
  catListWithFavoriteFalse,
  filteredSingleCatList
} from '../mocks/cats'
import reducer, {
  updateCatList,
  CatState,
  updateFilteredList,
  updateFavorite,
  updateCat,
  selectCat,
  selectCatList,
  selectFavorites,
  selectFilteredList,
  initialFilterParams,
  updateSort,
  selectSort,
  updateFilter
} from './catSlice'

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      fullList: [],
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    })
  })

  it('should update the full cat list', () => {
    const previousState: CatState = {
      fullList: [],
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }

    expect(reducer(previousState, updateCatList(catList))).toEqual({
      fullList: catList,
      favoriteList: [],
      filteredList: catList,
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    })
  })

  it('should update the filtered cat list', () => {
    const previousState: CatState = {
      fullList: [],
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }

    expect(reducer(previousState, updateFilteredList(catList))).toEqual({
      fullList: [],
      favoriteList: [],
      filteredList: catList,
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    })
  })

  it('should update the three lists with the updated cat', () => {
    const previousState: CatState = {
      fullList: catList,
      favoriteList: [],
      filteredList: catList,
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }

    expect(reducer(previousState, updateFavorite(cat))).toEqual({
      fullList: catListWithFavorite,
      favoriteList: favoriteList,
      filteredList: catListWithFavorite,
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    })
  })

  it('should update the cat inside the cat full list', () => {
    const previousState: CatState = {
      fullList: catList,
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }

    expect(reducer(previousState, updateCat(catWithNewImage))).toEqual({
      fullList: catListWithNewImage,
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    })
  })

  it('should remove a cat from the favorite list, and update the other lists', () => {
    const previousState: CatState = {
      fullList: catListWithFavorite,
      favoriteList: favoriteList,
      filteredList: catListWithFavorite,
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }

    expect(reducer(previousState, updateFavorite(favoriteCat))).toEqual({
      fullList: catListWithFavoriteFalse,
      favoriteList: [],
      filteredList: catListWithFavoriteFalse,
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    })
  })
})

describe('sorting', () => {
  it('should return full cat list sorted by origin', () => {
    const previousState: CatState = {
      fullList: catList,
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }

    expect(reducer(previousState, updateSort({ data: 'origin' }))).toEqual({
      ...previousState,
      sortParam: { data: 'origin' },
      filteredList: catListWithSortOrigin
    })
  })

  it('should return full cat list sorted by lifespan', () => {
    const previousState: CatState = {
      fullList: catList,
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }

    expect(reducer(previousState, updateSort({ data: 'lifespan' }))).toEqual({
      ...previousState,
      sortParam: { data: 'lifespan' },
      filteredList: catListWithSortLifeSpan
    })
  })

  it('should return full cat list sorted by name', () => {
    const previousState: CatState = {
      fullList: catList,
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'lifespan' },
      filterParams: initialFilterParams
    }

    expect(reducer(previousState, updateSort({ data: 'name' }))).toEqual({
      ...previousState,
      sortParam: { data: 'name' },
      filteredList: catListWithSortName
    })
  })

  it('should return full cat list sorted by weight', () => {
    const previousState: CatState = {
      fullList: catList,
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'lifespan' },
      filterParams: initialFilterParams
    }

    expect(reducer(previousState, updateSort({ data: 'weight' }))).toEqual({
      ...previousState,
      sortParam: { data: 'weight' },
      filteredList: catListWithSortWeight
    })
  })
})

describe('filtering', () => {
  it('should return full cat list filtered by name, lifespan and weight', () => {
    const previousState: CatState = {
      fullList: catListWithFavorite,
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }

    const newFilterParams = {
      name: 'Baby',
      origin: 'Egy',
      weight: 7,
      lifespan: 14,
      isFavorite: true
    }

    expect(reducer(previousState, updateFilter(newFilterParams))).toEqual({
      ...previousState,
      filterParams: newFilterParams,
      filteredList: filteredSingleCatList
    })
  })
})

describe('selectors', () => {
  it('should return full cat list', () => {
    const previousState: CatState = {
      fullList: catList,
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }
    expect(selectCatList({ catSlice: previousState } as RootState)).toEqual(
      catList
    )
  })

  it('should return cat by id', () => {
    const previousState: CatState = {
      fullList: catListWithFavoriteFalse,
      favoriteList: [],
      filteredList: [],
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }
    expect(selectCat({ catSlice: previousState } as RootState, cat.id)).toEqual(
      cat
    )
  })

  it('should return favorite cat list', () => {
    const previousState: CatState = {
      fullList: [],
      favoriteList: favoriteList,
      filteredList: [],
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }
    expect(selectFavorites({ catSlice: previousState } as RootState)).toEqual(
      favoriteList
    )
  })

  it('should return cat filtered list', () => {
    const previousState: CatState = {
      fullList: [],
      favoriteList: [],
      filteredList: catList,
      sortParam: { data: 'name' },
      filterParams: initialFilterParams
    }
    expect(
      selectFilteredList({ catSlice: previousState } as RootState)
    ).toEqual(catList)
  })

  it('should return filter parameters', () => {
    const previousState: CatState = {
      fullList: [],
      favoriteList: [],
      filteredList: catList,
      sortParam: { data: 'weight' },
      filterParams: initialFilterParams
    }

    expect(selectSort({ catSlice: previousState } as RootState)).toEqual({
      data: 'weight'
    })
  })
})
