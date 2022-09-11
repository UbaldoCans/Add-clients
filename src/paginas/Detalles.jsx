import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const Detalles = () => {
 
   const [cliente, setCliente] = useState({})
   const [cargando, setCargando] = useState(false)

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
        
       
     }

     obtenerClienteApi()

   }, [])

  return (
   
    cargando ? <p>cargando...</p> : Object.keys(cliente).length === 0 ? <p>sin resultados</p> : (

        <div>

            <>
                <h1 className='font-black text-4xl text-slate-500'>Cliente: {cliente.nombre}</h1>
                <p className='mt-3'>Detalles del cliente</p>
                
                {cliente.nombre && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className=' text-gray-800 uppercase font-bold'>Cliente: </span>
                            {cliente.nombre}
                        </p>
                )}

                {cliente.email && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className=' text-gray-800 uppercase font-bold'>Email: </span>
                            {cliente.email}
                        </p>
                )}

                {cliente.telefono && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className=' text-gray-800 uppercase font-bold'>Telefono: </span>
                            {cliente.telefono}
                        </p>
                )}

                {cliente.empresa && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className=' text-gray-800 uppercase font-bold'>Empresa: </span>
                            {cliente.empresa}
                        </p>
                )}

                {cliente.notas &&(
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className=' text-gray-800 uppercase font-bold'>Notas: </span>
                            {cliente.notas}
                        </p>
                )} 
            </>        
          
        </div>
    )
  )
}

export default Detalles
