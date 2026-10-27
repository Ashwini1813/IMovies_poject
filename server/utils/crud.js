// Generic CRUD controller factory (reused by movie / theatre / show)
module.exports = (Model, populate = "") => ({
  list: async (req, res, next) => {
    try { res.json(await Model.find({}).populate(populate).sort("-createdAt")); } catch (e) { next(e); }
  },
  get: async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id).populate(populate);
      doc ? res.json(doc) : res.status(404).json({ message: "Not found" });
    } catch (e) { next(e); }
  },
  create: async (req, res, next) => {
    try { res.status(201).json(await Model.create(req.body)); } catch (e) { next(e); }
  },
  update: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      doc ? res.json(doc) : res.status(404).json({ message: "Not found" });
    } catch (e) { next(e); }
  },
  remove: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      doc ? res.json({ message: "Deleted" }) : res.status(404).json({ message: "Not found" });
    } catch (e) { next(e); }
  },
});
