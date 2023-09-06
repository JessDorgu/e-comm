const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
try {
  const categories = await Category.findAll({
    include: [Product],
  });
  res.status(200).json(categories);
} catch (err) {
  console.error(err);
  res.status(500).json(err);
}

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
const category = await Category.findByPk(req.params.id,{
  include:[Product],
});
if (!category){
  res.status(404).json({message: "Category cannot be found"});
  return;
}
res.status(200).json(category);
}catch(err){
  console.error(err);
  res.status(500).json(err);
}
});

router.post('/', async(req, res) => {
  // create a new category

try{
  const newCategory = await Category.create(req.body);
  res.status(201).json(newCategory);
}catch (err) {
  console.error(err);
  res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
try{
  const updateCategory = await Category.update(req.body,{
    where:{
      id: req.params.id,
    },
  });
  if (!updateCategory[0]){
    res.status(404),json({message: "category cannot be found"});
    return;
  }
  res.status(200).json(updateCategory);
  } catch (err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deleteCategory === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
