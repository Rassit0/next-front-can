import {
  getGroups,
  getGroupsSummary,
  GridCards,
  GroupType,
  TabsTypeFilter,
} from "@/modules/groups";
import {
  ButtonAddActivity,
  EditModal,
  getOrganizationById,
} from "@/modules/organizations";
import { ErrorPage, HeaderPage, PaginationSection, SectionFilters } from "@/ui";
import { Card } from "@heroui/react";
import {
  Calendar03Icon,
  CallIcon,
  Location01Icon,
  Mail01Icon,
  PaymentSuccess01Icon,
  TrendingUpDownIcon,
  UserAdd02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
    type?: GroupType;
  }>;
  params: Promise<{ organizationId: string }>;
}
export default async function OrganizationManagePage({
  params,
  searchParams,
}: Props) {
  const { search, page, per_page, type } = await searchParams;
  const { organizationId } = await params;
  if (isNaN(Number(organizationId))) {
    return <ErrorPage message="ID de escuela inválido" />;
  }

  const [organizationResponse, coursesResponse, activitiesSummary] =
    await Promise.all([
      getOrganizationById({ id: organizationId }),
      getGroups({
        organizationId: Number(organizationId),
        search,
        page,
        per_page,
        type,
      }),
      getGroupsSummary({ organizationId: Number(organizationId) }),
    ]);

  //   const locationsResponse = await getLocationsOptions();

  if (
    (organizationResponse.error && organizationResponse.statusCode !== 200) ||
    !organizationResponse.data
  ) {
    return <ErrorPage message={organizationResponse.message} />;
  }

  if (
    (coursesResponse.error && coursesResponse.statusCode !== 200) ||
    !coursesResponse.data
  ) {
    return <ErrorPage message={coursesResponse.message} />;
  }

  if (
    (activitiesSummary.error && activitiesSummary.statusCode !== 200) ||
    !activitiesSummary.data
  ) {
    return <ErrorPage message={activitiesSummary.message} />;
  }

  //   if (
  //     (locationsResponse.error && locationsResponse.statusCode !== 200) ||
  //     !locationsResponse.data
  //   ) {
  //     return <ErrorPage message={locationsResponse.message} />;
  //   }

  return (
    <>
      {/* <!-- Breadcrumbs & Header --> */}
      <HeaderPage
        title={
          <section>
            <div className="flex items-center gap-6">
              {/* Contenedor del Texto */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl flex flex-col font-headline font-extrabold text-on-surface tracking-tight leading-none">
                    {organizationResponse.data.name}
                    <span className="text-sm font-medium text-foreground/50">
                      ID: {organizationResponse.data.id}
                    </span>
                  </h2>
                </div>

                {/* Solo renderiza este bloque si hay al menos un dato, para evitar márgenes fantasmas */}
                {(organizationResponse.data.email ||
                  organizationResponse.data.phone ||
                  organizationResponse.data.address) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm text-on-surface-variant mt-2">
                    {organizationResponse.data.email && (
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon icon={Mail01Icon} size={16} />
                        <span>{organizationResponse.data.email}</span>
                      </div>
                    )}
                    {organizationResponse.data.phone && (
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon icon={CallIcon} size={16} />
                        <span>{organizationResponse.data.phone}</span>
                      </div>
                    )}
                    {organizationResponse.data.address && (
                      <div className="flex items-center gap-2 md:col-span-2">
                        <HugeiconsIcon icon={Location01Icon} size={16} />
                        <span>{organizationResponse.data.address}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        }
        // description="Configure los parámetros técnicos, financieros y operativos de la nueva oferta del club."
        action={<EditModal organization={organizationResponse.data} />}
        breadcrumb={[
          { label: "Organizaciones", href: "/organizations" },
          // {
          //   label: organizationResponse.data.name,
          //   href: `/organizations/manage/${organizationId}`,
          // },
          { label: organizationResponse.data.name },
        ]}
      />

      {/* <!-- Stats Section --> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-surface group">
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
            <HugeiconsIcon
              icon={Calendar03Icon}
              className="text-accent"
              size={150}
            />
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">
              Total Actividades
            </span>
            <span className="text-4xl font-headline font-extrabold text-on-surface">
              {activitiesSummary.data?.totalActivities}
            </span>
            <p className="text-[11px] text-on-surface-variant mt-3 flex items-center gap-1.5 font-medium">
              <span className="text-primary flex items-center font-bold">
                <HugeiconsIcon icon={TrendingUpDownIcon} />
                +12%
              </span>
              desde el mes pasado
            </p>
          </div>
        </Card>
        <Card className="p-6 bg-surface group">
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
            <HugeiconsIcon
              icon={UserAdd02Icon}
              className="text-primary"
              size={150}
            />
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">
              Inscripciones Activas
            </span>
            <span className="text-4xl font-headline font-extrabold text-on-surface">
              482
            </span>
            <p className="text-[11px] text-on-surface-variant mt-3 flex items-center gap-1.5 font-medium">
              <span className="text-primary font-bold">96%</span> de capacidad
              total
            </p>
          </div>
        </Card>
        <Card className="p-6 bg-surface group">
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
            <HugeiconsIcon
              icon={PaymentSuccess01Icon}
              className="text-primary"
              size={150}
            />
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-80">
              Ingresos Mensuales
            </span>
            <span className="text-4xl font-headline font-extrabold">
              $154,200
            </span>
            <p className="text-[11px] mt-3 font-medium opacity-90">
              Matrículas y mensualidades al día
            </p>
          </div>
        </Card>
      </div>
      {/* <!-- Activity Table Section --> */}

      <TabsTypeFilter defaultType="TEAM" types={["TEAM", "COURSE"]} />
      <SectionFilters
        actions={<ButtonAddActivity organizationId={Number(organizationId)} />}
      />

      <GridCards groups={coursesResponse.data.data} />
      {/* <TableActivities activities={coursesResponse.data.data} /> */}
      <PaginationSection
        totalPages={coursesResponse.data.meta.totalPages}
        itemsPerPage={coursesResponse.data.meta.itemsPerPage}
        totalItems={coursesResponse.data.meta.totalItems}
      />
    </>
  );
}
