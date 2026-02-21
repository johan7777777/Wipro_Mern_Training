const { Answer, Question } = require("../../sprint1/models");

exports.showForm = async (req, res) => {
  const answer = await Answer.findByPk(req.params.id);
  if (!answer) return res.redirect("/dashboard");
  res.render("answers/form", { user: req.session.user, answer: answer.toJSON() });
};

exports.create = async (req, res) => {
  try {
    const { answer, questionId, returnUrl } = req.body;
    if (!answer || !questionId) {
      return res.redirect(returnUrl || `/dashboard`);
    }
    await Answer.create({
      answer,
      questionId,
      answeredBy: req.session.userId,
    });
    
    const redirectUrl = returnUrl || `/dashboard`;
    const separator = redirectUrl.includes('?') ? '&' : '?';
    res.redirect(`${redirectUrl}${separator}success=Answer submitted for approval`);
  } catch (err) {
    res.redirect(req.body.returnUrl || `/dashboard`);
  }
};

exports.update = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) return res.redirect("/dashboard");
    answer.answer = req.body.answer != null ? req.body.answer : answer.answer;
    await answer.save();
   
    const redirectUrl = req.body.returnUrl || "/dashboard";
    res.redirect(redirectUrl);
  } catch (err) {
    const a = await Answer.findByPk(req.params.id);
    res.render("answers/form", {
      user: req.session.user,
      answer: a ? { ...a.toJSON(), answer: req.body.answer } : { id: req.params.id, questionId: null },
      error: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  const answer = await Answer.findByPk(req.params.id);
  await Answer.destroy({ where: { id: req.params.id } });
  res.redirect("/dashboard");
};

exports.deactivate = async (req, res) => {
  const answer = await Answer.findByPk(req.params.id);
  if (answer) {
    answer.status = "Deactivated";
    await answer.save();
  }
  res.redirect("/dashboard");
};
