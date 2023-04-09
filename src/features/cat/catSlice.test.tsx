import { RootState } from '../../app/store'
import {
  catList,
  favoriteList,
  catListWithFavorite,
  favoriteCat,
  catWithNewImage,
  catListWithNewImage,
  cat,
  catListWithFavoriteFalse
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
  selectFilteredList
} from './catSlice'

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      fullList: [],
      favoriteList: [],
      filteredList: []
    })
  })

  it('should update the full cat list', () => {
    const previousState: CatState = {
      fullList: [],
      favoriteList: [],
      filteredList: []
    }

    expect(reducer(previousState, updateCatList(catList))).toEqual({
      fullList: catList,
      favoriteList: [],
      filteredList: []
    })
  })

  it('should update the filtered cat list', () => {
    const previousState: CatState = {
      fullList: [],
      favoriteList: [],
      filteredList: []
    }

    expect(reducer(previousState, updateFilteredList(catList))).toEqual({
      fullList: [],
      favoriteList: [],
      filteredList: catList
    })
  })

  it('should update the three lists with the updated cat', () => {
    const previousState: CatState = {
      fullList: catList,
      favoriteList: [],
      filteredList: catList
    }

    expect(reducer(previousState, updateFavorite(cat))).toEqual({
      fullList: catListWithFavorite,
      favoriteList: favoriteList,
      filteredList: catListWithFavorite
    })
  })

  it('should update the cat inside the cat full list', () => {
    const previousState: CatState = {
      fullList: catList,
      favoriteList: [],
      filteredList: []
    }

    expect(reducer(previousState, updateCat(catWithNewImage))).toEqual({
      fullList: catListWithNewImage,
      favoriteList: [],
      filteredList: []
    })
  })

  it('should remove a cat from the favorite list, and update the other lists', () => {
    const previousState: CatState = {
      fullList: catListWithFavorite,
      favoriteList: favoriteList,
      filteredList: catListWithFavorite
    }

    expect(reducer(previousState, updateFavorite(favoriteCat))).toEqual({
      fullList: catListWithFavoriteFalse,
      favoriteList: [],
      filteredList: catListWithFavoriteFalse
    })
  })
})

describe('selectors', () => {
  it('should return full cat list', () => {
    const previousState: CatState = {
      fullList: catList,
      favoriteList: [],
      filteredList: []
    }
    expect(selectCatList({ catListSlice: previousState } as RootState)).toEqual(
      catList
    )
  })

  it('should return cat by id', () => {
    const previousState: CatState = {
      fullList: catListWithFavoriteFalse,
      favoriteList: [],
      filteredList: []
    }
    expect(
      selectCat({ catListSlice: previousState } as RootState, cat.id)
    ).toEqual(cat)
  })

  it('should return favorite cat list', () => {
    const previousState: CatState = {
      fullList: [],
      favoriteList: favoriteList,
      filteredList: []
    }
    expect(
      selectFavorites({ catListSlice: previousState } as RootState)
    ).toEqual(favoriteList)
  })

  it('should return cat filtered list', () => {
    const previousState: CatState = {
      fullList: [],
      favoriteList: [],
      filteredList: catList
    }
    expect(
      selectFilteredList({ catListSlice: previousState } as RootState)
    ).toEqual(catList)
  })
})
