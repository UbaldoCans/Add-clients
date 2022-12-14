import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

 const [clientes, setClientes] = useState([]) 

  useEffect (() => {
    const obtenerClientesApi = async () =>{
       try {
          const url = import.meta.env.VITE_API_KEY
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()

          setClientes(resultado)

       } catch (error) {
         console.log(error)
       }
    }
    obtenerClientesApi()
  }, [])
  
 const handleEliminar = async id => {
     const confirmar = confirm('deceas eliminar este cliente')
     if(confirmar){
      try {
        const url = `${import.meta.env.VITE_API_KEY}/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })
        await respuesta.json()
        
        const arrayClientes = clientes.filter( cliente => cliente.id !== id)
        setClientes(arrayClientes)

      } catch (error) {
        console.log(error)
      }
     }
 }

  return (
    <>
      
        <h1 className='font-black text-4xl text-slate-500 uppercase'>Clientes</h1>
        <p className='mt-3'>Administra tus clientes</p>
          

      <table className='w-full mt-5 table-auto shadow bg-gray-100'>
          <thead className='bg-slate-500 text-white'>
              <tr>
                  <th className='p-2'>Nombre</th>
                  <th className='p-2'>Contacto</th>
                  <th className='p-2'>Empresa</th>
                  <th className='p-2'>Acciones</th>
              </tr>
          </thead>

          <tbody>
              {clientes.map( cliente => (
                   <Cliente 
                      key={cliente.id}
                      cliente={cliente}  
                      handleEliminar={handleEliminar}                 
                   />
              ))} 
          </tbody>

      </table>
    </>
  )
}

export default Inicio
