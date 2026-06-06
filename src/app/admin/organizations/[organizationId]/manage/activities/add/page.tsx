import {
  ActivityType,
  FormActivity,
  getLocationsOptions,
} from "@/modules/activities";
import { getOrganizationById } from "@/modules/organizations";
import { ErrorPage, HeaderPage } from "@/ui";
import { redirect } from "next/navigation";

export default async function AddActivityPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;
  if (isNaN(Number(organizationId))) {
    return <ErrorPage message="ID de escuela inválido" />;
  }

  const response = await getOrganizationById({ id: Number(organizationId) });

  // 1. Manejo de error específico (Ej: 401 no autorizado)
  if (response.error && response.statusCode === 401) {
    redirect("/login");
  }

  // 2. Manejo de errores generales (400, 500, etc.)
  if (response.error) {
    return <ErrorPage message={response.message} />;
  }

  let typePermits: ActivityType[] = [];

  if (response.data.type === "ACADEMY") {
    typePermits = ["EDUCATIONAL", "EVENT"];
  }

  if (response.data.type === "CLUB") {
    typePermits = ["TEAM", "EVENT"];
  }

  return (
    <>
      {/* <!-- Breadcrumbs & Header --> */}
      <HeaderPage
        title={`Crear Actividad - ${response.data.name}`}
        description="Configure los parámetros técnicos, financieros y operativos de la nueva oferta del club."
        //   action={<AddModal />}
        breadcrumb={[
          { label: "Organizaciones", href: "/organizations" },
          {
            label: response.data.name,
            href: `/organizations/${organizationId}/manage`,
          },
          // {
          //   label: "Actividades",
          //   href: `/organizations/manage/${organizationId}/activities`,
          // },
          { label: "Nueva Actividad" },
        ]}
      />
      <FormActivity
        formId="form-add-activity"
        organization={response.data}
        typesPermits={typePermits}
      />
    </>
  );
}
