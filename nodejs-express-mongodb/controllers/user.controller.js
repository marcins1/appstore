exports.allAccess = (req, res) => {
    res.status(200).send("Public content");
};
  
exports.userBoard = (req, res) => {
    res.status(200).send("Content for users");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Content for admins");
};