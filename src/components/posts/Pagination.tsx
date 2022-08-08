/** @format */

import { useState } from "react";
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
            <a
              href={`#${number}`}
              onClick={() => {
                paginate(number);
                setActiveLink(`${number}`);
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
