import { renderWithProviders, screen } from '../../utils/test-utils'
import { CatList } from './CatList'
import { catList } from '../mocks/cats'
import { setupStore } from '../../app/store'
import { updateFilteredList } from './catSlice'

describe('CatList', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CatList />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should handle sorting', async () => {
    const store = setupStore()
    store.dispatch(updateFilteredList(catList))
    renderWithProviders(<CatList />, { store })
    const sortSelect = screen.getByTestId('sort-select')
    expect(sortSelect).toBeInTheDocument()

    expect(screen.getByTestId('cat-card-aege')).toBeInTheDocument()
  })
})
