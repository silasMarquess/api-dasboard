import { Reflector } from '@nestjs/core';
export const Roles = Reflector.createDecorator<typeof RolesList>();

export const RolesList = [
  {
    id: 0,
    description: 'admin',
  },
  {
    id: 1,
    description: 'user',
  },
  {
    id: 2,
    description: 'delivery',
  },
];
