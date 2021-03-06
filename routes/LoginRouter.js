const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
// const validarLogin = require('../middlewares/auth');
const {check, validationResult, body} = require('express-validator');

router.use(function(req, res, next) {
    if(req.query._method == 'DELETE'){
        req.method = 'DELETE';
        req.url = req.path;
    }
    next();
})
    // login admin

router.get('/admin', LoginController.showLoginAdmin);
router.post('/admin', [
    check('email').isEmail().withMessage('Digite um email válido.'), 
    check('senha').isLength({min:6}).withMessage('A senha deve conter no mínimo 6 caracteres.')], 
    LoginController.logarAdmin);

    // login professor
router.get('/professor', LoginController.showLoginProfessor);
router.post('/professor', [
    check('email').isEmail().withMessage('Digite um email válido.'), 
    check('senha').isLength({min:6}).withMessage('A senha deve conter no mínimo 6 caracteres.')], 
    LoginController.logarProfessor);

    // login aluno

router.get('/aluno', LoginController.showLoginAluno);
router.post('/aluno', [
    check('email').isEmail().withMessage('Digite um email válido.'), 
    check('senha').isLength({min:6}).withMessage('A senha deve conter no mínimo 6 caracteres.')], 
    LoginController.logarAluno);

router.delete('/', LoginController.logout);

module.exports = router;