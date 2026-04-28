import { MainHeader } from "@/components/layouts/main-header"
import { TypesLayout } from "@/types"

const Layout = ({children}:TypesLayout) => {
  return (
    <>
    <MainHeader/>
    {children}
    </>
  )
}

export default Layout