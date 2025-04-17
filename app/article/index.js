import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function ArticleIndexScreen() {
  // Redirect to the docs tab which shows all articles
  return <Redirect href="/docs" />;
}