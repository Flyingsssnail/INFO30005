/**
 * http://usejsdoc.org/
 */

const database = require('./db');

function allUsersFile(req, res) {
	res.send(database);
};

function addUser(firstname, lastname) {
	database.push({'firstname':firstname, 'lastname':lastname});
};

module.exports = {allUsersFile, addUser};
