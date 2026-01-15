import { body, validationResult } from 'express-validator';

const planetValidationRules = [
  body('name').trim()
    .notEmpty().withMessage('Planet name is required')
];

const planetValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const data = { title: 'Create Planet', errors: errors.array() }
  return res.status(422).render('planets/create', data);
}

export {
  planetValidationRules,
  planetValidate
}
