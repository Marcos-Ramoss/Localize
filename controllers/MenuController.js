class MenuController {
    showMenuPage(req, res) {
        const role = req.session.user ? req.session.user.role : null;
        res.render('menu-admin', { role });
    }
}

module.exports = { MenuController };

