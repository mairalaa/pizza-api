import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { menuStub } from './test/stubs/menu.stub';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepo: Repository<Menu>,
  ) {}

  async getMenu() {
    /**
     * Create and return dummy menu items
     */
    return await this.menuRepo.save(menuStub);
  }
}
