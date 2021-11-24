import { Announcements, Header } from '../components';

const data = [
  {
    imageUrl:
      'https://blog.cobasi.com.br/wp-content/uploads/2021/03/por-que-o-pinscher-e-tao-bravo-capa.png',
    name: 'O cão',
    location: 'Bairro Centro',
    status: 'ABERTO',
  },
  {
    imageUrl:
      'https://blog.cobasi.com.br/wp-content/uploads/2021/03/por-que-o-pinscher-e-tao-bravo-capa.png',
    name: 'O cão',
    location: 'Bairro Centro',
    status: 'ABERTO',
  },
  {
    imageUrl:
      'https://blog.cobasi.com.br/wp-content/uploads/2021/03/por-que-o-pinscher-e-tao-bravo-capa.png',
    name: 'O cão',
    location: 'Bairro Centro',
    status: 'ABERTO',
  },
  {
    imageUrl:
      'https://blog.cobasi.com.br/wp-content/uploads/2021/03/por-que-o-pinscher-e-tao-bravo-capa.png',
    name: 'O cão',
    location: 'Bairro Centro',
    status: 'ABERTO',
  },
  {
    imageUrl:
      'https://blog.cobasi.com.br/wp-content/uploads/2021/03/por-que-o-pinscher-e-tao-bravo-capa.png',
    name: 'O cão',
    location: 'Bairro Centro',
    status: 'ABERTO',
  },
  {
    imageUrl:
      'https://blog.cobasi.com.br/wp-content/uploads/2021/03/por-que-o-pinscher-e-tao-bravo-capa.png',
    name: 'O cão',
    location: 'Bairro Centro',
    status: 'ABERTO',
  },
  {
    imageUrl:
      'https://blog.cobasi.com.br/wp-content/uploads/2021/03/por-que-o-pinscher-e-tao-bravo-capa.png',
    name: 'O cão',
    location: 'Bairro Centro',
    status: 'ABERTO',
  },
  {
    imageUrl:
      'https://blog.cobasi.com.br/wp-content/uploads/2021/03/por-que-o-pinscher-e-tao-bravo-capa.png',
    name: 'O cão',
    location: 'Bairro Centro',
    status: 'ABERTO',
  },
  {
    imageUrl:
      'https://blog.cobasi.com.br/wp-content/uploads/2021/03/por-que-o-pinscher-e-tao-bravo-capa.png',
    name: 'O cão',
    location: 'Bairro Centro',
    status: 'ABERTO',
  },
  {
    imageUrl:
      'https://blog.cobasi.com.br/wp-content/uploads/2021/03/por-que-o-pinscher-e-tao-bravo-capa.png',
    name: 'O cão',
    location: 'Bairro Centro',
    status: 'ABERTO',
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      <Announcements announcements={data} />
    </div>
  );
}
