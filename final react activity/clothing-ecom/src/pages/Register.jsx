import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  function handleSubmit(values, { setSubmitting }) {
    // In a real app, this would make an API call
    // For demo, we'll just log the user in
    login({
      id: values.username,
      username: values.username,
      name: values.name,
      email: values.email,
      role: "user", // New users are regular users by default
    });

    navigate("/");
    setSubmitting(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="max-w-md mx-auto bg-white border rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-sm text-gray-600 mt-1">
          Join us and start shopping!
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Field
                  name="name"
                  id="name"
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.name && touched.name
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Field
                  name="username"
                  id="username"
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.username && touched.username
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  placeholder="Choose a username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  name="email"
                  id="email"
                  type="email"
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  name="password"
                  id="password"
                  type="password"
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.password && touched.password
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  placeholder="Create a password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-black text-white hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating account..." : "Register"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Login here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
