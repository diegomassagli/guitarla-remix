
// export async function loader() {    //esto corre en el servidor. se llama automaticamente al poner el export sin agregarla en el main como router-dom
//   const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`)    // esto se ejecuta cuando el componente carga y el action al enviar un formulario
//   const resultado = await respuesta.json()            // si lo dejaba como localhost daba error...
//   return {}                                                 // ideal para cargar informacion desde apis porque se ejecuta en el servidor
// }

import { useLoaderData, Outlet } from '@remix-run/react'
import { getGuitarras } from '~/models/guitarras.server'
import styles from '~/styles/guitarras.css'
import ListadoGuitarras from '../components/listado-guitarras'

export function meta() {
  return [
    {title: 'GuitarLA - Tienda de Guitarras'},
    {description: 'GuitarLA - Nuestra coleccion de guitarras'}
  ]
}

export function links() {
  return [
    {
      rel: ' stylesheet',
      href: styles
    }
  ]
}


export async function loader() {
  const guitarras = await getGuitarras()
  console.log(guitarras)
  return guitarras.data
}


const Tienda = () => {
  
  const guitarras = useLoaderData()

  return (
    <main className='contenedor'>
      <ListadoGuitarras 
        guitarras={guitarras}
      />

      <Outlet />
    </main>
  )
}

export default Tienda
