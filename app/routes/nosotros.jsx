import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta( { matches } ) {
  let rootMeta = matches[0].meta;
  let charset = rootMeta.find((m) => m.charset);
  let viewport = rootMeta.find((m) => m.name);
  return (
    [
      charset,
      viewport,
      {title: 'GuitarLA - Sobre Nosotros'},
      {description: 'Venta de guitarras, blog de musica'}
    ]
  )
}


export function links() {  // esto agrega una "hoja de estilo particular para esa pagina" a las generales que ya tenia por defecto
  return (
    [
      {
        rel: 'stylesheet', 
        href: styles
      },
      {
        rel: 'preload', 
        href: imagen, 
        as: 'image'
      }    //le indico que cargue la imagen pesada tan pronto como pueda
    ]
  )
}

const Nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="Imagen sobre nosotros" />

        <div>
          <p>Suspendisse vel orci finibus sapien tincidunt dictum. Suspendisse sodales vestibulum erat, vel ornare elit luctus non. Cras congue libero ut lacus scelerisque imperdiet. Duis quis viverra tellus, et viverra lacus. Maecenas efficitur suscipit consectetur. Cras ullamcorper, justo a viverra tempus, erat felis viverra ligula, ut lacinia lacus arcu sit amet est. Ut sed velit quis nisi malesuada vestibulum vitae sit amet nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas et tincidunt orci. Vivamus mattis accumsan dapibus. Nulla iaculis eget metus ut rhoncus</p>

          <p>Suspendisse vel orci finibus sapien tincidunt dictum. Suspendisse sodales vestibulum erat, vel ornare elit luctus non. Cras congue libero ut lacus scelerisque imperdiet. Duis quis viverra tellus, et viverra lacus. Maecenas efficitur suscipit consectetur. Cras ullamcorper, justo a viverra tempus, erat felis viverra ligula, ut lacinia lacus arcu sit amet est. Ut sed velit quis nisi malesuada vestibulum vitae sit amet nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas et tincidunt orci. Vivamus mattis accumsan dapibus. Nulla iaculis eget metus ut rhoncus</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros
