"use client";

import { NavItem } from "./NavItem";
import { NavSection } from "./NavSection";

export const Navbar = () => {
  return (
    <div
      className="flex-col mt-6 mx-4 w-full sm:max-w-[200px] hidden md:flex"
      id="navbar"
    >
      <NavSection name="OVERVIEW">
        <NavItem
          key="get-started"
          href="/get-started"
          icon="Bolt"
          name="Get Started"
        />
        <NavItem
          key="dashboard"
          href="/dashboard"
          icon="Dashboard"
          name="Dashboard"
        />
      </NavSection>

      <NavSection name="AUTHENTICATION">
        <NavItem
          key="applications"
          href="/client"
          icon="Application"
          name="Applications"
        />
        <NavItem
          key="credentials"
          href="/credentials"
          icon="Credentials"
          name="Credentials"
        />
        <NavItem
          key="sessions"
          href="/sessions"
          icon="Session"
          name="Sessions"
        />

        <NavItem
          key="scopes"
          href="/scopes"
          icon="Scope"
          name="Scopes"
        />
      </NavSection>

      <NavSection name="USER">
        <NavItem key="users" href="/users" icon="Users" name="Users" />
        <NavItem key="roles" href="/roles" icon="Role" name="Roles" />
        <NavItem
          key="permissions"
          href="/permissions"
          icon="Permission"
          name="Permissions"
        />
      </NavSection>

      <NavSection name="CONFIGURATION">
        <NavItem key="plugins" href="/plugins" icon="Plugin" name="Plugins" />
        <NavItem key="logs" href="/logs" icon="Log" name="Audit Logs" />
        <NavItem
          key="settings"
          href="/settings"
          icon="Setting"
          name="Settings"
        />
      </NavSection>
    </div>
  );
};
