import * as yup from "yup";
const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  salary: yup
    .number("Salary must be a valid number")
    .required("Salary is required")
    .min(1000, "Salary must be minimum than 1000")
    .max(9999, "Salary cannot be greater than 9999")
    .typeError("Salary must be a valid number"),
  startDate: yup
    .date("")
    .required("Start date is required")
    .max(new Date(), "Start date cannot be greater than present date")
    .typeError("Start date must be a valid date"),

  designation: yup.string().required("Designation is required"),
});
export default userSchema;
