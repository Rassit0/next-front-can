import { EditModal, getClubById, getDisciplinesOptions } from "@/modules/clubs";
import { AddModal, FiltersBar, MetricsPanel, GridCards } from "@/modules/teams";
import { getTeams } from "@/modules/teams";
import { TableTeams } from "@/modules/teams/components/table/Table";
import { ErrorPage, HeaderPage, PaginationSection, SectionFilters } from "@/ui";
import { Separator, Surface } from "@heroui/react";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
  }>;
  params: Promise<{ clubId: string }>;
}

export default async function ClubPage({ searchParams, params }: Props) {
  const { search, page, per_page } = await searchParams;
  const { clubId } = await params;

  const [teamsResponse, clubResponse, disciplinesOptionsResponse] =
    await Promise.all([
      getTeams({
        search,
        page,
        per_page,
        clubId,
      }),
      getClubById({ id: clubId }),
      getDisciplinesOptions(),
    ]);

  // 1. Manejo de error específico (Ej: 401 no autorizado)
  if (teamsResponse.error && teamsResponse.statusCode === 401) {
    redirect("/login");
  }

  // 2. Manejo de errores generales (400, 500, etc.)
  if (teamsResponse.error) {
    return (
      <ErrorPage
        message={teamsResponse.message}
        path={{ href: "/clubs", label: "Volver a la lista de clubes" }}
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
        path={{ href: "/clubs", label: "Volver a la lista de clubes" }}
      />
    );
  }

  if (
    disciplinesOptionsResponse.error &&
    disciplinesOptionsResponse.statusCode === 401
  ) {
    redirect("/login");
  }

  // 2. Manejo de errores generales (400, 500, etc.)
  if (disciplinesOptionsResponse.error) {
    return (
      <ErrorPage
        message={disciplinesOptionsResponse.message}
        path={{ href: "/clubs", label: "Volver a la lista de clubes" }}
      />
    );
  }

  return (
    <>
      {/* <!-- Breadcrumbs & Header --> */}
      <HeaderPage
        title={clubResponse.data.name}
        description={`Gestión integral de los equipos del club.`}
        action={
          <EditModal
            club={clubResponse.data}
            disciplinesOptions={disciplinesOptionsResponse.data.data}
          />
        }
        urlBase="/admin/clubs"
        breadcrumb={[
          { label: "Gestión Clubes", href: "/" },
          { label: clubResponse.data.name },
        ]}
      />
      {/* <!-- Metrics Panel: Asymmetric Bento Grid --> */}
      <MetricsPanel />

      {/* <Separator className="md:hidden my-4" /> */}

      <Surface className="mt-6 rounded-xl p-2">
        <HeaderPage
          title="Equipos"
          // description={`Gestión integral de los equipos del club.`}
        />
        <div className="flex flex-col gap-2">
          {/* <!-- Search and Filter Bar (Tonal Architecture) --> */}
          <SectionFilters actions={<AddModal clubId={clubId} />} />
          {/* <!-- Grid --> */}
          <TableTeams teams={teamsResponse.data.data} />
          <PaginationSection
            totalPages={teamsResponse.data.meta.totalPages}
            itemsPerPage={teamsResponse.data.meta.itemsPerPage}
            totalItems={teamsResponse.data.meta.totalItems}
          />
        </div>
      </Surface>
    </>
  );
}
