import { itemsNavigation } from "@/config";
import { Item } from "./Item";

export const Body = () => {
  const items = itemsNavigation;
  return (
    <nav className="flex-1 px-3 lg:px-4 space-y-1">
      {items.map((item, index) => (
        <Item key={index} item={item} index={index} />
      ))}
    </nav>
  );
};
