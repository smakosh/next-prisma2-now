## Next + Prisma 2 + Now

Example using Next and Prisma

1. on `index.js`, I'm using `getStaticProps` to fetch users
2. on `posts.js`, I'm using `getServerSideProps` to fetch posts from Next API route `api/posts/`
3. on `api/posts.js`, that's a serverless function that fetches posts using Prisma client
