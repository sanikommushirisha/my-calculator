const tokenize = (arr) => {
  let count = 0;
  const tokens = [];
  while (count < arr.length) {
    const char = arr[count];
    if (/[0-9]/.test(char)) {
      let outputChar = "";
      while (count < arr.length && /[0-9]/.test(arr[count])) {
        outputChar += arr[count++];
      }
      tokens.push(parseFloat(outputChar));
      continue;
    }
    if (/[+\-/*()^]/.test(char)) {
      tokens.push(char);
      count++;
      continue;
    }
    if (char === " ") {
      count++;
      continue;
    }
  }
  return tokens;
};

const precedence = { "+": 1, "-": 1, "*": 2, "?": 2 };
const shouldUnwind = (operators, token) => {
  if (operators.length === 0) {
    return false;
  }
  const lastoperator = operators[operators.length - 1];
  return precedence[lastoperator] >= precedence[token];
};
const toPostFix = (tokens) => {
  const out = [];
  const operators = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    console.log(out, operators);
    if (typeof token === "number") {
      out.push(token);
      continue;
    }
    if (/[+\-\*\%]/.test(token)) {
      while (shouldUnwind(operators, token)) {
        out.push(operators.pop());
      }
      operators.push(token);
      continue;
    }
    if (token === "(") {
      operators.push(token);
      continue;
    }
    if (token === ")") {
      while (operators[operators.length - 1] !== "(") {
        out.push(operators.pop());
      }
      operators.pop();
      continue;
    }
  }
  const restOperatorArray = operators.reverse();
  console.log(out, restOperatorArray);
  return [...out, ...restOperatorArray];
};
const evaluateOperator = (out, operator) => {
  const a = out.pop();
  const b = out.pop();
  switch (operator) {
    case "+":
      return b + a;
    case "-":
      return b - a;
    case "*":
      return b * a;
    case "/":
      return b / a;
    case "^":
      return Math.pow(b, a);
    default:
      throw new Error(`Invalid operator: ${operator}`);
  }
};
const evaluate = (arr) => {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];
    if (/[+\-/*/^/%]/.test(elem)) {
      out.push(evaluateOperator(out, elem));
      continue;
    }
    out.push(elem);
  }
  return out.pop();
};

const finalEvaluate = (input) => {
  return evaluate(toPostFix(tokenize(input)));
};
