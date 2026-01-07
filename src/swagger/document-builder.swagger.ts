import { DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('Tài liệu API chi tiết')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Nhập token JWT của bạn',
      in: 'header',
    },
    'accessToken', // Đây là ID của scheme, sẽ dùng ở Controller
  )
  .build();

export default config;
