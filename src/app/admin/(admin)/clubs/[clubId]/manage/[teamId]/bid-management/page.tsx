import { getClubById } from "@/modules/clubs";
import {
  getTeamSeasons,
  GridCards,
  StatusTeamSeason,
  TabsNavigation,
} from "@/modules/team-seasons";
import { getTeamById } from "@/modules/teams";
import {
  ButtonAdd,
  ErrorPage,
  HeaderPage,
  PaginationSection,
  SectionFilters,
  TabsTypeFilter,
} from "@/ui";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
    status?: StatusTeamSeason;
  }>;
  params: Promise<{ clubId: string; teamId: string }>;
}

export default async function BidManagementPage({
  searchParams,
  params,
}: Props) {
  const [{ search, page, per_page, status }, { clubId, teamId }] =
    await Promise.all([searchParams, params]);

  const [teamSeasonsResponse, teamResponse, clubResponse] = await Promise.all([
    getTeamSeasons({ search, page, per_page, teamId, status }),
    getTeamById({ id: teamId }),
    getClubById({ id: clubId }),
  ]);

  if (teamResponse.error && teamResponse.statusCode === 401) {
    redirect("/login");
  }

  // 2. Manejo de errores generales (400, 500, etc.)
  if (teamResponse.error) {
    return (
      <ErrorPage
        message={teamResponse.message}
        path={{
          href: `/clubs`,
          label: "Volver a la lista de clubes",
        }}
      />
    );
  }

  if (teamSeasonsResponse.error && teamSeasonsResponse.statusCode === 401) {
    redirect("/login");
  }

  // 2. Manejo de errores generales (400, 500, etc.)
  if (teamSeasonsResponse.error) {
    return (
      <ErrorPage
        message={teamSeasonsResponse.message}
        path={{
          href: `/clubs/${teamResponse.data.club.id}/manage`,
          label: "Volver a la lista de equipos",
        }}
      />
    );
  }

  if (clubResponse.error && clubResponse.statusCode === 401) {
    redirect("/login");
  }

  // 2. Manejo de errores generales (400, 500, etc.)
  if (clubResponse.error) {
    return (
      <ErrorPage
        message={clubResponse.message}
        path={{
          href: `/clubs`,
          label: "Volver a la lista de clubes",
        }}
      />
    );
  }
  return (
    <>
      <HeaderPage
        title={`Gestión de Ofertas - ${teamResponse.data.name}`}
        description="Gestión integral de los equipos del club."
        action={
          <ButtonAdd
            href={`/admin/clubs/${clubId}/manage/${teamId}/bid-management/add`}
            label="Crear Nueva Oferta"
          />
        }
        urlBase="/admin/clubs"
        breadcrumb={[
          { label: "Gestión Clubes", href: "/" },
          { label: clubResponse.data.name, href: `${clubId}/manage` },
          {
            label: `Gestión de Ofertas - ${teamResponse.data.name}`,
          },
        ]}
      />
      <TabsNavigation />
      <SectionFilters />
      <GridCards teamSeasons={teamSeasonsResponse.data.data} />
      <PaginationSection
        totalPages={teamSeasonsResponse.data.meta.totalPages}
        itemsPerPage={teamSeasonsResponse.data.meta.itemsPerPage}
        totalItems={teamSeasonsResponse.data.meta.totalItems}
      />
    </>
  );
}
