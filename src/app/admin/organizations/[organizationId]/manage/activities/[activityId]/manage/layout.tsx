import {
  ActivityType,
  getActivities,
  getActivityById,
  MetricsPanel,
  TableActivities,
  TabsTypeFilter,
} from "@/modules/activities";
import { ButtonAddActivity, TabsNavigation } from "@/modules/organizations";
import { ErrorPage, HeaderPage, PaginationSection, SectionFilters } from "@/ui";
import { Chip } from "@heroui/react";
import { Calendar04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Props {
  params: Promise<{ organizationId: string; activityId: string }>;
  children: React.ReactNode;
}
export default async function ManageActivityPage({ params, children }: Props) {
  const { organizationId, activityId } = await params;

  if (isNaN(Number(activityId))) {
    return <ErrorPage message="ID de actividad inválido" />;
  }
  if (isNaN(Number(organizationId))) {
    return <ErrorPage message="ID de organización inválido" />;
  }
  const activityResponse = await getActivityById({
    id: Number(activityId),
  });

  if (
    (activityResponse.error && activityResponse.statusCode !== 200) ||
    !activityResponse.data
  ) {
    return <ErrorPage message={activityResponse.message} />;
  }

  return (
    <>
      <HeaderPage
        title={
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold font-headline">
              {activityResponse.data.name}
            </h1>
            <div className="flex gap-2 items-center">
              {activityResponse.data.activityCategories.map((category) => (
                <Chip
                  variant="secondary"
                  color="success"
                  key={category.category.id}
                  size="lg"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium">
                      {category.category.name}
                    </span>
                    <span className="text-xs font-medium text-foreground/50">
                      {category.category.minAge} - {category.category.maxAge}{" "}
                      años
                    </span>
                  </div>
                </Chip>
              ))}
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <HugeiconsIcon icon={Calendar04Icon} size={16} />
                <span className="text-[11px] font-medium">
                  {activityResponse.data.startDate ===
                  activityResponse.data.endDate
                    ? activityResponse.data.startDate.toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : `${activityResponse.data.startDate.toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )} - ${activityResponse.data.endDate.toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}`}
                </span>
              </div>
            </div>
          </div>
        }
        description="Aquí puedes configurar los parámetros técnicos, financieros y operativos de la nueva oferta del club."
        //   action={<AddModal />}
        breadcrumb={[
          { label: "Organizaciones", href: "/organizations" },
          {
            label: `${activityResponse.data.organization?.name}`,
            href: `/organizations/${activityResponse.data.organization?.id}/manage?type=${activityResponse.data.type}`,
          },
          { label: `${activityResponse.data.name}` },
        ]}
      />

      <MetricsPanel />

      <TabsNavigation
        defaultType={
          activityResponse.data.type === "TEAM"
            ? "TRAINING"
            : activityResponse.data.type === "EDUCATIONAL"
              ? "TRAINING"
              : "EVENT"
        }
      />

      {children}
    </>
  );
}
