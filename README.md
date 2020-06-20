# Book-Store REST API

REST determines how the API looks like. It stands for ```Representational State Transfer```. It is the set of rules that developers follow when they create their API.

* This is an API designed for book store for authors to maintain their books.
* It includes some `protected routes` for specific users(Author) to perform some tasks of create, update and delete (unpublish) the books.
* The service is accesed through various requests which includes `GET`, `PUT`, `POST`, `DELETE`.
* Any user has access to get all book's lists and can have a particular book by id.
* Here, `JSON Web Token`(JWT) is used to authenticate the users and signin.
* `Cookies` are used to store JWT for maintaining the states of user.
* `uud/v1` id used for generating secure password and encrypted using `sha256` using concept of `salt`
* `binary data` is also managed in here for storing directly in database, for instance, book-cover image will be stored in binary form, similary mp3, mp4, PDFs, etc. can be managed.
