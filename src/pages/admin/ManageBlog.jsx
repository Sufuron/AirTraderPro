import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const BlogSchema = Yup.object({
  title: Yup.string().required("Título obligatorio"),
  date: Yup.date().required("Fecha obligatoria"),
  excerpt: Yup.string().required("El extracto es obligatorio"),
  content: Yup.string().required("El contenido es obligatorio"),
});

const initialValues = {
  title: "",
  date: "",
  excerpt: "",
  content: "",
};

const ManageBlog = () => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Datos del blog:", values);
    // API call here
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="admin-blog">
      <h2>Gestión de Blog</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <label>Título</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />

            <label>Fecha</label>
            <Field type="date" name="date" />
            <ErrorMessage name="date" component="div" />

            <label>Extracto</label>
            <Field type="text" name="excerpt" />
            <ErrorMessage name="excerpt" component="div" />

            <label>Contenido</label>
            <Field as="textarea" name="content" rows="6" />
            <ErrorMessage name="content" component="div" />

            <button type="submit" disabled={isSubmitting}>Publicar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ManageBlog;
