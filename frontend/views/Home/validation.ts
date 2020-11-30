import * as Yup from "yup";

/**
 * Invite Email Validation Schema, a Yup Schema for basic validation
 */
export default Yup.object().shape({
  // Email must be provided and be a valid email.
  email: Yup.string().email("Invalid email address").required("Required"),
});