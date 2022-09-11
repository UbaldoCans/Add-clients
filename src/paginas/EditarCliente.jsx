import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Formulario from "../components/Formulario"


const EditarCliente = () => {
 
   const [cliente, setCliente] = useState({})
   const [cargando, setCargando] = useState(true)
   const { id } = useParams()
   
   useEffect(() => {

     const obtenerClienteApi = async () => {
        try {
            const url = `${import.meta.env.VITE_API_KEY}/${id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            setCliente(resultado)

        } catch (error) {
            console.log(error)
        }
        
       setCargando(!cargando)
     }

     obtenerClienteApi()

   }, [])

  return (
    <>
         <h1 className='font-black text-4xl text-slate-500 uppercase'>Editar cliente</h1>
            {cliente?.nombre ? (
               <Formulario 
                  cliente={cliente}
                  cargando={cargando}
               />
         ): 'Cliente no encontado'}
         
      </>
  )
}

export default EditarCliente
