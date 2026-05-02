import { Body } from "./Body";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full flex-col py-6 bg-background w-20 lg:w-64 border-r-2 z-50 transition-all duration-300">
      <Header />
      <Body />
      <Footer />
    </aside>
  );
};
