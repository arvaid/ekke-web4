exports.findAll = async () => {
    return db.query("SELECT b.isbn, b.title, a.id, a.name FROM `Books` b INNER JOIN `Authors` a ON b.author = a.id");
}

exports.findByISBN = async (isbn) => {
    return db.query("SELECT b.isbn, b.title, a.id, a.name FROM `Books` b INNER JOIN `Authors` a ON b.author = a.id WHERE `isbn` = ?",
        [isbn]);
}

exports.create = async (book) => {
    return db.execute("INSERT INTO `Books` (`isbn`, `title`, `author`) VALUES (?, ?, ?)",
        [book.isbn, book.title, book.author]);
}

exports.update = async (isbn, book) => {
    return db.execute("UPDATE `Books` SET `title` = ?, `author` = ? WHERE `isbn` = ?",
        [book.title, book.author, isbn]);
}

exports.delete = async (isbn) => {
    return db.execute("DELETE FROM `Books` WHERE `isbn` = ?", [isbn]);
}
