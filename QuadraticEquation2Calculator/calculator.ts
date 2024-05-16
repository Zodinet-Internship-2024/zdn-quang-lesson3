const quadraticEquation2Calculator = (a: number, b: number, c: number) => {
    const deltaCalculate = () => {
        return b * b - 4 * a * c;
    };
    return {
        delta: deltaCalculate,
        solver: function () {
            let message: string = "";
            if (a === 0) {
                if (b === 0) {
                    if (c === 0) message = "Infinity roots";
                    else message = "No root";
                } else message = `Equation has one real root: ${-c / b}`;
            } else {
                const delta = deltaCalculate();
                if (delta < 0) {
                    message = "No real root";
                    return message;
                } else {
                    const value1 = (-b + Math.sqrt(delta)) / (2 * a);
                    const value2 = (-b - Math.sqrt(delta)) / (2 * a);
                    if (value1 === value2) {
                        message = `Equation has one real root: ${value2}`;
                    } else
                        message = `Equation has two real roots: x1 = ${value1}, x2 = ${value2}`;
                }
            }
            return message;
        },
    };
};

const result = quadraticEquation2Calculator(0, 0, 0);
const message = result.solver();
console.log(message);
