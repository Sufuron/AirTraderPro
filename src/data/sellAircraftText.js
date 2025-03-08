// src/data/sellAircraftText.js
const sellAircraftText = {
    personalInfo: {
      title: "Información Personal",
      fields: [
        {
          name: "contactName",
          label: "Nombre",
          placeholder: "Introduce tu nombre",
          type: "text",
        },
        {
          name: "contactEmail",
          label: "Correo Electrónico",
          placeholder: "Introduce tu correo electrónico",
          type: "email",
        },
        {
          name: "contactPhone",
          label: "Número de Teléfono",
          placeholder: "Ej: +56 9 30531580",
          type: "tel",
        },
      ],
    },
    generalInfo: {
      title: "Información General",
      fields: [
        {
          name: "price",
          label: "Precio",
          placeholder: "Introduce el precio",
          type: "text",
        },
        {
          name: "aircraftType",
          label: "Tipo de Aeronave",
          placeholder: "p.ej., Jet, Turbohélice, Pistón",
          type: "text",
        },
        {
          name: "year",
          label: "Año",
          placeholder: "p.ej., 2020",
          type: "number",
        },
        {
          name: "manufacturer",
          label: "Fabricante",
          placeholder: "Introduce el fabricante",
          type: "text",
        },
        {
          name: "model",
          label: "Modelo",
          placeholder: "Introduce el modelo",
          type: "text",
        },
        {
          name: "serialNumber",
          label: "Número de Serie",
          placeholder: "Introduce el número de serie",
          type: "text",
        },
        {
          name: "registration",
          label: "Matrícula",
          placeholder: "Introduce el número de matrícula",
          type: "text",
        },
        {
          name: "description",
          label: "Descripción",
          placeholder: "Describe tu aeronave",
          type: "textarea",
          rows: 4,
          maxLength: 500,
        },
        // You might handle the "condition" field separately since it's a radio group.
      ],
    },
    airframe: {
      title: "Estructura",
      fields: [
        {
          name: "totalTime",
          label: "Horas Totales",
          placeholder: "Introduce el tiempo total de vuelo",
          type: "text",
        },
        {
          name: "airframeNotes",
          label: "Notas de la Estructura",
          placeholder: "Introduce las notas (si aplica)",
          type: "textarea",
          rows: 3,
        },
      ],
    },
    engine: {
      title: "Motor",
      fields: [
        {
          name: "engineMakeModel",
          label: "Marca/Modelo del Motor",
          placeholder: "Introduce la marca/modelo del motor",
          type: "text",
        },
        {
          name: "engineSerial",
          label: "Número de Serie del Motor",
          placeholder: "Introduce el número de serie del motor",
          type: "text",
        },
        {
          name: "engineTime",
          label: "Horas del Motor",
          placeholder: "Introduce las horas del motor",
          type: "text",
        },
        {
          name: "engineTBO",
          label: "TBO del Motor",
          placeholder: "Introduce el TBO del motor",
          type: "text",
        },
      ],
    },
  };
  
  export default sellAircraftText;
  