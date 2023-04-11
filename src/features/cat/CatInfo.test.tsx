import userEvent from '@testing-library/user-event'
import { setupStore } from '../../app/store'
import { fireEvent, renderWithProviders, screen } from '../../utils/test-utils'
import { catList } from '../mocks/cats'
import { CatInfo } from './CatInfo'
import { updateCatList } from './catSlice'

describe('Cat info', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CatInfo />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should be able to upload and remove a private cat image', async () => {
    const store = setupStore()
    store.dispatch(updateCatList(catList))
    renderWithProviders(<CatInfo />, { store })

    const uploadImageInput = screen.getByTestId('upload-image-button')
    expect(uploadImageInput).toBeInTheDocument()

    const file = new File(['test'], 'test.png', { type: 'image/png' })

    await userEvent.upload(uploadImageInput, file)

    const catCard = screen.getByTestId('cat-card-babys')
    expect(catCard).toBeInTheDocument()

    expect(localStorage.getItem(`cat:babys`)).toBeTruthy()
    renderWithProviders(<CatInfo />)

    const removeImageInput = screen.getByTestId('remove-image-button')
    expect(removeImageInput).toBeInTheDocument()

    fireEvent.click(removeImageInput)
    expect(localStorage.getItem(`cat:babys`)).toBeFalsy()
  })

  it('should change favorite and unfavorite icon correctly', () => {
    const store = setupStore()
    store.dispatch(updateCatList(catList))
    renderWithProviders(<CatInfo />, { store })

    const favoriteButton = screen.getByTestId('favorite-button-babys')
    expect(favoriteButton).toBeInTheDocument()

    fireEvent.click(favoriteButton)

    const unfavoriteButton = screen.getByTestId('unfavorite-button-babys')
    expect(unfavoriteButton).toBeInTheDocument()
  })
})
