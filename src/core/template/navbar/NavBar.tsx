import { Navbar } from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";

export interface NavBarLink {
  title: string;
  route: string;
}
export interface NavbarProps {
  links: NavBarLink[];
}

export class AppNavBar extends React.Component<NavbarProps> {
  render() {
    return (
      <Navbar className="mx-auto">
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          {this.props.links.map((link) => (
            <li
              key={link.title}
              className="flex items-center gap-x-2 p-1 text-gray-900 font-medium"
            >
              <NavLink
                to={link.route}
                className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </Navbar>
    );
  }
}
