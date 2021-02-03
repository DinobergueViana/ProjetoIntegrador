const session = require('express-session');
const { sequelize, Turma } = require('../../models');

const TurmaController = {
  index: async (req, res) => {
    let turmas = await Turma.findAll(
      {
          include: [
              {association: 'alunos', through: {atributes: 'matriculas'}},
              {association: 'professores_disciplinas', through: {atributes: 'turmas_professores_disciplinas'}, include: 'professor'}
          ]
      });
    res.status(200).json(turmas)
    // res.render('./admin/turmas', {admin: req.session.usuario, turmas});
  },
  detalhes: async (req, res) => {
    let {id} = req.params;
    console.log(id)
    let turma = await Turma.findOne(
      {
        where: {id: id},
        include: [
          {association: 'alunos', through: {atributes: 'matriculas'}},
          {association: 'professores_disciplinas', through: {atributes: 'turmas_professores_disciplinas'}, include: 'professor'}
      ]
    });

    if(!turma){
      return res.status(401).json({erro: "Turma não encontrada"})
    }

    // console.log(turma)
    res.status(200).json(turma)

  },
  criar: async (req, res) => {
    let { serie, nivel, turno } = req.body;
    
    let turma = {
      serie,
      nivel,
      turno
    }
    res.status(200).json(turma)
  },
  editar: async (req, res) => {
    let { id } = req.params;
    let { serie, nivel, turno } = req.body;
    await Turma.update({
      serie: serie,
      nivel: nivel,
      turno: turno
    }, {where: {id:id}})

    res.redirect('/admin')

  }, 
  deletar: async (req, res) => {
    let { id } = req.params;
    let turma = await Turma.findByPk(id);

    if(!turma){
      res.status(401).json({msg: "Não foi possivel concluir esta ação"})
    }

    await Turma.update(
      {
        ativa: 'false'
      }
      ,{where:{id:id}})
    
    res.redirect('/admin')
  }
}

module.exports = TurmaController;