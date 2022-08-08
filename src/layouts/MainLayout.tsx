/** @format */

import { ReactNode } from "react";
import Header from "../components/shared/Header/Header";
import Footer from "../components/shared/Footer/Footer";

interface Props {
  children?: ReactNode;
}

const MainLayout = ({ children, ...props }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
