import { BottonNavBar, Header, Sidebar } from "@/ui";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <!-- SideNavBar --> */}
      <Sidebar />
      {/* <!-- Main Content Area --> */}
      <div className="md:ml-20 lg:ml-64 min-h-screen transition-all duration-300 pb-22 md:pb-2">
        <div className="max-w-400 mx-auto">
          {/* Container for ultra-wide screens */}
          {/* <!-- TopNavBar --> */}
          <Header />
          {/* <!-- Dashboard Canvas --> */}
          <main className="p-4 md:p-8 space-y-6 md:space-y-8">
            {/* <!-- Header Section --> */}
            {children}
          </main>
        </div>
        {/* <!-- Mobile BottomNavBar --> */}
        <BottonNavBar />
      </div>
    </>
  );
}
