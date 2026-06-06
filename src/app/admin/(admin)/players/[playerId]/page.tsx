interface Props {
  params: Promise<{ playerId: string; clubId: string }>;
}
export default async function PlayerPage({ params }: Props) {
  const { playerId, clubId } = await params;

  return <div>PlayerPage</div>;
}
