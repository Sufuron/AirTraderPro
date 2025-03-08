// src/components/FieldSection.jsx
import React from "react";
import { Field, ErrorMessage } from "formik";

const FieldSection = ({ sectionData, handleInput }) => {
  return (
    <section className="form-section">
      <h2>{sectionData.title}</h2>
      {sectionData.fields.map((field) => (
        <div className="form-group" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === "textarea" ? (
            <Field
              as="textarea"
              name={field.name}
              id={field.name}
              placeholder={field.placeholder}
              rows={field.rows}
              maxLength={field.maxLength}
              onInput={handleInput}
            />
          ) : (
            <Field
              type={field.type}
              name={field.name}
              id={field.name}
              placeholder={field.placeholder}
            />
          )}
          <ErrorMessage name={field.name} component="div" className="error" />
        </div>
      ))}
    </section>
  );
};

export default FieldSection;
