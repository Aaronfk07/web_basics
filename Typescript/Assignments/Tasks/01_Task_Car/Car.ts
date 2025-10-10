
import { Car } from "./interface.ts";

export const cars: Car[] = [
  { brand: "BMW", model: "X5", price: 65000, year: 2022 },
  { brand: "Audi", model: "A4", price: 40000, year: 2021 },
  { brand: "Tesla", model: "Model 3", price: 55000, year: 2023 },
  { brand: "VW", model: "Golf", price: 25000, year: 2020 },
];

export function getTotalPrice(cars: Car[]): number {
  let total = 0;
  cars.forEach((car) => {
    total += car.price;
  });
  return total;
}

// 2. Autos ausgeben
export function printCars(cars: Car[]): void {
  cars.forEach((car) => {
    console.log(`${car.brand} ${car.model} (${car.year}) - ${car.price} €`);
  });
}

// 3. Teure Autos filtern
export function getExpensiveCars(cars: Car[], minPrice: number): Car[] {
  const result: Car[] = [];
  cars.forEach((car) => {
    if (car.price > minPrice) {
      result.push(car);
    }
  });
  return result;
}

// -----------------
// Funktionen mit Array-Funktionen (reduce, filter)
// -----------------

// 1. Gesamtpreis mit reduce
export function getTotalPrice2(cars: Car[]): number {
  return cars.reduce((sum, car) => sum + car.price, 0);
}

// 2. Autos ausgeben (map + forEach)
export function printCars2(cars: Car[]): void {
  cars
    .map((car) => `${car.brand} ${car.model} (${car.year}) - ${car.price} €`)
    .forEach((line) => console.log(line));
}

// 3. Teure Autos filtern
export function getExpensiveCars2(cars: Car[], minPrice: number): Car[] {
  return cars.filter((car) => car.price > minPrice);
}
