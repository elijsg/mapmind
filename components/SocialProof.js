import styles from '../CSS/socialProof.module.css'

export default function SocialProof() {
    const quotes = [
      { 
        text: "\"MindMap gave me great help. It told me what to work upon and other ways to help me hit my goals in life.\"", 
        author: "Baka" 
      },
      { 
        text: "\"Very impressive. Will share with my friends. I got my personalized advice email and I'm looking forward to the development of the site 💪\"", 
        author: "isaacv2024" 
      }, 
      { 
        text: "\"Answering the questions made me think a lot more about my purpose and the direction I want to take my life in!\"", 
        author: "Reddit User" 
      },
    ]
    
  
    return (
      <div className={styles.socialProofOverlay}>
        <div className={styles.quoteContainer}>
          {quotes.map((quote, index) => (
            <div key={index} className={styles.quoteBlock}>
              <p className={styles.quote}>"{quote.text}"</p>
              <p className={styles.author}>- {quote.author}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
