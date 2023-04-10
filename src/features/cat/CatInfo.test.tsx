import { renderWithProviders } from '../../utils/test-utils'
import { CatInfo } from './CatInfo'

describe('CatInfo', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CatInfo />)
    expect(asFragment()).toMatchSnapshot()
  })
})
