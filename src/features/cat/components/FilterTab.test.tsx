import { setupStore } from '../../../app/store'
import {
  fireEvent,
  renderWithProviders,
  screen
} from '../../../utils/test-utils'
import { filter } from '../../mocks/filter'
import { updateFilter } from '../catSlice'
import { FilterTab } from './FilterTab'

describe('Filter tab', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<FilterTab />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should fill the inputs correctly, does not clear after filtering and clear after clicking on reset button', async () => {
    const store = setupStore()
    store.dispatch(updateFilter(filter))
    renderWithProviders(<FilterTab />, { store })

    const nameField = screen
      .getByTestId('name-field')
      .querySelector('input[id="name"]')
    expect(nameField).toBeInTheDocument()

    if (nameField !== null) {
      fireEvent.change(nameField, { target: { value: 'testing' } })
    }
    expect(nameField?.getAttribute('value')).toBe('testing')
    // After filtering the input is not cleared
    const filterButton = screen.getByTestId('filter-button')
    expect(filterButton).toBeInTheDocument()

    fireEvent.click(filterButton)
    expect(nameField?.getAttribute('value')).toBe('testing')

    const resetButton = screen.getByTestId('reset-button')
    expect(resetButton).toBeInTheDocument()

    // After reset the input is cleared
    fireEvent.click(resetButton)
    expect(nameField?.getAttribute('value')).toBe('')
  })
})
