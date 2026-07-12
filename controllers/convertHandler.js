function ConvertHandler() {
  
  this.getNum = function(input) {
    // Busca dónde empieza la unidad (la primera letra)
    let result = input.split(/[a-zA-Z]+/)[0];
    
    if (result === "") return 1; // Default a 1 si no hay número
    
    // Validar fracción: si tiene más de un "/" es inválido
    if (result.split('/').length > 2) return 'invalid number';
    
    try {
      // Evaluación simple de la expresión matemática (admite 1/2, 2.5, etc.)
      let num = eval(result); 
      return isNaN(num) ? 'invalid number' : num;
    } catch (e) {
      return 'invalid number';
    }
  };

  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+/);
    if (!result) return 'invalid unit';
    
    const unit = result[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (!validUnits.includes(unit)) return 'invalid unit';
    return unit === 'l' ? 'L' : unit; // Liter debe ser 'L'
  };
  
  // ... sigue con el resto de métodos: getReturnUnit, spellOutUnit, convert
}
