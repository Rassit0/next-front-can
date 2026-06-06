import {
  ErrorPage,
  HeaderPage,
  PaginationSection,
  SectionFilters,
  TabsTypeFilter,
} from "@/ui";
import { redirect } from "next/navigation";
import {
  AddModal,
  getSeasons,
  GridCards,
  TableSeasons,
} from "@/modules/seasons";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
    sortField?: "name" | "startDate" | "endDate" | "createdAt" | "updatedAt";
    orderBy?: "asc" | "desc";
  }>;
}
export default async function ClubSeasonsPage({ searchParams }: Props) {
  const { search, page, per_page, sortField, orderBy } = await searchParams;
  const seasonsResponse = await getSeasons({
    search,
    page,
    per_page,
    sortField,
    orderBy,
  });

  // 1. Manejo de error específico (Ej: 401 no autorizado)
  if (seasonsResponse.error && seasonsResponse.statusCode === 401) {
    redirect("/login");
  }

  // 2. Manejo de errores generales (400, 500, etc.)
  if (seasonsResponse.error) {
    return <ErrorPage message={seasonsResponse.message} />;
  }

  return (
    <>
      <HeaderPage
        title={<span className="font-bold">Directorio de Clubes</span>}
        // description="Administra los clubes deportivos del país"
        action={<AddModal />}
      />
      {/* <!-- Search and Filter Bar (Tonal Architecture) --> */}
      <SectionFilters />
      {/* <!-- Main Member Table --> */}
      <TableSeasons seasons={seasonsResponse.data.data} />
      {/* <GridCards /> */}
      <PaginationSection
        totalPages={seasonsResponse.data.meta.totalPages}
        itemsPerPage={seasonsResponse.data.meta.itemsPerPage}
        totalItems={seasonsResponse.data.meta.totalItems}
      />
    </>
  );
}
