import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';

export default function IndexPage() {
  const user = useSelector((state) => state.auth.user);

  // Nếu đã đăng nhập, chuyển hướng sang (tabs)/home
  if (user) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/(auth)/login" />;
  // return <Redirect href="/home" />;
}
