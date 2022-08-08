/** @format */

import { Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Typography variant="h5" component="div">
          <Link className={styles.link} to={`/`}>
            Technical Challenge
          </Link>
        </Typography>
        <div>
          <Link className={styles.link} to={`/`}>
            Posts
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
