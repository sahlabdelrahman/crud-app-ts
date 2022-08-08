/** @format */

import MainLayout from "../../layouts/MainLayout";

import { Paper } from "@mui/material";
import { Container } from "@mui/system";

import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <MainLayout>
      <main className={styles.main}>
        <Container className={styles.container} component={Paper}>
          <h2>404</h2>
          <p>Page Not Found</p>
        </Container>
      </main>
    </MainLayout>
  );
};

export default NotFound;
