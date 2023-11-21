import { v4 as uuidv4 } from 'uuid';

export function objectId() {
  const uuid: string = uuidv4();
  return uuid;
}
