import { Controller, Post } from '@nestjs/common';
import { AppResources } from 'src/app.roles';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { InstalacionesService } from './instalaciones.service';

@Controller('instalaciones')
export class InstalacionesController {
  constructor(private readonly instalacionesService: InstalacionesService) {}

  // quitar esto para primera actualizaccion
  // @Auth({
  //   possession: 'any',
  //   action: 'create',
  //   resource: AppResources.INSTALACIONES,
  // })
  @Post('creacion')
  create() {
    return this.instalacionesService.create();
  }
}
