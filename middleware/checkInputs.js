const checkInputs = (mandatoryFields, req) => {
  console.log(req.body);
  for (let i = 0; i < mandatoryFields.length; i++) {
    if (!(mandatoryFields[i] in req.body)) {
      return { error: `Required fields not present: ${mandatoryFields[i]}` };
    }
  }
  return {};
};

export { checkInputs };
