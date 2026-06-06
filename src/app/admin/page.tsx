import { getClubsOptions, SelectClub } from "@/modules/clubs";
import {
  Footer,
  HeaderPageLouncher,
  ModuleGrid,
} from "@/modules/module-louncher";
import { getOrganizationById, getOrganizations } from "@/modules/organizations";
import { BottonNavBar, ErrorPage, Header, Sidebar } from "@/ui";

export default async function AdminPage() {
  const [organizationsResponse, clubsOptionsResponse] = await Promise.all([
    getOrganizations({}),
    getClubsOptions(),
  ]);

  if (organizationsResponse.error || !organizationsResponse.data) {
    return <ErrorPage message={organizationsResponse.message} />;
  }

  if (clubsOptionsResponse.error || !clubsOptionsResponse.data) {
    return <ErrorPage message={clubsOptionsResponse.message} />;
  }
  const organization = organizationsResponse.data.data[0];

  return (
    <>
      <div className="max-w-400 mx-auto">
        {/* Container for ultra-wide screens */}
        {/* <!-- TopNavBar --> */}
        <Header
          title={organization.name}
          // actions={<SelectClub clubs={clubsOptionsResponse.data.data} />}
        />
        {/* <!-- Dashboard Canvas --> */}
        <main className="p-4 md:px-8 md:py-3 space-y-6 md:space-y-8">
          {/* <!-- Header Section --> */}
          {clubsOptionsResponse.data.data.length > 0 ? (
            <>
              <HeaderPageLouncher />
              <ModuleGrid />
              <Footer />
            </>
          ) : (
            <ErrorPage
              message="No hay clubes registrados"
              path={{ href: "/admin", label: "Volver al inicio" }}
            />
          )}
        </main>
      </div>
    </>
  );
}
