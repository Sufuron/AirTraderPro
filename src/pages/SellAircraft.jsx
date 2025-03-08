import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SellAircraft.css";
import sellAircraftText from "../data/sellAircraftText";
import FieldSection from "../components/FieldSection";

const validationSchema = Yup.object({
  contactName: Yup.string().max(100, "Máximo 100 caracteres").required("El nombre es obligatorio"),
  contactEmail: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
  contactPhone: Yup.string().matches(/^\+\d+$/, "El teléfono debe comenzar con '+' y contener solo dígitos").required("El teléfono es obligatorio"),
  aircraftType: Yup.string().required("El tipo de aeronave es obligatorio"),
  year: Yup.number().min(1900, "Año inválido").max(new Date().getFullYear(), "Año inválido").required("El año es obligatorio"),
  manufacturer: Yup.string().required("El fabricante es obligatorio"),
  model: Yup.string().required("El modelo es obligatorio"),
  serialNumber: Yup.string().required("El número de serie es obligatorio"),
  registration: Yup.string().required("La matrícula es obligatoria"),
  description: Yup.string().max(500, "Máximo 500 caracteres").required("La descripción es obligatoria"),
  totalTime: Yup.string().required("El tiempo total es obligatorio"),
  engineMakeModel: Yup.string().required("La marca/modelo del motor es obligatorio"),
  engineSerial: Yup.string().required("El número de serie del motor es obligatorio"),
  engineTime: Yup.string().required("Las horas del motor son obligatorias"),
  engineTBO: Yup.string().required("El TBO del motor es obligatorio"),
});

const initialValues = {
  contactName: "",
  contactEmail: "",
  contactPhone: "+",
  aircraftType: "",
  year: "",
  manufacturer: "",
  model: "",
  serialNumber: "",
  condition: "",
  registration: "",
  description: "",
  totalTime: "",
  airframeNotes: "",
  engineMakeModel: "",
  engineSerial: "",
  engineTime: "",
  engineTBO: "",
};

const SellAircraft = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Datos del formulario:", values);
    console.log("Imágenes seleccionadas:", selectedImages);
    // Lógica para enviar los datos a tu API
    setSubmitting(false);
    resetForm();
    setSelectedImages([]);
  };

  const handleImageChange = (e) => {
    const allFiles = Array.from(e.target.files);
    let files = allFiles;
    if (allFiles.length > 10) {
      alert("Puedes subir un máximo de 10 archivos. Solo se utilizarán los primeros 10 archivos.");
      files = allFiles.slice(0, 10);
    }
    setSelectedImages(files);
  };

  const handleTextareaInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="sell-aircraft-page animate__animated animate__fadeInUp">
      <div className="sell-aircraft-container">
        <h1>Vende tu Aeronave</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="sell-aircraft-form">
              {/* Personal Information Section (custom because of radio fields) */}
              <section className="form-section">
                <h2>Información Personal</h2>
                <div className="form-group">
                  <label htmlFor="contactName">Nombre</label>
                  <Field type="text" name="contactName" placeholder="Introduce tu nombre" />
                  <ErrorMessage name="contactName" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail">Correo Electrónico</label>
                  <Field type="email" name="contactEmail" placeholder="Introduce tu correo electrónico" />
                  <ErrorMessage name="contactEmail" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="contactPhone">Número de Teléfono</label>
                  <Field type="tel" name="contactPhone" placeholder="Ej: +56 9 30531580" />
                  <ErrorMessage name="contactPhone" component="div" className="error" />
                </div>
              </section>

              <section className="form-section">
                <h2>Condición</h2>
                <div className="form-group">
                  <div className="radio-group">
                    <label>
                      <Field type="radio" name="condition" value="new" />
                      Nuevo
                    </label>
                    <label>
                      <Field type="radio" name="condition" value="used" />
                      Usado
                    </label>
                  </div>
                  <ErrorMessage name="condition" component="div" className="error" />
                </div>
              </section>

              {/* Render sections using FieldSection */}
              <FieldSection sectionData={sellAircraftText.generalInfo} handleInput={handleTextareaInput} />
              <FieldSection sectionData={sellAircraftText.airframe} handleInput={handleTextareaInput} />
              <FieldSection sectionData={sellAircraftText.engine} handleInput={handleTextareaInput} />

              {/* Image Upload Section */}
              <section className="form-section">
                <h2>Subir Imágenes</h2>
                <div className="form-group">
                  <label htmlFor="aircraftImages">
                    Selecciona imágenes de tu aeronave (hasta 10)
                  </label>
                  <input type="file" id="aircraftImages" name="aircraftImages" accept="image/*" multiple onChange={handleImageChange} />
                </div>
              </section>

              <button type="submit" disabled={isSubmitting} className="submit-button">
                Enviar detalles de la aeronave
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SellAircraft;
