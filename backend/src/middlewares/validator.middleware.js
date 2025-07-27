export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        console.log("Validando OK");
        
        return next();
    } catch (error) {
        console.log("Validando errores");
        
        return res
            .status(400)
            .json({
                error: error.errors.map((err) => err.message)
            });
    }
};