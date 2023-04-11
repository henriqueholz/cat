import { fireEvent, renderWithProviders, screen } from '../../utils/test-utils'
import { CatList } from './CatList'
import { catList, filteredSingleCatList } from '../mocks/cats'
import { setupStore } from '../../app/store'
import { updateFilteredList } from './catSlice'

describe('CatList', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CatList />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render sort tab correctly', async () => {
    const store = setupStore()
    store.dispatch(updateFilteredList(catList))
    renderWithProviders(<CatList />, { store })
    const sortSelect = screen.getByTestId('sort-select')
    expect(sortSelect).toBeInTheDocument()

    const catCard = screen.getByTestId('cat-card-babys')
    expect(catCard).toBeInTheDocument()
  })

  it('should render filter tab correctly', async () => {
    const store = setupStore()
    store.dispatch(updateFilteredList(filteredSingleCatList))
    renderWithProviders(<CatList />, { store })
    const filterTab = screen.getByTestId('filter-tab')
    expect(filterTab).toBeInTheDocument()

    fireEvent.click(filterTab)

    renderWithProviders(<CatList />, { store })

    const nameField = screen.getByTestId('name-field')
    expect(nameField).toBeInTheDocument()

    const catCard = screen.getAllByTestId('cat-card-babys')
    expect(catCard[0]).toBeInTheDocument()
  })
})
