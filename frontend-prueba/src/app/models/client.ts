export class Client {
  id?: string;
  nombres: string;
  edad: number;

  constructor(nombres: string, edad: number) {
    this.nombres = nombres;
    this.edad = edad;
  }
}
