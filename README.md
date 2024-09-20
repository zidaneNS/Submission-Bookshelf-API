# TODO lists
***
## Menyimpan Buku
* request line
```javascript
    {
        method: 'POST',
        path: '/books',
    }
```
* request body
```javascript
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```
* response body
```javascript
{
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}
```
***
* id from nanoid@3
* finished if (pagecount === readPage)
* insertedAt from new Date().toISOString()
* updatedAt = insertedAt
***
* if readPage > pageCount
* status code: 400
```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```
* if name property null
* status code: 400
```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```
* if response success
* status code : 201
```json
{
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookId": "1L7ZtDUFeGs7VlEt"
    }
}
```

## Menampilkan seluruh buku
* request line
```javascript
{
    method: 'GET',
    path: '/books'
}
```
* if reponse success
* status code: 200
```json
{
    "status": "success",
    "data": {
        "books": [
            {
                "id": "Qbax5Oy7L8WKf74l",
                "name": "Buku A",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "1L7ZtDUFeGs7VlEt",
                "name": "Buku B",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "K8DZbfI-t3LrY7lD",
                "name": "Buku C",
                "publisher": "Dicoding Indonesia"
            }
        ]
    }
}
```
or
```json
{
    "status": "success",
    "data": {
        "books": []
    }
}
```

## Menampilkan detail buku
* request line
```javascript
{
    method: 'GET',
    path: '/books/{bookId}'
}
```
* if response fail
* status code: 404
```json
{
    "status": "fail",
    "message": "Buku tidak ditemukan"
}
```
* if response success
* status code: 200
```json
{
    "status": "success",
    "data": {
        "book": {
            "id": "aWZBUW3JN_VBE-9I",
            "name": "Buku A Revisi",
            "year": 2011,
            "author": "Jane Doe",
            "summary": "Lorem Dolor sit Amet",
            "publisher": "Dicoding",
            "pageCount": 200,
            "readPage": 26,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
        }
    }
}
```

## Mengubah data buku
* request line
```javascript
{
    method: 'PUT',
    path: '/books/{bookId}'
}
```
* request body
```javascript
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```
* if name property null
* status code: 400
```json
{
    "status": "fail",
    "message": "Gagal memperbarui buku. Mohon isi nama buku"
}
```
* if readPage > pageCount
* status code: 400
```json
{
    "status": "fail",
    "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
}
```
* if id doesn't match
* status code: 404
```json
{
    "status": "fail",
    "message": "Gagal memperbarui buku. Id tidak ditemukan"
}
```
* if response success
* status code: 200
```json
{
    "status": "success",
    "message": "Buku berhasil diperbarui"
}
```
## Menghapus Buku
* request line
```javascript
{
    method: 'DELETE',
    path: '/books/{bookId}`
}
```
* if id doesn't match
* status code: 404
```json
{
    "status": "fail",
    "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```
* if response success
* status code: 200
```json
{
    "status": "success",
    "message": "Buku berhasil dihapus"
}
```