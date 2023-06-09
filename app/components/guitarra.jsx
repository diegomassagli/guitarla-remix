import { Link } from '@remix-run/react'


function  Guitarra({guitarra}) {

  const {descripcion, imagen, precio, url, nombre} = guitarra
// console.log(url)
  

  return (
    <div className="guitarra">
      <img src={imagen.data.attributes.formats.medium.url} alt={`Imagen guitarra ${nombre}`} />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <p className="precio">u$s{precio}</p>

        <Link className='enlace' to={`/guitarras/${url}`}>Ver Producto</Link>
      </div>
    </div>
  )
}

export default Guitarra
