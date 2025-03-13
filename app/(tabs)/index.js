import { View, Text } from 'react-native';
import ClassCard from '../../components/ClassCard';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Trang chủ</Text>
      <ClassCard
        imageSource={
          {
            // uri: 'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/484350247_639183142053897_6464830362574289513_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHOO34-SamdtkgDDY6XNka5nOWYcRp6-zWc5ZhxGnr7NXgFvGAyrjw2x20xTBJ0GjdI98U5w0iQEDhNwIbGHucb&_nc_ohc=eoczdpbL6OQQ7kNvgEl18z8&_nc_oc=Adhhl47y5D0EpAN92ATKMEpnLza6Enq48p5hn4ucLDGB04Hir0e-7klWvf1KqY4S1Kw&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=A0jRG6l-TUvi6h8dgEF63Qo&oh=00_AYHzGyYUOYiYrNuVScLGFTtYkliGajpd24wKraGbMaJvtA&oe=67D83E33',
          }
        } // Hoặc require('...')
        className="Lớp Đại 12A"
        time="Thứ Hai, 19h30 - 21h30"
        sessions={12}
        membersCount={86}
        onPressJoin={() => {
          // Xử lý khi bấm nút "Vào học"
          console.log('Vào học');
        }}
      />
    </View>
  );
}
