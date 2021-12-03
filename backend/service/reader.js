exports.findAll = async () => {
    return db.query("SELECT `id`, `name`, DATE_FORMAT(`registration_date`, '%Y-%m-%d %H:%i:%s') as `registration_date` FROM `Readers`");
}

exports.findById = async (id) => {
    return db.query("SELECT `id`, `name`, DATE_FORMAT(`registration_date`, '%Y-%m-%d %H:%i:%s') as `registration_date` FROM `Readers` WHERE `id` = ?", [id]);
}

exports.create = async (reader) => {
    return db.execute("INSERT INTO `Readers` (`name`, `registration_date`) VALUES (?, ?)",
        [reader.name, reader.registration_date]);
}

exports.update = async (id, reader) => {
    return db.execute("UPDATE `Readers` SET `name` = ?, `registration_date` = ? WHERE `id` = ?",
        [reader.name, reader.registration_date, id]);
}

exports.delete = async (id) => {
    return db.execute("DELETE FROM `Readers` WHERE `id` = ?", [id]);
}
