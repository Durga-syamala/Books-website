import { useMemo, useState } from 'react'

const books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', category: 'Self Growth', price: 399, oldPrice: 599, rating: 4.9, color: 'peach', cover: 'ATOMIC\\nHABITS', tag: 'Bestseller' },
  { id: 2, title: 'The Psychology of Money', author: 'Morgan Housel', category: 'Finance', price: 299, oldPrice: 450, rating: 4.8, color: 'blue', cover: 'THE\\nPSYCHOLOGY\\nOF MONEY', tag: 'Popular' },
  { id: 3, title: 'Ikigai', author: 'Héctor García & Francesc Miralles', category: 'Self Growth', price: 249, oldPrice: 399, rating: 4.7, color: 'sage', cover: 'IKIGAI', tag: 'Reader pick' },
  { id: 4, title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', price: 199, oldPrice: 299, rating: 4.8, color: 'gold', cover: 'THE\\nALCHEMIST', tag: 'Classic' },
  { id: 5, title: 'Deep Work', author: 'Cal Newport', category: 'Productivity', price: 349, oldPrice: 499, rating: 4.6, color: 'navy', cover: 'DEEP\\nWORK', tag: 'Focus better' },
  { id: 6, title: 'The Silent Patient', author: 'Alex Michaelides', category: 'Fiction', price: 279, oldPrice: 399, rating: 4.5, color: 'plum', cover: 'THE SILENT\\nPATIENT', tag: 'Thriller' },
  { id: 7, title: 'Rich Dad Poor Dad', author: 'Robert T. Kiyosaki', category: 'Finance', price: 229, oldPrice: 350, rating: 4.7, color: 'green', cover: 'RICH DAD\\nPOOR DAD', tag: 'Bestseller' },
  { id: 8, title: 'The 5 AM Club', author: 'Robin Sharma', category: 'Productivity', price: 319, oldPrice: 449, rating: 4.4, color: 'sunset', cover: 'THE 5 AM\\nCLUB', tag: 'New habit' },
]

const categories = ['All books', 'Fiction', 'Self Growth', 'Finance', 'Productivity']

function BookCover({ book }) {
  return (
    <div className={`book-cover ${book.color}`}>
      <span className="cover-mark">PAPER &amp; PAGES</span>
      <strong>{book.cover.split('\\n').map((line, index) => <span key={index}>{line}</span>)}</strong>
      <small>{book.author}</small>
    </div>
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All books')
  const [sort, setSort] = useState('featured')
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const visibleBooks = useMemo(() => {
    let result = books.filter((book) => {
      const matchesCategory = category === 'All books' || book.category === category
      const text = `${book.title} ${book.author} ${book.category}`.toLowerCase()
      return matchesCategory && text.includes(search.toLowerCase())
    })
    if (sort === 'low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    return result
  }, [search, category, sort])

  const addToCart = (book) => {
    setCart((current) => {
      const found = current.find((item) => item.id === book.id)
      return found
        ? current.map((item) => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...book, quantity: 1 }]
    })
    setNotice(`${book.title} added to your bag`)
    window.setTimeout(() => setNotice(''), 2200)
  }

  const changeQuantity = (id, amount) => {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0))
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="site-shell">
      <div className="announcement">A little escape is just a page away · Free delivery on orders over ₹799</div>
      <header className="header">
        <a className="brand" href="#home" aria-label="Paper and Pages home"><span className="brand-icon">P</span><span>paper<span className="brand-amp">&amp;</span>pages</span></a>
        <nav className="nav-links"><a href="#home">Home</a><a href="#shop">Shop books</a><a href="#about">Our story</a></nav>
        <div className="header-actions">
          <label className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search a book..." aria-label="Search books" /></label>
          <button className="icon-button" onClick={() => setCartOpen(true)} aria-label="Open shopping bag">Bag <span className="count">{cartCount}</span></button>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
            <h1>Find your next<br /><em>favourite</em> read.</h1>
            <p className="hero-description">Stories to get lost in. Ideas to grow with. A thoughtfully picked collection for every kind of curious mind.</p>
            <a className="primary-button" href="#shop">Explore the collection <span>↗</span></a>
            <div className="hero-note"><span className="avatar-stack">● ● ●</span><span>Loved by readers who love to read</span></div>
          </div>
          <div className="hero-art" aria-label="Decorative book illustration">
            <div className="sun-shape"></div><div className="hero-book hero-book-one"><small>PAPER &amp; PAGES</small><b>THE ART OF<br />SLOW LIVING</b><span>make room for wonder</span></div>
            <div className="hero-book hero-book-two"><small>NOTES FOR LIFE</small><b>GROW<br />THROUGH IT</b></div>
            <div className="flower">✳</div><div className="hero-caption">A good book<br />changes everything.</div>
          </div>
        </section>

        <section className="benefits">
          <div><span>✳</span><p><b>Thoughtfully picked</b><small>Books worth your time</small></p></div>
          <div><span>♧</span><p><b>Lovely little prices</b><small>Big ideas, less spend</small></p></div>
          <div><span>↗</span><p><b>Delivered with care</b><small>At your doorstep</small></p></div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading"><div><p className="eyebrow">THE BOOKSHELF</p><h2>Find a book to <em>fall into.</em></h2></div><p className="section-intro">From page-turners to life-changers,<br />there's something waiting for you.</p></div>
          <div className="shop-toolbar">
            <div className="category-list">{categories.map((item) => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item}</button>)}</div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort books"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select>
          </div>
          <div className="book-grid">
            {visibleBooks.map((book) => (
              <article className="book-card" key={book.id}>
                <div className="cover-wrap"><BookCover book={book} /><span className="book-tag">{book.tag}</span><button className={`heart ${wishlist.includes(book.id) ? 'liked' : ''}`} onClick={() => setWishlist((old) => old.includes(book.id) ? old.filter((id) => id !== book.id) : [...old, book.id])} aria-label="Toggle wishlist">{wishlist.includes(book.id) ? '♥' : '♡'}</button></div>
                <div className="book-info"><div className="book-title-row"><h3>{book.title}</h3><span className="rating">★ {book.rating}</span></div><p>{book.author}</p><div className="price-row"><div><b>₹{book.price}</b><del>₹{book.oldPrice}</del></div><button onClick={() => addToCart(book)}>Add +</button></div></div>
              </article>
            ))}
          </div>
          {visibleBooks.length === 0 && <div className="empty-state">No books found. Try another search or category.</div>}
        </section>

        <section className="quote-section" id="about"><span>“</span><blockquote>A room without books is like a body without a soul.</blockquote><p>— Marcus Tullius Cicero</p></section>
      </main>

      <footer className="footer"><a className="brand" href="#home"><span className="brand-icon">P</span><span>paper<span className="brand-amp">&amp;</span>pages</span></a><p>Good books. Good days. Repeat.</p><small>© 2026 Paper &amp; Pages · Made for curious minds.</small></footer>

      {notice && <div className="toast" role="status">{notice}</div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-heading"><div><p className="eyebrow">YOUR PICKS</p><h2>Shopping bag ({cartCount})</h2></div><button className="close-button" onClick={() => setCartOpen(false)}>×</button></div>
        {cart.length === 0 ? <div className="empty-cart"><span>♡</span><h3>Your bag is taking a nap.</h3><p>Add a book and let the good reads begin.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Explore books</button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><div className={`mini-cover ${item.color}`}>{item.cover.split('\\n')[0]}</div><div className="cart-item-info"><b>{item.title}</b><small>₹{item.price}</small><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)}>+</button></div></div></div>)}</div><div className="cart-total"><span>Subtotal</span><b>₹{total}</b></div><button className="checkout-button" onClick={() => { setNotice('Demo checkout — no payment was taken.'); setCartOpen(false); window.setTimeout(() => setNotice(''), 2500) }}>Continue to checkout · ₹{total}</button><p className="demo-note">Demo store: checkout does not process payments.</p></>}
      </aside></div>}
    </div>
  )
}

export default App
