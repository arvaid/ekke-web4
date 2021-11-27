exports.findAll = async () => {
    return db.query("SELECT * FROM `Authors`");
}

exports.findById = async (id) => {
    return db.query("SELECT * FROM `Authors` WHERE `id` = ?", [id]);
}

exports.create = async (author) => {
    return db.execute("INSERT INTO `Authors` (`name`) VALUES (?)",
        [author.name]);
}

exports.update = async (id, author) => {
    return db.execute("UPDATE `Authors` SET `name` = ? WHERE `id` = ?",
        [author.name, id]);
}

exports.delete = async (id) => {
    return db.execute("DELETE FROM `Authors` WHERE `id` = ?", [id]);
}
