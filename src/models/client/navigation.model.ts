interface NavigationItemBase {
  url: string;
  active: boolean;
}

interface NavigationItemText extends NavigationItemBase {
  type: "text";
  text: string;
}

interface NavigationItemIcon extends NavigationItemBase {
  type: "icon";
  icon: "shopping-cart" | "user";
}

export type NavigationItem = NavigationItemText | NavigationItemIcon;

export type NavigationModel = (
  | Omit<NavigationItemText, "active">
  | Omit<NavigationItemIcon, "active">
)[];
