import {
  ActivityType,
  FormActivity,
  getActivityById,
} from "@/modules/activities";
import { getOrganizationById } from "@/modules/organizations";
import { ErrorPage, HeaderPage } from "@/ui";

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{ id: string; organizationId: string }>;
}) {
  const { id, organizationId } = await params;

  if (isNaN(Number(id))) {
    return <ErrorPage message="ID de actividad inválido" />;
  }

  if (isNaN(Number(organizationId))) {
    return <ErrorPage message="ID de organización inválido" />;
  }

  const [activityResponse, organizationResponse] = await Promise.all([
    getActivityById({ id: Number(id) }),
    getOrganizationById({ id: Number(organizationId) }),
  ]);

  if (
    (activityResponse.error && activityResponse.statusCode !== 200) ||
    !activityResponse.data
  ) {
    return <ErrorPage message={activityResponse.message} />;
  }

  if (
    (organizationResponse.error && organizationResponse.statusCode !== 200) ||
    !organizationResponse.data
  ) {
    return <ErrorPage message={organizationResponse.message} />;
  }

  let typePermits: ActivityType[] = [];

  if (organizationResponse.data.type === "ACADEMY") {
    typePermits = ["EDUCATIONAL", "EVENT"];
  }

  if (organizationResponse.data.type === "CLUB") {
    typePermits = ["TRAINING", "MATCH", "TEAM", "EVENT", "EDUCATIONAL"];
  }

  return (
    <>
      {/* <!-- Breadcrumbs & Header --> */}
      <HeaderPage
        title={`Editar Actividad - ${activityResponse.data.name}`}
        description="Configure los parámetros técnicos, financieros y operativos de la nueva oferta del club."
        //   action={<AddModal />}
        breadcrumb={[
          { label: "Organizaciones", href: "/organizations" },
          {
            label: organizationResponse.data.name,
            href: `/organizations/manage/${organizationId}/activities`,
          },
          // {
          //   label: "Actividades",
          //   href: `/organizations/manage/${organizationId}/activities`,
          // },
          { label: "Editar Actividad" },
        ]}
      />
      <FormActivity
        activity={activityResponse.data}
        formId="form-edit-activity"
        typesPermits={typePermits}
        organization={organizationResponse.data}
      />
    </>
  );
}
