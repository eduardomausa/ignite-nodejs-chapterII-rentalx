import { CarIamge } from "../infra/typeorm/entities/CarImage";


interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarIamge>;
}

export { ICarsImagesRepository };