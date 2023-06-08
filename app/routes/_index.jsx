import { getGuitarras } from '~/models/guitarras.server'
import { getPosts } from '~/models/posts.server'
import { getCurso } from '~/models/curso.server'
import { useLoaderData }  from '@remix-run/react'
import ListadoGuitarras from '~/components/listado-guitarras'
import ListadoPosts from '~/components/listado-posts'
import Curso from '~/components/curso'
import stylesGuitarras from '~/styles/guitarras.css'
import stylesPosts from '~/styles/blog.css'
import stylesCurso from '~/styles/curso.css'

export function meta(){
  return([
      {charset:'utf-8'},
      {title:'Guitar Remix'},
      {viewport:'width=device-width,initial-scale=1'}
  ]
  )
}


export function links() {
  return [
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylesPosts
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

export async function loader() {
  // si lo dejo como esta abajo, cuando termine de cargar guitarras, carga post (ideal para autenticacion, pero para esto no...)
  // const guitarras = await getGuitarras()
  
  // const posts = await getPosts()
  // por eso lo hago asi  --> que tiene mejor performance...

  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ])
 
  //console.log(curso)
 
  return { 
    guitarras: guitarras.data, 
    posts: posts.data,
    curso: curso.data
  }
}

function Index() {

  const {guitarras, posts, curso} = useLoaderData();

  return (
    <>
      <main className='contenedor'>
        <ListadoGuitarras 
          guitarras={guitarras}
        />
      </main>

      <Curso
        curso={curso.attributes}
      />

      <section className='contenedor'>
        <ListadoPosts
          posts={posts}
        />
      </section>
    </>
  )
}
export default Index
