import {
  ActivityType,
  FormActivity,
  getActivityById,
  getLocationsOptions,
} from "@/modules/activities";
import { getOrganizationById } from "@/modules/organizations";
import { ErrorPage, HeaderPage } from "@/ui";
import { redirect } from "next/navigation";

export default async function AddActivityPage({
  params,
}: {
  params: Promise<{ organizationId: string; activityId: string }>;
}) {
  const { organizationId, activityId } = await params;
  if (isNaN(Number(organizationId))) {
    return <ErrorPage message="ID de escuela inválido" />;
  }
  if (isNaN(Number(activityId))) {
    return <ErrorPage message="ID de actividad inválido" />;
  }

  const [organizationResponse, activityParentResponse] = await Promise.all([
    getOrganizationById({ id: Number(organizationId) }),
    getActivityById({ id: Number(activityId) }),
  ]);

  // 1. Manejo de error específico (Ej: 401 no autorizado)
  if (organizationResponse.error && organizationResponse.statusCode === 401) {
    redirect("/login");
  }

  if (
    activityParentResponse.error &&
    activityParentResponse.statusCode === 401
  ) {
    redirect("/login");
  }

  // 2. Manejo de errores generales (400, 500, etc.)
  if (organizationResponse.error) {
    return <ErrorPage message={organizationResponse.message} />;
  }

  if (activityParentResponse.error) {
    return <ErrorPage message={activityParentResponse.message} />;
  }

  let typePermits: ActivityType[] = [];

  if (activityParentResponse.data.type === "EDUCATIONAL") {
    typePermits = ["TRAINING", "EVENT"];
  }

  if (activityParentResponse.data.type === "TEAM") {
    typePermits = ["TRAINING", "MATCH", "EVENT"];
  }

  return (
    <>
      {/* <!-- Breadcrumbs & Header --> */}
      <HeaderPage
        title={`Crear Actividad - ${activityParentResponse.data.name}`}
        description="Configure los parámetros técnicos, financieros y operativos de la nueva oferta del club."
        //   action={<AddModal />}
        breadcrumb={[
          { label: "Organizaciones", href: "/organizations" },
          {
            label: organizationResponse.data.name,
            href: `/organizations/${organizationId}/manage`,
          },
          {
            label: activityParentResponse.data.name,
            href: `/organizations/${organizationId}/manage/activities/${activityId}/manage/activities`,
          },
          { label: "Nueva Actividad" },
        ]}
      />
      <FormActivity
        activityParent={activityParentResponse.data}
        formId="form-add-activity"
        organization={organizationResponse.data}
        typesPermits={typePermits}
      />
    </>
  );
}
