import React, { useEffect, useState } from 'react'
import Card from '../Card/Card.tsx'
import './CardList.css'

interface Article {
  title: string
  author: string
  created_at: string
}

const CardList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [sortBy, setSortBy] = useState<'title' | 'created_at'>('title')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'https://hn.algolia.com/api/v1/search?tags=front_page'
        )
        const data = await response.json()
        if (data.hits.length > 0) {
          const fetchedArticles = data.hits.slice(0, 10).map((hit: any) => ({
            title: hit.title,
            author: hit.author,
            created_at: hit.created_at,
          }))
          setArticles(fetchedArticles)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    fetchArticles()
  }, [])

  const deleteArticle = (index: number) => {
    setArticles((prevArticles) => prevArticles.filter((_, i) => i !== index))
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as 'title' | 'created_at')
  }

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value as 'asc' | 'desc')
  }

  const sortedArticles = [...articles].sort((a, b) => {
    const aValue =
      sortBy === 'title' ? a.title : new Date(a.created_at).getTime()
    const bValue =
      sortBy === 'title' ? b.title : new Date(b.created_at).getTime()

    return order === 'asc'
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1
  })

  return (
    <div className="card-list">
      <div className="sorting-options">
        <select className="sort" value={sortBy} onChange={handleSortChange}>
          <option value="title">Sort by Title</option>
          <option value="created_at">Sort by Creation Date</option>
        </select>
        <select value={order} onChange={handleOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {sortedArticles.map((article, index) => (
        <Card
          key={index}
          article={article}
          index={index}
          deleteArticle={deleteArticle}
        />
      ))}
    </div>
  )
}

export default CardList
