import { Announcements, Header } from '../components';

export default function Home() {
  return (
    <div>
      <Header />
      <Announcements announcements={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
    </div>
  );
}
