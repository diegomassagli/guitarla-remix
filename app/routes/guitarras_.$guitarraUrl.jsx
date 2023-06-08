import { useLoaderData } from '@remix-run/react'
import { getGuitarra } from '~/models/guitarras.server'
import styles from '~/styles/guitarras.css'

export async function loader({ params }) {
  const {guitarraUrl} = params
  const guitarra = await getGuitarra(guitarraUrl)  

  if(guitarra.data.length === 0) {
    throw new Response ('', {
      status: 404,
      statusText: 'Guitarra no Encontrada'
    })
  }

  return guitarra
}


export function meta({  data, matches }) {  /* el data es algo de remix y el segundo es de strapi*/
  let rootMeta = matches[0].meta;
  let viewport = rootMeta.find((m) => m.name);

  if (!data) {
    return [
      {
        viewport,
        title: 'GuitarLA - Guitarra No encontrada',
        description: `Guitarras, venta de guitarras, guitarra no encontrada`
      }
    ]
  }

  return [
    {
      viewport,
      title: `GuitarLA - ${data.data[0].attributes.nombre}`,
      description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
    }
  ]
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}


function Guitarra() {

  const guitarra = useLoaderData()
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes
  return (

  <main className='contenedor guitarra'>
    <img src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} className='imagen'/>

    <div className="contenido">
      <h3>{nombre}</h3>
      <p className="texto">{descripcion}</p>
      <p className="precio">${precio}</p>

      <form className='formulario'>
        <label>Cantidad</label>
        <select>
          <option value="">--Seleccione--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>

        </select>
      </form>

    </div>
  </main>

  )
}

export default Guitarra
