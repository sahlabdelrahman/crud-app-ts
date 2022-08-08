/** @format */

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .matches(
      /^[aA-zZ\s]+$/,
      "Only english characters are allowed for this field "
    )
    .min(3, "Title length should be at least 3 characters")
    .max(255, "Title length must not exceed 255 characters"),
  description: Yup.string()
    .required("Description is required")
    .matches(
      /^[aA-zZ\s]+$/,
      "Only english characters are allowed for this field "
    )
    .min(3, "Description length should be at least 3 characters")
    .max(1500, "Description length must not exceed 1500 characters"),
});

const validationOpt = { resolver: yupResolver(formSchema) };

export default validationOpt;
