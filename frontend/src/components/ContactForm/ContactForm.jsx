import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import ContactInfo from "../ContactInfo/ContactInfo";

const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    email: Yup.string().email("Email invalido").required("El email es requerido"),
    celular: Yup.string().matches(/^[0-9]+$/, "El celular debe contener solo numeros").required("El numero de celular es requerido"),
    comentario: Yup.string("Deje aqui su comentario (opcional)")
})


function ContactForm() {

    const handleSubmit = (values, { resetForm }) => {
        const serviceId = "service_2gdvmew";
        const templateId = "template_tsik6fq";
        const publicKey = "VOtZ2pP1lPkiDKm73";

        emailjs.send(serviceId, templateId, {
            to_name: "FoodStack",
            from_name: values.nombre + " " + values.apellido,
            from_email: values.email,
            message: values.comentario,
            phone: values.celular,
            subject: "Nueva reseña del restaurante"
        }, publicKey)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Formulario completado correctamente",
                text: "Tu mensaje ha sido enviado",
                position: "top-center",
                showConfirmButton: false,
                timer: 3000, 
                timerProgressBar: true,
            });
            resetForm();
        }, 
        (error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Algo ha ocurrido",
                position: "top-end",
                showConfirmButton: false,
                timer: 3000, 
                timerProgressBar: true,
            });
            console.log("Emailjs error: ", error);
        }
    )
    }
  return (
    
    <div className="my-5 p-2">
      <h2 className='text-center mb-5 text-uppercase fw-bold fs-1'>Reseñas</h2>
      <div className="row">
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <ContactInfo />
        </div>
        
        <div className="col-lg-6 d-flex justify-content-center">
        <Formik
            initialValues={{
              nombre: '',
              apellido: '',
              email: '',
              celular: '',
              comentario: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="w-100">
                <div className="row mb-3 mt-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName">Nombre</label>
                    <Field
                      type="text"
                      id="nombre"
                      name="nombre"
                      className={`form-control ${
                        errors.nombre && touched.nombre ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage component="div" name="nombre" className="invalid-feedback" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="apellido">Apellido</label>
                    <Field
                      type="text"
                      id="apellido"
                      name="apellido"
                      className={`form-control ${
                        errors.apellido && touched.apellido ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage component="div" name="apellido" className="invalid-feedback" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${
                        errors.email && touched.email ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage component="div" name="email" className="invalid-feedback" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone">Celular</label>
                    <Field
                      type="tel"
                      id="celular"
                      name="celular"
                      className={`form-control ${
                        errors.celular && touched.celular ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage component="div" name="celular" className="invalid-feedback" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="comentario">Comentarios</label>
                  <Field
                    as="textarea"
                    id="comentario"
                    name="comentario"
                    className={`form-control ${
                      errors.comentario && touched.comentario ? 'is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage component="div" name="comentario" className="invalid-feedback" />
                </div>
                <button type="submit" className="btn btn-danger btn-lg">
                  Enviar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
