import { useLoaderData, Outlet  } from '@remix-run/react'
import { getPosts } from '~/models/posts.server'
import styles from '~/styles/blog.css'
import ListadoPosts from '~/components/listado-posts'


export function links() {
  return [
    {
      rel:'stylesheet',
      href: styles
    }
  ]
}


export async function loader() {
  const posts = await getPosts()
  return posts.data
}


const Blog = () => {

  const posts = useLoaderData()

  return (
    <main className="contenedor">
      <ListadoPosts
        posts={posts}
      />

      <Outlet />
    </main>
  )
}

export default Blog