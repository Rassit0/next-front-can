import {
  ActivityType,
  getActivities,
  getActivityById,
  TableActivities,
  TypeFilter,
} from "@/modules/activities";
import { ButtonAddActivity } from "@/modules/organizations";
import { ErrorPage, PaginationSection, SectionFilters } from "@/ui";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
    type?: ActivityType;
  }>;
  params: Promise<{ organizationId: string; activityId: string }>;
  children: React.ReactNode;
}
export default async function ManageActivityPage({
  params,
  searchParams,
  children,
}: Props) {
  const { search, page, per_page, type } = await searchParams;
  const { organizationId, activityId } = await params;

  const [activitiesResponse, activityParentResponse] = await Promise.all([
    getActivities({
      search,
      page,
      per_page,
      parentId: Number(activityId),
      type,
    }),
    getActivityById({ id: Number(activityId) }),
  ]);

  if (
    (activitiesResponse.error && activitiesResponse.statusCode !== 200) ||
    !activitiesResponse.data
  ) {
    return <ErrorPage message={activitiesResponse.message} />;
  }

  if (
    (activityParentResponse.error &&
      activityParentResponse.statusCode !== 200) ||
    !activityParentResponse.data
  ) {
    return <ErrorPage message={activityParentResponse.message} />;
  }
  return (
    <>
      <SectionFilters
        actions={
          <ButtonAddActivity
            organizationId={Number(organizationId)}
            activityParentId={Number(activityId)}
          />
        }
      >
        <TypeFilter
          typesPermits={
            activityParentResponse.data.type === "EDUCATIONAL"
              ? ["TRAINING", "EVENT"]
              : activityParentResponse.data.type === "TEAM"
                ? ["TRAINING", "MATCH", "EVENT"]
                : []
          }
        />
      </SectionFilters>
      <TableActivities activities={activitiesResponse.data.data} />
      <PaginationSection
        totalPages={activitiesResponse.data.meta.totalPages}
        itemsPerPage={activitiesResponse.data.meta.itemsPerPage}
        totalItems={activitiesResponse.data.meta.totalItems}
      />
    </>
  );
}
