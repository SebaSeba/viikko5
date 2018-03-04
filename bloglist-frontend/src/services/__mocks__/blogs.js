let token = null

const blogs = [
  {
    id: "erok342",
    title: "blog 1",
    author: "kirjailija 1",
    url: "www.1.fi",
    likes: 4,
    user: {
      _id: "23ojr",
      username: "Erkki",
      name: "perri"
    }
  },
  {
    id: "erok3erwer2",
    title: "blog 2",
    author: "kirjailija 2",
    url: "www.2.fi",
    likes: 3,
    user: {
      _id: "23ojr",
      username: "Erkki",
      name: "perri"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }