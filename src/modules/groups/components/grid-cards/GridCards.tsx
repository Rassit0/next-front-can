import { CardGroup } from "./CardGroup";
import { IGroup } from "../../interfaces/group.interface";

interface Props {
  groups: IGroup[];
}
export const GridCards = ({ groups }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <div key={group.id}>
          <CardGroup group={group} />
        </div>
      ))}
    </div>
  );
};
