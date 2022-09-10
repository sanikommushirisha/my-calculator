import { evaluate } from 'mathjs';

class NumberUtils {
    static removeLastNChar(str, N) {
        return str.substring(0, str.length - N);
    }

    static isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }

    static trimDecimals(n, precision = 2) {
        return NumberUtils.isFloat(n) ? Number(n).toPrecision(precision): n;
    }

    static evaluateExpression = (value) => {
        try {
          return evaluate(value)
        }
        catch(error) {
          throw new Error("Invalid Math Expression")
        }
    }
      
}

export default NumberUtils;
