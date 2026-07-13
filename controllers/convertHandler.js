function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.match(/[.\d\/]+/g) || ['1'];
    let numString = result[0];
    
    let slashCount = (numString.match(/\//g) || []).length;
    if (slashCount > 1) return 'invalid number';
    
    try {
      let nums = numString.split('/');
      if (nums.length === 2) {
        return parseFloat(nums[0]) / parseFloat(nums[1]);
      }
      return parseFloat(numString);
    } catch (e) {
      return 'invalid number';
    }
  };

  this.getUnit = function(input) {
    let unit = input.match(/[a-zA-Z]+/g);
    if (!unit) return 'invalid unit';
    
    let u = unit[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (!validUnits.includes(u)) return 'invalid unit';
    return u === 'l' ? 'L' : u;
  };

  this.getReturnUnit = function(initUnit) {
    const units = {
      'gal': 'L', 'l': 'gal',
      'mi': 'km', 'km': 'mi',
      'lbs': 'kg', 'kg': 'lbs'
    };
    let unit = initUnit.toLowerCase();
    return units[unit] === 'l' ? 'L' : units[unit];
  };

  this.spellOutUnit = function(unit) {
    const fullNames = {
      'gal': 'gallons', 'l': 'liters',
      'mi': 'miles', 'km': 'kilometers',
      'lbs': 'pounds', 'kg': 'kilograms'
    };
    return fullNames[unit.toLowerCase()];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let unit = initUnit.toLowerCase();
    let result;

    switch(unit) {
      case 'gal': result = initNum * galToL; break;
      case 'l': result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      default: return null;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
