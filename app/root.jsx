import { useState, useEffect } from 'react'
import {
  Meta,
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


<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet"></link>


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

  const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
  const [ carrito, setCarrito ] = useState(carritoLS)


  useEffect( () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])


  const agregarCarrito = guitarra => {
    if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {  //some es un array method y returno true si al menos 1 elemento cumple la condicion      
      // iterar sobre el arreglo e identificar el elemento duplicado...
      const carritoActualizado = carrito.map( guitarraState => {
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
        context={{
          agregarCarrito,
          carrito,
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