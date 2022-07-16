import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarIamge } from "../entities/CarImage";


class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarIamge>;

  constructor() {
    this.repository = getRepository(CarIamge);
  }
  
  async create(car_id: string, image_name: string): Promise<CarIamge> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };