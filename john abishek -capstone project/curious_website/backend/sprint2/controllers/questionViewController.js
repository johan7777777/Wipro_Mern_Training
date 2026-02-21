const { Question, Answer, Comment } = require("../../sprint1/models");

exports.showForm = async (req, res) => {
  const isEdit = Boolean(req.params.id);
  let question = {};
  if (isEdit) {
    const q = await Question.findByPk(req.params.id);
    if (!q) return res.redirect("/dashboard");
    question = q.toJSON();
  }
  const formAction = isEdit ? "/questions/" + req.params.id + "/edit" : "/questions/new";
  const returnUrl = req.query.from === 'admin' || req.get('referer')?.includes('/admin') 
    ? '/admin/dashboard' 
    : '/dashboard';
  
  res.render("questions/form", { user: req.session.user, question, isEdit, formAction, returnUrl });
};

exports.create = async (req, res) => {
  try {
    const { description, questionType } = req.body;
    if (!description || !questionType) {
      return res.render("questions/form", {
        user: req.session.user,
        question: req.body,
        isEdit: false,
        formAction: "/questions/new",
        error: "Description and type are required",
      });
    }
    await Question.create({
      description,
      questionType: ["Post", "Discussion"].includes(questionType) ? questionType : "Post",
      questionedBy: req.session.userId,
    });
    res.redirect("/dashboard");
  } catch (err) {
    res.render("questions/form", {
      user: req.session.user,
      question: req.body,
      isEdit: false,
      formAction: "/questions/new",
      error: err.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.redirect("/dashboard");
    const { description, questionType, returnUrl } = req.body;
    if (description != null) question.description = description;
    if (questionType && ["Post", "Discussion"].includes(questionType)) question.questionType = questionType;
    await question.save();
    
  
    res.redirect(returnUrl || "/dashboard");
  } catch (err) {
    res.render("questions/form", {
      user: req.session.user,
      question: Object.assign({}, req.body, { id: req.params.id }),
      isEdit: true,
      formAction: "/questions/" + req.params.id + "/edit",
      returnUrl: req.body.returnUrl || "/dashboard",
      error: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.redirect("/dashboard");
    
    const { User } = require("../../sprint1/models");
    const user = await User.findByPk(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.redirect("/dashboard?error=Only admins can delete questions");
    }
    
    const answers = await Answer.findAll({ where: { questionId: req.params.id } });
    const answerIds = answers.map(a => a.id);
    if (answerIds.length > 0) {
      await Comment.destroy({ where: { answerId: answerIds } });
    }
    await Answer.destroy({ where: { questionId: req.params.id } });
    await Question.destroy({ where: { id: req.params.id } });
    res.redirect("/dashboard");
  } catch (err) {
    res.redirect("/dashboard?error=" + encodeURIComponent(err.message || "Failed to delete question"));
  }
};

exports.deactivate = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.redirect("/dashboard");
    
   
    const { User } = require("../../sprint1/models");
    const user = await User.findByPk(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.redirect("/dashboard?error=Only admins can deactivate questions");
    }
    
    question.status = "Deactivated";
    await question.save();
    res.redirect("/dashboard");
  } catch (err) {
    res.redirect("/dashboard?error=" + encodeURIComponent(err.message || "Failed to deactivate question"));
  }
};
