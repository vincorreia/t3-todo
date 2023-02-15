import { signOut } from "next-auth/react";
import { useState } from "react";
import { Modal } from "./Modal";

type Props = {
  className?: string;
};

export const LogoutBTN: React.FC<Props> = ({ className }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const classes = [
    "bg-white text-[var(--primary)] hover:bg-gray-200 px-4 py-2 font-semibold active:bg-gray-300 rounded-full",
  ];

  if (className) {
    classes.push(className);
  }
  return (
    <>
      {open && (
        <Modal.Main
          open={open}
          setOpen={setOpen}
          title="Logout"
          Body={
            <p className="flex h-full w-full items-center text-xl font-semibold">
              Are you sure you want to logout?
            </p>
          }
          Footer={
            <Modal.Footer
              cancelFunc={() => setOpen((prev) => !prev)}
              confirmFunc={() => void signOut()}
            />
          }
        />
      )}
      <button type="button" className={classes.join(" ")} onClick={handleClick}>
        Logout
      </button>
    </>
  );
};
