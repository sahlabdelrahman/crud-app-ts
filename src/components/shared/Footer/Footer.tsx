/** @format */

import { Container, Typography } from "@mui/material";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <Typography variant="body1" color="white">
          © 2022 Crud
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
