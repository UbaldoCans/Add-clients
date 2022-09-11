import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import Alerta from './Alerta'

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                   .min(4, 'Número de caracteres inválido')
                   .max(20, 'Exediste el número de caracteres')
                   .required('Este campo es obligatorio'),
        empresa: Yup.string()
                    .required('Este campo es obligatorio'),
        email: Yup.string()
                  .email('No se reconoce como email')
                  .required('Este campo es obligatorio'),  
        telefono: Yup.number()
                     .typeError('Caracteres no válidos')
                     .integer('Número no válido')
                     .positive('Número no válido'),
        notas: Yup.string()  

        
    })
 
    const handleSubmit = async (valores) => {
        try {
          let respuesta  
          if(cliente.id){

            const url =`${import.meta.env.VITE_API_KEY}/${cliente.id}`
            respuesta = await fetch (url, {
                 method:'PUT',
                 body: JSON.stringify(valores),
                 headers: {
                     'Content-Type': 'application/json'
                 }
             })
          }else{

            const url = import.meta.env.VITE_API_KEY
            respuesta = await fetch (url, {
                 method:'POST',
                 body: JSON.stringify(valores),
                 headers: {
                     'Content-Type': 'application/json'
                 }
             })
             
        }

            await respuesta.json()
            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
    }

  return (
    
        cargando ? 'cargando' : (
    
        <div className='bg-gray-300 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            <Formik
              initialValues={{
                nombre: cliente?.nombre ?? "",
                empresa: cliente?.empresa ?? "",
                email: cliente?.email ??"",
                telefono: cliente.telefono ?? "",
                notas: cliente?.notas ?? ""
              }}
              enableReinitialize={true}
              onSubmit={ async (values, {resetForm}) =>{
               await handleSubmit(values)
                resetForm()
              }}

              validationSchema={nuevoClienteSchema}

            >
                {({errors, touched}) => {
                    console.log(touched)
                    return(

                    <Form 
                        className="mt-10"
                    >
                        <div className="mb-4">
                            <label
                                className="text-gray-800"
                                htmlFor="nombre"
                            >Nombre</label>
                            <Field
                                id="nombre"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray--50"
                                placeholder="Nombre del cliente"
                                name="nombre"
                            />
                            
                            {errors.nombre && touched.nombre ? (
                                    <Alerta>
                                    { errors.nombre }
                                    </Alerta>
                            ): null }

                        </div>

                        <div className="mb-4">
                            <label
                                className="text-gray-800"
                                htmlFor="empresa"
                            >Empresa</label>
                            <Field
                                id="empresa"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray--50"
                                placeholder="Nombre del la empresa"
                                name="empresa"
                            />

                             
                            {errors.empresa && touched.empresa ? (
                                    <Alerta>
                                    { errors.empresa }
                                    </Alerta>
                            ): null }

                        </div>

                        <div className="mb-4">
                            <label
                                className="text-gray-800"
                                htmlFor="email"
                            >Email</label>
                            <Field
                                id="email"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray--50"
                                placeholder="Email del cliente"
                                name="email"
                            />
                            
                            {errors.email && touched.email ? (
                                    <Alerta>
                                    { errors.email }
                                    </Alerta>
                            ): null }
                            

                        </div>

                        <div className="mb-4">
                            <label
                                className="text-gray-800"
                                htmlFor="telefono"
                            >Telefono</label>
                            <Field
                                id="telefono"
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray--50"
                                placeholder="Telefono del cliente"
                                name="telefono"
                            />
                            
                            {errors.telefono && touched.telefono ? (
                                    <Alerta>
                                        { errors.telefono }
                                    </Alerta>
                            ): null }

                        </div>

                        <div className="mb-4">
                            <label
                                className="text-gray-800"
                                htmlFor="notas"
                            >Notas</label>
                            <Field
                                as="textarea"
                                id="notas"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray--50"
                                placeholder="Agrega algunas notas"
                                name="notas"
                            />
                        </div>

                        <input
                            className="mt-5 w-full bg-slate-500 p-3 text-white uppercase font-bold text-lg "   
                            type="submit"
                            value={cliente?.nombre ? 'Guardar' : 'Agregar'}              
                        />
                    </Form>
               )}}
            </Formik>
            
        </div>
        )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}


export default Formulario
