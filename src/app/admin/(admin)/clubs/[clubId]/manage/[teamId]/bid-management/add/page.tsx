import { getClubById } from "@/modules/clubs";
import { FormTeamOffering, getSeasonsOptions } from "@/modules/team-seasons";
import { ButtonsSubmit } from "@/modules/team-seasons/components/form/ButtonsSubmit";
import { getTeamById } from "@/modules/teams";
import { ErrorPage, HeaderPage } from "@/ui";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ clubId: string; teamId: string }>;
}

export default async function AddBidManagementPage({ params }: Props) {
  const { clubId, teamId } = await params;
  const [teamResponse, clubResponse] = await Promise.all([
    getTeamById({ id: teamId }),
    getClubById({ id: clubId }),
  ]);

  if (teamResponse.error && teamResponse.statusCode === 401) {
    redirect("/login");
  }

  // 2. Manejo de errores generales (400, 500, etc.)
  if (teamResponse.error) {
    return <ErrorPage message={teamResponse.message} />;
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
        title={
          <span className="text-4xl font-bold">
            Nueva Oferta -{" "}
            <span className="text-accent">{teamResponse.data.name}</span>
          </span>
        }
        description="Configuración de la nueva oferta para el equipo."
        action={
          <ButtonsSubmit
            cancelHref={`/admin/clubs/${clubId}/${teamId}/bid-management`}
          />
        }
        urlBase="/admin/clubs"
        breadcrumb={[
          { label: "Gestión Clubes", href: "/" },
          { label: clubResponse.data.name, href: `${clubId}/manage` },
          {
            label: `Gestión de Ofertas - ${teamResponse.data.name}`,
            href: `${clubId}/manage/${teamId}/bid-management`,
          },
          { label: `Nueva Oferta` },
        ]}
      />
      <FormTeamOffering
        team={teamResponse.data}
        urlRedirect={`/admin/clubs/${clubId}/manage/${teamId}/bid-management`}
      />
    </>
  );
}
