import { fireEvent, renderWithProviders, screen } from '../utils/test-utils'
import { Header } from './Header'

describe('Header', () => {
  it('should render correctly using dark theme', () => {
    const { asFragment } = renderWithProviders(
      <Header
        toggle={() => {
          return
        }}
        theme={'dark'}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly using light theme', () => {
    const { asFragment } = renderWithProviders(
      <Header
        toggle={() => {
          return
        }}
        theme={'light'}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correct button according to theme', () => {
    renderWithProviders(
      <Header
        toggle={() => {
          return
        }}
        theme={'dark'}
      />
    )

    const darkThemeIcon = screen.getByTestId('dark-theme-icon')
    expect(darkThemeIcon).toBeInTheDocument()

    const changeThemeButton = screen.getByTestId('change-theme-button')
    expect(changeThemeButton).toBeInTheDocument()

    fireEvent.click(changeThemeButton)

    renderWithProviders(
      <Header
        toggle={() => {
          return
        }}
        theme={'light'}
      />
    )

    const lightThemeIcon = screen.getByTestId('light-theme-icon')
    expect(lightThemeIcon).toBeInTheDocument()
  })
})
