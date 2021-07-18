import React from 'react'
import NewsItem from './NewsItem';
import styled from 'styled-components';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsList = ({category}) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(`https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=5e7c4e7bbd4b4d24a7133f7acebc1c0d`);
    }, [category]);

    if(loading){
        return <NewsListBlock>Loading...</NewsListBlock>
    }
    if(!response){
        return null
    }
    if(error){
        return <NewsListBlock>Error!</NewsListBlock>
    }

    const { articles } = response.data;

    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article}/>
            ))}
        </NewsListBlock>
    )
}

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width:768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px){
        width: 100%;
        padding-left:1rem;
        padding-right:1rem;
    }
`

export default NewsList
