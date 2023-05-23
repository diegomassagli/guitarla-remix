import {
  Meta,
  Links,
  Outlet,
  Scripts,        // evita el flash al recargar
  LiveReload      // renderiza sin recargar
} from '@remix-run/react'

import styles from './styles/index.css'
import Header from '~/components/header'  // el caracter ~ segun tsconfig.json indica que parte desde App y de ahi me meto en las subcarpetas (en lugar del ../../)



export function meta() {
  return [
    {charset: 'utf-8'},
    {title: 'GuitarLA - Remix'},
    {name: "viewport", content: "width=device-width,initial-scale=1" }    
  ]
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
  return (    
    <Document>
      <Outlet />
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

        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}