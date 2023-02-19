import { ICONS, PRIMARY_BUTTON_ACTION_CLASSES } from "../../consts";
import { ActionButton } from "./ActionButton";
import { Tag } from "./Tag";

type Props = {
  amount: number | null;
  className?: string;
};

export const AmountTag: React.FC<Props> = ({ amount }) => {
  if (!amount) return null;
  return (
    <Tag type="right">
      <div className="flex items-center gap-x-3 text-xl lg:gap-x-5 lg:text-2xl">
        {amount}
        <div className="flex flex-col items-center">
          <ActionButton
            icon={ICONS.PLUS}
            iconSize="xs"
            className={PRIMARY_BUTTON_ACTION_CLASSES}
          />
          <ActionButton
            icon={ICONS.MINUS}
            iconSize="xs"
            className={PRIMARY_BUTTON_ACTION_CLASSES}
          />
        </div>
      </div>
    </Tag>
  );
};
