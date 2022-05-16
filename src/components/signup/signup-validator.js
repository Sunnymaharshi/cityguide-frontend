const validateSignup = (values) => {
  const errors = {};
  const email_regex = /\S+@\S+\.\S+/;
  const num_regex = /^\d+$/;
  if (!values.username) {
    errors.username = "Username is required!";
  }
  if (!values.name) {
    errors.name = "Name is required!";
  }
  if (!values.mob_no) {
    errors.mob_no = "Phone number is required!";
  } else if (!num_regex.test(values.mob_no) || values.mob_no.length !== 10) {
    errors.mob_no = "Invalid phone number";
  }

  if (!values.emailid) {
    errors.emailid = "Email is required!";
  } else if (!email_regex.test(values.emailid)) {
    errors.emailid = "This is not a valid email format!";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export default validateSignup;
