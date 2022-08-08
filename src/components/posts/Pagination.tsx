/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Posts.module.css";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
}: {
  postsPerPage: number;
  totalPosts: number;
  paginate: any;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    if (i < 10) {
      pageNumbers.push(`0${i}`);
    } else {
      pageNumbers.push(i);
    }
  }

  const [activeLink, setActiveLink] = useState("");

  return (
    <nav>
      <ul className={styles.ulInPagination}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={activeLink === number ? styles.active : ""}
          >
            <Link
              to="#"
              onClick={() => {
                paginate(number);
                setActiveLink(`${number}`);
              }}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
