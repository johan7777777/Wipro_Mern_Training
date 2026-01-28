import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Demo users (in real app, this would come from an API)
  const DEMO_USERS = {
    admin: { username: "admin", password: "1234", role: "admin", name: "Admin User" },
    user: { username: "user", password: "1234", role: "user", name: "John Doe" },
  };

  // Validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  function handleSubmit(values, { setFieldError, setSubmitting }) {
    const user = DEMO_USERS[values.username.toLowerCase()];
    
    if (user && user.password === values.password) {
      login({
        id: user.username,
        username: user.username,
        name: user.name,
        role: user.role,
        email: `${user.username}@example.com`,
      });
      
      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      setFieldError("password", "Invalid username or password");
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="max-w-md mx-auto bg-white border rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-gray-600 mt-1">
          Demo credentials: <b>admin/1234</b> or <b>user/1234</b>
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
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.username && touched.username
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  placeholder="Enter username"
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
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
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
                className="w-full px-4 py-3 rounded-xl bg-black text-white hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Register here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
