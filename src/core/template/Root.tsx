import React from "react";
import { AppNavBar, NavBarLink } from "./navbar/NavBar.tsx";
import { Outlet } from "react-router-dom";

export class Root extends React.Component {
  private links: NavBarLink[] = [
    {
      title: "APOD",
      route: "/apod",
    },
    {
      title: "Mars Rover Photos",
      route: "/rover",
    },
  ];

  public render() {
    return (
      <section className="h-full">
        <AppNavBar links={this.links}></AppNavBar>
        <section className="max-w-screen-2xl mx-auto p-5 h-[calc(100%_-_66px)]">
          <Outlet></Outlet>
        </section>
      </section>
    );
  }
}
