import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const carsList = <Car[]>[];

    carsList.push(await carsRepositoryInMemory.create({
      name: "Car1",
      brand: "Car Brand",
      description: "Car Description",
      category_id: "category_id",
      daily_rate: 110,
      fine_amount: 40,
      license_plate: "DEF-1234",
    }));

    carsList.push(await carsRepositoryInMemory.create({
      name: "Car2",
      brand: "Car Brand2",
      description: "Car Description2",
      category_id: "category_id2",
      daily_rate: 110,
      fine_amount: 40,
      license_plate: "DEF-1235",
    }));

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars.length).toEqual(carsList.length);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      brand: "Car_brand_test",
      description: "Car Description2",
      category_id: "category_id2",
      daily_rate: 110,
      fine_amount: 40,
      license_plate: "DEF-1235",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      brand: "Car_brand_test",
      description: "Car Description2",
      category_id: "category_id2",
      daily_rate: 110,
      fine_amount: 40,
      license_plate: "DEF-1236",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      brand: "Car_brand_test",
      description: "Car Description2",
      category_id: "12345",
      daily_rate: 110,
      fine_amount: 40,
      license_plate: "DEF-1236",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "12345",
    });

    expect(cars).toEqual([car]);
  });
});