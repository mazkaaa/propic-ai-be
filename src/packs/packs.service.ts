import { Injectable } from '@nestjs/common';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';

@Injectable()
export class PacksService {
  // Environment Variables
  API_KEY = process.env.ASTRIA_API_KEY;
  QUERY_TYPE = process.env.PACK_QUERY_TYPE || 'users'; // Default to 'users'
  DOMAIN = 'https://api.astria.ai';

  create(createPackDto: CreatePackDto) {
    return 'This action adds a new pack';
  }

  async findAll() {
    try {
      const headers = {
        Authorization: `Bearer ${this.API_KEY}`,
      };
      // Define the endpoints based on the query type
      const endpoints: string[] = [];

      if (this.QUERY_TYPE === 'users' || this.QUERY_TYPE === 'both') {
        endpoints.push(`${this.DOMAIN}/packs`);
      }

      if (this.QUERY_TYPE === 'gallery' || this.QUERY_TYPE === 'both') {
        endpoints.push(`${this.DOMAIN}/gallery/packs`);
      }
      const responses = await Promise.all(
        endpoints.map((endpoint) => fetch(endpoint, { headers })),
      );

      const combinedData = responses.flatMap((response) => response.json());

      return combinedData;
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pack`;
  }

  update(id: number, updatePackDto: UpdatePackDto) {
    return `This action updates a #${id} pack`;
  }

  remove(id: number) {
    return `This action removes a #${id} pack`;
  }
}
