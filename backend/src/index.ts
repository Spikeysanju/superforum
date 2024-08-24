import { Hono } from 'hono'
// import { cors } from 'hono/cors'
const app = new Hono().basePath('/api')

// app.use(
//   '/api/*',
//   cors({
//     origin: 'http://localhost:5173',
//     allowMethods: ['POST', 'GET', 'PUT', 'DELETE'],
//     allowHeaders: ['Content-Type', 'Accept'],
//     maxAge: 86400
//   })
// )

// Dummy data
let forumPosts = [
  { id: '1', title: 'First Post', content: 'This is the first post' },
  { id: '2', title: 'Second Post', content: 'This is the second post' }
]

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// create a forum post
app.post('/forum', async (c) => {
  const { title, content } = await c.req.json()
  const id = (forumPosts.length + 1).toString()
  const newPost = { id, title, content }
  forumPosts.push(newPost)
  return c.json(newPost)
})

// get a forum post
app.get('/forum/:id', (c) => {
  const id = c.req.param('id')
  const post = forumPosts.find(p => p.id === id)
  if (post) {
    return c.json(post)
  } else {
    return c.json({ error: 'Post not found' }, 404)
  }
})

// update a forum post
app.put('/forum/:id', async (c) => {
  const id = c.req.param('id')
  const { title, content } = await c.req.json()
  const postIndex = forumPosts.findIndex(p => p.id === id)
  if (postIndex !== -1) {
    forumPosts[postIndex] = { id, title, content }
    return c.json(forumPosts[postIndex])
  } else {
    return c.json({ error: 'Post not found' }, 404)
  }
})

// delete a forum post
app.delete('/forum/:id', (c) => {
  const id = c.req.param('id')
  const postIndex = forumPosts.findIndex(p => p.id === id)
  if (postIndex !== -1) {
    const deletedPost = forumPosts.splice(postIndex, 1)
    return c.json(deletedPost[0])
  } else {
    return c.json({ error: 'Post not found' }, 404)
  }
})

// get all forum posts
app.get('/forum', (c) => {
  return c.json(forumPosts)
})


// delete all forum posts
app.delete('/forum', (c) => {
  forumPosts = []
  return c.json({ message: 'All posts deleted' })
})

export default app