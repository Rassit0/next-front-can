import { FiltersBar, GridCards, MetricsPanel } from "@/modules/clubs";
import { AddModal, getOrganizations } from "@/modules/organizations";
import { ErrorPage, HeaderPage, PaginationSection } from "@/ui";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
  }>;
}

export default async function TeamsPage({ searchParams }: Props) {
  const { search, page, per_page } = await searchParams;
  const result = await getOrganizations({
    search,
    page,
    per_page,
  });

  // 1. Manejo de error específico (Ej: 401 no autorizado)
  if (result.error && result.statusCode === 401) {
    redirect("/login");
  }

  // 2. Manejo de errores generales (400, 500, etc.)
  if (result.error) {
    return <ErrorPage message={result.message} />;
  }
  return (
    <>
      {/* <!-- Breadcrumbs & Header --> */}
      <HeaderPage
        title="Directorio de Organizaciones"
        description="Gestión integral de las organizaciones del club."
        action={<AddModal />}
      />
      {/* <!-- Metrics Panel: Asymmetric Bento Grid --> */}
      <MetricsPanel />
      {/* <!-- Filters Bar --> */}
      <FiltersBar />
      {/* <!-- Grid --> */}
      <GridCards organizations={result.data.data} />
      <PaginationSection totalPages={10} itemsPerPage={10} totalItems={100} />
    </>
  );
}
