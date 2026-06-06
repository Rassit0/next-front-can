import { itemsNavigation } from "@/config";
import { getClubsOptions, SelectClub } from "@/modules/clubs";
import { getOrganizationById, getOrganizations } from "@/modules/organizations";
import { BottonNavBar, ErrorPage, Header, Sidebar } from "@/ui";
import { iconMap } from "@/utils";
import { HugeiconsIcon } from "@hugeicons/react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationsResponse = await getOrganizations({});

  if (organizationsResponse.error || !organizationsResponse.data) {
    return <ErrorPage message={organizationsResponse.message} />;
  }
  const organization = organizationsResponse.data.data[0];

  return (
    <>
      {/* <!-- SideNavBar --> */}
      <Sidebar
        organization={organization}
        items={itemsNavigation}
        urlBase={`/admin`}
      />
      {/* <!-- Main Content Area --> */}
      <div className="md:ml-20 lg:ml-64 min-h-screen transition-all duration-300 pb-24 lg:pb-2">
        <div className="max-w-400 mx-auto">
          {/* Container for ultra-wide screens */}
          {/* <!-- TopNavBar --> */}
          <Header
            title={
              <div className="flex items-center gap-2 pl-2">
                <HugeiconsIcon icon={iconMap["basketball"]} />
                <span>Basquetbol</span>
              </div>
            }
            // actions={<SelectClub clubs={clubsOptionsResponse.data.data} />}
          />
          {/* <!-- Dashboard Canvas --> */}
          <main className="p-4 md:px-8 md:py-3 space-y-4 md:space-y-6">
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
