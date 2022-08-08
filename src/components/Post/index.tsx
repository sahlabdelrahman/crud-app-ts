/** @format */

import { Link } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";

import ViewPost from "./ViewPost";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

import styles from "./Post.module.css";

function Post({
  id,
  title,
  body,
}: {
  id: number;
  title: string;
  body: string;
}) {
  return (
    <TableRow className={styles.row}>
      <TableCell component="th" scope="row" className={styles.tableCell}>
        <Link className={styles.link} to={`/posts/${id}`}>
          {title}
        </Link>
      </TableCell>
      <TableCell className={styles.cell}>
        <ViewPost id={id} title={title} body={body} />
        <EditPost id={id} title={title} body={body} />
        <DeletePost id={id} />
      </TableCell>
    </TableRow>
  );
}

export default Post;
