import { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill, { Quill } from 'react-quill-new';
import ImageResize from 'quill-image-resize-module-react';
import './ManageBlog.css';
import { collection, addDoc, updateDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

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
  const [imageFile, setImageFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [formValues, setFormValues] = useState(initialValues);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, 'blogPosts'));
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

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
  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
       let imageUrl = '';
      if (imageFile) {
        const imageRef = ref(storage, `blog/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }
      if (editingPost) {
        await updateDoc(doc(db, 'blogPosts', editingPost.id), {
          ...values,
          imageUrl: imageUrl || editingPost.imageUrl || '',
        });
        alert('Publicación actualizada');
      } else {
           await addDoc(collection(db, 'blogPosts'), {
          ...values,
          imageUrl,
        });
        alert('Publicación creada');
      }
      resetForm();
      setImageFile(null);
      setEditingPost(null);
      const snapshot = await getDocs(collection(db, 'blogPosts'));
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      alert('Error al crear la publicación: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'blogPosts', id));
    const snapshot = await getDocs(collection(db, 'blogPosts'));
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormValues({
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      content: post.content,
    });
  };

  return (
    <div className="admin-blog">
      <h2>Gestión de Blog</h2>
      <Formik
        initialValues={formValues}
        enableReinitialize
        validationSchema={BlogSchema}
        onSubmit={handleSubmit}
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

            <label>Imagen Principal</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

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
              {editingPost ? 'Actualizar' : 'Publicar'}
            </button>
          </Form>
        )}
      </Formik>
      <h3>Publicaciones Existentes</h3>
      <ul className="admin-list">
        {posts.map((p) => (
          <li key={p.id}>
            {p.title} - {p.date}
            <button type="button" onClick={() => handleEdit(p)}>Editar</button>
            <button type="button" onClick={() => handleDelete(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBlog;

