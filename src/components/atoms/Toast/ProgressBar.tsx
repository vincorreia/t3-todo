import { useToastAtom } from "../../../hooks/atoms";
import { motion } from "framer-motion";

const bgColors = { success: "bg-green-800", error: "bg-red-800" };

export const ProgressBar = () => {
  const [{ duration, type }] = useToastAtom();

  if (!duration || !type || type === "loading") {
    return null;
  }

  return (
    <div className={`h-1 w-full ${bgColors[type]}`}>
      <motion.div
        initial={{ width: "100%" }}
        animate={{
          width: "0%",
        }}
        transition={{
          duration: duration / 1000,
          ease: "linear",
        }}
        className="h-full bg-white"
      />
    </div>
  );
};
