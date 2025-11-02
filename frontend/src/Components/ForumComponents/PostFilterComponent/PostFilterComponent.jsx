import React from 'react'
import './PostFilterComponent.css'

const PostFilterComponent = () => {

    let types = ['Discusion', 'Recomendacion', 'Noticia', 'Reseña', 'Duda', 'Fanart'];
    let categories = ['Pelicula', 'Series', 'Comic', 'Manga', 'Coleccionismo', 'Anime'];

  return (
    <div className='post-filter-background'>
        <div className="post-filter-searchbar">
            <h3>Buscar</h3>
            <input type="text" placeholder='Buscar...' />
        </div>
        <hr />
        <div className="post-filter-types">
            <div className="post-filter-checkbox">
                <h3>Tipo</h3>
               {types.map((type) => (
                  <div key={type} className="filter-checkbox-option">
                    <input
                      type="checkbox"
                    />
                    <label htmlFor={type}>{type}</label>
                  </div>
                ))}
            </div>
        </div>
        <hr />
            <div className="post-filter-categories">
                <h3>Categoria</h3>
                {categories.map((categorie) => (
                <div className="filter-checkbox-option">
                    <input 
                    type="checkbox" />
                    <label htmlFor={categorie}>{categorie}</label>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PostFilterComponent