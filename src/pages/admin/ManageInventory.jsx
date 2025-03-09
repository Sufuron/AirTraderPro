import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FieldSection from '../../components/FieldSection';
import sellAircraftText from '../../data/sellAircraftText';
import './ManageInventory.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  aircraftType: Yup.string().required("El tipo de aeronave es obligatorio"),
  price: Yup.string().required("El precio es obligatorio"),
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
  condition: Yup.string().required("La condición es obligatoria"),
});

const initialValues = {
  price: "", 
  aircraftType: "",
  year: "",
  manufacturer: "",
  model: "",
  serialNumber: "",
  registration: "",
  description: "",
  totalTime: "",
  airframeNotes: "",
  engineMakeModel: "",
  engineSerial: "",
  engineTime: "",
  engineTBO: "",
  condition: "",
};

const ManageInventory = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    selectedImages.forEach((image) => formData.append("images", image));

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Acceso denegado. Por favor inicia sesión.");
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('https://your-backend-service.up.railway.app/api/planes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Aeronave agregada exitosamente.');
        resetForm();
        setSelectedImages([]);
      } else {
        const errorText = await response.text();
        alert('Error al subir la aeronave: ' + errorText);
      }
    } catch (error) {
      alert('Error al conectar con el servidor: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    let files = Array.from(e.target.files).slice(0, 10);
    setSelectedImages(files);
  };

  const handleTextareaInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="manage-inventory-page">
      <div className="manage-inventory-container">
        <h1>Gestionar Inventario</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="manage-inventory-form">
              <FieldSection sectionData={sellAircraftText.generalInfo} handleInput={handleTextareaInput} />
              <FieldSection sectionData={sellAircraftText.airframe} handleInput={handleTextareaInput} />
              <FieldSection sectionData={sellAircraftText.engine} handleInput={handleTextareaInput} />

              <section className="form-section">
                <h2>Condición</h2>
                <div className="form-group">
                  <div className="radio-group">
                    <label>
                      <Field type="radio" name="condition" value="new" /> Nuevo
                    </label>
                    <label>
                      <Field type="radio" name="condition" value="used" /> Usado
                    </label>
                  </div>
                  <ErrorMessage name="condition" component="div" className="error" />
                </div>
              </section>

              <section className="form-section">
                <h2>Subir Imágenes</h2>
                <div className="form-group">
                  <label htmlFor="aircraftImages">Selecciona imágenes de la aeronave (hasta 10)</label>
                  <input type="file" id="aircraftImages" accept="image/*" multiple onChange={handleImageChange} />
                </div>
              </section>

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                Guardar Aeronave
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ManageInventory;
