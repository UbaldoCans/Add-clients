import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {
     
    const navigate = useNavigate()

    const { nombre, empresa, email, telefono, id} = cliente
  return (
    <tr className='border-b hover:bg-slate-200'>
        <td className='p-3'>{nombre}</td>
        <td className='p-3'>
            <p><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
            <p><span className='text-gray-800 uppercase font-bold'>Tel: </span>{telefono}</p>
        </td>
        <td className='p-3'>{empresa}</td>
        <td className='p-3'>
             <button
               type="button"
               className='bg-yellow-100 hover:bg-yellow-300 block w-full text-black p-2 m-2 uppercase font-bold text-xs '
               onClick={() => navigate(`/clientes/${id}`)}
             >Detalles</button>  

             <button
               type="button"
               className='bg-blue-100 hover:bg-blue-300 block w-full text-black p-2 m-2 uppercase font-bold text-xs '
               onClick={() => navigate(`/clientes/editar/${id}`)}
             >Editar</button>  

             <button
               type="button"
               className='bg-red-100 hover:bg-red-300 block w-full text-black p-2 m-2 uppercase font-bold text-xs '
               onClick={() => handleEliminar(id)}
             >Eliminar</button> 
        </td>
    </tr>
  )
}

export default Cliente
