import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Contact.css";

const Contact = () => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(100, "El nombre no debe exceder 100 caracteres")
      .required("El nombre es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    phone: Yup.string()
      .matches(/^\+/, "El número debe comenzar con '+'")
      .min(5, "El número es muy corto")
      .required("El número de teléfono es obligatorio"),
    message: Yup.string()
      .max(500, "El mensaje no debe exceder 500 caracteres")
      .required("El mensaje es obligatorio"),
  });

  // Set initial values with the phone field pre-filled with a "+"
  const initialValues = {
    name: "",
    email: "",
    phone: "+",
    message: "",
  };

  // Form submission handler
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Datos del formulario:", values);
    // Insert your submission logic here (e.g., API call)
    setSubmitting(false);
    resetForm();
  };

  // Dynamic textarea height handler
  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="contact-container animate__animated animate__fadeInUp">
      <h2 className="contact-title">Ponte en Contacto</h2>
      <p className="contact-subtitle">
        ¿Tienes preguntas? ¿Necesitas ayuda? Completa el formulario a continuación y te responderemos.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="contact-form">
            <div className="input-group">
              <label htmlFor="name">Nombre</label>
              <Field type="text" name="name" placeholder="Introduce tu nombre" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <Field type="email" name="email" placeholder="Introduce tu correo electrónico" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Número de Teléfono</label>
              <Field type="tel" name="phone" placeholder="Ej: +56 9 30531580" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div className="input-group">
              <label htmlFor="message">Mensaje</label>
              <Field
                as="textarea"
                name="message"
                placeholder="Escribe tu mensaje aquí..."
                rows="4"
                maxLength="500"
                onInput={handleInput}
                style={{ overflow: "hidden", resize: "none" }}
              />
              <ErrorMessage name="message" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Enviar Mensaje
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contact;
