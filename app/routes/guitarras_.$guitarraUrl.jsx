import { useState } from 'react'
import { useLoaderData, useOutletContext } from '@remix-run/react'
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
  const data = useOutletContext()  // son dos formas distintas de extraer la info
  console.log(data)

  const [ cantidad, setCantidad ] = useState(0);
  const guitarra = useLoaderData()
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes

  const handleSubmit = e => {
    e.preventDefault();
    if(cantidad < 1) {
      alert("debes selecconar una cantidad")
      return
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,   // como es igual "nombre" se puede obviar
      precio, 
      cantidad
    }

    data.agregarCarrito(guitarraSeleccionada)

  }

  //console.log(auth)

  return (

  <main className='contenedor guitarra'>
    <img src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} className='imagen'/>

    <div className="contenido">
      <h3>{nombre}</h3>
      <p className="texto">{descripcion}</p>
      <p className="precio">${precio}</p>

      <form onSubmit={handleSubmit} className='formulario'>
        <label htmlFor='cantidad'>Cantidad</label>
        <select 
          onChange={ e=> setCantidad(parseInt(e.target.value))}  // con esto convierto a numero y tambien si hago +e.target.value  (el signo mas lo convierte)
          id='cantidad'
        >
          <option value="0">--Seleccione--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input type="submit" value="Agregar al carrito" />
      </form>

    </div>
  </main>

  )
}

export default Guitarra
