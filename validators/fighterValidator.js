import { body, validationResult } from 'express-validator';

const fighterValidationRules = [
  body('name').trim()
    .notEmpty().withMessage('Name is required'),

  body('planet_id').trim()
    .notEmpty().withMessage('Planet is required'),

  body('image_url')
    .custom((value, { req }) => {
      if (!req.file) throw new Error('Image is required');

      return true;
    })
];

const fighterValidate = (req, res, next) => {
  const errors = validationResult(req);
  let errorArray = errors.isEmpty() ? [] : errors.array();

  if (req.fileValidationError) {
    errorArray.push({ msg: req.fileValidationError, param: 'image' });
  }

  if (!errorArray.length) return next();

  req.validationErrors = errorArray;
  next();
}

export {
  fighterValidationRules,
  fighterValidate
}
