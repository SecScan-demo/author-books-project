import { db } from "../src/utils/db.server"

type Author = {
  firstName: string
  lastName: string
}

type Book = {
  title: string
  isFiction: boolean
  datePublished: Date
}

async function seed() {
  await Promise.all(
    getAuthors().map(author => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      })
    })
  )
  const author = await db.author.findFirst({
    where: {
      firstName: "John",
    },
  })

  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, datePublished } = book
      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: author.id,
        },
      })
    })
  )
}

seed()

function getAuthors(): Array<Author> {
  return [
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "Ruskin",
      lastName: "Bond",
    },
    {
      firstName: "Kevin",
      lastName: "Mitnick",
    },
  ]
}

function getBooks(): Array<Book> {
  return [
    {
      title: "Hackers 101",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "Phishing for gummies",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "How to get started with hacking",
      isFiction: true,
      datePublished: new Date(),
    },
  ]
}
