import React, { useState } from 'react'
import './Card.css'

interface CardProps {
  expanded?: boolean
  article: Article
  index: number
  deleteArticle: (index: number) => void
}

interface Article {
  title: string
  author: string
  created_at: string
}

const Card: React.FC<CardProps> = ({
  expanded = false,
  article,
  index,
  deleteArticle,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded)
  const [isSelectingText, setIsSelectingText] = useState(false)

  const handleMouseDown = () => {
    setIsSelectingText(false)
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (window.getSelection()?.toString()) {
      setIsSelectingText(true)
    }
  }

  const toggleCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const interactiveElements = ['BUTTON', 'INPUT']
    if (
      !interactiveElements.includes((e.target as HTMLElement).tagName) &&
      !isSelectingText
    ) {
      setIsExpanded(!isExpanded)
    }
  }

  const handleDelete = () => {
    deleteArticle(index)
  }

  return (
    <div
      className={`card ${isExpanded ? 'expanded' : ''}`}
      onClick={toggleCard}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="card-header">
        <div className="name">{article ? article.title : 'Loading...'}</div>
        <div className="subject">{article ? article.author : 'Loading...'}</div>
        <div className="time-date">
          {article
            ? new Date(article.created_at).toLocaleString()
            : 'Loading...'}
        </div>
      </div>
      {isExpanded && (
        <div className="card-body">
          <div className="buttons">
            <button className="button action-button">Like</button>
            <button className="button action-button">Share</button>
            <button className="button delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card
