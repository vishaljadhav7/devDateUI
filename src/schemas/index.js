import * as Yup from 'yup';

export const signUpSchema = Yup.object({
    firstName : Yup.string()
    .min(4, "first name must be at least 4 characters")
    .max(8, "first name must be at most 8 characters")
    .required("Please enter your first name"),

    lastName : Yup.string()    
    .min(4, "last name must be at least 4 characters")
    .max(10, "last name must be at most 8 characters")
    .required("Please enter your last name"),
 
    emailId: Yup.string() 
    .email("Please enter a valid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format"
    )
    .required("Email is required"),

    password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    )
    .required("Please enter your password"),
})