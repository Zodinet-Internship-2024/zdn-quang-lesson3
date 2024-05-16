const quadraticEquation2Calculator = (a: number, b: number, c: number) => {
    const deltaCalculate = () => {
        return b * b - 4 * a * c;
    };
    return {
        delta: deltaCalculate,
        solver: function () {
            if (a === 0) return { no: "Not a quadratic Equation 2" };
            const delta = deltaCalculate();
            if (delta < 0) return null;
            const value1 = (-b - Math.sqrt(delta)) / (2 * a);
            const value2 = (-b + Math.sqrt(delta)) / (2 * a);

            return { value1, value2 };
        },
    };
};

const result = quadraticEquation2Calculator(0, 0, 0);
const solver = result.solver();
if (solver?.no) {
    console.log(solver.no);
} else if (solver) {
    console.log(`x1 = ${solver.value1}, x2 = ${solver.value2}`);
} else {
    console.log("No solution");
}
