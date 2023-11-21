import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { For } from "@dev-amr/react-sugartax"
import { Link } from "react-router-dom"

type NavDropdownProps = {
  name: string
  links: { name: string; href: string }[]
}

const NavDropdown = ({ name, links }: NavDropdownProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-[#333] text-slate-200 transition-colors font-bold text-lg hover:text-white font-arabic">
            {name}
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className="bg-[#333]/70 backdrop-filter backdrop-blur-md p-4 border-0 text-slate-200 outline-none font-arabic
          "
          >
            <ul className="flex flex-col w-[250px]">
              <For each={links}>
                {(link, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-start border-b border-solid border-slate-200 px-4"
                  >
                    <Link
                      to={link.href}
                      className="px-5 py-4"
                    >
                      {link.name}
                    </Link>
                  </li>
                )}
              </For>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
export default NavDropdown
