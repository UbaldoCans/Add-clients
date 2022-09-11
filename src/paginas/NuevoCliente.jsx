import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
    
      <>
         <h1 className='font-black text-4xl text-slate-500 uppercase'>Nuevo cliente</h1>
         <p className='mt-3'>Llena los siguientes campos para agregar un nuevo cliente</p>
    

         <Formulario />
      </>
  )
}

export default NuevoCliente
