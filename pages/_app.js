import React from "react"
import { ThemeProvider } from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import ColorModeProvider, {
  ColorModeContext
} from "../src/components/Menu/components/ColorMode"
import RegisterVideo from "../src/components/RegisterVideo"

const theme = {
  light: {
    backgroundBase: "#f9f9f9",
    backgroundLevel1: "#ffffff",
    backgroundLevel2: "#f0f0f0",
    borderBase: "#e5e5e5",
    textColorBase: "#222222",
    bg:"https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTg3fHx0ZWNofGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  dark: {
    backgroundBase: "#181818",
    backgroundLevel1: "#202020",
    backgroundLevel2: "#313131",
    borderBase: "#383838",
    textColorBase: "#FFFFFF",
    bg:"https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzV8fHRlY2h8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  }
}

function ProviderWarapper(props) {
  return (
    <ColorModeProvider initialMode={"dark"}>{props.children}</ColorModeProvider>
  )
}

function Root({ Component, pageProps }) {
  const contexto = React.useContext(ColorModeContext)
  return (
    <ThemeProvider theme={theme[contexto.mode]}>
      <CSSReset />
      <Component {...pageProps} />
      <RegisterVideo />
    </ThemeProvider>
  )
}

export default function _App(props) {
  return (
    <ProviderWarapper>
      <Root {...props} />
    </ProviderWarapper>
  )
}
