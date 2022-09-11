import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout  from "./layout/Layout";
import Inicio from './paginas/Inicio'
import EditarCliente from './paginas/EditarCliente'
import NuevoCliente from './paginas/NuevoCliente'
import Detalles from './paginas/Detalles'


function App() {
  

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/clientes" element={<Layout />}>
                <Route index element={<Inicio />} />
                <Route path="nuevo" element={<NuevoCliente />} />
                <Route path="editar/:id" element={<EditarCliente />} />
                <Route path=":id" element={<Detalles />} />
            </Route>
        </Routes>       
    </BrowserRouter>
  )
}

export default App
