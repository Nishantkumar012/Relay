import type { ReactNode } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

type Props = {
  children?: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <>
      <RouterProvider router={router} />
      {children}
    </>
  );
}
