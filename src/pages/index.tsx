import { Button, Box, Spacer } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';


export default function Home(): JSX.Element {

  const getImages = async (params) => {
    const response = await api.get('api/images', { params: { after: params.pageParam} });
    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    getImages
    ,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (pages) => { 
        return pages?.after ?? null; 
      }
    }
  );

  const formattedData = useMemo(() => {

    const list = data?.pages.map(p => p.data).flat();
    
    return list ?? [];
  }, [data]);


  const loadMore = () => {
    hasNextPage && fetchNextPage(); 
  };

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />
  }
  // TODO RENDER ERROR SCREEN
  if (isError){
    return <Error/>
  }
  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        <Box mt="40px">
          {hasNextPage && <Button onClick={loadMore}>
            { isFetchingNextPage ? 'Carregando...' : 'Carregar mais' }
          </Button>}
        </Box>
      </Box>
    </>
  );
}
