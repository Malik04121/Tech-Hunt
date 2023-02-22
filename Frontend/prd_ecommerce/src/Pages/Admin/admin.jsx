import { Box } from "@chakra-ui/react"
import { MenuDetail } from "./detailPage"
import { SideNavbar } from "./sideNavbar"
import { TopNavbar } from "./topNavbar"


function Admin(){

return(
    <Box bg="silver">
      <TopNavbar/>
      <SideNavbar/>
      <MenuDetail/>
    </Box>
)

}
export {Admin}