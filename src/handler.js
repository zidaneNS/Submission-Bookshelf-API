const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (req, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };

  if (name) {
    if (readPage <= pageCount) {
      books.push(newBook);
    } else {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      }).code(400);
    }
  } else {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400);
  }


  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    }).code(201);
  }
};

const getAllBooksHandler = (req, h) => {
  const reading = req.query.reading;

  if (reading) {
    if (reading === 1) {
      const readingBooks = books.filter((book) => book.reading === true);
      const displayBooks = readingBooks.map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher
        };
      });

      return h.response({
        status: 'success',
        data: {
          books: displayBooks
        }
      });

    } else {
      const unreadingBooks = books.filter((book) => book.reading === false);
      const displayBooks = unreadingBooks.map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher
        };
      });
      return h.response({
        status: 'success',
        data: {
          books: displayBooks
        }
      });
    }
  } else {

    if (books.length>0) {
      const displayBooks = books.map((book)=>{
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher
        };
      });

      return h.response({
        status: 'success',
        data: {
          books: displayBooks
        }
      });
    } else {
      return h.response({
        status: 'success',
        data: {
          books
        }
      });
    }
  }

};

const getBookByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const selectedBook = books.find((book)=>book.id === bookId);

  if (selectedBook) {
    return h.response({
      status: 'success',
      data: {
        book: selectedBook
      }
    });
  } else {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    }).code(404);
  }
};

const editBookHandler = (req, h) => {
  const { bookId } = req.params;

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

  if (name) {
    if (readPage <= pageCount) {
      const updatedAt = new Date().toISOString();

      const index = books.findIndex((book) => book.id === bookId);

      if (index != -1) {
        books[index] = {
          ...books[index],
          name,
          year,
          author,
          summary,
          publisher,
          pageCount,
          readPage,
          reading,
          updatedAt
        };

        return h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui'
        });
      } else {
        return h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan'
        }).code(404);
      }

    } else {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      }).code(400);
    }
  } else {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    }).code(400);
  }


};

const deleteBookHandler = (req, h) => {
  const { bookId } = req.params;

  const index = books.findIndex((book) => book.id === bookId);
  if (index != -1) {
    books.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  }).code(404);

};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookHandler, deleteBookHandler };