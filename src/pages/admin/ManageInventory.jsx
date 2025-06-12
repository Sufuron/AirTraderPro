import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FieldSection from '../../components/FieldSection';
import sellAircraftText from '../../data/sellAircraftText';
import './ManageInventory.css';
import { collection, addDoc, updateDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

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
  const [planes, setPlanes] = useState([]);
  const [editingPlane, setEditingPlane] = useState(null);
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    const fetchPlanes = async () => {
      const snapshot = await getDocs(collection(db, 'planes'));
      setPlanes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPlanes();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let docRef;
      if (editingPlane) {
        docRef = doc(db, 'planes', editingPlane.id);
        await updateDoc(docRef, values);
      } else {
        docRef = await addDoc(collection(db, 'planes'), values);
      }

      const imageUrls = [];
      for (const image of selectedImages) {
        const id = editingPlane ? editingPlane.id : docRef.id;
        const imageRef = ref(storage, `planes/${id}/${image.name}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }

      // Store the image URLs in the document
      if (imageUrls.length) {
        await updateDoc(docRef, {
          imageUrls: editingPlane && editingPlane.imageUrls
            ? [...editingPlane.imageUrls, ...imageUrls]
            : imageUrls,
        });
      }

      alert(editingPlane ? 'Aeronave actualizada' : 'Aeronave agregada exitosamente.');
      resetForm();
      setSelectedImages([]);
      setEditingPlane(null);
      const snapshot = await getDocs(collection(db, 'planes'));
      setPlanes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      alert('Error al subir la aeronave: ' + error.message);
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

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'planes', id));
    const snapshot = await getDocs(collection(db, 'planes'));
    setPlanes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleEdit = (plane) => {
    setEditingPlane(plane);
    setFormValues({
      ...plane,
    });
  };

  return (
    <div className="manage-inventory-page">
      <div className="manage-inventory-container">
        <h1>Gestionar Inventario</h1>
        <Formik
          initialValues={formValues}
          enableReinitialize
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
                {editingPlane ? 'Actualizar Aeronave' : 'Guardar Aeronave'}
              </button>
            </Form>
          )}
        </Formik>
        <h2>Aeronaves Existentes</h2>
        <ul className="admin-list">
          {planes.map((p) => (
            <li key={p.id}>
              {p.manufacturer} {p.model} ({p.year})
              <button type="button" onClick={() => handleEdit(p)}>Editar</button>
              <button type="button" onClick={() => handleDelete(p.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageInventory;
