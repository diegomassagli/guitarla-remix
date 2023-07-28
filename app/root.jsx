import { useState, useEffect } from 'react'
import {
  Meta,           // lo importo para renderizar en el document o layuout este meta y se importa de react porque es para el Cliente
  Links,
  Outlet,
  Scripts,        // evita el flash al recargar
  LiveReload,      // renderiza sin recargar
  useRouteError,
  isRouteErrorResponse,
  Link
} from '@remix-run/react'

import styles from './styles/index.css'
import Header from '~/components/header'  // el caracter ~ segun tsconfig.json indica que parte desde App y de ahi me meto en las subcarpetas (en lugar del ../../)
import Footer from '~/components/footer'


export function meta() {
  return (
    [
      {charset: 'utf-8'},
      {title: 'GuitarLA - Remix'},
      {name: "viewport", content: "width=device-width,initial-scale=1" }    
    ]
  )
}


export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
    },
    
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: "true"
    }, 
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
    },

    {
      rel: 'stylesheet',
      href: styles
    }       
  ]
}


export default function App() {

// si no funciona probar este codigo: const carritoLS = typeof windows !== 'undefined' && JSON.parse(localStorage.getItem('carrito')) || [] 

  const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null  // aca como estoy previniendo errores para no perder carritos, y lo hago por fuera del UseEffect tengo que buscar la manera de saber si etoy en el servidor o no por es el typeof windows que es una forma de preguntar por "el navegador"
  const [ carrito, setCarrito ] = useState(carritoLS)                                                         // esto puede generar error de hidratacion porque el servidor no reconoce este cambio


  useEffect( () => {                                                   // esto fuerza que se ejecute 1 sola vez y en en Cliente ! sino lo pongo en useEffect intenta hacerlo en el servidor tambien
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])


  const agregarCarrito = guitarra => {
    if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {  //some es un array method y returno true si al menos 1 elemento cumple la condicion      
      // iterar sobre el arreglo e identificar el elemento duplicado...
      const carritoActualizado = carrito.map( guitarraState => {   // recordar que carrito.map devuelve un arreglo nuevo no toca el original
        if (guitarraState.id === guitarra.id) {
          // reescribir la cantidad
          guitarraState.cantidad = guitarra.cantidad  // tambien puedo hacer guitarraState.cantidad += guitarra.cantidad  (en ese caso la agrega)
        }
        return guitarraState
      }) 
      // Añadir al carrito
      setCarrito(carritoActualizado)
    } else {
      setCarrito([...carrito, guitarra])
    }
  }

  const actualizarCantidad = guitarra => {
    console.log(carrito)
    const carritoActualizado = carrito.map( guitarraState => {
      if(guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad
      }
      return guitarraState
    })
    setCarrito(carritoActualizado)
  }

  const eliminarGuitarra = id => {
    const carritoActualizado = carrito.filter( guitarraState => guitarraState.id !== id)
    setCarrito(carritoActualizado)
    // otra forma podria ser...
    // setCarrito( carrito.filter( guitarraState => guitarraState.id !== id) )
  }

  return (    
    <Document>
      <Outlet 
        context={{                       // agregando este context es la forma de pasar info, fx, etc a los componentes
          agregarCarrito,                // tener en cuenta que este context funciona en el primer nivel de routes y no en las anidadas
          carrito,                       // hay que volver a pasarlo con    context={useOutletContext()}
          actualizarCantidad,
          eliminarGuitarra
        }}
      />
    </Document>
  )
}

function Document({children}){
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

/** Manejo de Errores */

export function ErrorBoundary() {

  const error = useRouteError()
  
  if(isRouteErrorResponse(error)){
    return (
      <Document>
        <p className="error">{error.status} {error.statusText}</p>
        <Link className='error-enlace' to="/">Tal vez quieras volver a la pagina principal</Link>
      </Document>
    )
  }

}