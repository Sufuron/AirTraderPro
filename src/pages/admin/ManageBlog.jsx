import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill, { Quill } from 'react-quill-new';
import ImageResize from 'quill-image-resize-module-react';
import CustomImageBlot from '../../components/CustomImageBlot';
import './ManageBlog.css';

// Register the image resize module
Quill.register('modules/imageResize', ImageResize);

// Registrar fuentes personalizadas
const Font = Quill.import('formats/font');
Font.whitelist = [
  'arial',
  'times-new-roman',
  'courier-new',
  'georgia',
  'verdana',
  'roboto',
  'lato',
  'open-sans',
  'merriweather',
  'playfair-display',
  'montserrat'
];
Quill.register(Font, true);


// Validation schema for the blog form
const BlogSchema = Yup.object({
  title: Yup.string().required('Título obligatorio'),
  date: Yup.date().required('Fecha obligatoria'),
  excerpt: Yup.string().required('El extracto es obligatorio'),
  content: Yup.string().required('El contenido es obligatorio'),
});

// Initial values for the form
const initialValues = {
  title: '',
  date: '',
  excerpt: '',
  content: '',
};



const ManageBlog = () => {
  const quillRef = useRef(null);

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: Font.whitelist }], // Selector de fuentes
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video', 'code-block'],
      ['clean'],
    ],
    
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  };
  
  const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'script',
    'indent',
    'align',
    'color',
    'background',
    'link',
    'image',
    'video',
    'code-block',
    'customImage',
  ];
  
  return (
    <div className="admin-blog">
      <h2>Gestión de Blog</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={BlogSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log('Datos del blog:', values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <label>Título</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error" />

            <label>Fecha</label>
            <Field type="date" name="date" />
            <ErrorMessage name="date" component="div" className="error" />

            <label>Extracto</label>
            <Field as="textarea" name="excerpt" />
            <ErrorMessage name="excerpt" component="div" className="error" />

            <label>Contenido</label>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              modules={modules}
              formats={formats}
              onChange={(value) => setFieldValue('content', value)}
            />
            <ErrorMessage name="content" component="div" className="error" />

            <button className="submit-button" type="submit" disabled={isSubmitting}>
              Publicar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ManageBlog;

