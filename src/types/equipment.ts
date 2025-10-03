export interface Equipment {
  id?: string;
  modelo: string;
  velocidade: number;
  portasLan: number;
  categoria: string;
  mesh: 'sim' | 'nao';
  imgUrl: string;
}
