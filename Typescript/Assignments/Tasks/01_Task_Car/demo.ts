import { cars, getTotalPrice, getTotalPrice2, printCars, printCars2, getExpensiveCars, getExpensiveCars2 } from "./Car.ts";

// Demo runner
console.log("Gesamtpreis (forEach):", getTotalPrice(cars));
console.log("Gesamtpreis (reduce):", getTotalPrice2(cars));

console.log("\nAlle Autos:");
printCars(cars);

console.log("\nTeure Autos (min. 50000):");
printCars(getExpensiveCars(cars, 50000));

console.log("\nTeure Autos (min. 50000) mit Filter:");
printCars2(getExpensiveCars2(cars, 50000));

export {};
