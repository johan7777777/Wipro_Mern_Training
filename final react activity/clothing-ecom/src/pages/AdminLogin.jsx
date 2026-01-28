import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Demo credentials (change as you wish)
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "1234";

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
  });

  // Initial form values
  const initialValues = {
    username: "",
    password: "",
  };

  // Form submission handler
  function handleSubmit(values, { setFieldError, setSubmitting }) {
    if (values.username === ADMIN_USER && values.password === ADMIN_PASS) {
      login({
        id: ADMIN_USER,
        username: ADMIN_USER,
        name: "Admin User",
        role: "admin",
        email: "admin@example.com",
      });
      navigate("/admin");
    } else {
      setFieldError("password", "Invalid username or password");
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="max-w-md mx-auto bg-white border rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-sm text-gray-600 mt-1">
          Use username: <b>admin</b> and password: <b>1234</b>
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
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Field
                  name="username"
                  id="username"
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.username && touched.username
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  placeholder="Enter admin username"
                />
                <ErrorMessage
                  name="username"
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
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.password && touched.password
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  placeholder="Enter password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-black text-white hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
